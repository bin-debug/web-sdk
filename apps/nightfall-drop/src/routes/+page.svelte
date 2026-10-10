<script lang="ts">
	import { tick } from 'svelte';

	type Phase = 'settled' | 'falling' | 'winning' | 'empty';
	type MascotMood = 'idle' | 'watch' | 'celebrate';
	type Cell = { id: number; symbol: number; phase: Phase; drop: number; value?: string };

	const symbols = Array.from({ length: 9 }, (_, index) => index);
	const bets = [0.1, 0.2, 0.4, 0.6, 1, 1.5, 2, 3, 5, 10, 20, 50, 100];
	const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	const money = (amount: number) => amount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

	let intro = $state(true);
	let overlay = $state<'menu' | 'info' | 'bonus' | null>(null);
	let board = $state<Cell[]>(makeOpeningBoard());
	let reelSettled = $state([true, true, true, true, true]);
	let betIndex = $state(6);
	let balance = $state(5000);
	let win = $state(0);
	let spinning = $state(false);
	let spinCount = $state(0);
	let autoplay = $state(false);
	let turbo = $state(false);
	let superTurbo = $state(false);
	let sound = $state(true);
	let music = $state(true);
	let mascotMood = $state<MascotMood>('idle');
	let message = $state('');
	const clock = '19:50';

	const bet = $derived(bets[betIndex]);

	function makeOpeningBoard(): Cell[] {
		return Array.from({ length: 25 }, (_, id) => ({
			id, symbol: (id * 5 + Math.floor(id / 5) * 3) % symbols.length,
			phase: 'settled', drop: Math.floor(id / 5) + 1,
		}));
	}

	function randomBoard(): Cell[] {
		return Array.from({ length: 25 }, (_, id) => {
			const special = Math.random();
			const symbol = special > 0.965 ? 11 : special > 0.91 ? 10 : Math.floor(Math.random() * symbols.length);
			return { id, symbol, phase: 'falling', drop: 6 + Math.floor(id / 5), value: symbol === 10 ? `×${1 + Math.floor(Math.random() * 9)}` : undefined };
		});
	}

	function changeBet(direction: number) {
		if (!spinning) betIndex = Math.min(bets.length - 1, Math.max(0, betIndex + direction));
	}

	async function spin() {
		if (spinning || overlay || balance < bet) return;
		spinning = true;
		spinCount += 1;
		balance = Number((balance - bet).toFixed(2));
		win = 0; message = ''; mascotMood = 'watch';
		reelSettled = [false, false, false, false, false];
		const next = randomBoard();
		// Visual demonstration only: every second spin shows the full win/cascade sequence.
		const winningIds = spinCount % 2 === 0 ? [0, 4, 7, 11, 18, 23] : [];
		if (winningIds.length) {
			const winningSymbol = Math.floor(Math.random() * 6);
			for (const id of winningIds) next[id] = { ...next[id], symbol: winningSymbol };
		}
		board = next;
		await tick();
		const settleDelay = superTurbo ? 18 : turbo ? 38 : 72;
		await pause(superTurbo ? 24 : turbo ? 55 : 115);
		for (let reel = 0; reel < 5; reel += 1) {
			reelSettled = reelSettled.map((settled, index) => settled || index === reel);
			board = board.map((cell) => cell.id % 5 === reel ? { ...cell, phase: 'settled' } : cell);
			await pause(settleDelay);
		}
		if (winningIds.length) {
			board = board.map((cell) => winningIds.includes(cell.id) ? { ...cell, phase: 'winning' } : cell);
			const amount = Number((bet * 2.4).toFixed(2));
			win = amount; message = `WIN  €${money(amount)}`; mascotMood = 'celebrate';
			await pause(superTurbo ? 90 : turbo ? 180 : 430);
			board = board.map((cell) => winningIds.includes(cell.id) ? { ...cell, phase: 'empty' } : cell);
			await pause(superTurbo ? 34 : turbo ? 70 : 150);
			board = board.map((cell) => winningIds.includes(cell.id)
				? { ...cell, symbol: Math.floor(Math.random() * symbols.length), phase: 'falling', drop: 7 + Math.floor(cell.id / 5) }
				: cell);
			await tick();
			await pause(superTurbo ? 50 : turbo ? 100 : 240);
			board = board.map((cell) => ({ ...cell, phase: 'settled' }));
			balance = Number((balance + amount).toFixed(2));
			await pause(superTurbo ? 35 : turbo ? 70 : 180);
		}
		mascotMood = 'idle'; spinning = false;
		if (autoplay) setTimeout(spin, superTurbo ? 55 : turbo ? 120 : 420);
	}

	function toggleAutoplay() {
		autoplay = !autoplay;
		if (autoplay && !spinning) spin();
	}
