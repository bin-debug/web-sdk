const DEFAULT_BET_MODE_META = {
	BASE: {
		mode: 'BASE',
		costMultiplier: 1.0,
		type: 'default',
		parent: '',
		children: '',
		assets: {
			icon: '',
			dialogImage: '',
			dialogVolatility: '',
			volatility: '',
			button: '',
		},
		text: {
			title: '',
			dialog: '',
			button: '',
			betAmountLabel: '',
			tickerIdle: '',
			tickerSpin: '',
			bannerText: '',
		},
		maxWin: 8888,
	},
	ANTE: {
		mode: 'ANTE',
		costMultiplier: 1.2,
		type: 'activate',
		parent: '',
		children: '',
		assets: {
			icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCA4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTQiIGZpbGw9IiMxYTFhMmUiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM0ZWNkYzQiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yNiA1MCBMNDAgMzAgTDU0IDUwIi8+PHBhdGggZD0iTTI2IDYyIEw0MCA0MiBMNTQgNjIiLz48bGluZSB4MT0iNDAiIHkxPSIxOCIgeDI9IjQwIiB5Mj0iMzAiLz48cG9seWxpbmUgcG9pbnRzPSIzNCwyNCA0MCwxOCA0NiwyNCIvPjwvZz48L3N2Zz4=',
			dialogImage:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/doubleboost_image.webp',
			dialogVolatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_01.webp',
			volatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_white_01.webp',
			button:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/button_activate.webp',
			bannerText: 'example banner text',
		},
		text: {
			title: 'DOUBLE BOOST',
			dialog:
				'Double the chance to trigger the FREE SPINS round when activated for 1.2x the player bet amount. DOUBLE BOOST remains active until disabled by the player.',
			description: 'Greatly increase your chance of landing a bonus symbol each spin.',
			button: 'ACTIVATE',
			betAmountLabel: 'DOUBLE BOOST',
			tickerIdle: 'DOUBLE BOOST IS ACTIVE',
			tickerSpin: 'GOOD LUCK',
			bannerText: 'example banner text',
		},
	},
	SUPERANTE: {
		mode: 'SUPERANTE',
		costMultiplier: 5,
		type: 'activate',
		parent: '',
		children: '',
		assets: {
			icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCA4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTQiIGZpbGw9IiMxYTFhMmUiLz48cG9seWdvbiBwb2ludHM9IjQwLDEyIDQ3LDMyIDY4LDMyIDUyLDQ2IDU4LDY2IDQwLDU0IDIyLDY2IDI4LDQ2IDEyLDMyIDMzLDMyIiBmaWxsPSIjZjVhNTI0IiBmaWxsLW9wYWNpdHk9IjAuMjUiIHN0cm9rZT0iI2Y1YTUyNCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+',
			dialogImage:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/superboost_image.webp',
			dialogVolatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_02.webp',
			volatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_white_02.webp',
			button:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/button_activate.webp',
		},
		text: {
			title: 'SUPER BOOST',
			dialog:
				'1 in 20 chance to trigger the FREE SPINS round when activated for 5x the player bet amount. Guarantees 1 or more Scatter symbols every spin. SUPER BOOST remains active until disabled by the player.',
			description: 'Guaranteed to land at least 1+ bonus symbol each spin.',
			button: 'ACTIVATE',
			betAmountLabel: 'SUPER BOOST',
			tickerIdle: 'SUPER BOOST IS ACTIVE',
			tickerSpin: 'GOOD LUCK',
			bannerText: 'example banner text',
		},
	},
	SUPERSPIN: {
		mode: 'SUPERSPIN',
		costMultiplier: 25,
		type: 'activate',
		parent: '',
		children: '',
		assets: {
			icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCA4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTQiIGZpbGw9IiMxYTFhMmUiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNlNzRjM2MiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0xOCA0MiBDMTggMjcgMjkgMTYgNDQgMTcgTDQ0IDEyIEw1NCAyMiBMNDQgMzIgTDQ0IDI3IEMzMyAyNiAyNCAzNCAyNCA0NiIvPjxwYXRoIGQ9Ik02MiAzOCBDNjIgNTMgNTEgNjQgMzYgNjMgTDM2IDY4IEwyNiA1OCBMMzYgNDggTDM2IDUzIEM0NyA1NCA1NiA0NiA1NiAzNCIvPjwvZz48L3N2Zz4=',
			dialogImage:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/superspin_image.webp',
			dialogVolatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_03.webp',
			volatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_white_03.webp',
			button:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/button_activate.webp',
		},
		text: {
			title: 'SAMURAI SPIN',
			dialog:
				'All game features are boosted when activated for 25x the player bet amount. SAMURAI SPIN remains active until disabled by the player.',
			description: 'SAMURAI SPIN is AWESOME! ',
			button: 'ACTIVATE',
			betAmountLabel: 'SAMURAI SPIN',
			tickerIdle: 'SAMURAI SPIN IS ACTIVE',
			tickerSpin: 'GOOD LUCK',
			bannerText: 'example banner text',
		},
	},
	BONUS: {
		mode: 'BONUS',
		costMultiplier: 100,
		type: 'buy',
		parent: '',
		children: '',
		assets: {
			icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCA4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTQiIGZpbGw9IiMxYTFhMmUiLz48ZyBzdHJva2U9IiM5YjU5YjYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIxNiIgeT0iMzMiIHdpZHRoPSI0OCIgaGVpZ2h0PSIxMCIgcng9IjMiIGZpbGw9IiM5YjU5YjYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PHJlY3QgeD0iMjAiIHk9IjQzIiB3aWR0aD0iNDAiIGhlaWdodD0iMjUiIHJ4PSIzIiBmaWxsPSIjOWI1OWI2IiBmaWxsLW9wYWNpdHk9IjAuMTIiLz48bGluZSB4MT0iNDAiIHkxPSIzMyIgeDI9IjQwIiB5Mj0iNjgiIHN0cm9rZT0iIzliNTliNiIvPjxwYXRoIGQ9Ik00MCAzMyBDNDAgMzMgMjggMzIgMjcgMjUgQzI2IDE4IDMzIDE0IDQwIDI0IiBmaWxsPSIjOWI1OWI2IiBmaWxsLW9wYWNpdHk9IjAuMjUiIHN0cm9rZT0iIzliNTliNiIvPjxwYXRoIGQ9Ik00MCAzMyBDNDAgMzMgNTIgMzIgNTMgMjUgQzU0IDE4IDQ3IDE0IDQwIDI0IiBmaWxsPSIjOWI1OWI2IiBmaWxsLW9wYWNpdHk9IjAuMjUiIHN0cm9rZT0iIzliNTliNiIvPjwvZz48L3N2Zz4=',
			dialogImage:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/bonus_image.webp',
			dialogVolatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_04.webp',
			volatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_white_04.webp',
			button:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_8_97/betModes/button_buy.webp',
		},
		text: {
			title: 'BONUS',
			dialog:
				'Triggers FREE SPINS feature when activated for 100x the player bet amount. The Global Multiplier can reach up to 64x and remains active for the duration of FREE SPINS.',
			description: 'Each spin may have a random multiplier applied to winning lines.',
			button: 'BUY',
			tickerIdle: 'PLACE YOUR BET',
			tickerSpin: 'BONUS BUY ACTIVATED',
			bannerText: 'example banner text',
		},
	},
	SUPER: {
		mode: 'SUPER',
		costMultiplier: 200,
		type: 'buy',
		parent: '',
		children: '',
		assets: {
			icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCA4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTQiIGZpbGw9IiMxYTFhMmUiLz48ZyBzdHJva2U9IiNmNWE1MjQiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCA2MiBMMzAgMzAgTDQwIDEyIEw1MCAzMCBMNjAgNjIgWiIgZmlsbD0iI2Y1YTUyNCIgZmlsbC1vcGFjaXR5PSIwLjEyIi8+PGxpbmUgeDE9IjIwIiB5MT0iNDYiIHgyPSI2MCIgeTI9IjQ2IiBzdHJva2U9IiNmNWE1MjQiLz48cG9seWdvbiBwb2ludHM9IjQwLDE4IDQzLjUsMjggNTQsMjggNDUuNSwzNCA0OC41LDQ0IDQwLDM4IDMxLjUsNDQgMzQuNSwzNCAyNiwyOCAzNi41LDI4IiBmaWxsPSIjZjVhNTI0IiBmaWxsLW9wYWNpdHk9IjAuNTUiIHN0cm9rZT0iI2Y1YTUyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L2c+PC9zdmc+',
			dialogImage:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/superbonus_image.webp',
			dialogVolatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_05.webp',
			volatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_white_05.webp',
			button:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_8_97/betModes/button_buy.webp',
		},
		text: {
			title: 'SUPER BONUS',
			dialog:
				'Triggers FREE SPINS feature when activated for 200x the player bet amount. The Global Multiplier can reach up to 256x and remains active for the duration of FREE SPINS.',
			description: 'Enter the mothership! Land values and multiply them with action symbols.',
			button: 'BUY',
			tickerIdle: 'PLACE YOUR BET',
			tickerSpin: 'SUPER BONUS BUY ACTIVATED',
			bannerText: 'example banner text',
		},
	},
};

