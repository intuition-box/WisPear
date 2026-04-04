import type { Client } from "@modelcontextprotocol/sdk/client/index.js";

export interface Triple {
  subject: string;
  predicate: string;
  object: string;
}

export interface Atom {
  id: string;
  label: string;
  description?: string;
  url?: string;
}

function parseContent(content: unknown): unknown[] {
  if (!Array.isArray(content)) return [];
  return (content as { text?: string }[])
    .map((c) => {
      try {
        return c.text ? JSON.parse(c.text) : null;
      } catch {
        return null;
      }
    })
    .flat()
    .filter(Boolean);
}

export async function extractTriples(client: Client, input: string): Promise<Triple[]> {
  const result = await client.callTool({ name: "extract_triples", arguments: { input } });
  return parseContent(result.content) as Triple[];
}

export async function searchAtoms(client: Client, queries: string[]): Promise<Atom[]> {
  const result = await client.callTool({ name: "search_atoms", arguments: { queries } });
  return parseContent(result.content) as Atom[];
}

export async function searchLists(client: Client, query: string): Promise<Atom[]> {
  const result = await client.callTool({ name: "search_lists", arguments: { query } });
  return parseContent(result.content) as Atom[];
}
