<script lang="ts">
	import { type Snippet } from 'svelte';
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoadI18n } from 'components-shared';
	import Game from '../components/Game.svelte';
	import IntroOverlay from '../components/IntroOverlay.svelte';
	import { setContext } from '../game/context';
	import { THEME } from '../game/theme';

	import messagesMap from '../i18n/messagesMap';

	type Props = { children: Snippet };

	const props: Props = $props();

	// Our loader, as in the cluster games: the studio splash in app.html while the art loads,
	// then the theme's logo on its own background with "Tap to play".
	let introVisible = $state(true);
	$effect(() => {
		document.documentElement.classList.toggle('intro-active', introVisible);
	});
	const portrait = (innerHeight.current ?? 1) > (innerWidth.current ?? 1);
	const bgUrl = THEME.background
		? `./assets/theme/${portrait ? 'background_portrait' : 'background'}.webp`
		: undefined;

	setContext();
</script>

<GlobalStyle>
	<Authenticate>
		<LoadI18n {messagesMap}>
			<Game />
		</LoadI18n>
	</Authenticate>
</GlobalStyle>

{#if introVisible}
	<IntroOverlay
		logoUrl="./assets/theme/logo.webp"
		{bgUrl}
		ondismiss={() => (introVisible = false)}
	/>
{/if}

{@render props.children()}
