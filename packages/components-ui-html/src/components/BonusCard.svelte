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
		padding: clamp(1.25rem, 3vw, 2rem);
		flex-direction: column;
		display: flex;
		justify-content: space-between;

		border-radius: 1.25rem;
		background: linear-gradient(145deg, var(--bonus-surface-highlight, rgba(255, 255, 255, 0.98)), var(--bonus-surface, var(--bc-card-bg, #f7f6f2)));
		border: 1px solid var(--bonus-border, var(--bc-card-border, rgba(255, 255, 255, 0.72)));
		box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.85);
		color: var(--bonus-text, var(--bc-card-text, #14141a));
		text-align: center;
		width: 100%;
		box-sizing: border-box;
		gap: clamp(0.85rem, 2vw, 1.25rem);
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
