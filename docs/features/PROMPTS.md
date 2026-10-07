# Feature session prompt (copy, change ONE line, paste into a new chat)

Replace `<ITEM>` with an item id from the table below. One item per session, one fresh chat each.
Run items from the same wave in parallel (each in its own worktree); start the next wave after the
previous wave has merged.

```
You are building ONE item of the game-shell engine: <ITEM>.
Repo: https://github.com/bin-debug/web-sdk (origin), integration branch `studio-kit`.
Create your own worktree and branch, never work in C:\source\web-sdk or another session's folder:
  cd C:\source\_studio-kit\web-sdk
  git fetch origin && git worktree add ..\_feat-<ITEM> -b <BRANCH> origin/studio-kit
  cd ..\_feat-<ITEM> && pnpm install && pnpm run build --filter=pixi-svelte
(<BRANCH> is in your spec's header, e.g. feature/coins. A shell item uses shell/<shell-id>.)

READ ONLY THESE, IN ORDER:
1. docs/HANDOFF.md            (skim Status + top log entry)
2. docs/features/README.md    (rules, definition of done, git workflow, token rules)
3. docs/features/<ITEM-SPEC>.md  and the specs named in its "Needs" line
4. docs/features/BOOK-EVENTS.md  (the events your spec lists)
5. docs/features/STATUS.md
Use `graphify query "<question>"` or Grep before opening big source files. Do not read the teardown
doc or other plans unless your spec links them.

DO: build the item exactly as its spec says (events are the contract; no outcome logic in the client;
art through slots with code fallbacks; our own names; honour turbo/skip and resume). Add your book-gen
generator under tools/book-gen/features/ and extend tools/book-gen/check-contract.mjs for your events.

DEMO RGS + PHONE TESTING
- Demo RGS = tools/mock-rgs on port 5119 (start it if it is not running). Reset queues:
  curl -XPOST localhost:5119/mock/reset -d '{"gameId":"<id>"}'
- Run your dev server on a free port from 3250 upward, bound to all interfaces (vite --host).
- Get the Tailscale IP with `tailscale ip -4` (use the IP, not the hostname). End every reply with:
  http://<tailscale-ip>:<port>/?sessionID=phone-1&game_id=<gameId>&currency=ZAR&lang=en&device=mobile&rgs_url=http://<tailscale-ip>:5119
  and the curl command(s) that force your scenario.
- Verify yourself first with tools/qa/hidden-pane-raf-shim.js and tools/qa/shell-qa.js: 1600x900 and
  375x812, ?art=none and with art, zero console errors, turbo/skip, reload mid-feature.

GIT (follow docs/features/README.md "Git workflow"): small commits on your branch; rebase on
origin/studio-kit before pushing and before merging; push; open a PR to studio-kit with `gh pr create`;
when the definition of done is met, `gh pr merge --squash --delete-branch`; remove your worktree.
PUBLIC repo: no IPs, hostnames, tokens, emails or client names in code, docs, commits, branches or PRs.
Commit trailer: Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>

BEFORE YOU FINISH: update docs/features/STATUS.md (your row), add one log entry on top of
docs/HANDOFF.md, tick SHELL-PLAN section 8 if a shell completed, flip `implemented` in
packages/kit-spec/src/features.ts (features) or tools/builder-server/shells.json (shells, only when the
whole shell passes). Then stop; do not start another item.
No approval stops: decide sensibly and note decisions in HANDOFF.md. If something blocks you (missing
art slot, a contract change), record it in STATUS.md/DEMO-ART-SPEC section 11 and continue with a fallback.
Keep replies short: what changed, what passed, what is left, the Tailscale link.
```

## Items

| Wave | `<ITEM>` | `<ITEM-SPEC>` | `<BRANCH>` |
|---|---|---|---|
| 0 | contract-check | contract-check | feature/contract-check |
| 1 | coins | coins | feature/coins |
| 1 | tiered-bonuses-boost | tiered-bonuses-boost | feature/tiered-bonuses-boost |
| 1 | multiplier-wilds | multiplier-wilds | feature/multiplier-wilds |
| 1 | bottom-row-expand (needs coins: start wave 2) | bottom-row-expand | feature/bottom-row-expand |
| 2 | clovers | clovers | feature/clovers |
| 2 | collectors | collectors | feature/collectors |
| 2 | golden-squares | golden-squares | feature/golden-squares |
| 2 | hold-and-win | hold-and-win | feature/hold-and-win |
| 2 | sticky-wilds | sticky-wilds | feature/sticky-wilds |
| 2 | expanding-reel-wild | expanding-reel-wild | feature/expanding-reel-wild |
| 3 | rainbow-reveal | rainbow-reveal | feature/rainbow-reveal |
| 3 | jackpot-ladder | jackpot-ladder | feature/jackpot-ladder |
| 3 | refill-respins | refill-respins | feature/refill-respins |
| 3 | tumble-super | tumble-super | feature/tumble-super |
| 3 | reel-stash | reel-stash | feature/reel-stash |
| 4 | persist-squares | persist-squares | feature/persist-squares |
| 4 | symbol-upgrade-bar | symbol-upgrade-bar | feature/symbol-upgrade-bar |
| 4 | layers-dynamite | layers-dynamite | feature/layers-dynamite |
| 5 | shell 2 hold-and-win | shells (row 2) | shell/hold-and-win |
| 5 | shell 4 lines-wilds | shells (row 4) | shell/lines-wilds |
| 5 | shell 3 trigger-row | shells (row 3) | shell/trigger-row |
| 5 | shell 1 cluster-squares | shells (row 1) | shell/cluster-squares |
| 5 | shell 9 layers-dynamite | shells (row 9) | shell/layers-dynamite |
| 6 | real-books check | STATUS.md last row | check/real-books |

Wave rule: an item may start once everything in its spec's "Needs" line is merged. Parallel sessions
in the same wave touch different folders; the only shared files are the registration lines and docs
listed under "Conflict hotspots" in README.md.

Real-books check (wave 6): for each shell that has a math-sdk game, generate real books with math-sdk,
run `node tools/book-gen/check-contract.mjs <gameId> --books=<path>`, fix either the shell or a
BOOK-EVENTS entry (the math-sdk side then emits the agreed shape), and play 20 real books in the shell.
