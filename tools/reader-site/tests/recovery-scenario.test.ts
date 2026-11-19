import assert from "node:assert/strict";
import test from "node:test";
import { compareWash, scenarios } from "../src/lib/recovery-scenario.ts";

test("every demonstration case accounts for one unit of contaminant", () => {
  for (const row of scenarios) {
    assert.ok(Math.abs(row.earlyReject + row.washWaste + row.retainedLoad - 1) < 1e-12);
  }
});

test("less wash waste can leave a larger burden per recovered filter mass", () => {
  const baseline = compareWash(1, 1, 0.5);
  const lowRecovery = compareWash(0.7, 0.9, 0.5);
  assert.ok(lowRecovery.washWaste < baseline.washWaste);
  assert.ok(lowRecovery.loadPerRecoveredFilter! > baseline.loadPerRecoveredFilter!);
});

test("zero recovery is undefined, and invalid fractions are rejected", () => {
  assert.equal(compareWash(0, 1, 1).loadPerRecoveredFilter, null);
  for (const value of [-0.1, 1.1, NaN, Infinity]) {
    assert.throws(() => compareWash(1, value, 0.5), RangeError);
  }
});
