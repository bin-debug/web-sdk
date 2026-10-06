<script lang="ts">
	import { onMount } from 'svelte';
	import { api, streamJob, launchUrl, phoneHost, type AppState } from '$lib/api';

	let { app, gameId, refresh }: { app: AppState; gameId: string; refresh: () => Promise<void> | void } = $props();

	const DEVICES = {
		desktop: { w: 1600, h: 900, label: 'Desktop 1600×900', device: 'desktop' as const },
		tablet: { w: 768, h: 1024, label: 'Tablet 768×1024', device: 'desktop' as const },
		phone: { w: 375, h: 812, label: 'Phone 375×812', device: 'mobile' as const },
	};
	type DeviceKey = keyof typeof DEVICES;

	const game = $derived(app.games.find((g) => g.id === gameId));
	let building = $state(false);
	let lines = $state<string[]>([]);
	let buildOk = $state<boolean | null>(null);
	let device = $state<DeviceKey>('desktop');
	let session = $state(`b${Date.now().toString(36)}`);
	let scenarios = $state<{ id: string; title: string; hint?: string; disabled?: string | null }[]>([]);
	let note = $state('');
	let copied = $state('');
	let stage: HTMLDivElement | undefined = $state();
	let stageW = $state(900);
	let logEl: HTMLPreElement | undefined = $state();

	const loadScenarios = async () => (scenarios = (await api(`/api/games/${gameId}/scenarios`)).scenarios);
	onMount(() => {
		loadScenarios();
		const ro = new ResizeObserver(() => stage && (stageW = stage.clientWidth));
		if (stage) ro.observe(stage);
		return () => ro.disconnect();
	});

	const build = async () => {
		building = true;
		buildOk = null;
		lines = [];
		note = '';
		try {
			const { job } = await api(`/api/games/${gameId}/build`, { method: 'POST' });
			const r = await streamJob(job, (l) => {
				lines.push(l);
				queueMicrotask(() => logEl && (logEl.scrollTop = logEl.scrollHeight));
			});
			buildOk = r.ok;
			session = `b${Date.now().toString(36)}`;
			await refresh();
			await loadScenarios();
		} catch (e: any) {
			lines.push(`FAILED: ${e.message}`);
			buildOk = false;
		} finally {
			building = false;
		}
	};

	const queue = async (id: string) => {
		note = '';
		try {
			const r = await api(`/api/games/${gameId}/scenario`, { json: { scenario: id } });
			note = `Queued ${r.mode} book ${r.ids.join(', ')}. ${id === 'bonus2' || id === 'bonus3' ? 'Press BUY BONUS in the game and buy this bonus.' : 'Press spin in the game.'}`;
		} catch (e: any) {
			note = e.message;
		}
	};
	const reset = async () => {
		await api(`/api/games/${gameId}/reset`, { method: 'POST' });
		session = `b${Date.now().toString(36)}`;
		note = 'Queues cleared and wallets reset; the game reloaded with a new session.';
	};

	const dev = $derived(DEVICES[device]);
	const scale = $derived(Math.min(1, (stageW - 2) / dev.w));
	const hostNow = typeof location === 'undefined' ? 'localhost' : location.hostname;
	const frameUrl = $derived(game?.port ? launchUrl(hostNow, game.port, gameId, dev.device, session) : '');
	const copyPhone = async () => {
		if (!game?.port) return;
		const url = launchUrl(phoneHost(app), game.port, gameId, 'mobile', 'phone-1');
		try {
			await navigator.clipboard.writeText(url);
			copied = 'Phone link copied';
		} catch {
			prompt('Phone link', url);
		}
	};
</script>

<div class="wrap">
	<div class="row top">
		<button class="primary" disabled={building} onclick={build}>{building ? 'Building…' : 'Build & Play'}</button>
		<span class="dim">
			{#if building}spec check, books, demo RGS, shell server{:else if buildOk === false}<span class="err">Build failed, see the log</span>
			{:else if game?.running}<span class="ok">Running on port {game.port}</span>{:else}Not running. Press Build & Play.{/if}
		</span>
		{#if game && !game.shellVerified}<span class="warn">This shell is not verified yet.</span>{/if}
		<span class="grow"></span>
		{#if copied}<span class="ok">{copied}</span>{/if}
		<button disabled={!game?.running} onclick={copyPhone}>Copy phone link</button>
		{#if game?.running}<a class="btn" href={frameUrl} target="_blank" rel="noreferrer">Open in new tab</a>{/if}
	</div>

	{#if lines.length}<pre class="log" bind:this={logEl}>{lines.join('\n')}</pre>{/if}

	<h3>Scenarios</h3>
	<p class="dim small">Queues a synthetic demo book for the next spin (visual tests only, not maths).</p>
	<div class="list scen">
		{#each scenarios as s}
			<div class="srow" class:off={!!s.disabled}>
				<button disabled={!!s.disabled || !game?.running} onclick={() => queue(s.id)}>{s.title}</button>
				<span class="dim small grow">{s.disabled ?? s.hint ?? ''}</span>
			</div>
		{/each}
		<div class="srow"><button onclick={reset} disabled={!game?.running}>Reset queues and wallets</button><span class="dim small grow">reloads the game with a new session</span></div>
	</div>
	{#if note}<p class="note">{note}</p>{/if}

	<div class="row devs">
		<h3 class="grow">Play</h3>
		{#each Object.entries(DEVICES) as [k, d]}
			<button class:on={device === k} onclick={() => (device = k as DeviceKey)}>{d.label}</button>
		{/each}
		<button onclick={() => (session = `b${Date.now().toString(36)}`)} disabled={!game?.running}>Reload</button>
	</div>
	<div class="stage" bind:this={stage}>
		{#if game?.running}
			<div class="frame" style:width="{dev.w * scale}px" style:height="{dev.h * scale}px">
				<iframe title="game" src={frameUrl} style:width="{dev.w}px" style:height="{dev.h}px" style:transform="scale({scale})" allow="autoplay; fullscreen"></iframe>
			</div>
		{:else}
			<p class="dim pad">The game is not running.</p>
		{/if}
	</div>
</div>

<style>
	.wrap { padding: 12px 16px 40px; max-width: 1700px; margin: 0 auto; }
	.top { flex-wrap: wrap; padding-bottom: 10px; }
	.btn { border: 1px solid var(--line); border-radius: 4px; padding: 6px 12px; color: var(--text); text-decoration: none; }
	h3 { margin: 16px 0 6px; }
	.small { font-size: 12px; margin: 0 0 6px; }
	.srow { display: flex; align-items: center; gap: 12px; padding: 6px 0; }
	.srow.off { opacity: 0.55; }
	.srow button { min-width: 190px; text-align: left; }
	.note { color: var(--accent); margin: 8px 0 0; }
	.devs { flex-wrap: wrap; margin-top: 8px; }
	.devs button.on { border-color: var(--accent); color: var(--accent); }
	.stage { margin-top: 8px; border: 1px solid var(--line); background: #0c0d10; display: flex; justify-content: center; width: 100%; }
	.frame { position: relative; overflow: hidden; }
	iframe { border: 0; transform-origin: 0 0; background: #000; display: block; }
	.pad { padding: 40px; }
</style>
