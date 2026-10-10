import baseConfig from 'config-vite';

const config = baseConfig();

config.server = {
	...(config.server ?? {}),
	host: '0.0.0.0',
	port: 3031,
	strictPort: true,
	allowedHosts: ['thor.tail8ad778.ts.net'],
};

config.preview = {
	...(config.preview ?? {}),
	host: '0.0.0.0',
	port: 3031,
	strictPort: true,
	allowedHosts: ['thor.tail8ad778.ts.net'],
};

export default config;
