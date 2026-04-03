// Curator profile — declared on-chain during explicit opt-in

export interface CuratorProfile {
  address: string;
  ens?: string;
  github?: string;
  farcaster?: string;

  // Declared expertise domains (e.g. "DeFi", "RAG", "TypeScript")
  expertiseDomains: ExpertiseDomain[];

  // Tools actively used in production
  productionTools: string[]; // component IDs

  createdAt: number;
}

export interface ExpertiseDomain {
  name: string;
  selfAssessedLevel: "builder" | "expert" | "researcher";
  score?: number; // computed: domain_expertise(curator, category)
}
