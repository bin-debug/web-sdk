import { untrack } from 'svelte';
import WebFont from 'webfontloader';

import type { PixiPoint, Sizes } from './types';

export const REM = 16;
export const MIN_CLICKABLE_SIZE = 3 * REM; // 44 x 44 is minimum clickable size

export const getPointValues = ({
	point,
	defaultValue,
}: {
	point: PixiPoint;
	defaultValue: number;
}) => {
	const finalDefaultValue = defaultValue === undefined ? 0 : defaultValue;
	if (typeof point === 'number') return [point, point];
	return [point?.x || finalDefaultValue, point?.y || finalDefaultValue];
};

export const anchorToPivot = ({ anchor, sizes }: { anchor: PixiPoint; sizes: Sizes }) => {
	const { width, height } = sizes;
	const [anchorX, anchorY] = getPointValues({ point: anchor, defaultValue: 0 });
	return { x: width * anchorX, y: height * anchorY };
};

/**
 * Detects if WebGL is enabled.
 * Inspired from http://www.browserleaks.com/webgl#howto-detect-webgl
 *
 * @return { number } -1 for not Supported,
 *										0 for disabled
 *										1 for enabled
 */
export function detectWebGL() {
	// Check for the WebGL rendering context
	if (window && !!window.WebGLRenderingContext) {
		let canvas = document.createElement('canvas'),
			names = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'],
			context = false;

		for (const i in names) {
			try {
				// @ts-ignore
				context = canvas.getContext(names[i]);
				// @ts-ignore
				if (context && typeof context.getParameter === 'function') {
					// WebGL is enabled.
					return 1;
				}
			} catch (e) {}
		}

		// WebGL is supported, but disabled.
		return 0;
	}

	// WebGL not supported.
	return -1;
}

export const preloadFont = () =>
	new Promise<void>((resolve) => {
		try {
			WebFont.load({
				typekit: {
					id: 'aba0ebl',
				},
				active: () => {
					resolve();
				},
				inactive: () => {
					console.error('Web font load inactive');
					resolve();
				},
			});
		} catch (error) {
			console.error(error);
			resolve();
		}
	});

// Props whose effect depends on each other (a sprite's width is a scale worked out from its
// texture; a text's width from its text and style). They are re-applied together, in prop order.
const LINKED_KEYS = ['texture', 'textures', 'text', 'style', 'resolution', 'width', 'height', 'scale'];

export function propsSyncEffect<TProps extends object, TTarget>({
	props,
	target,
	ignore,
}: {
	props: TProps;
	target?: TTarget | (() => TTarget);
	ignore?: (keyof TProps)[];
}) {
	type Key = keyof TProps;
	// skipSame: a spread re-runs every key's effect when any value changes; don't re-set
	// unchanged numbers/strings/booleans (pixi marks the object dirty on every set).
	const apply = (keys: Key[], skipSame = false) => {
		const targetInstance = target instanceof Function ? target() : target;
		if (!targetInstance) return;
		for (const key of keys) {
			const value = props[key];
			if (value === undefined) continue;
			// @ts-ignore
			if (skipSame && typeof value !== 'object' && targetInstance[key] === value) continue;
			// @ts-ignore
			targetInstance[key] = value;
		}
	};

	// One effect per prop (plus one for the linked group), so a change to x re-applies x only.
	// Re-applying every prop on any change ran Object.keys on the props proxy and every getter,
	// for every component, every time one value changed: with per-frame animation that was most
	// of the game's CPU time on phones. The keys are read once: a component's attributes are
	// fixed by its markup (reading them in an effect re-runs on every value change of a spread).
	const keys = untrack(() => (Object.keys(props) as Key[]).filter((key) => !ignore?.includes(key)));
	const linked = keys.filter((key) => LINKED_KEYS.includes(key as string));
	let linkedDone = false;
	for (const key of keys) {
		if (linked.includes(key)) {
			if (linkedDone) continue;
			linkedDone = true;
			$effect(() => apply(linked));
		} else {
			$effect(() => apply([key], true));
		}
	}
}
