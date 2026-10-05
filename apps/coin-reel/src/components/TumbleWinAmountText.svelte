<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';

	import { Text } from 'pixi-svelte';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';

	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		width: number;
		amount: number;
		animate: boolean;
		oncomplete: () => void;
	};

	const props: Props = $props();
	const amount = new Tween(0);
	const punch = new Tween(1);

	const normalUpdate = async () => {
		await amount.set(props.amount);
		props.oncomplete();
	};

	const explosionUpdate = async () => {
		amount.set(props.amount);
		await Promise.all([
			punch.set(1.35, { duration: 180, easing: backOut }),
			punch.set(1, { duration: 260, easing: backOut }).then(),
		]);
		props.oncomplete();
	};

	$effect(() => {
		if (props.animate) explosionUpdate();
		else normalUpdate();
	});
</script>

<Text
	anchor={0.5}
	scale={punch.current}
	text={bookEventAmountToCurrencyString(amount.current)}
	style={{
		fontFamily: 'proxima-nova',
		fontWeight: '800',
		fontSize: 0.5 * SYMBOL_SIZE,
		fill: 0xffffff,
	}}
/>
