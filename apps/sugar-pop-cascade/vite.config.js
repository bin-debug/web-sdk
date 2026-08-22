// @ts-ignore
import config from 'config-vite';
// envPrefix exposes PUBLIC_* (PUBLIC_RGS_URL) via import.meta.env.
// Override assetsInlineLimit so large game assets (textures, sounds) are
// served as separate files rather than base64-inlined into the JS bundle.
export default { ...config(), envPrefix: ['VITE_', 'PUBLIC_'], build: { ...config().build, assetsInlineLimit: 4096 } };
