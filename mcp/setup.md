# Recommended MCP Servers for dsh

Add these via dsh's MCP/plugin settings (each is a standard MCP server):

1. WEB SEARCH (essential for harvesters):
   - Brave Search MCP (official free tier: api.search.brave.com, needs free
     API key) — or Tavily MCP (free tier) if Brave is unavailable.
2. WEB FETCH (essential for reading patent pages and papers):
   - Firecrawl MCP, or Crawl4AI MCP, or the reference fetch MCP server.
   Google Patents pages are readable via fetch; Espacenet needs care (JS).
3. FILESYSTEM (restricted):
   - Filesystem MCP server scoped to THIS repo folder only, so agents
     cannot write outside the lab.
4. OPTIONAL — KNOWLEDGE GRAPH / MEMORY:
   - A memory MCP server for cross-session continuity of research threads.

Example dsh MCP config sketch (mcpServers block in the dsh config):

mcpServers:
  brave-search:
    command: npx
    args: ["-y", "@brave/brave-search-mcp"]
    env: { BRAVE_API_KEY: "..." }
  fetch:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-fetch"]

NOTES:
- Harvesters need search + fetch. Red-teamers need fetch (to re-check
  citations). Inventors/synthesizers can run without network tools.
- Do NOT give agents shell access beyond the repo sandbox.
