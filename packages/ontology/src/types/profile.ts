// User profile — output of /swipe onboarding

export type Role =
  | "full-stack-web3"
  | "smart-contract-dev"
  | "frontend-dev"
  | "backend-dev"
  | "designer"
  | "product-manager"
  | "founder";

export type AILevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Profile {
  role: Role;
  level: AILevel;
  walletAddress?: string;
}
