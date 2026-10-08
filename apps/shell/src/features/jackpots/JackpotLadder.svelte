<script lang="ts">
	import { Container, Graphics, Sprite, Text } from 'pixi-svelte';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';

	import { MainContainer } from 'components-layout';
	import { getContext } from '../../game/context';
	import { BOARD_SIZES, SYMBOL_SIZE } from '../../game/constants';
	import { SPEC } from '../../game/spec';
	import { textStyle } from '../../game/ui';
	import { coinLayer } from '../coins/coinState.svelte';
	import { JACKPOT_LOOK } from '../coins/tiers';
	import { jackpot, jackpotFx, type JackpotTier } from './jackpotState.svelte';

	const context = getContext();
	const tiers: JackpotTier[] = ['mini', 'minor', 'major', 'grand'];
	const slots = { mini: 'symbol.J1.static', minor: 'symbol.J2.static', major: 'symbol.J3.static', grand: 'symbol.J4.static' } as const;
	const D = SYMBOL_SIZE * 0.76;
	const portrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const board = $derived(context.stateGameDerived.boardLayout());
	const boardW = $derived(BOARD_SIZES.width * board.scale);
	const boardTop = $derived(board.y - BOARD_SIZES.height * board.scale * 0.5);
	const boardBottom = $derived(board.y + BOARD_SIZES.height * board.scale * 0.5);
	// portrait: one row of four pills centred BELOW the board (above it sit the logo and the running win pill); landscape: a column left of it
	const W = $derived(portrait ? (boardW / 4) * 0.94 : D);
	const position = $derived(portrait
		? { x: board.x, y: boardBottom + D * 0.5 }
		: { x: board.x - boardW * 0.5 - D * 1.45, y: boardTop + D * 0.1 });
	const tierSpec = (tier: JackpotTier) => SPEC.jackpots?.[tier] ?? { name: tier.toUpperCase(), mult: 0 };
	const pillText = (tier: JackpotTier) => bookEventAmountToCurrencyString(tierSpec(tier).mult * 100);
	// a pill glows while a coin of its tier sits in the hold (it pays that tier when the round ends); xN when there are several
	const held = (tier: JackpotTier) => coinLayer.views.filter((view) => view.coin.kind === 'jackpot' && view.coin.tier === tier).length;
	const draw = (tier: JackpotTier, lit: boolean, w: number) => (g: any) => {
		const look = JACKPOT_LOOK[tier];
		g.clear().roundRect(-w * 0.5, -D * 0.3, w, D * 0.6, D * 0.18)
			.fill({ color: look.face, alpha: lit ? 1 : 0.8 })
			.stroke({ color: lit ? 0xfff3aa : look.rim, width: D * (lit ? 0.08 : 0.05) });
	};
</script>

<MainContainer>
	<Container {...position} zIndex={115}>
		{#each tiers as tier, i (tier)}
			{@const count = held(tier)}
			{@const lit = jackpot.active === tier || count > 0}
			{@const hasArt = Boolean(context.stateApp.loadedAssets?.[slots[tier]])}
			<Container x={portrait ? (i - 1.5) * (boardW / 4) : 0} y={portrait ? 0 : i * D * 0.72} scale={jackpot.active === tier ? jackpotFx.pop.current : 1}>
				{#if hasArt}
					<Sprite key={slots[tier]} anchor={0.5} width={W} height={D * 0.6} alpha={lit ? 1 : 0.85} />
				{:else}
					<Graphics draw={draw(tier, lit, W)} />
				{/if}
				<Text anchor={0.5} y={-D * 0.1} text={tierSpec(tier).name} style={textStyle(D * 0.16, 0xffffff, JACKPOT_LOOK[tier].rim)} />
				<Text anchor={0.5} y={D * 0.12} text={pillText(tier)} style={textStyle(D * 0.15, 0xfff5cf, JACKPOT_LOOK[tier].rim)} />
				{#if count > 1}
					<Text anchor={0.5} x={W * 0.38} y={-D * 0.1} text={`x${count}`} style={textStyle(D * 0.17, 0xffffff, JACKPOT_LOOK[tier].rim)} />
				{/if}
			</Container>
		{/each}
	</Container>
	{#if jackpot.grand}
		<Container x={board.x} y={board.y} zIndex={140}>
			<Container scale={jackpotFx.pop.current}>
				<Text anchor={0.5} text="GRAND JACKPOT" style={textStyle(D * 0.3, 0xffe887, 0x7b230d)} />
				<Text anchor={0.5} y={D * 0.33} text={bookEventAmountToCurrencyString(jackpotFx.amount.current)} style={textStyle(D * 0.25, 0xffffff, 0x7b230d)} />
			</Container>
		</Container>
	{/if}
</MainContainer>
