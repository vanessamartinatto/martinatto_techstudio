#!/usr/bin/env python3
"""Unify the diamond color across the site (user choice: vivid purple from logo11).

Regenerates from the logo11 diamond region (same design as the old immagine
asset, 99.3% silhouette IoU, but vivid purple avg RGB ~90/65/213):
  1. public/images/vm-studio-logo.png  - 1024x1024, content at 93% (Task 13 recipe)
     used by: header, Chi Sono badge
  2. public/images/vm-logo-3d.png      - 1202x1222 full-bleed (old texture recipe)
     used by: hero 3D rotating logo (Three.js texture + static fallback)
"""
import hashlib
from PIL import Image

SRC = "/home/z/my-project/upload/logo11.png"
DIAMOND_BOX = (0, 0, 2660, 2692)  # diamond region (transparent band starts at row 2692)


def md5(path: str) -> str:
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()


src = Image.open(SRC).convert("RGBA")
diamond = src.crop(DIAMOND_BOX)
bbox = diamond.getchannel("A").getbbox()
diamond = diamond.crop(bbox)  # tight crop
print("diamond tight content:", diamond.size)

# --- 1. Header diamond: 1024x1024, content 93%, centered ---
canvas_h = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
target = 934  # 93% of 1024 (rounded, slightly conservative vs measured 91.5-93%)
ratio = target / max(diamond.size)
d_resized = diamond.resize(
    (round(diamond.width * ratio), round(diamond.height * ratio)), Image.LANCZOS
)
off = ((1024 - d_resized.width) // 2, (1024 - d_resized.height) // 2)
canvas_h.paste(d_resized, off, d_resized)
out1 = "/home/z/my-project/public/images/vm-studio-logo.png"
canvas_h.save(out1, "PNG", optimize=True)
print("header:", canvas_h.size, "md5:", md5(out1))

# --- 2. 3D texture: 1202x1222 full-bleed contain, centered ---
canvas3 = Image.new("RGBA", (1202, 1222), (0, 0, 0, 0))
ratio3 = min(1202 / diamond.width, 1222 / diamond.height)
d3 = diamond.resize(
    (round(diamond.width * ratio3), round(diamond.height * ratio3)), Image.LANCZOS
)
off3 = ((1202 - d3.width) // 2, (1222 - d3.height) // 2)
canvas3.paste(d3, off3, d3)
out2 = "/home/z/my-project/public/images/vm-logo-3d.png"
canvas3.save(out2, "PNG", optimize=True)
print("3d texture:", canvas3.size, "md5:", md5(out2))

# --- verify: average opaque color of both outputs (expect ~90/65/213 family) ---
import numpy as np

for p in (out1, out2):
    a = np.array(Image.open(p).convert("RGBA")).astype(float)
    m = a[..., 3] > 128
    rgb = a[..., :3][m].mean(axis=0).astype(int)
    print(p.split("/")[-1], "avg RGB:", tuple(rgb))
