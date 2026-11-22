import os
import subprocess

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE_URL = "http://localhost:4173?nopreloader=true"
OUT_DIR = r"c:\Users\jaygu\Desktop\A1 construction\screenshots\sections"
os.makedirs(OUT_DIR, exist_ok=True)

sections = [
    ("01_hero.png", f"{BASE_URL}#hero"),
    ("02_stats.png", f"{BASE_URL}#stats"),
    ("03_about.png", f"{BASE_URL}#about"),
    ("04_services.png", f"{BASE_URL}#services"),
    ("05_projects.png", f"{BASE_URL}#projects"),
    ("06_why_a1.png", f"{BASE_URL}#why-a1"),
    ("07_contact.png", f"{BASE_URL}#contact"),
]

for filename, url in sections:
    out_path = os.path.join(OUT_DIR, filename)
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--window-size=1440,900",
        f"--screenshot={out_path}",
        "--virtual-time-budget=600",
        "--run-all-compositor-stages-before-draw",
        url
    ]
    print(f"Capturing {filename}...")
    try:
        subprocess.run(cmd, check=True, timeout=8)
        if os.path.exists(out_path):
            print(f"Success: {filename} ({os.path.getsize(out_path)} bytes)")
    except Exception as e:
        print(f"Error {filename}: {e}")

print("Section captures complete.")
