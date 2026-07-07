#!/usr/bin/env python3
"""Bulk import client gallery paintings: crop, OCR, export WebP, emit JSON catalog."""

from __future__ import annotations

import json
import re
import shutil
import sys
import unicodedata
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    r"C:\Users\Nucci\.cursor\projects\c-Users-Nucci-Desktop-Nexora-Systems-Website-Clients-Galerie-Manon-Website-website\assets"
)
OUT_DIR = ROOT / "public" / "images" / "artworks"
DATA_OUT = ROOT / "data" / "client-artworks.json"

SKIP_STEMS = {
    "IMG_0217",
    "IMG_0331",
    "image-",
}

TITLE_CORRECTIONS = {
    "C-0001": {"medium": "Acrylique fini époxy"},
    "C-0002": {"title": "Regard vers l'avenir", "dimensions": '40" × 30"'},
    "C-0003": {"medium": "Acrylique et medium mixte"},
    "C-0004": {"medium": "Acrylique et medium mixte"},
    "C-0008": {"title": "Énigme", "medium": "Acrylique et medium mixte"},
    "C-0012": {"title": "Éclats vibrants"},
    "C-0016": {"title": "Je veille sur vous"},
    "C-0017": {"title": "Ma princesse indienne"},
    "C-0020": {"title": "MARÉES"},
    "C-0023": {"title": "Claire de lune sur mer"},
}

SOLD_TITLE_FALLBACKS = {
    "1342": "Chemin du marais",
    "1890": "Horizons abstraits",
    "1936": "Lumières de la ville",
    "0551": "Village sous la neige",
    "1351": "Floraison estivale",
}

ACCENT_MAP = {
    "a": "à",
    "e": "é",
    "i": "î",
    "u": "ù",
    "c": "ç",
}


