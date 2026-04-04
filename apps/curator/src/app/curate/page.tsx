"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const MOCK_ATOM = {
  id: "chainlink-data-feeds",
  name: "Chainlink Data Feeds",
  type: "api" as const,
  url: "https://docs.chain.link/data-feeds",
  description: "Real-time on-chain price oracles for crypto assets. Provides tamper-proof, decentralized price data for DeFi protocols.",
  autonomy: "high" as const,
};

const TYPES = [
  { value: "mcp", icon: "🔌", label: "MCP" },
  { value: "skill", icon: "🧠", label: "Skill" },
  { value: "package", icon: "📦", label: "Package" },
  { value: "api", icon: "⚡", label: "API" },
  { value: "model", icon: "🤖", label: "Model" },
  { value: "agent", icon: "🛠️", label: "Agent" },
];

const AUTONOMY = [
  { value: "low", label: "Low", description: "Needs human approval" },
  { value: "medium", label: "Medium", description: "Semi-autonomous" },
  { value: "high", label: "High", description: "Fully autonomous" },
];

export default function CuratePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [type, setType] = useState(MOCK_ATOM.type);
  const [autonomy, setAutonomy] = useState(MOCK_ATOM.autonomy);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      router.push(`/curate/${MOCK_ATOM.id}`);
    }, 800);
  };

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-bg/65 backdrop-blur-xl border-b border-border px-5 py-3">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Curate</h1>
        <p className="text-sm text-text-secondary mt-1">
          Add a new component to the knowledge graph
        </p>
      </div>

      <div className="max-w-[560px] mx-auto w-full px-5 py-8 flex flex-col gap-7">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-primary">Name</label>
          <input
            type="text"
            defaultValue={MOCK_ATOM.name}
            readOnly
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary text-[15px] outline-none"
          />
        </div>

        {/* Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-primary">Type</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                  type === t.value
                    ? "bg-pear text-bg border border-pear shadow-[0_0_16px_rgba(212,255,71,0.2)]"
                    : "bg-surface border border-border text-text-secondary hover:border-border-light hover:text-text-primary"
                }`}
              >
                <span className="text-base">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* URL */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-primary">URL</label>
          <input
            type="url"
            defaultValue={MOCK_ATOM.url}
            readOnly
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-accent text-[15px] outline-none"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-primary">Description</label>
          <textarea
            defaultValue={MOCK_ATOM.description}
            readOnly
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary text-[15px] outline-none resize-none"
          />
        </div>

        {/* Autonomy Level */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-primary">Autonomy level</label>
          <div className="flex gap-2">
            {AUTONOMY.map((a) => (
              <button
                key={a.value}
                onClick={() => setAutonomy(a.value)}
                className={`flex-1 flex flex-col items-center gap-1 px-3 py-3.5 rounded-xl text-center transition-all duration-200 hover:scale-[1.03] active:scale-95 ${
                  autonomy === a.value
                    ? "bg-accent text-white border border-accent shadow-[0_0_16px_rgba(25,144,255,0.25)]"
                    : "bg-surface border border-border text-text-secondary hover:border-border-light"
                }`}
              >
                <span className={`text-[13px] font-bold ${autonomy === a.value ? "text-white" : "text-text-primary"}`}>
                  {a.label}
                </span>
                <span className={`text-[11px] ${autonomy === a.value ? "text-white/70" : "text-text-muted"}`}>
                  {a.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full py-4 rounded-xl text-[15px] font-bold transition-all duration-300 ${
            saving
              ? "bg-pear/40 text-bg/70 cursor-wait"
              : "bg-pear text-bg shadow-[0_0_24px_rgba(212,255,71,0.2)] hover:shadow-[0_0_32px_rgba(212,255,71,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          }`}
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-bg/40 border-t-bg rounded-full animate-spin" />
              Saving on-chain...
            </span>
          ) : (
            "Save atom"
          )}
        </button>
      </div>
    </>
  );
}
