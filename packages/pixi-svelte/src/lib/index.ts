export * from './components/index';
export * from './utils.svelte';
export * from './types';
export * from './createApp.svelte';
export * from './context.svelte';

// pixi.js itself, for games that build PIXI objects directly (one copy, no extra dependency)
export * as PIXI from 'pixi.js';
