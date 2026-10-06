# Session prompts (copy one into a new chat)

Run Session A and Session B in parallel. Start Session C once Session B has phase 2 done.
Each session reads and updates the same docs, so they can be stopped and resumed at any time.

---

## Session A: demo art library (needs the Artlist MCP)

```
You are building the shared DEMO ART LIBRARY for our slot "game shells". Work in the git worktree
C:\source\_studio-kit\web-sdk (branch studio-kit). Do not touch C:\source\web-sdk.

READ FIRST, IN THIS ORDER (every session, before doing anything):
1. C:\source\_studio-kit\web-sdk\docs\HANDOFF.md            (status, rules, session log)
2. C:\source\_studio-kit\web-sdk\docs\DEMO-ART-SPEC.md      (YOUR SPEC: every asset, slot names, models, pipeline, budget)
3. C:\source\_studio-kit\web-sdk\docs\SHELL-PLAN.md         (why the assets exist: shells, features, Game Builder)
4. C:\source\_studio-kit\web-sdk\docs\games\coin-reel\BUILD-PLAN.md  sections 0 and 3 (proven Artlist models, real credit costs, keying lessons)
5. C:\source\_studio-kit\web-sdk\docs\games\coin-reel\RUNBOOK.md     ("Pipeline (one asset)" and "Phone review")
6. C:\source\_studio-kit\web-sdk\tools\video-to-sprites\README.md
Reference (feel/mechanics only, never copy its art): the teardown doc
https://claude.ai/code/artifact/775c8b19-eae2-46c1-9349-bd9d16278405

TASK
Generate EVERY asset in DEMO-ART-SPEC.md sections 3-8a (mascot "Rusty" + 6 clips, L1-L6, H1-H6 with
win clips, E1-E4, all bonus/feature symbols and their clips, shared FX, backgrounds, board, logo,
audio). Key them, make the sprite sheets, write packages/kit-demo-art/static/demo/manifest.json and
contact-sheet.html exactly as the spec says. Masters go to C:\source\shared\demo-art-library\masters\.

NO APPROVAL STOPS. The owner does not want to approve these. They are demo assets: use your best
judgement, regenerate anything that fails the quality gates in spec section 8, and keep going batch
after batch. Ignore the "stop after each batch" line in section 8; still build the contact sheet.
Budget guard: about 8,500 credits planned. Keep going without asking up to 11,000; only stop and
ask if you would go past that. Check get_generation_cost before each batch.

PHONE REVIEW (always)
- Serve the contact sheet so the owner can see it on his phone: get the Tailscale IP with
  `tailscale ip -4`, run a static server on port 3221 bound to all interfaces, e.g.
  `npx http-server packages/kit-demo-art/static/demo -p 3221 -a 0.0.0.0 -c-1` (run detached).
- Use the Tailscale IP, not the hostname (the hostname gets 403 from Vite-style hosts).
- At the end of EVERY reply where something new was generated, give the full URL:
  http://<tailscale-ip>:3221/contact-sheet.html

EVERY PASS (do this before you finish each work block, and before your context runs out):
1. Log credits in DEMO-ART-SPEC.md section 10 (date, batch, credits before -> after, model, notes).
2. Update docs/HANDOFF.md: Status, Next up, and a new Session log entry on top (newest first).
3. Commit and push to origin studio-kit. The repo is a PUBLIC fork: no IPs, hostnames, tokens or
   emails in commits or docs. Never commit a file over 2 MB (masters stay outside the repo).
   End commit messages with: Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>

RULES
- Original art only. Never prompt for Hacksaw characters or names (no raccoon "Smokey", no skull
  reaper, no clowns). Our mascot is Rusty the fox (spec section 3).
- Generate mascot clips only from the mascot master image, so Rusty stays consistent.
- Key against the SAMPLED background colour (AI green is often not pure #00FF00).
- If the Artlist MCP tools are missing, tell the owner to restart the session; never ask for tokens.
- Keep replies short: what was made, credits used, the Tailscale link.
```

---

