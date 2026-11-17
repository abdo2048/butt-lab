import { defineConfig } from "astro/config";

// Static output only. The site is a knowledge base; it has no server runtime.
// Trailing slashes and directory format give the exact routes the design asks for:
//   /  /start/  /methods/  /methods/<slug>/  /compare/  /sources/  /sources/<id>/
//   /glossary/  /invention/  /egypt/  /research-method/  /limitations/
export default defineConfig({
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
