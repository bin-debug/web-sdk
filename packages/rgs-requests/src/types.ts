import type { requestAuthenticate, requestBet } from './rgs-requests';

type BaseBet = Awaited<ReturnType<typeof requestBet>>['round'];
type NoUndefinedBaseBet = Exclude<BaseBet, undefined>;
type BaseBetWithoutState = Omit<NoUndefinedBaseBet, 'state'>;

export type BetType<TBookEvent extends object> = BaseBetWithoutState & {
	state: TBookEvent[];
};

export type PromoSummary = NonNullable<Awaited<ReturnType<typeof requestAuthenticate>>['promos']>[number];
export type PromoSpinResult = NonNullable<Awaited<ReturnType<typeof requestBet>>['promos']>;
export type PromoAward = PromoSpinResult['awards'][number];
