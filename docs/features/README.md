# Feature specs: how to build one feature in one session

One session = one feature (or one shell wiring). Read **only** the files named in your prompt.
Do not read the teardown doc, STUDIO-KIT-PLAN or other features' specs unless your spec links them.

Reading order for every feature session (keep it this short):
1. `docs/HANDOFF.md` (status, rules; skim "Status" and the top log entry only)
2. `docs/features/README.md` (this file)
3. `docs/features/<your-feature>.md` (your spec) + the specs in its **Needs** line
4. `docs/features/BOOK-EVENTS.md` (the event contract; only the events your spec lists)
5. `docs/features/STATUS.md` (what is built, what is verified, which branch)

Context for the shells: `docs/SHELL-PLAN.md` sections 3 (art slots) and 5 (feature library) when needed.

## Feature index

| Group | Spec | Used by shells |
|---|---|---|
| Tool | [contract-check](contract-check.md) (build first) | all |
| Core | [tumble-super](tumble-super.md) | 1, 9 |
| Squares | [golden-squares](golden-squares.md), [rainbow-reveal](rainbow-reveal.md), [persist-squares](persist-squares.md) (+ squaresStay, revealEverySpin) | 1 |
| Coins | [coins](coins.md), [clovers](clovers.md), [collectors](collectors.md) | 1, 2, 9 |
| Progression | [symbol-upgrade-bar](symbol-upgrade-bar.md) | 1 |
| Hold and win | [hold-and-win](hold-and-win.md), [jackpot-ladder](jackpot-ladder.md), [refill-respins](refill-respins.md) | 2, 4 |
| Layers | [layers-dynamite](layers-dynamite.md) | 9 |
| Trigger row | [bottom-row-expand](bottom-row-expand.md), [reel-stash](reel-stash.md) | 3 |
| Wilds | [multiplier-wilds](multiplier-wilds.md), [sticky-wilds](sticky-wilds.md), [expanding-reel-wild](expanding-reel-wild.md) | 4 |
| Bonus flow | [tiered-bonuses-boost](tiered-bonuses-boost.md) (3/4/5 scatters, boost, buy menu) | all |

The queue and the claim rule live in `STATUS.md`; the owner pastes ONE prompt (`PROMPTS.md`, Prompt 1) into each new window and the session picks the next ready item itself.

## Recommended build order (shared first)

0. `contract-check` (small; do it first so every later PR is checked)
1. `coins` -> `clovers` -> `collectors` (used by shells 1, 2, 9)
2. `golden-squares` -> `rainbow-reveal` -> `persist-squares` -> `tumble-super` -> `symbol-upgrade-bar` -> **wire shell 1**
3. `hold-and-win` -> `jackpot-ladder` -> `refill-respins` -> **wire shell 2**
4. `bottom-row-expand` -> `reel-stash` -> **wire shell 3**
5. `multiplier-wilds` -> `sticky-wilds` -> `expanding-reel-wild` -> **wire shell 4**
6. `layers-dynamite` -> **wire shell 9**
7. `tiered-bonuses-boost` can run any time after step 1 (it only needs the existing bonus flow).

"Wire shell N" = a session described in [shells.md](shells.md) that adds the shell id to `kit-spec`, a default spec, its book-gen
scenarios, flips `tools/builder-server/shells.json` to verified, and checks the whole shell.

## Rules every feature follows

- **Shape of a feature:** a Svelte component or module under `apps/shell/src/features/<name>/`
  (its own folder), one `register.ts` that adds its event handlers to the handler map, its book-gen
  generator in `tools/book-gen/features/<name>.mjs`, its types in `packages/kit-spec` (feature
  info: flip `implemented: true`). Keep edits to shared files to a few lines (registration only).
- **Contract first:** the events in your spec are the book contract. Do not rename fields. If you
  must change it, edit `BOOK-EVENTS.md` in the same PR and say so in the PR description.
- **No outcome logic in the client.** Every number shown (value, multiplier, position, order) is in
  the book event. The client animates what the book says, in the order it says.
