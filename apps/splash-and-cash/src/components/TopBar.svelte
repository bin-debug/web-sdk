<script lang="ts">
	import { onMount } from 'svelte';
	import { stateModal } from 'state-shared';

	import { THEME } from '../game/theme';

	// Thin bar across the top of the game: the studio on the left, the clock and game name on the
	// right. Hidden while the Buy Bonus screen is open, as in the cluster games.
	const STUDIO = 'Atomic-Labs';

	let time = $state('');
	onMount(() => {
		const tick = () => {
			const now = new Date();
			time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
		};
		tick();
		const id = setInterval(tick, 10000);
		return () => clearInterval(id);
	});

	const hidden = $derived(stateModal.modal?.name === 'buyBonus');
</script>

{#if !hidden}
	<div class="top-bar">
		<span class="studio">{STUDIO}</span>
		<span class="right">
			<span class="time">{time}</span>
			<span class="name">{THEME.name}</span>
		</span>
	</div>
{/if}

<style>
	.top-bar {
		position: fixed; left: 0; right: 0; top: 0; height: 26px; z-index: 90;
		display: flex; align-items: center; justify-content: space-between; padding: 0 12px;
		pointer-events: none;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}
	.studio { color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; opacity: 0.92; }
	.right { display: inline-flex; align-items: baseline; gap: 8px; }
	.time { color: #fff; font-size: 12px; font-weight: 600; }
	.name { color: #ffe9a0; font-size: 12px; font-weight: 600; }
	/* make room for the FORCE test button (local and dev only) */
	:global(body:has(.force-tool)) .studio { padding-left: 100px; }
</style>
