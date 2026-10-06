<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { api, type AppState } from '$lib/api';
	import GameList from '$lib/GameList.svelte';
	import GameForm from '$lib/GameForm.svelte';
	import PlayPanel from '$lib/PlayPanel.svelte';
	import ArtPanel from '$lib/ArtPanel.svelte';
	import ExportPanel from '$lib/ExportPanel.svelte';

	let app = $state<AppState | null>(null);
	let down = $state(false);
	// view lives in the address bar: ?view=list|edit|game&game=<id>&tab=play|art|export
	let view = $state<'list' | 'edit' | 'game'>('list');
	let gameId = $state('');
	let tab = $state<'play' | 'art' | 'export'>('play');

	const sync = () => {
		const p = new URLSearchParams(location.search);
		view = (p.get('view') as typeof view) || 'list';
		gameId = p.get('game') ?? '';
		tab = (p.get('tab') as typeof tab) || 'play';
	};
	const go = (v: typeof view, id = '', t: typeof tab = 'play') => {
		const q = new URLSearchParams();
		q.set('view', v);
		if (id) q.set('game', id);
		if (v === 'game') q.set('tab', t);
		history.pushState({}, '', `?${q}`);
		sync();
	};
	const refresh = async () => {
		try {
			app = await api<AppState>('/api/state');
			down = false;
		} catch {
			down = true;
		}
	};
	onMount(() => {
		sync();
		refresh();
		const t = setInterval(refresh, 5000);
		window.addEventListener('popstate', sync);
		return () => (clearInterval(t), window.removeEventListener('popstate', sync));
	});
	const game = $derived(app?.games.find((g) => g.id === gameId));
</script>

<header class="bar">
	<button class="brand" onclick={() => go('list')}>Game Builder</button>
	<span class="dim crumbs">
		{#if view === 'edit'}{gameId ? `Edit ${gameId}` : 'New game'}{:else if view === 'game'}{game?.name ?? gameId}{/if}
	</span>
	<span class="grow"></span>
	<span class="dim small">demo RGS: {app?.rgsUp ? 'running' : 'stopped (starts on build)'}</span>
	<button onclick={() => go('edit')}>New game</button>
</header>

{#if down}
	<p class="err pad">The builder server is not running. Start it with <code>node tools/builder-server/server.mjs</code> (port 3231).</p>
{:else if !app}
	<p class="dim pad">Loading…</p>
{:else if view === 'list'}
	<GameList {app} {go} {refresh} />
{:else if view === 'edit'}
	<GameForm {app} {gameId} {go} {refresh} />
{:else if view === 'game' && gameId}
	<nav class="tabs">
		{#each ['play', 'art', 'export'] as t}
			<button class:on={tab === t} onclick={() => go('game', gameId, t as typeof tab)}>{t === 'play' ? 'Build & Play' : t === 'art' ? 'Art' : 'Export'}</button>
		{/each}
		<span class="grow"></span>
		<button onclick={() => go('edit', gameId)}>Edit spec</button>
	</nav>
	{#if tab === 'play'}
		<PlayPanel {app} {gameId} {refresh} />
	{:else if tab === 'art'}
		<ArtPanel {gameId} />
	{:else}
		<ExportPanel {gameId} />
	{/if}
{/if}

<style>
	.bar { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid var(--line); position: sticky; top: 0; background: var(--bg); z-index: 5; }
	.brand { border: 0; white-space: nowrap; font-weight: 700; font-size: 16px; padding: 4px 0; }
	.crumbs::before { content: '/'; margin-right: 10px; }
	.small { font-size: 12px; }
	.grow { flex: 1; }
	@media (max-width: 600px) { .small, .crumbs { display: none; } .bar { padding: 8px 12px; } }
	.pad { padding: 16px; }
	.tabs { display: flex; gap: 4px; padding: 8px 16px 0; border-bottom: 1px solid var(--line); }
	.tabs button { border: 0; border-bottom: 2px solid transparent; border-radius: 0; padding: 8px 14px; }
	.tabs button.on { border-bottom-color: var(--accent); font-weight: 600; }
</style>
