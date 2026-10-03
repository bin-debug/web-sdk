import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
import { numberToCurrencyString } from 'utils-shared/amount';
import type { PromoSummary } from 'state-shared';

type MissionStep = NonNullable<PromoSummary['mission']>['steps'][number];
type ScoreBy = NonNullable<PromoSummary['leaderboard']>['scoreBy'];

/** API amounts are micro-units. */
export const money = (micro: number) => numberToCurrencyString(micro / API_AMOUNT_MULTIPLIER);

/** Local wall-clock time, e.g. "20:30". */
export const clock = (iso: string) =>
	new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

export const multiplier = (x: number) => `${Number(x.toFixed(2))}×`;

export const ordinal = (n: number) => {
	const t = n % 100;
	if (t >= 11 && t <= 13) return `${n}th`;
	return `${n}${['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`;
};

export const countdown = (targetIso: string, now: number) => {
	const s = Math.max(0, Math.floor((new Date(targetIso).getTime() - now) / 1000));
	const h = Math.floor(s / 3600);
	const m = Math.floor((s % 3600) / 60);
	const pad = (n: number) => String(n).padStart(2, '0');
	if (h >= 48) return `${Math.floor(h / 24)}d ${h % 24}h`;
	return h > 0 ? `${h}:${pad(m)}:${pad(s % 60)}` : `${pad(m)}:${pad(s % 60)}`;
};

/** "tonight 20:30", "today 14:00", "tomorrow 20:30", "Sat 20:30" or "12 Oct 20:30". */
export const whenText = (iso: string, now: number) => {
	const d = new Date(iso);
	const day = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
	const days = Math.round((day(d) - day(new Date(now))) / 86_400_000);
	const at = clock(iso);
	if (days <= 0) return `${d.getHours() >= 18 ? 'tonight' : 'today'} ${at}`;
	if (days === 1) return `tomorrow ${at}`;
	if (days < 7) return `${d.toLocaleDateString([], { weekday: 'short' })} ${at}`;
	return `${d.toLocaleDateString([], { day: 'numeric', month: 'short' })} ${at}`;
};

/** "Starts in" before the window, "Ends in" during it, "Ended" after. */
export const timing = (p: PromoSummary, now: number) => {
	if (p.bonus) return p.bonus.expiresAt ? { label: 'Expires in', value: countdown(p.bonus.expiresAt, now) } : { label: p.bonus.stage === 'spins' ? 'Free spins' : 'Wagering', value: '' };
	if (p.phase === 'ended') return { label: 'Ended', value: '' };
	if (p.phase === 'upcoming' && p.startsAt) return { label: 'Starts in', value: countdown(p.startsAt, now) };
	if (now < new Date(p.windowStart).getTime()) return { label: 'Starts in', value: countdown(p.windowStart, now) };
	return { label: 'Ends in', value: countdown(p.windowEnd, now) };
};

export const goalText = (step: MissionStep) => {
	switch (step.goal) {
		case 'spins':
			return `Play ${step.target} spins`;
		case 'wins_at_least':
			return step.target === 1
				? `Land a ${multiplier(step.threshold)}+ win`
				: `Land ${step.target} wins of ${multiplier(step.threshold)}+`;
		case 'total_win':
			return `Win ${money(step.target)} in total`;
		case 'total_wagered':
			return `Wager ${money(step.target)}`;
	}
};

export const progressText = (step: MissionStep, current: number) =>
	step.goal === 'total_win' || step.goal === 'total_wagered'
		? `${money(current)} / ${money(step.target)}`
		: `${current} / ${step.target}`;

export const scoreText = (scoreBy: ScoreBy, score: number) => {
	switch (scoreBy) {
		case 'max_multiplier':
			return `${score.toFixed(2)}×`;
		case 'spins':
			return `${score} spins`;
		default:
			return money(score);
	}
};

export const scoreByText = (scoreBy: ScoreBy) =>
	({
		max_multiplier: 'Biggest single win multiplier',
		total_win: 'Total winnings',
		spins: 'Most spins',
		total_wagered: 'Total wagered',
	})[scoreBy];

/** Prize for a final place (prizes expand by count: tier 1 = 1st place). */
export const prizeForPosition = (p: PromoSummary, position: number) => {
	const places = (p.prizes ?? []).flatMap((x) => Array.from({ length: x.count }, () => x));
	return places[position - 1] ?? null;
};
