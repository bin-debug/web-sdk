<script lang="ts">
	import { getContextLayout } from 'utils-layout';
	import { stateUi, AUTO_SPINS_TEXT_OPTIONS } from 'state-shared';
	import { OptionsGrid } from 'components-shared';

	const { stateLayoutDerived } = getContextLayout();
	const WITHOUT_1000 = AUTO_SPINS_TEXT_OPTIONS.filter((v) => v !== '1000');

	const options = $derived(
		stateLayoutDerived.layoutType() === 'landscape' ? WITHOUT_1000 : AUTO_SPINS_TEXT_OPTIONS,
	);
</script>

<OptionsGrid
	value={stateUi.autoSpinsText}
	{options}
	onchange={(value) => (stateUi.autoSpinsText = value)}
>
	{#snippet option({ option })}
		<div
			class="round-btn"
			class:selected={option === stateUi.autoSpinsText}
			class:is-infinity={option === '∞'}
			data-test="round-options"
		>
			{option}
		</div>
	{/snippet}
</OptionsGrid>

<style lang="scss">
	.round-btn {
		width: 100%;
		padding: 1.2rem 0.25rem;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.07);
		border: 2px solid rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.6);
		font-size: clamp(1.5rem, 5.5vw, 2rem);
		font-weight: 800;
		text-align: center;
		box-sizing: border-box;
		transition: background 0.12s, border-color 0.12s, color 0.12s;
		letter-spacing: 0.01em;

		&.selected {
			background: rgba(78, 205, 196, 0.18);
			border-color: var(--bc-accent, #4ecdc4);
			color: #ffffff;
			box-shadow: 0 0 0 1px var(--bc-accent, #4ecdc4) inset;
		}

		&.is-infinity {
			font-size: clamp(1.8rem, 6.5vw, 2.4rem);
			padding-bottom: 0.9rem;
		}
	}
</style>
