<script lang="ts">
	import { api, launchUrl, phoneHost, type AppState } from '$lib/api';
	let { app, go, refresh }: { app: AppState; go: (v: any, id?: string, t?: any) => void; refresh: () => void } = $props();
	let copied = $state('');
	const copy = async (g: AppState['games'][number]) => {
		if (!g.port) return (copied = `${g.id}: build it first`);
		const url = launchUrl(phoneHost(app), g.port, g.id, 'mobile', 'phone-1');
		try {
			await navigator.clipboard.writeText(url);
			copied = `${g.id}: phone link copied`;
		} catch {
			prompt('Phone link', url);
		}
	};
</script>

<section class="wrap">
	<div class="row head">
		<h2 class="grow">Games</h2>
		{#if copied}<span class="ok">{copied}</span>{/if}
	</div>
	<div class="list">
		{#each app.games as g}
			<div class="item row">
				<div class="grow">
					<strong>{g.name}</strong> <span class="dim">{g.id} · {g.shell}</span>
					<div class="small">
						{#if g.errors}<span class="err">{g.errors} spec error{g.errors > 1 ? 's' : ''}</span>{:else}<span class="ok">spec ok</span>{/if}
						{#if g.warnings}<span class="warn"> · {g.warnings} warning{g.warnings > 1 ? 's' : ''}</span>{/if}
						{#if !g.shellVerified}<span class="warn"> · shell not verified yet</span>{/if}
						<span class="dim"> · {g.running ? `running on :${g.port}` : g.port ? `stopped (port ${g.port})` : 'not built yet'}</span>
					</div>
				</div>
				<button class="primary" onclick={() => go('game', g.id, 'play')}>Build &amp; Play</button>
				<button onclick={() => go('game', g.id, 'art')}>Art</button>
				<button onclick={() => go('edit', g.id)}>Edit</button>
				<button onclick={() => copy(g)}>Copy phone link</button>
			</div>
		{:else}
			<p class="dim pad">No games yet. Press New game.</p>
		{/each}
	</div>
</section>

<style>
	.wrap { padding: 0 16px 24px; max-width: 1200px; margin: 0 auto; }
	.head { padding: 16px 0 10px; }
	.item { padding: 12px 0; flex-wrap: wrap; }
	.small { font-size: 12px; margin-top: 2px; }
	.pad { padding: 16px 0; }
</style>
