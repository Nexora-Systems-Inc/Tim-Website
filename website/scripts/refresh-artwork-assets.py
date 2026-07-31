#!/usr/bin/env python3
"""Refresh artwork assets using feature matching against existing gallery crops.

Finds each painting in the high-res room photo by matching ORB features to the
previous (already-cropped) WebP, then perspective-warps and exports optimized WebP.
Falls back to aspect-aware rectangle detection when matching is weak.
"""

from __future__ import annotations

import json
import shutil
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

REPO = Path(__file__).resolve().parents[2]
SOURCE_DIR = REPO / "source-assets" / "artworks" / "originals"
WORK_DIR = REPO / "source-assets" / "artworks" / "processed"
PREVIEW_DIR = REPO / "source-assets" / "artworks" / "previews"
OUT_DIR = REPO / "website" / "public" / "images" / "artworks"
MANIFEST = REPO / "source-assets" / "artworks" / "refresh-manifest.json"

MAX_EDGE = 1600
WEBP_QUALITY = 86
SOLD_REFS = {"C-0551", "C-1342", "C-1351", "C-1890", "C-1936"}


def imread_bgr(path: Path) -> np.ndarray | None:
    """Read image as BGR, robust to non-ASCII Windows paths."""
    try:
        data = np.fromfile(str(path), dtype=np.uint8)
        if data.size == 0:
            return None
        img = cv2.imdecode(data, cv2.IMREAD_COLOR)
        return img
    except Exception:
        try:
            im = Image.open(path).convert("RGB")
            return cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)
        except Exception:
            return None


def imwrite_bgr(path: Path, bgr: np.ndarray) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    ext = path.suffix.lower() or ".png"
    ok, buf = cv2.imencode(ext, bgr)
    if not ok:
        raise RuntimeError(f"Failed to encode {path}")
    buf.tofile(str(path))


def order_points(pts: np.ndarray) -> np.ndarray:
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect


def warp_quad(bgr: np.ndarray, pts: np.ndarray, out_w: int | None = None, out_h: int | None = None) -> np.ndarray:
    rect = order_points(pts.astype("float32"))
    (tl, tr, br, bl) = rect
    width_a = np.linalg.norm(br - bl)
    width_b = np.linalg.norm(tr - tl)
    height_a = np.linalg.norm(tr - br)
    height_b = np.linalg.norm(tl - bl)
    max_w = int(out_w or max(width_a, width_b))
    max_h = int(out_h or max(height_a, height_b))
    max_w = max(max_w, 64)
    max_h = max(max_h, 64)
    dst = np.array([[0, 0], [max_w - 1, 0], [max_w - 1, max_h - 1], [0, max_h - 1]], dtype="float32")
    M = cv2.getPerspectiveTransform(rect, dst)
    return cv2.warpPerspective(bgr, M, (max_w, max_h), flags=cv2.INTER_LANCZOS4)


def load_reference_bgr(ref: str) -> np.ndarray | None:
    bak = OUT_DIR / f"{ref}.webp.bak"
    path = bak if bak.exists() else OUT_DIR / f"{ref}.webp"
    if not path.exists():
        return None
    # Pillow can decode webp; convert to BGR
    im = Image.open(path).convert("RGB")
    rgb = np.array(im)
    return cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)