def find_panel_split(image: Image.Image) -> int:
    rgb = image.convert("RGB")
    width, height = rgb.size
    for y in range(int(height * 0.45), int(height * 0.88)):
        row = [rgb.getpixel((x, y)) for x in range(0, width, max(1, width // 40))]
        bright = sum(1 for r, g, b in row if r > 230 and g > 230 and b > 230)
        if bright / len(row) > 0.85:
            return y
    return int(height * 0.62)


def crop_artwork(image: Image.Image) -> Image.Image:
    split_y = find_panel_split(image)
    artwork = image.crop((0, 0, image.width, max(split_y - 4, int(image.height * 0.55))))
    return ImageOps.exif_transpose(artwork)


def ocr_panel(image: Image.Image) -> str:
    split_y = find_panel_split(image)
    panel = image.crop((0, split_y, image.width, image.height))
    panel = ImageOps.autocontrast(panel.convert("L"))
    try:
        import pytesseract

        return pytesseract.image_to_string(panel, lang="fra+eng", config="--psm 6")
    except Exception:
        tesseract = shutil.which("tesseract")
        if not tesseract:
            return ""
        tmp = ROOT / "scripts" / ".ocr-panel.png"
        panel.save(tmp)
        import subprocess

        proc = subprocess.run(
            [tesseract, str(tmp), "stdout", "-l", "fra+eng", "--psm", "6"],
            capture_output=True,
            text=True,
            check=False,
        )
        tmp.unlink(missing_ok=True)
        return proc.stdout


def is_sold(text: str) -> bool:
    normalized = unicodedata.normalize("NFKD", text.upper())
    return "VENDU" in normalized or "SOLD" in normalized


def title_case_slug(slug: str) -> str:
    words = slug.replace("__", "_").split("_")
    out: list[str] = []
    for word in words:
        if not word or word.isdigit():
            continue
        lower = word.lower()
        if lower in {"acrylique", "encre", "aquarelle", "et", "sur", "papier", "toile", "medium", "mixte", "fini", "expoxy", "epoxy"}:
            out.append(lower.capitalize() if lower != "et" else "et")
        elif lower in {"de", "du", "des", "la", "le", "les", "l", "en", "au", "aux"}:
            out.append(lower)
        else:
            out.append(lower.capitalize())
    if out:
        out[0] = out[0].capitalize()
    title = " ".join(out)
    title = title.replace("Lavenir", "l'avenir").replace("Sanime", "animée")
    title = title.replace("Princess", "Princesse")
    title = title.replace("Fees", "Fées")
    return title


def format_dim_token(token: str) -> str:
    token = token.replace("_copy", "")
    if "_" in token and token.replace("_", "").replace(".", "").isdigit():
        parts = token.split("_")
        if len(parts) == 2:
            return f'{parts[0]} 1/2"'
        if len(parts) == 3:
            return f'{parts[0]} {parts[1]}/{parts[2]}"'
    if token.isdigit():
        return f'{token}"'
    return token


def format_dimensions(raw: str) -> str:
    raw = raw.replace("_copy", "")
    if "x" not in raw.lower():
        return raw
    parts = re.split(r"[x×]", raw, maxsplit=1, flags=re.I)
    if len(parts) != 2:
        return raw
    w = format_dim_token(parts[0].strip())
    h = format_dim_token(parts[1].strip())
    return f"{w} × {h}"


def parse_filename(stem: str) -> dict | None:
    stem = re.sub(r"-[a-f0-9]{8}.*$", "", stem)
    stem = stem.replace("_copy", "")

    if any(stem.startswith(s) for s in SKIP_STEMS):
        return None

    if stem.startswith("IMG_0217") or stem.startswith("IMG_0331"):
        return None

    if stem.startswith("IMG_"):
        num = stem.replace("IMG_", "").replace("_copy", "").split("-")[0]
        return {"catalog_num": num, "is_img": True}

    m = re.match(r"^(\d+)_(.+?)__([0-9_]+)$", stem)
    if not m:
        return None
    catalog_num = m.group(1)
    body = m.group(2)
    price = re.sub(r"[^\d]", "", m.group(3))

    medium_keywords = (
        "acrylique_fini_epoxy",
        "acrylique_et_epoxy",
        "acrylique_medium_mixte",
        "acrylique_sur_papier",
        "encre_sur_papier",
        "aquarelle",
        "encre",
        "acrylique",
    )
    medium = ""
    title_part = body
    dim_match = re.search(r"(\d+(?:_\d+)*x\d+(?:_\d+)*)", body)
    dimensions = format_dimensions(dim_match.group(1)) if dim_match else ""

    for key in sorted(medium_keywords, key=len, reverse=True):
        if key in body:
            idx = body.index(key)
            title_part = body[:idx].strip("_")
            if dim_match and dim_match.start() >= idx:
                title_part = body[: dim_match.start()].strip("_")
            medium = key.replace("_", " ")
            break

    medium = medium.replace("expoxy", "époxy").replace("epoxy", "époxy")
    medium = medium.replace("mixte", "mixte").title()
    medium = medium.replace("Sur Papier", "sur papier").replace("Et ", "et ")

    title = title_case_slug(title_part.strip("_"))

    return {
        "catalog_num": catalog_num,
        "title": title,
        "medium": medium,
        "dimensions": dimensions,
        "price": price,
        "is_img": False,
    }


def parse_ocr(text: str, fallback: dict) -> dict:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    sold = is_sold(text)
    title = fallback.get("title", "")
    medium = fallback.get("medium", "")
    dimensions = fallback.get("dimensions", "")
    price = fallback.get("price", "")

    if sold and len(lines) <= 2:
        return {
            "title": title,
            "medium": medium,
            "dimensions": dimensions,
            "price": "",
            "sold": True,
        }

    for i, line in enumerate(lines):
        low = line.lower()
        if is_sold(line) and not title:
            sold = True
            continue
        if not title and len(line) > 2 and not re.search(r"\d+\s*[\"']?\s*x", line, re.I):
            if "$" not in line and "cm" not in low and "acrylique" not in low and "encre" not in low and "aquarelle" not in low:
                title = line.strip()
                continue
        if any(k in low for k in ("acrylique", "encre", "aquarelle", "huile", "époxy", "epoxy", "mixte")):
            medium = line.strip()
            continue
        if '"' in line or "cm" in low or re.search(r"\d+\s*[x×]", line, re.I):
            dimensions = re.sub(r"\s+", " ", line.replace(" x ", '" × '))
            continue
        if "$" in line or (re.fullmatch(r"\d+", re.sub(r"[^\d]", "", line) or "") and int(re.sub(r"[^\d]", "", line)) < 10000):
            digits = re.sub(r"[^\d]", "", line)
            if digits:
                price = digits

    if title.upper() == "VENDU":
        sold = True
        title = fallback.get("title", "")

    return {
        "title": title or fallback.get("title", "Sans titre"),
        "medium": medium or fallback.get("medium", ""),
        "dimensions": dimensions or fallback.get("dimensions", ""),
        "price": "" if sold else (price or fallback.get("price", "")),
        "sold": sold,
    }


def export_web_image(artwork: Image.Image, dest: Path) -> None:
    max_width = 1200
    if artwork.width > max_width:
        ratio = max_width / artwork.width
        artwork = artwork.resize(
            (max_width, max(1, int(artwork.height * ratio))),
            Image.Resampling.LANCZOS,
        )
    artwork.save(dest, format="WEBP", quality=85, method=6)


def extract_stem(path: Path) -> str:
    name = path.name
    if "images_" not in name:
        return ""
    return name.split("images_", 1)[1]


def pick_sources() -> list[Path]:
    files = sorted(ASSETS.glob("*images_*.png"))
    by_catalog: dict[str, Path] = {}
    for path in files:
        stem = extract_stem(path)
        if not stem:
            continue
        parsed = parse_filename(stem)
        if parsed is None:
            continue
        key = parsed["catalog_num"]
        if parsed.get("is_img"):
            key = f"IMG-{key}"
        # Prefer longer UUID filenames (newer uploads) when duplicates exist
        existing = by_catalog.get(key)
        if existing is None or len(path.name) >= len(existing.name):
            by_catalog[key] = path
    return list(by_catalog.values())


def main() -> int:
    if not ASSETS.exists():
        print(f"Assets folder not found: {ASSETS}", file=sys.stderr)
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    DATA_OUT.parent.mkdir(parents=True, exist_ok=True)

    catalog: list[dict] = []
    sources = pick_sources()

    for path in sorted(sources, key=lambda p: extract_stem(p)):
        stem = extract_stem(path)
        fallback = parse_filename(stem) or {}
        catalog_num = fallback.get("catalog_num", "0000")
        ref = f"C-{str(catalog_num).zfill(4)}" if not fallback.get("is_img") else f"C-{catalog_num}"

        if fallback.get("is_img"):
            fallback["title"] = SOLD_TITLE_FALLBACKS.get(catalog_num, f"Œuvre {catalog_num}")
            fallback["sold"] = True
            fallback["price"] = ""

        image = Image.open(path)
        ocr_text = ocr_panel(image)
        meta = parse_ocr(ocr_text, fallback)

        if fallback.get("is_img"):
            meta["sold"] = True
            meta["price"] = ""

        artwork = crop_artwork(image)
        out_image = OUT_DIR / f"{ref}.webp"
        export_web_image(artwork, out_image)

        entry = {
            "ref": ref,
            "title": meta["title"],
            "artist": "M Lalonde",
            "year": "s.d.",
            "medium": meta["medium"],
            "dimensions": meta["dimensions"],
            "price": meta["price"],
            "sold": meta.get("sold", False),
            "category": "client",
            "image": f"/images/artworks/{ref}.webp",
            "featured": False,
            "source_file": path.name,
            "ocr_raw": ocr_text.strip(),
        }
        entry.update(TITLE_CORRECTIONS.get(ref, {}))
        catalog.append(entry)

    catalog.sort(key=lambda item: item["ref"])
    DATA_OUT.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")

    sold_count = sum(1 for item in catalog if item["sold"])
    print(json.dumps({"imported": len(catalog), "sold": sold_count, "output": str(DATA_OUT)}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
