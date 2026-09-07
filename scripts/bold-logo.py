"""
Bold variant of the diamond emblem for small UI sizes (navbar 40px).
Thickens strokes via max-filter dilation + stronger gamma.
Overwrites public/images/vm-logo.png.
"""
import numpy as np
from PIL import Image
from scipy import ndimage

SRC = "/home/z/my-project/upload/Untitled Project (2).png"
OUT = "/home/z/my-project/public/images/vm-logo.png"

L = np.array(Image.open(SRC).convert("L")).astype(float)
ys0, ys1, xs0, xs1 = 173, 735, 235, 787
L_c = L[ys0:ys1, xs0:xs1]

# darkness → boost
d = np.clip((250.0 - L_c) / 250.0, 0, 1)
d_boost = np.clip((d / 0.68) ** 0.38, 0, 1)
# thicken strokes: grayscale dilation (max filter) then soften
d_bold = ndimage.grey_dilation(d_boost, size=(3, 3))
d_bold = ndimage.gaussian_filter(d_bold, sigma=0.6)
# renormalize so peaks stay solid white, then push brightness (x1.7)
mx = d_bold.max()
d_bold = np.clip(d_bold / mx, 0, 1) if mx > 0 else d_bold
d_bold = np.clip(d_bold * 1.7, 0, 1)

rgba = np.zeros((*d_bold.shape, 4), dtype=np.uint8)
rgba[..., 0:3] = 255
rgba[..., 3] = (d_bold * 255).astype(np.uint8)

logo = Image.fromarray(rgba)
side = max(logo.size)
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
canvas.paste(logo, ((side - logo.width) // 2, (side - logo.height) // 2))
canvas.save(OUT)
print("saved", OUT, canvas.size)

# small-size previews on navbar-like strip
strip = Image.new("RGBA", (560, 80), (5, 7, 13, 255))
for i, s in enumerate([40, 56, 64]):
    dd = canvas.resize((s, s), Image.LANCZOS)
    strip.alpha_composite(dd, (24 + i * 80, (80 - s) // 2))
strip.save("/home/z/my-project/scripts/shots/logo-bold-sizes.png")
print("saved preview")