- **Art goes through slots with code fallbacks.** Use the slot ids listed in your spec; the feature
  must play with `?art=none`. If a slot is missing from `manifest.json`, add it to the art
  requests list in `docs/DEMO-ART-SPEC.md` section 11 (one line), do not generate art yourself.
- **Our own names** (no FeatureSpins, BonusHunt, Smokey, Hacksaw marks).
- **Skip/turbo:** every animation must honour turbo and skip (it must end in the same final state).
- **Resume:** a reload in the middle of the feature must restore the state from the bonus snapshot
  (`createBonusSnapshot`), same as the existing bonus flow.
- **Mock RGS only for visual tests.** Synthetic books are not maths. Real books come from math-sdk
  and must pass the same event shapes (see `BOOK-EVENTS.md` "Contract check").

## Definition of done (every feature)

1. Plays end to end against the demo RGS (`tools/mock-rgs`, port 5119) with a forced scenario.
2. `?art=none` plays with zero page errors; the real demo art plays when present.
3. Checked at 1600x900 and 375x812 with the hidden-pane rAF shim; zero console errors.
4. Turbo/skip and a mid-feature reload end in the correct state.
5. Contract check passes: `node tools/book-gen/check-contract.mjs <gameId>` (validates every
   generated book against `BOOK-EVENTS.md` shapes; the session adds the checks for its events).
6. `docs/features/STATUS.md` row updated; `SHELL-PLAN.md` section 8 ticked if a shell finished.
7. PR opened, checks green, squash-merged into `studio-kit`, branch deleted.

## Git workflow (GitHub is connected; every session works on its own branch)

The remote is `origin` (a public fork: no IPs, hostnames, tokens, emails or client names in code,
docs, commits, branch names or PR text). The integration branch is `studio-kit`. Never push to
`dev`, `main` or any other branch.

```bash
git fetch origin && git checkout studio-kit && git pull --ff-only
git checkout -b feature/<feature-name>          # e.g. feature/coins ; shells: shell/<shell-id>
# ... work, commit small and often (messages in plain English) ...
git fetch origin && git rebase origin/studio-kit   # before pushing and again before merging
git push -u origin feature/<feature-name>
gh pr create --base studio-kit --title "<feature>: <what>" --body "<what changed, how tested, links to spec>"
# when the definition of done is met:
gh pr merge --squash --delete-branch
git checkout studio-kit && git pull --ff-only
```

- Several sessions run in parallel, each in **its own worktree** to avoid stepping on each other:
  `git worktree add ../_feat-<name> -b feature/<name> origin/studio-kit`, then `pnpm install`
  there. Remove it after the merge: `git worktree remove ../_feat-<name>`.
- Commit trailer on every commit: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`;
  PR bodies end with the line `Generated with Claude Code`.
- **Conflict hotspots** (shared files): `apps/shell/src/game/bookEventHandlerMap.ts`,
  `apps/shell/src/game/typesBookEvent.ts`, `packages/kit-spec/src/features.ts`,
  `tools/builder-server/shells.json`, `docs/features/STATUS.md`, `docs/HANDOFF.md`. Keep your edits
  there to appended lines; on a conflict keep BOTH sides, rebuild, rerun your check. Never
  force-push over someone else's work; `git push --force-with-lease` only on your own branch.
- HANDOFF.md: add one short log entry on top in your PR (newest first). If it conflicts, keep both.
- If the merge needs the base to move (someone merged first), rebase, rerun the checks, then merge.
- Never merge a PR with failing checks or a failed definition-of-done item; fix or say what is left
  in STATUS.md and leave the PR open.

## Token-saving rules for sessions

- Read only the files above; use `graphify query "<question>"` or Grep before opening large files.
- Do not paste screenshots or long logs into the chat; run the QA runner and report the summary line.
- Do not re-explain the plan. Reply with: what changed, what passed, what is left, Tailscale links.
- Finish the feature, update docs, merge, stop. Do not start the next feature in the same session.
