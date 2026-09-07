"""
Compare two emblem reconstruction approaches on a dark background:
  A) line-art: alpha = boosted darkness map (faithful wireframe look)
  B) solid: aggressive closing (21px) + fill_holes + crease cuts
"""
import numpy as np
from PIL import Image
from scipy import ndimage

SRC = "/home/z/my-project/upload/Untitled Project (2).png"
img = Image.open(SRC).convert("L")
L = np.array(img).astype(float)
h, w = L.shape

# crop region of the emblem (diamond bbox found earlier + margin)
ys0, ys1, xs0, xs1 = 173, 735, 235, 787
L_c = L[ys0:ys1, xs0:xs1]

# ---------- A) line-art ---------------------------------------------------
d = np.clip((250.0 - L_c) / 250.0, 0, 1)     # darkness 0..1 (max ~0.68)
d_boost = np.clip((d / 0.68) ** 0.55, 0, 1)  # boost faint lines
d_boost = ndimage.gaussian_filter(d_boost, sigma=0.7)
alphaA = (d_boost * 255).astype(np.uint8)

aA = np.zeros((*alphaA.shape, 4), dtype=np.uint8)
aA[..., 0:3] = 255
aA[..., 3] = alphaA

# ---------- B) solid ------------------------------------------------------
lines = L_c < 246.0
closed = ndimage.binary_closing(lines, structure=np.ones((21, 21)))
filled = ndimage.binary_fill_holes(closed)
lbl, n = ndimage.label(filled)
sizes = ndimage.sum(filled, lbl, range(1, n + 1))
keep = lbl == (int(np.argmax(sizes)) + 1)
keep = ndimage.binary_opening(keep, structure=np.ones((9, 9)))
keep = ndimage.binary_fill_holes(keep)
print("B filled size:", keep.sum())

sil_soft = ndimage.gaussian_filter(keep.astype(float), sigma=1.2)
d2 = np.clip((246.0 - L_c) / 246.0, 0, 1)
d2_soft = ndimage.gaussian_filter(d2, sigma=1.0)
# creases only cut INSIDE (protect outer edge via eroded mask)
inner = ndimage.binary_erosion(keep, iterations=6).astype(float)
inner_soft = ndimage.gaussian_filter(inner, sigma=2.0)
crease = d2_soft * inner_soft
alphaB = np.clip(sil_soft * (1 - 0.88 * crease), 0, 1)
aB = np.zeros((*alphaB.shape, 4), dtype=np.uint8)
aB[..., 0:3] = 255
aB[..., 3] = (alphaB * 255).astype(np.uint8)

# ---------- side-by-side on dark bg --------------------------------------
H, W = aA.shape[:2]
BG = (5, 7, 13, 255)
combo = Image.new("RGBA", (W * 2 + 60, H + 40), BG)
combo.alpha_composite(Image.fromarray(aA, "RGBA"), (20, 20))
combo.alpha_composite(Image.fromarray(aB, "RGBA"), (W + 40, 20))
combo.save("/home/z/my-project/scripts/shots/logo-ab-compare.png")
print("saved compare: left=A line-art, right=B solid")
