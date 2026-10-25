<#
.SYNOPSIS
  Create an expanding-wilds slot game from apps/expwilds-template, optionally re-skinned with an art folder.

.DESCRIPTION
  Separate from the cluster pipeline (New-SlotGame.ps1); it does not touch the cluster games.
    1. copies apps/expwilds-template to apps/<slug> (skips node_modules and local test pages)
    2. with -ArtPath: packs the art (see ART-SPEC.md next to this script) into static/assets/theme
       and switches the game to it (src/game/theme.ts)
    3. links the app into the pnpm workspace
    4. adds a dev server to C:\source\.claude\launch.json and exposes it on Tailscale
    5. registers <GameId> in the local brand DB on book 0_0_expwilds (Stake's sample maths,
       until our own math-sdk model replaces it) and restarts backoffice-api so the RGS sees it
  Prints the full phone URL at the end.

.EXAMPLE
  .\New-ExpandingWildsGame.ps1 -GameName "Shisa Nyama Wilds" -ArtPath C:\source\shared\expwilds-themes\shisa-nyama-wilds
#>
param(
	[Parameter(Mandatory)] [string] $GameName,
	[string] $ArtPath,
	[string] $GameId,
	[string] $Slug,
	[int] $Port,
	[string] $BookId = '0_0_expwilds',
	[string] $WebSdkRoot = (Resolve-Path "$PSScriptRoot\..\..").Path,
	[string] $SourceRoot = 'C:\source',
	[string] $TailscaleHost = 'thor.tail8ad778.ts.net',
	[string] $Token = 'tok_player1_Z1KSR8CaQ5UWivXAkO5LIQ',
	[switch] $Force,
	[switch] $SkipInstall,
	[switch] $SkipRegister
)

$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding $false  # Windows PowerShell's utf8 adds a BOM that JSON readers reject

function Step($text) { Write-Host "`n== $text" -ForegroundColor Cyan }

$words = ($GameName.ToLower() -replace '[^a-z0-9]+', ' ').Trim() -split ' '
if (-not $Slug) { $Slug = $words -join '-' }
if (-not $GameId) { $GameId = $words -join '_' }

$template = Join-Path $WebSdkRoot 'apps\expwilds-template'
$app = Join-Path $WebSdkRoot "apps\$Slug"
if (-not (Test-Path $template)) { throw "Template not found: $template (check out the feature/expwilds-template branch)" }
if ($Slug -eq 'expwilds-template') { throw 'Pick a game name; the template itself is not a game.' }
if ($ArtPath -and -not (Test-Path $ArtPath)) { throw "Art folder not found: $ArtPath" }

Step "Copy template to apps\$Slug"
if (Test-Path $app) {
	if (-not $Force) { throw "apps\$Slug already exists (use -Force to rebuild it)" }
	Remove-Item $app -Recurse -Force
}
# robocopy exit codes below 8 mean success
robocopy $template $app /E /NFL /NDL /NJH /NJS /XD node_modules .svelte-kit /XF play.html | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed ($LASTEXITCODE)" }
$packageJson = Join-Path $app 'package.json'
[IO.File]::WriteAllText($packageJson, ((Get-Content $packageJson -Raw) -replace '"name": "expwilds-template"', "`"name`": `"$Slug`""), $utf8)

if ($ArtPath) {
	Step 'Pack the art into static\assets\theme'
	# several Pythons can be on PATH; use one that has Pillow, else install it into the first
	$pythons = @(Get-Command python -All -ErrorAction SilentlyContinue | ForEach-Object Source |
		Where-Object { $_ -notlike '*WindowsApps*' })
	if (-not $pythons) { throw 'Python not found on PATH' }
	$python = $pythons | Where-Object { cmd /c "`"$_`" -c `"import PIL`" 2>nul"; $LASTEXITCODE -eq 0 } | Select-Object -First 1
	if (-not $python) {
		$python = $pythons[0]
		Write-Host "Installing Pillow into $python"
		cmd /c "`"$python`" -m pip install --quiet pillow 2>&1"
		if ($LASTEXITCODE -ne 0) { throw "Could not install Pillow: run  `"$python`" -m pip install pillow" }
	}
	& $python (Join-Path $PSScriptRoot 'build_theme.py') $ArtPath $app $GameName
	if ($LASTEXITCODE -ne 0) { throw 'Art check failed; fix the files listed above and run again (with -Force).' }
} else {
	Write-Host 'No -ArtPath: the game keeps the stock Stake art.'
}

if (-not $SkipInstall) {
	Step 'Link into the pnpm workspace'
	Push-Location $WebSdkRoot
	try { pnpm install --offline | Select-Object -Last 2 } finally { Pop-Location }
}

Step 'Dev server'
$launchPath = Join-Path $SourceRoot '.claude\launch.json'
$launch = Get-Content $launchPath -Raw | ConvertFrom-Json
$appRelative = (Resolve-Path $app).Path.Substring($SourceRoot.Length + 1) -replace '\\', '/'
$existing = $launch.configurations | Where-Object { $_.name -eq $Slug }
if (-not $Port) {
	if ($existing) { $Port = $existing.port }
	else {
		$used = @($launch.configurations | ForEach-Object { $_.port })
		$Port = 3070
		while ($used -contains $Port) { $Port++ }
	}
}
$launch.configurations = @($launch.configurations | Where-Object { $_.name -ne $Slug }) + [pscustomobject]@{
	name = $Slug
	runtimeExecutable = 'npm'
	runtimeArgs = @('--prefix', $appRelative, 'run', 'dev', '--', '--port', "$Port", '--strictPort')
	port = $Port
}
[IO.File]::WriteAllText($launchPath, ($launch | ConvertTo-Json -Depth 10), $utf8)
tailscale serve --bg --https=$Port "http://127.0.0.1:$Port" | Out-Null
Write-Host "launch.json entry '$Slug' on port $Port, exposed on Tailscale"

if (-not $SkipRegister) {
	Step "Register $GameId on the local RGS (book $BookId)"
	$name = $GameName -replace "'", "''"
	$sql = @"
INSERT INTO games (game_id, name, game_type, studio, rtp, volatility, min_bet, max_bet, status, book_id, stake_increments, max_payout_multiplier)
SELECT '$GameId', '$name', game_type, 'Gambit', rtp, volatility, min_bet, max_bet, status, '$BookId', stake_increments, max_payout_multiplier
FROM games WHERE game_id = 'stake_expanding_wilds'
ON CONFLICT (game_id) DO UPDATE SET name = EXCLUDED.name, book_id = EXCLUDED.book_id;
"@
	$sql | docker exec -i source-postgres-1 psql -U postgres -d gambit_c9e9f9_general -v ON_ERROR_STOP=1 | Out-Null
	if ($LASTEXITCODE -ne 0) { throw 'DB insert failed (is the local docker stack up?)' }
	Push-Location $SourceRoot
	try {
		docker compose -f docker-compose-local-stack.yml -f docker-compose-merge.override.yml restart gambit-backoffice-api | Out-Null
	} finally { Pop-Location }
}

$query = "sessionID=$Token&game_id=$GameId&operator_id=c9e9f9&brand_id=general&currency=ZAR&lang=en&device=mobile&rgs_url=https://${TailscaleHost}:5078"
Step 'Done'
Write-Host "Start it:   npm --prefix `"$app`" run dev -- --port $Port --strictPort   (or preview '$Slug' in Claude)"
Write-Host "Phone URL:  https://${TailscaleHost}:$Port/?$query"
