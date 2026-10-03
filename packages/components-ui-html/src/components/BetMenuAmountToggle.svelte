<script lang="ts">
	import { onDestroy } from 'svelte';
	import { stateBet, stateConfig } from 'state-shared';
	import { OptionsToggle } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import type { EmitterEventModal } from '../types';

	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();

	// Press and hold steps repeatedly: a first pause, then faster steps.
	const HOLD_DELAY_MS = 380;
	const HOLD_REPEAT_MS = 110;
	let holdTimer: ReturnType<typeof setTimeout> | undefined;

	const stopHold = () => {
		clearTimeout(holdTimer);
		holdTimer = undefined;
	};
	onDestroy(stopHold);

	const step = (toggle: () => unknown, isDisabled: () => boolean) => {
		if (isDisabled()) return stopHold();
		toggle();
		// Short tick on phones that support it; ignored elsewhere.
		navigator.vibrate?.(8);
	};

	const startHold = (event: PointerEvent, toggle: () => unknown, isDisabled: () => boolean) => {
		if (event.button !== 0) return;
		(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
		stopHold();
		step(toggle, isDisabled);
		const repeat = () => {
			if (isDisabled()) return stopHold();
			step(toggle, isDisabled);
			holdTimer = setTimeout(repeat, HOLD_REPEAT_MS);
		};
		holdTimer = setTimeout(repeat, HOLD_DELAY_MS);
	};

	// Pointer presses are handled on pointerdown; keyboard activation arrives as a click with detail 0.
	const onKeyboardClick = (event: MouseEvent, toggle: () => unknown, isDisabled: () => boolean) => {
		if (event.detail === 0) step(toggle, isDisabled);
	};
</script>

<OptionsToggle
	value={stateBet.betAmount}
	options={stateConfig.betAmountOptions}
	onchange={(value) => {
		stateBet.betAmount = value;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
	}}
>
	{#snippet children({ disabledDown, disabledUp, toggleDown, toggleUp })}
		<div class="stake" role="group" aria-label="Stake">
			<button
				type="button"
				class="stake__step"
				data-test="down-button"
				aria-label="Lower stake"
				disabled={disabledDown}
				onpointerdown={(e) => startHold(e, toggleDown, () => disabledDown)}
				onpointerup={stopHold}
				onpointercancel={stopHold}
				onlostpointercapture={stopHold}
				onclick={(e) => onKeyboardClick(e, toggleDown, () => disabledDown)}
				oncontextmenu={(e) => e.preventDefault()}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /></svg>
			</button>

			<div class="stake__value" aria-live="polite">
				<span class="stake__label">Stake</span>
				<span class="stake__amount">{numberToCurrencyString(stateBet.betAmount)}</span>
			</div>

			<button
				type="button"
				class="stake__step"
				data-test="up-button"
				aria-label="Raise stake"
				disabled={disabledUp}
				onpointerdown={(e) => startHold(e, toggleUp, () => disabledUp)}
				onpointerup={stopHold}
				onpointercancel={stopHold}
				onlostpointercapture={stopHold}
				onclick={(e) => onKeyboardClick(e, toggleUp, () => disabledUp)}
				oncontextmenu={(e) => e.preventDefault()}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14" /></svg>
			</button>
		</div>
	{/snippet}
</OptionsToggle>

<style lang="scss">
	/* Same look as the promo layer (black and gold). Sized from the viewport in px (games set the
	 * root font-size to 50% on small screens, so rem would shrink); everything inside is in em. */
	.stake {
		--accent: var(--game-promo-accent, #f5c542);
		--accent-deep: var(--game-promo-accent-deep, #b7791f);
		--text: var(--game-promo-text, #fff8e6);
		--muted: var(--game-promo-muted, #d9cfb8);
		font-size: clamp(14px, 4.2vw, 20px);
		display: flex;
		align-items: center;
		gap: 0.5em;
		padding: 0.4em;
		border-radius: 999px;
		background: linear-gradient(180deg, #1d1a26, #121019);
		border: 1px solid rgb(245 197 66 / 55%);
		box-shadow: 0 0 0 0.3em rgb(245 197 66 / 10%), 0 0.8em 2em rgb(0 0 0 / 50%);
		color: var(--text);
		user-select: none;
		-webkit-user-select: none;
	}

	.stake__step {
		flex: 0 0 auto;
		font: inherit; /* buttons don't inherit the font size, and the sizes below are in em */
		/* Never smaller than a 48px touch target. */
		width: max(48px, 3.3em);
		height: max(48px, 3.3em);
		display: grid;
		place-items: center;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: linear-gradient(180deg, #ffe58a, var(--accent) 60%, var(--accent-deep));
		box-shadow: 0 0.25em 0.8em rgb(245 197 66 / 30%), inset 0 -0.15em 0 rgb(0 0 0 / 18%);
		color: #3d2300;
		cursor: pointer;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		transition: transform 0.08s ease, filter 0.15s ease, opacity 0.15s ease;

		svg {
			width: 46%;
			height: 46%;
			fill: none;
			stroke: currentColor;
			stroke-width: 3;
			stroke-linecap: round;
		}

		&:active:not(:disabled) {
			transform: scale(0.92);
			filter: brightness(0.95);
		}

		&:focus-visible {
			outline: 2px solid var(--text);
			outline-offset: 3px;
		}

		&:disabled {
			cursor: default;
			background: rgb(255 255 255 / 8%);
			box-shadow: none;
			color: rgb(255 255 255 / 35%);
		}
	}

	@media (hover: hover) {
		.stake__step:hover:not(:disabled) {
			filter: brightness(1.08);
		}
	}

	.stake__value {
		/* Fixed width so the buttons don't move as the amount changes. */
		min-width: 6.2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 1.1;
	}

	.stake__label {
		color: var(--muted);
		font-size: 0.62em;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.stake__amount {
		color: var(--accent);
		font-size: 1.45em;
		font-weight: 900;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
		text-shadow: 0 2px 14px rgb(245 197 66 / 35%);
	}

	@media (orientation: landscape) {
		.stake {
			font-size: clamp(13px, 2.6vh, 20px);
		}
	}
</style>
