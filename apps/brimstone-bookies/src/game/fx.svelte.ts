// Shared look for the custom (non-template) UI: colours, text style, and whether the bonus look is on.
// The transition flips `bonus` while the screen is covered, so the background and effects swap unseen.

export const FX = {
	red: 0xe1121b,
	yellow: 0xffd400,
	panel: 0x181818,
	edge: 0x9a9a9a,
	redCss: '#E1121B',
	yellowCss: '#FFD400',
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
