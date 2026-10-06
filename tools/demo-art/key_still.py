#!/usr/bin/env python3
"""Key a green-screen still against its SAMPLED corner colour, despill, trim, pad square, export WebP.
usage: key_still.py in.(png|jpg) out.webp [--size 512] [--pad 0.04] [--tol 60] [--feather 25] [--long] [--nosquare]
"""
import sys, argparse
import numpy as np
from PIL import Image, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('dst')
ap.add_argument('--size', type=int, default=512)
ap.add_argument('--pad', type=float, default=0.04)
ap.add_argument('--tol', type=float, default=55)      # full-transparent distance
ap.add_argument('--feather', type=float, default=30)  # soft edge width
ap.add_argument('--long', action='store_true')        # size = long side, keep aspect
ap.add_argument('--nosquare', action='store_true')
ap.add_argument('--nokey', action='store_true')
ap.add_argument('--shadow', action='store_true')  # also remove thick dark blobs (hard ground shadows) touching the background
a = ap.parse_args()

im = Image.open(a.src).convert('RGB')
arr = np.asarray(im).astype(np.float32)
h, w, _ = arr.shape
if a.nokey:
    out = Image.fromarray(arr.astype(np.uint8)).convert('RGBA')
else:
    k = 12
    corners = np.concatenate([arr[:k,:k].reshape(-1,3), arr[:k,-k:].reshape(-1,3), arr[-k:,:k].reshape(-1,3), arr[-k:,-k:].reshape(-1,3)])
    bg = np.median(corners, axis=0)
    d = np.sqrt(((arr - bg) ** 2).sum(axis=2))
    from scipy import ndimage as ndi
    cand = d < (a.tol + a.feather)
    lab, n = ndi.label(cand)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:,0], lab[:,-1]]))) - {0}
    bgm = np.isin(lab, list(border))
    # fill enclosed pockets of bg (e.g. inside handles) only if large and very close to bg colour
    pocket = (d < a.tol * 0.6) & ~bgm
    plab, pn = ndi.label(pocket)
    if pn:
        sizes = ndi.sum(pocket, plab, range(1, pn + 1))
        for i, sz in enumerate(sizes, 1):
            if sz > 400: bgm |= (plab == i)
    if a.shadow:
        v = arr.max(axis=2)
        dark = (v < 70) & ~bgm
        core = ndi.binary_opening(dark, structure=np.ones((3,3)), iterations=9)  # only thick blobs survive
        touch = ndi.binary_dilation(bgm, iterations=6)
        cl, cn = ndi.label(core)
        for i in range(1, cn + 1):
            m = cl == i
            if (m & touch).any():
                bgm |= ndi.binary_dilation(m, iterations=12) & (v < 95)
    if a.shadow:
        keep = ~bgm
        kl, kn = ndi.label(keep)
        if kn > 1:
            sizes = ndi.sum(keep, kl, range(1, kn + 1))
            keep = np.isin(kl, [i + 1 for i, z in enumerate(sizes) if z > 0.2 * sizes.max()])
            bgm = ~keep
    near = ndi.binary_dilation(bgm, iterations=3)
    soft = np.clip((d - a.tol) / a.feather, 0, 1)
    alpha = np.where(bgm, 0.0, np.where(near, np.maximum(soft, 0.0), 1.0))
    alpha = np.where(bgm, 0.0, alpha)
    r, g, b = arr[...,0], arr[...,1], arr[...,2]
    spill = np.clip(g - np.maximum(r, b), 0, None)
    edge = near
    g2 = np.where(edge, g - spill, g)
    arr2 = np.stack([r, g2, b], axis=2)
    out = Image.fromarray(np.clip(arr2, 0, 255).astype(np.uint8)).convert('RGBA')
    out.putalpha(Image.fromarray((alpha * 255).astype(np.uint8)))
# trim
bbox = out.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
if bbox: out = out.crop(bbox)
cw, ch = out.size
pad = int(max(cw, ch) * a.pad)
if a.nosquare:
    cvs = Image.new('RGBA', (cw + 2*pad, ch + 2*pad), (0,0,0,0)); cvs.paste(out, (pad, pad), out)
else:
    s = max(cw, ch) + 2*pad
    cvs = Image.new('RGBA', (s, s), (0,0,0,0)); cvs.paste(out, ((s-cw)//2, (s-ch)//2), out)
if a.long:
    sc = a.size / max(cvs.size); cvs = cvs.resize((round(cvs.width*sc), round(cvs.height*sc)), Image.LANCZOS)
else:
    cvs = cvs.resize((a.size, a.size), Image.LANCZOS)
cvs.save(a.dst, 'WEBP', quality=90, method=6)
print(a.dst, cvs.size, 'bg=', None if a.nokey else bg.astype(int).tolist())
