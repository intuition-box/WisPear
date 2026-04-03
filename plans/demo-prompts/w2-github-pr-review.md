# W2 — GitHub PR Review

## User Prompt

> "I want my GitHub pull requests to receive automatic reviews as soon as they're opened"

---

## Why This Works

Speaks directly to developers in the room. Shows that Wispr selects the right model for the task — Sonnet for high-quality code reasoning, not Haiku.

---

## Stack

| Component | Type | Role |
|---|---|---|
| **MCP GitHub** | Tool | Listens to PR events via webhook, reads the diff |
| **code-review-skill** | Skill | Analyzes code, detects bugs, suggests improvements |
| **webhook-trigger** | Tool | Triggers review when PR is opened |
| **claude-sonnet-4-5** | Model | Advanced reasoning for code analysis |

---

## Flow

```
PR opened → webhook-trigger → MCP GitHub (reads diff)
→ claude-sonnet-4-5 + code-review-skill → comment posted on PR
```

---

## Component URLs

- [MCP GitHub](https://github.com/modelcontextprotocol/servers/src/github)
- code-review-skill: `whisper.xyz/skills/code-review`
- webhook-trigger: `whisper.xyz/tools/webhook-trigger`
- [Claude Sonnet 4.5](https://docs.anthropic.com/en/docs/about-claude/models)

---

## Expected Attestations

| Component | Context | Expected Score | Curators |
|---|---|---|---|
| MCP GitHub | `ai-agents` | 9.1/10 | 23 |
| code-review-skill | `backend` | 8.7/10 | 18 |
| webhook-trigger | `automation` | 8.5/10 | 15 |
| claude-sonnet-4-5 | `code-analysis` | 9.5/10 | 45 |

---

*Demo Use Case W2 — Wispr v0.1*
