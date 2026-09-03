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
