<script lang="ts">
	import { Container, Rectangle } from 'pixi-svelte';

	import HudButton from './HudButton.svelte';
	import HudSpin from './HudSpin.svelte';
	import HudBuyBonus from './HudBuyBonus.svelte';
	import HudAmount from './HudAmount.svelte';
	import { createHud } from './hudState.svelte';
	import { hudSpace } from './layout';
	import { iconAutoplay, iconChevron, iconMenu, iconTurbo } from './icons';

	// Hacksaw desktop layout: one slim dark bar under the board (menu, balance, win, bet box with
	// up/down, big spin overlapping the bar, autoplay) and the buy bonus disc to its left.
	const hud = createHud();
	const space = $derived(hudSpace());
	const cx = $derived(space.width / 2);
	const barY = $derived(space.height - 64);
</script>

<Container scale={space.scale}>
	<Rectangle
		x={cx}
		y={barY}
		anchor={0.5}
		width={940}
		height={84}
		borderRadius={8}
		backgroundColor={0x111111}
		backgroundAlpha={0.85}
	/>

	<HudButton x={cx - 430} y={barY} size={52} icon={iconMenu} onpress={hud.menu} />
	<HudAmount x={cx - 385} y={barY} size={22} align="left" {...hud.balance()} />
	<HudAmount x={cx - 90} y={barY} size={22} {...hud.win()} />
	<HudButton x={cx + 40} y={barY} size={52} icon={iconTurbo(hud.turboActive())} onpress={hud.turbo} />

	<Rectangle
		x={cx + 80}
		y={barY}
		anchor={{ x: 0, y: 0.5 }}
		width={190}
		height={66}
		borderRadius={6}
		backgroundColor={0x000000}
		backgroundAlpha={0.55}
		borderColor={0x3a3a3a}
		borderWidth={2}
	/>
	<HudAmount x={cx + 96} y={barY} size={22} align="left" {...hud.bet()} onpress={hud.openBetMenu} />
	<HudButton x={cx + 246} y={barY - 16} size={32} icon={iconChevron('up')} disabled={!hud.canIncrease()} onpress={hud.increase} />
	<HudButton x={cx + 246} y={barY + 16} size={32} icon={iconChevron('down')} disabled={!hud.canDecrease()} onpress={hud.decrease} />

	<HudSpin x={cx + 335} y={barY - 4} size={124} />
	<HudButton
		x={cx + 430}
		y={barY}
		size={54}
		icon={iconAutoplay(hud.autoplayActive())}
		disabled={hud.autoplayDisabled()}
		onpress={hud.autoplay}
	/>

	<HudBuyBonus x={cx - 548} y={barY} size={100} />
</Container>
