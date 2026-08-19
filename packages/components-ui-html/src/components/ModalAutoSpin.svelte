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
		position: fixed;
		inset: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding-bottom: env(safe-area-inset-bottom, 12px);
		padding-top: env(safe-area-inset-top, 0px);
		box-sizing: border-box;

		/* Desktop: compact centered card instead of full-screen */
		@media (orientation: landscape) and (min-width: 768px) {
			inset: auto;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: min(680px, 92vw);
			height: min(680px, 92vh);
			border-radius: 20px;
			background: rgba(18, 12, 28, 0.98);
			border: 1px solid rgba(255, 255, 255, 0.1);
			box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
			padding-bottom: 0;
			padding-top: 0;
		}
	}

	.top-row {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 4.5rem 0.5rem 1.5rem;
		position: relative;

		@media (orientation: landscape) and (min-width: 768px) {
			padding: 0.65rem 3.5rem 0.4rem 1rem;
		}
	}

	.title {
		font-size: clamp(1.8rem, 6.5vw, 2.4rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #ffffff;
		text-align: center;
		flex: 1;

		@media (orientation: landscape) and (min-width: 768px) {
			font-size: 1.4rem;
		}
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

		@media (orientation: landscape) and (min-width: 768px) {
			width: 2.5rem;
			height: 2.5rem;
			font-size: 1.5rem;
			right: 0.75rem;
		}
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

		@media (orientation: landscape) and (min-width: 768px) {
			gap: 0.5rem;
			padding: 0.3rem 0.85rem 0.5rem;
		}
	}

	.subtitle {
		font-size: clamp(1.3rem, 4.8vw, 1.6rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.5);
		text-align: center;

		@media (orientation: landscape) and (min-width: 768px) {
			font-size: 0.9rem;
		}
	}

	.footer {
		flex: 0 0 auto;
		padding: 0.5rem 1rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;

		@media (orientation: landscape) and (min-width: 768px) {
			padding: 0.4rem 0.85rem 0.75rem;
			gap: 0.4rem;
		}
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

		@media (orientation: landscape) and (min-width: 768px) {
			padding: 0.6rem;
			font-size: 1rem;
			border-radius: 10px;
		}
	}
</style>
