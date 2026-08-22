// @ts-ignore
import config from 'config-vite';
// envPrefix exposes PUBLIC_* (PUBLIC_RGS_URL) via import.meta.env.
// assetsInlineLimit override prevents base64-inlining large game assets in CI.
export default { ...config(), envPrefix: ['VITE_', 'PUBLIC_'], build: { ...config().build, assetsInlineLimit: 4096 } };
