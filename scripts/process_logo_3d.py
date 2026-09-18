#!/usr/bin/env python3
"""Remove the white background from the VM Studio diamond logo and crop to content.

Output: /home/z/my-project/public/images/vm-logo-3d.png (transparent PNG)
"""
from PIL import Image

SRC = "/home/z/my-project/upload/Untitled Project.png"
DST = "/home/z/my-project/public/images/vm-logo-3d.png"

im = Image.open(SRC).convert("RGBA")
pixels = im.load()
w, h = im.size

# Un-matte from white: alpha = 255 - min(r,g,b); recover foreground color
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        mn = min(r, g, b)
        alpha = 255 - mn
        if alpha == 0:
            pixels[x, y] = (0, 0, 0, 0)
        else:
            rr = max(0, min(255, (r - mn) * 255 // alpha))
            gg = max(0, min(255, (g - mn) * 255 // alpha))
            bb = max(0, min(255, (b - mn) * 255 // alpha))
            pixels[x, y] = (rr, gg, bb, alpha)

# Crop to content bounding box with small padding
bbox = im.getbbox()
if bbox:
    pad = 12
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(w, bbox[2] + pad)
    bottom = min(h, bbox[3] + pad)
    im = im.crop((left, top, right, bottom))

im.save(DST)
print("saved", DST, "size:", im.size)
