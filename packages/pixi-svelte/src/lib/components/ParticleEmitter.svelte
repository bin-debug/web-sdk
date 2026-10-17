<script lang="ts" module>
	import {
		Emitter,
		upgradeConfig,
		type EmitterConfigV3,
		type EmitterConfigV2,
		type EmitterConfigV1,
	} from '@barvynkoa/particle-emitter';

	import type { LoadedSpriteSheet } from '../types';

	export type Props = Partial<Emitter> & {
		key: string;
		emitSpeed?: number;
		config: EmitterConfigV3 | EmitterConfigV2 | EmitterConfigV1;
	};
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getContextApp, getContextParent } from '../context.svelte';
	import { propsSyncEffect } from '../utils.svelte';

	const props: Props = $props();
	const context = getContextApp();
	const parentContext = getContextParent();
	const textures = $derived(context.stateApp.loadedAssets?.[props.key] as LoadedSpriteSheet);
	const updatedConfig = $derived(upgradeConfig(props.config, textures));
	// svelte-ignore state_referenced_locally
	const emitter = new Emitter(parentContext.parent, updatedConfig);

	propsSyncEffect({ props, target: emitter, ignore: ['emit'] });

	$effect(() => {
		if (props.emit) emitter.init(updatedConfig);
	});

	// Keep the ticker and callback so onDestroy can remove them; otherwise every emitter ever
	// mounted (one per win) keeps updating every frame and the game slows down over time.
	const ticker = context.stateApp.pixiApplication?.ticker;
	const update = () => emitter.update(ticker!.deltaMS * (props.emitSpeed || 0.00234));
	ticker?.add(update);

	onDestroy(() => {
		ticker?.remove(update);
		emitter.emit = false;
		emitter.destroy();
	});
</script>
