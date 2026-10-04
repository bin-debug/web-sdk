// @ts-ignore
import config from 'config-vite';
// envPrefix exposes PUBLIC_* (PUBLIC_RGS_URL) via import.meta.env.
export default {
  ...config(),
  envPrefix: ['VITE_', 'PUBLIC_'],
  server: { allowedHosts: ['uat-rgs.atomic-labs.co', 'thor.tail8ad778.ts.net'] },
  preview: { allowedHosts: ['thor.tail8ad778.ts.net'] },
};
