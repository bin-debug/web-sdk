<script lang="ts" module>
	import * as PIXI from 'pixi.js';

	export type Props = {
		key: string;
		size: number;
		init: (particles: PIXI.Particle[]) => void;
		update: (particles: PIXI.Particle[]) => void;
	};
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { LoadedSprite } from '../types';
	import { getContextApp, getContextParticleParent } from '../context.svelte';

	const props: Props = $props();
	const context = getContextApp();
	const particleContainer = getContextParticleParent();
	const texture = $derived(
		(context.stateApp.loadedAssets?.[props.key] || PIXI.Texture.EMPTY) as LoadedSprite,
	);

	const particles: PIXI.Particle[] = Array.from(
		{ length: props.size },
		() => new PIXI.Particle(texture),
	);
	particleContainer.addParticle(...particles);
	props.init(particles);

	// Removed on destroy, so remounts don't stack up per-frame updates.
	const ticker = context.stateApp.pixiApplication?.ticker;
	const update = () => {
		props.update(particles);
		particleContainer.update();
	};
	ticker?.add(update);
	onDestroy(() => ticker?.remove(update));
</script>

{#if texture === PIXI.Texture.EMPTY}
	{console.error(`Particle: key "${props.key}" is not found in the loadedAssets`)}
	{console.log('loadedAssets', $state.snapshot(context.stateApp).loadedAssets)}
{/if}
