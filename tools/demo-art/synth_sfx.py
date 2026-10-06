#!/usr/bin/env python3
"""Synthesise the demo SFX pack (original, no licensing) into static/demo/audio/sfx/*.mp3.
Artlist search_sfx only returns preview links (no download), so the demo pack is generated here."""
import numpy as np, subprocess, os, wave, tempfile

SR = 44100
OUT = 'C:/source/_studio-kit/web-sdk/packages/kit-demo-art/static/demo/audio/sfx/'
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def env(n, a=0.005, d=0.1, s=0.0, r=0.1):
    e = np.ones(n)
    na = min(int(a * SR), n)
    nd = max(0, min(int(d * SR), n - na))
    nr = min(int(r * SR), n)
    e[:na] = np.linspace(0, 1, max(na, 1))
    if nd:
        e[na:na + nd] = np.linspace(1, s, nd) if s < 1 else 1
        e[na + nd:] = s
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr)
    return e


def tone(f, dur, wave_='sine', vol=0.5, a=0.005, d=0.1, s=0.0, r=0.05, slide=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    fr = np.full(n, f, float) if slide is None else np.linspace(f, slide, n)
    ph = 2 * np.pi * np.cumsum(fr) / SR
    if wave_ == 'sine':
        y = np.sin(ph)
    elif wave_ == 'tri':
        y = 2 / np.pi * np.arcsin(np.sin(ph))
    elif wave_ == 'square':
        y = np.sign(np.sin(ph)) * 0.6
    else:
        y = 2 * (ph / (2 * np.pi) % 1) - 1
    return y * env(n, a, d, s, r) * vol


def noise(dur, vol=0.4, lp=None, a=0.002, d=0.1, s=0.0, r=0.05):
    n = int(dur * SR)
    y = rng.standard_normal(n)
    if lp:  # one-pole low-pass
        k = np.exp(-2 * np.pi * lp / SR)
        out = np.zeros(n); acc = 0.0
        for i in range(n):
            acc = (1 - k) * y[i] + k * acc
            out[i] = acc
        y = out / (np.abs(out).max() + 1e-9)
    return y * env(n, a, d, s, r) * vol


def mix(*parts, total=None):
    n = total or max(o + len(p) for o, p in parts)
    y = np.zeros(int(n * SR) if total else n)
    for o, p in parts:
        i = int(o * SR)
        y[i:i + len(p)] += p[:len(y) - i]
    return y


def arp(notes, step, dur, wave_='tri', vol=0.4, d=0.12):
    return [(i * step, tone(f, dur, wave_, vol, 0.004, d, 0.0, 0.04)) for i, f in enumerate(notes)]


def save(name, y):
    y = y / max(1.0, np.abs(y).max() / 0.89)
    pcm = (y * 32767).astype(np.int16)
    p = tempfile.mktemp(suffix='.wav')
    with wave.open(p, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', p, '-codec:a', 'libmp3lame', '-q:a', '4', OUT + name + '.mp3'], check=True)
    os.remove(p)


N = {'C4': 261.6, 'E4': 329.6, 'G4': 392, 'C5': 523.3, 'E5': 659.3, 'G5': 784, 'C6': 1046.5, 'A4': 440, 'D5': 587.3, 'F5': 698.5, 'B5': 987.8}

save('spin_start', mix((0, noise(0.35, 0.5, lp=3000, a=0.02, d=0.3)), (0, tone(180, 0.3, 'saw', 0.18, 0.01, 0.25, 0, 0.05, slide=520)), total=0.4))
save('reel_stop', mix((0, tone(140, 0.12, 'sine', 0.8, 0.002, 0.1, 0, 0.02, slide=70)), (0, noise(0.06, 0.3, lp=2500, d=0.05)), total=0.15))
save('land_low', mix((0, tone(220, 0.15, 'tri', 0.5, 0.002, 0.12, 0, 0.03, slide=150)), total=0.18))
save('land_high', mix((0, tone(520, 0.2, 'tri', 0.45, 0.002, 0.15, 0, 0.04)), (0.03, tone(780, 0.2, 'sine', 0.3, 0.002, 0.15, 0, 0.04)), total=0.25))
save('land_special', mix(*arp([N['G4'], N['C5'], N['E5'], N['G5']], 0.05, 0.3, 'sine', 0.4, 0.25), (0, noise(0.15, 0.15, lp=6000, d=0.1)), total=0.6))
save('win_small', mix(*arp([N['C5'], N['E5'], N['G5']], 0.08, 0.25, 'tri', 0.45, 0.2), total=0.5))
save('win_medium', mix(*arp([N['C5'], N['E5'], N['G5'], N['C6'], N['G5'], N['C6']], 0.08, 0.3, 'tri', 0.45, 0.25), (0.4, tone(N['C6'], 0.4, 'sine', 0.3, 0.005, 0.35)), total=1.0))
save('tumble_pop', mix((0, tone(900, 0.09, 'sine', 0.6, 0.001, 0.08, 0, 0.01, slide=300)), (0, noise(0.05, 0.2, lp=5000, d=0.04)), total=0.12))
save('coin_flip', mix((0, tone(1318, 0.07, 'square', 0.25, 0.001, 0.06)), (0.07, tone(1760, 0.35, 'square', 0.22, 0.001, 0.3, 0, 0.05)), total=0.5))
save('coin_collect', mix(*arp([N['E5'], N['G5'], N['C6'], N['E5'] * 2], 0.045, 0.2, 'square', 0.25, 0.15), total=0.35))
save('clover', mix(*arp([N['C5'], N['D5'], N['E5'], N['G5'], N['B5']], 0.06, 0.25, 'sine', 0.35, 0.2), (0.1, noise(0.3, 0.08, lp=8000, d=0.3)), total=0.6))
save('rainbow', mix((0, tone(300, 0.9, 'sine', 0.35, 0.02, 0.8, 0, 0.1, slide=1500)), *arp([N['C5'], N['E5'], N['G5'], N['C6'], N['E5'] * 2, N['G5'] * 2], 0.1, 0.3, 'sine', 0.2, 0.25), total=1.2))
save('dynamite', mix((0, noise(0.5, 0.25, lp=7000, a=0.01, d=0.45)), (0.55, noise(0.6, 0.9, lp=1200, a=0.002, d=0.55)), (0.55, tone(90, 0.5, 'sine', 0.9, 0.002, 0.45, 0, 0.05, slide=35)), total=1.2))
save('jackpot', mix(*arp([N['C5'], N['E5'], N['G5'], N['C6'], N['G5'], N['C6'], N['E5'] * 2, N['G5'] * 2], 0.1, 0.35, 'tri', 0.4, 0.3), (0.8, tone(N['C6'], 0.9, 'sine', 0.35, 0.01, 0.8)), total=1.8))
save('bonus_trigger', mix((0, tone(200, 0.8, 'saw', 0.2, 0.02, 0.7, 0, 0.1, slide=800)), *arp([N['C5'], N['G5'], N['C6'], N['E5'] * 2], 0.2, 0.5, 'tri', 0.4, 0.4)[0:4], (0.8, noise(0.6, 0.2, lp=5000, d=0.5)), total=1.6))
save('bigwin_sting', mix((0, tone(131, 1.8, 'saw', 0.18, 0.01, 1.6, 0, 0.2)), *[(0.15 * i, tone(f, 1.6 - 0.15 * i, 'tri', 0.3, 0.005, 1.4, 0, 0.2)) for i, f in enumerate([N['C4'], N['E4'], N['G4'], N['C5'], N['E5'], N['G5'], N['C6']])], (0, noise(0.5, 0.1, lp=6000, d=0.4)), total=2.4))
save('button', mix((0, tone(700, 0.06, 'square', 0.25, 0.001, 0.05)), total=0.08))
save('buy_confirm', mix(*arp([N['G4'], N['C5'], N['E5']], 0.07, 0.3, 'sine', 0.4, 0.25), (0.25, tone(N['C6'], 0.3, 'sine', 0.3, 0.003, 0.25)), total=0.7))
print('sfx done')
