#!/usr/bin/env python3
"""
Task 19: Replace the favicon with the client's attached flat diamond (logo9.png),
used WITHOUT any background tile - transparent background as requested.
Overwrites src/app/icon.png (Next.js auto-detects it as /icon).
"""
from PIL import Image

SRC = "/home/z/my-project/upload/logo9.png"
ICON = "/home/z/my-project/src/app/icon.png"

src = Image.open(SRC).convert("RGBA")
print("source:", src.size)

# Square transparent canvas, diamond at 94% so the sharp tips are not clipped
out = 256
scale = (out * 0.94) / max(src.size)
new_w, new_h = round(src.width * scale), round(src.height * scale)
resized = src.resize((new_w, new_h), Image.LANCZOS)

canvas = Image.new("RGBA", (out, out), (0, 0, 0, 0))
canvas.paste(resized, ((out - new_w) // 2, (out - new_h) // 2), resized)
canvas.save(ICON, optimize=True)
print("saved", ICON, canvas.size)

# Verify: fully transparent corners, content centered
chk = Image.open(ICON)
px = chk.load()
corners = [px[0, 0], px[255, 0], px[0, 255], px[255, 255]]
print("corner alphas:", [c[3] for c in corners])
print("alpha bbox:", chk.getchannel("A").getbbox())
