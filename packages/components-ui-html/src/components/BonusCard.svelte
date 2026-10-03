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
	/* Same look as the promo layer (black and gold); games can restyle it with the --game-promo-* variables. */
	.bonus-card-wrap {
		--accent: var(--game-promo-accent, #f5c542);
		--accent-deep: var(--game-promo-accent-deep, #b7791f);
		--text: var(--game-promo-text, #fff8e6);
		--muted: var(--game-promo-muted, #d9cfb8);
		padding: clamp(1.25rem, 3vw, 2rem);
		flex-direction: column;
		display: flex;
		justify-content: space-between;

		border-radius: 1.25rem;
		background: linear-gradient(180deg, #1d1a26, #121019);
		border: 1px solid rgb(245 197 66 / 55%);
		box-shadow: 0 0 0 0.35rem rgb(245 197 66 / 10%), 0 1.2rem 3.5rem rgb(0 0 0 / 60%);
		color: var(--text);
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
		background: rgb(255 255 255 / 6%);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.4em;
	}
</style>
