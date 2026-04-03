# Wisper — Project Overview

> Developers' collective intelligence, encoded in a living graph, whispered to AI before it responds.

---

## Vision

LLMs know a lot. But they do not know what *really* works, not in your context, not with your stack, not in 2025. Their recommendations reflect the average of what has been written on the internet, not the accumulated experience of people who have actually shipped with these tools.

Wisper starts from a different idea: the most useful knowledge is not in docs, it is in practitioners' minds. The developer who migrated three projects from NextAuth to Clerk knows exactly why and under which conditions. The data engineer who moved from Pandas to Polars in production has a solid opinion about it. This knowledge exists, it is just scattered, uncaptured, and unusable by AI.

Wisper is a **collective intelligence interface for AI**. A system where real experts, curators, encode their field experience into an on-chain knowledge graph. And where that graph becomes the context for every AI response. Before generating, Wisper already knows which tools were validated, in which context, and by whom. It does not explore. It executes.

This is not a chatbot with a better prompt. It is a new paradigm for how AI acquires operational knowledge, not through training, but through continuous community attestation.

---

## What Wisper Fundamentally Changes

A standard LLM responds from its priors. Wisper responds from collective memory, built and maintained by practitioners, verifiable on-chain.

**For the user**, the difference is invisible but radical. Asking Wisper to build an app is like asking a senior developer who has already built that project three times. It does not offer ten options, it gives you the right choice directly.

**For the graph**, every interaction is a learning opportunity. Every curator attestation enriches collective knowledge. The system becomes more precise as the community grows.

**For the ecosystem**, Wisper creates a shared asset: an operational knowledge base about tools, neutral, verifiable, and owned by the community rather than a company.

---

## Problem

When an LLM generates code or recommends a stack, three structural problems appear.

**Priors are frozen.** The model was trained at a point in time. It does not know that one tool deprecated its API, that another became the de facto standard, or that a specific combination causes silent production conflicts.

**Knowledge is decontextualized.** "Which ORM for Node.js?" has ten good answers depending on whether you are building serverless or a monolith, whether your team has DBAs, or whether you need end-to-end type safety. LLMs answer in general where they should answer in context.

**No collective memory.** Thousands of developers make the same mistakes, find the same solutions, and that experience disappears. It is never captured in a structured way that AI can use.

---

## Solution

Wisper introduces a layer between the user request and the LLM: the **community reputation graph**.

Before generating, Wisper queries a living knowledge graph hosted on Intuition, an on-chain attestation protocol. This graph contains the community's operational knowledge: which tools work, in which context, and with what reliability, attested by real practitioners.

The LLM receives pre-resolved context. It already knows what to use. It executes directly, without exploring, without hesitation, without proposing ten alternatives. The result is more precise, more consistent, and generated with fewer tokens.

The graph itself grows continuously. Every curator attestation enriches it. The more active the community, the more precise Wisper becomes.

---

## The Two Roles

### User

The user interacts with Wisper like with any AI assistant, in natural language. They do not see the graph. They do not see attestations. They get a direct answer backed by the community's collective knowledge.

If an answer is unsatisfactory, they can report it. This moment is an invitation to become a curator, to join the people shaping response quality.

### Curator

The curator is a practitioner with an Intuition account. Their expertise is encoded in a domain profile obtained through a quick onboarding questionnaire. This profile does not weight their votes, it only targets the tools where their input is relevant.

Their role is to attest: this tool, in this context, deserves this score. Each attestation is an on-chain transaction on Intuition L3. It contributes to the tool's reputation and becomes part of the context Wisper will use for future answers.

The curator is not a moderator. They have no censorship power. They have signaling power, and that is exactly what Wisper needs.

**Becoming a curator:**
```
Unsatisfactory response -> CTA "Contribute to Wisper"
-> Create Intuition account
-> Yes/No questionnaire (6-8 questions, domain identification)
-> On-chain attested profile
-> Access curator dashboard
```

---

## The Knowledge Graph

Everything is built on Intuition L3. Every tool, domain, and curator is an entity. Relationships between these entities are attested triples: immutable, verifiable, open.

### Entities
- **Tool** - a library, an SDK, an MCP server, an architecture pattern
- **Capability** - what a tool accomplishes (`oauth-sessions`, `orm-querying`, `edge-deployment`)
- **Domain** - a specific usage context (`nextjs-app-router`, `python-fastapi`, `react-native`)
- **Curator** - a practitioner with an on-chain domain profile
- **User** - a basic account with no attestation rights

### Triples
```
tool:X   →  hasCapability    →  cap:Y
tool:X   →  suitedFor        →  domain:Y
tool:X   →  incompatibleWith →  tool:Z
curator  →  isActiveIn       →  domain:Y
curator  →  attests          →  { tool:X, context: domain:Y, score: 9/10 }
```

### Reputation
The reputation of a tool in a given context is the average of all attestations received for that context. Simple, transparent, verifiable.

```
reputation(tool, context) = Σ scores / number of attestations
```

---

## Curator Profiling - Yes/No Questionnaire

Curator onboarding is a binary question tree. Each yes/no answer guides the next branch. In 6-8 questions, the system identifies the domains where the curator can contribute relevantly.

```
"Do you mainly work with code?" -> yes/no
    -> yes: "More frontend?"
                        -> yes: "Do you use React?"
                                            -> yes: "Do you work with Next.js?"
                                            -> no: "Do you work with Vue?"
                        -> no: "More backend?"
                                            -> yes: "Do you use Node.js?"
                                                                -> yes: "Are you familiar with edge runtimes?"
                                                                -> no: "Do you work in Python?"
                                            -> no: "More data / ML?"
    -> no: "Do you work on infra / DevOps?"
```

Result: a list of domains (`[nextjs, react, typescript, auth]`) attested on-chain. It is used only to target what appears in the curator dashboard, not to weight votes.

---

## Flow - Wisper Response

```
[1] User request
    "Build a Next.js app with Google auth and an admin dashboard"

[2] Intent classification
    → { framework: "nextjs", features: ["oauth", "admin-ui"], constraints: ["typescript"] }

[3] Intuition graph query
    → Top tools by feature, filtered by context and reputation threshold
    → auth     : Clerk      (score 9.1 · 23 attestations)
    → admin-ui : shadcn/ui  (score 8.2 · 31 attestations)

[4] Context construction
    → Validated stack injected into the system prompt
    → Usage patterns derived from curator attestations

[5] Generation
    → Direct response, pre-decided stack, no exploration

[6] Delivery
    → Working code grounded in collective experience
    → If unsatisfied -> CTA "Contribute to Wisper"
```

---

## Flow - Curator Attestation

```
[1] Connect Intuition wallet
[2] Dashboard: tools to attest within their domains
[3] For each tool:
    → Usage context prefilled from the graph
    → Score (relevance · developer experience · reliability)
    → Optional: project link or snippet as proof
    → Submit -> on-chain attestation on Intuition L3
[4] The tool's reputation score updates
[5] The next Wisper response in that context benefits from it
```

---

## What Wisper Is Not

Wisper is not a tool search engine. It does not display public rankings or gamified leaderboards. Reputation is an internal signal serving generation, not a product in itself.

Wisper is not a review platform. Curators are not anonymous reviewers. They are practitioners identified through their Intuition account, and their attestations are tied to their on-chain reputation.

Wisper is not an improved LLM. It does not change the model. It changes what the model receives before responding.

---

