# The prompts (copy, paste into a new chat, send. Nothing to fill in.)

## Prompt 1: BUILD THE NEXT ITEM (paste the same text into a new window every time)

It reads `docs/features/STATUS.md`, picks the next item that is ready, claims it, builds it, merges it,
leaves a phone link running and tells you what to test. Open as many windows as you like at once; each
one claims a different item. If nothing is ready it says what it is waiting for.

```
You are one of several Claude sessions building the slot game-shell engine, one item per session.
Repo https://github.com/bin-debug/web-sdk (origin); integration branch `studio-kit`; main checkout of the
branch: C:\source\_studio-kit\web-sdk. Do everything yourself; the owner will only test on his phone.

STEP 1: PICK AND CLAIM AN ITEM
  cd C:\source\_studio-kit\web-sdk && git fetch origin && git checkout studio-kit && git pull --ff-only
  Read docs/features/STATUS.md. Pick the first row (lowest Wave, then top to bottom) with State `todo` whose
  Needs are all `merged` or `verified` AND whose Branch does not exist yet (`git ls-remote --heads origin <Branch>`).
  If none is ready: say which items are blocked and by what (or "all done"), and stop.
  Claim it at once, before reading anything else:
    git worktree add ..\_feat-<item> -b <Branch> origin/studio-kit ; cd ..\_feat-<item>
    set the row to `claimed`, commit "claim <item>", git push -u origin <Branch>
  (If the push is rejected because someone claimed it first, pick the next item.)
  Then: pnpm install && pnpm run build --filter=pixi-svelte

STEP 2: READ ONLY THESE (in your worktree)
  docs/HANDOFF.md (Status + top log entry), docs/features/README.md (rules, definition of done, git workflow),
  docs/features/<Spec>.md for your row and the specs in its Needs, docs/features/BOOK-EVENTS.md (your events).
  For a shell row (Wave 5) read docs/features/shells.md instead of a feature spec.
  Use `graphify query "<question>"` or Grep before opening big source files. Do not read the teardown doc.
  For the `real-books-check` row follow the "Real-books check" section at the bottom of docs/features/PROMPTS.md.

STEP 3: BUILD IT exactly as the spec says. Events are the contract; no outcome logic in the client; art through
  slots with code fallbacks; our own names only; honour turbo/skip and reload-resume. Add the book-gen generator under
  tools/book-gen/features/ and extend tools/book-gen/check-contract.mjs for your events (build it first if it is
  missing and your item is contract-check). Demo art is generated elsewhere: never generate art; if a slot is
  missing write one line in docs/DEMO-ART-SPEC.md section 11 and use the code fallback. No approval stops: decide
  sensibly and note decisions in HANDOFF.md.

STEP 4: VERIFY (do it yourself before telling the owner)
  Demo RGS = tools/mock-rgs on port 5119 (start it detached if it is not running, bound to 0.0.0.0).
  Reset queues: curl -XPOST localhost:5119/mock/reset -d '{"gameId":"<Test game id>"}'
  Run your dev server on a free port from 3250 up, detached, bound to all interfaces (vite --host).
  Use tools/qa/hidden-pane-raf-shim.js and tools/qa/shell-qa.js: 1600x900 and 375x812, `?art=none` and with art,
  zero console errors, turbo/skip, reload mid-feature, `node tools/book-gen/check-contract.mjs <Test game id>`.
  Fix what fails. Do not merge anything that fails the definition of done in docs/features/README.md.

STEP 5: SHIP
  Update the STATUS.md row (`merged`, add notes), add one log entry on top of docs/HANDOFF.md, flip `implemented`
  in packages/kit-spec/src/features.ts (feature) or tools/builder-server/shells.json (shell: only if the whole
  shell passes). Commit small and clean, git fetch && git rebase origin/studio-kit, push, `gh pr create --base
  studio-kit`, then `gh pr merge --squash --delete-branch`, then remove the worktree (the dev server for the phone
  link must keep running: start it from C:\source\_studio-kit\web-sdk after the merge, on the same port).
  PUBLIC repo: no IPs, hostnames, tokens, emails or client names in code, docs, commits, branches or PRs.
  Commit trailer: Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
  If `gh` is not logged in or the merge is blocked, leave the PR open and say so in one line.

STEP 6: REPLY TO THE OWNER (short; he is on his phone)
  1. Item done / merged (or what is left).
  2. PHONE LINK (get the IP with `tailscale ip -4`; use the IP, never the hostname):
     http://<tailscale-ip>:<port>/?sessionID=phone-1&game_id=<Test game id>&currency=ZAR&lang=en&device=mobile&rgs_url=http://<tailscale-ip>:5119
  3. "What to test": 3 to 5 bullet steps, each with the exact curl that forces the scenario, e.g.
     curl -XPOST localhost:5119/mock/queue -d '{"gameId":"<id>","mode":"BASE","id":[<book id>]}'
     and what he should see.
  4. "Next: paste Prompt 1 again in a new window."
  Then stop. Do not start another item.
```

## Prompt 2: FIX SOMETHING I FOUND ON MY PHONE (paste, then add one line about what is wrong)

```
You are fixing a problem the owner found while testing the slot game-shell engine on his phone.
Repo https://github.com/bin-debug/web-sdk, branch `studio-kit`, checkout C:\source\_studio-kit\web-sdk.
Do everything yourself. What is wrong (his words) follows after the line "PROBLEM:".

1. cd C:\source\_studio-kit\web-sdk && git fetch origin && git checkout studio-kit && git pull --ff-only
2. Read docs/HANDOFF.md (Status + top log entry), docs/features/README.md (rules, git workflow), and
   docs/features/STATUS.md. Find the item the problem belongs to and read its spec in docs/features/.
3. git worktree add ..\_fix-<short-name> -b fix/<short-name> origin/studio-kit ; pnpm install ; pnpm run build --filter=pixi-svelte
4. Reproduce it against the demo RGS (tools/mock-rgs on 5119; force the scenario with /mock/queue), fix the root cause,
   verify at 1600x900 and 375x812 with tools/qa/hidden-pane-raf-shim.js and tools/qa/shell-qa.js, zero console errors,
   `node tools/book-gen/check-contract.mjs <game id>` passes.
5. Commit, rebase on origin/studio-kit, push, `gh pr create --base studio-kit`, `gh pr merge --squash --delete-branch`,
   remove the worktree, add one line to docs/HANDOFF.md. PUBLIC repo: no IPs, hostnames, tokens, emails.
   Commit trailer: Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
6. Reply short: what was wrong, what you changed, the phone link (`tailscale ip -4`, use the IP):
   http://<tailscale-ip>:<port>/?sessionID=phone-1&game_id=<game id>&currency=ZAR&lang=en&device=mobile&rgs_url=http://<tailscale-ip>:5119
   and the exact curl to re-test it. Keep the dev server running on a port from 3250 up.

PROBLEM:
```

## Real-books check (the last row)

For every shell that has a math-sdk game: generate real books with math-sdk (`C:\source\math-sdk`), run
`node tools/book-gen/check-contract.mjs <gameId> --books=<path>`, and fix either the shell or the BOOK-EVENTS
entry (then state in the PR which math-sdk event must emit the agreed shape). Load 20 real books through the
demo RGS (`/mock/queue` with custom books) and play them in the shell. Do not change math-sdk files without
saying so in the PR.
