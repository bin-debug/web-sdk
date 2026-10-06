<script lang="ts">
	import { onMount } from 'svelte';
	import { api, type AppState, type Issue } from '$lib/api';

	let { app, gameId, go, refresh }: { app: AppState; gameId: string; go: (v: any, id?: string, t?: any) => void; refresh: () => void } = $props();

	type Spec = any;
	const blank = (): Spec => ({
		gameId: '',
		name: '',
		shell: 'lines-classic',
		board: { reels: 5, rows: 3, cell: 124, gap: 4 },
		reveal: 'spin',
		pays: { type: 'lines', lines: 20 },
		symbols: { low: 5, high: 4, wild: true, scatter: true },
		features: [],
		bonuses: [{ id: 'BONUS', name: 'Free Spins', trigger: '3 S', spins: 10 }],
		boosts: [],
		buys: [{ mode: 'BONUS', cost: 100 }],
		layout: { preset: 'board-hero', mascotSide: 'right' },
		ui: { accent: '#F5C400', bar: 'kit' },
		palette: ['#12243a', '#e0245e', '#ffd23f'],
		artStyle: 'thick-outline cel-shaded cartoon, saturated, dark background',
	});

	let spec = $state<Spec>(blank());
	let isNew = $state(!gameId);
	let idTouched = $state(false);
	let issues = $state<Issue[]>([]);
	let saving = $state(false);
	let message = $state('');

	onMount(async () => {
		if (gameId) {
			const r = await api(`/api/games/${gameId}`);
			spec = r.spec;
		}
	});

	const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
	$effect(() => {
		if (isNew && !idTouched) spec.gameId = slug(spec.name);
	});

	let timer: ReturnType<typeof setTimeout>;
	$effect(() => {
		const snapshot = $state.snapshot(spec);
		clearTimeout(timer);
		timer = setTimeout(async () => {
			try {
				issues = (await api('/api/validate', { json: { spec: snapshot } })).issues;
			} catch {}
		}, 250);
	});

	const payDefaults = (t: string) => (t === 'lines' ? { type: 'lines', lines: 20 } : t === 'ways' ? { type: 'ways' } : { type: t, min: t === 'cluster' ? 5 : 8 });
	const pickShell = (id: string) => {
		spec.shell = id;
		const s = app.shells.find((x) => x.id === id);
		if (!s?.implemented) return;
		if (s.board) {
			spec.board.reels = s.board[0];
			spec.board.rows = s.board[1];
		}
		if (s.reveal) spec.reveal = s.reveal;
		if (s.pays) spec.pays = payDefaults(s.pays);
	};

	// why a feature cannot be switched on (null = fine)
	const featureBlock = (f: AppState['features'][number]): string | null => {
		if (!f.implemented) return 'not built yet';
		if (f.reveal && !f.reveal.includes(spec.reveal)) return `needs reveal style ${f.reveal.join(' or ')}`;
		if (f.pays && !f.pays.includes(spec.pays.type)) return `needs ${f.pays.join(' or ')} pays`;
		return null;
	};
	const toggleFeature = (id: string, on: boolean) => {
		const set = new Set<string>(spec.features);
		if (on) set.add(id);
		else set.delete(id);
		spec.features = [...set];
	};
	const needsMissing = (f: AppState['features'][number]) => f.needs.filter((n) => !spec.features.includes(n));

	const addBonus = () => {
		const n = spec.bonuses.length + 1;
		if (n > 3) return;
		spec.bonuses.push({ id: n === 1 ? 'BONUS' : `BONUS${n}`, name: `Bonus ${n}`, trigger: `${n + 2} S`, spins: 10 });
	};
	const removeBonus = (i: number) => {
		const [b] = spec.bonuses.splice(i, 1);
		spec.buys = spec.buys.filter((x: any) => x.mode !== b.id);
	};
	const hasBuy = (id: string) => spec.buys.some((b: any) => b.mode === id);
	const toggleBuy = (id: string, on: boolean) => {
		spec.buys = spec.buys.filter((b: any) => b.mode !== id);
		if (on) spec.buys.push({ mode: id, cost: 100 });
	};
	const buyCost = (id: string) => spec.buys.find((b: any) => b.mode === id)?.cost ?? 100;
	const setBuyCost = (id: string, v: number) => {
		const b = spec.buys.find((x: any) => x.mode === id);
		if (b) b.cost = v;
	};
	const addBoost = () => spec.boosts.push({ id: `BOOST${spec.boosts.length + 1}`, name: 'Boost', cost: 3 });

	const errors = $derived(issues.filter((i) => i.level === 'error'));
	const save = async (andPlay: boolean) => {
		saving = true;
		message = '';
		try {
			const r = await api('/api/games', { json: { spec: $state.snapshot(spec), overwrite: !isNew } });
			issues = r.issues;
			await refresh();
			if (andPlay) go('game', spec.gameId, 'play');
			else {
				isNew = false;
				message = `Saved to games/${spec.gameId}/game.spec.json`;
			}
		} catch (e: any) {
			if (e.data?.issues) issues = e.data.issues;
			message = e.message;
		} finally {
			saving = false;
		}
	};
