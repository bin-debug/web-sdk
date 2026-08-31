// @ts-ignore
import config from 'config-vite';
// envPrefix exposes PUBLIC_* (PUBLIC_RGS_URL) via import.meta.env.
// Override assetsInlineLimit so large game assets (textures, sounds) are
// served as separate files rather than base64-inlined into the JS bundle.
export default { ...config(), envPrefix: ['VITE_', 'PUBLIC_'], server: { allowedHosts: ['thor.tail8ad778.ts.net'], proxy: { '/wallet': 'http://localhost:5078', '/bet': 'http://localhost:5078' } }, build: { ...config().build, assetsInlineLimit: 4096 } };
