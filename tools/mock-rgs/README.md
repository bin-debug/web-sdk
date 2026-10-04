# mock-rgs

A zero-dependency stand-in for the Stake Engine RGS so any game can be played in Vite with any
books, including mechanics that have no certified maths yet. **Local front-end testing only.**
Outcomes are whatever books you give it; nothing here is certified.

```bash
node tools/mock-rgs/server.mjs 5099
```

Launch a game against it:

```
http://localhost:<vite-port>/?sessionID=dev-1&game_id=<gameId>&currency=ZAR&lang=en&device=desktop&rgs_url=http://localhost:5099
```

New `sessionID` = new wallet (10,000 ZAR).

## Where books come from

For `game_id=<gameId>` and bet mode `<MODE>` (BASE, BONUS, …), the first file found wins:

1. `tools/mock-rgs/books/<gameId>/<mode>.jsonl`: one book per line (math-sdk format, unzipped)
2. `tools/mock-rgs/books/<gameId>/<mode>.json`: array of books
3. `tools/mock-rgs/books/<gameId>/<mode>.mjs`: `export default [...]` (handy for generated books)
4. `apps/<gameId>/src/stories/data/<mode>_books.ts`: the story books every template ships with

So `game_id=lines|ways|scatter|cluster|price` works with no setup.

Bet-mode costs come from `books/<gameId>/modes.json` (`{"BASE":{"cost":1},"BONUS":{"cost":100}}`)
or the app's `src/game/config.ts` `betModes`.

A book is `{ id, payoutMultiplier, events: [...] }`. The payout is taken from the last
`finalWin`/`setTotalWin` event (book units, 100 = 1x), falling back to `payoutMultiplier`.

## Forcing outcomes

```bash
# find books: by event type and minimum win (x bet)
curl "localhost:5099/mock/books/lines/BASE?event=freeSpinTrigger&minWin=20&limit=5"

# queue specific books for the next spins of a game+mode
curl -XPOST localhost:5099/mock/queue -d '{"gameId":"lines","mode":"BASE","id":[84,240]}'

# reset wallets, queues and the book cache (after editing book files)
curl -XPOST localhost:5099/mock/reset -d '{}'
```

## Endpoints implemented

`/wallet/authenticate`, `/wallet/balance`, `/wallet/play`, `/wallet/end-round`, `/bet/event`,
plus `/health`. Wins are credited on `end-round`; a round with a win stays `active` until then, so
reloading mid-bonus exercises the resume path. Amounts use the real API scale (1,000,000 = 1 unit).

## Using the real local RGS instead

The Docker RGS (`https://<tailscale-host>:5078`, books from `gambit-books-api`) only has cluster
books mounted. To serve other certified maths, publish the math-sdk game
(`math-sdk/games/<id>/library/publish_files`) and mount it in `docker-compose-local-stack.yml`
under `gambit-books-api` like the cluster books, then register the game in the backoffice.
