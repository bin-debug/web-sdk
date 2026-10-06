<script lang="ts">
	import { onMount, untrack } from 'svelte';

	import { Container, Sprite, SpriteSheet } from 'pixi-svelte';
	import type { Art, SymbolState } from 'kit-assets';

	import { createJuice } from './juice.svelte';

	// One symbol renderer for every state: a clip (sprite sheet) when the art has one,
	// otherwise the still plus a juice preset. A symbol with only a PNG still animates.
	type Props = {
		art: Art;
		name: string;
		state: SymbolState;
		size: number; // cell size in px
		x?: number;
		y?: number;
		loop?: boolean;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const juice = createJuice();

	const visual = $derived(props.art.symbolVisual(props.name, props.state));
	// clips are drawn a little larger than the cell so the shine can bleed out
	const clipSize = $derived(props.size * 1.0);
	const stillSize = $derived(props.size * 0.94);
	const staticKey = $derived(props.art.symbolStatic(props.name));
	const poofKey = $derived(props.art.has('fx.poof') ? 'fx.poof' : undefined);

	// plain variables on purpose: the effect below must not subscribe to its own bookkeeping
	let done = false;
	const finish = () => {
		if (done) return;
		done = true;
		props.oncomplete?.();
	};

	// stills: run the juice preset, then report completion. Clips report from onComplete.
	let runId = 0;
	$effect(() => {
		const v = visual;
		const state = props.state;
		void props.name;
		const id = ++runId;
		untrack(() => run(v, state, id));
	});

	function run(v: typeof visual, state: string, id: number) {
		done = false;
		juice.reset();
		if (v.kind === 'juice') {
			// idle states complete immediately (matches the template sprite behaviour)
			if (v.preset === 'none' || v.preset === 'motionBlur' || state === 'static' || state === 'spin' || state === 'postWinStatic') {
				finish();
				return;
			}
			juice.play(v.preset, { cell: props.size }).then(() => {
				if (id === runId) finish();
			});
		} else if (v.kind === 'sprite') {
			finish();
		}
	}

	onMount(() => () => (runId += 1));

	const glowAlpha = $derived(juice.glow.current);
</script>

{#if visual.kind === 'sheet'}
	<!-- a fresh sprite per clip and state: swapping the textures of a live AnimatedSprite stops its playback -->
	{#key `${visual.key}|${props.state}`}
	<SpriteSheet
		key={visual.key}
		x={props.x}
		y={props.y}
		anchor={0.5}
		width={clipSize}
		height={clipSize}
		animationSpeed={visual.fps / 60}
		loop={props.loop ?? visual.loop}
		play={true}
		onComplete={finish}
	/>
	{/key}
{:else}
	<Container
		x={props.x}
		y={(props.y ?? 0) + juice.offsetY.current}
		rotation={juice.rotation.current}
		scale={{ x: juice.scaleX.current, y: juice.scaleY.current }}
		alpha={juice.alpha.current}
	>
		<Sprite key={staticKey} anchor={0.5} width={stillSize} height={stillSize} />
		{#if glowAlpha > 0.01}
			<Sprite key={staticKey} anchor={0.5} width={stillSize} height={stillSize} blendMode="add" alpha={glowAlpha} />
		{/if}
		{#if props.state === 'explosion' && poofKey}
			<SpriteSheet key={poofKey} anchor={0.5} width={props.size * 1.3} height={props.size * 1.3} animationSpeed={0.6} loop={false} play={true} />
		{/if}
	</Container>
{/if}
