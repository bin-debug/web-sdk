"""Turn an expanding-wilds art folder into the files the game loads.

    python build_theme.py <art folder> <game app folder> [game name]

Reads the art described in ART-SPEC.md, writes static/assets/theme/ (symbol sprite sheet,
backgrounds, frame, logo, mascots as WebP) and rewrites src/game/theme.ts so the game uses it.
Anything optional that is missing keeps the template's stock art or placeholder.
"""

import json
import shutil
import sys
from pathlib import Path

from PIL import Image

SYMBOLS = ["h1", "h2", "h3", "h4", "l1", "l2", "l3", "l4", "l5", "w", "s", "p"]
CELL = 256  # each symbol is packed at 256x256
REEL = (256, 1280)  # wild_reel: one full 5-row reel
EXTENSIONS = [".png", ".webp", ".jpg", ".jpeg"]


def find(folder: Path, name: str):
    for ext in EXTENSIONS:
        path = folder / f"{name}{ext}"
        if path.exists():
            return path
    return None


def contain(image: Image.Image, size):
    """Scale to fit inside size, centred on a transparent canvas of exactly that size."""
    image = image.convert("RGBA")
    scale = min(size[0] / image.width, size[1] / image.height)
    resized = image.resize((max(1, round(image.width * scale)), max(1, round(image.height * scale))), Image.LANCZOS)
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    canvas.paste(resized, ((size[0] - resized.width) // 2, (size[1] - resized.height) // 2))
    return canvas


def trim_contain(image: Image.Image, size):
    """contain() after cutting away empty transparent margins, so the art fills its slot."""
    image = image.convert("RGBA")
    box = image.getchannel("A").point(lambda a: 255 if a > 16 else 0).getbbox()
    return contain(image.crop(box) if box else image, size)


def trim_stand(image: Image.Image, size):
    """trim_contain() for characters: feet stay on the bottom edge."""
    image = image.convert("RGBA")
    box = image.getchannel("A").point(lambda a: 255 if a > 16 else 0).getbbox()
    image = image.crop(box) if box else image
    scale = min(size[0] / image.width, size[1] / image.height)
    resized = image.resize((max(1, round(image.width * scale)), max(1, round(image.height * scale))), Image.LANCZOS)
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    canvas.paste(resized, ((size[0] - resized.width) // 2, size[1] - resized.height))
    return canvas


def cover(image: Image.Image, size):
    """Scale to fill size and crop the overflow evenly (for backgrounds)."""
    image = image.convert("RGB")
    scale = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.LANCZOS)
    left = (resized.width - size[0]) // 2
    top = (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1]))


def cover_rgba(image: Image.Image, size):
    """cover() that keeps transparency."""
    image = image.convert("RGBA")
    scale = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.LANCZOS)
    left = (resized.width - size[0]) // 2
    top = (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1]))


