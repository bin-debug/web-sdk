<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		maxListLength: number;
		onclose?: () => void;
		betAmount: Snippet;
		bonusCardsActivate: Snippet;
		bonusCardsBuy: Snippet;
	};

	const props: Props = $props();
</script>

<div class="portrait-modal">
	<div class="top-row">
		{@render props.betAmount()}
		{#if props.onclose}
			<button class="close-btn" data-test="bonus-close-button" onclick={props.onclose} aria-label="Close">
				×
			</button>
		{/if}
	</div>

	<div class="scroll-area">
		<div class="bonuses-wrap">
			{@render props.bonusCardsActivate()}
			{@render props.bonusCardsBuy()}
		</div>
	</div>
</div>

<style lang="scss">
	.portrait-modal {
		display: flex;
		flex-direction: column;
		position: fixed;
		inset: 0;
		overflow: hidden;
		padding-bottom: env(safe-area-inset-bottom, 12px);
		padding-top: env(safe-area-inset-top, 0px);
		box-sizing: border-box;
		/* above popup's click-to-close-layer (z-index: 2) so + / - don't close modal */
		z-index: 10;
	}

	.top-row {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem 0.5rem;
	}

	.close-btn {
		flex: 0 0 auto;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.45);
		border: 2px solid rgba(255, 255, 255, 0.25);
		color: #ffffff;
		font-size: 2rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.scroll-area {
		flex: 1 1 0;
		min-height: 0;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		display: flex;
		flex-direction: column;
		padding: 0.5rem 0.75rem 0.75rem;
		box-sizing: border-box;
	}

	.bonuses-wrap {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: 1fr;
		gap: 0.75rem;

		:global(.bonus-card-wrap) {
			min-width: 0;
			max-width: none;
			height: 100%;
			box-sizing: border-box;
		}

		/* lone last card spans both columns */
		:global(.bonus-card-wrap:last-child:nth-child(odd)) {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 320px) {
		.bonuses-wrap {
			grid-template-columns: 1fr;
		}
	}
</style>