## Session B: shell engine + demo RGS

```
You are building the GAME SHELL ENGINE: one spec-driven game app where a game = game.spec.json +
art + books. Work in the git worktree C:\source\_studio-kit\web-sdk (branch studio-kit). Do not
touch C:\source\web-sdk or the other worktrees (_dev-worktrees, _merge, _promo).

READ FIRST, IN THIS ORDER (every session, before doing anything):
1. C:\source\_studio-kit\web-sdk\docs\HANDOFF.md            (status, rules, session log)
2. C:\source\_studio-kit\web-sdk\docs\SHELL-PLAN.md         (YOUR PLAN: architecture, art-slot contract,
                                                            spec, feature library, shell catalogue, phases)
3. C:\source\_studio-kit\web-sdk\docs\STUDIO-KIT-PLAN.md    (SDK internals, layouts, mechanics, RGS contract, rules)
4. C:\source\_studio-kit\web-sdk\docs\DEMO-ART-SPEC.md      (slot names + manifest.json format you must load)
5. C:\source\_studio-kit\web-sdk\README.md                  (web-sdk basics: books, bookEvents, emitter events)
6. C:\source\_studio-kit\web-sdk\tools\mock-rgs\README.md
7. C:\source\gambit-slot-games\docs\GAME-PIPELINE.md        (build/release rules)
Reference for layouts, rules and timings (feel only): the teardown doc
https://claude.ai/code/artifact/775c8b19-eae2-46c1-9349-bd9d16278405
Code to extract from (don't rewrite): apps/lines, ways, scatter, cluster, price, and
apps/coin-reel (HacksawBar.svelte, squash drop, betModes.ts, buy menu, mascot, coin collect).
graphify-out/graph.json exists: run `graphify query "<question>"` to orient before reading source.

TASK (in order; SHELL-PLAN section 8)
Phase 1: art/audio slot loader reading packages/kit-demo-art/static/demo/manifest.json, with CODE
  FALLBACKS for every slot (coloured tile + name, code mascot silhouette, juice presets), and
  packages/kit-symbols. Accept: a shell plays with an EMPTY art folder and loads zero template assets.
Phase 2: apps/shell + game.spec.json + spec-check + kit-layout + kit-ui (promote coin-reel's
  HacksawBar). Accept: specs reproduce shells 5-8 (lines, ways, scatter-tumble, cluster-classic).
Then shells 1-4 and 9 (SHELL-PLAN section 6), one feature module at a time, each with a story and
  synthetic books.
Session A is generating the demo art in parallel. If the manifest is not there yet, use the
fallbacks; switch to the real art as soon as it appears. Never wait for art.

DEMO RGS (required; this is how every shell is played)
- Use tools/mock-rgs as the demo RGS. Extend tools/book-gen so EVERY shell has synthetic books for
  every mode and feature, plus forced scenarios (base win, tumble chain, each bonus, hold & win,
  jackpot, retrigger, max win). Mock books are visual tests only, never maths.
- Ports for this session (other sessions use 3203/5099/3213/5109): demo RGS 5119, shell apps from
  3222 upward (one port per shell), all bound to all interfaces (vite --host, server on 0.0.0.0).
- Reset queues before and after each test round: curl -XPOST localhost:5119/mock/reset -d '{"gameId":"<id>"}'

PHONE TESTING (always)
- Get the Tailscale IP with `tailscale ip -4`. Use the IP, not the hostname (Vite returns 403).
- Every time a shell is playable or changed, end your reply with full links, one per shell:
  http://<tailscale-ip>:<port>/?sessionID=phone-1&game_id=<gameId>&currency=ZAR&lang=en&device=mobile&rgs_url=http://<tailscale-ip>:5119
  and list which scenario curl commands force each feature.
- Verify yourself first: the hidden browser pane pauses requestAnimationFrame, so run
  tools/qa/hidden-pane-raf-shim.js in the page (after load and after "press to continue"), check
  desktop 1600x900 and 375x812, and check for zero console errors.

EVERY PASS (do this before you finish each work block, and before your context runs out):
1. Tick finished items in SHELL-PLAN.md section 8 and update its "Written/Last checked" date.
2. Update docs/HANDOFF.md: Status, Next up, ports/servers running, and a new Session log entry on
   top (newest first).
3. Commit and push to origin studio-kit, one phase/feature per commit. PUBLIC fork: no IPs,
   hostnames, tokens or emails in commits or docs.
   End commit messages with: Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>

RULES
- No component may reference a template asset; everything goes through slots + fallbacks.
- Never put outcome logic in the client: if a visual needs data, add it to the book event.
- Our own names for every mechanic (no FeatureSpins, BonusHunt or other Hacksaw marks).
- After editing packages/pixi-svelte run: pnpm run build --filter=pixi-svelte
- Never bake localhost/Tailscale RGS URLs into release builds.
- No approval stops: make sensible decisions and note them in HANDOFF.md.
- Keep replies short: what changed, what to test, the Tailscale links.
```

