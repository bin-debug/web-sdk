<script lang="ts">
	import { stateBet, stateBetDerived, stateConfig, stateModal, stateSound } from 'state-shared';
	import { bookEventAmountToNormalisedAmount, numberToCurrencyString } from 'utils-shared/amount';


	// Kit controls: a slim strip under the board, a big round spin button, a coin-style
	// buy button outside the strip, and bonus counters replacing bet/spin during free spins.
	// Operators can still recolour it through the --bc-* variables.
	type Props = {
		context: {
			eventEmitter: { broadcast: (e: any) => void; subscribeOnMount: (m: Record<string, (e: any) => any>) => void };
			stateXstateDerived: { isIdle: () => boolean };
		};
		accent?: string;
	};
	const props: Props = $props();
	const context = props.context;

	const isIdle = $derived(context.stateXstateDerived.isIdle());
	const canSpin = $derived(stateBetDerived.isBetCostAvailable());
	const autoOn = $derived(stateBetDerived.hasAutoBetCounter());
	const turbo = $derived(stateBet.isTurbo);
	const activeMode = $derived(stateBetDerived.activeBetMode());
	const boostOn = $derived(activeMode?.type === 'activate');
	const canBuy = $derived(!stateConfig.jurisdiction?.disabledBuyFeature);
	const canAuto = $derived(!stateConfig.jurisdiction?.disabledAutoplay);
	const canTurbo = $derived(!stateConfig.jurisdiction?.disabledTurbo);

	const money = (v: number) => numberToCurrencyString(v);
	const balance = $derived(money(stateBet.balanceAmount));
	const winAmount = $derived(bookEventAmountToNormalisedAmount(stateBet.winBookEventAmount));
	const bet = $derived(money(stateBet.betAmount * (activeMode?.costMultiplier ?? 1)));

	let hidden = $state(false);
	let menuOpen = $state(false);
	let stopDisabled = $state(false);
	let fs = $state({ on: false, current: 0, total: 0 });

	context.eventEmitter.subscribeOnMount({
		uiHide: () => (hidden = true),
		uiShow: () => (hidden = false),
		stopButtonClick: () => {
			stopDisabled = true;
			stateBetDerived.updateIsTurbo(true, { persistent: false });
		},
		stopButtonEnable: () => {
			stopDisabled = false;
			stateBetDerived.updateIsTurbo(false, { persistent: false });
		},
		freeSpinCounterShow: () => (fs.on = true),
		freeSpinCounterHide: () => (fs = { on: false, current: 0, total: 0 }),
		freeSpinCounterUpdate: (e) => {
			if (e.current !== undefined) fs.current = e.current;
			if (e.total !== undefined) fs.total = e.total;
		},
	});

	const press = () => context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

	const spin = () => {
		context.eventEmitter.broadcast({ type: 'soundPressBet' });
		if (isIdle && canSpin) {
			if (activeMode?.type === 'buy') stateBet.activeBetModeKey = 'BASE';
			context.eventEmitter.broadcast({ type: 'bet' });
		} else if (!isIdle && !stopDisabled) {
			if (autoOn) stateBet.autoSpinsCounter = 0;
			context.eventEmitter.broadcast({ type: 'stopButtonClick' });
		}
	};

	const stepBet = (dir: 1 | -1) => {
		if (!isIdle) return;
		press();
		const opts = [...stateConfig.betAmountOptions].sort((a, b) => (a - b) * dir);
		const next = opts.find((o) => (dir > 0 ? o > stateBet.betAmount : o < stateBet.betAmount));
		if (next !== undefined) stateBetDerived.setBetAmount(next);
	};

	const toggleAuto = () => {
		press();
		if (autoOn) stateBet.autoSpinsCounter = 0;
		else stateModal.modal = { name: 'autoSpin' };
	};
	const toggleTurbo = () => {
		press();
		stateBetDerived.updateIsTurbo(!turbo, { persistent: true });
	};
	const openBuy = () => {
		press();
		if (boostOn) stateBet.activeBetModeKey = 'BASE';
		else stateModal.modal = { name: 'buyBonus' };
	};
	const openModal = (name: 'gameRules' | 'payTable' | 'settings') => {
		menuOpen = false;
		stateModal.modal = { name } as typeof stateModal.modal;
	};
	const soundOn = $derived(stateSound.volumeValueMaster > 0);
	const toggleSound = () => (stateSound.volumeValueMaster = soundOn ? 0 : 75);
</script>

