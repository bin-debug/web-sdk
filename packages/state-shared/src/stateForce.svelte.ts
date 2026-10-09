export type ForceScenario = { key: string; label: string };

export const stateForce = $state({
	forceTool: null as { enabled: boolean; scenarios: ForceScenario[] } | null,
	pendingForce: null as string | null,
});
