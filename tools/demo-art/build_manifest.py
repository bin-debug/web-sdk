#!/usr/bin/env python3
"""Scan packages/kit-demo-art/static/demo and write manifest.json + contact-sheet.html."""
import json, os, glob
from PIL import Image

R = 'C:/source/_studio-kit/web-sdk/packages/kit-demo-art/static/demo/'
slots = {}


def sprite(slot, f):
    p = R + f
    if os.path.exists(p):
        w, h = Image.open(p).size
        slots[slot] = {'type': 'sprite', 'file': f, 'w': w, 'h': h}
        return True
    return False


def sheet(slot, f, fps, loop=False, anchor=None):
    p = R + f
    if os.path.exists(p):
        j = json.load(open(p))
        anims = j.get('animations', {})
        names = next(iter(anims.values()), None) or list(j.get('frames', {}))
        e = {'type': 'spriteSheet', 'file': f, 'fps': fps, 'frames': len(names), 'loop': loop}
        if anchor:
            e['anchor'] = anchor
        slots[slot] = e
        return True
    return False


def juice(slot, preset):
    slots[slot] = {'type': 'juice', 'preset': preset}


LOWS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6']
HIGHS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
for s in LOWS:
    sprite(f'symbol.{s}.static', f'symbols/{s}.webp')
    juice(f'symbol.{s}.spin', 'motionBlur'); juice(f'symbol.{s}.land', 'squash')
    juice(f'symbol.{s}.win', 'pulseGlow'); juice(f'symbol.{s}.postWin', 'settle')
    juice(f'symbol.{s}.explode', 'poofShrink'); juice(f'symbol.{s}.dim', 'dim30')
for s in HIGHS:
    sprite(f'symbol.{s}.static', f'symbols/{s}.webp')
    juice(f'symbol.{s}.spin', 'motionBlur'); juice(f'symbol.{s}.land', 'squashShine')
    if not sheet(f'symbol.{s}.win', f'symbols/{s}_win.json', 24):
        juice(f'symbol.{s}.win', 'pulseGlow')
    juice(f'symbol.{s}.postWin', 'settle'); juice(f'symbol.{s}.explode', 'poofShrink'); juice(f'symbol.{s}.dim', 'dim30')
for i in range(1, 5):
    s = f'E{i}'
    sprite(f'symbol.{s}.static', f'symbols/{s}.webp')
    slots[f'symbol.{s}.win'] = {'type': 'alias', 'of': f'symbol.H{i}.win', 'filter': 'glow'}
for s in ['W', 'S', 'S2', 'RB', 'RB2', 'CL1', 'CL2', 'COL1', 'COL2', 'J1', 'J2', 'J3', 'J4', 'MW1', 'MW2', 'MW3', 'DW',
          'T1', 'T2', 'T3', 'X', 'M', 'C1', 'C2', 'C3', 'C4']:
    sprite(f'symbol.{s}.static', f'symbols/{s}.webp')
for name, f in [('W.land', 'W_land'), ('W.win', 'W_win'), ('S.land', 'S_land'), ('S2.land', 'S2_land'),
                ('RB.activate', 'RB_activate'), ('C.flip', 'C_flip'), ('CL.burst', 'CL_burst'),
                ('COL.collect', 'COL_collect'), ('MW.open', 'MW_open'), ('DW.explode', 'DW_explode')]:
    sheet(f'symbol.{name}', f'symbols/{f}.json', 24, False)
slots['symbol.RB2.activate'] = {'type': 'alias', 'of': 'symbol.RB.activate', 'filter': 'tintDouble'}
slots['symbol.COL2.collect'] = {'type': 'alias', 'of': 'symbol.COL.collect'}
for s in ['J1', 'J2', 'J3', 'J4']:
    juice(f'symbol.{s}.land', 'popShine')
juice('symbol.M.reveal', 'shakeFlash')
juice('symbol.T.break', 'crackPoof')
for n, fps, loop in [('idle', 15, True), ('anticipate', 15, False), ('win_small', 15, False), ('win_big', 15, False),
                     ('bonus_trigger', 15, False), ('throw', 15, False)]:
    sheet(f'mascot.{n}', f'mascot/{n}.json', fps, loop, [0.5, 1])
sprite('mascot.master', 'mascot/master.webp')
for n in ['poof', 'upgrade']:
    sheet(f'fx.{n}', f'fx/{n}.json', 24)
for n in ['bigwin', 'transition']:
    for ext in ('webm', 'mp4'):
        if os.path.exists(R + f'fx/{n}.{ext}'):
            slots[f'fx.{n}'] = {'type': 'video', 'file': f'fx/{n}.{ext}', 'loop': False}
            break
