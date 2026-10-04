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
							"name": "H3"
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
							"name": "H3"
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
							"name": "W"
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
		"payoutMultiplier": 0.7,
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
							"name": "S"
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
							"name": "H1"
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
		"id": 8,
		"payoutMultiplier": 0.1,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
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
							"name": "L1"
						},
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
							"name": "H4"
						}
					]
				],
				"paddingPositions": [
					147,
					56,
					104,
					117,
					14
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
								"reel": 1,
								"row": 5
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
				"amount": 10,
				"index": 2
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
							"name": "L2"
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
							"name": "L4"
						}
					]
				],
				"explodingSymbols": [
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
						"row": 4
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
		"id": 9,
		"payoutMultiplier": 0.3,
		"events": [
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
							"name": "L1"
						},
						{
							"name": "L4"
						},
						{
							"name": "H1"
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
							"name": "H1"
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
							"name": "L3"
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
							"name": "L1"
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
					92,
					92,
					176,
					109,
					77
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
								"row": 4
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
								"row": 3
							}
						}
					},
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
				"amount": 30,
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
							"name": "L1"
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
							"name": "L1"
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
						"row": 4
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
						"reel": 3,
						"row": 4
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
				"amount": 30,
				"winLevel": 2,
				"index": 4
			},
			{
				"type": "setTotalWin",
				"amount": 30,
				"index": 5
			},
			{
				"type": "finalWin",
				"amount": 30,
				"index": 6
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 10,
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
							"name": "H4"
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
							"name": "H1"
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
							"name": "H1"
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
							"name": "L2"
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
							"name": "L1"
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
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					46,
					7,
					41,
					50,
					164
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
							"name": "L4"
						}
					],
					[
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
						"row": 3
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
						"win": 20,
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
							"winWithoutMult": 20,
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
							"name": "H1"
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
				"index": 6
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
							"name": "S"
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
							"name": "L2"
						}
					],
					[],
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
							"name": "H4"
						},
						{
							"name": "W"
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
						"row": 2
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
				"index": 9
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
								"row": 3
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
						"symbol": "H1",
						"win": 50,
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
								"reel": 2,
								"row": 3
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
								"row": 2
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 50,
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
				"amount": 110,
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
							"name": "H3"
						},
						{
							"name": "L1"
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
						"reel": 2,
						"row": 5
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
				"index": 12
			},
			{
				"type": "setWin",
				"amount": 110,
				"winLevel": 3,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 110,
				"index": 14
			},
			{
				"type": "finalWin",
				"amount": 110,
				"index": 15
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 11,
		"payoutMultiplier": 1,
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
							"name": "H4"
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
							"name": "L2"
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
							"name": "H2"
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
							"name": "L2"
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
							"name": "L1"
						},
						{
							"name": "L4"
						}
					]
				],
				"paddingPositions": [
					185,
					62,
					76,
					56,
					140
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
								"row": 5
							},
							{
								"reel": 2,
								"row": 1
							},
							{
								"reel": 3,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
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
					],
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
					[]
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
						"row": 5
					},
					{
						"reel": 2,
						"row": 1
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
								"row": 4
							},
							{
								"reel": 3,
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
				"amount": 40,
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
							"name": "H3"
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
						"row": 4
					},
					{
						"reel": 3,
						"row": 1
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
				"totalWin": 50,
				"wins": [
					{
						"symbol": "L3",
						"win": 50,
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
								"row": 1
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
							"name": "H2"
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
						"row": 2
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
						"row": 1
					}
				],
				"index": 9
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
								"row": 1
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
		"id": 12,
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
							"name": "L1"
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
							"name": "H4"
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
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
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
							"name": "H2"
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
							"name": "H3"
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
					152,
					162,
					59,
					56,
					120
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
		"id": 13,
		"payoutMultiplier": 0.5,
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
							"name": "L1"
						},
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
							"name": "L3"
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
						}
					]
				],
				"paddingPositions": [
					69,
					75,
					109,
					139,
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
								"reel": 1,
								"row": 4
							},
							{
								"reel": 2,
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
							"name": "H1"
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
							"name": "H3"
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
						"row": 3
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
						"reel": 4,
						"row": 4
					}
				],
				"index": 3
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
						"reel": 1,
						"row": 2
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
						"reel": 3,
						"row": 5
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
				"totalWin": 20,
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
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
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
							"name": "L1"
						},
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
						"row": 3
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
						"row": 1
					},
					{
						"reel": 4,
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
						"reel": 4,
						"row": 3
					}
				],
				"index": 9
			},
			{
				"type": "setWin",
				"amount": 50,
				"winLevel": 2,
				"index": 10
			},
			{
				"type": "setTotalWin",
				"amount": 50,
				"index": 11
			},
			{
				"type": "finalWin",
				"amount": 50,
				"index": 12
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 14,
		"payoutMultiplier": 0.8,
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
							"name": "H4"
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
							"name": "L2"
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
							"name": "H1"
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
							"name": "H3"
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
							"name": "L1"
						},
						{
							"name": "W"
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
					54,
					175,
					94,
					77,
					90
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
						"symbol": "L2",
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
								"reel": 2,
								"row": 3
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
								"row": 1
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
							"name": "H2"
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
							"name": "L4"
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
						"reel": 2,
						"row": 3
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
						"row": 1
					}
				],
				"index": 3
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
						"symbol": "L4",
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
								"row": 1
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
							"name": "L4"
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
							"name": "L4"
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
						"row": 1
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
								"reel": 1,
								"row": 5
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
				"index": 7
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 8
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[
						{
							"name": "W"
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
						"row": 5
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
				"type": "setWin",
				"amount": 80,
				"winLevel": 2,
				"index": 10
			},
			{
				"type": "setTotalWin",
				"amount": 80,
				"index": 11
			},
			{
				"type": "finalWin",
				"amount": 80,
				"index": 12
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 15,
		"payoutMultiplier": 0,
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
							"name": "L3"
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
							"name": "L2"
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
							"name": "H3"
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
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "L1"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					42,
					153,
					9,
					109,
					187
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
		"id": 16,
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
							"name": "H4"
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
							"name": "L3"
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
							"name": "L2"
						},
						{
							"name": "H4"
						}
					]
				],
				"paddingPositions": [
					61,
					73,
					14,
					143,
					65
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
						"win": 20,
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
							"name": "H2"
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
							"name": "L1"
						}
					],
					[
						{
							"name": "L4"
						},
						{
							"name": "L1"
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
							"name": "H1"
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
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
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
		"id": 17,
		"payoutMultiplier": 3.1,
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
							"name": "H3"
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
							"name": "L1"
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
							"name": "L4"
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
							"name": "L1"
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
							"name": "L4"
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
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					141,
					147,
					121,
					95,
					74
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
						"win": 20,
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
							"name": "L2"
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
						"row": 1
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
							"name": "L3"
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
						"row": 3
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
						"row": 1
					}
				],
				"index": 6
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
								"row": 5
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
							"name": "H2"
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
								"row": 2
							},
							{
								"reel": 1,
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
								"reel": 4,
								"row": 1
							}
						}
					}
				],
				"index": 10
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 11
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
						"reel": 3,
						"row": 5
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
								"reel": 2,
								"row": 2
							},
							{
								"reel": 3,
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
				"index": 13
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 14
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
							"name": "L2"
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
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
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
				"amount": 110,
				"index": 17
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
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 5
					}
				],
				"index": 18
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
								"row": 2
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
								"row": 1
							}
						}
					}
				],
				"index": 19
			},
			{
				"type": "updateTumbleWin",
				"amount": 120,
				"index": 20
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
							"name": "H2"
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
							"name": "L4"
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
						"row": 2
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
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 21
			},
			{
				"type": "winInfo",
				"totalWin": 60,
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
								"reel": 4,
								"row": 3
							}
						}
					}
				],
				"index": 22
			},
			{
				"type": "updateTumbleWin",
				"amount": 180,
				"index": 23
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
							"name": "L4"
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
						"reel": 2,
						"row": 1
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
						"reel": 3,
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
						"row": 2
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
						"reel": 4,
						"row": 5
					}
				],
				"index": 24
			},
			{
				"type": "winInfo",
				"totalWin": 60,
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
					},
					{
						"symbol": "L4",
						"win": 20,
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
								"row": 3
							}
						}
					}
				],
				"index": 25
			},
			{
				"type": "updateTumbleWin",
				"amount": 240,
				"index": 26
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
							"name": "L1"
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
						"row": 3
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"index": 27
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
								"row": 5
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
				"index": 28
			},
			{
				"type": "updateTumbleWin",
				"amount": 250,
				"index": 29
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
							"name": "H1"
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
				"index": 30
			},
			{
				"type": "winInfo",
				"totalWin": 30,
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
								"row": 1
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
								"row": 5
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
						"symbol": "L4",
						"win": 10,
						"positions": [
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
								"row": 2
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
								"row": 4
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
				"index": 31
			},
			{
				"type": "updateTumbleWin",
				"amount": 280,
				"index": 32
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
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
							"name": "L1"
						},
						{
							"name": "L3"
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
						"row": 1
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
						"row": 2
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
						"row": 4
					}
				],
				"index": 33
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
								"reel": 3,
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
								"reel": 1,
								"row": 5
							}
						}
					}
				],
				"index": 34
			},
			{
				"type": "updateTumbleWin",
				"amount": 310,
				"index": 35
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "H1"
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
						"reel": 3,
						"row": 4
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
						"reel": 4,
						"row": 3
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 36
			},
			{
				"type": "setWin",
				"amount": 310,
				"winLevel": 4,
				"index": 37
			},
			{
				"type": "setTotalWin",
				"amount": 310,
				"index": 38
			},
			{
				"type": "finalWin",
				"amount": 310,
				"index": 39
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 18,
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
							"name": "L1"
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
							"name": "H3"
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
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					196,
					53,
					158,
					168,
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
		"id": 19,
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
							"name": "L1"
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
							"name": "H1"
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
							"name": "L1"
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
					]
				],
				"paddingPositions": [
					48,
					52,
					133,
					9,
					119
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
		"payoutMultiplier": 0.2,
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
							"name": "H3"
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
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					103,
					47,
					43,
					106,
					80
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
							"name": "L3"
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
					],
					[],
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
		"id": 21,
		"payoutMultiplier": 1.8,
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
							"name": "H4"
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
							"name": "H4"
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
							"name": "L3"
						},
						{
							"name": "L1"
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
							"name": "H4"
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
							"name": "H4"
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
							"name": "H4"
						}
					]
				],
				"paddingPositions": [
					177,
					101,
					144,
					49,
					135
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
						"row": 4
					}
				],
				"index": 3
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
								"row": 4
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 20,
							"overlay": {
								"reel": 1,
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
					},
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
				"amount": 50,
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
						"row": 4
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
						"reel": 3,
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
								"row": 5
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
							"name": "H2"
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
					},
					{
						"reel": 3,
						"row": 1
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
								"row": 2
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
				"amount": 90,
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
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 12
			},
			{
				"type": "winInfo",
				"totalWin": 30,
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
								"reel": 0,
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
								"row": 5
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
								"reel": 2,
								"row": 5
							}
						}
					},
					{
						"symbol": "L4",
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
				"amount": 120,
				"index": 14
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
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
							"name": "H4"
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
						"row": 5
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
						"reel": 2,
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
						"row": 2
					}
				],
				"index": 15
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
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
								"row": 5
							}
						}
					},
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
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
				"index": 16
			},
			{
				"type": "updateTumbleWin",
				"amount": 140,
				"index": 17
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
						{
							"name": "S"
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
							"name": "L1"
						},
						{
							"name": "L3"
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
				"index": 18
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
								"reel": 3,
								"row": 1
							}
						],
						"meta": {
							"globalMult": 1,
							"clusterMult": 1,
							"winWithoutMult": 40,
							"overlay": {
								"reel": 1,
								"row": 3
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
						"reel": 3,
						"row": 1
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
	},
	{
		"id": 22,
		"payoutMultiplier": 24.4,
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
							"name": "L2"
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
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					53,
					167,
					159,
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
					},
					{
						"symbol": "L1",
						"win": 10,
						"positions": [
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
							"name": "H1"
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
							"name": "L2"
						}
					],
					[
						{
							"name": "S"
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
								"reel": 1,
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
					[],
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
						"row": 2
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
							"name": "H4"
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
							"name": "L2"
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
					}
				],
				"index": 9
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
						"tier": "silver",
						"value": 700
					},
					{
						"row": 3,
						"tier": "bronze",
						"value": 200
					},
					{
						"row": 4,
						"tier": "silver",
						"value": 900
					},
					{
						"row": 5,
						"tier": "bronze",
						"value": 400
					}
				],
				"index": 10
			},
			{
				"type": "coinReelCollect",
				"reel": 4,
				"total": 2400,
				"multiplier": 1,
				"pot": 0,
				"index": 11
			},
			{
				"type": "updateTumbleWin",
				"amount": 2440,
				"index": 12
			},
			{
				"type": "setWin",
				"amount": 2440,
				"winLevel": 6,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 2440,
				"index": 14
			},
			{
				"type": "finalWin",
				"amount": 2440,
				"index": 15
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 23,
		"payoutMultiplier": 21.3,
		"events": [
			{
				"type": "reveal",
				"board": [
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
							"name": "H3"
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
						},
						{
							"name": "H1"
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
							"name": "W"
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
							"name": "L1"
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
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					120,
					26,
					106,
					53,
					92
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
							"name": "L4"
						},
						{
							"name": "S"
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
						"reel": 1,
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
								"reel": 2,
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
								"reel": 1,
								"row": 3
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
							"name": "H2"
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
						"row": 2
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
						"symbol": "L1",
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
								"reel": 2,
								"row": 1
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
							"winWithoutMult": 10,
							"overlay": {
								"reel": 3,
								"row": 3
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
							"name": "L4"
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
						"row": 1
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
				"index": 9
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
						"value": 200
					},
					{
						"row": 3,
						"tier": "silver",
						"value": 800
					},
					{
						"row": 4,
						"tier": "bronze",
						"value": 300
					},
					{
						"row": 5,
						"tier": "silver",
						"value": 500
					}
				],
				"index": 10
			},
			{
				"type": "coinReelCollect",
				"reel": 2,
				"total": 2100,
				"multiplier": 1,
				"pot": 0,
				"index": 11
			},
			{
				"type": "updateTumbleWin",
				"amount": 2130,
				"index": 12
			},
			{
				"type": "setWin",
				"amount": 2130,
				"winLevel": 6,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 2130,
				"index": 14
			},
			{
				"type": "finalWin",
				"amount": 2130,
				"index": 15
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 24,
		"payoutMultiplier": 0,
		"events": [
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
							"name": "L2"
						},
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
							"name": "L1"
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
							"name": "H2"
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
					]
				],
				"paddingPositions": [
					74,
					76,
					89,
					30,
					126
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
		"id": 25,
		"payoutMultiplier": 0,
		"events": [
			{
				"type": "reveal",
				"board": [
					[
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
							"name": "L2"
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
							"name": "H3"
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
							"name": "H2"
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
							"name": "H2"
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
						}
					]
				],
				"paddingPositions": [
					148,
					199,
					86,
					57,
					64
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
							"name": "L3"
						},
						{
							"name": "H4"
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
						},
						{
							"name": "H4"
						}
					]
				],
				"paddingPositions": [
					162,
					129,
					177,
					64,
					10
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
								"reel": 1,
								"row": 3
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
						"row": 2
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
		"id": 27,
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
							"name": "L4"
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
							"name": "L1"
						},
						{
							"name": "W"
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
							"name": "L4"
						},
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
					[
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
							"name": "L2"
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
					157,
					169,
					31,
					197,
					105
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
		"id": 28,
		"payoutMultiplier": 50.1,
		"events": [
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
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H4"
						},
						{
							"name": "S"
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
							"name": "H4"
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
							"name": "L1"
						},
						{
							"name": "H3"
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
					100,
					10,
					156,
					45,
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
				"type": "freeSpinReelExpand",
				"reel": 1,
				"cells": [
					{
						"row": 1,
						"spins": 1
					},
					{
						"row": 2,
						"spins": 2
					},
					{
						"row": 3,
						"spins": 2
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
				"index": 1
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 2
			},
			{
				"type": "freeSpinTrigger",
				"totalFs": 8,
				"positions": [
					{
						"reel": 1,
						"row": 5
					}
				],
				"bonusType": "stash",
				"index": 3
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
				"index": 4
			},
			{
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8,
				"index": 5
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
							"name": "L4"
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
							"name": "H1"
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
							"name": "H1"
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
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L4"
						}
					]
				],
				"paddingPositions": [
					94,
					164,
					54,
					41,
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
				"index": 6
			},
			{
				"type": "setTotalWin",
				"amount": 0,
				"index": 7
			},
			{
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8,
				"index": 8
			},
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
							"name": "L1"
						},
						{
							"name": "L3"
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
							"name": "L1"
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
							"name": "L2"
						},
						{
							"name": "H3"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "W"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					197,
					44,
					24,
					15,
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
				"index": 9
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
						"value": 200
					},
					{
						"row": 5,
						"tier": "silver",
						"value": 900
					}
				],
				"index": 10
			},
			{
				"type": "coinReelCollect",
				"reel": 4,
				"total": 1800,
				"multiplier": 1,
				"pot": 0,
				"index": 11
			},
			{
				"type": "updateTumbleWin",
				"amount": 1800,
				"index": 12
			},
			{
				"type": "stashUpdate",
				"reel": 4,
				"multiplier": 2,
				"index": 13
			},
			{
				"type": "setTotalWin",
				"amount": 1800,
				"index": 14
			},
			{
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8,
				"index": 15
			},
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
							"name": "W"
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
							"name": "H1"
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
					41,
					9,
					50,
					118,
					50
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 16
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
					},
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
								"row": 3
							}
						}
					}
				],
				"index": 17
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 18
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
						"row": 2
					},
					{
						"reel": 4,
						"row": 1
					}
				],
				"index": 19
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
					}
				],
				"index": 20
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 21
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
							"name": "L2"
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
						"row": 1
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
				"index": 22
			},
			{
				"type": "coinReelExpand",
				"reel": 3,
				"coins": [
					{
						"row": 1,
						"tier": "silver",
						"value": 600
					},
					{
						"row": 2,
						"tier": "bronze",
						"value": 400
					},
					{
						"row": 3,
						"tier": "gold",
						"value": 1000
					},
					{
						"row": 4,
						"tier": "silver",
						"value": 700
					},
					{
						"row": 5,
						"tier": "bronze",
						"value": 300
					}
				],
				"index": 23
			},
			{
				"type": "coinReelCollect",
				"reel": 3,
				"total": 3000,
				"multiplier": 1,
				"pot": 0,
				"index": 24
			},
			{
				"type": "updateTumbleWin",
				"amount": 3030,
				"index": 25
			},
			{
				"type": "stashUpdate",
				"reel": 3,
				"multiplier": 2,
				"index": 26
			},
			{
				"type": "setTotalWin",
				"amount": 4830,
				"index": 27
			},
			{
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8,
				"index": 28
			},
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
							"name": "L1"
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
							"name": "H2"
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
							"name": "H4"
						},
						{
							"name": "H2"
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
							"name": "L3"
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
							"name": "L1"
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					124,
					41,
					153,
					48,
					164
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 29
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
					}
				],
				"index": 30
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 31
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
							"name": "L3"
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
						"row": 5
					}
				],
				"index": 32
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
								"row": 2
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
				"index": 33
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 34
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
						"row": 2
					}
				],
				"index": 35
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
								"row": 2
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
				"index": 36
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 37
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
							"name": "H1"
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
					}
				],
				"index": 38
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
				"index": 39
			},
			{
				"type": "updateTumbleWin",
				"amount": 50,
				"index": 40
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
						"reel": 4,
						"row": 4
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 41
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
				"index": 42
			},
			{
				"type": "updateTumbleWin",
				"amount": 60,
				"index": 43
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[],
					[],
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
						}
					]
				],
				"explodingSymbols": [
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
						"row": 1
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 44
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
								"reel": 3,
								"row": 2
							}
						}
					}
				],
				"index": 45
			},
			{
				"type": "updateTumbleWin",
				"amount": 70,
				"index": 46
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
							"name": "L3"
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
						"row": 5
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
						"row": 5
					}
				],
				"index": 47
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
								"reel": 1,
								"row": 3
							}
						}
					}
				],
				"index": 48
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
				"index": 49
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
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
							"name": "H1"
						},
						{
							"name": "H1"
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
						"reel": 3,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"index": 50
			},
			{
				"type": "setTotalWin",
				"amount": 4910,
				"index": 51
			},
			{
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8,
				"index": 52
			},
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
							"name": "L1"
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
							"name": "H2"
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
						}
					]
				],
				"paddingPositions": [
					82,
					35,
					38,
					136,
					87
				],
				"gameType": "freeSpins",
				"anticipation": [
					0,
					0,
					0,
					0,
					0
				],
				"index": 53
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
				"index": 54
			},
			{
				"type": "updateTumbleWin",
				"amount": 10,
				"index": 55
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
							"name": "L3"
						}
					],
					[
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "W"
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
				"index": 56
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
								"reel": 0,
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
				"index": 57
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 58
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
					[
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
						"row": 4
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
				"index": 59
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
								"reel": 2,
								"row": 3
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
								"row": 5
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
				"index": 60
			},
			{
				"type": "updateTumbleWin",
				"amount": 30,
				"index": 61
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
							"name": "L2"
						},
						{
							"name": "L3"
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
						"reel": 2,
						"row": 3
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
						"row": 5
					}
				],
				"index": 62
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
							"winWithoutMult": 10,
							"overlay": {
								"reel": 2,
								"row": 1
							}
						}
					}
				],
				"index": 63
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 64
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
						"row": 2
					}
				],
				"index": 65
			},
			{
				"type": "setTotalWin",
				"amount": 4950,
				"index": 66
			},
			{
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8,
				"index": 67
			},
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
							"name": "L3"
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
							"name": "L1"
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
				"index": 68
			},
			{
				"type": "setTotalWin",
				"amount": 4950,
				"index": 69
			},
			{
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8,
				"index": 70
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
				"index": 71
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
				"index": 72
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 73
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
				"index": 74
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
				"index": 75
			},
			{
				"type": "updateTumbleWin",
				"amount": 40,
				"index": 76
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
				"index": 77
			},
			{
				"type": "setTotalWin",
				"amount": 4990,
				"index": 78
			},
			{
				"type": "updateFreeSpin",
				"amount": 8,
				"total": 8,
				"index": 79
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
				"index": 80
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
				"index": 81
			},
			{
				"type": "updateTumbleWin",
				"amount": 20,
				"index": 82
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
				"index": 83
			},
			{
				"type": "setTotalWin",
				"amount": 5010,
				"index": 84
			},
			{
				"type": "stashHide",
				"index": 85
			},
			{
				"type": "freeSpinEnd",
				"amount": 5010,
				"winLevel": 8,
				"index": 86
			},
			{
				"type": "finalWin",
				"amount": 5010,
				"index": 87
			}
		],
		"criteria": "freegame"
	},
	{
		"id": 29,
		"payoutMultiplier": 1.4,
		"events": [
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
							"name": "H2"
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
								"reel": 3,
								"row": 1
							},
							{
								"reel": 3,
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
				"amount": 80,
				"index": 11
			},
			{
				"type": "tumbleBoard",
				"newSymbols": [
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
								"reel": 2,
								"row": 4
							},
							{
								"reel": 3,
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
								"row": 4
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
						"row": 4
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 4,
						"row": 5
					}
				],
				"index": 15
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
							"winWithoutMult": 30,
							"overlay": {
								"reel": 3,
								"row": 4
							}
						}
					}
				],
				"index": 16
			},
			{
				"type": "updateTumbleWin",
				"amount": 130,
				"index": 17
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
							"name": "L2"
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
				"index": 18
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
								"reel": 2,
								"row": 3
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
				"index": 19
			},
			{
				"type": "updateTumbleWin",
				"amount": 140,
				"index": 20
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
							"name": "L3"
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
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
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
						"row": 4
					},
					{
						"reel": 4,
						"row": 3
					}
				],
				"index": 21
			},
			{
				"type": "setWin",
				"amount": 140,
				"winLevel": 3,
				"index": 22
			},
			{
				"type": "setTotalWin",
				"amount": 140,
				"index": 23
			},
			{
				"type": "finalWin",
				"amount": 140,
				"index": 24
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 30,
		"payoutMultiplier": 0.1,
		"events": [
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
							"name": "L1"
						},
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
							"name": "L2"
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
							"name": "L1"
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
							"name": "L1"
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
							"name": "L4"
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
					95,
					127,
					124,
					174,
					144
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
								"row": 1
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
							"name": "H2"
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
							"name": "H2"
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
						"row": 3
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
						"row": 3
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
		"id": 31,
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
							"name": "H4"
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
							"name": "H3"
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
							"name": "L4"
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
							"name": "L3"
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
							"name": "L3"
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
					49,
					60,
					200,
					192,
					104
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
		"payoutMultiplier": 0.2,
		"events": [
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
							"name": "L2"
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
							"name": "H2"
						},
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
							"name": "H4"
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
								"reel": 2,
								"row": 1
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
							"winWithoutMult": 10,
							"overlay": {
								"reel": 1,
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
						"reel": 3,
						"row": 4
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
						}
					],
					[],
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
		"id": 33,
		"payoutMultiplier": 0.1,
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
							"name": "L2"
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
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					173,
					194,
					159,
					68,
					9
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
		"id": 34,
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
							"name": "H3"
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
							"name": "L4"
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
							"name": "H2"
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
							"name": "H2"
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
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					114,
					39,
					95,
					122,
					119
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
		"id": 35,
		"payoutMultiplier": 1,
		"events": [
			{
				"type": "reveal",
				"board": [
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
							"name": "S"
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
							"name": "L3"
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
							"name": "L3"
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
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					197,
					19,
					174,
					180,
					102
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
						"win": 20,
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
							"name": "H1"
						},
						{
							"name": "H1"
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
				"index": 3
			},
			{
				"type": "winInfo",
				"totalWin": 60,
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
								"row": 2
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
								"row": 5
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
								"reel": 2,
								"row": 3
							}
						}
					},
					{
						"symbol": "L3",
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
								"row": 3
							}
						}
					}
				],
				"index": 4
			},
			{
				"type": "updateTumbleWin",
				"amount": 80,
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
							"name": "H4"
						},
						{
							"name": "L4"
						},
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
							"name": "L2"
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
						"row": 4
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
						"row": 5
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
				"totalWin": 20,
				"wins": [
					{
						"symbol": "L3",
						"win": 20,
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
							"winWithoutMult": 20,
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
				"amount": 100,
				"index": 8
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
							"name": "L1"
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
				"index": 9
			},
			{
				"type": "setWin",
				"amount": 100,
				"winLevel": 3,
				"index": 10
			},
			{
				"type": "setTotalWin",
				"amount": 100,
				"index": 11
			},
			{
				"type": "finalWin",
				"amount": 100,
				"index": 12
			}
		],
		"criteria": "basegame"
	},
	{
		"id": 36,
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
							"name": "H1"
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
							"name": "H2"
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
							"name": "L4"
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
					101,
					116,
					43,
					12,
					152
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
								"reel": 0,
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
								"row": 3
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
								"reel": 1,
								"row": 3
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
							"name": "H1"
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
							"name": "L1"
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
							"name": "L2"
						}
					],
					[
						{
							"name": "H1"
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
						"reel": 0,
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
		"id": 37,
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
							"name": "L4"
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
		"id": 38,
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
		"id": 39,
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
		"id": 40,
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
	}
];
