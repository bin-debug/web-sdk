# Book event contract (client <-> math-sdk)

The single source of truth for the shapes the shell plays. A real book from math-sdk and a
synthetic book from `tools/book-gen` must both match these. Existing events (`reveal`, `winInfo`,
`tumbleBoard`, `freeSpinTrigger`, `updateFreeSpin`, `updateGlobalMult`, `freeSpinEnd`, `setTotalWin`,
`setWin`, `finalWin`, `wincap`, `createBonusSnapshot`) are in `apps/shell/src/game/typesBookEvent.ts`
and are not repeated here.

Conventions
- `Position = { reel: number, row: number }` (0-based, reel = column, row = from the top).
- Money: book amounts are integers where `100` = 1x bet (same as the SDK). Multipliers are plain numbers.
- Every event has `index` (sequential from 0) and `type`. Events are played strictly in `index` order.
- A visual that needs a number reads it from the event. The client never rolls, sums, orders or
  decides anything. Where order matters the arrays are already in play order.
- Add fields only as optional; never rename. Changing a shape = edit this file in the same PR.
- `coin` shape used by several events: `{ pos: Position, kind: 'bronze'|'silver'|'gold'|'diamond'|'bag'|'pot'|'clover'|'collector'|'jackpot', value?: number, tier?: 'mini'|'minor'|'major'|'grand', mult?: number }`.
  (`value` = payout in x bet for coins, bags; `mult` for clovers; `tier` for jackpot markers.)

## Squares and reveal

```ts
{ type: 'squaresAdd',   positions: Position[] }            // gold squares appear under these cells
{ type: 'squaresClear', positions?: Position[] }            // omitted = all
{ type: 'squaresReveal', cells: coin[], total: number }     // rainbow: each square turns into a special; cells are in resolve order
{ type: 'cloverApply',  pos: Position, scope: 'adjacent'|'global', mult: number, targets: Position[] }
{ type: 'collect',      collector: Position | 'global' | 'pot', sources: Position[], total: number }
```

## Progression

```ts
{ type: 'upgradeSymbol', symbol: string }                   // e.g. 'H2' -> epic variant for the rest of the bonus
{ type: 'barLevel',      level: number, spinsAdded: number, guaranteeReveal?: boolean }
```

## Hold and win

```ts
{ type: 'holdStart',   board: RawSymbol[][], coins: coin[], lives: number, mode: string }
{ type: 'respin',      new: coin[], lives: number, remaining?: number }   // lives resets when new.length > 0
{ type: 'holdEnd',     total: number, fullGrid: boolean }
{ type: 'jackpotWin',  tier: 'mini'|'minor'|'major'|'grand', amount: number, positions?: Position[] }
{ type: 'respinCounter', remaining: number, reset: boolean } // refillRespins
```

## Layers and dynamite

```ts
{ type: 'layerBreak', positions: Position[], layer: 1|2|3 }          // peel the layer under these cells
{ type: 'dynamite',   throws: { target: Position, area: Position[] }[], chain?: { from: Position, area: Position[] }[] }
{ type: 'layerReveal', cells: coin[] }                                // layer 3 specials once the grid settles
```

## Trigger row

```ts
{ type: 'expandReel',  reel: number, kind: 'coin'|'fs', cells: coin[] }   // pillar then cells flip
{ type: 'stashUpdate', reel: number, value: number, banked?: number }
```

## Wilds

```ts
{ type: 'wildMults',        positions: Position[], values: number[], hidden?: boolean[] }   // parallel arrays
{ type: 'addStickyWilds',   positions: Position[], mults?: number[] }
{ type: 'expandingWildReel', reel: number, mult: number, who?: string }
```

## Bonus flow (additions to the existing freeSpinTrigger)

`freeSpinTrigger` already carries `bonusType`, `bonusName`, `totalFs`, `positions`. Add optional
`hidden?: boolean` (the 5-scatter hidden bonus) and `retrigger?: { extra: number }` for retriggers.

## Contract check

`node tools/book-gen/check-contract.mjs <gameId> [--books=path]` loads every book for the game,
walks each event and validates it against the shapes above (field present, type, positions inside
the board, `index` sequential, parallel arrays equal length, sources/targets inside the board).
A real math-sdk book file can be passed with `--books`. Rules live in `tools/book-gen/contract/rules/*.mjs` (auto-loaded, one file per group). Each feature session
edits the rules for its own events and adds one failing example book per rule to `tools/book-gen/contract-tests/`
(`{ expect, board, books }`; `pnpm check:contract-tests`). SDK events may use padding rows; new events must sit on the visible board.
