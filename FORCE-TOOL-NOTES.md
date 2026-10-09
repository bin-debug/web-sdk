# Force tool notes

Changed shared RGS schema/request types, authentication and spin state, and added the shared `ForcePanel` mounted in the UI modal layer.

Test with `pnpm install` then `pnpm --filter pixi-svelte build` (only needed in a clean checkout to make that workspace dependency) and `pnpm --filter ke-dezemba build`. The panel is absent unless authenticate returns `forceTool.enabled`.
