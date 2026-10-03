<script lang="ts">
	// The betting bar is shared by every game (components-ui-html). This wrapper only hands it
	// this game's context, board positioning and info modal.
	import { BettingBar } from 'components-ui-html';
	import { getContext } from '../game/context';
	import { setBoardCenterY } from '../game/stateGame.svelte';
	import InfoModal from './InfoModal.svelte';
</script>

<BettingBar context={getContext()} {setBoardCenterY} {InfoModal} />
