# W3 — Job Scraper

## User Prompt

> "I want to receive every morning only job offers that match my profile"

---

## Why This Works

Universal use case — everyone immediately understands it. Demonstrates chaining multiple MCPs and the power of embeddings for semantic matching.

---

## Stack

| Component | Type | Role |
|---|---|---|
| **Firecrawl MCP** | Tool | Scrapes job boards every morning |
| **embeddings-matching-skill** | Skill | Compares each offer to user profile, scores 0-1 |
| **MCP Gmail** | Tool | Sends only offers with score > threshold |
| **scheduling-skill** | Skill | Triggers scraping every morning at fixed time |
| **claude-haiku-4-5** | Model | Fast and economical for batch processing |

---

## Flow

```
cron 08:00 → scheduling-skill → Firecrawl MCP (scrape offers)
→ embeddings-matching-skill (score vs profile)
→ threshold filter → MCP Gmail (send matches)
```

---

## Component URLs

- [Firecrawl MCP](https://github.com/mendableai/firecrawl-mcp-server)
- [MCP Gmail](https://github.com/modelcontextprotocol/servers/src/gmail)
- embeddings-matching-skill: `whisper.xyz/skills/embeddings-matching`
- scheduling-skill: `whisper.xyz/skills/scheduling`
- [Claude Haiku 4.5](https://docs.anthropic.com/en/docs/about-claude/models)

---

## Expected Attestations

| Component | Context | Expected Score | Curators |
|---|---|---|---|
| Firecrawl MCP | `data-scraping` | 8.9/10 | 21 |
| embeddings-matching-skill | `ai-agents` | 9.0/10 | 28 |
| MCP Gmail | `automation` | 8.8/10 | 19 |
| scheduling-skill | `automation` | 8.6/10 | 17 |
| claude-haiku-4-5 | `batch-processing` | 9.2/10 | 34 |

---

*Demo Use Case W3 — Wispr v0.1*
