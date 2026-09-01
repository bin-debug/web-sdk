<script lang="ts">
	import { Popup } from 'components-shared';
	import { stateModal } from 'state-shared';

	const modal = $derived(stateModal.modal?.name === 'freeSpinComplete' ? stateModal.modal : null);
</script>

{#if modal}
	<Popup onclose={() => { stateModal.modal = null; }}>
		<section class="complete">
			<h2>Free Spins Complete!</h2>
			<p>You won <strong>{modal.totalWinnings.toFixed(2)}</strong></p>
			<p>Bet <strong>{modal.wageringTarget.toFixed(2)}</strong> with real money to unlock your winnings.</p>
			<div><button onclick={() => { stateModal.modal = null; }}>Got it</button></div>
		</section>
	</Popup>
{/if}

<style lang="scss">.complete { min-width: 280px; text-align: center; padding: 1.5rem; } strong { font-weight: 700; } button { margin: .5rem; }</style>
