<script lang="ts">
	import { getContext } from '../game/context';

	// The loading screen is our studio splash (app.html) and IntroOverlay (the game logo and
	// "Tap to play"), drawn over the canvas. This only holds the game scene back until the art
	// has loaded, so nothing is drawn before its textures exist.
	type Props = { onloaded: () => void };
	const props: Props = $props();
	const context = getContext();

	let done = false;
	$effect(() => {
		if (!done && context.stateApp.loaded) {
			done = true;
			props.onloaded();
		}
	});
</script>
