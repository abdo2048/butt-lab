// Separate from the static reader: no public assets, and all R2 reads happen after authentication.
const DOCUMENT = /^\/(view|download)\/([a-f0-9]{64})$/;
const DIGEST = /^[a-f0-9]{64}$/;
const encoder = new TextEncoder();

function response(body, status, headers = {}) {
  return new Response(body, { status, headers: {
    "Cache-Control": "private, no-store",
    "Vary": "Authorization",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Cross-Origin-Resource-Policy": "same-origin",
    ...headers,
  } });
}

async function matchesPassword(authorization, password) {
  const match = /^Basic ([A-Za-z0-9+/=]+)$/i.exec(authorization ?? "");
  if (!match || match[1].length > 200) return false;
  const [expected, actual] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(btoa(`reviewer:${password}`))),
    crypto.subtle.digest("SHA-256", encoder.encode(match[1])),
  ]);
  if (typeof crypto.subtle.timingSafeEqual === "function") return crypto.subtle.timingSafeEqual(expected, actual);
  const left = new Uint8Array(expected), right = new Uint8Array(actual);
  let difference = 0;
  for (let i = 0; i < left.length; i++) difference |= left[i] ^ right[i];
  return difference === 0;
}

function records(catalogue) {
  if (catalogue?.version !== 1 || !Array.isArray(catalogue.documents) || catalogue.documents.length > 1000) {
    throw new Error("Invalid catalogue");
  }
  const docs = new Map();
  for (const doc of catalogue.documents) {
    if (
      !doc || typeof doc.sha256 !== "string" || !DIGEST.test(doc.sha256) || docs.has(doc.sha256) ||
      typeof doc.filename !== "string" || doc.filename.length > 255 || !/\.pdf$/i.test(doc.filename) ||
      /[\x00-\x1f\x7f/\\]/.test(doc.filename) || !Number.isSafeInteger(doc.size) || doc.size < 5
    ) throw new Error("Invalid document");
    docs.set(doc.sha256, doc);
  }
  return docs;
}

function escape(text) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function makePage(docs) {
  const entries = [...docs.values()].sort((a, b) => a.filename.localeCompare(b.filename)).map((doc) =>
    `<li><strong>${escape(doc.filename)}</strong><p><a href="/view/${doc.sha256}">View PDF</a> · <a href="/download/${doc.sha256}">Download PDF</a></p></li>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>Butt Lab reviewer library</title><style>body{font:1rem/1.5 system-ui,sans-serif;max-width:48rem;margin:2rem auto;padding:0 1rem}li{border-bottom:1px solid #ccc;padding:.65rem 0;overflow-wrap:anywhere}li p{margin:.3rem 0}</style></head>
<body><main><h1>Reviewer library</h1><p>${docs.size} original PDFs. For authorised review only.</p>
${entries ? `<ul>${entries}</ul>` : "<p>No documents have been released to this library yet.</p>"}</main></body></html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol !== "https:" || !env.REVIEW_HOST || url.host !== env.REVIEW_HOST) return response("Not found", 404);
    if (request.method !== "GET" && request.method !== "HEAD") return response("Method not allowed", 405, { Allow: "GET, HEAD" });
    const head = request.method === "HEAD";
    const reply = (body, status, headers) => response(head ? null : body, status, headers);
    // Fail closed if the password, rate limiter or private bucket has not been configured.
    if (typeof env.REVIEW_PASSWORD !== "string" || !/^[A-Za-z0-9_-]{20,128}$/.test(env.REVIEW_PASSWORD) ||
        !env.REVIEW_RATE_LIMIT?.limit || !env.REVIEW_PDFS?.get) return reply("Reviewer library unavailable", 503);
    try {
      const authorization = request.headers.get("Authorization");
      if (!(await matchesPassword(authorization, env.REVIEW_PASSWORD))) {
        if (authorization) {
          const attempt = await env.REVIEW_RATE_LIMIT.limit({ key: request.headers.get("CF-Connecting-IP") || "unknown" });
          if (!attempt.success) return reply("Too many attempts", 429, { "Retry-After": "60" });
        }
        return reply("Authentication required", 401, { "WWW-Authenticate": 'Basic realm="Butt Lab review", charset="UTF-8"' });
      }
      const selection = DOCUMENT.exec(url.pathname);
      if (url.pathname !== "/" && !selection) return reply("Not found", 404);
      const catalogue = await env.REVIEW_PDFS.get("catalogue.json");
      const docs = catalogue ? records(await catalogue.json()) : new Map();
      if (url.pathname === "/") return reply(makePage(docs), 200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'",
      });
      const doc = docs.get(selection[2]);
      if (!doc) return reply("Not found", 404);
      const key = `pdfs/${doc.sha256}.pdf`;
      const file = head ? await env.REVIEW_PDFS.head(key) : await env.REVIEW_PDFS.get(key);
      if (!file || file.size !== doc.size) return reply("Not found", 404);
      const encoded = encodeURIComponent(doc.filename).replace(/['()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
      return reply(head ? null : file.body, 200, {
        "Content-Type": "application/pdf",
        "Content-Length": String(doc.size),
        "Content-Disposition": `${selection[1] === "download" ? "attachment" : "inline"}; filename="document.pdf"; filename*=UTF-8''${encoded}`,
      });
    } catch {
      return reply("Reviewer library unavailable", 503);
    }
  },
};
