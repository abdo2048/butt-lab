/** A one-contaminant, dimensionless sensitivity model. No fitted inputs or safety thresholds. */
export function compareWash(filterRecovery: number, loadToWashFeed: number, washTransfer: number) {
  for (const value of [filterRecovery, loadToWashFeed, washTransfer]) {
    if (!Number.isFinite(value) || value < 0 || value > 1) {
      throw new RangeError("All inputs must be fractions from zero to one");
    }
  }
  return {
    filterRecovery,
    earlyReject: 1 - loadToWashFeed,
    washWaste: loadToWashFeed * washTransfer,
    retainedLoad: loadToWashFeed * (1 - washTransfer),
    loadPerRecoveredFilter: filterRecovery === 0
      ? null
      : loadToWashFeed * (1 - washTransfer) / filterRecovery,
  };
}

export const scenarios = [
  { label: "Wash without early separation", ...compareWash(1, 1, 0.5) },
  { label: "Early separation leaves more load in rejects", ...compareWash(0.9, 0.55, 0.5) },
  { label: "Little load goes to rejects, and more fibre is lost", ...compareWash(0.7, 0.9, 0.5) },
];
