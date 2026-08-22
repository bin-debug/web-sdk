<script lang="ts">
	import { onMount } from 'svelte';
	import { stateBet, stateConfig, stateBetDerived, stateModal, stateUi, stateSound } from 'state-shared';
	import { bookEventAmountToNormalisedAmount } from 'utils-shared/amount';
	import { getContext } from '../game/context';
	import { setBoardCenterY } from '../game/stateGame.svelte';
	import InfoModal from './InfoModal.svelte';

	const context = getContext();

	// "" Derived state """""""""""""""""""""""""""""""""""""""""""""""""""""""""
	const isPortrait  = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const isIdle      = $derived(context.stateXstateDerived.isIdle());
	const canSpin     = $derived(stateBetDerived.isBetCostAvailable());
	const turbo       = $derived(stateBet.isTurbo);
	const autoOn      = $derived(stateBetDerived.hasAutoBetCounter());
	const bonusActive = $derived(stateBetDerived.activeBetMode()?.type === 'activate');

	// Mobile-only: hide the reel/spin bar while the Buy Bonus screen is open — it
	// has its own bet controls and the bar just gets in the way / overlaps it.
	// Driven directly off stateModal so it reappears the instant the modal closes
	// (X button, Escape, backdrop click) — there is no separate "restore" step,
	// so it can't get stuck hidden.
	const bonusModalOpen = $derived(stateModal.modal?.name === 'buyBonus');

	// Currency symbol " resolved from the RGS-authenticated currency code
	const CURRENCY_SYMBOLS: Record<string, string> = {
		ZAR: 'R', USD: '$', EUR: '€', GBP: '£', BRL: 'R$', INR: '₹', JPY: '¥', CAD: '$', AUD: '$', NZD: '$',
	};
	const cSym    = $derived(CURRENCY_SYMBOLS[stateBet.currency] ?? (stateBet.currency ? stateBet.currency + ' ' : '$'));
	const balance = $derived(cSym + stateBet.balanceAmount.toFixed(2));
	const bet     = $derived(cSym + stateBet.betAmount.toFixed(2));
	const win     = $derived(cSym + bookEventAmountToNormalisedAmount(stateBet.winBookEventAmount).toFixed(2));

	// stop-button lock " mirrors ButtonBetProvider.svelte logic from lines app
	let stopDisabled = $state(false);
	context.eventEmitter.subscribeOnMount({
		stopButtonClick: () => {
			stopDisabled = true;
			stateBetDerived.updateIsTurbo(true,  { persistent: false });
		},
		stopButtonEnable: () => {
			stopDisabled = false;
			stateBetDerived.updateIsTurbo(false, { persistent: false });
		},
	});

	// "" Free spin counter — replaces stake display on portrait during free spins "
	let inFreeSpin     = $state(false);
	let fsCurrentCount = $state(0);
	let fsTotalCount   = $state(0);
	context.eventEmitter.subscribeOnMount({
		freeSpinCounterShow:   () => (inFreeSpin = true),
		freeSpinCounterHide:   () => { inFreeSpin = false; fsCurrentCount = 0; fsTotalCount = 0; },
		freeSpinCounterUpdate: (e) => {
			if (e.current !== undefined) fsCurrentCount = e.current;
			if (e.total   !== undefined) fsTotalCount   = e.total;
		},
	});

	// "" Actions """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

	// Spin / Stop " matches ButtonBetProvider.svelte exactly
	const spin = () => {
		context.eventEmitter.broadcast({ type: 'soundPressBet' });
		if (isIdle && canSpin) {
			// Clear buy-mode before a normal spin (ButtonBetProvider behaviour)
			if (stateBetDerived.activeBetMode()?.type === 'buy') stateBet.activeBetModeKey = 'BASE';
			context.eventEmitter.broadcast({ type: 'boardFramePulse' });
			context.eventEmitter.broadcast({ type: 'bet' });
		} else if (!isIdle && !stopDisabled) {
			if (autoOn) stateBet.autoSpinsCounter = 0;
			context.eventEmitter.broadcast({ type: 'stopButtonClick' });
		}
	};

	// Bet up / down " matches ButtonIncrease / ButtonDecrease
	const increaseBet = () => {
		if (!isIdle) return;
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		const opts = [...stateConfig.betAmountOptions].sort((a, b) => a - b);
		const next = opts.find((o) => o > stateBet.betAmount);
		if (next !== undefined) stateBetDerived.setBetAmount(next);
	};
	const decreaseBet = () => {
		if (!isIdle) return;
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		const opts = [...stateConfig.betAmountOptions].sort((a, b) => b - a);
		const prev = opts.find((o) => o < stateBet.betAmount);
		if (prev !== undefined) stateBetDerived.setBetAmount(prev);
	};

	// Can the stake still step up / down? Drives the subtle chevron hint.
	const canIncrease = $derived(stateConfig.betAmountOptions.some((o) => o > stateBet.betAmount));
	const canDecrease = $derived(stateConfig.betAmountOptions.some((o) => o < stateBet.betAmount));

	// Spin-button attention: while idle and ready to spin, give the icon a full
	// 360° turn at random intervals (3.5–8s) to draw the eye. It never turns while
	// the reels are spinning (spinTurns only advances when isIdle).
	let spinTurns = $state(0);
	$effect(() => {
		let t: ReturnType<typeof setTimeout>;
		const tick = () => {
			if (isIdle && canSpin) spinTurns += 1;
			t = setTimeout(tick, 3500 + Math.random() * 4500);
		};
		t = setTimeout(tick, 3500 + Math.random() * 4500);
		return () => clearTimeout(t);
	});
	const spinIconStyle = $derived(
		`transform: rotate(${spinTurns * 360}deg); transition: transform .9s cubic-bezier(.4,0,.2,1);`,
	);

	// Turbo " matches ButtonTurbo.svelte exactly
	const toggleTurbo = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.updateIsTurbo(!turbo, { persistent: true });
	};

	// Autoplay " matches ButtonAutoSpin.svelte exactly
	const toggleAutoplay = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (autoOn) {
			stateBet.autoSpinsCounter = 0;
		} else {
			stateModal.modal = { name: 'autoSpin' };
		}
	};

	// Menu
	const menuOpen = $derived(stateUi.menuOpen);
	const openMenu  = () => { context.eventEmitter.broadcast({ type: 'soundPressGeneral' }); stateUi.menuOpen = true; };
	const closeMenu = () => { context.eventEmitter.broadcast({ type: 'soundPressGeneral' }); stateUi.menuOpen = false; };

	// "" Menu item state """""""""""""""""""""""""""""""""""""""""""""""""""""""
	const soundOn = $derived(stateSound.volumeValueMaster > 0);
	const musicOn = $derived(stateSound.volumeValueMusic  > 0);
	let showInfo = $state(false);
	const menuToggleSound = () => { stateSound.volumeValueMaster = soundOn ? 0 : 75; };
	const menuToggleMusic = () => { stateSound.volumeValueMusic  = musicOn ? 0 : 75; };
	const menuToggleTurbo = () => { context.eventEmitter.broadcast({ type: 'soundPressGeneral' }); stateBetDerived.updateIsTurbo(!turbo, { persistent: true }); };
	const menuOpenInfo    = () => { showInfo = true; };
	const menuHome        = () => { closeMenu(); window.history.back(); };

	// Close menu when clicking outside any .bc-menu-wrap
	function handleWindowClick(e: MouseEvent) {
		if (!stateUi.menuOpen) return;
		const inMenu = e.composedPath().some(
			(el) => (el as Element).classList?.contains('bc-menu-wrap')
		);
		if (!inMenu) stateUi.menuOpen = false;
	}

	// "" Board-centred positioning """"""""""""""""""""""""""""""""""""""""""""
	// Bar is fixed at CSS bottom:50px. We compute the board centre Y in world
	// space so the board bottom lands 50px above the bar top, then push that
	// value into stateGame via setBoardCenterY so PIXI repositions the board.
	let barEl      = $state<HTMLElement | null>(null);
	let barCenterX = $state<number | null>(null);

	function computeBarPosition() {
		if (isPortrait) { setBoardCenterY(null); return; }
		const canvas = document.querySelector('canvas');
		if (!canvas || !barEl) { barCenterX = null; return; }
		const rect = canvas.getBoundingClientRect();
		if (!rect.width) { barCenterX = null; return; }

		// Horizontal: bar centre tracks the canvas centre
		barCenterX = rect.left + rect.width / 2;

		// Vertical: push board so its bottom is 50px above the bar top.
		// Bar is fixed at CSS bottom:50px; bar top = innerHeight - 50 - barHeight.
		const mainLay  = context.stateLayoutDerived.mainLayout();
		const boardLay = context.stateGameDerived.boardLayout();
		const scale = Math.min(rect.width / mainLay.width, rect.height / mainLay.height);
		const worldCenterScreenY = rect.top + rect.height * 0.5;

		const barHeight         = barEl.offsetHeight;
		const barTopScreen      = window.innerHeight - 50 - barHeight;
		const boardBottomScreen = barTopScreen - 50;

		// Solve: boardBottomScreen = worldCenterScreenY + (boardCenterY + boardH/2 - mainH/2) * scale
		const newBoardY = (boardBottomScreen - worldCenterScreenY) / scale
			- boardLay.height * 0.5 + mainLay.height * 0.5;
		setBoardCenterY(newBoardY);
	}

	$effect(() => {
		context.stateGameDerived.boardLayout();
		isPortrait;
		requestAnimationFrame(computeBarPosition);
	});

	// Recompute over several frames: the PIXI canvas resizes asynchronously after
	// the viewport changes (window resize, F12 device toolbar, zoom), so a single
	// synchronous pass reads a stale canvas rect and strands the bar off-centre.
	function settleBarPosition() {
		computeBarPosition();
		let n = 0;
		const tick = () => { computeBarPosition(); if (++n < 12) requestAnimationFrame(tick); };
		requestAnimationFrame(tick);
	}

	onMount(() => {
		settleBarPosition();
		window.addEventListener('resize', settleBarPosition);
		// ResizeObserver catches viewport changes that don't fire window.resize
		// consistently (DevTools dock/undock, responsive mode toggle).
		const ro = new ResizeObserver(settleBarPosition);
		ro.observe(document.documentElement);
		const canvas = document.querySelector('canvas');
		if (canvas) ro.observe(canvas);
		return () => { window.removeEventListener('resize', settleBarPosition); ro.disconnect(); };
	});

	// bottom lifts above the notification ticker when present (var(--ticker-space)
	// is 42px while it shows, unset otherwise -> 50px).
	const desktopStyle = $derived(
		barCenterX !== null
			? `left:${barCenterX}px; transform:translateX(-50%); bottom:var(--ticker-space, 50px)`
			: `left:50%; transform:translateX(-50%); bottom:var(--ticker-space, 50px)`
	);

	// Buy Bonus " matches ButtonBuyBonus.svelte exactly
	const toggleBuyBonus = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (bonusActive) {
			stateBet.activeBetModeKey = 'BASE';
		} else {
			stateModal.modal = { name: 'buyBonus' };
		}
	};
