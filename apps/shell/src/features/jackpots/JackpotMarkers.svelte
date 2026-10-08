<script lang="ts">
	import { Circle, Container, Text } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import { SYMBOL_SIZE } from '../../game/constants';
	import { textStyle } from '../../game/ui';
	import { SPEC } from '../../game/spec';
	import { jackpot, jackpotFx, TIER_LOOK } from './jackpotState.svelte';

	const S = SYMBOL_SIZE;
</script>

<BoardContainer zIndex={112}>
	{#each jackpot.markers as marker (`${marker.pos.reel}:${marker.pos.row}`)}
		<Container x={S * (marker.pos.reel + 0.5)} y={S * (marker.pos.row + 0.5)} scale={jackpot.active === marker.tier ? jackpotFx.pop.current : 1}>
			<Circle anchor={0.5} diameter={S * 0.7} backgroundColor={TIER_LOOK[marker.tier].face} borderColor={0xffffff} borderWidth={S * 0.05} />
			<Text anchor={0.5} text={(SPEC.jackpots?.[marker.tier]?.name ?? marker.tier).slice(0, 1).toUpperCase()} style={textStyle(S * 0.31, 0xffffff, TIER_LOOK[marker.tier].rim)} />
		</Container>
	{/each}
</BoardContainer>
