"use client";

import type { Profile } from "@wispr/ontology";

interface ProfileCardProps {
  profile: Profile;
}

const ROLE_LABELS: Record<string, string> = {
  "full-stack-web3": "Full Stack Web3 Developer",
  "smart-contract-dev": "Smart Contract Developer",
  "frontend-dev": "Frontend Developer",
  "backend-dev": "Backend Developer",
  designer: "Designer",
  "product-manager": "Product Manager",
  founder: "Founder",
};

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

const ROLE_EMOJI: Record<string, string> = {
  "full-stack-web3": "🌐",
  "smart-contract-dev": "📜",
  "frontend-dev": "🎨",
  "backend-dev": "⚙️",
  designer: "✏️",
  "product-manager": "📋",
  founder: "🚀",
};

const LEVEL_COLORS: Record<string, string> = {
  beginner: "bg-green/10 text-green",
  intermediate: "bg-accent/10 text-accent",
  advanced: "bg-amber/20 text-amber",
  expert: "bg-red/10 text-red",
};

export function ProfileCard({ profile }: ProfileCardProps) {
  const roleLabel = ROLE_LABELS[profile.role] ?? profile.role;
  const levelLabel = LEVEL_LABELS[profile.level] ?? profile.level;
  const emoji = ROLE_EMOJI[profile.role] ?? "👤";
  const levelColor = LEVEL_COLORS[profile.level] ?? "bg-accent/10 text-accent";

  return (
    <div className="w-full max-w-[380px] mx-auto bg-bg-card rounded-xl border border-border shadow-card p-8 flex flex-col items-center gap-4">
      <span className="text-5xl">{emoji}</span>
      <h2 className="text-xl font-bold text-text-primary text-center">
        {roleLabel}
      </h2>
      <span
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${levelColor}`}
      >
        {levelLabel} in AI
      </span>
    </div>
  );
}
