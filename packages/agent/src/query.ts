import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { searchAtoms, searchLists, type Atom } from "./intuition/tools.js";
import type { SemanticClaims } from "./types/semantic-claims.js";
import type { RankedComponent } from "./types/ranked-component.js";
import type { Component, ComponentType } from "@wispr/ontology";

// Sequential calls — Intuition MCP server rejects concurrent connections
export async function query(client: Client, claims: SemanticClaims): Promise<RankedComponent[]> {
  const atoms = await searchAtoms(client, buildSearchTerms(claims));

  const listQueries = buildListQueries(claims);
  const listResults: Atom[] = [];
  for (const q of listQueries) {
    const results = await searchLists(client, q);
    listResults.push(...results);
  }

  const deduplicated = dedup([...atoms, ...listResults]);
  return deduplicated.map((atom, index) => atomToRankedComponent(atom, index, deduplicated.length));
}

function buildSearchTerms(claims: SemanticClaims): string[] {
  return [...claims.frameworks, ...claims.features, ...claims.domains, claims.raw].filter(Boolean);
}

function buildListQueries(claims: SemanticClaims): string[] {
  const queries: string[] = [];
  if (claims.frameworks.length > 0) queries.push(`${claims.frameworks.join(" ")} tools`);
  if (claims.features.length > 0) queries.push(`${claims.features.join(" ")} mcp servers`);
  if (queries.length === 0) queries.push(claims.raw);
  return queries;
}

function dedup(atoms: Atom[]): Atom[] {
  const seen = new Set<string>();
  return atoms.filter((a) => {
    if (seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  });
}

function atomToRankedComponent(atom: Atom, index: number, total: number): RankedComponent {
  const trustScore = total > 1 ? 1 - index / (total - 1) : 1;

  const component: Component = {
    id: atom.id,
    name: atom.label,
    type: inferType(atom.label, atom.description),
    description: atom.description ?? "",
    capabilities: [],
    domains: [],
    inputs: [],
    outputs: [],
    permissions: [],
    cost: { type: "free" },
    risk: { auditStatus: "unknown", autonomyLevel: "low" },
    compatibility: { compatibleWith: [], incompatibleWith: [] },
  };

  return {
    component,
    trustScore: Math.round(trustScore * 100) / 100,
    curatorCount: 0,
    reasoning: atom.description ?? `Matched from Intuition knowledge graph`,
  };
}

function inferType(label: string, description?: string): ComponentType {
  const text = `${label} ${description ?? ""}`.toLowerCase();
  if (text.includes("mcp")) return "mcp";
  if (text.includes("api")) return "api";
  if (text.includes("llm") || text.includes("model")) return "llm";
  if (text.includes("agent")) return "agent";
  if (text.includes("skill")) return "skill";
  return "package";
}