<div class="hs" class:hs-hidden={hidden} style={props.accent ? `--bc-accent: ${props.accent};` : undefined}>
	{#if canBuy && !fs.on}
		<button class="hs-buy" class:hs-buy-on={boostOn} onclick={openBuy} disabled={!isIdle}>
			<span>{boostOn ? 'BOOST ON' : 'BUY BONUS'}</span>
		</button>
	{/if}

	<div class="hs-strip">
		<div class="hs-menu-wrap">
			<button class="hs-icon" aria-label="Menu" onclick={() => ((menuOpen = !menuOpen), press())}>
				<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
			</button>
			{#if menuOpen}
				<nav class="hs-menu">
					<button onclick={toggleSound}>Sound: {soundOn ? 'on' : 'off'}</button>
					{#if canTurbo}<button onclick={toggleTurbo}>Turbo: {turbo ? 'on' : 'off'}</button>{/if}
					<button onclick={() => openModal('payTable')}>Paytable</button>
					<button onclick={() => openModal('gameRules')}>Game rules</button>
					<button onclick={() => openModal('settings')}>Settings</button>
				</nav>
			{/if}
		</div>

		<div class="hs-field">
			<span class="hs-lbl">Balance</span>
			<span class="hs-val">{balance}</span>
		</div>
		<div class="hs-field" class:hs-dim={winAmount <= 0}>
			<span class="hs-lbl">{fs.on ? 'Total win' : 'Win'}</span>
			<span class="hs-val hs-win">{money(winAmount)}</span>
		</div>

		<div class="hs-gap"></div>

		{#if fs.on}
			<div class="hs-field hs-fs">
				<span class="hs-lbl">Free spins</span>
				<span class="hs-val">{Math.max(fs.total - fs.current, 0)}</span>
			</div>
		{:else}
			<div class="hs-bet">
				<div class="hs-field">
					<span class="hs-lbl">{boostOn ? activeMode?.text.betAmountLabel || 'Bet' : 'Bet'}</span>
					<span class="hs-val">{bet}</span>
				</div>
				<div class="hs-chevs">
					<button aria-label="Increase bet" onclick={() => stepBet(1)} disabled={!isIdle}>
						<svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6" /></svg>
					</button>
					<button aria-label="Decrease bet" onclick={() => stepBet(-1)} disabled={!isIdle}>
						<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
					</button>
				</div>
			</div>

			<button
				class="hs-spin"
				class:hs-spinning={!isIdle}
				aria-label={isIdle ? 'Spin' : 'Stop'}
				onclick={spin}
				disabled={isIdle ? !canSpin : stopDisabled}
			>
				{#if isIdle || !stopDisabled}
					<svg viewBox="0 0 24 24"><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
				{/if}
			</button>

			{#if canAuto}
				<button class="hs-icon hs-round" class:hs-on={autoOn} aria-label="Autoplay" onclick={toggleAuto}>
					{#if autoOn}
						<span class="hs-count">{stateBet.autoSpinsCounter}</span>
					{:else}
						<svg viewBox="0 0 24 24"><path d="M12 4a8 8 0 1 1-7.4 5" /><path d="M4 4v5h5" /><path d="M10 9l5 3-5 3z" class="fill" /></svg>
					{/if}
				</button>
			{/if}
		{/if}
	</div>
</div>

<style>
	.hs {
		--hs-bg: var(--bc-bg, #121317);
		--hs-border: var(--bc-border, #2b2e37);
		--hs-text: var(--bc-text, #ffffff);
		--hs-muted: #8b90a0;
		--hs-accent: var(--bc-accent, #13c4a3);
		--hs-buy: var(--bc-bonus-color, #f6c21c);
		position: fixed;
		left: 50%;
		bottom: 18px;
		transform: translateX(-50%);
		width: min(780px, 96vw);
		z-index: 10;
		font-family: 'proxima-nova', system-ui, sans-serif;
		color: var(--hs-text);
		transition: opacity 0.2s, transform 0.2s;
		pointer-events: none;
	}
	.hs > * {
		pointer-events: auto;
	}
	.hs-hidden {
		opacity: 0;
		transform: translate(-50%, 12px);
	}
	.hs-hidden * {
		pointer-events: none !important;
	}
	.hs-strip {
		display: flex;
		align-items: center;
		gap: 18px;
		height: 62px;
		padding: 0 10px 0 8px;
		background: var(--hs-bg);
		border: 1px solid var(--hs-border);
		border-radius: var(--bc-radius, 6px);
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
	}
	.hs-field {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
		min-width: 0;
	}
	.hs-lbl {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--hs-muted);
	}
	.hs-val {
		font-size: 19px;
		font-weight: 800;
		white-space: nowrap;
	}
	.hs-win {
		color: var(--hs-text);
	}
	.hs-dim .hs-val {
		color: var(--hs-muted);
	}
	.hs-fs .hs-val {
		color: var(--hs-accent);
		font-size: 24px;
	}
	.hs-gap {
		flex: 1;
	}
	.hs-bet {
		display: flex;
		align-items: center;
		gap: 8px;
		padding-right: 4px;
	}
	button {
		background: none;
		border: 0;
		color: inherit;
		cursor: pointer;
		font: inherit;
	}
	button:disabled {
		opacity: 0.35;
		cursor: default;
	}
	svg {
		width: 22px;
		height: 22px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2.4;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	svg .fill {
		fill: currentColor;
		stroke: none;
	}
	.hs-chevs {
		display: flex;
		flex-direction: column;
	}
	.hs-chevs button {
		height: 24px;
		width: 30px;
		display: grid;
		place-items: center;
	}
	.hs-chevs svg {
		width: 18px;
		height: 18px;
	}
	.hs-icon {
		width: 42px;
		height: 42px;
		display: grid;
		place-items: center;
		border-radius: 50%;
	}
	.hs-icon:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.08);
	}
	.hs-round {
		border: 2px solid var(--hs-border);
	}
	.hs-on {
		border-color: var(--hs-accent);
		color: var(--hs-accent);
	}
	.hs-count {
		font-weight: 800;
		font-size: 15px;
	}
	.hs-spin {
		width: 84px;
		height: 84px;
		margin: -22px 0;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: var(--bc-spin-fill, #0b0c0f);
		border: 4px solid var(--bc-spin-ring, #ffffff);
		box-shadow: 0 0 0 4px var(--hs-bg), 0 8px 22px rgba(0, 0, 0, 0.6);
		transition: transform 0.12s;
	}
	.hs-spin:active:not(:disabled) {
		transform: scale(0.94);
	}
	.hs-spin svg {
		width: 40px;
		height: 40px;
		stroke-width: 2.6;
	}
	.hs-spinning svg {
		animation: hs-rot 0.6s linear infinite;
	}
	@keyframes hs-rot {
		to {
			transform: rotate(360deg);
		}
	}
	.hs-buy {
		position: absolute;
		left: -104px;
		bottom: -4px;
		width: 86px;
		height: 86px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 30%, #ffe37a, var(--hs-buy) 55%, #b8860b);
		border: 4px solid #3a2a00;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.55), inset 0 -4px 0 rgba(0, 0, 0, 0.18);
		color: #2b1d00;
		font-weight: 900;
		font-size: 13px;
		line-height: 1.05;
		text-align: center;
		transition: transform 0.12s;
	}
	.hs-buy span {
		display: block;
		padding: 0 10px;
	}
	.hs-buy:hover:not(:disabled) {
		transform: rotate(-8deg) scale(1.05);
	}
	.hs-buy-on {
		background: radial-gradient(circle at 35% 30%, #8ff5e2, var(--hs-accent) 60%, #0a7a66);
		color: #032a23;
	}
	.hs-menu-wrap {
		position: relative;
	}
	.hs-menu {
		position: absolute;
		bottom: 54px;
		left: 0;
		display: flex;
		flex-direction: column;
		min-width: 180px;
		background: var(--hs-bg);
		border: 1px solid var(--hs-border);
		border-radius: 8px;
		overflow: hidden;
	}
	.hs-menu button {
		text-align: left;
		padding: 12px 16px;
		font-weight: 700;
	}
	.hs-menu button:hover {
		background: rgba(255, 255, 255, 0.07);
	}

	/* not enough room beside the strip: buy coin sits above it on the left */
	@media (max-width: 1000px) {
		.hs-buy {
			left: 8px;
			bottom: 74px;
			width: 74px;
			height: 74px;
			font-size: 11px;
		}
	}

	/* phones in portrait: two rows, spin centred, buy coin above the strip */
	@media (max-aspect-ratio: 4/5) {
		.hs {
			width: 100vw;
			bottom: 0;
		}
		.hs-strip {
			flex-wrap: wrap;
			height: auto;
			gap: 6px 12px;
			padding: 30px 12px 14px;
			border-radius: 16px 16px 0 0;
		}
		.hs-gap {
			display: none;
		}
		.hs-menu-wrap {
			order: 1;
		}
		.hs-field {
			order: 1;
			flex: 1;
		}
		.hs-bet,
		.hs-spin,
		.hs-round,
		.hs-fs {
			order: 2;
		}
		.hs-bet {
			flex: 1;
		}
		.hs-spin {
			width: 92px;
			height: 92px;
			margin: 0;
		}
		.hs-round {
			margin-left: auto;
		}
		.hs-val {
			font-size: 16px;
		}
		.hs-buy {
			left: 12px;
			bottom: auto;
			top: -78px;
			width: 72px;
			height: 72px;
			font-size: 11px;
		}
	}
</style>
