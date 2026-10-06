import type { LayoutPreset } from 'kit-spec';

// Layout presets (STUDIO-KIT-PLAN section 7). Pure functions: given the main design area of a layout
// type and the board size, return where the board, logo, mascot and counters go.
export type LayoutType = 'desktop' | 'tablet' | 'landscape' | 'portrait';

export type Box = { width: number; height: number };
export type Place = { x: number; y: number };

export type ComposeInput = {
	preset: LayoutPreset;
	layoutType: LayoutType;
	main: Box; // main design area (mainLayout().width/height)
	board: Box; // board size in design px (reels x cell, rows x cell)
	mascotSide: 'left' | 'right';
};

export type Composition = {
	board: Place & { scale: number };
	logo: Place & { width: number };
	mascot: Place & { height: number; visible: boolean };
	counters: Place; // free-spin / bonus counters, top edge of the board
	boardBox: { left: number; top: number; right: number; bottom: number }; // in main coordinates
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function compose(input: ComposeInput): Composition {
	const { preset, layoutType, main, board, mascotSide } = input;
	const portrait = layoutType === 'portrait';
	const side = mascotSide === 'left' ? -1 : 1;

	// board scale: portrait fills 92% of the width (but never more than 56% of the height);
	// desktop/landscape fill up to 64% of the height.
	let scale: number;
	let bx = main.width * 0.5;
	let by: number;
	if (portrait) {
		scale = Math.min((main.width * 0.92) / board.width, (main.height * 0.56) / board.height);
		by = main.height * 0.46;
	} else {
		scale = Math.min((main.height * 0.64) / board.height, (main.width * 0.58) / board.width);
		by = main.height * 0.52;
		if (preset === 'stage') bx = main.width * (0.5 - side * 0.12);
	}
	if (preset === 'classic') {
		scale = Math.min((main.width * 0.8) / board.width, (main.height * 0.7) / board.height);
		bx = main.width * 0.5;
		by = main.height * 0.5;
	}
	scale = clamp(scale, 0.3, 3);

	const w = board.width * scale;
	const h = board.height * scale;
	const boardBox = { left: bx - w / 2, top: by - h / 2, right: bx + w / 2, bottom: by + h / 2 };

	const logoW = portrait ? Math.min(main.width * 0.5, 440) : Math.min(main.width * 0.26, 420);
	const logo: Composition['logo'] = portrait
		? { x: main.width * 0.5, y: Math.max(logoW * 0.34, boardBox.top - logoW * 0.4), width: logoW }
		: { x: boardBox.left + logoW * 0.4, y: Math.max(logoW * 0.3, boardBox.top - logoW * 0.18), width: logoW };

	const mascotH = portrait ? main.height * 0.2 : main.height * (preset === 'stage' ? 0.72 : 0.5);
	const mascot: Composition['mascot'] = portrait
		? {
				x: side > 0 ? boardBox.right - mascotH * 0.2 : boardBox.left + mascotH * 0.2,
				y: boardBox.top - mascotH * 0.12,
				height: mascotH,
				visible: true,
			}
		: {
				x: side > 0 ? boardBox.right + mascotH * 0.34 : boardBox.left - mascotH * 0.34,
				y: boardBox.bottom - mascotH * 0.5,
				height: mascotH,
				visible: true,
			};

	return {
		board: { x: bx, y: by, scale },
		logo,
		mascot,
		counters: { x: bx, y: boardBox.top - 28 },
		boardBox,
	};
}