for k in ['base', 'bonus']:
    for ar in ['16x9', '9x16']:
        p = f'bg/{k}_{ar}.webp'
        if os.path.exists(R + p):
            slots[f'bg.{k}.{ar}'] = {'type': 'sprite', 'file': p, 'w': 1920 if ar == '16x9' else 1080,
                                     'h': 1080 if ar == '16x9' else 1920}
sprite('board.frame', 'board/frame.webp')
if 'board.frame' in slots:
    slots['board.frame']['slice'] = {'left': 240, 'top': 240, 'right': 240, 'bottom': 240}
sprite('board.cell', 'board/cell.webp'); sprite('board.cell_gold', 'board/cell_gold.webp'); sprite('logo.demo', 'logo/logo.webp')
for n in ['base', 'bonus']:
    if os.path.exists(R + f'audio/{n}.mp3'):
        slots[f'audio.{n}'] = {'type': 'audio', 'file': f'audio/{n}.mp3', 'loop': True}
for f in sorted(glob.glob(R + 'audio/sfx/*.mp3')):
    n = os.path.splitext(os.path.basename(f))[0]
    slots[f'audio.sfx.{n}'] = {'type': 'audio', 'file': f'audio/sfx/{n}.mp3', 'loop': False}
for s in ['S', 'S2', 'RB', 'C3']:
    slots[f'ui.buy.{s}'] = {'type': 'alias', 'of': f'symbol.{s}.static'}
json.dump({'version': 1, 'style': 'demo-treasure', 'slots': slots}, open(R + 'manifest.json', 'w'), indent=1)


def card(k, v):
    t = v['type']
    if t == 'sprite':
        return f'<div class=c><img src="{v["file"]}" loading=lazy><b>{k}</b></div>'
    if t == 'spriteSheet':
        return (f'<div class="c sh" data-json="{v["file"]}" data-fps="{v["fps"]}"><canvas></canvas><b>{k}</b>'
                f'<i>{v["frames"]}f</i></div>')
    if t == 'video':
        return f'<div class=c><video src="{v["file"]}" muted loop autoplay playsinline></video><b>{k}</b></div>'
    if t == 'audio':
        return f'<div class="c a"><audio controls preload=none src="{v["file"]}"></audio><b>{k}</b></div>'
    return ''


groups = {}
for k, v in slots.items():
    groups.setdefault(k.split('.')[0], []).append((k, v))
css = ('body{margin:0;background:#12122a;color:#ddd;font:13px system-ui}h2{margin:14px 10px 4px;color:#ffc83d}'
       '.g{display:flex;flex-wrap:wrap;gap:8px;padding:8px}'
       '.c{width:110px;background:repeating-conic-gradient(#2a2a4a 0 25%,#222240 0 50%) 0 0/16px 16px;border-radius:8px;padding:4px;text-align:center;position:relative}'
       '.c img,.c canvas,.c video{width:100%;aspect-ratio:1;object-fit:contain;display:block}'
       '.c b{display:block;font-size:10px;word-break:break-all;color:#fff}'
       '.c i{position:absolute;top:2px;right:4px;font-size:9px;color:#9f9}'
       '.c.a{width:200px}.c.a audio{width:100%}.big .c{width:46vw}.big .c img{aspect-ratio:auto}')
js = """
document.querySelectorAll('.sh').forEach(async el=>{try{
const url=el.dataset.json;const j=await (await fetch(url)).json();
const img=new Image();img.src=url.replace(/[^/]+$/,'')+j.meta.image;await img.decode();
const names=(j.animations&&Object.values(j.animations)[0])||Object.keys(j.frames);
const cv=el.querySelector('canvas');const f0=j.frames[names[0]].frame;cv.width=f0.w;cv.height=f0.h;
const cx=cv.getContext('2d');let i=0;const fps=+el.dataset.fps;
setInterval(()=>{const f=j.frames[names[i]].frame;cx.clearRect(0,0,cv.width,cv.height);
cx.drawImage(img,f.x,f.y,f.w,f.h,0,0,cv.width,cv.height);i=(i+1)%names.length},1000/fps)
}catch(e){el.style.outline='1px solid red'}});
"""
html = ['<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">'
        f'<title>Demo art contact sheet</title><style>{css}</style>',
        f'<h1 style="margin:10px;font-size:16px">Demo art library: {len(slots)} slots</h1>']
for g, items in groups.items():
    cls = 'g big' if g in ('bg', 'logo') else 'g'
    html.append(f'<h2>{g} ({len(items)})</h2><div class="{cls}">' + ''.join(card(k, v) for k, v in items) + '</div>')
html.append(f'<script>{js}</script>')
open(R + 'contact-sheet.html', 'w', encoding='utf-8').write('\n'.join(html))
print(len(slots), 'slots')