const DEFAULT_GAME_RULE_META = {
	payTable: [
		{
			containers: [
				{
					title: 'WILD SYMBOL',
					text: 'The Wild symbol substitutes all other symbols except Scatter.',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 0,
				},
				{
					title: 'FREE SPINS',
					text: 'Scatter Symbols are on all reels. If at least 3 Scatters land in a spin sequence, FREE SPINS is triggered. 3 Scatters award 8 FREE SPINS. 4 Scatters award 12 FREE SPINS. 5 Scatters award 16 FREE SPINS. ',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 1,
					column: 0,
				},
				{
					title: 'FREE SPINS RETRIGGER',
					text: 'During FREE SPINS, Scatter Symbols are on all reels. If at least 3 Scatters land in a spin sequence, additional FREE SPINS rounds are triggered. 3 Scatters award 4 additional FREE SPINS. 4 Scatters award 6 additional FREE SPINS. 5 Scatters award 8 additional FREE SPINS. ',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 2,
					column: 0,
				},
			],
			rows: 3,
			columns: 1,
			title: 'PAYTABLE',
		},
		{
			containers: [
				{
					title: '',
					text: '5	|	10x\n4	|	5x\n3	|	2x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 0,
				},
				{
					title: '',
					text: '5	|	5x\n4	|	2x\n3	|	1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 1,
				},
				{
					title: '',
					text: '5	|	5x\n4	|	2x\n3	|	1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 2,
				},
				{
					title: '',
					text: '5	|	3x\n4	|	1x\n3	|	0.5x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 1,
					column: 0,
				},
				{
					title: '',
					text: '5	|	3x\n4	|	1x\n3	|	0.5x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 1,
					column: 1,
				},
				{
					title: '',
					text: '5	|	2x\n4	|	0.8x\n3	|	0.4x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 3,
					column: 0,
				},
				{
					title: '',
					text: '5	|	2x\n4	|	0.8x\n3	|	0.4x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 3,
					column: 1,
				},
				{
					title: '',
					text: '5	|	1.5x\n4	|	0.5x\n3	|	0.2x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 3,
					column: 2,
				},
				{
					title: '',
					text: '5	|	1.5x\n4	|	0.5x\n3	|	0.2x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 4,
					column: 0,
				},
				{
					title: '',
					text: '5	|	1x\n4	|	0.3x\n3	|	0.1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 4,
					column: 1,
				},
				{
					title: '',
					text: '5	|	1x\n4	|	0.3x\n3	|	0.1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 4,
					column: 2,
				},
			],
			rows: 5,
			columns: 3,
			title: 'SYMBOLS',
		},
		{
			containers: [
				{
					title: '',
					text: 'All symbols pay from left to right. Starting from the left most reel. Only symbols on adjacent reels will be a valid win way. This does not apply to Scatter. ',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/winWays.be45a8a4.png',
					imagePosition: 'top',
					row: 0,
					column: 0,
				},
			],
			rows: 1,
			columns: 1,
			title: 'WIN WAYS',
		},
	],
	gameRules: [
		{
			containers: [
				{
					title: '',
					text: 'The normal mode of this game has a theoretical expected return of 97.0%.\n\nThe player also has the option to select an ANTE BET mode. This costs 1.25x the underlying bet. The ANTE BET mode has a theoretical expected return of 97.0%. The ANTE BET doubles the chance of FREE SPINS.\n\nThe player also has the option to buy FREE SPINS. This costs 100x the underlying bet. The FREE SPINS buy mode has a theoretical expected return of 97.0%. \n\nThe player has the option to buy a SUPER SPIN. This costs 25x the underlying bet. The SUPER SPIN buy mode has a theoretical expected return of 97.0%. In SUPER SPIN one spin is initially awarded. On each spin stacked Wild Symbols are on Reel Strips\n\n The maximum win in each Bet Mode is 5000x the underlining bet.',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/rtp97.d2febd7d.svg',
					imagePosition: 'top',
					row: 0,
					column: 0,
				},
			],
			rows: 1,
			columns: 1,
			title: 'BET MODES',
		},
		{
			containers: [
				{
					title: '',
					text: 'Malfunction voids all pays and plays. A consistent internet connection is required. In the event of a disconnection, reload the game to finish any uncompleted bets. The theoretical expected return is calculated over many spins. Movement of reels are not representative of any physical device, and is for illustrative purposes only. TM and \u00a9 2023 Twist Gaming.',
					image: '',
					row: 0,
					column: 0,
				},
			],
			rows: 1,
			columns: 1,
			title: 'LEGAL NOTICE',
		},
		{
			containers: [
				{
					title: '',
					text: 'SPIN BUTTON | Initiates the Betting Round.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleSpin.daacc43a.webp',
					imagePosition: 'left',
					row: 0,
					column: 0,
				},
				{
					title: '',
					text: 'STOP BUTTON | Stops the current Spin.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleStop.30db74c5.webp',
					imagePosition: 'left',
					row: 1,
					column: 0,
				},
				{
					title: '',
					text: 'INFORMATION | Provides Game Information.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 2,
					column: 0,
				},
				{
					title: '',
					text: 'SETTINGS | Adjust Game Settings.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 4,
					column: 0,
				},
				{
					title: '',
					text: 'PAY TABLE | View the Paytable to see Symbol Values.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 6,
					column: 0,
				},
				{
					title: '',
					text: 'AUTO SPIN | Open the Auto Spin pop-up menu.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleAutoSpin.d542a3b0.webp',
					imagePosition: 'left',
					row: 7,
					column: 0,
				},

				{
					title: '',
					text: 'TURBO | Activate Turbo Mode.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleTurbo.a0fcfd04.webp',
					imagePosition: 'left',
					row: 9,
					column: 0,
				},
				{
					title: '',
					text: 'MENU | Expands the Sidebar Menu for more Options.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 10,
					column: 0,
				},
				{
					title: '',
					text: 'CLOSE | Exit the pop-up menu.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 11,
					column: 0,
				},
				{
					title: '',
					text: 'SOUND | Mute or Unmute Game Audio.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 12,
					column: 0,
				},
				{
					title: '',
					text: 'INCREASE | Increase your Bet Amount',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 13,
					column: 0,
				},
				{
					title: '',
					text: 'DECREASE | Decrease your Bet Amount',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 14,
					column: 0,
				},
			],
			rows: 16,
			columns: 1,
			title: 'USER INTERFACE GUIDE',
		},
	],
	splashScreen: [],
};

export { DEFAULT_BET_MODE_META, DEFAULT_GAME_RULE_META };
