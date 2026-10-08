<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App } from 'pixi-svelte';
	import { stateModal, stateBet } from 'state-shared';
	import { GameVersion, Modals } from 'components-ui-html';
	import { KitBar } from 'kit-ui';

	import { getContext } from '../game/context';
	import { SPEC } from '../game/spec';
	import { gameActor } from '../game/actor';
	import Sound from './Sound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Background from './Background.svelte';
	import Logo from './Logo.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import BoardCells from './BoardCells.svelte';
	import Mascot from './Mascot.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import WinAmounts from './WinAmounts.svelte';
	import TumbleBoard from './TumbleBoard.svelte';
	import RunningWin from './RunningWin.svelte';
	import GlobalMultiplier from './GlobalMultiplier.svelte';
	import Win from './Win.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';
	import CoinLayer from '../features/coins/CoinLayer.svelte';
	import WildLayer from '../features/wilds/WildLayer.svelte';
	import RespinCounter from '../features/respins/RespinCounter.svelte';
	import TriggerRow from '../features/triggerRow/TriggerRow.svelte';
	import StashRow from '../features/stash/StashRow.svelte';
	import ExpandedReels from '../features/wilds/ExpandedReels.svelte';
	import CloverLayer from '../features/clovers/CloverLayer.svelte';
	import CollectorLayer from '../features/collectors/CollectorLayer.svelte';
	import HoldLayer from '../features/holdAndWin/HoldLayer.svelte';
	import HoldBanner from '../features/holdAndWin/HoldBanner.svelte';
	import SquaresLayer from '../features/squares/SquaresLayer.svelte';
	import RetriggerBanner from '../features/bonusTiers/RetriggerBanner.svelte';
	import JackpotLadder from '../features/jackpots/JackpotLadder.svelte';

	const context = getContext();

	onMount(() => {
		context.stateLayout.showLoadingScreen = true;
		// dev handle for the QA scripts (tools/qa): the shell's emitter and xstate state
		(window as any).__shell = {
			eventEmitter: context.eventEmitter,
			stateXstate: context.stateXstate,
			stateGame: context.stateGame,
			gameActor,
			stateApp: context.stateApp,
			stateBet,
		};
	});

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
	});
</script>

<App>
	<EnableHotkey />
	<EnableGameActor />
	<EnablePixiExtension />

	<Background />

	{#if context.stateLayout.showLoadingScreen}
		<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
	{:else}
		<ResumeBet />
		<!-- Audio starts after the first tap (browser autoplay rule), so <Sound /> renders after the loading screen. -->
		<Sound />

		<Logo />
		<Mascot />

		<MainContainer sortableChildren={true}>
			<BoardCells />
		</MainContainer>

		<MainContainer>
			<Board />
			<Anticipations />
			<RunningWin />
			{#if SPEC.features.includes('bottomRowExpand')}
				<TriggerRow />
			{/if}
			{#if SPEC.features.includes('reelStash')}
				<StashRow />
			{/if}
			<HoldLayer />
			<CoinLayer />
			<CloverLayer />
			<CollectorLayer />
			<ExpandedReels />
			<WildLayer />
			<RespinCounter />
			<RespinCounter placement="hold" />
			{#if SPEC.features.includes('globalMultiplier')}
				<GlobalMultiplier />
			{/if}
		</MainContainer>

		<MainContainer>
			<TumbleBoard />
			<!-- Persistent overlay: tumble events hide <Board />, but golden cells must remain visible. -->
			<SquaresLayer />
			<WinAmounts />
		</MainContainer>

		<Win />
		<FreeSpinIntro />
		{#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
			<FreeSpinCounter />
		{/if}
		<FreeSpinOutro />
		<RetriggerBanner />
		{#if SPEC.features.includes('jackpotLadder')}
			<JackpotLadder />
		{/if}
		<HoldBanner />
		<Transition />
	{/if}
</App>

{#if !context.stateLayout.showLoadingScreen}
	<KitBar
		context={{
			eventEmitter: context.eventEmitter as never,
			stateXstateDerived: context.stateXstateDerived,
		}}
		accent={SPEC.ui.accent}
	/>
{/if}

<Modals>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
</Modals>
