<script lang="ts">
	import { stateForce } from 'state-shared';

	let open = $state(false);
	let simId = $state('');
	const armedLabel = $derived(stateForce.forceTool?.scenarios.find((item) => item.key === stateForce.pendingForce)?.label ?? stateForce.pendingForce);
	function arm(value: string) { stateForce.pendingForce = value; open = false; }
	function armSim() {
		const id = simId.trim();
		if (id) arm(`sim:${id}`);
	}
</script>

{#if stateForce.forceTool?.enabled}
	<div class="force-tool">
		<button class="toggle" onclick={() => open = !open}>FORCE{#if stateForce.pendingForce}: {armedLabel}{/if}</button>
		{#if open}
			<div class="panel" role="dialog" aria-label="Force next spin">
				<div class="scenario-list">
					{#each stateForce.forceTool.scenarios as scenario}
						<button onclick={() => arm(scenario.key)}>{scenario.label}</button>
					{/each}
				</div>
				<label>sim id <input bind:value={simId} inputmode="numeric" /></label>
				<button onclick={armSim}>Arm sim</button>
				<button onclick={() => { stateForce.pendingForce = null; open = false; }}>Clear</button>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.force-tool { position: fixed; top: .5rem; left: .5rem; z-index: 100; font: 600 14px/1.2 sans-serif; }
	button, input { min-height: 40px; border-radius: 4px; }
	.toggle { background: #ffd400; color: #111; padding: 0 1rem; min-height: 44px; border: 2px solid #111; font-weight: 800; letter-spacing: .04em; box-shadow: 0 2px 10px #000a; }
	.panel { margin-top: .4rem; width: min(19rem, calc(100vw - 1rem)); max-height: min(65vh, calc(100vh - 10rem)); overflow: auto; padding: .5rem; background: #15191f; color: #fff; box-shadow: 0 3px 14px #0009; display: grid; gap: .4rem; }
	.scenario-list { display: grid; gap: .25rem; }
	.scenario-list button { text-align: left; padding: .4rem .55rem; }
	label { display: grid; gap: .2rem; }
	input { padding: 0 .4rem; }
	@media (max-width: 500px) { .force-tool { top: .35rem; left: .35rem; } }
</style>
