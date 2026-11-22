import os
import subprocess
import time

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
URL = "http://localhost:4173?nopreloader=true"
OUT_DIR = r"c:\Users\jaygu\Desktop\A1 construction\screenshots"
os.makedirs(OUT_DIR, exist_ok=True)

sections = ["hero", "stats", "about", "services", "projects", "why-a1", "contact"]

# Let's take full page screenshot: Chrome supports --screenshot with --window-size and large height
cmd = [
    CHROME,
    "--headless=new",
    "--disable-gpu",
    "--window-size=1440,5800",
    f"--screenshot={os.path.join(OUT_DIR, 'full_page_desktop.png')}",
    "--run-all-compositor-stages-before-draw",
    URL
]

print("Capturing full page...")
try:
    subprocess.run(cmd, check=True, timeout=20)
    print("Full page captured successfully!")
except Exception as e:
    print(f"Error: {e}")
