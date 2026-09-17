// @ts-ignore
import config from 'config-vite';
// envPrefix exposes PUBLIC_* (PUBLIC_RGS_URL) via import.meta.env.
export default { ...config(), envPrefix: ['VITE_', 'PUBLIC_'] };
