// The slot manifest (DEMO-ART-SPEC section 1). A slot id is `group.NAME.state`.
export type ManifestSlot = {
	type: 'sprite' | 'spriteSheet' | 'juice' | 'alias' | 'video' | 'audio';
	file?: string;
	preset?: string; // juice
	of?: string; // alias target
	filter?: string;
	w?: number;
	h?: number;
	fps?: number;
	frames?: number;
	loop?: boolean;
	anchor?: [number, number];
	slice?: { left: number; top: number; right: number; bottom: number };
};

export type Manifest = { version: number; style?: string; slots: Record<string, ManifestSlot> };

export type ResolvedSlot = ManifestSlot & { url?: string; from: 'game' | 'demo' };

export type SlotMap = Record<string, ResolvedSlot>;

const join = (base: string, file: string) => `${base.replace(/\/$/, '')}/${file.replace(/^\//, '')}`;

export async function fetchManifest(baseUrl: string): Promise<Manifest | null> {
	try {
		const res = await fetch(join(baseUrl, 'manifest.json'), { cache: 'no-cache' });
		if (!res.ok) return null;
		const json = (await res.json()) as Manifest;
		return json?.slots ? json : null;
	} catch {
		return null;
	}
}

// Layers in priority order: the first layer that has a slot wins (game art over demo art).
export function mergeManifests(layers: { base: string; from: 'game' | 'demo'; manifest: Manifest | null }[]): SlotMap {
	const out: SlotMap = {};
	for (const layer of [...layers].reverse()) {
		if (!layer.manifest) continue;
		for (const [id, slot] of Object.entries(layer.manifest.slots)) {
			out[id] = { ...slot, from: layer.from, url: slot.file ? join(layer.base, slot.file) : undefined };
		}
	}
	// aliases: copy the target's data, keep the alias filter
	for (const [id, slot] of Object.entries(out)) {
		if (slot.type !== 'alias' || !slot.of) continue;
		const target = out[slot.of];
		if (target && target.type !== 'alias') out[id] = { ...target, filter: slot.filter };
	}
	return out;
}
