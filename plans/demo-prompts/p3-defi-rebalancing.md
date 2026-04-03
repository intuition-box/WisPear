# P3 — DeFi Portfolio Rebalancing

## User Prompt

> "I want my DeFi portfolio to automatically rebalance according to my risk tolerance"

---

## Why This Works

Pure autonomous DeFi. Shows combination of on-chain data + automatic execution. Targets 1inch prize ($20K) with concrete use of Fusion+.

---

## Stack

| Component | Type | Role |
|---|---|---|
| **Chainlink Data Feeds** | Tool | Real-time prices of portfolio assets |
| **portfolio-rebalancing-skill** | Skill | Calculates deviations vs target allocation, determines swaps |
| **1inch Fusion+ SDK** | Tool | Executes swaps at best price, guaranteed slippage |
| **Privy Embedded Wallet** | Tool | User's wallet, signs transactions in background |
| **claude-haiku-4-5** | Model | Fast for recurring rebalancing decisions |

---

## Flow

```
Chainlink Data Feeds (live prices) → portfolio-rebalancing-skill
→ calculates deviations vs target → if deviation > threshold
→ 1inch Fusion+ SDK (optimal swap)
→ Privy Embedded Wallet (signature) → on-chain tx
```

---

## Component URLs

- [Chainlink Data Feeds](https://docs.chain.link/data-feeds)
- portfolio-rebalancing-skill: `whisper.xyz/skills/portfolio-rebalancing`
- [1inch Fusion+ SDK](https://docs.1inch.io/docs/fusion-swap)
- [Privy Embedded Wallet](https://docs.privy.io)
- [Claude Haiku 4.5](https://docs.anthropic.com/en/docs/about-claude/models)

---

## Expected Attestations

| Component | Context | Expected Score | Curators |
|---|---|---|---|
| Chainlink Data Feeds | `defi` | 9.5/10 | 38 |
| portfolio-rebalancing-skill | `defi` | 8.9/10 | 23 |
| 1inch Fusion+ SDK | `defi` | 9.3/10 | 32 |
| Privy Embedded Wallet | `web3-building` | 9.1/10 | 26 |
| claude-haiku-4-5 | `automation` | 9.2/10 | 34 |

---

## Prize Tracks Targeted

- 1inch ($20K prize)
- Chainlink
- Privy

---

*Demo Use Case P3 — Wispr v0.1*
