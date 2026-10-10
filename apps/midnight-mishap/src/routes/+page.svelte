<script lang="ts">
  type Spin = { board: string[]; win: number; clusters: number[]; expander: number; bonus: boolean; freeSpins: number; tumble: string[] | null };
  const atlas = ['cherries','hat','horse','ticket','coin','gem','wild','scatter','bell'];
  const rgsMap: Record<string, string> = {'🍒':'cherries','🎩':'hat','🎠':'horse','🎟️':'ticket','🌙':'coin','💎':'gem','🪙':'coin','🍭':'wild','🃏':'scatter'};
  let grid = Array.from({length:25}, (_, i) => atlas[(i * 7 + 2) % atlas.length]);
  let balance = 5000, bet = 2, win = 0, spinning = false, tumbling = false, freeSpins = 0, stash = [1,1,1,1,1];
  let hot = new Set<number>(), message = 'WIN 6 OR MORE SYMBOLS ANYWHERE';
  const sleep = (n:number) => new Promise((r) => setTimeout(r,n));
  const money = (n:number) => n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
  const randomBoard = () => Array.from({length:25}, () => atlas[Math.floor(Math.random()*atlas.length)]);
  const mapBoard = (board:string[]) => board.map((x) => rgsMap[x] ?? 'gem');
  async function spin() {
    if (spinning || (!freeSpins && balance < bet)) return;
    spinning = true; tumbling = false; hot = new Set(); win = 0;
    if (freeSpins) freeSpins--; else balance -= bet;
    message = freeSpins ? `FREE SPIN ${freeSpins + 1} — STASHES ARE LIVE` : 'GOOD LUCK!';
    for(let i=0;i<3;i++){ grid=randomBoard(); await sleep(135); }
    const result:Spin = await (await fetch('/api/spin',{method:'POST'})).json();
    grid=mapBoard(result.board); hot=new Set(result.clusters);
    if (result.expander >= 0) { message='RINGMASTER REVEAL — COINS ON THE REEL!'; await sleep(520); }
    if(result.win){
      const multiplier = freeSpins ? stash.reduce((a,b)=>a+b,0)/5 : 1;
      win=Number((result.win*bet*multiplier).toFixed(2)); balance+=win; tumbling=true;
      message=`CLUSTER WIN  ${money(win)}`; stash=stash.map((v,i)=>hot.has(i)||hot.has(i+5)||hot.has(i+10)?Math.min(v+1,9):v);
      await sleep(480); if(result.tumble) grid=mapBoard(result.tumble); hot=new Set(); tumbling=false;
    } else message='SPIN AGAIN TO FIND A CLUSTER';
    if(result.bonus){ freeSpins+=result.freeSpins; stash=[1,1,1,1,1]; message=`STASH N’ SPARKS — ${result.freeSpins} FREE SPINS`; }
    spinning=false;
  }
</script>

<svelte:head><title>Midnight Mishap — Original Demo</title><meta name="theme-color" content="#10071f" /></svelte:head>

