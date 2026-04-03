// Intuition Protocol data model — nested triples

export type TripleType =
  | "classification"   // T1: (tool_atom, is-a, "mcp-server")
  | "stake"            // T2: (curator, attests, tool_atom) + $TRUST deposit
  | "contextual"       // T2b: (T2, in-context, use_case_atom)
  | "meta-reputation"  // T3: (curator2, agree-with, T2)
  | "dispute"          // T4: (curator2, disputes, T2)
  | "usage"            // T5: (user, built-with, stack_atom)
  | "composition";     // T6: (stack_atom, includes, tool_atom)

export interface Triple {
  id: string;
  type: TripleType;
  subject: string;   // atom ID
  predicate: string; // relation
  object: string;    // atom ID or value
  createdAt: number; // unix timestamp
  chainId?: number;
}
