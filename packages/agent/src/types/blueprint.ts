import type { RankedComponent } from "./ranked-component.js";

export interface Blueprint {
  id: string;
  intent: string;
  components: RankedComponent[];
  systemPrompt: string;
  mcpConfig: MCPConfig;
  packages: PackageInstall[];
  llms: LLMRecommendation[];
}

export interface MCPConfig {
  mcpServers: Record<string, { command: string; args: string[] }>;
}

export interface PackageInstall {
  manager: "npm" | "pnpm" | "yarn" | "pip" | "cargo";
  command: string;
}

export interface LLMRecommendation {
  model: string;
  provider: string;
  reasoning: string;
}
