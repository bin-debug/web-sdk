import { buildArt, createKitAudio, fetchManifest, mergeManifests, type Art, type KitAudio } from 'kit-assets';

import { ART_MODE, GAME_ID, SPEC } from './spec';
import { stateApp } from './stateApp';

// Art registry: demo art library (manifest) under the game's own art, with code fallbacks for every slot.
export const DEMO_BASE = '/assets/demo';
export const GAME_BASE = `/assets/game/${GAME_ID}`;

let artValue: Art | undefined;
let audioValue: KitAudio | undefined;

export async function initArt() {
	const [demo, game] = await Promise.all([
		ART_MODE === 'none' || ART_MODE === 'game' ? null : fetchManifest(DEMO_BASE),
		ART_MODE === 'none' ? null : fetchManifest(GAME_BASE),
	]);
	const slots = mergeManifests([
		{ base: GAME_BASE, from: 'game', manifest: game },
		{ base: DEMO_BASE, from: 'demo', manifest: demo },
	]);
	artValue = buildArt(SPEC, slots);
	audioValue = createKitAudio(artValue);
	stateApp.assets = artValue.assets;
	console.info(`[shell] ${GAME_ID}: art mode "${ART_MODE}", ${Object.keys(slots).length} slots, ${artValue.missing.length} code fallbacks`);
	return artValue;
}

export const getArt = () => {
	if (!artValue) throw new Error('Art is not initialised yet (initArt runs in +layout.ts load).');
	return artValue;
};

export const getAudio = () => {
	if (!audioValue) throw new Error('Audio is not initialised yet.');
	return audioValue;
};