---

## Session C: Game Builder (start after Session B finishes phase 2)

```
You are building the GAME BUILDER: a local web app where the owner defines a slot game, builds it
and plays it. Work in the git worktree C:\source\_studio-kit\web-sdk (branch studio-kit). Do not
touch C:\source\web-sdk.

READ FIRST, IN THIS ORDER (every session):
1. C:\source\_studio-kit\web-sdk\docs\HANDOFF.md
2. C:\source\_studio-kit\web-sdk\docs\SHELL-PLAN.md   (section 7b = YOUR SPEC; sections 3-6 = spec, slots, features, shells)
3. C:\source\_studio-kit\web-sdk\docs\DEMO-ART-SPEC.md (manifest + slot names shown in the art panel)
4. C:\source\_studio-kit\web-sdk\tools\mock-rgs\README.md
5. The game.spec.json schema and spec-check that Session B built (find them via HANDOFF.md).

TASK
Build apps/game-builder (SvelteKit, HTML UI) + tools/builder-server (Node) per SHELL-PLAN 7b:
new-game form -> writes games/<gameId>/game.spec.json -> spec-check with plain-English errors ->
"Build & Play" (build + start the shell against the demo RGS, stream the log) -> play in an iframe
with desktop/tablet/phone toggles -> scenario buttons that queue mock books (base win, tumble chain,
bonus 1/2/3, hold & win, jackpot, retrigger, max win) -> art panel showing every slot (demo art or
fallback badge; drag-and-drop replace; "Generate with Artlist" per slot and "Generate all missing")
-> export a production zip. Only offer shells and features that actually exist; grey out the rest
with the reason.

DEMO RGS AND PHONE TESTING (always)
- Use the demo RGS from Session B (tools/mock-rgs, port 5119). Builder UI on port 3230, builder
  server on 3231, built games on ports 3240+. Bind everything to all interfaces.
- Get the Tailscale IP with `tailscale ip -4` (use the IP, not the hostname). End every reply with:
  Builder: http://<tailscale-ip>:3230/
  plus a direct phone link for any game you built:
  http://<tailscale-ip>:<port>/?sessionID=phone-1&game_id=<gameId>&currency=ZAR&lang=en&device=mobile&rgs_url=http://<tailscale-ip>:5119
- The builder itself must also hand out these phone links (a "Copy phone link" button per game).
- Verify in the browser at 1600x900 and 375x812 with zero console errors (hidden-pane rAF shim:
  tools/qa/hidden-pane-raf-shim.js).

EVERY PASS
1. Update SHELL-PLAN.md section 7b/8 (tick what's done) and docs/HANDOFF.md (Status, Next up, ports,
   session log entry on top).
2. Commit and push to origin studio-kit. PUBLIC fork: no IPs, hostnames, tokens or emails.
   End commit messages with: Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>

RULES
- No approval stops; make sensible UI decisions and note them in HANDOFF.md.
- Flat, full-width, native-feeling UI: lists over tile grids, no boxed glowing panels, no serif fonts.
- Keep replies short: what changed, the Tailscale links.
```
