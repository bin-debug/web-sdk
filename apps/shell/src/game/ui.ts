import { SPEC } from './spec';

export const ACCENT = parseInt(SPEC.ui.accent.slice(1), 16);
export const DARK = parseInt(SPEC.palette[0].slice(1), 16);
export const FONT = 'proxima-nova, system-ui, sans-serif';

// Code-drawn UI text: bold, outlined, readable on any art.
export const textStyle = (fontSize: number, fill: number = 0xffffff, outline = 0x1a1226, extra: Record<string, unknown> = {}) => ({
	fontFamily: FONT,
	fontWeight: '800',
	fontSize,
	fill,
	stroke: { color: outline, width: Math.max(3, fontSize * 0.12) },
	align: 'center',
	...extra,
});
