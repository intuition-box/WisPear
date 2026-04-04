import deployed from "../../../../packages/ontology/src/seed/deployed.json";

const atomIds = deployed.atoms as Record<string, string>;

export function getTermId(slug: string): string | null {
  return atomIds[slug] ?? null;
}