</script>

<!-- ======================================
     DESKTOP / LANDSCAPE BAR
====================================== -->
{#if !isPortrait}
<div class="bc-bar" bind:this={barEl} style={desktopStyle}>

	<!-- Menu / Close + inline panel -->
	<div class="bc-menu-wrap">
		<button class="bc-btn bc-menu" onclick={menuOpen ? closeMenu : openMenu} title={menuOpen ? 'Close' : 'Menu'}>
			{#if menuOpen}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
					<path d="M18 6L6 18M6 6l12 12"/>
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M4 6l16 0"/><path d="M4 12l16 0"/><path d="M4 18l16 0"/>
				</svg>
			{/if}
		</button>
		{#if menuOpen}
			<nav class="bc-menu-panel" aria-label="Game menu">
				{@render menuRows()}
			</nav>
		{/if}
	</div>

	<!-- Buy Bonus -->
	<button class="bc-btn bc-bonus" class:bc-active={bonusActive} onclick={toggleBuyBonus} title={bonusActive ? 'Disable Bonus' : 'Buy Bonus'} disabled={!isIdle}>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			<path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z"/>
			<path d="M12 8l0 13"/><path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7"/>
			<path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5"/>
			<path d="M16.5 8a2.5 2.5 0 0 0 0 -5a4.8 8 0 0 0 -4.5 5"/>
		</svg>
	</button>

	<!-- Balance -->
	<div class="bc-info">
		<span class="bc-lbl">Balance</span>
		<span class="bc-val">{balance}</span>
	</div>

	<span class="bc-dot"></span>

	<!-- Win -->
	<div class="bc-info">
		<span class="bc-lbl">Win</span>
		<span class="bc-val bcm-win">{win}</span>
	</div>

	<!-- Stake with +/- -->
	<div class="bc-bet-group">
		<div class="bc-info">
			<span class="bc-lbl">Bet</span>
			<span class="bc-val">{bet}</span>
		</div>
		<div class="bc-chevrons">
			<button class="bc-chev" class:bc-hint-up={isIdle && canIncrease} onclick={increaseBet} title="Increase bet">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>
			</button>
			<button class="bc-chev" class:bc-hint-down={isIdle && canDecrease} onclick={decreaseBet} title="Decrease bet">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
			</button>
		</div>
	</div>

	<div class="bc-spacer"></div>

	<!-- Spin button -->
	<button class="bc-spin" onclick={spin} disabled={isIdle ? !canSpin : stopDisabled} title={isIdle ? 'Spin' : 'Stop'}>
		{#if isIdle}
			<svg style={spinIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>
		{:else}
			<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
		{/if}
	</button>

	<div class="bc-spacer"></div>

	<!-- Repeat / Autoplay -->
	<button class="bc-btn bc-repeat" class:bc-active={autoOn} onclick={toggleAutoplay} title="Repeat Bet">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"/>
			<path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"/>
		</svg>
	</button>

	<!-- Turbo (last) -->
	<button class="bc-btn bc-turbo" class:bc-active={turbo} onclick={toggleTurbo} title="Turbo">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			<path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"/>
		</svg>
	</button>

</div>
{/if}

<!-- ======================================
     MOBILE / PORTRAIT (2-row layout)
====================================== -->
{#if isPortrait}
<div class="bcm-wrap" class:bcm-wrap--hidden={bonusModalOpen} aria-hidden={bonusModalOpen}>

	<!-- Row 1: Repeat | ' | SPIN | + | Turbo -->
	<div class="bcm-row1">
		<button class="bcm-ibtn bc-repeat" class:bc-active={autoOn} onclick={toggleAutoplay} title="Repeat Bet">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"/>
				<path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"/>
			</svg>
		</button>

		<button class="bcm-chev" class:bc-hint-down={isIdle && canDecrease} class:bcm-stake-hidden={inFreeSpin} onclick={decreaseBet} title="Decrease bet" disabled={!isIdle}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
		</button>

		<button class="bcm-spin" onclick={spin} disabled={isIdle ? !canSpin : stopDisabled}>
			{#if isIdle}
				<svg style={spinIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
			{/if}
		</button>

		<button class="bcm-chev" class:bc-hint-up={isIdle && canIncrease} class:bcm-stake-hidden={inFreeSpin} onclick={increaseBet} title="Increase bet" disabled={!isIdle}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>
		</button>

		<button class="bcm-ibtn bc-turbo" class:bc-active={turbo} onclick={toggleTurbo} title="Turbo">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"/>
			</svg>
		</button>
	</div>

	<!-- Row 2: Menu | Buy Bonus | Balance | Win | Stake -->
	<div class="bcm-row2">
		<div class="bc-menu-wrap">
			<button class="bcm-btn bc-menu" onclick={menuOpen ? closeMenu : openMenu} title={menuOpen ? 'Close' : 'Menu'}>
				{#if menuOpen}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
						<path d="M18 6L6 18M6 6l12 12"/>
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l16 0"/><path d="M4 12l16 0"/><path d="M4 18l16 0"/></svg>
				{/if}
			</button>
			{#if menuOpen}
				<nav class="bc-menu-panel" aria-label="Game menu">
					{@render menuRows()}
				</nav>
			{/if}
		</div>

		<button class="bcm-btn bcm-bonus bc-bonus" class:bc-active={bonusActive} onclick={toggleBuyBonus} title={bonusActive ? 'Disable Bonus' : 'Buy Bonus'} disabled={!isIdle}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z"/>
				<path d="M12 8l0 13"/><path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7"/>
				<path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5"/>
				<path d="M16.5 8a2.5 2.5 0 0 0 0 -5a4.8 8 0 0 0 -4.5 5"/>
			</svg>
		</button>

		<div class="bcm-info">
			<span class="bcm-lbl">Balance</span>
			<span class="bcm-val">{balance}</span>
		</div>

		<div class="bcm-spacer"></div>

		<div class="bcm-info">
			<span class="bcm-lbl">Win</span>
			<span class="bcm-val bcm-win">{win}</span>
		</div>

		<div class="bcm-spacer"></div>

		{#if inFreeSpin}
			<div class="bcm-fs-counter">
				<span class="bcm-lbl">FREE SPINS</span>
				<span class="bcm-val">{fsCurrentCount} / {fsTotalCount}</span>
			</div>
		{:else}
			<div class="bcm-info">
				<span class="bcm-lbl">Bet</span>
				<span class="bcm-val">{bet}</span>
			</div>
		{/if}
	</div>

</div>
{/if}

<svelte:window onclick={handleWindowClick} />

{#snippet menuRows()}
	<!-- Info -->
	<button class="bc-mrow" onclick={menuOpenInfo}>
		<span class="bc-micon">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="12" r="10"/><path d="M12 8h.01M12 12v4"/>
			</svg>
		</span>
		<span class="bc-mlabel">INFO</span>
	</button>

	<!-- Sound -->
	<button class="bc-mrow" onclick={menuToggleSound}>
		<span class="bc-micon">
			{#if soundOn}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
					<path d="M15 8a5 5 0 0 1 0 8M11 5L6 9H3v6h3l5 4V5z"/>
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
					<path d="M11 5L6 9H3v6h3l5 4V5zM17 9l4 4m0-4l-4 4"/>
				</svg>
			{/if}
		</span>
		<span class="bc-mlabel">SOUND</span>
		<span class="bc-mbadge" class:bc-mbadge--on={soundOn}>{soundOn ? 'ON' : 'OFF'}</span>
	</button>

	<!-- Music -->
	<button class="bc-mrow" onclick={menuToggleMusic}>
		<span class="bc-micon">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
				{#if !musicOn}<path d="M3 3l18 18"/>{/if}
			</svg>
		</span>
		<span class="bc-mlabel">MUSIC</span>
		<span class="bc-mbadge" class:bc-mbadge--on={musicOn}>{musicOn ? 'ON' : 'OFF'}</span>
	</button>

	<!-- Turbo -->
	<button class="bc-mrow" onclick={menuToggleTurbo}>
		<span class="bc-micon">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
				<path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"/>
			</svg>
		</span>
		<span class="bc-mlabel">TURBO</span>
		<span class="bc-mbadge" class:bc-mbadge--on={turbo}>{turbo ? 'ON' : 'OFF'}</span>
	</button>

	<!-- Home -->
	<button class="bc-mrow bc-mrow--home" onclick={menuHome}>
		<span class="bc-micon">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
				<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
			</svg>
		</span>
		<span class="bc-mlabel">HOME</span>
	</button>
{/snippet}

{#if showInfo}
	<InfoModal onclose={() => (showInfo = false)} />
{/if}

<style>
	/* "" CSS variables """""""""""""""""""""""""""""""""""""""""" */
	:global(:root) {
		--bc-accent:       #4ecdc4;
		--bc-secondary:    #f5a524;
		--bc-icon:         #8a8da0;
		--bc-text:         #ffffff;
		--bc-radius:       40px;
		--bc-menu-color:   #8a8da0;
		--bc-bonus-color:  #f5a524;
		--bc-repeat-color: #8a8da0;
		--bc-turbo-color:  #f5a524;
		--bc-spin-fill:    #0c0d16;
	}

	/* "" Desktop bar " always 50px from viewport bottom, centred on canvas "" */
	.bc-bar {
		position: fixed;
		bottom: var(--ticker-space, 50px);
		/* left/transform driven by JS desktopStyle binding */
		width: max-content;
		max-width: min(820px, calc(100vw - 24px));
		display: flex;
		align-items: center;
		gap: 2px;
		background: rgba(0,0,0,0.95);
		border: 1px solid #1c1f2e;
		border-radius: var(--bc-radius);
		padding: 8px 10px;
		box-shadow: 0 10px 48px rgba(0,0,0,.75), inset 0 1px 0 rgba(255,255,255,.04);
		z-index: 100;
		overflow: visible;
		pointer-events: all;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	/* "" Shared icon button """""""""""""""""""""""""""""""""""" */
	.bc-btn {
		flex-shrink: 0;
		width: 44px; height: 44px;
		background: transparent;
		border: none;
		border-radius: 12px;
		color: var(--bc-icon);
		cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		transition: color .15s, background .15s;
		padding: 0;
	}
	.bc-btn:hover { color: #fff; background: rgba(255,255,255,.06); }
	.bc-btn svg { width: 21px; height: 21px; }
	.bc-btn.bc-active { color: var(--bc-accent); }

	/* "" Per-button colours """""""""""""""""""""""""""""""""""" */
	.bc-menu   { color: var(--bc-menu-color); }
	.bc-bonus  { color: var(--bc-bonus-color) !important; }
	.bc-bonus:hover  { filter: brightness(1.3); }
	.bc-bonus.bc-active  { color: #fff !important; }
	.bc-repeat { color: var(--bc-repeat-color); }
	.bc-repeat.bc-active { color: var(--bc-repeat-color); filter: brightness(1.6); }

	/* "" Bonus button attract animation """""""""""""""""""""" */
	@keyframes bc-bonus-attract {
		0%   { transform: scale(1)    translateX(0); }
		8%   { transform: scale(1.18) translateX(0); }
		16%  { transform: scale(1.15) translateX(-5px); }
		24%  { transform: scale(1.15) translateX(5px); }
		32%  { transform: scale(1.15) translateX(-4px); }
		40%  { transform: scale(1.15) translateX(3px); }
		46%  { transform: scale(1.15) translateX(0); }
		56%  { transform: scale(1)    translateX(0); }
		64%  { transform: scale(1.05) translateX(0); }
		72%  { transform: scale(1)    translateX(0); }
		78%  { transform: scale(1.04) translateX(0); }
		84%  { transform: scale(1)    translateX(0); }
		100% { transform: scale(1)    translateX(0); }
	}
	.bc-bonus:not(.bc-active):not(:disabled),
	.bcm-bonus:not(.bc-active):not(:disabled) {
		animation: bc-bonus-attract 6s ease-in-out infinite;
	}
	.bc-bonus:not(.bc-active):not(:disabled):hover,
	.bcm-bonus:not(.bc-active):not(:disabled):hover {
		animation: none;
	}

	/* "" Turbo active underline """""""""""""""""""""""""""""""" */
	.bc-turbo { position: relative; }
	.bc-turbo.bc-active { color: var(--bc-turbo-color); }
	.bc-turbo.bc-active::after {
		content: '';
		position: absolute;
		bottom: -5px; left: 50%; transform: translateX(-50%);
		width: 16px; height: 3px;
		background: var(--bc-turbo-color);
		border-radius: 2px;
	}

	/* "" Dot divider """"""""""""""""""""""""""""""""""""""""""" */
	.bc-dot {
		flex-shrink: 0;
		width: 5px; height: 5px;
		border-radius: 50%;
		background: #1e2235;
		margin: 0 5px;
	}

	/* "" Info block (label + value) """""""""""""""""""""""""""" */
	.bc-info { display: flex; flex-direction: column; padding: 2px 8px; }
	.bc-lbl {
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 1.3px;
		text-transform: uppercase;
		color: var(--bc-accent);
		line-height: 1;
		margin-bottom: 4px;
	}
	.bc-val {
		font-size: 21px;
		font-weight: 700;
		color: var(--bc-text);
		white-space: nowrap;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	/* "" Bet group (value + chevrons) """""""""""""""""""""""""" */
	.bc-bet-group { display: flex; align-items: center; }
	.bc-chevrons { display: flex; flex-direction: column; gap: 2px; margin-left: 4px; }
	.bc-chev {
		width: 34px; height: 20px;
		background: transparent; border: none; border-radius: 6px;
		color: var(--bc-icon);
		cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		padding: 0;
		transition: color .15s, background .15s;
	}
	.bc-chev:hover { color: #fff; background: rgba(255,255,255,.06); }
	.bc-chev svg { width: 14px; height: 14px; }

	/* Subtle stake hint: the up chevron nudges up, the down chevron down, each
	   with a rest, so the player sees the stake can step further. Applied to the
	   inner svg so it never disturbs the button hit-area. Classes are set only
	   while idle and while a further step exists. */
	:global(.bc-hint-up) svg { animation: bc-hint-up 1.8s ease-in-out infinite; }
	:global(.bc-hint-down) svg { animation: bc-hint-down 1.8s ease-in-out infinite; }
	@keyframes bc-hint-up { 0%, 55%, 100% { transform: translateY(0); } 28% { transform: translateY(-2.5px); } }
	@keyframes bc-hint-down { 0%, 55%, 100% { transform: translateY(0); } 28% { transform: translateY(2.5px); } }
	@media (prefers-reduced-motion: reduce) {
		:global(.bc-hint-up) svg, :global(.bc-hint-down) svg { animation: none; }
	}

	/* "" Flexible spacer """"""""""""""""""""""""""""""""""""""" */
	.bc-spacer { flex: 1; min-width: 8px; }

	/* "" Spin button """"""""""""""""""""""""""""""""""""""""""" */
	.bc-spin {
		flex-shrink: 0;
		width: 88px; height: 88px;
		border-radius: 50%;
		background: radial-gradient(circle at 38% 33%, #1a1e2e 0%, #0c0d16 100%);
		border: 2.5px solid var(--bc-accent);
		box-shadow: 0 0 18px rgba(78,205,196,.35), 0 8px 24px rgba(0,0,0,.65);
		color: var(--bc-text);
		cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		transition: transform .12s;
		margin: -22px 6px;
		padding: 0;
		position: relative;
		z-index: 2;
	}
	.bc-spin:active { transform: scale(.93); }
	.bc-spin svg { width: 44px; height: 44px; }
	.bc-spin:disabled { border-color: #555; opacity: .5; cursor: default; box-shadow: none; }

	/* ===========================================================
	   MOBILE / PORTRAIT (2-row layout)
	=========================================================== */
	.bcm-wrap {
		position: fixed;
		bottom: var(--ticker-space, 0px);
		left: 0; right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 100;
		pointer-events: none;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	/* Bonus Buy screen has its own controls — the reel bar just overlaps it on
	   mobile, so it's fully hidden (not just visually) for the duration. It comes
	   straight back the moment bonusModalOpen flips false, i.e. the instant the
	   modal's onclose fires — no separate restore step to forget. */
	.bcm-wrap--hidden {
		display: none;
	}

	/* Row 1 " Repeat | ' | Spin | + | Turbo */
	.bcm-row1 {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 8px 0 10px;
		pointer-events: all;
	}

	.bcm-spin {
		width: 96px; height: 96px;
		border-radius: 50%;
		background: radial-gradient(circle at 38% 33%, #1a1e2e 0%, #0c0d16 100%);
		border: 2.5px solid var(--bc-accent);
		box-shadow: 0 0 18px rgba(78,205,196,.35), 0 8px 24px rgba(0,0,0,.65);
		color: var(--bc-text);
		cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		padding: 0;
		transition: transform .12s;
		flex-shrink: 0;
	}
	.bcm-spin:active { transform: scale(.93); }
	.bcm-spin svg { width: 40px; height: 40px; }
	.bcm-spin:disabled { border-color: #555; opacity: .5; cursor: default; box-shadow: none; }

	/* Icon buttons in mobile row 1 (Repeat + Turbo) */
	.bcm-ibtn {
		width: 40px; height: 40px;
		background: transparent; border: none; border-radius: 12px;
		color: var(--bc-icon);
		cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		padding: 0; flex-shrink: 0;
		transition: color .15s, background .15s;
	}
	.bcm-ibtn:hover { color: #fff; background: rgba(255,255,255,.06); }
	.bcm-ibtn svg { width: 21px; height: 21px; }
	.bcm-ibtn.bc-active { color: var(--bc-accent); }
	.bcm-ibtn.bc-turbo.bc-active { color: var(--bc-turbo-color); }
	.bcm-ibtn.bc-repeat.bc-active { color: var(--bc-repeat-color); filter: brightness(1.6); }

	/* Buy bonus in mobile row 2 */
	.bcm-bonus { color: var(--bc-bonus-color) !important; }
	.bcm-bonus:hover { filter: brightness(1.3); }
	.bcm-bonus.bc-active { color: #fff !important; }

	/* Bet chevrons in row 1 */
	.bcm-chev {
		width: 48px; height: 48px;
		background: transparent; border: none; border-radius: 50%;
		color: #ffffff;
		cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		padding: 0;
		flex-shrink: 0;
		transition: background .15s;
	}
	.bcm-chev:hover { background: rgba(255,255,255,.07); }
	.bcm-chev svg { width: 26px; height: 26px; }

	/* Row 2 " dark pill bar */
	.bcm-row2 {
		display: flex;
		align-items: center;
		gap: 4px;
		background: rgba(0,0,0,0.95);
		border: 1px solid #1c1f2e;
		border-radius: var(--bc-radius);
		box-shadow: 0 10px 48px rgba(0,0,0,.75), inset 0 1px 0 rgba(255,255,255,.04);
		padding: 8px 8px;
		width: min(500px, calc(100vw - 24px));
		margin-bottom: 12px;
		pointer-events: all;
	}

	.bcm-btn {
		flex-shrink: 0;
		width: 40px; height: 40px;
		background: transparent; border: none; border-radius: 10px;
		color: var(--bc-icon);
		cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		padding: 0;
		transition: color .15s, background .15s;
	}
	.bcm-btn:hover { color: #fff; background: rgba(255,255,255,.06); }
	.bcm-btn svg { width: 21px; height: 21px; }
	.bcm-btn.bc-active { color: var(--bc-accent); }

	.bcm-info { display: flex; flex-direction: column; padding: 0 5px; }
	.bcm-lbl {
		font-size: 8px;
		font-weight: 700;
		letter-spacing: 1.2px;
		text-transform: uppercase;
		color: var(--bc-accent);
		line-height: 1;
		margin-bottom: 3px;
	}
	.bcm-val {
		font-size: 17px;
		font-weight: 700;
		color: var(--bc-text);
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}
	.bcm-spacer { flex: 1; min-width: 4px; }
	.bcm-win { color: var(--bc-secondary); }

	/* Free spin counter — replaces stake area on mobile during free spins */
	.bcm-stake-hidden { visibility: hidden; pointer-events: none; }
	.bcm-fs-counter { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; }

	/* Menu button wrapper */
	.bc-menu-wrap { position: relative; flex-shrink: 0; }

	/* Menu panel */
	.bc-menu-panel {
		position: absolute;
		bottom: calc(100% + 10px);
		left: 0;
		z-index: 200;
		min-width: 220px;
		background: linear-gradient(160deg, #111827 0%, #080c18 100%);
		border: 1px solid #1e2a40;
		border-radius: 18px;
		box-shadow: 0 16px 60px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.04);
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	/* Menu rows */
	.bc-mrow {
		display: flex; align-items: center; gap: 16px;
		width: 100%; padding: 14px 18px;
		background: transparent; border: none;
		border-bottom: 1px solid rgba(255,255,255,.06);
		color: #fff; cursor: pointer; text-align: left;
		transition: background .15s;
	}
	.bc-mrow:last-child { border-bottom: none; }
	.bc-mrow:hover  { background: rgba(255,255,255,.05); }
	.bc-mrow:active { background: rgba(255,255,255,.09); }

	.bc-micon {
		flex-shrink: 0; width: 38px; height: 38px;
		border-radius: 50%; border: 1.5px solid rgba(255,255,255,.25);
		display: flex; align-items: center; justify-content: center;
	}
	.bc-micon svg { width: 18px; height: 18px; }

	.bc-mlabel { flex: 1; font-size: 12px; font-weight: 700; letter-spacing: 1.8px; color: #fff; }

	.bc-mbadge {
		flex-shrink: 0; font-size: 9px; font-weight: 700; letter-spacing: 1px;
		color: rgba(255,255,255,.4); padding: 3px 7px;
		border-radius: 20px; border: 1px solid rgba(255,255,255,.15);
	}
	.bc-mbadge--on { color: #4ecdc4; border-color: rgba(78,205,196,.4); }

	.bc-mrow--home .bc-micon { border-color: rgba(245,165,36,.5); color: #f5a524; }
	.bc-mrow--home .bc-mlabel { color: #f5a524; }


</style>
