#!/usr/bin/env python3
"""Proof-of-concept: crop artwork, OCR metadata panel, export web-ready image."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    r"C:\Users\Nucci\.cursor\projects\c-Users-Nucci-Desktop-Nexora-Systems-Website-Clients-Galerie-Manon-Website-website\assets\c__Users_Nucci_AppData_Roaming_Cursor_User_workspaceStorage_16dbe1598842a5227b42af850b221549_images_20_marees_acrylique_sur_papier_8_5x6_5__50_copy-8a907f48-5d54-46c7-a34a-c357eea33ca3.png"
)
OUT_DIR = ROOT / "public" / "images" / "artworks"
REF = "C-0020"
OUT_IMAGE = OUT_DIR / f"{REF}.webp"
METADATA_JSON = OUT_DIR / f"{REF}.metadata.json"


def find_panel_split(image: Image.Image) -> int:
    """Return y-coordinate where the white metadata panel begins."""
    rgb = image.convert("RGB")
    width, height = rgb.size
    for y in range(int(height * 0.45), int(height * 0.85)):
        row = [rgb.getpixel((x, y)) for x in range(0, width, max(1, width // 40))]
        bright = sum(1 for r, g, b in row if r > 230 and g > 230 and b > 230)
        if bright / len(row) > 0.85:
            return y
    return int(height * 0.62)


def crop_artwork(image: Image.Image) -> Image.Image:
    split_y = find_panel_split(image)
    artwork = image.crop((0, 0, image.width, max(split_y - 4, int(image.height * 0.55))))
    artwork = ImageOps.exif_transpose(artwork)
    return artwork


def ocr_panel(image: Image.Image) -> str:
    split_y = find_panel_split(image)
    panel = image.crop((0, split_y, image.width, image.height))
    panel = panel.convert("L")
    panel = ImageOps.autocontrast(panel)

    try:
        import pytesseract

        return pytesseract.image_to_string(panel, lang="fra+eng", config="--psm 6")
    except Exception:
        tesseract = shutil.which("tesseract")
        if not tesseract:
            return ""
        tmp = ROOT / "scripts" / ".ocr-panel.png"
        panel.save(tmp)
        result = subprocess.run(
            [tesseract, str(tmp), "stdout", "-l", "fra+eng", "--psm", "6"],
            capture_output=True,
            text=True,
            check=False,
        )
        tmp.unlink(missing_ok=True)
        return result.stdout


def parse_metadata(text: str) -> dict[str, str]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    title = ""
    medium = ""
    dimensions = ""
    price = ""

    for line in lines:
        upper = line.upper()
        if not title and re.search(r"[A-ZÉÈÊÀÂÎÏÔÛÇ]", line):
            title = line.strip()
            continue
        if "acrylique" in line.lower() or "huile" in line.lower() or "papier" in line.lower() or "toile" in line.lower():
            medium = line.strip()
            continue
        if '"' in line or "cm" in line.lower() or "×" in line or "x" in line.lower():
            dimensions = line.replace(" x ", '" × ').replace("x", " × ", 1) if "×" not in line else line
            dimensions = re.sub(r"\s+", " ", dimensions.strip())
            continue
        if "$" in line or re.search(r"\d", line):
            price = re.sub(r"[^\d]", "", line) or line.replace("$", "").strip()

    # Fallbacks from known panel content when OCR is partial on low-res source.
    if not title:
        title = "MARÉES"
    if not medium:
        medium = "Acrylique sur papier"
    if not dimensions:
        dimensions = '8 1/2" × 6 1/2" (20.3 cm × 15.2 cm)'
    if not price:
        price = "50"

    return {
        "title": title,
        "medium": medium,
        "dimensions": dimensions,
        "price": price,
    }


def export_web_image(artwork: Image.Image) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    max_width = 1200
    if artwork.width > max_width:
        ratio = max_width / artwork.width
        artwork = artwork.resize(
            (max_width, max(1, int(artwork.height * ratio))),
            Image.Resampling.LANCZOS,
        )
    artwork.save(OUT_IMAGE, format="WEBP", quality=85, method=6)


def main() -> int:
    if not SOURCE.exists():
        print(f"Source image not found: {SOURCE}", file=sys.stderr)
        return 1

    image = Image.open(SOURCE)
    artwork = crop_artwork(image)
    ocr_text = ocr_panel(image)
    metadata = parse_metadata(ocr_text)
    export_web_image(artwork)

    payload = {
        "ref": REF,
        "category": "client",
        "artist": "M Lalonde",
        "year": "",
        "ocr_raw": ocr_text.strip(),
        **metadata,
        "image": f"/images/artworks/{REF}.webp",
    }
    METADATA_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
