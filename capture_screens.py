import os
import subprocess
import time

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
URL = "http://localhost:4173?nopreloader=true"
OUT_DIR = r"c:\Users\jaygu\Desktop\A1 construction\screenshots"
os.makedirs(OUT_DIR, exist_ok=True)

out_path = os.path.join(OUT_DIR, "desktop_hero.png")
cmd = [
    CHROME,
    "--headless=new",
    "--window-size=1440,900",
    f"--screenshot={out_path}",
    "--run-all-compositor-stages-before-draw",
    URL
]
print("Capturing desktop_hero.png without disable-gpu...")
try:
    subprocess.run(cmd, check=True, timeout=15)
    if os.path.exists(out_path):
        print(f"Success: desktop_hero.png ({os.path.getsize(out_path)} bytes)")
except Exception as e:
    print(f"Error: {e}")

