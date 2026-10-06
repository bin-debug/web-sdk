<script lang="ts">
	import { onMount } from 'svelte';
	import { api, SERVER } from '$lib/api';

	let { gameId }: { gameId: string } = $props();

	type Row = { id: string; label: string; group: string; source: 'game' | 'demo' | 'code'; kind: string; url: string | null; preset: string | null; fallback: boolean };
	let rows = $state<Row[]>([]);
	let requests = $state<{ slot: string; status: string }[]>([]);
	let note = $state('');
	let over = $state('');
	let filter = $state<'all' | 'demo' | 'game' | 'code'>('all');
	let bust = $state(Date.now());

	const load = async () => {
		const r = await api(`/api/games/${gameId}/art`);
		rows = r.rows;
		requests = r.requests;
		bust = Date.now();
	};
	onMount(load);

	const upload = async (slot: string, file: File) => {
		note = '';
		try {
			await api(`/api/games/${gameId}/art?slot=${encodeURIComponent(slot)}&name=${encodeURIComponent(file.name)}`, { method: 'PUT', body: file });
			note = `Replaced ${slot}. Reload the game to see it.`;
			await load();
		} catch (e: any) {
			note = e.message;
		}
	};
	const onDrop = (e: DragEvent, slot: string) => {
		e.preventDefault();
		over = '';
		const f = e.dataTransfer?.files?.[0];
		if (f) upload(slot, f);
	};
	const onPick = (e: Event, slot: string) => {
		const f = (e.currentTarget as HTMLInputElement).files?.[0];
		if (f) upload(slot, f);
	};
	const revert = async (slot: string) => {
		await api(`/api/games/${gameId}/art?slot=${encodeURIComponent(slot)}`, { method: 'DELETE' });
		await load();
	};
	const generate = async (body: object) => {
		const r = await api(`/api/games/${gameId}/art/generate`, { json: body });
		note = `${r.queued} slot${r.queued === 1 ? '' : 's'} queued in ${r.file}. Ask an agent: "generate the queued art for ${gameId}" (the Artlist tools run from the agent session).`;
		await load();
	};

	const shown = $derived(rows.filter((r) => filter === 'all' || r.source === filter));
	const counts = $derived({ demo: rows.filter((r) => r.source === 'demo').length, game: rows.filter((r) => r.source === 'game').length, code: rows.filter((r) => r.source === 'code').length });
	const queued = (id: string) => requests.some((q) => q.slot === id && q.status === 'queued');
	const src = (u: string) => `${SERVER}${u}?v=${bust}`;
</script>

<div class="wrap">
	<div class="row top">
		<h2 class="grow">Art and sound slots</h2>
		<span class="dim small">{counts.game} game · {counts.demo} demo · {counts.code} code fallback</span>
		<button onclick={() => generate({ missing: true })}>Generate all missing</button>
	</div>
	<div class="row filters">
		{#each ['all', 'game', 'demo', 'code'] as f}
			<button class:on={filter === f} onclick={() => (filter = f as typeof filter)}>{f === 'code' ? 'code fallback' : f}</button>
		{/each}
	</div>
	{#if note}<p class="note">{note}</p>{/if}

	<div class="list">
		{#each shown as r (r.id)}
			<div class="art" class:over={over === r.id} role="group" ondragover={(e) => (e.preventDefault(), (over = r.id))} ondragleave={() => (over = '')} ondrop={(e) => onDrop(e, r.id)}>
				<div class="thumb">
					{#if r.kind === 'image' || r.kind === 'sheet'}<img src={src(r.url!)} alt={r.id} loading="lazy" />
					{:else if r.kind === 'video'}<video src={src(r.url!)} muted loop autoplay playsinline></video>
					{:else if r.kind === 'audio'}<audio src={src(r.url!)} controls preload="none"></audio>
					{:else}<span class="dim tiny">code</span>{/if}
				</div>
				<div class="grow">
					<div>{r.id}</div>
					<div class="dim small">{r.label}{r.preset ? ` · juice: ${r.preset}` : ''}{r.kind === 'sheet' ? ' · animated sheet' : ''}</div>
				</div>
				<span class="badge {r.source}">{r.source === 'code' ? 'code fallback' : r.source}</span>
				{#if queued(r.id)}<span class="dim small">queued</span>{/if}
				<label class="btn">Replace<input type="file" hidden accept="image/png,image/webp,image/jpeg,audio/mpeg,audio/ogg,video/webm,video/mp4" onchange={(e) => onPick(e, r.id)} /></label>
				{#if r.kind !== 'audio'}<button onclick={() => generate({ slots: [r.id] })}>Generate with Artlist</button>{/if}
				{#if r.source === 'game'}<button onclick={() => revert(r.id)}>Revert</button>{/if}
			</div>
		{/each}
	</div>
	<p class="dim small hint">Drop a file on a row to replace that slot. Files go to games/{gameId}/art/ and games/{gameId}/art/manifest.json.</p>
</div>

<style>
	.wrap { padding: 12px 16px 40px; max-width: 1200px; margin: 0 auto; }
	.top { flex-wrap: wrap; padding-bottom: 8px; }
	.filters { padding-bottom: 8px; }
	.filters button.on { border-color: var(--accent); color: var(--accent); }
	.small { font-size: 12px; }
	.tiny { font-size: 11px; }
	.note { color: var(--accent); }
	.art { display: flex; align-items: center; gap: 12px; padding: 8px 0; flex-wrap: wrap; }
	.art.over { outline: 2px dashed var(--accent); outline-offset: -2px; }
	.thumb { width: 72px; height: 54px; background: repeating-conic-gradient(#2a2e35 0 25%, #20232a 0 50%) 0 0 / 14px 14px; display: flex; align-items: center; justify-content: center; flex: none; overflow: hidden; }
	.thumb img, .thumb video { max-width: 100%; max-height: 100%; object-fit: contain; }
	.thumb audio { width: 70px; height: 28px; }
	.badge { font-size: 11px; padding: 2px 8px; border-radius: 10px; border: 1px solid var(--line); }
	.badge.game { color: var(--ok); border-color: var(--ok); }
	.badge.code { color: var(--warn); border-color: var(--warn); }
	.btn { border: 1px solid var(--line); border-radius: 4px; padding: 6px 12px; cursor: pointer; }
	.hint { margin-top: 12px; }
</style>
