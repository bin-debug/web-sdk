# coin-reel runbook (for a fresh session, any model)

Read this first, then `BUILD-PLAN.md` (asset IDs, specs, acceptance tests) and `docs/HANDOFF.md`
(stack, servers). Work one **step** per session if context is tight; tick the checkbox and push after
each step so the next session can pick up.

## Rules (do not break)
- Branch `studio-kit`, repo is a **public fork**: no hostnames, IPs, tokens, emails or client names in
  commits. Commit + push after every step. End commit messages with the attribution line.
- 100% our own art/audio. Never copy, trace or prompt for the reference game's look (no 1930s
  rubber-hose cartoon, no grinning skull, no black-and-white base).
- Masters (PNG/MP4/WAV) go to `C:\source\_studio-kit\art-masters\coin-reel\` (outside the repo).
  Only game-ready files go in `apps/coin-reel/static/assets/`. Never commit a file > 2 MB.
- Artlist plan: **AI Starter, 16,500 credits/month**. Log every batch in BUILD-PLAN §3 (credits
  before/after). Stop and ask the owner if a step will exceed its budget below by > 30%.
- Never handle the owner's Artlist token. If the Artlist MCP tools are missing, tell the owner to
  start a new session (MCP loads at session start).
- Owner reviews on phone: always give the full Tailscale URL (see "Phone review").
- Keep replies short. Owner sign-off is required where marked **STOP**.

## Pipeline (one asset)
1. Still: Artlist image, 1024², subject centred in middle 80%, **pure #00FF00 background** (or
   transparent if the model supports it), no text. Download to masters folder.
2. Clip: Artlist image-to-video from that still, same green, "first and last frame match the still,
   camera locked, no zoom". Min length is 5 s; we trim.
3. Key + sheet:
   `node tools/video-to-sprites/video-to-sprites.mjs <clip.mp4> --name H1_win --out apps/coin-reel/static/assets/symbols --key 00ff00 --cell 256 --fps 24 --duration 2 --crop 1240:1076`
   (`--crop` only for 16:9 clips; check `.preview.webp` for green fringe — raise `--similarity` to
   0.15–0.2 if fringed.)
4. Still to transparent PNG: same key via ffmpeg, e.g.
   `ffmpeg -i H1.png -vf "colorkey=0x00ff00:0.12:0.08,despill=type=green:mix=1,scale=512:512" H1_static.webp`
5. Wire in `src/game/assets.ts` + `src/game/constants.ts` `SYMBOL_INFO_MAP` (pattern: `H1.win`
   type `spriteSheet`; statics type `sprite`).
6. Verify in browser with a queued book (HANDOFF "Useful facts"; H1 wins: books 10,17,35,58,60).

## Phone review
Start (detached, ports 3213/5109 so other sessions' 3203/5099 are untouched):
```
node tools/mock-rgs/server.mjs 5109
cd apps/coin-reel && npx vite dev --host --port 3213
```
Use the Tailscale **IP** (hostname gets 403 from Vite). Game URL:
`http://<tailscale-ip>:3213/?sessionID=phone-1&game_id=coin-reel&currency=ZAR&lang=en&device=mobile&rgs_url=http://<tailscale-ip>:5109`
Review page (git-ignored): `http://<tailscale-ip>:3213/review/index.html` — update it with each step's
outputs (stills, raw clip, keyed preview) so the owner can judge from the phone.
Queue outcomes: `curl -XPOST localhost:5109/mock/queue -d '{"gameId":"coin-reel","mode":"BASE","id":[35,22,10]}'`

## Steps

| # | Step | Budget (credits) | Status |
|---|---|---|---|
| 0 | Pipeline proof | 0 (free tier) | [x] 2026-10-05 |
| 1 | **Style board**: for each D1 option, 1 high symbol + 1 low symbol + bg thumbnail + mascot sketch (best image model, e.g. Nano Banana 2). Put all on the review page. **STOP**: owner picks theme (D1), style (D3), name (D2). Record in BUILD-PLAN §0. | 300 | [ ] |
| 2 | **Mascot lock**: master (front, full body, neutral) + point/cheer/sad poses from the master. **STOP**: owner approves (D4). | 250 | [ ] |
| 3 | **Symbols**: L1–L4, H1–H4, W, S stills (S-01..10) → static sprites in game, replacing `symbolsStatic`. Same prompt prefix for the whole set (style, outline, light from top-left). | 600 | [ ] |
| 4 | **Win clips**: C-01..05, C-07 (H1–H4 win, W/S land) → sprite sheets. | 1,200 | [ ] |
| 5 | **Backgrounds + logo**: S-17..19 (16:9 and 9:16). **STOP**: owner reviews the vertical slice on phone. | 300 | [ ] |
| 6 | **Coins, bonus, buy menu**: S-11..15, S-20, S-21. | 400 | [ ] |
| 7 | **Mascot clips + FX**: C-10..12 from the approved master only; C-06, C-08, C-09. | 1,200 | [ ] |
| 8 | **Big win, bg loops, transition**: C-13..16 (needs `video` asset type, BUILD-PLAN §4.3). | 800 | [ ] |
| 9 | **Audio**: A-01..04, pack into Howler sprite with names from `src/game/sound.ts`. | 800 | [ ] |
| 10 | **Template removal**: BUILD-PLAN §4 (delete spines/sprites/fonts/audio, web font, grep check). | 0 | [ ] |
| 11 | **QA**: BUILD-PLAN §5.2 scenarios at 3 viewports, zero console errors. **STOP**: owner final sign-off. | 0 | [ ] |
| | **Total** | **≈ 5,850** | |

After each step: update the review page, log credits in BUILD-PLAN §3, tick the box here, add a
3–5 line entry to HANDOFF.md session log, commit + push, send the owner the phone URLs.

## When to hand back to a stronger model
Escalate (tell the owner) instead of looping if: a Svelte/Pixi bug isn't fixed in 2 attempts,
keyed edges stay dirty after 3 tries, or the set looks inconsistent and prompts aren't fixing it.
