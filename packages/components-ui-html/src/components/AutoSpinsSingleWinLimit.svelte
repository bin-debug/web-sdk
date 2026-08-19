<script lang="ts">
	import { stateUi, SINGLE_WIN_LIMIT_TEXT_OPTIONS } from 'state-shared';
	import { OptionsGrid } from 'components-shared';
	import { i18nDerived } from '../i18n/i18nDerived';
</script>

<div class="section-label">{i18nDerived.singleWinLimit()}</div>

<OptionsGrid
	miniSize
	value={stateUi.autoSpinsSingleWinLimitText}
	options={SINGLE_WIN_LIMIT_TEXT_OPTIONS}
	onchange={(value) => (stateUi.autoSpinsSingleWinLimitText = value)}
>
	{#snippet option({ option })}
		<div
			class="limit-btn"
			class:selected={option === stateUi.autoSpinsSingleWinLimitText}
			class:is-infinity={option === '∞'}
			data-test="single-win-limit-options"
		>
			{option}
		</div>
	{/snippet}
</OptionsGrid>

<style lang="scss">
	.section-label {
		font-size: clamp(1rem, 3.8vw, 1.25rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.45);
		text-align: center;
		margin-bottom: 0.3rem;
	}

	.limit-btn {
		width: 100%;
		padding: 0.85rem 0.15rem;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.06);
		border: 2px solid rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.6);
		font-size: clamp(1.15rem, 4.2vw, 1.45rem);
		font-weight: 700;
		text-align: center;
		white-space: nowrap;
		box-sizing: border-box;
		transition: background 0.12s, border-color 0.12s, color 0.12s;

		&.selected {
			background: rgba(78, 205, 196, 0.18);
			border-color: var(--bc-accent, #4ecdc4);
			color: #ffffff;
			box-shadow: 0 0 0 1px var(--bc-accent, #4ecdc4) inset;
		}

		&.is-infinity {
			font-size: clamp(1.4rem, 5vw, 1.8rem);
			padding-bottom: 0.6rem;
		}
	}
</style>
