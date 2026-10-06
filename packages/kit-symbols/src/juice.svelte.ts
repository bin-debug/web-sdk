import { Tween } from 'svelte/motion';
import { backOut, cubicOut, sineInOut } from 'svelte/easing';

import type { JuicePreset } from 'kit-assets';

// Programmatic animation for any still (STUDIO-KIT-PLAN section 8.1). One instance per symbol.
// Every play() resolves when the preset has finished, so it can drive `oncomplete`.
export function createJuice() {
	const scaleX = new Tween(1, { duration: 1 });
	const scaleY = new Tween(1, { duration: 1 });
	const rotation = new Tween(0, { duration: 1 });
	const alpha = new Tween(1, { duration: 1 });
	const glow = new Tween(0, { duration: 1 });
	const offsetY = new Tween(0, { duration: 1 });

	const to = (t: Tween<number>, v: number, duration: number, easing = cubicOut) => t.set(v, { duration, easing });
	const both = (sx: number, sy: number, duration: number, easing = cubicOut) =>
		Promise.all([to(scaleX, sx, duration, easing), to(scaleY, sy, duration, easing)]);

	const reset = () => {
		scaleX.set(1, { duration: 0 });
		scaleY.set(1, { duration: 0 });
		rotation.set(0, { duration: 0 });
		alpha.set(1, { duration: 0 });
		glow.set(0, { duration: 0 });
		offsetY.set(0, { duration: 0 });
	};

	async function play(preset: JuicePreset, opts: { cell?: number } = {}) {
		const cell = opts.cell ?? 100;
		switch (preset) {
			case 'bounce':
				await both(1.15, 1.15, 90);
				await both(0.92, 0.92, 90);
				await both(1, 1, 80, backOut);
				return;
			case 'squash':
			case 'squashShine':
				if (preset === 'squashShine') to(glow, 0.55, 90);
				await both(1.12, 0.78, 70);
				await both(0.95, 1.1, 90);
				await both(1, 1, 90, backOut);
				if (preset === 'squashShine') await to(glow, 0, 160);
				return;
			case 'pulse':
			case 'pulseGlow':
				for (let i = 0; i < 2; i++) {
					if (preset === 'pulseGlow') to(glow, 0.6, 180);
					await both(1.14, 1.14, 180, sineInOut);
					if (preset === 'pulseGlow') to(glow, 0, 180);
					await both(1, 1, 180, sineInOut);
				}
				return;
			case 'shake':
				for (let i = 0; i < 4; i++) {
					await to(rotation, i % 2 ? -0.06 : 0.06, 50);
				}
				await to(rotation, 0, 50);
				return;
			case 'wiggle':
				await to(rotation, 0.07, 120, sineInOut);
				await to(rotation, -0.07, 240, sineInOut);
				await to(rotation, 0, 120, sineInOut);
				return;
			case 'pop':
				scaleX.set(0, { duration: 0 });
				scaleY.set(0, { duration: 0 });
				await both(1.2, 1.2, 140);
				await both(1, 1, 110, backOut);
				return;
			case 'popShine':
				scaleX.set(0, { duration: 0 });
				scaleY.set(0, { duration: 0 });
				to(glow, 0.6, 120);
				await both(1.2, 1.2, 140);
				await Promise.all([both(1, 1, 110, backOut), to(glow, 0, 220)]);
				return;
			case 'shine':
			case 'flash':
				await to(glow, 0.8, 80);
				await to(glow, 0, 160);
				return;
			case 'float':
				await to(offsetY, -cell * 0.05, 700, sineInOut);
				await to(offsetY, 0, 700, sineInOut);
				return;
			case 'settle':
				await both(1.04, 1.04, 80);
				await both(1, 1, 120);
				return;
			case 'shakeFlash':
				to(glow, 0.7, 120);
				for (let i = 0; i < 5; i++) await to(rotation, i % 2 ? -0.08 : 0.08, 45);
				await Promise.all([to(rotation, 0, 45), to(glow, 0, 200)]);
				return;
			case 'crackPoof':
			case 'poofShrink':
				to(rotation, 0.35, 240);
				await Promise.all([both(0.05, 0.05, 240), to(alpha, 0, 240)]);
				return;
			case 'dim30':
				await to(alpha, 0.3, 120);
				return;
			default:
				return;
		}
	}

	return { scaleX, scaleY, rotation, alpha, glow, offsetY, play, reset };
}

export type Juice = ReturnType<typeof createJuice>;
