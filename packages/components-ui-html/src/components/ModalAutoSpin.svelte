<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import AutoSpinsOptions from './AutoSpinsOptions.svelte';
	import AutoSpinsAdvanced from './AutoSpinsAdvanced.svelte';
	import AutoSpinsStartButton from './AutoSpinsStartButton.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';

	let scrollEl = $state(null as HTMLDivElement | null);

	const close = () => (stateModal.modal = null);
</script>

{#if stateModal.modal?.name === 'autoSpin'}
	<Popup zIndex={zIndex.info} onclose={close} hideCloseButton>
		<div class="autospin-modal">
			<div class="top-row">
				<span class="title">{i18nDerived.autoSpins()}</span>
				<button class="close-btn" onclick={close} aria-label="Close">×</button>
			</div>

			<div class="scroll-area" bind:this={scrollEl}>
				<div class="subtitle" data-test="number-of-rounds">{i18nDerived.numberOfRounds()}</div>
				<AutoSpinsOptions />
				<AutoSpinsAdvanced
					ontoggle={() => {
						setTimeout(() => scrollEl?.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' }), 220);
					}}
				/>
			</div>

			<div class="footer">
				<AutoSpinsStartButton />
				<button class="close-footer-btn" onclick={close}>Close</button>
			</div>
		</div>
	</Popup>
{/if}

<style lang="scss">
	.autospin-modal {
		position: relative;
		z-index: 3; /* above Popup's click-to-close-layer (z-index: 2) */
		width: 100%;
		height: 100%;
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
		padding: 1rem 4.5rem 0.5rem 1.5rem; /* right padding leaves room for close btn */
		position: relative;
	}

	.title {
		font-size: clamp(1.8rem, 6.5vw, 2.4rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #ffffff;
		text-align: center;
		flex: 1;
	}

	.close-btn {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
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
		flex-shrink: 0;
	}

	.scroll-area {
		flex: 1 1 0;
		min-height: 0;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 0.5rem 1rem 0.75rem;
		box-sizing: border-box;
	}

	.subtitle {
		font-size: clamp(1.3rem, 4.8vw, 1.6rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.5);
		text-align: center;
	}

	.footer {
		flex: 0 0 auto;
		padding: 0.5rem 1rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.close-footer-btn {
		width: 100%;
		padding: 1rem;
		border-radius: 14px;
		font-family: 'proxima-nova', sans-serif;
		font-size: clamp(1.25rem, 4.5vw, 1.55rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.7);
		background: rgba(255, 255, 255, 0.08);
		border: 2px solid rgba(255, 255, 255, 0.2);
		cursor: pointer;
	}
</style>
