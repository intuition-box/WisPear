// Wispr Agent — core pipeline
//
// 1. extract(intent: string) → SemanticClaims
//    Parse user intent into structured semantic claims
//    (framework, features, constraints, domain context)
//
// 2. query(claims: SemanticClaims, profile: Profile) → RankedComponents[]
//    Query Intuition knowledge graph filtered by profile + reputation threshold
//    Delegated to Intuition's MCP; TVL is the ranking signal
//
// 3. compose(components: RankedComponents[]) → Blueprint
//    Assemble executable blueprint: which tools, in what order, why,
//    with cost and risk for each component

export type { SemanticClaims } from "./types/semantic-claims.js";
export type { Blueprint } from "./types/blueprint.js";
export type { RankedComponent } from "./types/ranked-component.js";
