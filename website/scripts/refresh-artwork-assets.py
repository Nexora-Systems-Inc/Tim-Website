#!/usr/bin/env python3
"""Refresh gallery artwork assets with framed presentation.

Locates each painting in the high-res room photo via ORB matching against the
current gallery crop, expands the region to preserve the full frame plus a small
consistent outer margin, perspective-corrects, and exports optimized WebP.
"""

from __future__ import annotations

import json
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

# Expand matched painting face outward to include full frame + thin wall margin.
# Angled room photos need ~24% so trapezoid corners aren't clipped.
FRAME_EXPAND = 0.24
# Additional uniform pad after warp (fraction of min dimension) as outer margin.
OUTER_MARGIN = 0.035
SEED_REFS_DIR = REPO / "source-assets" / "artworks" / "seed-refs"


def imread_bgr(path: Path) -> np.ndarray | None:
    try:
        data = np.fromfile(str(path), dtype=np.uint8)
        if data.size == 0:
            return None
        return cv2.imdecode(data, cv2.IMREAD_COLOR)
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


def expand_quad(pts: np.ndarray, factor: float, bounds: tuple[int, int]) -> np.ndarray:
    """Expand quad outward from its centroid, clamped to image bounds."""
    pts = pts.astype("float32")
    center = pts.mean(axis=0)
    expanded = center + (pts - center) * (1.0 + factor)
    h, w = bounds
    expanded[:, 0] = np.clip(expanded[:, 0], 0, w - 1)
    expanded[:, 1] = np.clip(expanded[:, 1], 0, h - 1)
    return expanded


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
    """Prefer frozen seed refs (pre-expansion crops) so re-runs don't snowball."""
    candidates = [
        SEED_REFS_DIR / f"{ref}.webp",
        OUT_DIR / f"{ref}.webp",
    ]
    for path in candidates:
        if not path.exists():
            continue
        im = Image.open(path).convert("RGB")
        return cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)
    return None


def ensure_seed_refs_from_git() -> None:
    """Materialize seed refs from last committed webps if missing."""
    import subprocess

    SEED_REFS_DIR.mkdir(parents=True, exist_ok=True)
    for i in range(1, 24):
        ref = f"C-{i:04d}"
        dest = SEED_REFS_DIR / f"{ref}.webp"
        if dest.exists():
            continue
        try:
            raw = subprocess.check_output(
                ["git", "show", f"HEAD:website/public/images/artworks/{ref}.webp"],
                cwd=str(REPO),
            )
            dest.write_bytes(raw)
        except subprocess.CalledProcessError:
            src = OUT_DIR / f"{ref}.webp"
            if src.exists():
                dest.write_bytes(src.read_bytes())


def match_artwork_quad(scene: np.ndarray, ref_img: np.ndarray) -> tuple[np.ndarray, float] | None:
    orb = cv2.ORB_create(5000)
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

    sh, sw = scene.shape[:2]
    if np.any(warped[:, 0] < -sw * 0.08) or np.any(warped[:, 0] > sw * 1.08):
        return None
    if np.any(warped[:, 1] < -sh * 0.08) or np.any(warped[:, 1] > sh * 1.08):
        return None
    area = cv2.contourArea(warped.astype(np.float32))
    if area < (sh * sw) * 0.025 or area > (sh * sw) * 0.96:
        return None

    return warped.astype("float32"), inliers / max(len(good), 1)


def refine_outer_frame(scene: np.ndarray, seed_quad: np.ndarray, target_aspect: float) -> np.ndarray | None:
    """Try to snap to a larger dark outer frame near the matched painting."""
    sh, sw = scene.shape[:2]
    x, y, bw, bh = cv2.boundingRect(seed_quad.astype(np.float32))
    pad = int(max(bw, bh) * 0.35)
    x0, y0 = max(0, x - pad), max(0, y - pad)
    x1, y1 = min(sw, x + bw + pad), min(sh, y + bh + pad)
    roi = scene[y0:y1, x0:x1]
    if roi.size == 0:
        return None

    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    gray = cv2.bilateralFilter(gray, 9, 75, 75)
    edges = cv2.Canny(cv2.GaussianBlur(gray, (5, 5), 0), 40, 120)
    edges = cv2.dilate(edges, np.ones((5, 5), np.uint8), 2)
    contours, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

    seed_area = float(cv2.contourArea(seed_quad.astype(np.float32)))
    best = None
    best_score = -1.0
    for c in contours:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        if len(approx) != 4 or not cv2.isContourConvex(approx):
            continue
        pts = approx.reshape(4, 2).astype("float32")
        pts[:, 0] += x0
        pts[:, 1] += y0
        area = cv2.contourArea(pts)
        # Prefer slightly larger than seed (frame outside painted face)
        if area < seed_area * 1.02 or area > seed_area * 1.55:
            continue
        rect = order_points(pts)
        (tl, tr, br, bl) = rect
        ww = max(np.linalg.norm(br - bl), np.linalg.norm(tr - tl))
        hh = max(np.linalg.norm(tr - br), np.linalg.norm(tl - bl))
        aspect = ww / max(hh, 1.0)
        aspect_err = abs(np.log(aspect / max(target_aspect, 1e-3)))
        if aspect_err > 0.45:
            continue
        # Must contain seed center
        center = seed_quad.mean(axis=0)
        if cv2.pointPolygonTest(pts.reshape(-1, 1, 2), (float(center[0]), float(center[1])), False) < 0:
            continue
        score = area * np.exp(-aspect_err * 2.0)
        if score > best_score:
            best_score = float(score)
            best = pts
    return best


def add_outer_margin(bgr: np.ndarray, margin_frac: float = OUTER_MARGIN) -> np.ndarray:
    """Always add a thin, even wall-colored margin for consistent framed presentation."""
    h, w = bgr.shape[:2]
    pad = max(6, int(min(h, w) * margin_frac))
    band = max(4, pad)

    # Sample wall color from the brightest border patches (prefer actual wall over paint)
    patches = [
        bgr[:band, :band],
        bgr[:band, -band:],
        bgr[-band:, :band],
        bgr[-band:, -band:],
        bgr[:band, w // 2 - band : w // 2 + band],
        bgr[-band:, w // 2 - band : w // 2 + band],
        bgr[h // 2 - band : h // 2 + band, :band],
        bgr[h // 2 - band : h // 2 + band, -band:],
    ]
    means = [p.reshape(-1, 3).mean(axis=0) for p in patches if p.size]
    # Prefer mid-light neutrals typical of walls (avoid pure white wash / dark paint)
    def wall_score(m: np.ndarray) -> float:
        brightness = float(m.mean())
        chroma = float(np.std(m))
        if brightness < 90 or brightness > 245:
            return -1.0
        return brightness - chroma * 0.5

    scored = sorted(((wall_score(m), m) for m in means), key=lambda t: -t[0])
    wall = scored[0][1] if scored and scored[0][0] > 0 else np.array([210.0, 210.0, 210.0])

    canvas = np.full((h + 2 * pad, w + 2 * pad, 3), wall, dtype=np.float32)
    canvas = np.clip(canvas, 0, 255).astype(np.uint8)
    canvas[pad : pad + h, pad : pad + w] = bgr
    return canvas


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
    return cv2.addWeighted(softened, 0.28, bgr, 0.72, 0)


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
    sh, sw = scene.shape[:2]

    method = "feature_match_framed"
    conf = 0.0
    matched = match_artwork_quad(scene, ref_img)

    if matched is not None:
        seed_quad, conf = matched
        # Prefer real outer frame if detectable; else geometric expand.
        outer = refine_outer_frame(scene, seed_quad, target_aspect)
        if outer is not None:
            quad = expand_quad(outer, 0.06, (sh, sw))  # small wall margin outside frame
            method = "feature_match_outer_frame"
        else:
            quad = expand_quad(seed_quad, FRAME_EXPAND, (sh, sw))
            method = "feature_match_expanded"

        scale = min(2.6, (max(sh, sw) * 0.75) / max(rw, rh))
        out_w = max(rw, int(rw * scale * (1 + FRAME_EXPAND)))
        out_h = max(rh, int(rh * scale * (1 + FRAME_EXPAND)))
        cropped = warp_quad(scene, quad, out_w, out_h)
    else:
        method = "center_fallback"
        if target_aspect >= 1:
            cw = int(sw * 0.78)
            ch = int(cw / target_aspect)
        else:
            ch = int(sh * 0.82)
            cw = int(ch * target_aspect)
        cw, ch = min(cw, sw - 4), min(ch, sh - 4)
        x0 = (sw - cw) // 2
        y0 = max(0, (sh - ch) // 2 - int(sh * 0.03))
        cropped = scene[y0 : y0 + ch, x0 : x0 + cw]

    cropped = add_outer_margin(cropped, OUTER_MARGIN)
    cropped = reduce_glare_mild(cropped)

    WORK_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    imwrite_bgr(WORK_DIR / f"{ref}.png", cropped)
    preview = Image.fromarray(cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB))
    preview.thumbnail((720, 720))
    preview.save(PREVIEW_DIR / f"{ref}.jpg", quality=82)

    stats = export_webp(cropped, OUT_DIR / f"{ref}.webp")
    return {
        "ref": ref,
        "source": src.name,
        "method": method,
        "match_confidence": round(conf, 3),
        "target_aspect": round(target_aspect, 3),
        "output": f"website/public/images/artworks/{ref}.webp",
        **stats,
    }


def main() -> int:
    originals = sorted(
        {p.resolve(): p for p in SOURCE_DIR.glob("C-00*") if p.suffix.lower() in {".jpg", ".jpeg", ".png"}}.values(),
        key=lambda p: p.name,
    )
    if not originals:
        raise SystemExit(f"No originals in {SOURCE_DIR}")

    ensure_seed_refs_from_git()

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
    print(f"\nProcessed {len(results)} artworks with framed presentation")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
