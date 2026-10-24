"""Turn an expanding-wilds art folder into the files the game loads.

    python build_theme.py <art folder> <game app folder>

Reads the art described in ART-SPEC.md, writes static/assets/theme/ (symbol sprite sheet,
backgrounds, frame, logo, mascots as WebP) and rewrites src/game/theme.ts so the game uses it.
Anything optional that is missing keeps the template's stock art or placeholder.
"""

import json
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
    # generators make 2:3 at most, so the 1:5 reel is cropped from the centre of the image
    sheet.paste(cover_rgba(images["wild_reel"], REEL), (reel_x, 0))
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
    out = app / "static" / "assets" / "theme"
    out.mkdir(parents=True, exist_ok=True)
    problems = []
    theme = {key: False for key in ["staticSymbols", "background", "bonusBackground", "frame", "logo", "mascots"]}

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
    single(["logo"], "logo", contain, {"logo": (1200, 600)})
    single(["mascot_left", "mascot_right"], "mascots", contain, {"mascot_left": (800, 1000), "mascot_right": (800, 1000)})

    if problems:
        print("ART PROBLEMS:\n  " + "\n  ".join(problems))
        sys.exit(2)

    theme_ts = app / "src" / "game" / "theme.ts"
    text = theme_ts.read_text()
    start = text.index("export const THEME = {")
    body = "export const THEME = {\n" + "".join(f"\t{key}: {str(value).lower()},\n" for key, value in theme.items()) + "};\n"
    theme_ts.write_text(text[:start] + body)
    print(json.dumps(theme))


if __name__ == "__main__":
    main()
