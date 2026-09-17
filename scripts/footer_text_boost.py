#!/usr/bin/env python3
"""Perceptual compensation v2 for the footer lockup wordmark.

Measured problem: source tones identical (header wordmark vs logo11 wordmark,
delta <=1/255), but the footer's MARTINATTO line renders ~9px tall (vs ~17px
in the header). At that size strokes are ~0.9px wide -> antialiasing blends
them with the dark background and the text renders much darker:
rendered footer (93,63,187) vs header (127,118,203). Pure channel gains hit a
physical limit (coverage alpha ~0.35 cannot reach the target for G).

v2 adds alpha DILATION (MaxFilter) on the wordmark region: thickens apparent
stroke coverage at display size, which is what actually raises the blended
tone. Combined with moderate channel lift + unsharp mask.
"""
import numpy as np
from PIL import Image, ImageFilter

PATH = "/home/z/my-project/public/images/martinatto-footer-logo.png"

# ---- tunables ----
TEXT_Y0 = 552            # wordmark region start (diamond tip ends ~row 524)
DILATE_PX = 3            # MaxFilter size on alpha (odd number)
ALPHA_GAMMA = 0.8        # mild extra coverage shaping after dilation
UNSHARP = (2, 120, 2)    # radius, percent, threshold
R_GAIN = 1.18
G_GAIN = 1.34
B_GAIN = 1.02
# -------------------

img = Image.open(PATH).convert("RGBA")
arr = np.array(img).astype(float)

head = arr[:TEXT_Y0].copy()          # diamond region - untouched
text = arr[TEXT_Y0:].copy()

# 1. alpha dilation (MaxFilter on alpha channel only)
alpha_img = Image.fromarray(text[..., 3].astype(np.uint8))
alpha_img = alpha_img.filter(ImageFilter.MaxFilter(DILATE_PX))
text[..., 3] = np.array(alpha_img).astype(float)

# 2. mild alpha gamma
a = np.clip(text[..., 3] / 255.0, 0, 1)
text[..., 3] = (a ** ALPHA_GAMMA) * 255.0

# 3. channel lift
text[..., 0] = np.clip(text[..., 0] * R_GAIN, 0, 255)
text[..., 1] = np.clip(text[..., 1] * G_GAIN, 0, 255)
text[..., 2] = np.clip(text[..., 2] * B_GAIN, 0, 255)

# 4. unsharp mask on the region
t_img = Image.fromarray(text.astype(np.uint8))
t_img = t_img.filter(ImageFilter.UnsharpMask(radius=UNSHARP[0], percent=UNSHARP[1], threshold=UNSHARP[2]))

out = np.concatenate([head, np.array(t_img).astype(float)], axis=0)
Image.fromarray(out.astype(np.uint8)).save(PATH, "PNG", optimize=True)

chk = out[TEXT_Y0:]
m = chk[..., 3] > 128
print("asset wordmark avg RGB now:", tuple(chk[..., :3][m].mean(axis=0).astype(int)))
print("saved", PATH)
