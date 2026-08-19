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
	{disabled}
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
		padding: 1.15rem 1.25rem;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.07);
		border: 2px solid rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.8);
		cursor: pointer;
		transition: background 0.12s, border-color 0.12s;

		&.open {
			background: rgba(255, 255, 255, 0.11);
			border-color: rgba(255, 255, 255, 0.35);
			color: #ffffff;
		}

		&.disabled {
			opacity: 0.35;
			cursor: not-allowed;
		}
	}

	.label {
		font-size: clamp(1.3rem, 5vw, 1.65rem);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.chevron {
		font-size: 1rem;
		opacity: 0.65;
	}

	.advanced-panel {
		border-radius: 14px;
		border: 2px solid rgba(255, 255, 255, 0.15);
		background: rgba(0, 0, 0, 0.25);
		padding: 1.1rem 0.85rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		overflow: hidden;
	}

	.divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
		margin: 0.1rem 0;
	}
</style>