def match_artwork_quad(scene: np.ndarray, ref_img: np.ndarray) -> tuple[np.ndarray, float] | None:
    """Return (quad_pts, confidence) using ORB + homography."""
    orb = cv2.ORB_create(4000)
    kp1, des1 = orb.detectAndCompute(ref_img, None)
    kp2, des2 = orb.detectAndCompute(scene, None)
    if des1 is None or des2 is None or len(kp1) < 20 or len(kp2) < 20:
        return None

    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)
    raw = bf.knnMatch(des1, des2, k=2)
    good = []
    for pair in raw:
        if len(pair) != 2:
            continue
        m, n = pair
        if m.distance < 0.75 * n.distance:
            good.append(m)

    if len(good) < 18:
        return None

    src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
    dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
    H, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
    if H is None or mask is None:
        return None
    inliers = int(mask.sum())
    if inliers < 12:
        return None

    h, w = ref_img.shape[:2]
    corners = np.float32([[0, 0], [w - 1, 0], [w - 1, h - 1], [0, h - 1]]).reshape(-1, 1, 2)
    warped = cv2.perspectiveTransform(corners, H).reshape(4, 2)

    # Sanity: quad inside image with reasonable area
    sh, sw = scene.shape[:2]
    if np.any(warped[:, 0] < -sw * 0.05) or np.any(warped[:, 0] > sw * 1.05):
        return None
    if np.any(warped[:, 1] < -sh * 0.05) or np.any(warped[:, 1] > sh * 1.05):
        return None
    area = cv2.contourArea(warped.astype(np.float32))
    if area < (sh * sw) * 0.03 or area > (sh * sw) * 0.95:
        return None

    conf = inliers / max(len(good), 1)
    return warped.astype("float32"), conf


def detect_quad_aspect_aware(scene: np.ndarray, target_aspect: float) -> np.ndarray | None:
    h, w = scene.shape[:2]
    img_area = float(h * w)
    gray = cv2.cvtColor(scene, cv2.COLOR_BGR2GRAY)
    gray = cv2.bilateralFilter(gray, 9, 75, 75)
    candidates: list[tuple[float, np.ndarray]] = []

    def consider(approx: np.ndarray, base: float) -> None:
        if len(approx) != 4 or not cv2.isContourConvex(approx):
            return
        area = cv2.contourArea(approx)
        if area < img_area * 0.05 or area > img_area * 0.9:
            return
        pts = approx.reshape(4, 2).astype("float32")
        rect = order_points(pts)
        (tl, tr, br, bl) = rect
        ww = max(np.linalg.norm(br - bl), np.linalg.norm(tr - tl))
        hh = max(np.linalg.norm(tr - br), np.linalg.norm(tl - bl))
        if ww < 60 or hh < 60:
            return
        aspect = ww / max(hh, 1.0)
        aspect_err = abs(np.log(aspect / max(target_aspect, 1e-3)))
        if aspect_err > 0.55:
            return
        x, y, bw, bh = cv2.boundingRect(approx)
        fill = area / max(bw * bh, 1.0)
        score = base * area * fill * np.exp(-aspect_err * 2.5)
        candidates.append((float(score), pts))

    for low, high in ((25, 90), (40, 130), (60, 180)):
        edges = cv2.Canny(cv2.GaussianBlur(gray, (5, 5), 0), low, high)
        edges = cv2.dilate(edges, np.ones((5, 5), np.uint8), 2)
        contours, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        for c in contours:
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.02 * peri, True)
            consider(approx, 1.0)

    thr = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 35, 5)
    thr = cv2.morphologyEx(thr, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8), 2)
    contours, _ = cv2.findContours(thr, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for c in contours:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.025 * peri, True)
        consider(approx, 0.9)

    if not candidates:
        return None
    candidates.sort(key=lambda x: -x[0])
    return candidates[0][1]


def trim_border(bgr: np.ndarray, ratio: float = 0.008) -> np.ndarray:
    h, w = bgr.shape[:2]
    mx = max(0, int(w * ratio))
    my = max(0, int(h * ratio))
    if w - 2 * mx < 40 or h - 2 * my < 40:
        return bgr
    return bgr[my : h - my, mx : w - mx]


def reduce_glare_mild(bgr: np.ndarray) -> np.ndarray:
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB)
    l, _, _ = cv2.split(lab)
    bright = (l > 247).astype(np.uint8) * 255
    if int(bright.sum()) < 300:
        return bgr
    num, labels, stats, _ = cv2.connectedComponentsWithStats(bright, 8)
    mask = np.zeros_like(bright)
    limit = bgr.shape[0] * bgr.shape[1] * 0.008
    for i in range(1, num):
        area = stats[i, cv2.CC_STAT_AREA]
        if 15 <= area <= limit:
            mask[labels == i] = 255
    if mask.sum() == 0:
        return bgr
    softened = cv2.inpaint(bgr, mask, 3, cv2.INPAINT_TELEA)
    return cv2.addWeighted(softened, 0.3, bgr, 0.7, 0)


