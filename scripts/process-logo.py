"""
Final VM Studio emblem assets for the dark theme.

Approach: line-art reconstruction — alpha = boosted darkness map.
The uploaded logo is white-on-white (emblem defined only by soft shadow
lines), so the faithful dark-theme rendering is a white wireframe diamond,
which matches the site's neon/glow "Deep Space Tech" aesthetic.

Outputs:
  - public/images/vm-logo.png : white diamond wireframe, transparent bg
  - src/app/icon.png          : 256px favicon (violet gradient tile + diamond)
"""
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

SRC = "/home/z/my-project/upload/Untitled Project (2).png"
OUT_LOGO = "/home/z/my-project/public/images/vm-logo.png"
OUT_ICON = "/home/z/my-project/src/app/icon.png"

L = np.array(Image.open(SRC).convert("L")).astype(float)

# emblem crop (diamond only, "VM STUDIO" text excluded) + margin
ys0, ys1, xs0, xs1 = 173, 735, 235, 787
L_c = L[ys0:ys1, xs0:xs1]

# darkness 0..1 → boost faint shadows → soften
d = np.clip((250.0 - L_c) / 250.0, 0, 1)
d_boost = np.clip((d / 0.68) ** 0.5, 0, 1)
d_boost = ndimage.gaussian_filter(d_boost, sigma=0.9)

rgba = np.zeros((*d_boost.shape, 4), dtype=np.uint8)
rgba[..., 0:3] = 255
rgba[..., 3] = (d_boost * 255).astype(np.uint8)

logo = Image.fromarray(rgba)
side = max(logo.size)
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
canvas.paste(logo, ((side - logo.width) // 2, (side - logo.height) // 2))
canvas.save(OUT_LOGO)
print("saved", OUT_LOGO, canvas.size)

# preview on dark bg
prev = Image.new("RGBA", (side + 80, side + 80), (5, 7, 13, 255))
prev.alpha_composite(canvas, (40, 40))
prev.save("/home/z/my-project/scripts/shots/logo-final-dark.png")

# favicon 256px: violet→cyan gradient tile + white diamond
S = 256
icon = Image.new("RGBA", (S, S), (0, 0, 0, 0))
mask = Image.new("L", (S, S), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=56, fill=255)

top, mid, bot = (124, 58, 237), (99, 102, 241), (6, 182, 212)
gp = np.zeros((S, S, 3), dtype=np.uint8)
for y in range(S):
    for x in range(S):
        t = (x / S + y / S) / 2
        if t < 0.5:
            k = t / 0.5
            c = [int(top[i] * (1 - k) + mid[i] * k) for i in range(3)]
        else:
            k = (t - 0.5) / 0.5
            c = [int(mid[i] * (1 - k) + bot[i] * k) for i in range(3)]
        gp[y, x] = c
grad = Image.fromarray(np.dstack([gp, np.full((S, S), 255, np.uint8)]).astype(np.uint8))
icon.paste(grad, (0, 0), mask)

diam = canvas.resize((172, 172), Image.LANCZOS)
icon.alpha_composite(diam, ((S - 172) // 2, (S - 172) // 2))
icon.save(OUT_ICON)
print("saved", OUT_ICON)
