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
		{#if props.onclose}
			<button class="close-btn" data-test="bonus-close-button" onclick={props.onclose} aria-label="Close">
				×
			</button>
		{/if}
	</div>

	<div class="scroll-area" class:single-feature={props.maxListLength === 1}>
		<div class="bonuses-wrap" class:single-feature={props.maxListLength === 1}>
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
		padding: 0.65rem 1rem 0.4rem;
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
