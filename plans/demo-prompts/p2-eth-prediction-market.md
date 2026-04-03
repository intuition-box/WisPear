# P2 — ETH Prediction Market

## User Prompt

> "I want to create a prediction market on ETH price in 24h, where only verified humans can bet"

---

## Why This Works

DeFi + identity + real-world data. Hits multiple ETHGlobal prize tracks. World ID makes this use case unique — no bots, no sybil attacks.

---

## Stack

| Component | Type | Role |
|---|---|---|
| **World ID MiniKit** | Tool | Verifies each bettor is a unique human (ZK proof) |
| **Chainlink Functions** | Tool | Resolves outcome by calling CoinGecko API off-chain |
| **Flare FTSO** | Tool | Decentralized ETH price oracle, updated every 90s |
| **LayerZero OApp** | Tool | Makes market result readable cross-chain |
| **claude-sonnet-4-5** | Model | Generates market description and conditions |

---

## Flow

```
User bets → World ID MiniKit (verify humanness)
→ bet recorded on-chain
→ 24h later → Chainlink Functions (call CoinGecko)
→ Flare FTSO (confirm price) → market resolution
→ LayerZero OApp (propagate result cross-chain)
```

---

## Component URLs

- [World ID MiniKit](https://docs.world.org/mini-apps/minikit)
- [Chainlink Functions](https://docs.chain.link/chainlink-functions)
- [Flare FTSO](https://dev.flare.network/ftso/overview)
- [LayerZero OApp](https://docs.layerzero.network/v2/developers/evm/oapp)
- [Claude Sonnet 4.5](https://docs.anthropic.com/en/docs/about-claude/models)

---

## Expected Attestations

| Component | Context | Expected Score | Curators |
|---|---|---|---|
| World ID MiniKit | `web3-identity` | 9.3/10 | 31 |
| Chainlink Functions | `web3-building` | 9.1/10 | 27 |
| Flare FTSO | `defi` | 8.7/10 | 19 |
| LayerZero OApp | `web3-building` | 9.0/10 | 24 |
| claude-sonnet-4-5 | `content-generation` | 9.4/10 | 41 |

---

## Prize Tracks Targeted

- World ID / Worldcoin
- Chainlink
- Flare
- LayerZero

---

*Demo Use Case P2 — Wispr v0.1*
