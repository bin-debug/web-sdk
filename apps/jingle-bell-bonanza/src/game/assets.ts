export default {
	// Symbols are static sprites (symbolsStatic; getSymbolInfo never picks a Spine), so the
	// template's symbol Spines aren't loaded.
	// lazy: bonus, big-win and cheer art loads in the background after the game is playable;
	// the book handlers wait for it (stateApp.lazyAssetsReady) before showing any of it.
	// mascot idle loads with the game assets, not before the loading screen
	mascotIdle: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/mascot/idle.json', import.meta.url).href,
	},
	mascotCheer: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/mascot/cheer.json', import.meta.url).href,
		lazy: true,
	},
	snowDot: {
		type: 'sprite' as const,
		src: new URL('../../assets/sprites/fx/snow-dot.webp', import.meta.url).href,
	},
	snowCrystal: {
		type: 'sprite' as const,
		src: new URL('../../assets/sprites/fx/snow-crystal.webp', import.meta.url).href,
	},
	frost: {
		type: 'sprite' as const,
		src: new URL('../../assets/sprites/fx/frost.webp', import.meta.url).href,
	},
	bgDesktop: {
		type: 'sprite' as const,
		src: new URL('../../assets/sprites/game/bg-desktop.webp', import.meta.url).href,
		preload: true,
	},
	bgMobile: {
		type: 'sprite' as const,
		src: new URL('../../assets/sprites/game/bg-mobile.webp', import.meta.url).href,
		preload: true,
	},
	reelFrame: {
		type: 'sprite' as const,
		src: new URL('../../assets/sprites/game/frame.webp', import.meta.url).href,
		preload: true,
	},
	bgFrame: {
		type: 'sprite' as const,
		src: new URL('../../assets/sprites/game/bg-frame.webp', import.meta.url).href,
		preload: true,
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	goldFont: {
		type: 'font',
		src: new URL('../../assets/fonts/goldFont/mm_gold.xml', import.meta.url).href,
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
		lazy: true,
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url).href,
			scale: 2,
		},
		lazy: true,
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
		lazy: true,
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
		lazy: true,
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
		lazy: true,
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	freeSpins: {
		type: 'sprites',
		src: new URL('../../assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
		lazy: true,
	},
	winSmall: {
		type: 'sprites',
		src: new URL('../../assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url).href,
		lazy: true,
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
		lazy: true,
	},
	// "press anywhere" under the big-win and free-spins screens
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url).href,
		lazy: true,
	},
	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsStatic/symbolsStatic-r1.json', import.meta.url).href,
		preload: true,
	},
	coins: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
		lazy: true,
	},
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
	// bonus and big-win music: only its sprite map loads here; Howler fetches the audio after the
	// base sounds have loaded (utils-sound createHowlGroup)
	soundBonus: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds-bonus.json', import.meta.url).href,
		preload: true,
	},
} as const;
