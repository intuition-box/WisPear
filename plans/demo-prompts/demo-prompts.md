# Whisper — 6 prompts de démo & stacks

> Document de travail équipe — Avril 2026
> Ces prompts sont la base de la démo jury et du Registry on-chain.

---

## Web2

### W2 — GitHub PR Review

**Prompt utilisateur**
> "Je veux que mes PR GitHub reçoivent des reviews automatiques dès qu'elles sont ouvertes"

**Pourquoi c'est bon**
Parle directement aux devs dans la salle. Montre que Whisper choisit le bon modèle selon la tâche — Sonnet pour la qualité du raisonnement code, pas Haiku.

**Stack**

| Objet | Type | Rôle |
|---|---|---|
| MCP GitHub | Tool | Écoute les événements PR via webhook, lit le diff |
| code-review-skill | Skill | Analyse le code, détecte les bugs, propose des corrections |
| webhook-trigger | Tool | Déclenche la review dès qu'une PR est ouverte |
| claude-sonnet-4-5 | Model | Raisonnement avancé sur le code |

**Flow**
```
PR ouverte → webhook-trigger → MCP GitHub (lit le diff)
→ claude-sonnet-4-5 + code-review-skill → commentaire posté sur la PR
```

---

### W3 — Scraping offres d'emploi

**Prompt utilisateur**
> "Je veux recevoir chaque matin uniquement les offres d'emploi qui correspondent à mon profil"

**Pourquoi c'est bon**
Use case grand public, tout le monde comprend immédiatement. Montre le chaînage de plusieurs MCPs et la puissance des embeddings pour le matching.

**Stack**

| Objet | Type | Rôle |
|---|---|---|
| Firecrawl MCP | Tool | Scrape les sites d'offres d'emploi chaque matin |
| embeddings-matching-skill | Skill | Compare chaque offre au profil utilisateur, score 0-1 |
| MCP Gmail | Tool | Envoie uniquement les offres avec score > seuil |
| scheduling-skill | Skill | Déclenche le scraping tous les matins à heure fixe |
| claude-haiku-4-5 | Model | Rapide et économique pour traitement en batch |

**Flow**
```
cron 08:00 → scheduling-skill → Firecrawl MCP (scrape offres)
→ embeddings-matching-skill (score vs profil)
→ filtrage seuil → MCP Gmail (envoie les matches)
```

---

### W4 — Content Creator Notion → Twitter

**Prompt utilisateur**
> "Je veux que mes notes Notion deviennent des threads Twitter postés chaque semaine automatiquement"

**Pourquoi c'est bon**
Très visuel pour une démo — résultat immédiat à montrer. Le jury voit les notes brutes d'un côté, le thread formaté de l'autre.

**Stack**

| Objet | Type | Rôle |
|---|---|---|
| MCP Notion | Tool | Lit les notes de la semaine depuis une database Notion |
| brand-voice-skill | Skill | Réécrit le contenu dans le style de l'utilisateur |
| MCP Twitter | Tool | Poste le thread généré |
| scheduling-skill | Skill | Déclenche la publication chaque semaine |
| claude-sonnet-4-5 | Model | Génération de contenu long, ton et cohérence |

**Flow**
```
cron hebdo → scheduling-skill → MCP Notion (lit les notes)
→ claude-sonnet-4-5 + brand-voice-skill (génère le thread)
→ MCP Twitter (poste)
```

---

## Web3

### P2 — Marché de prédiction ETH

**Prompt utilisateur**
> "Je veux créer un marché de prédiction sur le prix de ETH dans 24h, où seuls des humains vérifiés peuvent parier"

**Pourquoi c'est bon**
DeFi + identité + données réelles. Touche plusieurs prize tracks ETHGlobal. Le World ID rend le use case unique — pas de bots, pas de sybil attack.

**Stack**

| Objet | Type | Rôle |
|---|---|---|
| World ID MiniKit | Tool | Vérifie que chaque parieur est un humain unique (ZK proof) |
| Chainlink Functions | Tool | Résout l'outcome en appelant l'API CoinGecko off-chain |
| Flare FTSO | Tool | Oracle de prix ETH décentralisé, mis à jour toutes les 90s |
| LayerZero OApp | Tool | Rend le résultat du marché lisible cross-chain |
| claude-sonnet-4-5 | Model | Génère la description et les conditions du marché |

**Flow**
```
Utilisateur parie → World ID MiniKit (vérifie humanité)
→ pari enregistré on-chain
→ 24h après → Chainlink Functions (appelle CoinGecko)
→ Flare FTSO (confirme le prix) → résolution du marché
→ LayerZero OApp (propage le résultat cross-chain)
```

---

### PA — Freelancer Autopay USDC

**Prompt utilisateur**
> "Je veux payer mes freelancers en USDC automatiquement dès qu'ils livrent un fichier"