def fit_reel(image: Image.Image):
    """The expanded wild fills one reel (1:5). Generators can't draw 1:5, so trim the empty space
    around the art, then fill the reel height; a thin column is widened up to 1.8x so it doesn't
    look like a stick, anything wider is cropped from the centre."""
    image = image.convert("RGBA")
    box = image.getchannel("A").point(lambda a: 255 if a > 16 else 0).getbbox()
    if box:
        image = image.crop(box)
    scale = REEL[1] / image.height
    width = round(image.width * scale)
    if width < REEL[0]:
        width = min(REEL[0], round(width * 1.8))
        canvas = Image.new("RGBA", REEL, (0, 0, 0, 0))
        canvas.paste(image.resize((width, REEL[1]), Image.LANCZOS), ((REEL[0] - width) // 2, 0))
        return canvas
    return cover_rgba(image, REEL)


def frame_window(image: Image.Image):
    """Fraction of the frame taken by its reel window. The window is the dark panel in the middle:
    walk out from the centre until 3 pixels in a row are not dark (the inner gold line, the border,
    or transparency). 3 in a row skips the odd tiny star in a patterned window."""
    image = image.convert("RGBA")
    w, h = image.size

    def is_border(p):
        return p[3] < 64 or (p[0] + p[1] + p[2]) / 3 > 45

    def edge(dx, dy, x, y):
        run = 0
        while 0 <= x < w and 0 <= y < h:
            run = run + 1 if is_border(image.getpixel((x, y))) else 0
            if run >= 3:
                return (x - dx * 2, y - dy * 2)
            x, y = x + dx, y + dy
        return (x, y)

    # several scan lines; the widest wins, so a star or ornament on one line can't shrink the window
    lines = [0.3, 0.4, 0.5, 0.6, 0.7]
    width = max(
        (edge(1, 0, w // 2, round(h * f))[0] - edge(-1, 0, w // 2, round(h * f))[0]) / w for f in lines
    )
    height = max(
        (edge(0, 1, round(w * f), h // 2)[1] - edge(0, -1, round(w * f), h // 2)[1]) / h for f in lines
    )
    return max(0.4, min(0.95, min(width, height)))


def radial_glow(size):
    """Soft white disc fading to transparent; the game tints it and adds it behind winning symbols."""
    glow = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    centre = (size - 1) / 2
    pixels = glow.load()
    for y in range(size):
        for x in range(size):
            distance = (((x - centre) ** 2 + (y - centre) ** 2) ** 0.5) / centre
            pixels[x, y] = (255, 255, 255, round(255 * max(0.0, 1 - distance) ** 2))
    return glow


def build_symbols(art: Path, out: Path, problems: list):
    folder = art / "symbols"
    images = {}
    for name in SYMBOLS + ["wild_reel"]:
        path = find(folder, name)
        if path is None:
            problems.append(f"symbols/{name}.png is missing")
        else:
            images[name] = Image.open(path)
    if problems:
        return False

    # h5 is in the stock front end but not in the maths; x is superspin's empty cell
    frames = {name: contain(images[name], (CELL, CELL)) for name in SYMBOLS}
    frames["h5"] = frames["h1"]
    frames["x"] = Image.new("RGBA", (CELL, CELL), (0, 0, 0, 0))
    frames["glow"] = radial_glow(CELL)

    columns = 4
    names = list(frames)
    rows = (len(names) + columns - 1) // columns
    sheet = Image.new("RGBA", (columns * CELL + REEL[0], max(rows * CELL, REEL[1])), (0, 0, 0, 0))
    meta_frames = {}
    for index, name in enumerate(names):
        x, y = (index % columns) * CELL, (index // columns) * CELL
        sheet.paste(frames[name], (x, y))
        meta_frames[f"{name}.webp"] = rect(x, y, CELL, CELL)
    reel_x = columns * CELL
    sheet.paste(fit_reel(images["wild_reel"]), (reel_x, 0))
    meta_frames["wild_reel.webp"] = rect(reel_x, 0, *REEL)

    sheet.save(out / "symbols.webp", "WEBP", quality=90, method=6)
    (out / "symbols.json").write_text(
        json.dumps(
            {
                "frames": meta_frames,
                "meta": {"image": "symbols.webp", "format": "RGBA8888", "size": {"w": sheet.width, "h": sheet.height}, "scale": "1"},
            },
            indent=1,
        )
    )
    return True


def rect(x, y, w, h):
    return {
        "frame": {"x": x, "y": y, "w": w, "h": h},
        "rotated": False,
        "trimmed": False,
        "spriteSourceSize": {"x": 0, "y": 0, "w": w, "h": h},
        "sourceSize": {"w": w, "h": h},
    }


def main():
    art, app = Path(sys.argv[1]), Path(sys.argv[2])
    name = sys.argv[3] if len(sys.argv) > 3 else "Expanding Wilds"
    out = app / "static" / "assets" / "theme"
    out.mkdir(parents=True, exist_ok=True)
    problems = []
    theme = {key: False for key in ["staticSymbols", "background", "bonusBackground", "frame", "logo", "mascots", "mascotAnim"]}

    theme["staticSymbols"] = build_symbols(art, out, problems)

    def single(names, key, fit, size, required=False):
        paths = [find(art, name) for name in names]
        if all(paths):
            for name, path in zip(names, paths):
                fit(Image.open(path), size[name]).save(out / f"{name}.webp", "WEBP", quality=88, method=6)
            theme[key] = True
        elif required:
            problems.append(" and ".join(f"{name}.png" for name, path in zip(names, paths) if not path) + " missing")

    landscape, portrait = (1920, 1080), (1080, 1920)
    single(["background", "background_portrait"], "background", cover,
           {"background": landscape, "background_portrait": portrait}, required=True)
    single(["bonus_background", "bonus_background_portrait"], "bonusBackground", cover,
           {"bonus_background": landscape, "bonus_background_portrait": portrait})
    single(["frame"], "frame", contain, {"frame": (1200, 1200)})
    frame_scale = 1.2
    if theme["frame"]:
        # draw the frame so its window sits just outside the 5x5 board (3% clearance)
        frame_scale = round(1.03 / frame_window(Image.open(out / "frame.webp")), 3)
    single(["logo"], "logo", trim_contain, {"logo": (1200, 800)})
    if theme["logo"]:
        # browser tab icon from the logo (replaces the template's plain gold disc)
        trim_contain(Image.open(find(art, "logo")), (128, 128)).save(app / "static" / "favicon.png")
    single(["mascot_left", "mascot_right"], "mascots", trim_stand, {"mascot_left": (800, 1200), "mascot_right": (800, 1200)})

    # animated mascots: mascot_left_anim/ and mascot_right_anim/, each with idle.{json,webp} and
    # cheer.{json,webp} sprite sheets from shared/mascots/make_mascot_sheets.py (idle loops, cheer plays on wins)
    anim_dirs = [art / "mascot_left_anim", art / "mascot_right_anim"]
    if all((d / f"{k}.{ext}").exists() for d in anim_dirs for k in ["idle", "cheer"] for ext in ["json", "webp"]):
        for d in anim_dirs:
            target = out / d.name
            target.mkdir(exist_ok=True)
            for f in d.glob("*.*"):
                shutil.copyfile(f, target / f.name)
        theme["mascotAnim"] = True

    if problems:
        print("ART PROBLEMS:\n  " + "\n  ".join(problems))
        sys.exit(2)

    theme_ts = app / "src" / "game" / "theme.ts"
    text = theme_ts.read_text()
    start = text.index("export const THEME = {")
    body = (
        "export const THEME = {\n"
        + f"\tname: {json.dumps(name)},\n"
        + "".join(f"\t{key}: {str(value).lower()},\n" for key, value in theme.items())
        + f"\tframeScale: {frame_scale},\n"
        + "};\n"
    )
    theme_ts.write_text(text[:start] + body)
    print(json.dumps({**theme, "frameScale": frame_scale}))


if __name__ == "__main__":
    main()
