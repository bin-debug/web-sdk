// The builder server (tools/builder-server) answers on the same host, port 3231.
export const SERVER = typeof location === 'undefined' ? '' : `${location.protocol}//${location.hostname}:3231`;

export async function api<T = any>(path: string, init?: RequestInit & { json?: unknown }): Promise<T> {
	const opts: RequestInit = { ...init };
	if (init?.json !== undefined) {
		opts.method = opts.method ?? 'POST';
		opts.body = JSON.stringify(init.json);
	}
	const res = await fetch(`${SERVER}${path}`, opts);
	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw Object.assign(new Error(data.error ?? res.statusText), { data, status: res.status });
	return data;
}

// Stream a job's log lines; resolves with the final {ok, result}.
export function streamJob(jobId: string, onLine: (l: string) => void): Promise<{ ok: boolean; result: any }> {
	return new Promise((resolve) => {
		const es = new EventSource(`${SERVER}/api/jobs/${jobId}/stream`);
		es.onmessage = (e) => {
			const d = JSON.parse(e.data);
			if (d.line) onLine(d.line);
			if (d.done) {
				es.close();
				resolve({ ok: d.ok, result: d.result });
			}
		};
		es.onerror = () => {
			es.close();
			resolve({ ok: false, result: null });
		};
	});
}

export type Issue = { level: 'error' | 'warning'; path: string; message: string };
export type Game = { id: string; name: string; shell: string; shellVerified: boolean; errors: number; warnings: number; port: number | null; running: boolean; hasBooks: boolean };
export type Shell = { id: string; title: string; pays?: string; reveal?: string; board?: number[]; implemented: boolean; verified?: boolean; reason?: string };
export type Feature = { id: string; title: string; needs: string[]; reveal: string[] | null; pays: string[] | null; implemented: boolean };
export type AppState = { host: string; ports: { ui: number; server: number; rgs: number; gameBase: number }; rgsUp: boolean; shells: Shell[]; features: Feature[]; games: Game[] };

// Hosts for links: use the page's own host (works over LAN/Tailscale); when opened on localhost, hand out the machine's Tailscale IP for phones.
export const phoneHost = (state: AppState | null) => (location.hostname === 'localhost' || location.hostname === '127.0.0.1' ? state?.host || location.hostname : location.hostname);
export const launchUrl = (host: string, port: number, gameId: string, device: 'desktop' | 'mobile', session: string) =>
	`http://${host}:${port}/?sessionID=${session}&game_id=${gameId}&currency=ZAR&lang=en&device=${device}&rgs_url=http://${host}:5119`;
