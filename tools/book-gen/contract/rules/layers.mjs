// Layers and dynamite (BOOK-EVENTS.md "Layers and dynamite")
import { oneOf, positions, position, coins, array, isObj, sub } from '../helpers.mjs';

const area = (list, c, key) =>
	list?.forEach((x, i) => {
		if (!isObj(x)) return c.fail(`${key}[${i}] must be an object`);
		const s = sub(c, `${key}[${i}].`);
		if (key === 'throws') position(x.target, s, 'target');
		else position(x.from, s, 'from');
		positions(x, s, 'area', { nonEmpty: true });
	});

export const rules = {
	layerBreak(e, c) {
		positions(e, c, 'positions', { nonEmpty: true });
		if (![1, 2, 3].includes(e.layer)) c.fail(`layer must be 1, 2 or 3, got ${JSON.stringify(e.layer)}`);
	},
	dynamite(e, c) {
		area(array(e, c, 'throws'), c, 'throws');
		area(array(e, c, 'chain', { optional: true }), c, 'chain');
	},
	layerReveal: (e, c) => coins(e, c, 'cells'),
};
