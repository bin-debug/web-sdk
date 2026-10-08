# Prompt for Codex (copy everything inside the box, paste into Codex, send)

Trial run: one feature, `reel-stash`. Codex builds and opens the PR but does NOT merge; a Claude session reviews it.
After the review the owner decides whether to keep this split.

```
You are building ONE item for a slot game-shell engine. Repo https://github.com/bin-debug/web-sdk (origin),
integration branch `studio-kit`, main checkout C:\source\_studio-kit\web-sdk (Windows, Git Bash / PowerShell).
Item: `reel-stash` (row in docs/features/STATUS.md). Do it end to end yourself; the owner only tests on a phone.

HARD RULES (a previous review found bugs from every one of these)
- PUBLIC repo: no IPs, hostnames, tokens, emails or client names in code, docs, commits, branch names or PRs.
- Never push to `dev`, `main` or anything except your own feature branch. Never `git add -A` at the repo root:
  add only the paths you changed (another session leaves untracked files such as .codex-backups/ and
  tools/mock-rgs/books/*). Check `git status` before every commit. Do not commit generated books.
- Events are the contract (docs/features/BOOK-EVENTS.md). The client NEVER rolls, sums, orders or decides anything:
  every number on screen comes from a book event. Add fields only as optional; change the shape in BOOK-EVENTS.md
  in the same PR as the code and extend tools/book-gen/contract/rules/*.mjs (+ one failing example book in
  tools/book-gen/contract-tests/ per rule).
- Match the surrounding code (naming, comment density, tabs). Our own names only. Art goes through slots with a
  code fallback; never generate art. Files here are LF or CRLF depending on the file: keep each file's line endings.

STEPS
1. cd C:\source\_studio-kit\web-sdk ; git fetch origin ; git checkout studio-kit ; git pull --ff-only
   Read docs/features/STATUS.md. Confirm `reel-stash` is `todo`, its Needs are `merged`, and
   `git ls-remote --heads origin feature/reel-stash` is empty. Then claim it first:
   git worktree add ..\_feat-reel-stash -b feature/reel-stash origin/studio-kit ; cd ..\_feat-reel-stash
   set the row to `claimed`, commit "claim reel-stash", git push -u origin feature/reel-stash
   pnpm install ; pnpm run build --filter=pixi-svelte
2. Read ONLY: docs/HANDOFF.md (Status + top 6 log entries), docs/features/README.md, docs/features/reel-stash.md,
   docs/features/bottom-row-expand.md and coins.md (what it builds on), docs/features/BOOK-EVENTS.md.
   Study these merged features as the pattern to copy (state file + layer component + register.ts + book generator):
   apps/shell/src/features/triggerRow/, features/holdAndWin/, features/collectors/, tools/book-gen/features/bottomRowExpand.mjs.
3. Build `reel-stash` as the spec says (both variants `multiply` and `bank`, chosen in game.spec.json). Test game:
   scatter_tumble. Wire: handler map (apps/shell/src/game/bookEventHandlerMap.ts), Game.svelte, typesBookEvent.ts,
   tools/book-gen/features/<featureId>.mjs, the game spec features list, packages/kit-spec/src/features.ts
   (`implemented: true` only when it all works).

LESSONS FROM THE LAST REVIEWS (apply every one)
1. Every layer you add must be cleared by the `reveal` handler of a new spin (see clearWilds/clearCoins/clearHold
   there) and by a skipped or interrupted round. A stale box or counter from the previous spin is a bug.
2. Numbers that accumulate (running win, meters, banks) must be CUMULATIVE across events in the round, not the
   last event's value. The shown value must equal the book after EVERY event; test that, not only the end.
3. When two features touch the same cell or value (coins, multipliers, collectors) decide who owns the payout and
   skip the generic one, so nothing pays or animates twice. If you reuse coins.flipIn / payOut / collectCoins /
   multiplyCoins, read how they are used in features/clovers and features/collectors first.
4. Scenario books must be REAL ROUNDS in the order the engine plays them (reveal, then your events, then
   setWin / setTotalWin / finalWin), with correct padded vs visible rows (SDK events such as winInfo, tumbleBoard and
   reveal use padded rows = visible row + 1; new events use visible 0-based rows), and totals that add up.
   Do not hand-wave a book that only looks right in one frame. A book with several chained steps must end cleanly.
5. Reload mid-feature must resume: a book is only resumable if the SDK keeps the round open. That happens when it
   has several `reveal` events or a type listed in checkIsBonusGame (apps/shell/src/game/actor.ts). Events that
   rebuild state must be in BOOK_EVENT_TYPES_TO_RESERVE_FOR_SNAPSHOT (game/utils.ts), and long features record
   resume points with recordBookEvent. Single-reveal win books are closed at once and cannot resume: say so in the
   PR instead of claiming resume works. Restore must not animate.
6. Turbo and skip: use the `t()` time helper pattern (0.4x when stateBet.isTurbo || isSpaceHold) in every wait/tween.
7. Layering: new layers/banners must not hide behind coins or the board; check z-order at both sizes.
8. Do not "fix" unrelated pre-existing failures (svelte-check errors on textStyle `align` and i18n messagesMap are known
   and not yours). Do not touch other features' files beyond the small wiring lines.

VERIFY (definition of done is in docs/features/README.md; do all of it, paste the evidence in the PR)
- node tools/book-gen/shell.mjs scatter_tumble ; node tools/book-gen/check-contract.mjs <each demo game id>
  (lines_classic cluster_classic scatter_tumble ways_classic) all `0 problems` ; node tools/book-gen/contract-tests/run.mjs all pass.
- Demo RGS: start `node tools/mock-rgs/server.mjs 5119` detached if not running (books come from
  tools/mock-rgs/books, generated by shell.mjs; after regenerating call
  curl -XPOST localhost:5119/mock/reset -d '{"gameId":"scatter_tumble"}' and reload the page). Dev server:
  `cd apps/shell ; npx vite dev --host --port 3250 --strictPort` (any free port from 3250 up).
- Play your scenario books (force one with
  curl -XPOST localhost:5119/mock/queue -d '{"gameId":"scatter_tumble","mode":"BASE","id":[<book id>]}')
  at 1600x900 and 375x812, with `?art=none` and with art, turbo on, and a reload mid-feature. Use
  tools/qa/hidden-pane-raf-shim.js if the browser is hidden/background. Zero console errors. Open URL form:
  http://localhost:3250/?sessionID=qa-1&game_id=scatter_tumble&currency=ZAR&lang=en&device=desktop&rgs_url=http://localhost:5119&art=none
  (the first page load is slow; click "press anywhere to continue" and wait for the board before the first bet;
  after /mock/reset reload the page, a new sessionID per run avoids "round still active").
- If you cannot drive a browser, say so plainly in the PR and list exactly which checks you did and did not run.
  Do not claim a visual check you did not do.
- `cd apps/shell ; npx vite build` must succeed.

SHIP (do NOT merge)
- Update the STATUS.md row to `PR open` with a short note, add ONE log entry on top of the Session log in
  docs/HANDOFF.md, add a "Shipped as" line to docs/features/reel-stash.md.
- Small clean commits in plain English. Trailer on each commit: Co-Authored-By: Codex <noreply@openai.com>
- git fetch ; git rebase origin/studio-kit ; git push -u origin feature/reel-stash
- gh pr create --base studio-kit with a body that has: what changed, files touched, the scenario book ids and what
  each shows, the verification evidence, known gaps. End the body with: "Built by Codex, review requested."
- Leave the PR open and stop. Do not start another item.

FINAL REPLY (short): PR link, book ids to test, any check you could not run.
```