</script>

<svelte:head><title>Nightfall Drop — Front-end Prototype</title><meta name="theme-color" content="#080b13" /></svelte:head>

<main class="game">
	<div class="viewport">
		<div class="grain"></div>
		<div class="game-id"><b>{clock}</b><span>|</span><b>Nightfall Drop</b></div>
		<div class="corner-mark">N</div>
		<div class="logo" aria-label="Nightfall Drop"><span>NIGHTFALL</span><strong>DROP</strong><small>™</small></div>

		<div class:watch={mascotMood === 'watch'} class:celebrate={mascotMood === 'celebrate'} class="mascot-wrap">
			<div class="mascot-shadow"></div><img src="/art/lumen-raccoon.png" alt="Lumen the raccoon magician" />
		</div>

		<section class="reel-frame" aria-label="Five by five game grid">
			<div class="frame-notch left"></div><div class="frame-notch right"></div>
			<div class="board" class:in-motion={spinning}>
				{#each board as cell (cell.id)}
					<div class="cell reel-{cell.id % 5} {cell.phase}" class:reel-active={!reelSettled[cell.id % 5]} style={`--fall:${cell.drop};--row:${Math.floor(cell.id / 5)}`}>
						<i class="symbol" style={`--x:${cell.symbol % 4};--y:${Math.floor(cell.symbol / 4)}`}></i>
						{#if cell.value}<em>{cell.value}</em>{/if}
					</div>
				{/each}
			</div>
			{#if message}<div class="win-banner">{message}</div>{/if}
		</section>

		<section class="control-deck" aria-label="Game controls">
			<div class="feature-label">FEATURE DROPS™ ACTIVATED</div>
			<button class="bonus-button" aria-label="Buy bonus" onclick={() => (overlay = 'bonus')}><span>BUY</span><b>BONUS</b></button>
			<button class="burger" aria-label="Menu" onclick={() => (overlay = overlay === 'menu' ? null : 'menu')}><i></i><i></i><i></i></button>
			<div class="readouts"><div><span>DEMO BALANCE</span><b>€{money(balance)}</b></div><div><span>WIN</span><b>€{money(win)}</b></div></div>
			<div class="bet-readout"><span>DEMO BET</span><b>€{money(bet)}</b></div>
			<div class="bet-arrows"><button aria-label="Increase bet" onclick={() => changeBet(1)}>⌃</button><button aria-label="Decrease bet" onclick={() => changeBet(-1)}>⌄</button></div>
			<button class:spinning class="spin-button" aria-label="Spin" onclick={spin}><i></i></button>
			<button class:active={autoplay} class="autoplay" aria-label="Autoplay" onclick={toggleAutoplay}>↻<small>▶</small></button>
		</section>

		{#if intro}
			<button class="intro" onclick={() => (intro = false)} aria-label="Continue to game">
				<div class="intro-title">NIGHTFALL <b>DROP</b></div>
				<div class="feature-cards">
					<article><span class="feature-icon">6+</span><h2>SCATTER WINS</h2><p>Six or more matching symbols win anywhere on the 5 × 5 grid.</p></article>
					<article><span class="feature-icon cascade">↓</span><h2>GRAVITY DROPS</h2><p>Winning symbols clear and fresh symbols tumble into the empty spaces.</p></article>
					<article><span class="feature-icon lantern">✦</span><h2>LANTERN ENCORES</h2><p>Special bottom symbols reveal reel-wide values and free-drop features.</p></article>
				</div>
				<strong class="continue">CLICK TO CONTINUE</strong>
			</button>
		{/if}

		{#if overlay === 'menu'}
			<section class="menu-panel" role="dialog" aria-label="Game menu">
				<button class:enabled={sound} onclick={() => (sound = !sound)}><i>◉</i><span>SOUND</span></button>
				<button class:enabled={music} onclick={() => (music = !music)}><i>♫</i><span>MUSIC</span></button>
				<button class:enabled={superTurbo} onclick={() => (superTurbo = !superTurbo)}><i>◈</i><span>SUPER TURBO™</span></button>
				<button class:enabled={turbo} onclick={() => (turbo = !turbo)}><i>✣</i><span>TURBO</span></button>
				<button onclick={() => (overlay = 'info')}><i>ⓘ</i><span>INFO</span></button>
				<button onclick={() => (intro = true, overlay = null)}><i>⌂</i><span>HOME</span></button>
			</section>
		{:else if overlay === 'info'}
			<div class="shade"><section class="info-panel" role="dialog" aria-modal="true" aria-label="Game information">
				<button class="panel-close" onclick={() => (overlay = null)}>×</button><h2>HOW TO PLAY</h2>
				<h3>5 × 5 SCATTER GRID</h3><p>Wins form when six or more matching symbols are visible anywhere. There are no paylines.</p>
				<h3>GRAVITY CASCADES</h3><p>Winning symbols pulse, disappear, and new symbols fall vertically into the board. Cascades continue from the same visual round.</p>
				<h3>BOTTOM-ROW SPECIALS</h3><p>Lantern symbols that reach the bottom row expand upward and reveal reel-wide coin, multiplier, or free-drop presentations.</p>
				<h3>FREE-DROP MODES</h3><p>Stash mode grows a multiplier above each reel. Collector mode stores coin values above the reels for the duration of the feature.</p>
				<p class="prototype-note">This build demonstrates the complete front-end presentation only. Outcomes and displayed values are placeholders until certified maths is connected.</p>
			</section></div>
		{:else if overlay === 'bonus'}
			<div class="shade"><section class="bonus-panel" role="dialog" aria-modal="true" aria-label="Feature selection">
				<button class="panel-close" onclick={() => (overlay = null)}>×</button><h2>SELECT A FEATURE</h2>
				<div class="bonus-grid">
					<article><span>3×</span><h3>BONUS HUNT</h3><p>More chances to land feature symbols.</p><button onclick={() => (overlay = null)}>SELECT</button></article>
					<article><span>50×</span><h3>LANTERN SPINS</h3><p>Enhanced bottom-row special action.</p><button onclick={() => (overlay = null)}>SELECT</button></article>
					<article><span>80×</span><h3>STASH MODE</h3><p>Reel multipliers grow through the feature.</p><button onclick={() => (overlay = null)}>BUY</button></article>
					<article><span>200×</span><h3>COIN CRAZE</h3><p>Collectors store expanded coin values.</p><button onclick={() => (overlay = null)}>BUY</button></article>
				</div>
			</section></div>
		{/if}
	</div>
</main>

<style>
	:global(*) { box-sizing: border-box; }
	:global(html, body) { margin: 0; min-width: 320px; min-height: 100%; overflow: hidden; background: #05070b; color: #fff; font-family: Arial, Helvetica, sans-serif; }
	:global(button) { font: inherit; }
	.game { width: 100vw; min-height: 100svh; display: grid; place-items: center; overflow: hidden; background: #05070b; }
	.viewport { position: relative; width: min(100vw, 177.7778svh); aspect-ratio: 16 / 9; max-height: 100svh; overflow: hidden; isolation: isolate; background: #121522 url('/art/nightfall-stage.png') center / cover no-repeat; box-shadow: 0 0 80px #000; }
	.viewport::before { content: ''; position: absolute; inset: 0; z-index: -1; background: radial-gradient(circle at 57% 49%, transparent 0 22%, #06091270 61%, #03050ad9 100%), repeating-conic-gradient(from 4deg at 58% 51%, #ffffff08 0 12deg, transparent 12deg 28deg); }
	.grain { position: absolute; inset: 0; pointer-events: none; opacity: .28; mix-blend-mode: overlay; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.34'/%3E%3C/svg%3E"); }
	.game-id { position: absolute; top: 1.5%; left: 1.4%; display: flex; gap: .55em; align-items: center; color: #ddd9cc; font-size: clamp(7px, .72vw, 13px); text-shadow: 0 1px #000; }
	.corner-mark { position: absolute; top: 1.2%; right: 1.4%; font: 1000 clamp(13px, 1.65vw, 28px)/1 Georgia, serif; color: #080a0d; text-shadow: 1px 0 #cbb170, -1px 0 #cbb170; }
	.logo { position: absolute; z-index: 2; top: 5.5%; left: 4%; width: 29%; transform: rotate(-5deg); filter: drop-shadow(.3vw .65vw 0 #05070c); font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; letter-spacing: -.06em; line-height: .72; text-align: center; color: #f7efe0; -webkit-text-stroke: .12vw #101824; }
	.logo span, .logo strong { display: block; }.logo span { font-size: clamp(26px, 4.1vw, 72px); }.logo strong { margin-left: 8%; font-size: clamp(39px, 6.4vw, 112px); color: #9de9e1; }.logo small { position: absolute; top: 3%; right: 4%; font-size: 1.2vw; color: #f1c85e; }
	.mascot-wrap { position: absolute; z-index: 3; left: 4.2%; bottom: 5.2%; width: 30.5%; height: 64%; transform-origin: 55% 92%; animation: mascot-idle 3.2s ease-in-out infinite; }
	.mascot-wrap img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(.8vw 1.1vw .45vw #000a); }
	.mascot-shadow { position: absolute; width: 58%; height: 8%; left: 22%; bottom: 1%; border-radius: 50%; background: #0009; filter: blur(.7vw); }
	.mascot-wrap.watch { animation: mascot-watch .2s ease-in-out infinite alternate; }.mascot-wrap.celebrate { animation: mascot-celebrate .38s ease-in-out 3; }
	.reel-frame { position: absolute; z-index: 2; left: 39.4%; top: 11.2%; width: 42.1%; aspect-ratio: 1.02; padding: .7%; background: linear-gradient(110deg, #cab46e, #2e3d43 8%, #121a1d 52%, #8c824e 93%, #eef0d3); clip-path: polygon(3% 0,97% 0,100% 4%,100% 96%,97% 100%,3% 100%,0 96%,0 4%); filter: drop-shadow(0 1vw .8vw #000a); }
	.reel-frame::before { content: ''; position: absolute; inset: 1.35%; background: #191d21; clip-path: inherit; }
	.frame-notch { position: absolute; z-index: -1; top: 8%; width: 7%; height: 84%; background: #242c31; }.frame-notch.left { left: -4%; clip-path: polygon(100% 0,100% 100%,28% 93%,55% 82%,10% 72%,46% 58%,3% 45%,55% 31%,21% 15%); }.frame-notch.right { right: -4%; clip-path: polygon(0 0,0 100%,72% 93%,45% 82%,90% 72%,54% 58%,97% 45%,45% 31%,79% 15%); }
	.board { position: absolute; inset: 2.2%; display: grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr); gap: 1.15%; padding: .45%; overflow: hidden; background: #202427; }
	.cell { position: relative; overflow: hidden; display: grid; place-items: center; min-width: 0; background: radial-gradient(circle at 44% 36%, #34383b, #181b1d 75%); box-shadow: inset 0 0 1vw #0005; }
	.cell::after { content: ''; position: absolute; inset: 0; pointer-events: none; border: 1px solid #ffffff05; }
	.symbol { display: block; width: 92%; height: 92%; background: url('/art/nightfall-symbols.png') no-repeat; background-size: 400% 300%; background-position: calc(var(--x) * 33.333%) calc(var(--y) * 50%); filter: drop-shadow(.12vw .2vw .08vw #000c); }
	.cell em { position: absolute; right: 5%; bottom: 3%; color: #fff0a0; font-weight: 1000; font-size: clamp(7px, 1vw, 17px); text-shadow: 1px 2px #000; }
	.cell.reel-active { animation: reel-stream .095s linear infinite; filter: blur(.08vw) brightness(.8); }.cell.falling:not(.reel-active) { animation: gravity-land .26s cubic-bezier(.16,.72,.19,1.25) both; }.cell.winning { z-index: 2; animation: win-pop .25s ease-in-out infinite alternate; box-shadow: inset 0 0 2vw #e8b640, 0 0 1vw #fff1a0; }.cell.empty .symbol { animation: clear-symbol .16s ease-in both; }.cell.empty { background: #101214; }
	.win-banner { position: absolute; z-index: 5; left: 23%; right: 23%; top: 43%; padding: 2.2% 1%; border: .12vw solid #ddc272; background: #080a0eea; color: #fff4be; text-align: center; font: 1000 clamp(12px, 1.55vw, 26px)/1 Impact, sans-serif; letter-spacing: .08em; transform: rotate(-2deg); box-shadow: 0 .55vw 1vw #000b; }
	.control-deck { position: absolute; z-index: 4; left: 25%; bottom: 2.4%; width: 59.7%; height: 11.8%; display: grid; grid-template-columns: 8.5% 45% 14% 5.4% 13% 9%; align-items: stretch; background: linear-gradient(#17191d, #07080a); box-shadow: 0 .65vw 1.1vw #000b, inset 0 1px #ffffff12; }
	.feature-label { position: absolute; left: -8.2%; bottom: 103%; color: #d6b95f; font-size: clamp(5px, .55vw, 10px); font-weight: 1000; white-space: nowrap; letter-spacing: .05em; }
	.bonus-button { position: absolute; z-index: 2; left: -11.6%; bottom: -4%; width: 10.2%; aspect-ratio: 1; border: .16vw solid #18191b; border-radius: 50%; background: linear-gradient(135deg, #fff3a4, #d39a1e 68%); color: #111216; transform: rotate(-10deg); box-shadow: 0 .25vw 0 #000, inset 0 0 0 .12vw #f5d266; cursor: pointer; font: 1000 clamp(6px, .7vw, 12px)/.95 Arial; }.bonus-button span,.bonus-button b { display: block; }
	.burger { border: 0; border-right: 1px solid #292c31; background: #111317; cursor: pointer; display: grid; place-content: center; gap: 10%; }.burger i { width: clamp(15px, 1.8vw, 30px); height: clamp(2px, .24vw, 4px); background: #f0eee5; border-radius: 1px; }
	.readouts { display: grid; grid-template-columns: 1.4fr 1fr; align-items: center; gap: 6%; padding: 0 7%; }.readouts span,.bet-readout span { display: block; color: #ddd; font-size: clamp(5px, .57vw, 10px); font-weight: 800; }.readouts b,.bet-readout b { display: block; margin-top: 3%; font-size: clamp(10px, 1.25vw, 22px); white-space: nowrap; }
	.bet-readout { display: grid; align-content: center; padding-left: 11%; background: #17191d; }.bet-arrows { display: grid; grid-template-rows: 1fr 1fr; }.bet-arrows button { border: 0; border-left: 1px solid #292c31; background: #1e2025; color: #f7f5eb; cursor: pointer; font-size: clamp(10px, 1.45vw, 25px); font-weight: 1000; line-height: .7; }
	.spin-button { align-self: center; justify-self: center; width: 112%; aspect-ratio: 1; z-index: 2; border: .42vw solid #15171a; border-radius: 50%; background: #e7e6df; cursor: pointer; box-shadow: 0 .25vw 0 #000, inset 0 0 0 .18vw #777; }.spin-button i { display: block; width: 62%; height: 62%; margin: auto; border: .42vw solid #22272d; border-right-color: transparent; border-radius: 50%; position: relative; }.spin-button i::after { content: ''; position: absolute; right: -18%; top: 3%; width: 28%; height: 28%; background: #22272d; clip-path: polygon(0 0,100% 50%,0 100%); }.spin-button.spinning i { animation: rotate .42s linear infinite; }
	.autoplay { border: 0; border-left: 1px solid #292c31; background: #17191d; color: #f3f0e6; cursor: pointer; font-size: clamp(17px, 2.05vw, 36px); font-weight: 900; }.autoplay small { font-size: .35em; vertical-align: 25%; }.autoplay.active { color: #f4d560; background: #27230f; }
	.intro { position: absolute; inset: 0; z-index: 20; border: 0; cursor: pointer; color: #f9f4e8; background: linear-gradient(#05070ae8, #11131be8), url('/art/nightfall-stage.png') center / cover; text-align: center; }.intro-title { margin: 5.5% auto 3.2%; transform: rotate(-3deg); color: #f4eada; font: 1000 clamp(25px, 4.6vw, 82px)/.8 Impact, sans-serif; text-shadow: .25vw .45vw #000; }.intro-title b { color: #8ce5df; }.feature-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.1%; width: 76%; margin: auto; }.feature-cards article { position: relative; min-height: 24vw; max-height: 43svh; padding: 5% 7%; border: .18vw solid #b9a05c; background: linear-gradient(155deg, #252936ed, #080b11ed); box-shadow: 0 1vw 2vw #000a; }.feature-icon { display: grid; place-items: center; width: 48%; aspect-ratio: 1; margin: 5% auto 8%; border: .28vw solid #e6cb76; border-radius: 50%; color: #9ce7df; background: #0d1922; font: 1000 clamp(24px, 4.5vw, 80px)/1 Impact, sans-serif; }.feature-icon.cascade { color: #f3e7bd; }.feature-icon.lantern { color: #f1bc47; }.feature-cards h2 { margin: 0 0 6%; color: #f1d877; font: 1000 clamp(10px, 1.35vw, 24px)/1 Impact, sans-serif; letter-spacing: .05em; }.feature-cards p { margin: 0; color: #d3d4d5; font-size: clamp(7px, .82vw, 14px); line-height: 1.35; }.continue { display: block; margin-top: 3%; font-size: clamp(8px, .9vw, 16px); letter-spacing: .15em; animation: blink 1.15s ease-in-out infinite; }
	.shade { position: absolute; inset: 0; z-index: 30; display: grid; place-items: center; padding: 4%; background: #020305e8; backdrop-filter: blur(3px); }.info-panel,.bonus-panel { position: relative; border: .15vw solid #bda85f; background: linear-gradient(145deg, #20242c, #080a0f); box-shadow: 0 1.5vw 4vw #000; }.panel-close { position: absolute; z-index: 2; top: 2%; right: 2%; width: 7%; aspect-ratio: 1; border: 0; color: #fff; background: transparent; cursor: pointer; font-size: clamp(20px, 2.4vw, 42px); }.menu-panel { position: absolute; z-index: 30; left: 25%; bottom: 14.2%; width: 15.7%; padding: .55% 0; border: 0; background: #08090bea; box-shadow: 0 .7vw 1.5vw #0009; }.info-panel h2,.bonus-panel h2 { margin: 0 0 6%; color: #f0d36e; text-align: center; font: 1000 clamp(16px, 2.2vw, 38px)/1 Impact, sans-serif; letter-spacing: .09em; }.menu-panel > button { width: 100%; min-height: clamp(33px, 4.5vw, 80px); display: flex; align-items: center; gap: 9%; padding: 0 12%; border: 0; background: transparent; color: #f0f0ec; cursor: pointer; font-size: clamp(7px, .75vw, 14px); font-weight: 1000; text-align: left; }.menu-panel > button:hover { background: #ffffff0b; }.menu-panel > button i { width: 1.4em; color: #aaa; font: 900 1.35em/1 Arial; text-align: center; }.menu-panel > button.enabled i { color: #f4d052; }
	.info-panel { width: 50%; max-height: 83%; overflow-y: auto; padding: 3.5% 4.2%; }.info-panel h2 { margin-bottom: 4%; }.info-panel h3 { margin: 4% 0 1%; color: #8fe0db; font-size: clamp(8px, .88vw, 16px); }.info-panel p { margin: 0; color: #d1d1cd; font-size: clamp(7px, .78vw, 14px); line-height: 1.45; }.prototype-note { margin-top: 5% !important; padding-top: 3%; border-top: 1px solid #4b4a40; color: #9fa3a3 !important; }
	.bonus-panel { width: 72%; padding: 3.5% 3.8%; }.bonus-panel h2 { margin-bottom: 3%; }.bonus-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.6%; }.bonus-grid article { min-height: 24vw; padding: 8% 7%; display: flex; flex-direction: column; align-items: center; text-align: center; border: .12vw solid #5e5b4b; background: radial-gradient(circle at 50% 20%, #293743, #111319 65%); }.bonus-grid article > span { display: grid; place-items: center; width: 58%; aspect-ratio: 1; border: .18vw solid #e3c55e; border-radius: 50%; color: #f8e594; background: #0b1017; font: 1000 clamp(12px, 1.75vw, 31px)/1 Impact, sans-serif; }.bonus-grid h3 { margin: 10% 0 3%; color: #8fe2dd; font-size: clamp(8px, 1vw, 18px); }.bonus-grid p { flex: 1; margin: 0; color: #c9cbcb; font-size: clamp(6px, .7vw, 12px); line-height: 1.35; }.bonus-grid button { width: 100%; margin-top: 8%; padding: 6%; border: 0; color: #111; background: #e0c25e; cursor: pointer; font-weight: 1000; font-size: clamp(7px, .75vw, 13px); }
	@keyframes reel-stream { from { transform: translateY(-16%); } to { transform: translateY(16%); } }
	@keyframes gravity-land { 0% { opacity: 0; transform: translateY(calc(var(--fall) * -115%)); } 78% { opacity: 1; transform: translateY(6%); } 100% { opacity: 1; transform: translateY(0); } }
	@keyframes win-pop { to { transform: scale(.87); filter: brightness(1.45); } }
	@keyframes clear-symbol { to { opacity: 0; transform: scale(.15) rotate(15deg); filter: brightness(2); } }
	@keyframes rotate { to { transform: rotate(1turn); } }
	@keyframes mascot-idle { 50% { transform: translateY(-1.2%) rotate(-.6deg); } }
	@keyframes mascot-watch { to { transform: translateY(-1%) rotate(1.2deg) scale(1.01); } }
	@keyframes mascot-celebrate { 50% { transform: translateY(-5%) rotate(-2deg) scale(1.03); } }
	@keyframes blink { 50% { opacity: .38; } }
	@media (max-aspect-ratio: 11 / 10) {
		.viewport { width: 100vw; height: 100svh; max-height: none; aspect-ratio: auto; background-position: 55% center; }
		.game-id { top: 1%; }.logo { top: 3.5%; left: 4%; width: 44%; }.logo span { font-size: 7vw; }.logo strong { font-size: 10.6vw; }.mascot-wrap { left: -7%; bottom: 8%; width: 42%; height: 48%; opacity: .82; }.reel-frame { top: 18%; left: 10%; width: 80%; }.control-deck { left: 7%; bottom: 3%; width: 89%; height: 9%; grid-template-columns: 10% 39% 17% 6% 15% 11%; }.bonus-button { left: -4%; bottom: 108%; width: 12%; }.feature-label { display: none; }.readouts { padding-left: 8%; }.readouts b,.bet-readout b { font-size: 2.5vw; }.readouts span,.bet-readout span { font-size: 1.2vw; }.feature-cards { width: 92%; gap: 1.2%; }.feature-cards article { min-height: 42vw; }.menu-panel { left: 7%; bottom: 12.2%; width: 26%; }.info-panel { width: 88%; }.bonus-panel { width: 92%; }.bonus-grid { grid-template-columns: repeat(2, 1fr); }.bonus-grid article { min-height: 31vw; }.intro-title { margin-top: 14%; }.continue { margin-top: 7%; }
	}
</style>
