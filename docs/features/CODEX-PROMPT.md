# Prompt for Codex (copy everything inside the box, paste into Codex, send)

Fourth run: one feature, `refill-respins`. reel-stash and refill-respins merged after one review round; the review always finds bugs that only show with ART ON
(not `?art=none`) and on mobile, so test those first. Codex builds and opens the PR but does NOT merge; a Claude session reviews it.

```
You are building ONE item for a slot game-shell engine. Repo https://github.com/bin-debug/web-sdk (origin),
integration branch `studio-kit`, main checkout C:\source\_studio-kit\web-sdk (Windows, Git Bash / PowerShell).
Item: `refill-respins` (row in docs/features/STATUS.md). Do it end to end yourself; the owner only tests on a phone.

HARD RULES
- PUBLIC repo: no IPs, hostnames, tokens, emails or client names in code, docs, commits, branch names or PRs.
- Never push to `dev`, `main` or anything except your own feature branch. Never `git add -A` at the repo root:
  add only the paths you changed (other sessions leave untracked files such as .codex-backups/ and
  tools/mock-rgs/books/*). Check `git status` before every commit. Do not commit generated books.
- Events are the contract (docs/features/BOOK-EVENTS.md). The client NEVER rolls, sums, orders or decides anything:
  every number on screen comes from a book event. Add fields only as optional; change the shape in BOOK-EVENTS.md
  in the same PR as the code and extend tools/book-gen/contract/rules/*.mjs (+ one failing example book in
  tools/book-gen/contract-tests/ per rule).
- Match the surrounding code (naming, comment density, tabs). Our own names only. Art goes through slots with a
  code fallback; never generate art. Keep each file's line endings (LF or CRLF).
- Write plain files with your editor tools, not shell heredocs full of quotes (they break on Windows).

STEPS
1. cd C:\source\_studio-kit\web-sdk ; git fetch origin ; git checkout studio-kit ; git pull --ff-only
   Read docs/features/STATUS.md. Confirm `refill-respins` is `todo`, its Needs are `merged`, and
   `git ls-remote --heads origin feature/refill-respins` is empty. Claim it first:
   git worktree add ..\_feat-refill-respins -b feature/refill-respins origin/studio-kit ; cd ..\_feat-refill-respins
   set the row to `claimed`, commit "claim refill-respins", git push -u origin feature/refill-respins
   pnpm install ; pnpm run build --filter=pixi-svelte
2. RESEARCH FIRST: before writing code, look up how a refilling respin counter works in real slots (respins that reset to 3 when a new
   symbol lands, shown as a number outside the board) and write 5-8 lines in the PR on the standard and where you follow or deviate.
   NOTE: hold-and-win already shows a RESPINS number pill (apps/shell/src/features/holdAndWin/HoldLayer.svelte) fed by `respin.lives`.
   Build `respinCounter` as a shared component the hold bonus and other respin bonuses (e.g. sticky wilds respins) can use, and make
   hold-and-win use it instead of its own pill, without changing how hold plays. If the spec differs from the standard, build the spec and say so.
3. Read ONLY: docs/HANDOFF.md (Status + top 6 log entries), docs/features/README.md, docs/features/refill-respins.md,
   docs/features/hold-and-win.md, docs/features/sticky-wilds.md, docs/features/BOOK-EVENTS.md.
   Study as the pattern: apps/shell/src/features/holdAndWin/ (holdState, HoldLayer, register.ts), apps/shell/src/features/stickyWilds/,
   tools/book-gen/features/holdAndWin.mjs and _holdRound.mjs, tools/book-gen/contract/rules/holdwin.mjs (respinCounter rule exists).
4. Build `refill-respins` as the spec says. Test game: lines_classic (feature id `refillRespins`, books `refill_basic` and one
   hold-and-win book still playing with the shared counter). Wire: handler/register, typesBookEvent.ts, tools/book-gen/features/refillRespins.mjs,
   the game spec features list (append at the END so earlier book ids do not shift), packages/kit-spec/src/features.ts.

LESSONS FROM THE LAST REVIEWS (apply every one)
1. Every layer/state you add must be cleared by the `reveal` handler of a new spin and by a skipped or interrupted round.
2. Numbers that accumulate must be CUMULATIVE across events in the round. The shown value must equal the book after EVERY event.
3. When two features touch the same cell or value, decide who owns it and skip the generic one, so nothing pays or animates twice.
4. Scenario books must be REAL ROUNDS in engine order (reveal, your events, setWin / setTotalWin / finalWin), with correct
   padded vs visible rows (SDK events reveal/winInfo/tumbleBoard use padded rows = visible + 1; new events use visible
   0-based rows) and totals that add up. Numbers must be CONSISTENT, never invented. Add a contract rule that checks the
   whole round (e.g. the removed cells really are all the matching symbols), with failing example books.
5. Reload mid-feature must resume: a book is only resumable if the SDK keeps the round open (several `reveal` events or a
   type in checkIsBonusGame, apps/shell/src/game/actor.ts). Events that rebuild state go in
   BOOK_EVENT_TYPES_TO_RESERVE_FOR_SNAPSHOT (game/utils.ts). Restore must not animate. Single-reveal win books cannot
   resume: say so. TEST the reload, do not just claim it.
6. Turbo and skip: use the `t()` time helper (0.4x when stateBet.isTurbo || isSpaceHold) in every wait/tween.
7. Layering: new layers must not hide behind coins, the board, the win pill or the betting bar. Screenshot 375x812 AND
   1600x900 and check overlaps (win pill, logo, buttons).
8. Test EVERY scenario book you add, end to end, and read the final balance/win against the book total.
9. Before QA, check which dev server and RGS port you are really using (a port may be taken by another session or by a
   server running an old worktree): start your own from YOUR worktree on a free port and use that rgs_url. A board that
   stays black or a "reveal" that never ends is usually that, or the known flake where the first bet does nothing:
   click spin again. The first page load is slow (wait ~30 s) and Vite re-bundles after edits.
10. ART ON: always play with art on too (drop `&art=none`), check the console for errors, and never use a symbol/constant without importing it.
11. Do not "fix" unrelated pre-existing failures (svelte-check errors on textStyle `align`, i18n messagesMap, the
   overlapping BALANCE/WIN labels in the bar). Do not touch other features' files beyond small wiring lines.

VERIFY (do all of it, paste the evidence in the PR)
- node tools/book-gen/shell.mjs lines_classic ; node tools/book-gen/check-contract.mjs <each of: lines_classic
  cluster_classic scatter_tumble ways_classic> all `0 problems` ; node tools/book-gen/contract-tests/run.mjs all pass.
- Demo RGS: `node tools/mock-rgs/server.mjs <free port>` from your worktree; after regenerating books call
  curl -XPOST localhost:<port>/mock/reset -d '{"gameId":"lines_classic"}' and reload the page. Dev server:
  `cd apps/shell ; npx vite dev --host --port <free port> --strictPort`.
- Play your scenario books (force one with
  curl -XPOST localhost:<rgs>/mock/queue -d '{"gameId":"lines_classic","mode":"BASE","id":[<book id>]}')
  at 1600x900 and 375x812, with `?art=none` and with art, turbo on, and a reload mid-feature. Use
  tools/qa/hidden-pane-raf-shim.js if the browser is hidden. Zero console errors. URL form:
  http://localhost:<dev>/?sessionID=qa-1&game_id=lines_classic&currency=ZAR&lang=en&device=desktop&rgs_url=http://localhost:<rgs>  (add &art=none for the code-only view, but ALSO test without it)
  (click "press anywhere to continue" before the first bet; use a new sessionID after a reset).
- If you cannot drive a browser, say so plainly in the PR and list exactly which checks you did and did not run.
  Do not claim a visual check you did not do.
- `cd apps/shell ; npx vite build` must succeed.

SHIP (do NOT merge)
- STATUS.md row to `PR open` with a short note, ONE log entry on top of the Session log in docs/HANDOFF.md,
  a "Shipped as" line in docs/features/refill-respins.md.
- Small clean commits in plain English. Trailer on each: Co-Authored-By: Codex <noreply@openai.com>
- git fetch ; git rebase origin/studio-kit ; git push -u origin feature/refill-respins
- gh pr create --base studio-kit with a body: what changed, the industry research notes, files touched, scenario book ids
  and what each shows, verification evidence, known gaps. End with: "Built by Codex, review requested."
- Leave the PR open and stop. Do not start another item.

FINAL REPLY (short): PR link, book ids to test, any check you could not run.
```
