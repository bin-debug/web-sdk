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

<div class="desktop-modal">
	<div class="top-row">
		{@render props.betAmount()}
	</div>

	<div class="scroll-area">
		<div class="bonuses-wrap" class:single-feature={props.maxListLength === 1}>
			{@render props.bonusCardsActivate()}
			{@render props.bonusCardsBuy()}
		</div>
		{#if props.onclose}
			<button class="close-btn" data-test="bonus-close-button" onclick={props.onclose}>Close</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.desktop-modal {
		position: fixed;
		inset: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding-bottom: env(safe-area-inset-bottom, 12px);
		padding-top: env(safe-area-inset-top, 0px);
		box-sizing: border-box;
	}

	.top-row {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: max(1rem, env(safe-area-inset-top, 0px)) 1.25rem 0.85rem;
	}

	/* Below the offer, outside the card: dark with white text, never smaller than a 48px touch target. */
	.close-btn {
		font-size: clamp(14px, 4.2vw, 20px);
		display: block;
		flex: 0 0 auto;
		align-self: center;
		margin-left: auto;
		margin-right: auto;
		min-width: min(100%, 11em);
		min-height: max(48px, 2.8em);
		margin-top: 0.4em;
		padding: 0 2em;
		border-radius: 999px;
		background: rgb(14 13 20 / 88%);
		border: 1px solid rgb(255 255 255 / 22%);
		box-shadow: 0 0.5em 1.4em rgb(0 0 0 / 45%);
		color: #ffffff;
		font-family: inherit;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		cursor: pointer;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		transition: transform 0.08s ease, background 0.15s ease;

		&:active {
			transform: scale(0.96);
		}

		&:focus-visible {
			outline: 2px solid #ffffff;
			outline-offset: 3px;
		}
	}

	@media (hover: hover) {
		.close-btn:hover {
			background: rgb(30 28 40 / 92%);
		}
	}

	@media (orientation: landscape) {
		.close-btn {
			font-size: clamp(13px, 2.6vh, 20px);
		}
	}

	.scroll-area {
		flex: 1 1 0;
		min-height: 0;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding: 0.75rem 1.5rem 1.5rem;
		box-sizing: border-box;
	}

	.bonuses-wrap {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1rem;
		max-width: 960px;
		margin: 0 auto;

		:global(.bonus-card-wrap) {
			min-width: 0;
			box-sizing: border-box;
		}
	}

	.bonuses-wrap.single-feature {
		grid-template-columns: minmax(0, 640px);
		grid-auto-rows: auto;
		justify-content: center;
		align-content: start;
		min-height: 0;
	}

	.bonuses-wrap.single-feature :global(.bonus-card-wrap) {
		min-height: 0;
	}
</style>
