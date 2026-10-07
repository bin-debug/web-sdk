import { SPEC } from '../../game/spec';
import { ACCENT } from '../../game/ui';

// Bonus tiers come from the spec (bonuses[]): BONUS, BONUS2, BONUS3 ... The book says which one fired (bonusType).
// Colours are only a code fallback for the intro card; the order follows the spec.
const TIER_COLOURS = [ACCENT, 0x4fc3ff, 0xff5fd2, 0x7dff6b];

export type BonusTier = { id: string; name: string; index: number; colour: number; hidden: boolean; trigger: string };

export const bonusTier = (bonusType?: string, bonusName?: string, hiddenFlag?: boolean): BonusTier => {
	const index = Math.max(0, SPEC.bonuses.findIndex((b) => b.id === bonusType));
	const spec = SPEC.bonuses[index];
	return {
		id: spec?.id ?? bonusType ?? 'BONUS',
		name: bonusName ?? spec?.name ?? 'Free Spins',
		index,
		colour: TIER_COLOURS[index % TIER_COLOURS.length],
		hidden: hiddenFlag ?? spec?.hidden ?? false,
		trigger: spec?.trigger ?? '',
	};
};
