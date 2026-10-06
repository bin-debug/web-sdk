<script lang="ts" module>
	export type EmitterEventSound =
		| { type: 'soundMusic'; name: 'base' | 'bonus' }
		| { type: 'soundOnce'; name: string; forcePlay?: boolean }
		| { type: 'soundLoop'; name: string }
		| { type: 'soundStop'; name: string }
		| { type: 'soundFade'; name: string; from: number; to: number; duration: number };
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import { stateSound } from 'state-shared';

	import { getContext } from '../game/context';
	import { getAudio } from '../game/art';

	// Audio slots with silence as the fallback: names with no file are simply not played.
	const context = getContext();
	const audio = getAudio();

	context.eventEmitter.subscribeOnMount({
		soundBetMode: () => {},
		soundPressGeneral: () => audio.sfx('button'),
		soundPressBet: () => audio.sfx('button'),
		soundMusic: ({ name }) => audio.playMusic(name),
		soundOnce: ({ name, forcePlay }) => audio.sfx(name, { force: forcePlay }),
		soundLoop: () => {},
		soundStop: () => {},
		soundFade: () => {},
	});

	$effect(() => {
		void stateSound.volumeValueMaster;
		void stateSound.volumeValueMusic;
		audio.syncVolume();
	});

	onMount(() => {
		audio.playMusic('base');
		return () => audio.destroy();
	});
</script>
