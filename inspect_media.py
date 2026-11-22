import os
import struct

logo_path = r"c:\Users\jaygu\Desktop\A1 construction\A1 Construction Skyline Logo.png"
if os.path.exists(logo_path):
    with open(logo_path, "rb") as f:
        head = f.read(24)
        if head.startswith(b"\x89PNG\r\n\x1a\n"):
            w, h = struct.unpack(">II", head[16:24])
            print(f"Logo is PNG, dimensions: {w}x{h}, size: {os.path.getsize(logo_path)} bytes")

# Check videos
for f in os.listdir(r"c:\Users\jaygu\Desktop\A1 construction"):
    if f.endswith(".mp4"):
        print(f"Video file found: {f} ({os.path.getsize(os.path.join(r'c:\Users\jaygu\Desktop\A1 construction', f))} bytes)")
