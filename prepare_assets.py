import os
import shutil

PUBLIC_DIR = r"c:\Users\jaygu\Desktop\A1 construction\public"
LOGO_DIR = os.path.join(PUBLIC_DIR, "logo")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")
VIDEOS_DIR = os.path.join(PUBLIC_DIR, "videos")

os.makedirs(LOGO_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(VIDEOS_DIR, exist_ok=True)

# 1. Copy original Logo
orig_logo = r"c:\Users\jaygu\Desktop\A1 construction\A1 Construction Skyline Logo.png"
if os.path.exists(orig_logo):
    target_logo = os.path.join(LOGO_DIR, "logo.png")
    shutil.copy2(orig_logo, target_logo)
    print(f"Copied logo to {target_logo}")

# 2. Copy client videos to public/videos for optional reels/background showcase
ws_dir = r"c:\Users\jaygu\Desktop\A1 construction"
vid_count = 1
for f in os.listdir(ws_dir):
    if f.endswith(".mp4"):
        src = os.path.join(ws_dir, f)
        dst = os.path.join(VIDEOS_DIR, f"reel-{vid_count}.mp4")
        shutil.copy2(src, dst)
        print(f"Copied {f} -> {dst}")
        vid_count += 1

# 3. Find architectural photos in taste-skill
taste_assets = r"c:\Users\jaygu\Desktop\A1 construction\.agents\skills\design-taste-frontend\assets"
copied_photos = []
for root, dirs, files in os.walk(taste_assets):
    for f in files:
        if f.lower().endswith((".jpg", ".jpeg", ".webp", ".png")) and not f.startswith("icon"):
            copied_photos.append(os.path.join(root, f))

print(f"Found {len(copied_photos)} photos in taste-skill assets.")
# Copy a selection of high quality photos into public/images
mapped_names = [
    "hero-architecture.webp",
    "about-craftsmanship.webp",
    "about-secondary.webp",
    "service-residential.webp",
    "service-luxury.webp",
    "service-structural.webp",
    "service-custom.webp",
    "service-solutions.webp",
    "project-sample-01.webp",
    "project-sample-02.webp",
    "project-sample-03.webp",
    "project-sample-04.webp",
    "project-sample-05.webp",
    "project-sample-06.webp",
    "brand-statement-bg.webp",
    "og-hero.jpg"
]

for i, target_name in enumerate(mapped_names):
    src = copied_photos[i % len(copied_photos)]
    dst = os.path.join(IMAGES_DIR, target_name)
    shutil.copy2(src, dst)
    print(f"Mapped {os.path.basename(src)} -> {target_name}")

# Robots.txt
robots_txt = """User-agent: *
Allow: /
Sitemap: https://a1construction.in/sitemap.xml
"""
with open(os.path.join(PUBLIC_DIR, "robots.txt"), "w") as f:
    f.write(robots_txt)

# Sitemap.xml
sitemap_xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://a1construction.in/</loc>
    <lastmod>2026-11-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
"""
with open(os.path.join(PUBLIC_DIR, "sitemap.xml"), "w") as f:
    f.write(sitemap_xml)

print("Public assets setup complete.")
