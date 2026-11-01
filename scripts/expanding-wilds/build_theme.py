"""Turn an expanding-wilds art folder into the files the game loads.

    python build_theme.py <art folder> <game app folder> [game name] [--film]

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
    around the art and show all of it, never cropped:
    - a thin column (narrower than 1:5) fills the reel height, widened up to 1.8x so it doesn't
      look like a stick;
    - wider art fills the reel width, centred, and whatever runs off its top and bottom edges (a
      rope, a column, a beam) is carried on to the ends of the reel."""
    image = image.convert("RGBA")
    box = image.getchannel("A").point(lambda a: 255 if a > 16 else 0).getbbox()
    if box:
        image = image.crop(box)
    canvas = Image.new("RGBA", REEL, (0, 0, 0, 0))
    if image.width * REEL[1] < image.height * REEL[0]:
        width = min(REEL[0], round(image.width * REEL[1] / image.height * 1.8))
        canvas.paste(image.resize((width, REEL[1]), Image.LANCZOS), ((REEL[0] - width) // 2, 0))
        return canvas
    height = round(image.height * REEL[0] / image.width)
    art = image.resize((REEL[0], height), Image.LANCZOS)
    top = (REEL[1] - height) // 2
    canvas.paste(art, (0, top))

    def carry(row: Image.Image, y0: int, y1: int):
        # only solid pixels on the edge row continue (the rope), not half-cut coins or sparkles
        alpha = row.getchannel("A").point(lambda a: 255 if a > 200 else 0)
        row.putalpha(alpha)
        canvas.alpha_composite(row.resize((REEL[0], y1 - y0)), (0, y0))

    if top > 0:
        carry(art.crop((0, 1, REEL[0], 2)), 0, top + 1)
        carry(art.crop((0, height - 2, REEL[0], height - 1)), top + height - 1, REEL[1])
    return canvas


def window_box(image: Image.Image):
    """The frame's reel window as (left, top, right, bottom) pixels. The window is the dark panel
    in the middle: walk out from the centre until 3 pixels in a row are not dark (the inner gold
    line, the border, or transparency). 3 in a row skips the odd tiny star in a patterned window."""
    image = image.convert("RGBA")
    w, h = image.size
    # "dark" is relative to the window's own centre: a wooden or tinted panel can sit right on a
    # fixed cut-off and stop the walk after a few pixels (Splash & Cash measured 39% for a 63% window)
    centre = sorted(image.crop((w * 2 // 5, h * 2 // 5, w * 3 // 5, h * 3 // 5)).convert("L").tobytes())
    limit = max(45, centre[len(centre) // 2] + 25)

    def is_border(p):
        return p[3] < 64 or (p[0] + p[1] + p[2]) / 3 > limit

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
    left, right = max(
        ((edge(-1, 0, w // 2, round(h * f))[0], edge(1, 0, w // 2, round(h * f))[0]) for f in lines),
        key=lambda lr: lr[1] - lr[0],
    )
    top, bottom = max(
        ((edge(0, -1, round(w * f), h // 2)[1], edge(0, 1, round(w * f), h // 2)[1]) for f in lines),
        key=lambda tb: tb[1] - tb[0],
    )
    return left, top, right, bottom


def frame_window(image: Image.Image):
    """Fraction of the frame taken by its reel window (see window_box)."""
    left, top, right, bottom = window_box(image)
    return max(0.4, min(0.95, min((right - left) / image.width, (bottom - top) / image.height)))


def thin_frame(image: Image.Image, target=0.76):
    """A frame whose border takes much more room than the others' (window under 70% of the frame)
    looks heavy and leaves small reels. Shrink its border nine-slice style until the window is
    `target` of the frame: corners scale down evenly, edges only get thinner (stretched along
    their length), and the window panel stretches to fill the middle."""
    image = image.convert("RGBA")
    w, h = image.size
    left, top, right, bottom = window_box(image)
    window = min((right - left) / w, (bottom - top) / h)
    if window >= 0.7:
        return image
    k = (1 - target) / (1 - window)
    src_x, src_y = [0, left, right, w], [0, top, bottom, h]
    dst_x = [0, round(left * k), w - round((w - right) * k), w]
    dst_y = [0, round(top * k), h - round((h - bottom) * k), h]
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    for i in range(3):
        for j in range(3):
            cell = image.crop((src_x[i], src_y[j], src_x[i + 1], src_y[j + 1]))
            size = (dst_x[i + 1] - dst_x[i], dst_y[j + 1] - dst_y[j])
            if min(cell.size) > 0 and min(size) > 0:
                out.alpha_composite(cell.resize(size, Image.LANCZOS), (dst_x[i], dst_y[j]))
    return out


def window_color(image: Image.Image):
    """The frame window's colour (its centre), as 0xRRGGBB; the expanded wild is backed with it."""
    r, g, b, a = image.convert("RGBA").resize((64, 64), Image.BOX).getpixel((32, 32))
    r, g, b = (round(c * a / 255) for c in (r, g, b))  # the window is drawn over a dark board
    return (r << 16) | (g << 8) | b


def accent_color(image: Image.Image):
    """The wild's main colour as 0xRRGGBB: the average of its bright, saturated pixels."""
    small = image.convert("RGBA").resize((96, 144), Image.BOX)
    picked = []
    data = small.tobytes()
    for r, g, b, a in (data[i : i + 4] for i in range(0, len(data), 4)):
        if a > 200 and max(r, g, b) > 150 and max(r, g, b) - min(r, g, b) > 90:
            picked.append((r, g, b))
    if not picked:
        return 0xFFD987
    r, g, b = (round(sum(c[i] for c in picked) / len(picked)) for i in range(3))
    return (r << 16) | (g << 8) | b


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

    build_symbols.accent = accent_color(images["wild_reel"])
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
    film = "--film" in sys.argv
    # --symbol-scale=0.85: symbols drawn smaller than their cell, for more space between them
    symbol_scale = next((float(a.split("=", 1)[1]) for a in sys.argv if a.startswith("--symbol-scale=")), 1)
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    art, app = Path(args[0]), Path(args[1])
    name = args[2] if len(args) > 2 else "Expanding Wilds"
    out = app / "static" / "assets" / "theme"
    out.mkdir(parents=True, exist_ok=True)
    problems = []
    theme = {key: False for key in ["staticSymbols", "background", "bonusBackground", "frame", "logo", "mascots", "mascotAnim", "ground", "intro"]}

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
    single(["frame"], "frame", lambda image, size: thin_frame(contain(image, size)), {"frame": (1200, 1200)})
    frame_scale = 1.2
    frame_fit = {"frameScaleX": 1.2, "frameScaleY": 1.2, "frameOffsetX": 0, "frameOffsetY": 0}
    window = 0x0B1020
    if theme["frame"]:
        # draw the frame so its window sits just outside the 5x5 board (3% clearance)
        window = window_color(Image.open(out / "frame.webp"))
        # fit each axis on its own and centre the window on the reels, so the gap round the board
        # is even: a window a little wider than tall, or off centre (a bucket on the top edge),
        # otherwise leaves the top row on the border and extra room at the bottom and sides
        frame_image = Image.open(out / "frame.webp")
        left, top, right, bottom = window_box(frame_image)
        fw, fh = frame_image.size
        frame_fit = {
            "frameScaleX": round(1.03 * fw / (right - left), 3),
            "frameScaleY": round(1.03 * fh / (bottom - top), 3),
        }
        frame_fit["frameOffsetX"] = round(-((left + right) / 2 - fw / 2) / fw * frame_fit["frameScaleX"], 4)
        frame_fit["frameOffsetY"] = round(-((top + bottom) / 2 - fh / 2) / fh * frame_fit["frameScaleY"], 4)
        # layout keeps clear of the frame's larger side
        frame_scale = max(frame_fit["frameScaleX"], frame_fit["frameScaleY"])
    accent = getattr(build_symbols, "accent", 0x9FDCFF)
    single(["logo"], "logo", trim_contain, {"logo": (1200, 800)})
    if theme["logo"]:
        # browser tab icon from the logo (replaces the template's plain gold disc)
        trim_contain(Image.open(find(art, "logo")), (128, 128)).save(app / "static" / "favicon.png")
    single(["mascot_left", "mascot_right"], "mascots", trim_stand, {"mascot_left": (800, 1200), "mascot_right": (800, 1200)})
    single(["ground"], "ground", trim_contain, {"ground": (1800, 600)})

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

    # intro/: the three feature panels on the tap-to-play screen (an empty sign plus wild, bonus and
    # max-win icons); intro/intro.json may replace their text: [{"title": ..., "text": ...}] x3
    intro_names = ["panel", "icon_wild", "icon_bonus", "icon_maxwin"]
    intro_paths = [find(art / "intro", name) for name in intro_names]
    intro_panels = None
    if all(intro_paths):
        (out / "intro").mkdir(exist_ok=True)
        for intro_name, path in zip(intro_names, intro_paths):
            size = (600, 800) if intro_name == "panel" else (512, 512)
            trim_contain(Image.open(path), size).save(out / "intro" / f"{intro_name}.webp", "WEBP", quality=88, method=6)
        theme["intro"] = True
        if (art / "intro" / "intro.json").exists():
            intro_panels = json.loads((art / "intro" / "intro.json").read_text(encoding="utf-8"))

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
        + "".join(f"\t{key}: {value},\n" for key, value in frame_fit.items())
        + f"\twindowColor: 0x{window:06x},\n"
        + f"\taccentColor: 0x{accent:06x},\n"
        + f"\tfilm: {str(film).lower()},\n"
        + f"\tsymbolScale: {symbol_scale},\n"
        + (f"\tintroPanels: {json.dumps(intro_panels)},\n" if intro_panels else "")
        + "};\n"
    )
    theme_ts.write_text(text[:start] + body)
    print(json.dumps({**theme, "frameScale": frame_scale, "windowColor": f"#{window:06x}", "accentColor": f"#{accent:06x}", "film": film}))


if __name__ == "__main__":
    main()
