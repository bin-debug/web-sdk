# coin-reel (working title)

Our own 5×5 game built on the *structure* studied in
[`docs/teardowns/coin-reel-5x5-teardown.md`](../../docs/teardowns/coin-reel-5x5-teardown.md).
Started from the `scatter` template. Art is placeholder (template symbols + procedural coins); it
needs its own theme, mascot and names before it could ship.

## What works (verified 2026-10-04 against the mock RGS)

- 5×5 pays-anywhere (6+), tumbles, teal **trigger row** (bottom row).
- **Coin reel:** a `W` on the trigger row grows up its reel; every cell becomes a tiered coin
  (bronze / silver / gold / diamond); values are collected and paid (`coinReelExpand`, `coinReelCollect`).
- **Free-spin reel:** an `S` on the trigger row grows up its reel; each cell awards +N spins
  (`freeSpinReelExpand` → `freeSpinTrigger`).
- **Stash bonus:** a ×N box above each reel; that reel's coins are multiplied, then the box goes
  up by one (`stashShow`, `stashUpdate`, `stashHide`). Resume restores the boxes.
- Balance, win credit and the bonus outro are correct end to end.

## Run it

```bash
node tools/book-gen/coin-reel.mjs            # (re)generate synthetic books
node tools/mock-rgs/server.mjs 5099
cd apps/coin-reel && npx vite dev --port 3203
```

Open `http://localhost:3203/?sessionID=dev-1&game_id=coin-reel&currency=ZAR&lang=en&device=desktop&rgs_url=http://localhost:5099`.
Force features with `/mock/queue` (see `tools/mock-rgs/README.md`), for example
`/mock/books/coin-reel/BASE?event=stashUpdate`.

Books are **synthetic visual-test books**, not maths. Real maths must emit the same event names.

## Also done

- Second bonus *Treasure Vault* (per-reel coin pot that pays again), bought via the menu or 2+ free-spin reels.
- Four-card buy menu (`src/game/betModes.ts`): BONUS HUNT, COIN RUSH (boosts), MULTIPLIER MINE, TREASURE VAULT (buys).
- Placeholder mascot with reactions; board dim on collect; portrait layout.

## Next

See `docs/HANDOFF.md` (kept current by every agent).
