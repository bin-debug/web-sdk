<script lang="ts">
	import { getContextLayout } from 'utils-layout';
	import { stateUi, AUTO_SPINS_TEXT_OPTIONS } from 'state-shared';
	import { OptionsGrid } from 'components-shared';

	const { stateLayoutDerived } = getContextLayout();
	const AUTO_SPINS_TEXT_OPTIONS_PORTRAIT = AUTO_SPINS_TEXT_OPTIONS.filter(
		(value) => value !== '1000',
	);

	const options = $derived(
		stateLayoutDerived.layoutType() === 'landscape'
			? AUTO_SPINS_TEXT_OPTIONS_PORTRAIT
			: AUTO_SPINS_TEXT_OPTIONS,
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
		padding: 1.1rem 0.25rem;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.08);
		border: 2px solid rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.75);
		font-size: clamp(1.4rem, 5.5vw, 1.8rem);
		font-weight: 700;
		text-align: center;
		box-sizing: border-box;
		transition: background 0.1s, border-color 0.1s, color 0.1s;

		&.selected {
			background: rgba(78, 205, 196, 0.2);
			border-color: #4ecdc4;
			color: #ffffff;
		}

		&.is-infinity {
			font-size: clamp(1.8rem, 6vw, 2.2rem);
			line-height: 1;
		}
	}
</style>
