<script lang="ts">
	import { Popup } from 'components-shared';
	import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
	import { stateBet, stateFreeSpins, stateModal } from 'state-shared';

	const allocation = $derived(stateFreeSpins.allocations[0]);
	const playNow = () => {
		if (!allocation) return;
		stateFreeSpins.activeAllocation = allocation;
		stateFreeSpins.currentSpin = allocation.spinsUsed;
		stateFreeSpins.totalWinnings = 0;
		stateBet.betAmount = allocation.spinValue / API_AMOUNT_MULTIPLIER;
		stateFreeSpins.showAwardPopup = false;
		stateModal.modal = null;
	};
</script>

{#if stateModal.modal?.name === 'freeSpinAward' && allocation}
	<Popup onclose={() => { stateFreeSpins.showAwardPopup = false; stateModal.modal = null; }}>
		<section class="award">
			<h2>{allocation.type === 'welcome_bonus' ? 'Welcome Bonus!' : 'You Have Free Spins!'}</h2>
			{#if allocation.type === 'welcome_bonus'}
				<p>Your welcome bonus is ready to play.</p>
			{/if}
			<p>{allocation.spinCount - allocation.spinsUsed} Free Spins</p>
			<p>Stake: {(allocation.spinValue / API_AMOUNT_MULTIPLIER).toFixed(2)}</p>
			<p>{allocation.wageringMultiplier > 0 ? `Wagering: ${allocation.wageringMultiplier}x` : 'No Wagering'}</p>
			<div><button onclick={playNow}>Play Now</button><button onclick={() => { stateFreeSpins.showAwardPopup = false; stateModal.modal = null; }}>Later</button></div>
		</section>
	</Popup>
{/if}

<style lang="scss">.award { min-width: 280px; text-align: center; padding: 1.5rem; } button { margin: .5rem; }</style>
