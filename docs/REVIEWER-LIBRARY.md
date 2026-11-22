# Reviewer PDF access

## Ready now: a password-protected library on your own computer

From the root of your local checkout, run this with Python 3.11+ in an interactive terminal:

```sh
python scripts/reviewer_library.py
```

Open `http://127.0.0.1:8765/` **on that computer**, enter username `reviewer`, and use the fresh temporary password printed in that terminal. Stop with Ctrl+C. Restart for a new random password, or run `python scripts/reviewer_library.py --prompt-password` to choose your own without putting it in a command-line argument, file, or commit. Close the browser profile or use a private window if you want it to forget cached Basic Auth credentials.

The tool serves original PDFs from `sources/` (until 2026-11-22, from `materials/gap-closing/`), checks the password for the catalogue and for every direct view/download request, and does not copy files into the website. It found 55 paths and 51 unique originals. The browser can view or download each original. This is deliberately **loopback-only**: do not expose it through a public preview, tunnel, reverse proxy or port forward. It uses local HTTP and is not the hosted reviewer solution.

## Hosted review: implemented, not deployed

The separate Worker in [`tools/reviewer-gateway/`](../tools/reviewer-gateway/) reads from a private bucket and serves the catalogue, **View PDF**, and **Download PDF** only after checking the password server-side. The site refuses other hostnames, serves over HTTPS only, rate-limits failed sign-ins, and sends `private, no-store`. The browser receives the whole PDF; partial-range delivery is not implemented. It needs a Cloudflare account, a domain in that account, and a private R2 bucket. No bucket, route, password or remote copy was created by the development pass. The public Astro site's deployment and Pagefind index do not include the reviewer inventory, the Worker, or its files. The two explicitly licensed PDFs on the public site remain public.

### 1. Decide what can be shared

A password limits who can reach a file; it does not establish permission to redistribute it. Confirm the terms for the exact version and intended reviewer group. Start with the Git-ignored inventory:

```sh
python -m scripts.prepare_reviewer_release inventory
```

Edit `.research-local/reviewer-release/rights-inventory.json` locally. The draft enumerates 51 unique originals (55 paths); all entries start `pending` for this hosted review. For each cleared copy, set `clearance` to `cleared` and record the permission and scope in `clearanceNote`. Use `excluded` for files not to share. The inventory command never overwrites an existing rights file. If PDFs change, keep a backup of your decisions and regenerate/reconcile the inventory; permission notes should not automatically carry over to different PDF bytes.

```sh
python -m scripts.prepare_reviewer_release stage
```

Staging rechecks the originals and writes a private catalogue of only the cleared set. It refuses an empty release and sends nothing to Cloudflare. It does not copy the originals or include the internal permission notes or original paths in the served catalogue.

### 2. Set up the hosted reviewer site (operator only)

1. In Cloudflare create a dedicated R2 bucket for these documents. **Keep both the R2 development URL and bucket custom domains disabled.** Files must be reachable only through the authenticated Worker, not directly from the bucket. Use a dedicated reviewer hostname such as `review.your-domain.example`, hosted in the same Cloudflare account. This avoids sending the reviewer password to the public website.
2. Install the repo's Node 24 reader dependencies if not already installed (`npm ci --prefix tools/reader-site`). Copy `tools/reviewer-gateway/wrangler.example.jsonc` to the ignored `wrangler.local.jsonc` in that directory. Set the custom domain in `routes`, set the identical `REVIEW_HOST`, and substitute the private bucket name. Leave `workers_dev` and `preview_urls` disabled. Use the approved Cloudflare account with Wrangler. From the repository root, deploy the gateway configuration, then add the password secret:

   ```sh
   tools/reader-site/node_modules/.bin/wrangler deploy --config tools/reviewer-gateway/wrangler.local.jsonc
   tools/reader-site/node_modules/.bin/wrangler secret put REVIEW_PASSWORD --config tools/reviewer-gateway/wrangler.local.jsonc
   ```

   The gateway fails closed until configured. Use a password manager or `openssl rand -hex 24` in your terminal to generate a fresh password (20–128 ASCII letters, digits, `_` or `-`). Paste it at the secret prompt, not into config or chat. Username is `reviewer`. Rotate later by repeating `secret put`; the old password stops working. This shared password cannot revoke one reviewer independently; for a longer-running team, prefer individual Cloudflare Access identities.
3. Reconfirm the R2 bucket's privacy and the cleared set, then upload from the repository root. Replace the example bucket name with the same private bucket you configured above:

   ```sh
   python -m scripts.prepare_reviewer_release upload --private-bucket butt-lab-reviewer-pdfs --confirm-upload
   ```

   The script uses the current authenticated Wrangler account. It uploads hash-addressed PDFs first and writes `catalogue.json` last so an interrupted upload does not replace the previous catalogue. For revocation, update the clearance inventory and replace the catalogue. To suspend the entire library without replacing the catalogue, disable its route or remove the password secret; removing authorization cannot recall files already downloaded. Remove no-longer-needed objects from R2 separately.
4. In a signed-out browser, test the catalogue and a copied direct PDF URL: both must challenge or refuse access. Confirm there is no public R2 URL and no reachable Worker preview/default hostname. With the correct credential, test PDF view and download and compare a downloaded hash to the inventory. Only then share the reviewer URL and secret through your secure channels. Add a link to that hostname from the public site only if you want people to discover it; it is not needed for access and is not in the current preview.

## Existing copies on GitHub

The repository was verified as public on 2026-11-19. The `origin/main` tree at `8d861937212e25a6aab0be45b474cfea2b92a4cd` already contains **51 PDF paths** under `materials/gap-closing/`. This viewer does not hide files available from Git history, other branches, forks or clones. The operator said the repository is public temporarily for tool access and plans to make it private. Do not treat the PDFs as confidential until that change is made and existing exposure is reviewed; the reviewer site cannot protect old copies. See [repository map](REPOSITORY-MAP.md) for decisions still open. Do not assume deleting a file in a new commit removes its historical copies.
