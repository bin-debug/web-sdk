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

<div class="portrait-modal" class:single-feature={props.maxListLength === 1}>
	<div class="top-row">
		{@render props.betAmount()}
	</div>

	<div class="scroll-area" class:single-feature={props.maxListLength === 1}>
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
		padding: 0.65rem 1rem 0.4rem;
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

	.portrait-modal.single-feature {
		justify-content: center;
	}

	.scroll-area.single-feature {
		flex: 0 0 auto;
		width: 100%;
		padding: 0 0.75rem;
	}

	.portrait-modal.single-feature .top-row {
		padding: 0 1rem;
		margin-bottom: 25px;
	}

	.bonuses-wrap.single-feature {
		flex: 0 0 auto;
		/* The modal may live inside a scaled game canvas on mobile. Size against
		 * the viewport instead of a fixed rem cap so the offer stays legible. */
		width: calc(100vw - 1rem);
		max-width: 42rem;
		align-self: center;
		grid-template-columns: minmax(0, 1fr);
		grid-auto-rows: auto;
		justify-content: center;
		align-content: start;
		padding: 0.75rem 0;
	}

	.bonuses-wrap.single-feature :global(.bonus-card-wrap) {
		height: auto;
		min-height: 0;
		padding: clamp(1.5rem, 6vw, 2.5rem);
	}

	@media (max-width: 320px) {
		.bonuses-wrap {
			grid-template-columns: 1fr;
		}
	}
</style>
