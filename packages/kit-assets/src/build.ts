import type { ShellSpec } from 'kit-spec';
import { symbolNames } from 'kit-spec';
import type { Assets } from 'pixi-svelte';

import type { ResolvedSlot, SlotMap } from './manifest';
import { drawBackgroundFallback, drawCellFallback, drawLogoFallback, drawMascotFallback, drawSymbolFallback } from './fallback';

export type SymbolState = 'static' | 'spin' | 'land' | 'win' | 'postWinStatic' | 'explosion';

export type JuicePreset =
	| 'none'
	| 'bounce'
	| 'squash'
	| 'squashShine'
	| 'pulse'
	| 'pulseGlow'
	| 'shake'
	| 'wiggle'
	| 'pop'
	| 'shine'
	| 'flash'
	| 'float'
	| 'settle'
	| 'motionBlur'
	| 'poofShrink'
	| 'dim30'
	| 'popShine'
	| 'shakeFlash'
	| 'crackPoof';

export type SymbolVisual =
	| { kind: 'sprite'; key: string; filter?: string }
	| { kind: 'sheet'; key: string; fps: number; frames: number; loop: boolean; filter?: string }
	| { kind: 'juice'; preset: JuicePreset };

export type Art = {
	assets: Assets;
	slots: SlotMap;
	// 'full' = a manifest supplied art; 'code' = everything is drawn by code fallbacks
	mode: 'full' | 'code';
	has: (id: string) => boolean;
	slot: (id: string) => ResolvedSlot | undefined;
	// asset key to use for a sprite slot: the real slot when it exists, else the code fallback
	spriteKey: (id: string) => string;
	// The look of a symbol in an engine state: a still (the static art), a clip, or a juice preset.
	symbolStatic: (name: string) => string;
	symbolVisual: (name: string, state: SymbolState) => SymbolVisual;
	audioUrl: (id: string) => string | undefined;
	missing: string[]; // slots that fell back to code (for the contact sheet / logs)
};

// Slot-state naming used by the manifest.
const STATE_SLOT: Record<SymbolState, string> = {
	static: 'static',
	spin: 'spin',
	land: 'land',
	win: 'win',
	postWinStatic: 'postWin',
	explosion: 'explode',
};

// C1..C4 share one clip, CL1/CL2 share one, etc.
const CLIP_GROUP = (name: string) => name.replace(/\d+$/, '');
const CLIP_STATE_ALIASES: Record<string, string[]> = { C: ['flip'], CL: ['burst'], COL: ['collect'], MW: ['open'], DW: ['explode'], RB: ['activate'] };

const DEFAULT_JUICE: Record<SymbolState, JuicePreset> = {
	static: 'none',
	spin: 'motionBlur',
	land: 'squash',
	win: 'pulseGlow',
	postWinStatic: 'settle',
	explosion: 'poofShrink',
};

