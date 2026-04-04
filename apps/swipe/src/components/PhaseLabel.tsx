"use client";

import type { SwipePhase } from "@/types/swipe";

interface PhaseLabelProps {
  phase: SwipePhase;
}

const PHASE_LABELS: Record<Exclude<SwipePhase, "result">, string> = {
  role: "Step 1/2 — Role Detection",
  maturity: "Step 2/2 — AI Maturity",
};

export function PhaseLabel({ phase }: PhaseLabelProps) {
  if (phase === "result") return null;

  return (
    <span className="text-[13px] text-text-muted">
      {PHASE_LABELS[phase]}
    </span>
  );
}
