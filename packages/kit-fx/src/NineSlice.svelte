<script lang="ts">
	import * as PIXI from 'pixi.js';

	import { getContextApp, getContextParent, propsSyncEffect } from 'pixi-svelte';

	// A 9-slice sprite for frames (manifest `slice` insets are in texture pixels).
	type Props = {
		key: string;
		x?: number;
		y?: number;
		width: number;
		height: number;
		anchor?: number;
		inset: { left: number; top: number; right: number; bottom: number };
		zIndex?: number;
		alpha?: number;
		border?: number; // on-screen border thickness; the insets are scaled down to it
	};

	const props: Props = $props();
	const app = getContextApp();
	const parent = getContextParent();

	const texture = $derived((app.stateApp.loadedAssets?.[props.key] as PIXI.Texture) ?? PIXI.Texture.EMPTY);
	const node = new PIXI.NineSliceSprite({ texture: PIXI.Texture.EMPTY, leftWidth: props.inset.left, topHeight: props.inset.top, rightWidth: props.inset.right, bottomHeight: props.inset.bottom });

	$effect(() => {
		node.texture = texture;
		node.leftWidth = props.inset.left;
		node.topHeight = props.inset.top;
		node.rightWidth = props.inset.right;
		node.bottomHeight = props.inset.bottom;
		const sc = props.border ? props.border / props.inset.left : 1;
		node.scale.set(sc);
		node.width = props.width / sc;
		node.height = props.height / sc;
		const a = props.anchor ?? 0;
		node.pivot.set(a * node.width, a * node.height);
		node.x = (props.x ?? 0);
		node.y = (props.y ?? 0);
		node.alpha = props.alpha ?? 1;
		node.zIndex = props.zIndex ?? 0;
	});
	void propsSyncEffect;

	parent.addToParent(node);
</script>
