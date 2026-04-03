// Normalized registry — every component follows this strict schema

export type ComponentType =
  | "agent"
  | "skill"
  | "mcp"
  | "api"
  | "package"
  | "llm";

export interface Component {
  id: string;
  name: string;
  type: ComponentType;
  description: string;

  // What it accomplishes (e.g. "oauth-sessions", "orm-querying", "edge-deployment")
  capabilities: string[];

  // Usage contexts (e.g. "nextjs-app-router", "python-fastapi", "react-native")
  domains: string[];

  inputs: string[];
  outputs: string[];

  // Auth model, required access
  permissions: string[];

  cost: ComponentCost;
  risk: ComponentRisk;

  // Works with / incompatible with (component IDs)
  compatibility: {
    compatibleWith: string[];
    incompatibleWith: string[];
  };
}

export interface ComponentCost {
  type: "free" | "paid" | "gas";
  details?: string;
  integrationTime?: string;
}

export interface ComponentRisk {
  auditStatus: "audited" | "unaudited" | "unknown";
  uptime?: string;
  autonomyLevel: "low" | "medium" | "high";
}
