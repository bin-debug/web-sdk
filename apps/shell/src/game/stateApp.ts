import { createApp, type Assets } from 'pixi-svelte';

// Assets are filled in by initArt() (kit-assets) before the app renders: nothing is referenced statically.
export const { stateApp } = createApp({ assets: {} as Assets });
