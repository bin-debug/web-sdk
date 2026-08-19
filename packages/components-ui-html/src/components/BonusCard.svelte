<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		icon?: Snippet;
		title: Snippet;
		description: Snippet;
		volatility?: Snippet;
		price: Snippet;
		button: Snippet;
	};

	const props: Props = $props();
</script>

<div class="bonus-card-wrap">
	{#if props.icon}
		<div class="icon">
			{@render props.icon()}
		</div>
	{/if}
	<div class="info">
		{@render props.title()}
		{@render props.description()}
		{#if props.volatility}
			{@render props.volatility()}
		{/if}
		{@render props.price()}
	</div>
	{@render props.button()}
</div>

<style lang="scss">
	.bonus-card-wrap {
		padding: 1.25rem 1rem;
		flex-direction: column;
		display: flex;
		justify-content: space-between;

		border-radius: 14px;
		background: var(--bc-card-bg, #f7f6f2);
		border: 1px solid var(--bc-card-border, rgba(0, 0, 0, 0.12));
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
		color: var(--bc-card-text, #14141a);
		text-align: center;
		width: 100%;
		box-sizing: border-box;
		gap: 0.85rem;
	}

	.icon {
		width: 100%;
		height: 6rem;
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		overflow: hidden;
		background: var(--bc-card-icon-bg, rgba(0, 0, 0, 0.05));
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.4em;
	}
</style>
