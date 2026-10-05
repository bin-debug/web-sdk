export default [
	{
		"id": 1,
		"payoutMultiplier": 0.2,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					35,
					50,
					185,
					118,
					99
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 6
			},
			{
				"type": "setWin",
				"amount": 20,
				"winLevel": 2,
				"index": 7
			},
			{
				"type": "setTotalWin",
				"amount": 20,
				"index": 8
			},
			{
				"type": "finalWin",
				"amount": 20,
				"index": 9
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 2,
		"payoutMultiplier": 0.2,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					200,
					183,
					39,
					56,
					170
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 4,
								"row": 2
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H1"
						}
					],
					[],
					[
						{
							"name": "H1"
						}
					],
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 6
			},
			{
				"type": "setWin",
				"amount": 20,
				"winLevel": 2,
				"index": 7
			},
			{
				"type": "setTotalWin",
				"amount": 20,
				"index": 8
			},
			{
				"type": "finalWin",
				"amount": 20,
				"index": 9
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 3,
		"payoutMultiplier": 0.3,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "W"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					105,
					182,
					85,
					184,
					1
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 0,
								"row": 5
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						}
					],
					[],
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					},
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 6
			},
			{
				"type": "setWin",
				"amount": 30,
				"winLevel": 2,
				"index": 7
			},
			{
				"type": "setTotalWin",
				"amount": 30,
				"index": 8
			},
			{
				"type": "finalWin",
				"amount": 30,
				"index": 9
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 4,
		"payoutMultiplier": 0.1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					78,
					143,
					168,
					82,
					24
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "setWin",
				"amount": 10,
				"winLevel": 2,
				"index": 4
			},
			{
				"type": "setTotalWin",
				"amount": 10,
				"index": 5
			},
			{
				"type": "finalWin",
				"amount": 10,
				"index": 6
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 5,
		"payoutMultiplier": 0.2,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					194,
					28,
					137,
					143,
					73
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L3",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						}
					],
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 3
			},
			{
				"type": "setWin",
				"amount": 20,
				"winLevel": 2,
				"index": 4
			},
			{
				"type": "setTotalWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "finalWin",
				"amount": 20,
				"index": 6
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 6,
		"payoutMultiplier": 0.1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					68,
					97,
					113,
					102,
					200
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "setWin",
				"amount": 10,
				"winLevel": 2,
				"index": 4
			},
			{
				"type": "setTotalWin",
				"amount": 10,
				"index": 5
			},
			{
				"type": "finalWin",
				"amount": 10,
				"index": 6
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 7,
		"payoutMultiplier": 0.8,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					116,
					188,
					38,
					38,
					127
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L3",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 5
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "W"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					},
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "W"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					},
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 12
			},
			{
				"type": "setWin",
				"amount": 80,
				"winLevel": 2,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 80,
				"index": 14
			},
			{
				"type": "finalWin",
				"amount": 80,
				"index": 15
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 8,
		"payoutMultiplier": 26.3,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "W"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					56,
					104,
					117,
					14,
					181
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 9
			},
			{
				"type": "coinReelExpand",
				"reel": 1,
				"coins": [
					{
						"row": 1,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 2,
						"tier": "silver",
						"value": 800
					},
					{
						"row": 3,
						"tier": "silver",
						"value": 500
					},
					{
						"row": 4,
						"tier": "bronze",
						"value": 200
					},
					{
						"row": 5,
						"tier": "silver",
						"value": 800
					}
				],
				"index": 10
			},
			{
				"type": "coinReelCollect",
				"reel": 1,
				"total": 2600,
				"multiplier": 1,
				"pot": 0,
				"index": 11
			},
			{
				"type": "updateTumbleWin",
				"amount": 2630,
				"index": 12
			},
			{
				"type": "setWin",
				"amount": 2630,
				"winLevel": 6,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 2630,
				"index": 14
			},
			{
				"type": "finalWin",
				"amount": 2630,
				"index": 15
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 9,
		"payoutMultiplier": 0.9,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					194,
					96,
					76,
					191,
					2
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					],
					[],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					},
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L2",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 90,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 12
			},
			{
				"type": "setWin",
				"amount": 90,
				"winLevel": 2,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 90,
				"index": 14
			},
			{
				"type": "finalWin",
				"amount": 90,
				"index": 15
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 10,
		"payoutMultiplier": 1275.3,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "S"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "W"
						}
					]
				],
				"paddingPositions": [
					75,
					195,
					111,
					104,
					139
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					},
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 4,
								"row": 2
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 60,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 12
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 13
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 14
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 15
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 16
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 17
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						}
					],
					[],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 18
			},
			{
				"type": "freeSpinReelExpand",
				"reel": 3,
				"cells": [
					{
						"row": 1,
						"spins": 2
					},
					{
						"row": 2,
						"spins": 1
					},
					{
						"row": 3,
						"spins": 4
					},
					{
						"row": 4,
						"spins": 1
					},
					{
						"row": 5,
						"spins": 1
					}
				],
				"index": 19
			},
			{
				"type": "setWin",
				"amount": 80,
				"winLevel": 2,
				"index": 20
			},
			{
				"type": "setTotalWin",
				"amount": 80,
				"index": 21
			},
			{
				"type": "freeSpinTrigger",
				"totalFs": 9,
				"positions": [
					{
						"reel": 3,
						"row": 5
					}
				],
				"bonusType": "stash",
				"index": 22
			},
			{
				"type": "stashShow",
				"multipliers": [
					1,
					1,
					1,
					1,
					1
				],
				"index": 23
			},
			{
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 9,
				"index": 24
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					186,
					190,
					27,
					153,
					60
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 25
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					}
				],
				"index": 26
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 27
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					}
				],
				"index": 28
			},
			{
				"type": "setTotalWin",
				"amount": 90,
				"index": 29
			},
			{
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 9,
				"index": 30
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "W"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					18,
					177,
					77,
					63,
					88
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 31
			},
			{
				"type": "setTotalWin",
				"amount": 90,
				"index": 32
			},
			{
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 9,
				"index": 33
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "S"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					131,
					74,
					128,
					45,
					0
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 34
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					},
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 35
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 36
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 37
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 38
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 39
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 40
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					},
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 41
			},
			{
				"type": "updateTumbleWin",
				"amount": 60,
				"index": 42
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 43
			},
			{
				"type": "freeSpinReelExpand",
				"reel": 2,
				"cells": [
					{
						"row": 1,
						"spins": 6
					},
					{
						"row": 2,
						"spins": 1
					},
					{
						"row": 3,
						"spins": 3
					},
					{
						"row": 4,
						"spins": 1
					},
					{
						"row": 5,
						"spins": 2
					}
				],
				"index": 44
			},
			{
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 22,
				"index": 45
			},
			{
				"type": "setTotalWin",
				"amount": 150,
				"index": 46
			},
			{
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 22,
				"index": 47
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "W"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "W"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					184,
					76,
					115,
					176,
					113
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 48
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 49
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 50
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 51
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 52
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 53
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						}
					],
					[],
					[
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 54
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L2",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 55
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 56
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 57
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 58
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 59
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "W"
						},
						{
							"name": "L1"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 60
			},
			{
				"type": "coinReelExpand",
				"reel": 0,
				"coins": [
					{
						"row": 1,
						"tier": "bronze",
						"value": 200
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 200
					},
					{
						"row": 3,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 4,
						"tier": "bronze",
						"value": 100
					},
					{
						"row": 5,
						"tier": "silver",
						"value": 700
					}
				],
				"index": 61
			},
			{
				"type": "coinReelCollect",
				"reel": 0,
				"total": 1500,
				"multiplier": 1,
				"pot": 0,
				"index": 62
			},
			{
				"type": "updateTumbleWin",
				"amount": 1570,
				"index": 63
			},
			{
				"type": "stashUpdate",
				"reel": 0,
				"multiplier": 2,
				"index": 64
			},
			{
				"type": "setTotalWin",
				"amount": 1720,
				"index": 65
			},
			{
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 22,
				"index": 66
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "W"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					181,
					71,
					43,
					48,
					44
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 67
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 68
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 69
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 70
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					},
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 71
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 72
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 73
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					},
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 74
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 75
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "W"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"index": 76
			},
			{
				"type": "coinReelExpand",
				"reel": 0,
				"coins": [
					{
						"row": 1,
						"tier": "silver",
						"value": 800
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 3,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 4,
						"tier": "silver",
						"value": 500
					},
					{
						"row": 5,
						"tier": "silver",
						"value": 600
					}
				],
				"index": 77
			},
			{
				"type": "coinReelCollect",
				"reel": 0,
				"total": 5000,
				"multiplier": 2,
				"pot": 0,
				"index": 78
			},
			{
				"type": "updateTumbleWin",
				"amount": 5070,
				"index": 79
			},
			{
				"type": "stashUpdate",
				"reel": 0,
				"multiplier": 3,
				"index": 80
			},
			{
				"type": "setTotalWin",
				"amount": 6790,
				"index": 81
			},
			{
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 22,
				"index": 82
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					117,
					89,
					63,
					138,
					150
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 83
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 4,
								"row": 2
							}
						}
					},
					{
						"symbol": "L1",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					}
				],
				"index": 84
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 85
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					}
				],
				"index": 86
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 87
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 88
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 89
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 90
			},
			{
				"type": "updateTumbleWin",
				"amount": 60,
				"index": 91
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					],
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 92
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 93
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 94
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 95
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "H1",
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 96
			},
			{
				"type": "updateTumbleWin",
				"amount": 130,
				"index": 97
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 98
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 99
			},
			{
				"type": "updateTumbleWin",
				"amount": 140,
				"index": 100
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 101
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 1,
								"row": 3
							}
						}
					}
				],
				"index": 102
			},
			{
				"type": "updateTumbleWin",
				"amount": 160,
				"index": 103
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[],
					[
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 104
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					},
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 105
			},
			{
				"type": "updateTumbleWin",
				"amount": 210,
				"index": 106
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 107
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 108
			},
			{
				"type": "updateTumbleWin",
				"amount": 220,
				"index": 109
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "W"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 110
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 111
			},
			{
				"type": "updateTumbleWin",
				"amount": 230,
				"index": 112
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 113
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 114
			},
			{
				"type": "updateTumbleWin",
				"amount": 250,
				"index": 115
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 116
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 117
			},
			{
				"type": "updateTumbleWin",
				"amount": 260,
				"index": 118
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 119
			},
			{
				"type": "setTotalWin",
				"amount": 7050,
				"index": 120
			},
			{
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 22,
				"index": 121
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					109,
					196,
					53,
					158,
					168
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 122
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 123
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 124
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 125
			},
			{
				"type": "setTotalWin",
				"amount": 7060,
				"index": 126
			},
			{
				"type": "updateFreeSpin",
				"amount": 8,
				"total": 22,
				"index": 127
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					77,
					138,
					125,
					159,
					153
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 128
			},
			{
				"type": "setTotalWin",
				"amount": 7060,
				"index": 129
			},
			{
				"type": "updateFreeSpin",
				"amount": 9,
				"total": 22,
				"index": 130
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "W"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					178,
					18,
					139,
					107,
					20
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 131
			},
			{
				"type": "setTotalWin",
				"amount": 7060,
				"index": 132
			},
			{
				"type": "updateFreeSpin",
				"amount": 10,
				"total": 22,
				"index": 133
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					49,
					57,
					59,
					96,
					184
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 134
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "H4",
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 4,
								"row": 1
							}
						}
					}
				],
				"index": 135
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 136
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						}
					],
					[],
					[],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 137
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					},
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 138
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 139
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 140
			},
			{
				"type": "winInfo",
				"totalWin": 100,
				"wins": [
					{
						"symbol": "L3",
						"win": 100,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 100,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 141
			},
			{
				"type": "updateTumbleWin",
				"amount": 170,
				"index": 142
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 143
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 4,
								"row": 1
							}
						}
					}
				],
				"index": 144
			},
			{
				"type": "updateTumbleWin",
				"amount": 180,
				"index": 145
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 146
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 3,
								"row": 5
							}
						}
					}
				],
				"index": 147
			},
			{
				"type": "updateTumbleWin",
				"amount": 210,
				"index": 148
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H2"
						}
					],
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 149
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 5
							}
						}
					}
				],
				"index": 150
			},
			{
				"type": "updateTumbleWin",
				"amount": 220,
				"index": 151
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 152
			},
			{
				"type": "winInfo",
				"totalWin": 70,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					},
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					},
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 4,
								"row": 1
							}
						}
					}
				],
				"index": 153
			},
			{
				"type": "updateTumbleWin",
				"amount": 290,
				"index": 154
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "S"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 155
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 156
			},
			{
				"type": "updateTumbleWin",
				"amount": 300,
				"index": 157
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 158
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 159
			},
			{
				"type": "updateTumbleWin",
				"amount": 310,
				"index": 160
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 161
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 3,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 1,
								"row": 1
							}
						}
					}
				],
				"index": 162
			},
			{
				"type": "updateTumbleWin",
				"amount": 350,
				"index": 163
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[],
					[
						{
							"name": "H4"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 3,
						"row": 2
					}
				],
				"index": 164
			},
			{
				"type": "setTotalWin",
				"amount": 7410,
				"index": 165
			},
			{
				"type": "updateFreeSpin",
				"amount": 11,
				"total": 22,
				"index": 166
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "W"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					67,
					71,
					105,
					132,
					25
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 167
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 168
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 169
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 170
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 171
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 172
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 173
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					}
				],
				"index": 174
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 175
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					}
				],
				"index": 176
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 177
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 178
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"index": 179
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 180
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 181
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 182
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 183
			},
			{
				"type": "updateTumbleWin",
				"amount": 110,
				"index": 184
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 185
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					},
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 186
			},
			{
				"type": "updateTumbleWin",
				"amount": 140,
				"index": 187
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "W"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 188
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L4",
						"win": 20,
						"positions": [
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 189
			},
			{
				"type": "updateTumbleWin",
				"amount": 160,
				"index": 190
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 191
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 192
			},
			{
				"type": "updateTumbleWin",
				"amount": 170,
				"index": 193
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 194
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					},
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					}
				],
				"index": 195
			},
			{
				"type": "updateTumbleWin",
				"amount": 190,
				"index": 196
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "S"
						},
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 197
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "H1",
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 3,
								"row": 5
							}
						}
					}
				],
				"index": 198
			},
			{
				"type": "updateTumbleWin",
				"amount": 240,
				"index": 199
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[],
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 200
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 2
							}
						}
					}
				],
				"index": 201
			},
			{
				"type": "updateTumbleWin",
				"amount": 250,
				"index": 202
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[],
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 203
			},
			{
				"type": "coinReelExpand",
				"reel": 2,
				"coins": [
					{
						"row": 1,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 400
					},
					{
						"row": 3,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 4,
						"tier": "bronze",
						"value": 200
					},
					{
						"row": 5,
						"tier": "silver",
						"value": 800
					}
				],
				"index": 204
			},
			{
				"type": "coinReelCollect",
				"reel": 2,
				"total": 2000,
				"multiplier": 1,
				"pot": 0,
				"index": 205
			},
			{
				"type": "updateTumbleWin",
				"amount": 2250,
				"index": 206
			},
			{
				"type": "stashUpdate",
				"reel": 2,
				"multiplier": 2,
				"index": 207
			},
			{
				"type": "setTotalWin",
				"amount": 9660,
				"index": 208
			},
			{
				"type": "updateFreeSpin",
				"amount": 12,
				"total": 22,
				"index": 209
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					68,
					110,
					26,
					74,
					76
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 210
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 211
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 212
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 213
			},
			{
				"type": "setTotalWin",
				"amount": 9670,
				"index": 214
			},
			{
				"type": "updateFreeSpin",
				"amount": 13,
				"total": 22,
				"index": 215
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					]
				],
				"paddingPositions": [
					93,
					131,
					154,
					192,
					85
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 216
			},
			{
				"type": "setTotalWin",
				"amount": 9670,
				"index": 217
			},
			{
				"type": "updateFreeSpin",
				"amount": 14,
				"total": 22,
				"index": 218
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					10,
					98,
					143,
					44,
					101
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 219
			},
			{
				"type": "setTotalWin",
				"amount": 9670,
				"index": 220
			},
			{
				"type": "updateFreeSpin",
				"amount": 15,
				"total": 22,
				"index": 221
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "W"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					39,
					184,
					190,
					122,
					14
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 222
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L1",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 223
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 224
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 225
			},
			{
				"type": "coinReelExpand",
				"reel": 1,
				"coins": [
					{
						"row": 1,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 3,
						"tier": "bronze",
						"value": 400
					},
					{
						"row": 4,
						"tier": "silver",
						"value": 900
					},
					{
						"row": 5,
						"tier": "gold",
						"value": 1500
					}
				],
				"index": 226
			},
			{
				"type": "coinReelCollect",
				"reel": 1,
				"total": 3400,
				"multiplier": 1,
				"pot": 0,
				"index": 227
			},
			{
				"type": "updateTumbleWin",
				"amount": 3420,
				"index": 228
			},
			{
				"type": "stashUpdate",
				"reel": 1,
				"multiplier": 2,
				"index": 229
			},
			{
				"type": "setTotalWin",
				"amount": 13090,
				"index": 230
			},
			{
				"type": "updateFreeSpin",
				"amount": 16,
				"total": 22,
				"index": 231
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H4"
						},
						{
							"name": "S"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					36,
					170,
					116,
					122,
					100
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 232
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					},
					{
						"symbol": "L3",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 233
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 234
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 235
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 2
							}
						}
					}
				],
				"index": 236
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 237
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H1"
						}
					],
					[],
					[
						{
							"name": "L4"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"index": 238
			},
			{
				"type": "freeSpinReelExpand",
				"reel": 0,
				"cells": [
					{
						"row": 1,
						"spins": 1
					},
					{
						"row": 2,
						"spins": 1
					},
					{
						"row": 3,
						"spins": 1
					},
					{
						"row": 4,
						"spins": 1
					},
					{
						"row": 5,
						"spins": 2
					}
				],
				"index": 239
			},
			{
				"type": "updateFreeSpin",
				"amount": 16,
				"total": 28,
				"index": 240
			},
			{
				"type": "setTotalWin",
				"amount": 13140,
				"index": 241
			},
			{
				"type": "updateFreeSpin",
				"amount": 17,
				"total": 28,
				"index": 242
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					189,
					156,
					31,
					200,
					24
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 243
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					},
					{
						"symbol": "L3",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 244
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 245
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "W"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 246
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 5
							}
						}
					}
				],
				"index": 247
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 248
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 249
			},
			{
				"type": "setTotalWin",
				"amount": 13190,
				"index": 250
			},
			{
				"type": "updateFreeSpin",
				"amount": 18,
				"total": 28,
				"index": 251
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "W"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "W"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "W"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					137,
					54,
					85,
					178,
					106
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 252
			},
			{
				"type": "coinReelExpand",
				"reel": 4,
				"coins": [
					{
						"row": 1,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 100
					},
					{
						"row": 3,
						"tier": "gold",
						"value": 4300
					},
					{
						"row": 4,
						"tier": "bronze",
						"value": 100
					},
					{
						"row": 5,
						"tier": "bronze",
						"value": 300
					}
				],
				"index": 253
			},
			{
				"type": "coinReelCollect",
				"reel": 4,
				"total": 5100,
				"multiplier": 1,
				"pot": 0,
				"index": 254
			},
			{
				"type": "updateTumbleWin",
				"amount": 5100,
				"index": 255
			},
			{
				"type": "stashUpdate",
				"reel": 4,
				"multiplier": 2,
				"index": 256
			},
			{
				"type": "setTotalWin",
				"amount": 18290,
				"index": 257
			},
			{
				"type": "updateFreeSpin",
				"amount": 19,
				"total": 28,
				"index": 258
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					171,
					16,
					187,
					59,
					101
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 259
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 260
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 261
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 262
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 263
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 264
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 265
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 5
							}
						}
					}
				],
				"index": 266
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 267
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 268
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 269
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 270
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 271
			},
			{
				"type": "setTotalWin",
				"amount": 18330,
				"index": 272
			},
			{
				"type": "updateFreeSpin",
				"amount": 20,
				"total": 28,
				"index": 273
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					19,
					119,
					107,
					8,
					186
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 274
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					},
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 275
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 276
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 277
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 278
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 279
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						}
					],
					[],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 280
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 281
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 282
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 283
			},
			{
				"type": "setTotalWin",
				"amount": 18370,
				"index": 284
			},
			{
				"type": "updateFreeSpin",
				"amount": 21,
				"total": 28,
				"index": 285
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "W"
						}
					]
				],
				"paddingPositions": [
					75,
					179,
					164,
					86,
					136
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 286
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 4,
								"row": 2
							}
						}
					}
				],
				"index": 287
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 288
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 289
			},
			{
				"type": "setTotalWin",
				"amount": 18380,
				"index": 290
			},
			{
				"type": "updateFreeSpin",
				"amount": 22,
				"total": 28,
				"index": 291
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					177,
					196,
					113,
					143,
					190
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 292
			},
			{
				"type": "setTotalWin",
				"amount": 18380,
				"index": 293
			},
			{
				"type": "updateFreeSpin",
				"amount": 23,
				"total": 28,
				"index": 294
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					108,
					139,
					122,
					99,
					172
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 295
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L1",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 296
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 297
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "S"
						}
					],
					[
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 298
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 299
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 300
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 301
			},
			{
				"type": "setTotalWin",
				"amount": 18420,
				"index": 302
			},
			{
				"type": "updateFreeSpin",
				"amount": 24,
				"total": 28,
				"index": 303
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					67,
					156,
					15,
					195,
					192
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 304
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					},
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 305
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 306
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "W"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 307
			},
			{
				"type": "setTotalWin",
				"amount": 18440,
				"index": 308
			},
			{
				"type": "updateFreeSpin",
				"amount": 25,
				"total": 28,
				"index": 309
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						}
					]
				],
				"paddingPositions": [
					115,
					121,
					104,
					188,
					74
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 310
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					},
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 311
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 312
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "W"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 313
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 314
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 315
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 316
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 317
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 318
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 319
			},
			{
				"type": "setTotalWin",
				"amount": 18480,
				"index": 320
			},
			{
				"type": "updateFreeSpin",
				"amount": 26,
				"total": 28,
				"index": 321
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					23,
					0,
					28,
					98,
					90
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 322
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 2
							}
						}
					}
				],
				"index": 323
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 324
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"index": 325
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					}
				],
				"index": 326
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 327
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 328
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 4,
								"row": 1
							}
						}
					}
				],
				"index": 329
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 330
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "W"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 331
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 3
							}
						}
					}
				],
				"index": 332
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 333
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 334
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					},
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 335
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 336
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 337
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "H4",
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 338
			},
			{
				"type": "updateTumbleWin",
				"amount": 130,
				"index": 339
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 340
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 341
			},
			{
				"type": "updateTumbleWin",
				"amount": 170,
				"index": 342
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 343
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 4,
								"row": 2
							}
						}
					}
				],
				"index": 344
			},
			{
				"type": "updateTumbleWin",
				"amount": 180,
				"index": 345
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 346
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 3
							}
						}
					}
				],
				"index": 347
			},
			{
				"type": "updateTumbleWin",
				"amount": 190,
				"index": 348
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					}
				],
				"index": 349
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 350
			},
			{
				"type": "updateTumbleWin",
				"amount": 200,
				"index": 351
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					}
				],
				"index": 352
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 353
			},
			{
				"type": "updateTumbleWin",
				"amount": 210,
				"index": 354
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 355
			},
			{
				"type": "coinReelExpand",
				"reel": 4,
				"coins": [
					{
						"row": 1,
						"tier": "silver",
						"value": 800
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 200
					},
					{
						"row": 3,
						"tier": "diamond",
						"value": 48300
					},
					{
						"row": 4,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 5,
						"tier": "bronze",
						"value": 200
					}
				],
				"index": 356
			},
			{
				"type": "coinReelCollect",
				"reel": 4,
				"total": 99600,
				"multiplier": 2,
				"pot": 0,
				"index": 357
			},
			{
				"type": "updateTumbleWin",
				"amount": 99810,
				"index": 358
			},
			{
				"type": "stashUpdate",
				"reel": 4,
				"multiplier": 3,
				"index": 359
			},
			{
				"type": "setTotalWin",
				"amount": 118290,
				"index": 360
			},
			{
				"type": "updateFreeSpin",
				"amount": 27,
				"total": 28,
				"index": 361
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "W"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					]
				],
				"paddingPositions": [
					86,
					117,
					86,
					28,
					110
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 362
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 363
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 364
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 365
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 366
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 367
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 368
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					}
				],
				"index": 369
			},
			{
				"type": "updateTumbleWin",
				"amount": 60,
				"index": 370
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					}
				],
				"index": 371
			},
			{
				"type": "setTotalWin",
				"amount": 118350,
				"index": 372
			},
			{
				"type": "updateFreeSpin",
				"amount": 28,
				"total": 28,
				"index": 373
			},
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "W"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					179,
					173,
					194,
					159,
					68
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 374
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 375
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 376
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 377
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 378
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 379
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 380
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					}
				],
				"index": 381
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 382
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "W"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[],
					[
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 383
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					}
				],
				"index": 384
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 385
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 386
			},
			{
				"type": "coinReelExpand",
				"reel": 3,
				"coins": [
					{
						"row": 1,
						"tier": "silver",
						"value": 700
					},
					{
						"row": 2,
						"tier": "gold",
						"value": 2800
					},
					{
						"row": 3,
						"tier": "silver",
						"value": 900
					},
					{
						"row": 4,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 5,
						"tier": "gold",
						"value": 4400
					}
				],
				"index": 387
			},
			{
				"type": "coinReelCollect",
				"reel": 3,
				"total": 9100,
				"multiplier": 1,
				"pot": 0,
				"index": 388
			},
			{
				"type": "updateTumbleWin",
				"amount": 9180,
				"index": 389
			},
			{
				"type": "stashUpdate",
				"reel": 3,
				"multiplier": 2,
				"index": 390
			},
			{
				"type": "setTotalWin",
				"amount": 127530,
				"index": 391
			},
			{
				"type": "stashHide",
				"index": 392
			},
			{
				"type": "freeSpinEnd",
				"amount": 127450,
				"winLevel": 9,
				"index": 393
			},
			{
				"type": "finalWin",
				"amount": 127530,
				"index": 394
			}
		],
		"criteria": "freegame"
	},
	{
		"id": 11,
		"payoutMultiplier": 0.1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					]
				],
				"paddingPositions": [
					57,
					92,
					39,
					168,
					185
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "setWin",
				"amount": 10,
				"winLevel": 2,
				"index": 4
			},
			{
				"type": "setTotalWin",
				"amount": 10,
				"index": 5
			},
			{
				"type": "finalWin",
				"amount": 10,
				"index": 6
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 12,
		"payoutMultiplier": 1.7,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					34,
					196,
					146,
					3,
					59
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 1
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H1"
						}
					],
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 70,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					},
					{
						"symbol": "H1",
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 100,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 12
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					},
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 13
			},
			{
				"type": "updateTumbleWin",
				"amount": 120,
				"index": 14
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 15
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					},
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					}
				],
				"index": 16
			},
			{
				"type": "updateTumbleWin",
				"amount": 170,
				"index": 17
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					}
				],
				"index": 18
			},
			{
				"type": "setWin",
				"amount": 170,
				"winLevel": 3,
				"index": 19
			},
			{
				"type": "setTotalWin",
				"amount": 170,
				"index": 20
			},
			{
				"type": "finalWin",
				"amount": 170,
				"index": 21
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 13,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					196,
					200,
					29,
					68,
					163
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 1
			},
			{
				"type": "finalWin",
				"amount": 0,
				"index": 2
			}
		],
		"criteria": "0"
	},
	{
		"id": 14,
		"payoutMultiplier": 0.7,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					156,
					189,
					81,
					147,
					95
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					},
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 4,
								"row": 2
							}
						}
					},
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 9
			},
			{
				"type": "setWin",
				"amount": 70,
				"winLevel": 2,
				"index": 10
			},
			{
				"type": "setTotalWin",
				"amount": 70,
				"index": 11
			},
			{
				"type": "finalWin",
				"amount": 70,
				"index": 12
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 15,
		"payoutMultiplier": 0.2,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					39,
					84,
					187,
					173,
					177
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 6
			},
			{
				"type": "setWin",
				"amount": 20,
				"winLevel": 2,
				"index": 7
			},
			{
				"type": "setTotalWin",
				"amount": 20,
				"index": 8
			},
			{
				"type": "finalWin",
				"amount": 20,
				"index": 9
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 16,
		"payoutMultiplier": 34.1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "S"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "W"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					131,
					121,
					192,
					81,
					122
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 3
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					],
					[],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "coinReelExpand",
				"reel": 4,
				"coins": [
					{
						"row": 1,
						"tier": "bronze",
						"value": 200
					},
					{
						"row": 2,
						"tier": "gold",
						"value": 2400
					},
					{
						"row": 3,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 4,
						"tier": "bronze",
						"value": 200
					},
					{
						"row": 5,
						"tier": "bronze",
						"value": 300
					}
				],
				"index": 4
			},
			{
				"type": "coinReelCollect",
				"reel": 4,
				"total": 3400,
				"multiplier": 1,
				"pot": 0,
				"index": 5
			},
			{
				"type": "updateTumbleWin",
				"amount": 3410,
				"index": 6
			},
			{
				"type": "setWin",
				"amount": 3410,
				"winLevel": 7,
				"index": 7
			},
			{
				"type": "setTotalWin",
				"amount": 3410,
				"index": 8
			},
			{
				"type": "finalWin",
				"amount": 3410,
				"index": 9
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 17,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "W"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					185,
					9,
					175,
					63,
					8
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 1
			},
			{
				"type": "finalWin",
				"amount": 0,
				"index": 2
			}
		],
		"criteria": "0"
	},
	{
		"id": 18,
		"payoutMultiplier": 1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					126,
					60,
					85,
					81,
					60
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					},
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "W"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 60,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 100,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 12
			},
			{
				"type": "setWin",
				"amount": 100,
				"winLevel": 3,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 100,
				"index": 14
			},
			{
				"type": "finalWin",
				"amount": 100,
				"index": 15
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 19,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					163,
					117,
					68,
					76,
					195
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 1
			},
			{
				"type": "finalWin",
				"amount": 0,
				"index": 2
			}
		],
		"criteria": "0"
	},
	{
		"id": 20,
		"payoutMultiplier": 0.1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					90,
					136,
					73,
					125,
					170
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "W"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 3
			},
			{
				"type": "setWin",
				"amount": 10,
				"winLevel": 2,
				"index": 4
			},
			{
				"type": "setTotalWin",
				"amount": 10,
				"index": 5
			},
			{
				"type": "finalWin",
				"amount": 10,
				"index": 6
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 21,
		"payoutMultiplier": 0.5,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					103,
					98,
					37,
					56,
					3
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					},
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					],
					[],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 6
			},
			{
				"type": "setWin",
				"amount": 50,
				"winLevel": 2,
				"index": 7
			},
			{
				"type": "setTotalWin",
				"amount": 50,
				"index": 8
			},
			{
				"type": "finalWin",
				"amount": 50,
				"index": 9
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 22,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					32,
					191,
					25,
					145,
					154
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 1
			},
			{
				"type": "finalWin",
				"amount": 0,
				"index": 2
			}
		],
		"criteria": "0"
	},
	{
		"id": 23,
		"payoutMultiplier": 0.7,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					]
				],
				"paddingPositions": [
					144,
					171,
					43,
					188,
					200
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					},
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "L3",
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 6
			},
			{
				"type": "setWin",
				"amount": 70,
				"winLevel": 2,
				"index": 7
			},
			{
				"type": "setTotalWin",
				"amount": 70,
				"index": 8
			},
			{
				"type": "finalWin",
				"amount": 70,
				"index": 9
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 24,
		"payoutMultiplier": 74.2,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "W"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					79,
					10,
					118,
					123,
					17
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L1",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "coinReelExpand",
				"reel": 1,
				"coins": [
					{
						"row": 1,
						"tier": "gold",
						"value": 1500
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 400
					},
					{
						"row": 3,
						"tier": "bronze",
						"value": 200
					},
					{
						"row": 4,
						"tier": "gold",
						"value": 5000
					},
					{
						"row": 5,
						"tier": "bronze",
						"value": 300
					}
				],
				"index": 4
			},
			{
				"type": "coinReelCollect",
				"reel": 1,
				"total": 7400,
				"multiplier": 1,
				"pot": 0,
				"index": 5
			},
			{
				"type": "updateTumbleWin",
				"amount": 7420,
				"index": 6
			},
			{
				"type": "setWin",
				"amount": 7420,
				"winLevel": 8,
				"index": 7
			},
			{
				"type": "setTotalWin",
				"amount": 7420,
				"index": 8
			},
			{
				"type": "finalWin",
				"amount": 7420,
				"index": 9
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 25,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					49,
					63,
					107,
					185,
					200
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 1
			},
			{
				"type": "finalWin",
				"amount": 0,
				"index": 2
			}
		],
		"criteria": "0"
	},
	{
		"id": 26,
		"payoutMultiplier": 0.5,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					72,
					87,
					127,
					191,
					108
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[],
					[
						{
							"name": "W"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"index": 12
			},
			{
				"type": "setWin",
				"amount": 50,
				"winLevel": 2,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 50,
				"index": 14
			},
			{
				"type": "finalWin",
				"amount": 50,
				"index": 15
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 27,
		"payoutMultiplier": 19,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "W"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					32,
					72,
					179,
					92,
					38
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "coinReelExpand",
				"reel": 3,
				"coins": [
					{
						"row": 1,
						"tier": "bronze",
						"value": 400
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 400
					},
					{
						"row": 3,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 4,
						"tier": "bronze",
						"value": 100
					},
					{
						"row": 5,
						"tier": "silver",
						"value": 700
					}
				],
				"index": 1
			},
			{
				"type": "coinReelCollect",
				"reel": 3,
				"total": 1900,
				"multiplier": 1,
				"pot": 0,
				"index": 2
			},
			{
				"type": "updateTumbleWin",
				"amount": 1900,
				"index": 3
			},
			{
				"type": "setWin",
				"amount": 1900,
				"winLevel": 6,
				"index": 4
			},
			{
				"type": "setTotalWin",
				"amount": 1900,
				"index": 5
			},
			{
				"type": "finalWin",
				"amount": 1900,
				"index": 6
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 28,
		"payoutMultiplier": 2.3,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					179,
					35,
					116,
					125,
					96
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					},
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 60,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "H4",
						"win": 50,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 110,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					},
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 150,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 12
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 13
			},
			{
				"type": "updateTumbleWin",
				"amount": 160,
				"index": 14
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[],
					[
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 15
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					}
				],
				"index": 16
			},
			{
				"type": "updateTumbleWin",
				"amount": 170,
				"index": 17
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 18
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 5
							}
						}
					}
				],
				"index": 19
			},
			{
				"type": "updateTumbleWin",
				"amount": 180,
				"index": 20
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 21
			},
			{
				"type": "winInfo",
				"totalWin": 40,
				"wins": [
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 22
			},
			{
				"type": "updateTumbleWin",
				"amount": 220,
				"index": 23
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 24
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 25
			},
			{
				"type": "updateTumbleWin",
				"amount": 230,
				"index": 26
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 27
			},
			{
				"type": "setWin",
				"amount": 230,
				"winLevel": 4,
				"index": 28
			},
			{
				"type": "setTotalWin",
				"amount": 230,
				"index": 29
			},
			{
				"type": "finalWin",
				"amount": 230,
				"index": 30
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 29,
		"payoutMultiplier": 1.6,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H4"
						}
					]
				],
				"paddingPositions": [
					18,
					164,
					35,
					170,
					61
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 0,
								"row": 5
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					},
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					},
					{
						"symbol": "H2",
						"win": 40,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 1,
								"row": 2
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 90,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 120,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 12
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 13
			},
			{
				"type": "updateTumbleWin",
				"amount": 130,
				"index": 14
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 15
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "L1",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					},
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 16
			},
			{
				"type": "updateTumbleWin",
				"amount": 160,
				"index": 17
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 18
			},
			{
				"type": "setWin",
				"amount": 160,
				"winLevel": 3,
				"index": 19
			},
			{
				"type": "setTotalWin",
				"amount": 160,
				"index": 20
			},
			{
				"type": "finalWin",
				"amount": 160,
				"index": 21
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 30,
		"payoutMultiplier": 26,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "W"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					94,
					190,
					64,
					3,
					132
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 2
							}
						}
					},
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 12
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 2
							}
						}
					},
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 4,
								"row": 1
							}
						}
					}
				],
				"index": 13
			},
			{
				"type": "updateTumbleWin",
				"amount": 100,
				"index": 14
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "W"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 15
			},
			{
				"type": "coinReelExpand",
				"reel": 4,
				"coins": [
					{
						"row": 1,
						"tier": "silver",
						"value": 600
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 3,
						"tier": "bronze",
						"value": 400
					},
					{
						"row": 4,
						"tier": "silver",
						"value": 600
					},
					{
						"row": 5,
						"tier": "silver",
						"value": 600
					}
				],
				"index": 16
			},
			{
				"type": "coinReelCollect",
				"reel": 4,
				"total": 2500,
				"multiplier": 1,
				"pot": 0,
				"index": 17
			},
			{
				"type": "updateTumbleWin",
				"amount": 2600,
				"index": 18
			},
			{
				"type": "setWin",
				"amount": 2600,
				"winLevel": 6,
				"index": 19
			},
			{
				"type": "setTotalWin",
				"amount": 2600,
				"index": 20
			},
			{
				"type": "finalWin",
				"amount": 2600,
				"index": 21
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 31,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "W"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "W"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					139,
					185,
					116,
					183,
					156
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 1
			},
			{
				"type": "finalWin",
				"amount": 0,
				"index": 2
			}
		],
		"criteria": "0"
	},
	{
		"id": 32,
		"payoutMultiplier": 0.1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "W"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					17,
					4,
					168,
					61,
					18
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					}
				],
				"index": 3
			},
			{
				"type": "setWin",
				"amount": 10,
				"winLevel": 2,
				"index": 4
			},
			{
				"type": "setTotalWin",
				"amount": 10,
				"index": 5
			},
			{
				"type": "finalWin",
				"amount": 10,
				"index": 6
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 33,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					166,
					97,
					194,
					51,
					86
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 1
			},
			{
				"type": "finalWin",
				"amount": 0,
				"index": 2
			}
		],
		"criteria": "0"
	},
	{
		"id": 34,
		"payoutMultiplier": 1.1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "W"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					146,
					7,
					104,
					93,
					82
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 90,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					},
					{
						"symbol": "H1",
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					},
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 110,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 9
			},
			{
				"type": "setWin",
				"amount": 110,
				"winLevel": 3,
				"index": 10
			},
			{
				"type": "setTotalWin",
				"amount": 110,
				"index": 11
			},
			{
				"type": "finalWin",
				"amount": 110,
				"index": 12
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 35,
		"payoutMultiplier": 0.2,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "W"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					150,
					11,
					50,
					178,
					186
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						}
					],
					[],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 6
			},
			{
				"type": "setWin",
				"amount": 20,
				"winLevel": 2,
				"index": 7
			},
			{
				"type": "setTotalWin",
				"amount": 20,
				"index": 8
			},
			{
				"type": "finalWin",
				"amount": 20,
				"index": 9
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 36,
		"payoutMultiplier": 1.2,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					66,
					14,
					3,
					36,
					149
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 50,
				"wins": [
					{
						"symbol": "H1",
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 60,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 5
							}
						}
					},
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 5
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 90,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 5
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 100,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H3"
						}
					],
					[],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 12
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 3
							}
						}
					}
				],
				"index": 13
			},
			{
				"type": "updateTumbleWin",
				"amount": 110,
				"index": 14
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 15
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 16
			},
			{
				"type": "updateTumbleWin",
				"amount": 120,
				"index": 17
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					],
					[],
					[
						{
							"name": "L2"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 18
			},
			{
				"type": "setWin",
				"amount": 120,
				"winLevel": 3,
				"index": 19
			},
			{
				"type": "setTotalWin",
				"amount": 120,
				"index": 20
			},
			{
				"type": "finalWin",
				"amount": 120,
				"index": 21
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 37,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					181,
					98,
					112,
					171,
					160
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 1
			},
			{
				"type": "finalWin",
				"amount": 0,
				"index": 2
			}
		],
		"criteria": "0"
	},
	{
		"id": 38,
		"payoutMultiplier": 1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "L4"
						}
					]
				],
				"paddingPositions": [
					71,
					165,
					187,
					50,
					87
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 4
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L3"
						}
					],
					[],
					[]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L3",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 60,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 4,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					},
					{
						"symbol": "H1",
						"win": 50,
						"positions": [
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 3
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 100,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "H4"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 12
			},
			{
				"type": "setWin",
				"amount": 100,
				"winLevel": 3,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 100,
				"index": 14
			},
			{
				"type": "finalWin",
				"amount": 100,
				"index": 15
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 39,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "H4"
						}
					]
				],
				"paddingPositions": [
					180,
					159,
					20,
					14,
					166
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 1
			},
			{
				"type": "finalWin",
				"amount": 0,
				"index": 2
			}
		],
		"criteria": "0"
	},
	{
		"id": 40,
		"payoutMultiplier": 1.8,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H4"
						}
					]
				],
				"paddingPositions": [
					73,
					67,
					135,
					193,
					145
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 0
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L3",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 1
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 2
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "L4",
						"win": 20,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 4
							},
							{
								"reel": 1,
								"row": 1
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 3,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					},
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 2
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 5
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H4"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H4"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 4
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 6
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L2",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 1
							}
						}
					}
				],
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 60,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 9
			},
			{
				"type": "winInfo",
				"totalWin": 20,
				"wins": [
					{
						"symbol": "H4",
						"win": 20,
						"positions": [
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 3,
								"row": 5
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "L1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 3,
						"row": 5
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 12
			},
			{
				"type": "winInfo",
				"totalWin": 10,
				"wins": [
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
								"row": 2
							},
							{
								"reel": 4,
								"row": 1
							},
							{
								"reel": 4,
								"row": 3
							},
							{
								"reel": 4,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 4,
								"row": 1
							}
						}
					}
				],
				"index": 13
			},
			{
				"type": "updateTumbleWin",
				"amount": 90,
				"index": 14
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "L4"
						}
					],
					[],
					[],
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 15
			},
			{
				"type": "winInfo",
				"totalWin": 30,
				"wins": [
					{
						"symbol": "H3",
						"win": 30,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 0,
								"row": 5
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 3,
								"row": 4
							},
							{
								"reel": 4,
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 30,
							"overlay": {
								"reel": 1,
								"row": 2
							}
						}
					}
				],
				"index": 16
			},
			{
				"type": "updateTumbleWin",
				"amount": 120,
				"index": 17
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H4"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L2"
						}
					],
					[],
					[
						{
							"name": "L4"
						}
					],
					[
						{
							"name": "H1"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 0,
						"row": 5
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 4,
						"row": 2
					}
				],
				"index": 18
			},
			{
				"type": "winInfo",
				"totalWin": 60,
				"wins": [
					{
						"symbol": "L4",
						"win": 10,
						"positions": [
							{
								"reel": 0,
								"row": 1
							},
							{
								"reel": 0,
								"row": 3
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 3
							},
							{
								"reel": 2,
								"row": 5
							},
							{
								"reel": 3,
								"row": 3
							},
							{
								"reel": 3,
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 3
							}
						}
					},
					{
						"symbol": "H1",
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 3
							},
							{
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
								"row": 4
							},
							{
								"reel": 4,
								"row": 4
							},
							{
								"reel": 4,
								"row": 5
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
							"overlay": {
								"reel": 2,
								"row": 4
							}
						}
					}
				],
				"index": 19
			},
			{
				"type": "updateTumbleWin",
				"amount": 180,
				"index": 20
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					]
				],
				"explodingSymbols": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 3
					},
					{
						"reel": 2,
						"row": 5
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 3,
						"row": 4
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 1,
						"row": 4
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 21
			},
			{
				"type": "setWin",
				"amount": 180,
				"winLevel": 3,
				"index": 22
			},
			{
				"type": "setTotalWin",
				"amount": 180,
				"index": 23
			},
			{
				"type": "finalWin",
				"amount": 180,
				"index": 24
			}
		],
		"criteria": "basegame"
	}
];
