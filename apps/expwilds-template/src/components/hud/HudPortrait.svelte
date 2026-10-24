<script lang="ts">
	import { Container } from 'pixi-svelte';

	import HudButton from './HudButton.svelte';
	import HudSpin from './HudSpin.svelte';
	import HudBuyBonus from './HudBuyBonus.svelte';
	import HudAmount from './HudAmount.svelte';
	import { createHud } from './hudState.svelte';
	import { hudSpace } from './layout';
	import { iconAutoplay, iconMenu, iconMinus, iconPlus, iconTurbo } from './icons';

	// Hacksaw phone layout: big spin in the middle with -/+ either side, buy bonus left,
	// menu and autoplay in the bottom corners, balance / bet / win as small text along the bottom.
	const hud = createHud();
	const space = $derived(hudSpace());
	const cx = $derived(space.width / 2);
	const bottom = $derived(space.height);
</script>

<Container scale={space.scale}>
	<HudSpin x={cx} y={bottom - 122} size={104} />
	<HudButton x={cx - 84} y={bottom - 122} size={46} icon={iconMinus} disabled={!hud.canDecrease()} onpress={hud.decrease} />
	<HudButton x={cx + 84} y={bottom - 122} size={46} icon={iconPlus} disabled={!hud.canIncrease()} onpress={hud.increase} />

	<HudBuyBonus x={38} y={bottom - 150} size={60} />
	<HudButton
		x={space.width - 34}
		y={bottom - 150}
		size={48}
		icon={iconTurbo(hud.turboActive())}
		onpress={hud.turbo}
	/>

	<HudButton x={28} y={bottom - 50} size={44} icon={iconMenu} onpress={hud.menu} />
	<HudButton
		x={space.width - 28}
		y={bottom - 50}
		size={48}
		icon={iconAutoplay(hud.autoplayActive())}
		disabled={hud.autoplayDisabled()}
		onpress={hud.autoplay}
	/>

	<HudAmount x={cx - 100} y={bottom - 44} size={14} {...hud.balance()} />
	<HudAmount x={cx} y={bottom - 44} size={14} {...hud.bet()} onpress={hud.openBetMenu} />
	<HudAmount x={cx + 100} y={bottom - 44} size={14} {...hud.win()} />
</Container>
