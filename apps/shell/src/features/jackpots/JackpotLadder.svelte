<script lang="ts">
	import { Container, Graphics, Sprite, Text } from 'pixi-svelte';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';

	import { MainContainer } from 'components-layout';
	import { getContext } from '../../game/context';
	import { BOARD_SIZES, SYMBOL_SIZE } from '../../game/constants';
	import { SPEC } from '../../game/spec';
	import { textStyle } from '../../game/ui';
	import { jackpot, jackpotFx, type JackpotTier } from './jackpotState.svelte';

	const context = getContext();
	const tiers: JackpotTier[] = ['mini', 'minor', 'major', 'grand'];
	const looks = {
		mini: { face: 0x35be76, rim: 0x0f643b, slot: 'symbol.J1.static' },
		minor: { face: 0x4298e8, rim: 0x19558c, slot: 'symbol.J2.static' },
		major: { face: 0xdf4f9b, rim: 0x8b2158, slot: 'symbol.J3.static' },
		grand: { face: 0xee8b35, rim: 0x9a4612, slot: 'symbol.J4.static' },
	} as const;
	const D = SYMBOL_SIZE * 0.76;
	const portrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const board = $derived(context.stateGameDerived.boardLayout());
	const position = $derived(portrait
		? { x: board.x - BOARD_SIZES.width * board.scale * 0.5, y: board.y - BOARD_SIZES.height * board.scale * 0.5 - D * 1.8 }
		: { x: board.x - BOARD_SIZES.width * board.scale * 0.5 - D * 1.45, y: board.y - BOARD_SIZES.height * board.scale * 0.5 + D * 0.1 });
	const tierSpec = (tier: JackpotTier) => SPEC.jackpots?.[tier] ?? { name: tier.toUpperCase(), mult: 0 };
	const pillText = (tier: JackpotTier) => bookEventAmountToCurrencyString(tierSpec(tier).mult * 100);
	const draw = (tier: JackpotTier, active: boolean) => (g: any) => {
		const look = looks[tier];
		g.clear().roundRect(-D * 0.5, -D * 0.3, D, D * 0.6, D * 0.18)
			.fill({ color: look.face, alpha: active ? 1 : 0.8 })
			.stroke({ color: active ? 0xfff3aa : look.rim, width: D * (active ? 0.08 : 0.05) });
	};
</script>

<MainContainer>
	<Container {...position} zIndex={115}>
		{#each tiers as tier, i (tier)}
			{@const row = portrait ? (tier === 'grand' ? 0 : 1 + Math.floor(i / 2)) : i}
			{@const col = portrait && tier !== 'grand' ? (i - 1) % 2 : 0}
			{@const active = jackpot.active === tier}
			{@const look = looks[tier]}
			{@const hasArt = Boolean(context.stateApp.loadedAssets?.[look.slot])}
			<Container x={col * D * 1.12 + (portrait && tier === 'grand' ? D * 0.56 : 0)} y={row * D * 0.72} scale={active ? jackpotFx.pop.current : 1}>
				{#if hasArt}
					<Sprite key={look.slot} anchor={0.5} width={D} height={D * 0.6} alpha={active ? 1 : 0.85} />
				{:else}
					<Graphics draw={draw(tier, active)} />
				{/if}
				<Text anchor={0.5} y={-D * 0.1} text={tierSpec(tier).name} style={textStyle(D * 0.16, 0xffffff, look.rim)} />
				<Text anchor={0.5} y={D * 0.12} text={pillText(tier)} style={textStyle(D * 0.15, 0xfff5cf, look.rim)} />
			</Container>
		{/each}
		{#if jackpot.grand}
			<Container x={portrait ? D * 0.56 : D * 0.5} y={portrait ? D * 2.45 : D * 1.6} scale={jackpotFx.pop.current}>
				<Text anchor={0.5} text="GRAND JACKPOT" style={textStyle(D * 0.3, 0xffe887, 0x7b230d)} />
				<Text anchor={0.5} y={D * 0.33} text={bookEventAmountToCurrencyString(jackpotFx.amount.current)} style={textStyle(D * 0.25, 0xffffff, 0x7b230d)} />
			</Container>
		{/if}
	</Container>
</MainContainer>
