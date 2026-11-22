import struct

def get_png_size(path):
    with open(path, 'rb') as f:
        head = f.read(24)
        if head.startswith(b'\x89PNG\r\n\x1a\n'):
            w, h = struct.unpack('>II', head[16:24])
            return w, h
    return None, None

for f in ['desktop_hero.png', 'mobile_view.png', 'tablet.png', 'full_page_desktop.png']:
    p = f'c:\\Users\\jaygu\\Desktop\\A1 construction\\screenshots\\{f}'
    w, h = get_png_size(p)
    print(f'{f}: {w}x{h}')
