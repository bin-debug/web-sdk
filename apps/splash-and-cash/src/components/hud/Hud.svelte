<script lang="ts">
	import { EnableSpaceHold } from 'components-shared';
	import UiFadeContainer from 'components-ui-pixi/src/components/UiFadeContainer.svelte';

	import HudPortrait from './HudPortrait.svelte';
	import HudDesktop from './HudDesktop.svelte';
	import HudMenu from './HudMenu.svelte';
	import { isPortraitHud } from './layout';
</script>

<EnableSpaceHold />

<UiFadeContainer>
	{#if isPortraitHud()}
		<HudPortrait />
	{:else}
		<HudDesktop />
	{/if}
</UiFadeContainer>

<HudMenu />
