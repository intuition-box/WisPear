# Vision du Projet Wispr

> **"Construire des agents, sans les construire."**

## Le Problème

Construire un agent IA performant aujourd'hui demande de naviguer un écosystème fragmenté, opaque, et en mouvement constant. Les outils existent. La connaissance collective, non.

**Les défis concrets :**
- Connaître l'écosystème des outils — MCPs, packages npm, SDKs — pour chaque use case
- Choisir le bon modèle selon la tâche, le budget, la latence attendue
- Rédiger un system prompt efficace qui ne hallucine pas et ne dérive pas
- Itérer longuement avant d'obtenir quelque chose de fiable en production
- Recommencer tout cela à chaque nouveau use case
- Ne jamais savoir si l'outil qu'on utilise est vraiment le meilleur disponible

**C'est inaccessible au novice. C'est chronophage pour l'expert.** Et il n'existe pas de couche de confiance collective sur la qualité des outils.

---

## La Vision

**Wispr** transforme une intention formulée en langage naturel en agent opérationnel, certifié par une communauté et hébergeable en moins d'une minute.

Wispr est un **knowledge graph curé on-chain**, couplé à un builder IA, couplé à des incitations économiques pour que la communauté maintienne la qualité du graph en permanence.

**La couche Web3 n'est pas un gadget.** Elle est la fondation d'un système de confiance ouvert, où chaque outil, chaque package, chaque skill a une réputation traçable, et où ceux qui construisent cette réputation sont récompensés.

---

## Architecture en 3 Couches

Trois couches distinctes, pensées pour fonctionner ensemble. Chaque couche apporte une valeur autonome et renforce les deux autres.

### 🎨 Couche 1 : Builder (UX/UI)

**L'interface accessible à tous. L'utilisateur ne configure rien — il décrit son besoin.**

- Connexion email → embedded wallet créé silencieusement (invisible pour le novice)
- Chat en langage naturel : l'utilisateur décrit son besoin ou son use case
- Un LLM analyse la demande et génère un meta-prompt optimisé
- L'UI affiche une stack recommandée : blocs visuels (tools, skills, MCPs, modèle)
- Chaque bloc affiche son score de trust et ses curateurs actifs
- Deux sorties : injecter le prompt ailleurs, ou héberger l'agent directement sur Wispr

### ⛓️ Couche 2 : Registry On-Chain (Données)

**L'index de vérité. Tous les objets consommables par un agent, écrits sur Intuition Protocol.**

- Chaque objet (tool, skill, MCP, package, modèle, prompt) est un atom Intuition
- Métadonnées structurées : URL, description, contexte d'usage, compatibilité
- Score de trust calculé à partir des stakes des curateurs (atoms/triples)
- Le Builder ne recommande que des objets indexés et actifs dans le Registry
- Open : n'importe qui peut proposer un objet, la curation filtre la qualité

### 💰 Couche 3 : Curation Économique (Incentives)

**L'intelligence collective avec des incentives réels. Les bons outils montent, les mauvais tombent.**

- Les curateurs définissent leur domaine de prédilection (TypeScript, RAG, Web scraping…)
- Ils reçoivent des propositions d'objets à curate dans leur domaine
- Ils stakent des tokens TRUST sur les objets qu'ils jugent de qualité
- Récompensés proportionnellement à l'adoption : plus un objet est utilisé, plus ils gagnent
- Dashboard : profil, domaines, stakes actifs, historique des gains, trust score
- Incentive d'être précoce : staker tôt sur un objet qui monte = rendement maximal

---

## Propositions de Valeur

### Pour les Utilisateurs Novices
- **Connexion simplifiée**: Authentification Web2 (email) avec création automatique d'embedded wallet
- **Interface intuitive**: Blocs visuels d'outils avec interaction visuelle
- **Guidance intelligente**: LLM qui analyse les besoins et propose la meilleure configuration
- **Zéro configuration**: Packages pré-configurés pour les cas d'usage courants
- **Hébergement géré**: Possibilité d'héberger les agents créés

### Pour les Utilisateurs Confirmés
- **Customisation avancée**: Meta-prompts injectables partout
- **Catalogue complet**: Accès à tous les objets (packages, skills, MCPs) avec documentation détaillée
- **Transparence**: URLs, utilité, contexte et réputation pour chaque outil
- **Contrôle total**: Choix manuel des composants si désiré

### Pour les Curateurs
- **Monétisation de l'expertise**: Gagner des tokens en faisant de la curation
- **Dashboard personnalisé**: Profil adapté aux domaines de prédilection
- **Système de réputation**: Staking sur les bons outils = gains proportionnels
- **Impact direct**: Améliorer la qualité globale de la plateforme

### Pour l'Écosystème
- **Quality assurance**: Système de réputation basé sur le staking et l'usage réel
- **Découvrabilité**: Les meilleurs outils émergent naturellement
- **Standards**: Registry centralisé des objets nécessaires aux agents
- **Certification Web3**: Traçabilité et authenticité des outils validés

---

## User Flows

### Flow 1: Utilisateur Novice - Création d'Agent

