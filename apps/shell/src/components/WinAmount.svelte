<script lang="ts" module>
	export type RawWin = {
		win: number;
		mult: number;
		result: number;
		reel: number;
		row: number; // padded row index (1 = first visible row)
	};
	export type Win = RawWin & { oncomplete: () => void };
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';

	import { Text } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';
	import { SECOND } from 'constants-shared/time';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';

	import { SYMBOL_SIZE } from '../game/constants';
	import { textStyle } from '../game/ui';
	import { getContext } from '../game/context';

	type Props = { win: Win };

	const props: Props = $props();
	const context = getContext();
	const y = new Tween(0);
	const alpha = new Tween(1);
	const scale = new Tween(0.4);
	let showMult = $state(props.win.mult > 1);

	onMount(async () => {
		const speed = stateBetDerived.timeScale();
		scale.set(1, { duration: 180 / speed });
		if (showMult) {
			await new Promise((r) => setTimeout(r, SECOND / speed));
			showMult = false;
			context.eventEmitter.broadcast({ type: 'soundOnce', name: 'coin_collect' });
		}
		y.set(-SYMBOL_SIZE * 0.8, { duration: (SECOND * 1.4) / speed });
		await new Promise((r) => setTimeout(r, (SECOND * 0.9) / speed));
		await alpha.set(0, { duration: (SECOND * 0.4) / speed });
		props.win.oncomplete();
	});

	const text = $derived(
		showMult ? `${bookEventAmountToCurrencyString(props.win.win)} x ${props.win.mult}` : bookEventAmountToCurrencyString(props.win.result),
	);
</script>

<Text
	x={SYMBOL_SIZE * (props.win.reel + 0.5)}
	y={SYMBOL_SIZE * (props.win.row - 0.5) + y.current}
	anchor={0.5}
	scale={scale.current}
	alpha={alpha.current}
	{text}
	style={textStyle(SYMBOL_SIZE * 0.34, 0xffe27a)}
/>
