# builder-server

Local backend for the Game Builder (`apps/game-builder`). Zero dependencies, port 3231. Do not expose it
to the internet: it writes specs and spawns processes.

```bash
node tools/builder-server/server.mjs          # API on :3231
cd apps/game-builder && pnpm dev              # UI on :3230
```

What it does: writes `games/<id>/game.spec.json` (after spec-check), builds a game (book-gen, demo RGS on
5119, a shell dev server on 3240+), queues scenario books on the demo RGS, lists/replaces art slots
(`games/<id>/art/manifest.json`), queues Artlist requests (`games/<id>/art-requests.json`) and exports a
production zip. `shells.json` is the catalogue of shells offered in the form (`verified` shells only).
State (ports, logs, exports) lives in `tools/builder-server/.state/` (git-ignored).
