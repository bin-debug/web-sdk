import { Howl } from 'howler';

import { type LoadedAudio } from 'pixi-svelte';

// Several audio sprites behind the one Howl interface the players use. The first sprite loads
// straight away; the others (e.g. bonus music) only start downloading once it has loaded, so they
// never compete with it. A sound from a sprite still loading is queued by Howler and plays on arrival.
// Sound ids are unique across Howls (Howler keeps one counter), so id-based calls route by id.
export function createHowlGroup(sprites: LoadedAudio<string>[]) {
	const howls = sprites.map(
		(audio, i) => new Howl({ src: audio.src, sprite: audio.sprite, volume: 1, preload: i === 0 }),
	);
	const [first, ...rest] = howls;
	if (rest.length) first.once('load', () => rest.forEach((howl) => howl.load()));

	const byName = new Map<string, Howl>();
	sprites.forEach((audio, i) => Object.keys(audio.sprite).forEach((name) => byName.set(name, howls[i])));
	const byId = new Map<number, Howl>();
	const forId = (id?: number) => (id === undefined ? undefined : byId.get(id));

	const group = {
		play(nameOrId: string | number) {
			if (typeof nameOrId === 'number') return forId(nameOrId)?.play(nameOrId) ?? 0;
			const howl = byName.get(nameOrId) ?? first;
			const id = howl.play(nameOrId);
			byId.set(id, howl);
			return id;
		},
		pause(id: number) {
			forId(id)?.pause(id);
			return group;
		},
		stop(id: number) {
			forId(id)?.stop(id);
			byId.delete(id);
			return group;
		},
		volume(volume: number, id: number) {
			forId(id)?.volume(volume, id);
			return group;
		},
		fade(from: number, to: number, duration: number, id: number) {
			forId(id)?.fade(from, to, duration, id);
			return group;
		},
		rate(rate: number, id: number) {
			forId(id)?.rate(rate, id);
			return group;
		},
		once(event: 'end', fn: (id: number) => void, id: number) {
			forId(id)?.once(event, fn, id);
			return group;
		},
		unload() {
			howls.forEach((howl) => howl.unload());
			byId.clear();
		},
	};

	return group as unknown as Howl;
}
