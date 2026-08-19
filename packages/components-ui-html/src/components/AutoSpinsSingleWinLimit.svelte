<script lang="ts">
	import { stateUi, SINGLE_WIN_LIMIT_TEXT_OPTIONS } from 'state-shared';
	import { OptionsGrid } from 'components-shared';

	import { i18nDerived } from '../i18n/i18nDerived';
</script>

<div class="section-title">{i18nDerived.singleWinLimit()}</div>

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
	.section-title {
		font-size: clamp(1.1rem, 4vw, 1.35rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.6);
		text-align: center;
	}

	.limit-btn {
		width: 100%;
		padding: 0.9rem 0.2rem;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.08);
		border: 2px solid rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.7);
		font-size: clamp(1.1rem, 4vw, 1.4rem);
		font-weight: 600;
		text-align: center;
		white-space: nowrap;
		box-sizing: border-box;
		transition: background 0.1s, border-color 0.1s, color 0.1s;

		&.selected {
			background: rgba(78, 205, 196, 0.2);
			border-color: #4ecdc4;
			color: #ffffff;
		}

		&.is-infinity {
			font-size: clamp(1.4rem, 5vw, 1.8rem);
			line-height: 1;
		}
	}
</style>
