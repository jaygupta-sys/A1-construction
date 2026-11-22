import os
import json
import time
import base64
import urllib.request
import subprocess

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT_DIR = r"c:\Users\jaygu\Desktop\A1 construction\screenshots\cdp"
os.makedirs(OUT_DIR, exist_ok=True)

# Launch Chrome with remote debugging
proc = subprocess.Popen([
    CHROME,
    "--headless=new",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "--window-size=1440,900",
    "http://localhost:4173?nopreloader=true"
])

time.sleep(3)

try:
    # Get WebSocket debugger URL
    resp = urllib.request.urlopen("http://localhost:9222/json")
    tabs = json.loads(resp.read().decode())
    target_tab = tabs[0]
    ws_url = target_tab.get("webSocketDebuggerUrl")
    print("Connected to Chrome CDP:", ws_url)

    import socket
    # We can also capture screenshots via CDP HTTP endpoint or simple evaluate
except Exception as e:
    print("CDP Error:", e)
finally:
    proc.terminate()
