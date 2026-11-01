// Shared look for the custom (non-template) UI: colours, text style, and whether the bonus look is on.
// The transition flips `bonus` while the screen is covered, so the background and effects swap unseen.

export const FX = {
	red: 0x3fcf5e,
	yellow: 0xf7c23a,
	panel: 0x12271b,
	edge: 0xf2b630,
	redCss: '#3FCF5E',
	yellowCss: '#F7C23A',
};

export const fx = $state({
	bonus: false,
	/** set when the free-spins outro shows, so the next transition leaves the bonus look */
	pendingExit: false,
});

/** Chunky Hacksaw-style text: heavy face, thick black outline, hard shadow down-right. */
export const fxText = (size: number, fill: string = '#ffffff') => ({
	fontFamily: '"Arial Black", "Arial Bold", Arial, sans-serif',
	fontWeight: '900' as const,
	fontSize: size,
	fill,
	align: 'center' as const,
	letterSpacing: size * 0.02,
	stroke: { color: '#000000', width: Math.max(3, size * 0.16), join: 'round' as const },
	dropShadow: { color: '#000000', alpha: 1, angle: Math.PI / 4, distance: Math.max(2, size * 0.09), blur: 0 },
});
