# Maintenance review and research transition

Reviewed 2026-11-02 at commit 6169f453aa8c90a854162b2fdee32e3d2e0320a8. Scope: latest changes and previously audited unchanged artifacts; not full scientific validation.

The new validator genuinely improves duplicate-key, backup-ID, directory, and outside-path rejection. A focused synthetic recheck of reproduced loader/preservation/path helper logic rejected the five earlier cases. This was not a fresh full repository test-suite run.

Remaining limits: missing/malformed backup silently skips preservation; post-backup IDs and removed fields are not baseline-protected; validate_entry ignores the supplied repo_root in its path-helper call; malformed field types can still crash. The checked-in runner calls 23 tests (16 original + seven new), not the reported 24. Some evidence-path tests do not test the claimed case. Cache removal/ignore rules are useful.

Reading-depth/duplicate classifications were recorded in prose, not consistently repaired in registry fields. Old quotas persisted in the reviewed charter/harvester. This update replaces those policies, without rewriting historical records or central registries.

Decision: no further infrastructure-polishing prerequisite for read-only research. Freeze central writes; independent review and separate reconstructions can proceed. Before unattended registry edits resume, fail closed on baseline failure and check removed fields/post-backup IDs. Those fixes are deferred, not falsely claimed complete.

Substantive deliverables: two source reconstructions, from the full De Fenzo paper and Chinese/English CN106928486A text. They correct missed parameters, distinguish washing from film-making, and separate polymer yield from contaminant removal. They are desk drafts pending review, not industrial designs or lab SOPs.

TASK.md assigns one independent review. Any research interface can perform it; a router cannot create reliable free upstream capacity. Preserve raw model reports and dissent; consensus is not chemical validation. No registry, backup, old evidence note, validator, tests, or tracker edit is included. No experiments or automatic downstream execution are authorized.