<main>
  <div class="vignette"></div>
  <header><div class="logo">MIDNIGHT <i>MISHAP</i><small>ORIGINAL 5 × 5 CLUSTER GAME</small></div><div class="balance"><span>DEMO BALANCE</span><b>€{money(balance)}</b></div></header>
  <section class="playfield">
    <img class="mascot" src="/art/ringmaster.png" alt="Midnight Mishap ringmaster" />
    <div class="cabinet">
      <div class="marquee"><span>{freeSpins ? `FREE SPINS ${freeSpins}` : 'BASE GAME'}</span><strong>{freeSpins ? 'STASH N’ SPARKS' : 'CLUSTER PAYS'}</strong><span>{freeSpins ? `WIN MULTIPLIER ×${stash.reduce((a,b)=>a+b,0)}` : 'WIN 6+'}</span></div>
      {#if freeSpins}<div class="stashes">{#each stash as value}<div class="stash"><span>★</span>×{value}</div>{/each}</div>{/if}
      <div class:spinning class:tumbling class="reels">
        {#each grid as symbol, i}
          <div class:hot={hot.has(i)} class:expander={symbol === 'hat' && [4,9,14,19,24].includes(i)} class="cell" style={`--d:${(i%5)*65}ms`}>
            <span class={`symbol ${symbol}`}></span>{#if symbol==='coin'}<em>×{(i%5)+1}</em>{/if}
          </div>
        {/each}
      </div>
      <div class="status">{message}</div>
    </div>
  </section>
  <footer>
    <button class="round" on:click={() => bet=Math.max(.2,Number((bet-.2).toFixed(2)))} aria-label="Lower bet">−</button>
    <div class="metric"><span>DEMO BET</span><b>€{money(bet)}</b></div>
    <button on:click={spin} class:busy={spinning} class="spin">{spinning ? 'SPINNING' : 'SPIN'}</button>
    <div class="metric win"><span>WIN</span><b>€{money(win)}</b></div>
    <button class="round" on:click={() => bet=Math.min(10,Number((bet+.2).toFixed(2)))} aria-label="Raise bet">+</button>
  </footer>
  <p class="legal">Original POC · local demo outcomes only · no real-money play</p>
</main>

<style>
  :global(*){box-sizing:border-box}:global(body){margin:0;background:#10071f;color:#fff;font-family:Impact,"Arial Narrow",system-ui,sans-serif}main{min-height:100svh;overflow:hidden;position:relative;background:linear-gradient(90deg,#11051fdb,#1c0c38bb,#10051fdc),url('/art/midnight-carnival.png') center/cover}.vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 32%,#0b0318b8 100%);z-index:0}header,footer,.playfield{position:relative;z-index:1}header{height:92px;display:flex;justify-content:space-between;align-items:center;padding:14px max(28px,6vw);border-bottom:1px solid #cda64c66;background:#090313bb}.logo{font-size:clamp(25px,4vw,48px);letter-spacing:-1px;line-height:.7;color:#f4df99;text-shadow:3px 4px #17061f}.logo i{font-style:normal;color:#d15073}.logo small{display:block;margin-top:12px;font:700 9px/1 system-ui;letter-spacing:2px;color:#bcaed3}.balance{text-align:right;font-family:system-ui}.balance span,.metric span{display:block;font-size:9px;letter-spacing:1.3px;color:#b8add0}.balance b{font-size:clamp(20px,2.5vw,31px)}.playfield{height:calc(100svh - 178px);min-height:440px;display:flex;align-items:center;justify-content:center}.mascot{position:absolute;left:max(-6vw,-70px);bottom:-8vh;height:min(75vh,700px);width:auto;object-fit:contain;filter:drop-shadow(0 15px 10px #000a);z-index:1}.cabinet{width:min(54vw,650px);margin-left:clamp(120px,16vw,290px);padding:10px 11px 8px;border:2px solid #817067;border-radius:4px;background:linear-gradient(135deg,#16141aee,#24101ae8);box-shadow:0 12px 0 #08040d,0 21px 45px #000b,inset 0 0 30px #9c314322}.marquee{height:27px;display:flex;justify-content:space-between;align-items:center;padding:0 8px;font:700 10px system-ui;letter-spacing:1px;color:#d8c69e}.marquee strong{color:#f4d45d}.stashes{display:flex;gap:3px;margin:0 2px 5px}.stash{flex:1;padding:3px;text-align:center;border:1px solid #a67d3b;border-radius:2px;background:#26182a;color:#f7d568;font:800 11px system-ui}.stash span{color:#d85b84}.reels{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;padding:6px;background:#09080b;border:4px solid #423e3f;box-shadow:inset 0 0 22px #000}.cell{aspect-ratio:1;position:relative;overflow:hidden;display:grid;place-items:center;border:1px solid #565052;background:radial-gradient(circle at 40% 30%,#38303a,#151217 75%);animation:land .38s var(--d) both cubic-bezier(.13,.77,.21,1)}.symbol{width:94%;height:94%;display:block;background-image:url('/art/symbols-atlas.png');background-size:300% 300%;filter:drop-shadow(2px 4px 2px #000c)}.cherries{background-position:0 0}.hat{background-position:50% 0}.horse{background-position:100% 0}.ticket{background-position:0 50%}.coin{background-position:50% 50%}.gem{background-position:100% 50%}.wild{background-position:0 100%}.scatter{background-position:50% 100%}.bell{background-position:100% 100%}.cell em{position:absolute;right:5px;bottom:2px;font:900 14px system-ui;color:#f7e58b;text-shadow:1px 2px #000}.cell.hot{background:#702939;border-color:#f9e590;box-shadow:inset 0 0 20px #f26c38,0 0 12px #f6c660;animation:win .45s infinite alternate}.cell.expander{border-color:#f5dd76;box-shadow:inset 0 0 15px #f3c650}.spinning .cell{animation:blur .13s infinite linear}.tumbling .cell{animation:clear .3s both}.status{height:27px;display:grid;place-items:center;font:800 clamp(9px,1vw,12px) system-ui;letter-spacing:1.1px;color:#f4d77b;text-align:center}footer{height:86px;display:flex;align-items:center;justify-content:center;gap:clamp(9px,2vw,22px);padding:10px 5vw;border-top:1px solid #9f7f3e66;background:linear-gradient(90deg,#09030edb,#251229e8,#09030edb)}button{font-family:inherit;border:0;cursor:pointer}.round{width:45px;height:45px;border-radius:5px;background:#553076;color:#fff;font:900 31px/1 system-ui;box-shadow:inset 0 0 0 1px #9c66ba,0 3px #210d36}.metric{min-width:100px;text-align:center;font-family:system-ui}.metric b{font-size:20px}.spin{width:clamp(110px,14vw,165px);height:62px;border-radius:50%;color:#230d28;background:radial-gradient(circle at 34% 24%,#fff7aa,#f6c54e 42%,#b54846 78%);box-shadow:0 5px #641d3e,0 0 22px #f6d46788;font-size:clamp(20px,2.5vw,30px);letter-spacing:-1px}.spin.busy{filter:brightness(.75);cursor:wait}.legal{position:absolute;z-index:2;bottom:3px;width:100%;margin:0;text-align:center;color:#9789af;font:8px system-ui;letter-spacing:.7px}@keyframes land{from{transform:translateY(-160px);opacity:0}to{transform:none;opacity:1}}@keyframes blur{50%{transform:translateY(18px);filter:blur(2px)}}@keyframes win{to{transform:scale(.91);filter:brightness(1.5)}}@keyframes clear{50%{transform:scale(.1) rotate(22deg);opacity:.15}}@media(max-width:700px){header{height:76px;padding:12px 20px}.logo{font-size:25px}.logo small{font-size:7px;letter-spacing:1px;margin-top:10px}.balance b{font-size:22px}.balance span{font-size:8px}.playfield{height:calc(100svh - 158px);min-height:470px;align-items:center}.mascot{height:49vh;bottom:5vh;left:-83px;opacity:.9}.cabinet{width:86vw;margin-left:6vw;padding:7px;border-radius:18px;border-color:#e5be5a;background:#1a0d2ce8;box-shadow:0 0 0 2px #4a2857,0 12px 30px #000b}.marquee{height:23px;font-size:8px}.reels{gap:3px;padding:4px;border-width:3px}.cell{border-radius:4px}.status{height:30px;font-size:9px;padding:0 4px}.stashes{margin-bottom:3px}.stash{font-size:9px}.win{display:none}footer{height:75px;gap:14px;padding:8px 18px}.round{width:42px;height:42px}.metric{min-width:75px}.metric b{font-size:17px}.spin{width:122px;height:55px;font-size:25px}.legal{font-size:7px;bottom:1px}}
</style>
