#!/usr/bin/env python3
"""sheet.py <mp4> <name> <group> [--duration s] [--cell 256] [--fps 24] [--sim 0.14] [--black] [--key hex]
Samples the clip's corner colour from frame 1, then runs video-to-sprites into static/demo/<group>/."""
import sys, subprocess, argparse, os, io
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('mp4'); ap.add_argument('name'); ap.add_argument('group')
ap.add_argument('--duration'); ap.add_argument('--cell', default='256'); ap.add_argument('--fps', default='24')
ap.add_argument('--sim', default='0.14'); ap.add_argument('--black', action='store_true'); ap.add_argument('--key')
ap.add_argument('--crop'); ap.add_argument('--speed', type=float, default=1.0)
a = ap.parse_args()
ROOT = 'C:/source/_studio-kit/web-sdk/'
if a.speed != 1.0:
    tmp = 'C:/source/shared/demo-art-library/masters/clips/_speed_' + os.path.basename(a.mp4)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.mp4, '-an', '-vf', f'setpts=PTS/{a.speed}', '-r', '24', '-crf', '10', '-pix_fmt', 'yuv420p', tmp], check=True)
    a.mp4 = tmp
out = ROOT + 'packages/kit-demo-art/static/demo/' + a.group
os.makedirs(out, exist_ok=True)
cmd = ['node', ROOT + 'tools/video-to-sprites/video-to-sprites.mjs', a.mp4, '--name', a.name, '--out', out,
       '--cell', a.cell, '--fps', a.fps]
if a.duration: cmd += ['--duration', a.duration]
if a.crop: cmd += ['--crop', a.crop]
if a.black:
    cmd += ['--black-to-alpha']
else:
    if a.key: key = a.key
    else:
        png = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.mp4, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'],
                             capture_output=True).stdout
        arr = np.asarray(Image.open(io.BytesIO(png)).convert('RGB')).astype(float)
        k = 8
        c = np.concatenate([arr[:k, :k].reshape(-1, 3), arr[:k, -k:].reshape(-1, 3), arr[-k:, :k].reshape(-1, 3), arr[-k:, -k:].reshape(-1, 3)])
        m = np.median(c, axis=0).astype(int)
        key = '%02x%02x%02x' % tuple(m)
    cmd += ['--key', key, '--similarity', a.sim]
print(' '.join(cmd))
r = subprocess.run(cmd, capture_output=True, text=True)
print(r.stdout[-600:], r.stderr[-600:])
