import type { paths } from './schema';
import { fetcher } from 'utils-fetcher';

const buildUrl = (rgsUrl: string, path: string) => {
	if (rgsUrl.startsWith('http://') || rgsUrl.startsWith('https://')) {
		return `${rgsUrl}${path}`;
	}
	const protocol = rgsUrl.startsWith('localhost') || rgsUrl.startsWith('127.') ? 'http' : 'https';
	return `${protocol}://${rgsUrl}${path}`;
};

export const rgsFetcher = {
	post: async function post<
		T extends keyof paths,
		TResponse = paths[T]['post']['responses'][200]['content']['application/json'],
	>(options: {
		url: T;
		rgsUrl: string;
		variables?: paths[T]['post']['requestBody']['content']['application/json'];
	}): Promise<TResponse> {
		const response = await fetcher({
			method: 'POST',
			variables: options.variables,
			endpoint: buildUrl(options.rgsUrl, options.url),
		});

		if (response.status !== 200) console.error('error', response);
		const data = await response.json();
		return data as TResponse;
	},
	get: async function get<
		T extends keyof paths,
		TResponse = paths[T]['get']['responses'][200]['content']['application/json'],
	>(options: { url: T; rgsUrl: string }): Promise<TResponse> {
		const response = await fetcher({
			method: 'GET',
			endpoint: buildUrl(options.rgsUrl, options.url),
		});

		if (response.status !== 200) console.error('error', response);
		const data = await response.json();
		return data as TResponse;
	},
};
