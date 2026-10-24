<script lang="ts">
	// The betting bar is shared by every game (components-ui-html). This wrapper only hands it
	// this game's context, board positioning and info modal.
	import { BettingBar } from 'components-ui-html';
	import { getContext } from '../game/context';
	import { setBoardCenterY } from '../game/stateGame.svelte';
	import InfoModal from './InfoModal.svelte';
</script>

<BettingBar context={getContext()} {setBoardCenterY} {InfoModal} />

<style>
	/* mobile Repeat + Turbo icons: the shared grey is hard to see over this game's art, so white
	   when off; on, Turbo keeps its turbo colour and Repeat takes the accent ("body" outranks the
	   shared scoped rules) */
	:global(body .bcm-ibtn.bc-repeat),
	:global(body .bcm-ibtn.bc-turbo) {
		color: #fff;
	}
	:global(body .bcm-ibtn.bc-turbo.bc-active) {
		color: var(--bc-turbo-color);
	}
	:global(body .bcm-ibtn.bc-repeat.bc-active) {
		color: var(--bc-accent);
		filter: none;
	}
</style>