export function buildArt(spec: ShellSpec, slotsIn: SlotMap): Art {
	const slots: SlotMap = slotsIn;
	const assets: Assets = {};
	const missing: string[] = [];
	const hasAnyArt = Object.keys(slots).length > 0;

	const addSprite = (id: string, fallback: () => string, preload = false) => {
		const slot = slots[id];
		if (slot?.type === 'sprite' && slot.url) {
			assets[id] = { type: 'sprite', src: slot.url, preload };
		} else {
			assets[id] = { type: 'sprite', src: fallback(), preload };
			missing.push(id);
		}
	};
	const addSheet = (id: string) => {
		const slot = slots[id];
		if (slot?.type === 'spriteSheet' && slot.url) assets[id] = { type: 'sheet' as never, src: slot.url } as never;
	};
	const spriteSlot = (id: string) => (slots[id]?.type === 'sprite' && slots[id]?.url ? slots[id] : undefined);

	// symbols
	const names = new Set(symbolNames(spec));
	if (spec.symbols.epicVariants) for (let i = 1; i <= Math.min(4, spec.symbols.high); i++) names.add(`E${i}`);
	for (const name of names) {
		addSprite(`symbol.${name}.static`, () => drawSymbolFallback(name));
	}

	const sheetFor = (name: string, stateSlot: string): { id: string; slot: ResolvedSlot } | undefined => {
		const tries = [`symbol.${name}.${stateSlot}`];
		const group = CLIP_GROUP(name);
		tries.push(`symbol.${group}.${stateSlot}`);
		for (const alias of CLIP_STATE_ALIASES[group] ?? []) {
			tries.push(`symbol.${name}.${alias}`, `symbol.${group}.${alias}`);
		}
		for (const id of tries) {
			const slot = slots[id];
			if (slot?.type === 'spriteSheet' && slot.url) return { id, slot };
		}
		return undefined;
	};

	const sheetIds = new Set<string>();
	const symbolVisualCache = new Map<string, SymbolVisual>();
	const symbolVisual = (name: string, state: SymbolState): SymbolVisual => {
		const cacheKey = `${name}|${state}`;
		const cached = symbolVisualCache.get(cacheKey);
		if (cached) return cached;
		let out: SymbolVisual;
		if (state === 'static' || state === 'postWinStatic') {
			out = { kind: 'sprite', key: `symbol.${name}.static` };
		} else {
			const found = sheetFor(name, STATE_SLOT[state]);
			if (found) {
				sheetIds.add(found.id);
				out = { kind: 'sheet', key: found.id, fps: found.slot.fps ?? 24, frames: found.slot.frames ?? 48, loop: !!found.slot.loop, filter: found.slot.filter };
			} else {
				const juiceSlot = slots[`symbol.${name}.${STATE_SLOT[state]}`];
				out = { kind: 'juice', preset: (juiceSlot?.type === 'juice' && (juiceSlot.preset as JuicePreset)) || DEFAULT_JUICE[state] };
			}
		}
		symbolVisualCache.set(cacheKey, out);
		return out;
	};

	// pre-register every clip the spec's symbols can play so the loader fetches them after "press to continue"
	for (const name of names) {
		for (const state of ['land', 'win'] as SymbolState[]) {
			const v = symbolVisual(name, state);
			if (v.kind === 'sheet') assets[v.key] = { type: 'spriteSheet', src: slots[v.key].url! };
		}
	}

	// scene and UI stills
	addSprite('bg.base.16x9', () => drawBackgroundFallback(spec.palette, false, false), true);
	addSprite('bg.base.9x16', () => drawBackgroundFallback(spec.palette, true, false), true);
	addSprite('bg.bonus.16x9', () => drawBackgroundFallback(spec.palette, false, true), true);
	addSprite('bg.bonus.9x16', () => drawBackgroundFallback(spec.palette, true, true), true);
	addSprite('board.cell', () => drawCellFallback(false));
	addSprite('board.cell_gold', () => drawCellFallback(true));
	addSprite('logo.game', () => drawLogoFallback(spec.name, spec.ui.accent), true);
	// the demo logo only stands in when the game has no logo of its own
	if (spriteSlot('logo.demo') && !spriteSlot('logo.game')) assets['logo.game'] = { type: 'sprite', src: spriteSlot('logo.demo')!.url!, preload: true };
	addSprite('mascot.master', () => drawMascotFallback(spec.ui.accent));
	if (spriteSlot('board.frame')) assets['board.frame'] = { type: 'sprite', src: spriteSlot('board.frame')!.url! };

	// mascot clips (lazy)
	for (const n of ['idle', 'anticipate', 'win_small', 'win_big', 'bonus_trigger', 'throw']) {
		const id = `mascot.${n}`;
		if (slots[id]?.type === 'spriteSheet' && slots[id].url) assets[id] = { type: 'spriteSheet', src: slots[id].url! };
	}
	for (const n of ['poof', 'upgrade']) {
		const id = `fx.${n}`;
		if (slots[id]?.type === 'spriteSheet' && slots[id].url) assets[id] = { type: 'spriteSheet', src: slots[id].url! };
	}
	void addSheet;

	const art: Art = {
		assets,
		slots,
		mode: hasAnyArt ? 'full' : 'code',
		has: (id) => Boolean(assets[id]),
		slot: (id) => slots[id],
		spriteKey: (id) => id,
		symbolStatic: (name) => `symbol.${name}.static`,
		symbolVisual,
		audioUrl: (id) => (slots[id]?.type === 'audio' ? slots[id].url : undefined),
		missing,
	};
	return art;
}
