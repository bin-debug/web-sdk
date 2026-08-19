#!/usr/bin/env bash
# Usage: ./scripts/deploy_game.sh <game-slug>
# Builds a game and copies its dist to gambit-slot-games for CF Pages deployment.
# Example: ./scripts/deploy_game.sh boulder-bash

set -euo pipefail

SLUG="${1:?Usage: deploy_game.sh <game-slug>}"
WEB_SDK_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SLOT_GAMES_DIR="$(cd "$WEB_SDK_DIR/../gambit-slot-games" && pwd)"
DEST="$SLOT_GAMES_DIR/games/$SLUG"

echo "==> Building $SLUG..."
pnpm --filter "$SLUG" build

echo "==> Copying dist to $DEST..."
rm -rf "$DEST"
mkdir -p "$DEST"
BUILD_DIR=""
for candidate in \
  "$WEB_SDK_DIR/apps/$SLUG/build" \
  "$WEB_SDK_DIR/apps/$SLUG/.svelte-kit/output/client" \
  "$WEB_SDK_DIR/apps/$SLUG/dist"; do
  if [ -d "$candidate" ] && [ "$(ls -A "$candidate")" ]; then
    BUILD_DIR="$candidate"
    break
  fi
done
if [ -z "$BUILD_DIR" ]; then
  echo "ERROR: no build output found for $SLUG" >&2
  exit 1
fi
echo "  using build dir: $BUILD_DIR"
cp -r "$BUILD_DIR/." "$DEST/"

echo "==> Pushing to gambit-slot-games..."
cd "$SLOT_GAMES_DIR"
git add "games/$SLUG"
git commit -m "deploy: $SLUG $(date -u '+%Y-%m-%d %H:%M UTC')" || echo "(nothing new to commit)"
git push

echo "==> Done. CF Pages will deploy games/$SLUG automatically."
