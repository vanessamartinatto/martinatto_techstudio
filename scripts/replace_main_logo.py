#!/usr/bin/env python3
"""
Task 13: Replace the main site logo with the client's newly attached diamond.

- Overwrites public/images/vm-studio-logo.png (used by navbar Logo component
  => header + footer, and the Chi Sono badge in about.tsx) with a square,
  slightly padded version of the new 1202x1222 transparent diamond.
- Regenerates src/app/icon.png (favicon 256px) with the new diamond on a
  dark radial tile so the browser tab matches the new branding.
"""
from PIL import Image, ImageDraw, ImageOps

UPLOAD = "/home/z/my-project/upload/immagine_2026-09-16_153622356.png"
MAIN_LOGO = "/home/z/my-project/public/images/vm-studio-logo.png"
FAVICON = "/home/z/my-project/src/app/icon.png"

src = Image.open(UPLOAD).convert("RGBA")
print("source:", src.size)


def padded_square(img: Image.Image, out_size: int, fill: float) -> Image.Image:
    """Scale `img` so its longest side equals fill*out_size, center on a
    transparent out_size x out_size canvas (LANCZOS, alpha preserved)."""
    scale = (out_size * fill) / max(img.size)
    new_w = round(img.width * scale)
    new_h = round(img.height * scale)
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    canvas = Image.new("RGBA", (out_size, out_size), (0, 0, 0, 0))
    canvas.paste(resized, ((out_size - new_w) // 2, (out_size - new_h) // 2), resized)
    return canvas


# --- 1. Main logo: 1024x1024, diamond at 93% so sharp tips breathe in tiles ---
main = padded_square(src, 1024, 0.93)
main.save(MAIN_LOGO, optimize=True)
print("saved", MAIN_LOGO, main.size)

# --- 2. Favicon 256px: new diamond on a dark radial tile (site background vibe) ---
fav_size = 256
tile = Image.new("RGBA", (fav_size, fav_size))
px = tile.load()
cx = cy = (fav_size - 1) / 2
max_d = (fav_size ** 2) ** 0.5 / 2
center_rgb = (27, 18, 53)     # violet-950-ish
edge_rgb = (5, 7, 13)         # #05070D site background
for y in range(fav_size):
    for x in range(fav_size):
        d = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5 / max_d
        t = min(d, 1.0)
        r = round(center_rgb[0] + (edge_rgb[0] - center_rgb[0]) * t)
        g = round(center_rgb[1] + (edge_rgb[1] - center_rgb[1]) * t)
        b = round(center_rgb[2] + (edge_rgb[2] - center_rgb[2]) * t)
        px[x, y] = (r, g, b, 255)

diamond = padded_square(src, fav_size, 0.82)
tile.alpha_composite(diamond)
tile.save(FAVICON, optimize=True)
print("saved", FAVICON, tile.size)

# --- 3. Verify results ---
for p in (MAIN_LOGO, FAVICON):
    chk = Image.open(p)
    print(p, chk.size, chk.mode, "alpha bbox:", chk.getchannel("A").getbbox())
