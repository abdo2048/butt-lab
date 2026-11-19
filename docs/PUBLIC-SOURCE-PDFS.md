# Public source PDFs

The reader can serve **verified, redistributable originals** as files on the same Cloudflare Workers Static Assets deployment as the website. Source pages link to the PDF for browser viewing, offer a same-origin download, and retain the publisher link, citation, and license. The browser chooses how to display a PDF; the site does not require a JavaScript PDF viewer or load the file automatically.

## First two copies

| Source | Permission checked | Exact copy |
| --- | --- | --- |
| Rahman, Mohajerani & Giustozzi, *Materials* 13(3), 734 (2020), DOI `10.3390/ma13030734` | [Publisher PDF](https://www.mdpi.com/1996-1944/13/3/734/pdf), final page: © 2020 authors, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). | 20 pages, 5,236,886 bytes. SHA-256 `79ae28a06e27a5304fa366b58ee21230fb4d8edad25df928eba93ed96281081e`. |
| Novotny et al., *IJERPH* 6(5), 1691–1705 (2009), DOI `10.3390/ijerph6051691` | [Publisher PDF](https://www.mdpi.com/1660-4601/6/5/1691/pdf), final page: © 2009 authors, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). | 15 pages. SHA-256 `beb08cde1a1c1a12dc4840f7995b308343236c3235c676adb34a381cad784fc2`. |

Checked 2026-11-19 against the publisher PDFs and the license notices and article metadata in the library copies. The shipped files are unmodified copies of those local publisher-format PDFs. Git treats these PDFs as binary so line-ending normalization cannot change their hashes. The originals in the working library were not moved. They were inspected for embedded attachments, forms and PDF action objects such as JavaScript and launch actions; none of those were found. This inspection is not a general security certification. No other PDF received a publication-rights decision in this pass.

## Adding a document

1. Check that the permission applies to the **exact PDF version** and covers redistribution. A reachable download or a copy in the repository does not establish that right. Record the license evidence and check for excluded third-party material and obvious embedded active content. Keep unverified or restricted items link-only.
2. Place the unchanged approved original in `publication/assets/<source-id>.pdf`. In the authored source record, set `rights: public-local-copy`, add `redistributionLicense` (name and HTTPS URL), and record `localArtifact` with that path and its SHA-256. Do not put a library directory or private reading copy in Astro's public folder.
3. Regenerate and validate the publication layer, export the bundle, build the reader, and run the tests and release audit. The generator pins the source hash; the site serves only the associated exported asset; the audit blocks stray, mismatched or missing PDF files. Keep the normal approval gate for the exact deployment artifact.

## Cloudflare and private use

- [Workers Static Assets](https://developers.cloudflare.com/workers/platform/limits/#static-assets) allows files up to **25 MiB each**. [Static Assets limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/#range-requests) note that range requests return the whole file; these two small documents use the simple static setup. Confirm browser behavior on the production host after a separately approved deployment.
- A file deployed beside a public site is **public**, even if the navigation does not link to it. For a larger or genuinely team-only archive, keep it out of the build and consider private Cloudflare R2 storage behind authentication, subject to the applicable license terms. No bucket, credentials or private viewer were provisioned here.

For a password-protected viewer on your own machine and the decision path for remote reviewers, see [Reviewer PDF access](REVIEWER-LIBRARY.md). The local viewer is not a public reader route.