def export_webp(bgr: np.ndarray, dest: Path) -> dict:
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    im = Image.fromarray(rgb)
    w, h = im.size
    longest = max(w, h)
    if longest > MAX_EDGE:
        scale = MAX_EDGE / longest
        im = im.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, format="WEBP", quality=WEBP_QUALITY, method=6)
    return {"width": im.width, "height": im.height, "bytes": dest.stat().st_size}


def process_one(src: Path, ref: str) -> dict:
    scene = imread_bgr(src)
    if scene is None:
        raise RuntimeError(f"Cannot read {src}")

    ref_img = load_reference_bgr(ref)
    if ref_img is None:
        raise RuntimeError(f"Missing reference crop for {ref}")

    rh, rw = ref_img.shape[:2]
    target_aspect = rw / max(rh, 1)

    method = "feature_match"
    conf = 0.0
    matched = match_artwork_quad(scene, ref_img)
    if matched is not None:
        quad, conf = matched
        # Output at higher res than reference while keeping aspect
        scale = min(2.8, (max(scene.shape[:2]) * 0.7) / max(rw, rh))
        out_w = max(rw, int(rw * scale))
        out_h = max(rh, int(rh * scale))
        cropped = warp_quad(scene, quad, out_w, out_h)
    else:
        method = "aspect_quad"
        quad = detect_quad_aspect_aware(scene, target_aspect)
        if quad is None:
            method = "center_fallback"
            h, w = scene.shape[:2]
            # Prefer center region matching target aspect
            if target_aspect >= 1:
                cw = int(w * 0.72)
                ch = int(cw / target_aspect)
            else:
                ch = int(h * 0.78)
                cw = int(ch * target_aspect)
            cw = min(cw, w - 4)
            ch = min(ch, h - 4)
            x0 = (w - cw) // 2
            y0 = max(0, (h - ch) // 2 - int(h * 0.04))
            cropped = scene[y0 : y0 + ch, x0 : x0 + cw]
        else:
            cropped = warp_quad(scene, quad)

    cropped = trim_border(cropped, 0.006)
    cropped = reduce_glare_mild(cropped)

    WORK_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    imwrite_bgr(WORK_DIR / f"{ref}.png", cropped)
    preview = cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB)
    pimg = Image.fromarray(preview)
    pimg.thumbnail((720, 720))
    pimg.save(PREVIEW_DIR / f"{ref}.jpg", quality=82)

    out = OUT_DIR / f"{ref}.webp"
    stats = export_webp(cropped, out)
    return {
        "ref": ref,
        "source": src.name,
        "method": method,
        "match_confidence": round(conf, 3),
        "target_aspect": round(target_aspect, 3),
        "output": str(out.relative_to(REPO)).replace("\\", "/"),
        **stats,
    }


def main() -> int:
    originals = sorted(
        {p.resolve(): p for p in SOURCE_DIR.glob("C-00*") if p.suffix.lower() in {".jpg", ".jpeg", ".png"}}.values(),
        key=lambda p: p.name,
    )
    if not originals:
        raise SystemExit(f"No originals in {SOURCE_DIR}")
    for bak in OUT_DIR.glob("C-00*.webp.bak"):
        dest = OUT_DIR / bak.name[: -len(".bak")]
        shutil.copy2(bak, dest)

    results = []
    for src in originals:
        ref = src.name.split("__", 1)[0]
        if ref in SOLD_REFS:
            continue
        info = process_one(src, ref)
        print(
            f"{ref}: {info['method']} conf={info['match_confidence']} "
            f"-> {info['width']}x{info['height']} ({info['bytes']} B)"
        )
        results.append(info)

    MANIFEST.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"\nProcessed {len(results)} artworks")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
