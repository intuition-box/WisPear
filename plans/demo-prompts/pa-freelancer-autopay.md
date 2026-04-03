# PA — Freelancer Autopay

## User Prompt

> "I want to pay my freelancers in USDC automatically as soon as they deliver a file"

---

## Why This Works

Immediately understandable use case, even for non-crypto people. Simple demo: upload file → USDC sent. Activates multiple prize tracks including Circle.

---

## Stack

| Component | Type | Role |
|---|---|---|
| **Walrus Storage** | Tool | Stores delivered file, generates immutable hash |
| **proof-of-delivery-skill** | Skill | Verifies and timestamps delivery on-chain |
| **Chainlink Automation** | Tool | Triggers payment when proof is validated |
| **Circle USDC SDK** | Tool | Executes USDC transfer to freelancer's wallet |
| **ENS** | Tool | Human-readable freelancer address (e.g., alice.eth) |

---

## Flow

```
Freelancer uploads file → Walrus Storage (immutable hash)
→ proof-of-delivery-skill (timestamp on-chain)
→ Chainlink Automation (detects proof)
→ Circle USDC SDK (automatic payment to alice.eth)
```

---

## Component URLs

- [Walrus Storage](https://docs.walrus.site)
- proof-of-delivery-skill: `whisper.xyz/skills/proof-of-delivery`
- [Chainlink Automation](https://docs.chain.link/chainlink-automation)
- [Circle USDC SDK](https://developers.circle.com/sdks)
- [ENS](https://docs.ens.domains)

---

## Expected Attestations

| Component | Context | Expected Score | Curators |
|---|---|---|---|
| Walrus Storage | `web3-building` | 8.8/10 | 16 |
| proof-of-delivery-skill | `web3-building` | 8.6/10 | 14 |
| Chainlink Automation | `defi` | 9.2/10 | 29 |
| Circle USDC SDK | `web3-payments` | 9.4/10 | 35 |
| ENS | `web3-identity` | 9.5/10 | 42 |

---

## Prize Tracks Targeted

- Circle
- Chainlink
- ENS
- Walrus / Sui

---

*Demo Use Case PA — Wispr v0.1*
