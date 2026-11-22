import os
import shutil

src_dir = r"C:\Users\jaygu\.gemini\antigravity\brain\e04c14b2-16c3-455b-9a50-2f65b1487997"
dst_dir = r"c:\Users\jaygu\Desktop\A1 construction\public\images"

mapping = {
    "luxury_villa_twilight_1795348139521.jpg": "hero-architecture.webp",
    "contemporary_karnataka_duplex_1795348159205.jpg": "service-residential.webp",
    "grand_entrance_water_feature_1795348180268.jpg": "service-luxury.webp",
    "structural_concrete_framework_1795348203361.jpg": "service-structural.webp",
    "luxury_home_courtyard_floating_steps_1795348226296.jpg": "service-custom.webp",
    "dramatic_villa_facade_dusk_1795348248313.jpg": "brand-statement-bg.webp",
}

# Also map to project samples & about
project_mapping = {
    "luxury_villa_twilight_1795348139521.jpg": ["project-sample-01.webp", "og-hero.jpg", "about-craftsmanship.webp"],
    "contemporary_karnataka_duplex_1795348159205.jpg": ["project-sample-02.webp"],
    "grand_entrance_water_feature_1795348180268.jpg": ["project-sample-05.webp"],
    "structural_concrete_framework_1795348203361.jpg": ["project-sample-03.webp", "service-solutions.webp"],
    "luxury_home_courtyard_floating_steps_1795348226296.jpg": ["project-sample-04.webp", "about-secondary.webp"],
    "dramatic_villa_facade_dusk_1795348248313.jpg": ["project-sample-06.webp"],
}

for src_name, dst_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied {src_name} -> {dst_name}")

for src_name, dst_names in project_mapping.items():
    src_path = os.path.join(src_dir, src_name)
    if os.path.exists(src_path):
        for dst_name in dst_names:
            dst_path = os.path.join(dst_dir, dst_name)
            shutil.copy2(src_path, dst_path)
            print(f"Copied {src_name} -> {dst_name}")

print("Architectural imagery mapped successfully!")
