<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import AutoSpinsOptions from './AutoSpinsOptions.svelte';
	import AutoSpinsAdvanced from './AutoSpinsAdvanced.svelte';
	import AutoSpinsStartButton from './AutoSpinsStartButton.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';

	let scrollEl = $state(null as HTMLDivElement | null);
</script>

{#if stateModal.modal?.name === 'autoSpin'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<div class="autospin-modal">
			<div class="top-row">
				<span class="title">{i18nDerived.autoSpins()}</span>
				<button class="close-btn" onclick={() => (stateModal.modal = null)} aria-label="Close">×</button>
			</div>

			<div class="scroll-area" bind:this={scrollEl}>
				<div class="subtitle" data-test="number-of-rounds">{i18nDerived.numberOfRounds()}</div>
				<AutoSpinsOptions />
				<AutoSpinsAdvanced
					ontoggle={(duration) => {
						if (scrollEl) {
							setTimeout(() => scrollEl?.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' }), duration);
						}
					}}
				/>
			</div>

			<div class="footer">
				<AutoSpinsStartButton />
			</div>
		</div>
	</Popup>
{/if}

<style lang="scss">
	.autospin-modal {
		position: fixed;
		inset: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding-bottom: env(safe-area-inset-bottom, 12px);
		padding-top: env(safe-area-inset-top, 0px);
		box-sizing: border-box;
	}

	.top-row {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1rem 1rem 0.5rem;
		position: relative;
	}

	.title {
		font-size: clamp(1.8rem, 6.5vw, 2.4rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #ffffff;
		text-align: center;
	}

	.close-btn {
		position: absolute;
		right: 1rem;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.45);
		border: 2px solid rgba(255, 255, 255, 0.25);
		color: #ffffff;
		font-size: 2rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.scroll-area {
		flex: 1 1 0;
		min-height: 0;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1rem;
		padding: 0.75rem 1rem;
		box-sizing: border-box;
	}

	.subtitle {
		font-size: clamp(1.1rem, 4vw, 1.4rem);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.6);
		text-align: center;
	}

	.footer {
		flex: 0 0 auto;
		padding: 0.5rem 1rem 0.75rem;
	}
</style>