</script>

<div class="wrap">
	<div class="cols">
		<div class="main">
			<h3>Game</h3>
			<div class="grid2">
				<label>Name <input type="text" bind:value={spec.name} placeholder="Neon Heist" /></label>
				<label>Game id <input type="text" bind:value={spec.gameId} disabled={!isNew} oninput={() => (idTouched = true)} /></label>
			</div>

			<h3>Shell</h3>
			<div class="list">
				{#each app.shells as s}
					{@const blocked = !s.implemented || s.verified === false}
					<label class="srow" class:off={blocked}>
						<input type="radio" name="shell" checked={spec.shell === s.id} disabled={blocked} onchange={() => pickShell(s.id)} />
						<span class="grow"><strong>{s.title}</strong> <span class="dim">{s.id}{s.pays ? ` · ${s.pays} · ${s.reveal} · ${s.board?.join('×')}` : ''}</span></span>
						{#if blocked}<span class="warn small">{s.reason ?? 'not verified yet'}</span>{:else}<span class="ok small">verified</span>{/if}
					</label>
				{/each}
			</div>

			<h3>Board and pays</h3>
			<div class="grid4">
				<label>Reels <input type="number" min="3" max="8" bind:value={spec.board.reels} /></label>
				<label>Rows <input type="number" min="3" max="8" bind:value={spec.board.rows} /></label>
				<label>Reveal
					<select bind:value={spec.reveal}><option>spin</option><option>drop</option><option disabled>respin (no shell yet)</option></select>
				</label>
				<label>Pays
					<select value={spec.pays.type} onchange={(e) => (spec.pays = payDefaults(e.currentTarget.value))}>
						<option value="lines">lines</option><option value="ways">ways</option><option value="cluster">cluster</option><option value="scatter">scatter</option>
					</select>
				</label>
				{#if spec.pays.type === 'lines'}<label>Lines <input type="number" min="1" bind:value={spec.pays.lines} /></label>{/if}
				{#if spec.pays.type === 'cluster' || spec.pays.type === 'scatter'}<label>Minimum count <input type="number" min="2" bind:value={spec.pays.min} /></label>{/if}
			</div>

			<h3>Symbols</h3>
			<div class="grid4">
				<label>Low (2–6) <input type="number" min="2" max="6" bind:value={spec.symbols.low} /></label>
				<label>High (2–6) <input type="number" min="2" max="6" bind:value={spec.symbols.high} /></label>
				<label class="chk"><input type="checkbox" bind:checked={spec.symbols.wild} /> Wild</label>
				<label class="chk"><input type="checkbox" bind:checked={spec.symbols.scatter} /> Scatter</label>
			</div>

			<h3>Features</h3>
			<div class="list">
				{#each app.features as f}
					{@const block = featureBlock(f)}
					{@const missing = needsMissing(f)}
					<label class="srow" class:off={!!block}>
						<input type="checkbox" checked={spec.features.includes(f.id)} disabled={!!block} onchange={(e) => toggleFeature(f.id, e.currentTarget.checked)} />
						<span class="grow">{f.title} <span class="dim">{f.id}</span></span>
						{#if block}<span class="warn small">{block}</span>
						{:else if missing.length && !spec.features.includes(f.id)}<span class="dim small">also needs {missing.join(', ')}</span>{/if}
					</label>
				{/each}
			</div>

			<h3>Bonuses</h3>
			<div class="list">
				{#each spec.bonuses as b, i}
					<div class="brow">
						<label>Mode <input type="text" bind:value={b.id} /></label>
						<label>Name <input type="text" bind:value={b.name} /></label>
						<label>Trigger <input type="text" bind:value={b.trigger} /></label>
						<label>Spins <input type="number" min="1" bind:value={b.spins} /></label>
						<label class="chk"><input type="checkbox" checked={hasBuy(b.id)} onchange={(e) => toggleBuy(b.id, e.currentTarget.checked)} /> Buy</label>
						{#if hasBuy(b.id)}<label>Price (x bet) <input type="number" min="1" value={buyCost(b.id)} oninput={(e) => setBuyCost(b.id, +e.currentTarget.value)} /></label>{/if}
						<button onclick={() => removeBonus(i)}>Remove</button>
					</div>
				{/each}
				<div class="brow"><button onclick={addBonus} disabled={spec.bonuses.length >= 3}>Add bonus</button> <span class="dim small">up to 3 (the shells play BONUS, BONUS2, BONUS3)</span></div>
			</div>

			<h3>Boosts</h3>
			<div class="list">
				{#each spec.boosts as b, i}
					<div class="brow">
						<label>Id <input type="text" bind:value={b.id} /></label>
						<label>Name <input type="text" bind:value={b.name} /></label>
						<label>Cost (x bet) <input type="number" step="0.5" bind:value={b.cost} /></label>
						<button onclick={() => spec.boosts.splice(i, 1)}>Remove</button>
					</div>
				{/each}
				<div class="brow"><button onclick={addBoost}>Add boost</button></div>
			</div>

			<h3>Layout and look</h3>
			<div class="grid4">
				<label>Layout
					<select bind:value={spec.layout.preset}><option>board-hero</option><option>stage</option><option>classic</option></select>
				</label>
				<label>Mascot side
					<select bind:value={spec.layout.mascotSide}><option>right</option><option>left</option></select>
				</label>
				<label>Accent <input type="color" bind:value={spec.ui.accent} /></label>
				<label>Palette
					<span class="row">{#each spec.palette as _, i}<input type="color" bind:value={spec.palette[i]} />{/each}</span>
				</label>
			</div>
			<label class="block">Art style (used in Artlist prompts) <textarea rows="2" bind:value={spec.artStyle}></textarea></label>
		</div>

		<aside class="side">
			<h3>Spec check</h3>
			{#if !issues.length}<p class="ok">No problems.</p>{/if}
			{#each issues as i}
				<p class={i.level === 'error' ? 'err' : 'warn'}><strong>{i.path}</strong> {i.message}</p>
			{/each}
			<div class="actions">
				<button class="primary" disabled={saving || errors.length > 0 || !spec.gameId} onclick={() => save(true)}>Save and Build &amp; Play</button>
				<button disabled={saving || errors.length > 0 || !spec.gameId} onclick={() => save(false)}>Save</button>
				<button onclick={() => go(gameId ? 'game' : 'list', gameId)}>Cancel</button>
			</div>
			{#if message}<p class="dim">{message}</p>{/if}
		</aside>
	</div>
</div>

<style>
	.wrap { padding: 0 16px 40px; max-width: 1200px; margin: 0 auto; }
	.cols { display: flex; gap: 32px; align-items: flex-start; }
	.main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; padding-top: 16px; }
	.side { width: 320px; position: sticky; top: 56px; padding-top: 16px; }
	.side p { margin: 6px 0; font-size: 13px; }
	.actions { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
	h3 { margin-top: 14px; }
	label { display: flex; flex-direction: column; gap: 3px; font-size: 12px; color: var(--dim); }
	label.chk { flex-direction: row; align-items: center; gap: 6px; font-size: 14px; color: var(--text); padding-top: 18px; }
	label.block { margin-top: 4px; }
	.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
	.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
	.srow { flex-direction: row; align-items: center; flex-wrap: wrap; gap: 4px 10px; padding: 8px 0; font-size: 14px; color: var(--text); border-bottom: 1px solid var(--line); }
	.srow.off { opacity: 0.55; }
	.small { font-size: 12px; }
	.brow { display: flex; gap: 10px; align-items: flex-end; flex-wrap: wrap; padding: 8px 0; border-bottom: 1px solid var(--line); }
	.brow label { flex: 1; min-width: 90px; }
	.brow label.chk { flex: 0 0 auto; }
	@media (max-width: 800px) {
		.cols { flex-direction: column; gap: 0; }
		.side { width: 100%; position: static; }
		.grid4 { grid-template-columns: 1fr 1fr; }
	}
</style>
