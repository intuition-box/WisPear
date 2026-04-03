# W4 — Notion to Twitter

## User Prompt

> "I want my Notion notes to become Twitter threads posted automatically every week"

---

## Why This Works

Very visual for a demo — immediate result to show. The jury sees raw notes on one side, formatted thread on the other.

---

## Stack

| Component | Type | Role |
|---|---|---|
| **MCP Notion** | Tool | Reads notes from the week from a Notion database |
| **brand-voice-skill** | Skill | Rewrites content in user's style |
| **MCP Twitter** | Tool | Posts the generated thread |
| **scheduling-skill** | Skill | Triggers publication every week |
| **claude-sonnet-4-5** | Model | Long-form content generation, tone and coherence |

---

## Flow

```
weekly cron → scheduling-skill → MCP Notion (read notes)
→ claude-sonnet-4-5 + brand-voice-skill (generate thread)
→ MCP Twitter (post)
```

---

## Component URLs

- [MCP Notion](https://github.com/makenotion/notion-mcp-server)
- [MCP Twitter](https://github.com/EnesCinr/twitter-mcp)
- brand-voice-skill: `whisper.xyz/skills/brand-voice`
- scheduling-skill: `whisper.xyz/skills/scheduling`
- [Claude Sonnet 4.5](https://docs.anthropic.com/en/docs/about-claude/models)

---

## Expected Attestations

| Component | Context | Expected Score | Curators |
|---|---|---|---|
| MCP Notion | `content-automation` | 9.1/10 | 25 |
| brand-voice-skill | `content-creation` | 8.8/10 | 22 |
| MCP Twitter | `social-media` | 8.5/10 | 20 |
| scheduling-skill | `automation` | 8.6/10 | 17 |
| claude-sonnet-4-5 | `content-generation` | 9.4/10 | 41 |

---

*Demo Use Case W4 — Wispr v0.1*
