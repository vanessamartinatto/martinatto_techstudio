#!/usr/bin/env python3
"""Footer lockup v3 - optical compensation done right.

The footer MARTINATTO line renders at ~9px vs ~17px in the header. Thin
strokes at that scale lose antialiasing coverage and render darker
(96,59,189 vs header ~127,118,203). Channel gains alone cannot fix it
(coverage alpha too low).

Approach: dilate the wordmark strokes at the logo's NATIVE resolution
(2660px wide, strokes ~20px) BEFORE downscaling, so the strokes survive the
22x reduction with high coverage - same apparent weight/tone as the header
rendering. Classic optical size compensation.

Pipeline:
  logo11 -> split (diamond / wordmark) -> MaxFilter dilate wordmark alpha
  -> recompose at original geometry -> LANCZOS 518x640 -> mild channel lift
  on text rows -> save.
"""
import numpy as np
from PIL import Image, ImageFilter

SRC = "/home/z/my-project/upload/logo11.png"
OUT = "/home/z/my-project/public/images/martinatto-footer-lockup.png"

# ---- tunables ----
DILATE_PX = 15        # native-res alpha dilation (strokes 20px -> 35px)
SPLIT_Y0 = 2700       # wordmark region start (transparent band 2692-2867)
R_GAIN = 0.96
G_GAIN = 0.91
B_GAIN = 1.05
ASSET_W, ASSET_H = 518, 640
TEXT_Y0_IN_ASSET = 552  # for reporting only
# -------------------

src = Image.open(SRC).convert("RGBA")
W, H = src.size

diamond = src.crop((0, 0, W, 2692))
word = src.crop((0, SPLIT_Y0, W, H))

# dilate wordmark alpha at native res
a = word.getchannel("A").filter(ImageFilter.MaxFilter(DILATE_PX))
word = word.copy()
word.putalpha(a)

# recompose at original geometry
canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
canvas.paste(diamond, (0, 0), diamond)
canvas.paste(word, (0, SPLIT_Y0), word)

# downscale to asset size
canvas = canvas.resize((ASSET_W, ASSET_H), Image.LANCZOS)

# mild channel lift on text rows only
arr = np.array(canvas).astype(float)
head, text = arr[:TEXT_Y0_IN_ASSET].copy(), arr[TEXT_Y0_IN_ASSET:].copy()
text[..., 0] = np.clip(text[..., 0] * R_GAIN, 0, 255)
text[..., 1] = np.clip(text[..., 1] * G_GAIN, 0, 255)
text[..., 2] = np.clip(text[..., 2] * B_GAIN, 0, 255)
out = np.concatenate([head, text], axis=0)

Image.fromarray(out.astype(np.uint8)).save(OUT, "PNG", optimize=True)
m = out[TEXT_Y0_IN_ASSET:, ..., 3] > 128
print("asset wordmark avg RGB:", tuple(out[TEXT_Y0_IN_ASSET:, ..., :3][m].mean(axis=0).astype(int)))
print("saved", OUT)
