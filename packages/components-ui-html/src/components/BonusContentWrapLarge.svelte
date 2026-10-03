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
		{#if props.onclose}
			<button class="close-btn" data-test="bonus-close-button" onclick={props.onclose} aria-label="Close">
				×
			</button>
		{/if}
	</div>

	<div class="scroll-area">
		<div class="bonuses-wrap" class:single-feature={props.maxListLength === 1}>
			{@render props.bonusCardsActivate()}
			{@render props.bonusCardsBuy()}
		</div>
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

	.close-btn {
		/* Matches the stake control: dark with a gold ring, never smaller than a 48px touch target. */
		flex: 0 0 auto;
		width: max(48px, calc(clamp(14px, 4.2vw, 20px) * 2.6));
		height: max(48px, calc(clamp(14px, 4.2vw, 20px) * 2.6));
		padding: 0;
		border-radius: 50%;
		background: linear-gradient(180deg, #1d1a26, #121019);
		border: 1px solid rgb(245 197 66 / 55%);
		box-shadow: 0 0.5em 1.4em rgb(0 0 0 / 45%);
		color: var(--game-promo-accent, #f5c542);
		font-size: max(24px, calc(clamp(14px, 4.2vw, 20px) * 1.5));
		font-weight: 700;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		transition: transform 0.08s ease;

		&:active {
			transform: scale(0.92);
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
