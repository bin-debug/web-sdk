// @ts-ignore
import config from 'config-vite';
// envPrefix exposes PUBLIC_* (PUBLIC_RGS_URL) via import.meta.env, so a Dev/UAT build talks to the
// RGS baked in by the release workflow; without it the game only works with ?rgs_url= in the link.
export default { ...config(), envPrefix: ['VITE_', 'PUBLIC_'], server: { allowedHosts: ['thor.tail8ad778.ts.net'] } };
