# contract-check (tool, build FIRST, small)

- **Branch:** `feature/contract-check` · **Needs:** nothing · **Shells:** all
- **Goal:** `tools/book-gen/check-contract.mjs <gameId> [--books=path]` validates books against
  `BOOK-EVENTS.md`, so synthetic and real math-sdk books are held to the same shapes.
- **Build:** a rule table keyed by event `type` (required fields, types, positions inside the board
  from the game spec, sequential `index`, parallel arrays equal length). Unknown event types are an
  error unless they are existing SDK events. Output: one line per problem with book id + event
  index; exit code 1 on any problem. Support `.json` arrays and math-sdk `books_*.jsonl(.zst)`.
- **Also:** a `check:contract` package script; run it after book-gen in the QA runner.
- **Acceptance:** all current shell books pass; `tools/book-gen/contract-tests/` holds one deliberately
  bad book per rule and each fails with the expected message. Later feature sessions only ADD rules.
