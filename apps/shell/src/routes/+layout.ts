// SPA: the spec and art are chosen at runtime from ?game_id=...
export const prerender = true;
export const ssr = false;
export const trailingSlash = 'ignore';

import { browser } from '$app/environment';

// Art manifests are fetched before anything renders so every slot has a texture (art or code fallback).
// Browser only: the pixi modules need `window`.
export const load = async () => {
	if (browser) {
		const { initArt } = await import('../game/art');
		await initArt();
	}
	return {};
};
