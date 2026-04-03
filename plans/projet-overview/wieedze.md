# Wispr Project Vision

> **"Collective intelligence whispered to AI before it responds."**

---

## The Problem

LLMs don't know what **really works** — not in your context, not with your stack, not in 2025.

**Three fundamental issues:**

1. **Frozen knowledge**: Models don't know that tools deprecated APIs, became standards, or cause production conflicts.

2. **Missing context**: "Which auth solution?" has different answers for serverless vs monolith, solo dev vs team.

3. **Lost experience**: Thousands of developers solve the same problems daily. That knowledge disappears.

**Result**: Building AI agents means navigating a fragmented ecosystem alone. No trust layer. No collective memory.

---

## The Vision

**Wispr** is where developers' collective intelligence becomes the context for AI responses.

Before generating anything, Wispr queries a **living knowledge graph** — built by practitioners who've shipped with these tools. The AI receives pre-resolved context: which components work, validated by real humans on-chain.

**This is not a chatbot with a better prompt.** It's a new paradigm — AI learns not through training, but through continuous community attestation.

---

## How It Changes Everything

### For Users
The difference is **invisible but radical**. You ask Wispr like asking a senior dev who's built it three times. No exploration. No ten options. Just the right answer, backed by collective experience.

### For the Graph
A **living system** that grows continuously. Every curator attestation enriches it. The graph learns through community validation.

### For the Ecosystem
A shared asset: operational knowledge about AI tools — neutral, verifiable, community-owned.

---

## User Experience

### Step 1: Describe Your Need

Just type in plain English:
```
"Build a Next.js agent that monitors GitHub issues and sends daily summaries"
```

No setup. No API keys. No technical knowledge required.

### Step 2: Wispr Queries the Graph

**What happens behind the scenes**:
```
1. Intent classification: Next.js + GitHub + scheduling
2. Graph query → Top validated components:
   - GitHub MCP (9.1/10, 23 attestations)
   - Vercel AI SDK (8.9/10, 31 attestations)
3. Pre-resolved context injected into AI
```

**Key difference**:
- **Standard LLM**: "Here are 10 GitHub integrations... which do you prefer?"
- **Wispr**: "I'll use GitHub MCP (validated for Next.js)" → generates code directly

### Step 3: Receive Working Solution

You get **two outputs**:

1. **Working code** — Ready to run, pre-configured with validated components
2. **Exportable config** — System prompt, MCP setup, install commands (copy-paste into Claude Desktop, Cursor, etc.)

### Step 4: If Unsatisfied

**"Contribute to Wispr"** button appears → Become a curator, shape what Wispr recommends.

---

## Two Modes

### Default Mode (90% of users)
- No visible graph, no jargon
- Just fast, accurate answers
- The graph works invisibly

### Advanced Mode (experts, demos)
- Animated blocks showing selection in real-time
- Trust scores visible ("9.1/10 from 23 curators")
- Customizable stack

Toggle between modes.

---

## Becoming a Curator

### Who Are Curators?

Practitioners with real experience who've shipped projects.

### The Flow

```
Bad response
  ↓
"Contribute to Wispr"
  ↓
Quick profiling (6-8 questions)
  ↓
Curator dashboard
```

### What Curators Do

Rate components in their domains:
- **Relevance**: Does it solve the problem well?
- **Developer Experience**: Pleasant to work with?
- **Reliability**: Works in production?

Submit → On-chain attestation → Reputation updates → Next response benefits.

**Self-scaling**: Every bad response recruits a potential curator.

---

## The Living Graph

### Simple Structure

**Components**: GitHub MCP, Clerk auth, Claude Sonnet, etc.

**Contexts**: Next.js + AI agents, Python pipelines, etc.

**Attestations**: What curators say
- "GitHub MCP works great for Next.js" (9/10)
- "Clerk is perfect for startups" (8/10)

### Reputation

**Hackathon**: Simple average
```
reputation = Σ scores / attestations

Example: GitHub MCP (9/10 + 10/10 + 9/10) / 3 = 9.3/10
```

**Post-Hackathon**: Economic weight (curators stake tokens, higher stakes = more influence)

### Why On-Chain?

- **Verifiable**: Anyone can audit
- **Permanent**: Can't be deleted/manipulated
- **Transparent**: See who vouched for each tool

Built on **Intuition Protocol** (L3 chain for attestations).

---

## What Wispr Is Not

**Not a search engine** → No public rankings. Reputation serves generation.

**Not a review platform** → Curators aren't anonymous. Attestations tied to on-chain identity.

**Not an improved LLM** → Same models, better context.

**Not just for beginners** → Experts benefit most.

---

## The Wow Moments

### 1. Zero to Agent in 60 Seconds
Describe need → Code ready. No API keys. No setup.

### 2. Invisible Intelligence
Answers are suspiciously good. Like having a senior dev on call.

### 3. Visible Trust (Advanced Mode)
See real humans vouching. "23 curators, avg 9.1/10." Not algorithms. People with skin in the game.

### 4. Living Knowledge
The graph gets smarter daily. Your attestation today improves responses tomorrow.

---

## Hackathon Scope (48h)

### What We're Building

**Core Experience**:
- Chat interface (plain English input)
- Graph query (10-15 pre-seeded components)
- Code generation (direct, no exploration)
- Config export (copy-paste ready)
- Curator flow (onboarding + attestation)

**Demo Features**:
- Animated blocks (switchable visual mode)
- Trust scores display
- Simple attestation dashboard

**Simplified**:
- Pre-seeded graph (we create before demo)
- Social curation (no token staking yet)
- Single context (Next.js + AI agents)

### Post-Hackathon

**Economic Layer** (P1):
- Stake tokens on attestations
- Earn rewards from adoption
- TVL-weighted reputation

**Expansion**:
- Multi-context (Python, Rust, mobile)
- Anyone can propose components
- Agent hosting

---

## Why This Matters

**For Developers**: Stop wasting hours researching. Get validated answers from people who've shipped.

**For Curators**: Shape what AI recommends to thousands. Build reputation. Earn rewards.

**For AI**: Operational knowledge, continuously updated, context-aware. Not frozen training data.

**For Web3**: Proves on-chain attestations create real value beyond speculation.

---

## Pitch (30 seconds)

> **"We're building collective intelligence for AI."**
>
> **Problem**: LLMs hallucinate about tools. They don't know what works in production.
>
> **Solution**: A living knowledge graph where developers attest to what actually works. Before responding, AI queries the graph.
>
> **Demo**: Natural language → production code in under 60 seconds. Components validated by practitioners, on-chain.
>
> **Post-hackathon**: Economic staking, curator rewards, expansion.

---

## Open Questions

1. How to bootstrap initial curators?
2. When to migrate from social to economic curation?
3. How much code to generate? (Full apps vs configs)
4. When to show graph vs hide it?
5. Which contexts to expand to first?
