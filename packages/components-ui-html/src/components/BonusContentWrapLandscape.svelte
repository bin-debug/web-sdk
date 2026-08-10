<script lang="ts">
	import type { Snippet } from 'svelte';

	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';

	type Props = {
		maxListLength: number;
		onclose?: () => void;
		betAmount: Snippet;
		bonusCardsActivate: Snippet;
		bonusCardsBuy: Snippet;
	};

	const props: Props = $props();
</script>

<BaseContent maxWidth="100%">
	<div class="top-row">
		{@render props.betAmount()}
		{#if props.onclose}
			<button class="close-btn" data-test="bonus-close-button" onclick={props.onclose} aria-label="Close">
				×
			</button>
		{/if}
	</div>

	<BaseScrollable type="column">
		<div class="bonuses-wrap">
			{@render props.bonusCardsActivate()}
			{@render props.bonusCardsBuy()}
		</div>
	</BaseScrollable>
</BaseContent>

<style lang="scss">
	.top-row {
		flex: 0 0 auto;
		margin-top: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.close-btn {
		flex: 0 0 auto;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: #ffffff;
		font-size: 1.6rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bonuses-wrap {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 0.75rem;
		width: min(88vw, 620px);
		padding: 0.25rem 0.25rem 1rem;
		box-sizing: border-box;
	}
</style>
