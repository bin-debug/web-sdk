<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as PIXI from 'pixi.js';

	import { getContextApp } from '../context.svelte';
	import { getProcessed } from '../assetLoad';
	import type { LoadedAssets, RawAsset } from '../types';

	type Props = { children: Snippet };

	const props: Props = $props();
	const context = getContextApp();

	let preLoaded = $state(false);

	const assetNameList = $derived(
		context.stateApp.assets
			? Object.keys(context.stateApp.assets).filter(
					(key) =>
						Boolean(context.stateApp.assets?.[key].preload) === false &&
						!context.stateApp.assets?.[key].lazy,
				)
			: [],
	);

	const preAssetNameList = $derived(
		context.stateApp.assets
			? Object.keys(context.stateApp.assets).filter(
					(key) => context.stateApp.assets?.[key].preload === true,
				)
			: [],
	);

	const lazyAssetNameList = $derived(
		context.stateApp.assets
			? Object.keys(context.stateApp.assets).filter((key) => context.stateApp.assets?.[key].lazy)
			: [],
	);

	let counter = 0;

	const onProgress = (value: number) => {
		if (preLoaded && !context.stateApp.loaded && value === 1) {
			counter = counter + 1;
			const ratio = counter / assetNameList.length;
			context.stateApp.loadingProgress = ratio * 100;
		}
	};

	const loadAssets = async (nameList: string[]) => {
		const loadedAssetsArray = await Promise.all(
			nameList.map(async (key) => {
				try {
					const { type, src } = context.stateApp.assets![key];
					const loadSrc =
						type === 'spine' ? Object.values(src).filter((item) => typeof item === 'string') : src;
					const rawAsset = await PIXI.Assets.load<RawAsset>(loadSrc, onProgress);
					const processed = getProcessed({ key, rawAsset, type, src });
					return processed;
				} catch (error) {
					console.error(`[AssetLoader] Failed to load "${key}":`, error);
				}
			}),
		);

		return loadedAssetsArray.reduce(
			(acc, cur) => ({
				...acc,
				...cur,
			}),
			{} as LoadedAssets,
		);
	};

	$effect(() => {
		if (!preLoaded) {
			(async () => {
				if (preAssetNameList.length > 0) {
					const preLoadedAssets = await loadAssets(preAssetNameList);
					if (preLoadedAssets) context.stateApp.loadedAssets = preLoadedAssets;
				}
				preLoaded = true;
			})();
		}
	});

	$effect(() => {
		if (!context.stateApp.loaded && preLoaded) {
			(async () => {
				if (assetNameList.length > 0) {
					const postLoadedAssets = await loadAssets(assetNameList);
					if (postLoadedAssets)
						context.stateApp.loadedAssets = {
							...context.stateApp.loadedAssets,
							...postLoadedAssets,
						};
				}
				context.stateApp.loaded = true;
			})();
		}
	});

	// Lazy assets: fetched in the background once the game is playable (and released, see holdLazy).
	let lazyStarted = false;
	// a hold is a preference, never a lock: release it a while after the rest has loaded
	const LAZY_HOLD_MAX_MS = 8000;
	$effect(() => {
		if (context.stateApp.loaded && context.stateApp.lazyHeld) {
			const id = setTimeout(() => context.stateApp.releaseLazy(), LAZY_HOLD_MAX_MS);
			return () => clearTimeout(id);
		}
	});
	$effect(() => {
		if (context.stateApp.loaded && !context.stateApp.lazyHeld && !lazyStarted) {
			lazyStarted = true;
			(async () => {
				if (lazyAssetNameList.length > 0) {
					const lazyAssets = await loadAssets(lazyAssetNameList);
					if (lazyAssets)
						context.stateApp.loadedAssets = { ...context.stateApp.loadedAssets, ...lazyAssets };
				}
				context.stateApp.markLazyLoaded();
			})();
		}
	});
</script>

{#if preLoaded}
	{@render props.children()}
{/if}