```
1. Connexion
   └─> Email (Web2)
   └─> Création automatique d'embedded wallet

2. Expression du besoin
   └─> Chat interface
   └─> Description en langage naturel de la tâche

3. Analyse intelligente
   └─> LLM analyse la demande
   └─> Génération d'une configuration optimale:
       ├─> Skills recommandés
       ├─> Packages appropriés
       ├─> Modèle le plus accurate
       └─> Meta-prompt généré

4. Visualisation de la configuration
   └─> Interface à blocs visuels
   └─> Chaque bloc représente un outil/skill/package
   └─> Informations affichées:
       ├─> Nom et description
       ├─> Score de réputation
       ├─> Contexte d'utilisation
       └─> URL de documentation

5. Validation et déploiement
   └─> Ajustements optionnels via l'interface
   └─> Option d'hébergement de l'agent
   └─> Lancement et utilisation
```

### Flow 2: Utilisateur Confirmé - Customisation Avancée

```
1. Connexion
   └─> Même processus (Email + embedded wallet)

2. Exploration du catalogue
   └─> Accès au registry complet
   └─> Filtres par:
       ├─> Type (skill, package, MCP, model)
       ├─> Réputation
       ├─> Domaine/catégorie
       └─> Version

3. Construction manuelle
   └─> Sélection des composants souhaités
   └─> Édition du meta-prompt
   └─> Configuration fine des paramètres

4. Injection et test
   └─> Injection du prompt où souhaité
   └─> Tests et itérations
   └─> Sauvegarde de la configuration

5. Partage (optionnel)
   └─> Publication de la configuration comme package
   └─> Contribution à l'écosystème
```

### Flow 3: Curateur - Validation d'Outils

```
1. Onboarding curateur
   └─> Création de profil
   └─> Définition des domaines d'expertise:
       ├─> Stack technique
       ├─> Types d'agents
       └─> Domaines métiers

2. Dashboard personnalisé
   └─> Suggestions de curation basées sur le profil
   └─> Nouveaux outils à valider dans les domaines d'expertise
   └─> Métriques de performance des outils déjà stakés

3. Processus de curation
   └─> Dépense de tokens de subscription
   └─> Analyse de l'outil:
       ├─> Test fonctionnel
       ├─> Revue de documentation
       ├─> Vérification de compatibilité
       └─> Évaluation de la qualité

4. Staking et certification
   └─> Décision de staking (montant)
   └─> Ajout de métadonnées:
       ├─> Contexte d'utilisation
       ├─> Cas d'usage recommandés
       ├─> Notes et warnings
       └─> Tags et catégorisation

5. Gains et réputation
   └─> Gains proportionnels à:
       ├─> Usage de l'outil
       ├─> Score de réputation de l'outil
       └─> Montant staké
   └─> Construction de réputation personnelle comme curateur
```

---

## Le "Wow Effect"

L'utilité ne suffit pas. Ce qui reste dans la mémoire d'un utilisateur, c'est un moment précis. Voici les quatre moments candidats.

### 1. Construction en Direct
Les blocs de la stack s'animent et se placent dans l'UI au fur et à mesure que le LLM analyse. Pas un loader. Une construction visible en temps réel.

### 2. Le Score qui Respire
Le trust score n'est pas une étoile figée. Il fluctue. Tu vois en quasi-temps réel combien de tokens sont stakés sur chaque outil et par qui.

### 3. La Peau dans le Jeu Visible
Le profil de chaque curateur est public. "Jean-Baptiste, expert TypeScript, 847 TRUST." Ce n'est pas un algorithme — c'est un humain qui a misé sa réputation.

### 4. Zéro Setup, Premier Run
Email → agent qui tourne. Aucune clé API à configurer, aucun repo à cloner, aucun prompt à écrire. Le wow dès la première utilisation.

---

## Questions Ouvertes

1. **Monétisation**: Quel modèle économique pour la plateforme?
   - Subscription pour accès premium?
   - Frais sur les transactions de staking?
   - Marketplace avec commissions?

2. **Hébergement**: Infrastructure pour héberger les agents?
   - Partenariats cloud?
   - Décentralisé (compute on-chain)?
   - Hybrid?

3. **LLM d'analyse**: Quel modèle pour l'analyse des besoins?
   - Modèle propriétaire fine-tuné?
   - Ensemble de modèles?
   - Pipeline multi-agents?

4. **Wow Effect**: Comment créer l'effet wow dès l'onboarding?
   - Démo interactive immédiate?
   - Résultats impressionnants sur cas d'usage populaires?
   - Vitesse d'exécution ultra-rapide?
   - Interface visuelle spectaculaire?

5. **Bootstrap du Registry**: Comment amorcer le Registry avant d'avoir des curateurs?
   - Phase de curation centralisée par l'équipe core?
   - Seed initial avec les packages les plus populaires?
   - Partenariats avec des experts pour la curation initiale?

6. **Relation avec Intuition/Sofia**: Wispr est-il un produit autonome qui utilise Intuition, ou la nouvelle face grand public de Sofia?
