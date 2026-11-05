# Packet access: use exact paths, not repo-page summaries

Scope: transport instructions only; no peer content. Frozen batch-01 / Stage-3 / round-01 / v1.1.
Payload: 5f484b585ca16dbd2ce93b56c61c962f5f14c774
Protocol/release: a20ada4895448d4fda1421088233b72fae2afb56

## Entry points
Protocol: START_HERE.md and FUSION_PROTOCOL.md at the release snapshot.
Metadata: packets/batch-01/stage-3/LAUNCH.md, manifest.yaml, COMMIT.txt at the release snapshot. Do NOT guess root-level manifest.yaml or COMMIT.txt.
Payload: the exact 20 paths in manifest.files at the payload commit. Metadata adds 3 files (23 total), not three more scientific inputs. Never browse panels/, operator/, peer/judge reports or Stage-4 proposals during a blind worker pass.

## Choose the reliable transport first
1. Tool-enabled sandbox: clone/download using authorized GitHub access, then use git show PAYLOAD:path for frozen bytes and git show RELEASE:path for protocol. Restrict the reading/export to manifest paths; clone history is not permission to inspect peers. GitHub documents both cloning and commit-specific source archives.
2. Upload-capable chat: operator supplies a manifest-selected archive or readable files. If only PDFs work, use a full text-based rendering with original paths/document boundaries, not an AI summary or peer-report bundle. Preserve source-file hashes separately from derived-format hashes.
3. Browser-only reader: use the commit-pinned raw URL for each exact path. If the reader truncates, requesting 'later sections' of the same truncated input does not establish access. Use an authorized local export/attachment or explicitly mark partial. Do not spend the research session hopping through public proxy/function services.

## Receipt per file
Record path, commit, downloaded/full-or-partial, actually-read/full-or-partial, omitted sections and SHA-256 IF computed. A complete download/hash is not proof the model read or understood everything; a resolving URL is not a full read. If source data is missing, bound conclusions or request that exact file. Never invent ranges/text/hashes.

Do not send credentials, signed private URLs or private content through unapproved third-party renderers. Do not bypass access controls. Current default: raw outputs remain local until all blind first passes finish. Uploading them later never changes the frozen payload commit.

Sources: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository ; https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives
