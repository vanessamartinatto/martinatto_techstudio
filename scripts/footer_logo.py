#!/usr/bin/env python3
"""Prepare the footer logo asset from upload/logo10.png.

Source: 2660x3287 RGBA full stacked lockup (diamond + MARTINATTO tech studio),
transparent background. Output: resized transparent PNG for footer display
(h-36 sm:h-44 => 144/176px CSS; 640px height covers DPR 3+).
"""
import hashlib
from PIL import Image

SRC = "/home/z/my-project/upload/logo10.png"
DST = "/home/z/my-project/public/images/martinatto-footer-logo.png"

img = Image.open(SRC)
print("source:", img.size, img.mode)

# Trim fully-transparent margins (bbox is content bounds), then scale.
alpha = img.getchannel("A")
bbox = alpha.getbbox()
print("alpha bbox:", bbox)
if bbox:
    img = img.crop(bbox)

target_h = 640
ratio = target_h / img.height
target_w = round(img.width * ratio)
out = img.resize((target_w, target_h), Image.LANCZOS)
out.save(DST, "PNG", optimize=True)

with open(DST, "rb") as f:
    md5 = hashlib.md5(f.read()).hexdigest()

print("output:", out.size, out.mode)
print("md5:", md5)

# sanity: corners must stay transparent
w, h = out.size
corners = [out.getpixel(p)[:4] for p in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]]
print("corners RGBA:", corners)
