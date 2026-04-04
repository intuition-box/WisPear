import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { extractTriples, type Triple } from "./intuition/tools.js";
import type { SemanticClaims } from "./types/semantic-claims.js";

export async function extract(client: Client, intent: string): Promise<SemanticClaims> {
  const triples = await extractTriples(client, intent);

  return {
    frameworks: collectObjects(triples, "uses-framework"),
    features: collectObjects(triples, "requires-feature"),
    constraints: collectObjects(triples, "has-constraint"),
    domains: collectObjects(triples, "targets-domain"),
    raw: intent,
  };
}

function collectObjects(triples: Triple[], predicate: string): string[] {
  return triples
    .filter((t) => t.predicate === predicate)
    .map((t) => t.object);
}
