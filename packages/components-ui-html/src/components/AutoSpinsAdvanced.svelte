<script lang="ts">
	import { slide } from 'svelte/transition';
	import { stateBetDerived } from 'state-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';

	import AutoSpinsLossLimit from './AutoSpinsLossLimit.svelte';
	import AutoSpinsSingleWinLimit from './AutoSpinsSingleWinLimit.svelte';
	import type { EmitterEventModal } from '../types';
	import { i18nDerived } from '../i18n/i18nDerived';

	type Props = {
		ontoggle: (duration: number) => void;
	};

	const props: Props = $props();
	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();
	const SLIDE_DURATION = 200;

	let open = $state(false);
	const disabled = $derived(stateBetDerived.activeBetMode().type === 'activate');

	function toggle() {
		if (disabled) return;
		open = !open;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (open) props.ontoggle(SLIDE_DURATION);
	}
</script>

<button
	class="advanced-toggle"
	class:open
	class:disabled
	onclick={toggle}
	disabled={disabled}
	data-test="drop-down"
>
	<span class="label">{i18nDerived.advanced()}</span>
	<span class="chevron">{open ? '▲' : '▼'}</span>
</button>

{#if open}
	<div class="advanced-panel" transition:slide={{ duration: SLIDE_DURATION }}>
		<AutoSpinsLossLimit />
		<div class="divider"></div>
		<AutoSpinsSingleWinLimit />
	</div>
{/if}

<style lang="scss">
	.advanced-toggle {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1.1rem 1.25rem;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.08);
		border: 2px solid rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.85);
		cursor: pointer;
		transition: background 0.1s, border-color 0.1s;

		&.open {
			background: rgba(255, 255, 255, 0.12);
			border-color: rgba(255, 255, 255, 0.4);
		}

		&.disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}

	.label {
		font-size: clamp(1.3rem, 5vw, 1.6rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.chevron {
		font-size: 1rem;
		opacity: 0.7;
	}

	.advanced-panel {
		border-radius: 14px;
		border: 2px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
		padding: 1.25rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: hidden;
	}

	.divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.12);
	}
</style>
