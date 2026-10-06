// @ts-ignore
import config from 'config-svelte';

const base = config();
// Game Builder export (KIT_GAME=<id>): build into its own folders so running dev servers are not disturbed
if (process.env.KIT_GAME) base.kit.outDir = '.svelte-kit-export';
export default base;
