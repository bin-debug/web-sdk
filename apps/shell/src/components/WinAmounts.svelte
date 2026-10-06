<script lang="ts" module>
	import type { RawWin, Win } from './WinAmount.svelte';

	export type EmitterEventWinAmounts = { type: 'showWinAmounts'; wins: RawWin[] };
</script>

<script lang="ts">
	import { waitForResolve } from 'utils-shared/wait';

	import BoardContainer from './BoardContainer.svelte';
	import WinAmount from './WinAmount.svelte';
	import { getContext } from '../game/context';

	const context = getContext();

	let wins: Win[] = $state([]);

	context.eventEmitter.subscribeOnMount({
		showWinAmounts: async ({ wins: raw }) => {
			wins = raw.map((w) => ({ ...w, oncomplete: () => {} }));
			await Promise.all(wins.map((w) => waitForResolve((resolve) => (w.oncomplete = resolve))));
			wins = [];
		},
	});
</script>

<BoardContainer>
	{#each wins as win}
		<WinAmount {win} />
	{/each}
</BoardContainer>
