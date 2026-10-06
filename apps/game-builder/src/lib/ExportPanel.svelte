<script lang="ts">
	import { api, streamJob, SERVER } from '$lib/api';

	let { gameId }: { gameId: string } = $props();
	let busy = $state(false);
	let lines = $state<string[]>([]);
	let zip = $state('');
	let failed = $state(false);

	const run = async () => {
		busy = true;
		lines = [];
		zip = '';
		failed = false;
		try {
			const { job } = await api(`/api/games/${gameId}/export`, { method: 'POST' });
			const r = await streamJob(job, (l) => lines.push(l));
			if (r.ok) zip = `${SERVER}${r.result.zip}`;
			else failed = true;
		} catch (e: any) {
			lines.push(`FAILED: ${e.message}`);
			failed = true;
		} finally {
			busy = false;
		}
	};
</script>

<div class="wrap">
	<h2>Export</h2>
	<p class="dim">Builds a production bundle of this game only (its spec, art and the shared demo art it falls back to) as a zip. The RGS address is taken from the launch URL (<code>rgs_url</code>), so nothing local is baked in. Upload the unzipped build folder to Stake Engine, or hand it to the release workflow.</p>
	<div class="row">
		<button class="primary" disabled={busy} onclick={run}>{busy ? 'Building…' : 'Export production zip'}</button>
		{#if zip}<a class="btn ok" href={zip}>Download {gameId}.zip</a>{/if}
		{#if failed}<span class="err">Export failed, see the log.</span>{/if}
	</div>
	{#if lines.length}<pre class="log">{lines.join('\n')}</pre>{/if}
</div>

<style>
	.wrap { padding: 16px; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
	.btn { border: 1px solid var(--ok); border-radius: 4px; padding: 6px 12px; text-decoration: none; }
</style>
