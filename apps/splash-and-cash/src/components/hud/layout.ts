import { stateLayoutDerived } from '../../game/stateLayout';
import { stateGameDerived } from '../../game/stateGame.svelte';

// The HUD is drawn in reference units (a 390-wide phone, a 1440x900 desktop) and scaled to the canvas,
// so positions read like the Hacksaw screenshots they were measured from.
export const isPortraitHud = () => ['portrait', 'tablet'].includes(stateLayoutDerived.layoutType());

export const hudSpace = () => {
	const canvas = stateLayoutDerived.canvasSizes();
	const scale = isPortraitHud()
		? Math.min(canvas.width / 390, canvas.height / 700)
		: Math.min(canvas.width / 1440, canvas.height / 900);
	return { scale, width: canvas.width / scale, height: canvas.height / scale };
};

// Board rectangle in canvas pixels, for placing the logo and mascots around it.
export const boardOnCanvas = () => {
	const canvas = stateLayoutDerived.canvasSizes();
	const main = stateLayoutDerived.mainLayout();
	const board = stateGameDerived.boardLayout();
	const cx = canvas.width / 2 + (board.x - main.width / 2) * main.scale;
	const cy = canvas.height / 2 + (board.y - main.height / 2) * main.scale;
	const width = board.width * main.scale;
	const height = board.height * main.scale;
	return {
		left: cx - width / 2,
		right: cx + width / 2,
		top: cy - height / 2,
		bottom: cy + height / 2,
		width,
		height,
	};
};
