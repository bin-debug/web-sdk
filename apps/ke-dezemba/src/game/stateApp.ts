import { createApp } from 'pixi-svelte';

import assets from './assets';

// the lazy (bonus) art waits for the loading screen to finish: IntroOverlay releases it
export const { stateApp } = createApp({ assets, holdLazy: true });
