import * as PIXI from 'pixi.js';

import type { LoadedAssets, Assets } from './types';

// holdLazy: don't start the lazy assets until the game calls stateApp.releaseLazy() (e.g. once its
// loading screen is done), so they never compete with what the first screen needs.
export function createApp({ assets, holdLazy = false }: { assets: Assets; holdLazy?: boolean }) {
	let resolveLazy = () => {};
	let lazyPromise = new Promise<void>((resolve) => (resolveLazy = resolve));
	const hasLazy = Object.values(assets).some((asset) => asset.lazy);
	if (!hasLazy) resolveLazy();

	const reset = () => {
		stateApp.loaded = false;
		stateApp.lazyLoaded = !hasLazy;
		lazyPromise = new Promise<void>((resolve) => (resolveLazy = resolve));
		if (!hasLazy) resolveLazy();
		stateApp.loadingProgress = 0;
		stateApp.loadedAssets = {};
		stateApp.pixiApplication = undefined as PIXI.Application | undefined;
	};

	const stateApp = $state({
		reset,
		assets,
		loaded: false,
		lazyLoaded: !hasLazy,
		lazyHeld: holdLazy,
		releaseLazy: () => {
			stateApp.lazyHeld = false;
		},
		// resolves once the lazy assets are in (immediately when there are none)
		lazyAssetsReady: () => lazyPromise,
		markLazyLoaded: () => {
			stateApp.lazyLoaded = true;
			resolveLazy();
		},
		loadingProgress: 0,
		loadedAssets: {} as LoadedAssets,
		pixiApplication: undefined as PIXI.Application | undefined,
	});

	return {
		stateApp,
	};
}

export type App = ReturnType<typeof createApp>;