**Pourquoi c'est bon**
Use case immédiatement compréhensible, même par un non-crypto. La démo est simple : uploader un fichier → USDC envoyé. Activé plusieurs prize tracks dont Circle.

**Stack**

| Objet | Type | Rôle |
|---|---|---|
| Walrus Storage | Tool | Stocke le fichier livré, génère un hash immuable |
| proof-of-delivery-skill | Skill | Vérifie et timestamp la livraison on-chain |
| Chainlink Automation | Tool | Déclenche le paiement quand la preuve est validée |
| Circle USDC SDK | Tool | Exécute le virement USDC vers le wallet du freelancer |
| ENS | Tool | Adresse lisible du freelancer (ex: alice.eth) |

**Flow**
```
Freelancer upload fichier → Walrus Storage (hash immuable)
→ proof-of-delivery-skill (timestamp on-chain)
→ Chainlink Automation (détecte la preuve)
→ Circle USDC SDK (paiement automatique vers alice.eth)
```

---

### P3 — Portfolio DeFi Rebalancing

**Prompt utilisateur**
> "Je veux que mon portfolio DeFi se rééquilibre automatiquement selon ma tolérance au risque"

**Pourquoi c'est bon**
DeFi autonome pur. Montre la combinaison data on-chain + exécution automatique. Cible le prize 1inch ($20K) avec une utilisation concrète de Fusion+.

**Stack**

| Objet | Type | Rôle |
|---|---|---|
| Chainlink Data Feeds | Tool | Prix en temps réel des actifs du portfolio |
| portfolio-rebalancing-skill | Skill | Calcule les écarts vs allocation cible, détermine les swaps |
| 1inch Fusion+ SDK | Tool | Exécute les swaps au meilleur prix, slippage garanti |
| Privy Embedded Wallet | Tool | Wallet de l'utilisateur, signe les tx en arrière-plan |
| claude-haiku-4-5 | Model | Rapide pour les décisions de rebalancing récurrentes |

**Flow**
```
Chainlink Data Feeds (prix live) → portfolio-rebalancing-skill
→ calcul des écarts vs cible → si écart > seuil
→ 1inch Fusion+ SDK (swap optimal)
→ Privy Embedded Wallet (signature) → tx on-chain
```

---

## Objets uniques à créer dans le Registry

### Tools & MCPs (17)

| Label | URL |
|---|---|
| MCP GitHub | github.com/modelcontextprotocol/servers/src/github |
| MCP Gmail | github.com/modelcontextprotocol/servers/src/gmail |
| MCP Notion | github.com/makenotion/notion-mcp-server |
| MCP Twitter | github.com/EnesCinr/twitter-mcp |
| Firecrawl MCP | github.com/mendableai/firecrawl-mcp-server |
| webhook-trigger | whisper.xyz/tools/webhook-trigger |
| World ID MiniKit | docs.world.org/mini-apps/minikit |
| Chainlink Functions | docs.chain.link/chainlink-functions |
| Chainlink Data Feeds | docs.chain.link/data-feeds |
| Chainlink Automation | docs.chain.link/chainlink-automation |
| Flare FTSO | dev.flare.network/ftso/overview |
| LayerZero OApp | docs.layerzero.network/v2/developers/evm/oapp |
| Circle USDC SDK | developers.circle.com/sdks |
| ENS | docs.ens.domains |
| Walrus Storage | docs.walrus.site |
| Privy Embedded Wallet | docs.privy.io |
| 1inch Fusion+ SDK | docs.1inch.io/docs/fusion-swap |

### Skills (6)

| Label | URL |
|---|---|
| code-review-skill | whisper.xyz/skills/code-review |
| embeddings-matching-skill | whisper.xyz/skills/embeddings-matching |
| brand-voice-skill | whisper.xyz/skills/brand-voice |
| scheduling-skill | whisper.xyz/skills/scheduling |
| proof-of-delivery-skill | whisper.xyz/skills/proof-of-delivery |
| portfolio-rebalancing-skill | whisper.xyz/skills/portfolio-rebalancing |

### Modèles (2)

| Label | URL |
|---|---|
| claude-haiku-4-5 | docs.anthropic.com/en/docs/about-claude/models |
| claude-sonnet-4-5 | docs.anthropic.com/en/docs/about-claude/models |

### Packages (6)

| Label | URL |
|---|---|
| pkg:github-pr-review | whisper.xyz/packages/github-pr-review |
| pkg:job-scraper | whisper.xyz/packages/job-scraper |
| pkg:content-creator | whisper.xyz/packages/content-creator |
| pkg:prediction-market | whisper.xyz/packages/prediction-market |
| pkg:freelancer-autopay | whisper.xyz/packages/freelancer-autopay |
| pkg:portfolio-defi | whisper.xyz/packages/portfolio-defi |

---

*Whisper — document équipe v0.1 — Avril 2026*
