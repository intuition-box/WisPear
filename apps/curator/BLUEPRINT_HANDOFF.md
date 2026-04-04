# Blueprint Handoff — Chat → Curator

## TL;DR

The chat sends blueprint components to the curator via the URL. The curator displays each component and lets the user vote **Support** or **Oppose** on contextual claims (nested triples).

---

## How it arrives

When the user clicks **"Curate"** in the chat, it opens:

```
http://localhost:3001/curate?blueprint=<base64-encoded-json>
```

To decode:

```ts
const params = new URLSearchParams(window.location.search);
const raw = params.get("blueprint");
if (raw) {
  const items: CurateItem[] = JSON.parse(atob(raw));
}
```

---

## Understanding Intuition triples

This is the most important part. On Intuition Protocol, you **never** vote directly on a component. You vote on structured **claims** called triples.

### Level 1 — Base triple (T1): Classification

```
(MCP Notion) --is-best-of--> (mcp)
```

This says: "MCP Notion is an MCP". It's factual, not very interesting to vote on.

### Level 2 — Nested triple (T2b): Contextual claim

```
(T1-mcp-notion) --in-context-of--> (content-automation)
```

**The subject of the nested triple is the base triple itself, not the atom.**

This says: "The fact that MCP Notion is a top MCP **applies in the context of** content-automation."

This is what we vote on. Why? Because a user could:
- **Support** MCP Notion for content-automation (tested it, works great)
- **Oppose** MCP Notion for data-analysis (not suited for that use case)

The same component can be great in one context and bad in another. The nested triple captures this granularity.

### Visual diagram

```
ATOM                    BASE TRIPLE (T1)              NESTED TRIPLE (T2b)
                                                      <-- WE VOTE HERE
[MCP Notion] -----> (MCP Notion, is-best-of, mcp) -----> (T1, in-context-of, content-automation)
                         ^                                       ^
                         |                                       |
                    classification                    contextual claim
                    (no voting)                       (Support / Oppose)
```

---

## Data structure

```ts
interface CurateItem {
  // The component (for display)
  component: {
    id: string;          // "mcp-notion"
    name: string;        // "MCP Notion"
    description: string; // "Model Context Protocol server for Notion"
    url: string;         // "https://github.com/makenotion/notion-mcp-server"
  };

  // Base triple — component classification (T1)
  // Serves as the SUBJECT of the nested triple
  baseTriple: {
    id: string;          // "T1-mcp-notion"
    subject: string;     // "mcp-notion"
    predicate: string;   // "is-best-of"
    object: string;      // "mcp" | "sdk" | "api" | "model" | "skill"
    label: string;       // "MCP Notion is-best-of mcp"
  };

  // Nested triple — contextual claim (T2b)
  // THIS IS WHAT WE VOTE ON (Support / Oppose)
  nestedTriple: {
    subjectTriple: string; // "T1-mcp-notion" ← subject is the base triple, not the atom!
    predicate: string;     // "in-context-of"
    object: string;        // "content-automation", "defi", etc.
    label: string;         // "(MCP Notion is-best-of mcp) in-context-of content-automation"
  } | null;                // null if no context

  trustScore: number;      // 0-10, current score from Intuition graph
  curatorCount: number;    // number of existing curators
}
```

---

## Example decoded payload

```json
[
  {
    "component": {
      "id": "mcp-notion",
      "name": "MCP Notion",
      "description": "Model Context Protocol server for Notion",
      "url": "https://github.com/makenotion/notion-mcp-server"
    },
    "baseTriple": {
      "id": "T1-mcp-notion",
      "subject": "mcp-notion",
      "predicate": "is-best-of",
      "object": "mcp",
      "label": "MCP Notion is-best-of mcp"
    },
    "nestedTriple": {
      "subjectTriple": "T1-mcp-notion",
      "predicate": "in-context-of",
      "object": "content-automation",
      "label": "(MCP Notion is-best-of mcp) in-context-of content-automation"
    },
    "trustScore": 9.1,
    "curatorCount": 25
  }
]
```

---

## What to implement

### 1. Read the data

```ts
// In /curate page
const params = new URLSearchParams(window.location.search);
const raw = params.get("blueprint");
const items: CurateItem[] = raw ? JSON.parse(atob(raw)) : [];
```

### 2. Display each component

For each `CurateItem`:
- Show the **component**: name, description, url, trustScore, curatorCount
- Show the **nested triple label** as the claim to vote on
  - e.g. "(MCP Notion is-best-of mcp) in-context-of content-automation"
- If `nestedTriple` is null, show `baseTriple.label` as fallback

### 3. Vote buttons

Two buttons per claim:
- **Support** (green) = "I agree with this claim" → deposit FOR on Intuition Protocol
- **Oppose** (red) = "I disagree" → deposit AGAINST on Intuition Protocol

Voting requires a connected wallet. If no wallet → open the connect modal first.

### 4. Fallback

If no `?blueprint=` in the URL → current behavior (mock data / empty state).

---

## Intuition Protocol mapping

For reference, here's how this maps to the protocol:

| Level | Triple | Example | Vote? |
|-------|--------|---------|-------|
| T1 | `(component, is-best-of, type)` | MCP Notion is-best-of mcp | No |
| T2b | `(T1, in-context-of, context)` | (T1-mcp-notion) in-context-of content-automation | **Yes** |

Voting on T2b = staking $TRUST for or against the contextual claim. The more stake, the stronger the signal for future chat recommendations.
