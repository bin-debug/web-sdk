import { Howl, Howler } from 'howler';
import { stateSoundDerived } from 'state-shared';

import type { Art } from './build';

// Audio slots with silence as the fallback: a missing sound is simply not played.
export function createKitAudio(art: Art) {
	const cache = new Map<string, Howl>();
	let music: { name: string; howl: Howl } | undefined;
	let enabled = true;

	const get = (name: string, loop: boolean) => {
		const url = art.audioUrl(name);
		if (!url) return undefined;
		const key = `${name}|${loop}`;
		let h = cache.get(key);
		if (!h) {
			h = new Howl({ src: [url], loop, volume: 1, html5: false });
			cache.set(key, h);
		}
		return h;
	};

	return {
		sfx(name: string, opts: { force?: boolean } = {}) {
			if (!enabled && !opts.force) return;
			const h = get(`audio.sfx.${name}`, false);
			if (!h) return;
			h.volume(stateSoundDerived.volumeSoundEffect());
			h.play();
		},
		playMusic(name: 'base' | 'bonus') {
			const url = art.audioUrl(`audio.${name}`);
			if (!url || music?.name === name) return;
			const prev = music;
			const howl = get(`audio.${name}`, true)!;
			howl.volume(0);
			howl.play();
			howl.fade(0, stateSoundDerived.volumeMusic(), 800);
			if (prev) {
				prev.howl.fade(prev.howl.volume(), 0, 600);
				setTimeout(() => prev.howl.stop(), 650);
			}
			music = { name, howl };
		},
		syncVolume() {
			if (music) music.howl.volume(stateSoundDerived.volumeMusic());
		},
		setEnabled(v: boolean) {
			enabled = v;
			if (!v) music?.howl.pause();
			else music?.howl.play();
		},
		destroy() {
			cache.forEach((h) => h.unload());
			cache.clear();
			music = undefined;
			void Howler;
		},
	};
}

export type KitAudio = ReturnType<typeof createKitAudio>;
