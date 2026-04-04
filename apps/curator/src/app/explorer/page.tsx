"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@wispr/ui";

// ─── Community Sets (existing) ────────────────────────────────────────────────

// All community sets — all components deployed on-chain (Intuition L3)
const COMMUNITY_SETS = [
  { id: "cs-w2", initials: "W2", name: "GitHub PR Auto-Review", role: "Full Stack Web3", level: "Advanced", trust: "1.8k", preview: ["MCP GitHub", "code-review-skill", "Claude Sonnet 4.5"], locked: 1 },
  { id: "cs-w3", initials: "W3", name: "Daily Job Matcher", role: "Backend Dev", level: "Intermediate", trust: "890", preview: ["Firecrawl MCP", "embeddings-matching-skill", "MCP Gmail"], locked: 2 },
  { id: "cs-w4", initials: "W4", name: "Notion → Twitter Pipeline", role: "Content Creator", level: "Intermediate", trust: "1.1k", preview: ["MCP Notion", "brand-voice-skill", "MCP Twitter"], locked: 2 },
  { id: "cs-p2", initials: "P2", name: "ETH Prediction Market", role: "Smart Contract Dev", level: "Expert", trust: "2.4k", preview: ["World ID MiniKit", "Chainlink Functions", "Flare FTSO"], locked: 2 },
  { id: "cs-pa", initials: "PA", name: "Freelancer Autopay USDC", role: "Full Stack Web3", level: "Advanced", trust: "1.5k", preview: ["Walrus Storage", "Circle USDC SDK", "ENS"], locked: 2 },
  { id: "cs-p3", initials: "P3", name: "DeFi Portfolio Rebalancer", role: "DeFi Expert", level: "Expert", trust: "2.1k", preview: ["Chainlink Data Feeds", "1inch Fusion+ SDK", "Privy Embedded Wallet"], locked: 1 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConversationSummary {
  id: string;
  sessionId: string;
  createdAt: number;
  messageCount: number;
  preview: string;
  goodCount: number;
  badCount: number;
}

interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  model: string | null;
  tokensInput: number | null;
  tokensOutput: number | null;
  latencyMs: number | null;
  createdAt: number;
}

interface CurationSignal {
  id: string;
  conversationId: string;
  curatorAddress: string | null;
  verdict: "good" | "bad";
  comment: string | null;
  createdAt: number;
}

// ─── Chat Modal ───────────────────────────────────────────────────────────────

function ChatModal({
  conversationId,
  onClose,
}: {
  conversationId: string;
  onClose: () => void;
}) {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [curations, setCurations] = useState<CurationSignal[]>([]);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<"good" | "bad" | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/conversations/${conversationId}`)
      .then((r) => r.json())
      .then((data) => {
        setMsgs(data.messages ?? []);
        setCurations(data.curations ?? []);
        const mine = (data.curations ?? []).find(() => true); // first as proxy
        if (mine) setSubmitted(mine.verdict);
      });
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  async function attest(verdict: "good" | "bad") {
    setSubmitting(true);
    await fetch(`/api/conversations/${conversationId}/curate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verdict, comment: comment.trim() || null }),
    });
    setSubmitted(verdict);
    setSubmitting(false);
    setComment("");
    // Refresh curation counts
    const data = await fetch(`/api/conversations/${conversationId}`).then((r) => r.json());
    setCurations(data.curations ?? []);
  }

  const goodCount = curations.filter((c) => c.verdict === "good").length;
  const badCount = curations.filter((c) => c.verdict === "bad").length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(6,7,15,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="flex flex-col w-full max-w-2xl rounded-2xl border border-border overflow-hidden"
        style={{ background: "var(--color-surface)", maxHeight: "85vh" }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <span className="text-sm font-bold text-text-primary">Conversation</span>
            <span className="ml-2 text-xs text-text-muted font-mono">{conversationId.slice(0, 8)}…</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-green flex items-center gap-1">
              <span style={{ color: "var(--color-green)" }}>▲</span> {goodCount}
            </span>
            <span className="text-xs text-red flex items-center gap-1">
              <span style={{ color: "var(--color-red)" }}>▼</span> {badCount}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-hover transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {msgs.length === 0 && (
            <p className="text-sm text-text-muted text-center py-8">No messages in this conversation.</p>
          )}
          {msgs.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "text-text-primary"
                    : "border border-border text-text-primary"
                }`}
                style={
                  msg.role === "user"
                    ? { background: "var(--color-accent)", color: "#fff" }
                    : { background: "var(--color-surface-2)" }
                }
              >
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                {msg.role === "assistant" && msg.latencyMs && (
                  <p className="text-xs mt-2 opacity-50">{(msg.latencyMs / 1000).toFixed(1)}s · {msg.model ?? "AI"}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Attestation panel */}
        <div className="shrink-0 border-t border-border px-5 py-4" style={{ background: "var(--color-bg)" }}>
          {submitted ? (
            <div
              className="flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold"
              style={
                submitted === "good"
                  ? { background: "var(--color-green-soft)", color: "var(--color-green)" }
                  : { background: "var(--color-red-soft)", color: "var(--color-red)" }
              }
            >
              {submitted === "good" ? "✓ You attested this response as good" : "✗ You flagged this response as bad"}
            </div>
          ) : (
            <>
              <p className="text-xs text-text-muted mb-3">Was the agent's response useful and accurate?</p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Optional comment…"
                rows={2}
                className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text-primary placeholder:text-text-muted resize-none mb-3 focus:outline-none focus:border-accent/50 transition-colors"
              />
              <div className="flex gap-2">
                <button
                  disabled={submitting}
                  onClick={() => attest("good")}
                  className="flex-1 py-2 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  style={{ background: "var(--color-green-soft)", color: "var(--color-green)", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  👍 Good response
                </button>
                <button
                  disabled={submitting}
                  onClick={() => attest("bad")}
                  className="flex-1 py-2 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  style={{ background: "var(--color-red-soft)", color: "var(--color-red)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                  👎 Bad response
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Curation View ────────────────────────────────────────────────────────────

function CurationView() {
  const [convos, setConvos] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/conversations")
      .then((r) => r.json())
      .then((data) => { setConvos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function handleClose() {
    setOpenId(null);
    // Refresh list to update counts
    fetch("/api/conversations")
      .then((r) => r.json())
      .then(setConvos);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-sm text-text-muted animate-pulse">Loading conversations…</div>
      </div>
    );
  }

  if (convos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="text-4xl opacity-30">💬</div>
        <p className="text-sm text-text-muted">No conversations yet.</p>
        <p className="text-xs text-text-muted opacity-60">Exchanges from the Wispr chat will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
        {convos.map((convo) => {
          const date = new Date(convo.createdAt * 1000);
          const timeAgo = formatTimeAgo(convo.createdAt);
          const hasCuration = convo.goodCount + convo.badCount > 0;

          return (
            <div
              key={convo.id}
              onClick={() => setOpenId(convo.id)}
              className="bg-bg p-5 flex flex-col gap-3 cursor-pointer group rounded-xl border border-border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-accent/30"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pear/15 to-accent/15 border border-pear/20 flex items-center justify-center text-xs font-bold shrink-0 group-hover:scale-110 transition-all duration-300" style={{ color: "var(--color-pear)" }}>
                    💬
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-text-muted truncate">{convo.id.slice(0, 12)}…</div>
                    <div className="text-xs text-text-muted mt-0.5">{timeAgo} · {convo.messageCount} msg{convo.messageCount !== 1 ? "s" : ""}</div>
                  </div>
                </div>
                {hasCuration ? (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {convo.goodCount > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "var(--color-green-soft)", color: "var(--color-green)" }}>
                        👍 {convo.goodCount}
                      </span>
                    )}
                    {convo.badCount > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "var(--color-red-soft)", color: "var(--color-red)" }}>
                        👎 {convo.badCount}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-full shrink-0" style={{ background: "var(--color-amber-soft)", color: "var(--color-amber)" }}>
                    Pending
                  </span>
                )}
              </div>

              {/* Preview */}
              <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                {convo.preview || <span className="italic text-text-muted">No content</span>}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <span className="text-xs text-text-muted">{date.toLocaleDateString()}</span>
                <span className="text-xs text-accent group-hover:translate-x-0.5 transition-transform duration-200">
                  Review →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {openId && <ChatModal conversationId={openId} onClose={handleClose} />}
    </>
  );
}

function formatTimeAgo(unixSec: number): string {
  const diff = Math.floor(Date.now() / 1000) - unixSec;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Explorer Page ────────────────────────────────────────────────────────────

type Tab = "community" | "curation";

export default function ExplorerPage() {
  const [tab, setTab] = useState<Tab>("community");
  const [stakedIds, setStagedIds] = useState<Set<string>>(new Set());

  const toggleStake = (id: string) => {
    setStagedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-bg/65 backdrop-blur-xl border-b border-border px-5 py-3">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Explorer</h1>
        <p className="text-sm text-text-primary mt-1">
          {tab === "community" ? "Community bundles curated by experts" : "Review agent exchanges and attest quality"}
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mt-3">
          {(["community", "curation"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={
                tab === t
                  ? { background: "var(--color-accent)", color: "#fff" }
                  : { background: "transparent", color: "var(--color-text-secondary)" }
              }
            >
              {t === "community" ? "Community" : "Curation"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {tab === "community" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {COMMUNITY_SETS.map((set) => {
            const isStaked = stakedIds.has(set.id);

            return (
              <div
                key={set.id}
                className="bg-bg p-5 flex flex-col gap-3 cursor-pointer group rounded-xl border border-border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-accent/30"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent/15 to-purple/15 border border-accent/20 flex items-center justify-center text-sm font-bold text-accent shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(74,155,244,0.25)] transition-all duration-300">
                    {set.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-bold text-text-primary truncate">
                      {set.name}
                    </div>
                    <div className="text-xs text-text-secondary mt-0.5">
                      {set.role} · {set.level}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-amber flex items-center gap-1 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="group-hover:animate-[spin_0.6s_ease-in-out_1]">★</span> {set.trust}
                  </div>
                </div>

                {/* Preview chips */}
                <div className="flex flex-wrap gap-1.5">
                  {set.preview.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-text-secondary transition-all duration-200 group-hover:border-accent/20 group-hover:bg-accent/5 hover:!bg-accent/15 hover:!border-accent/40 hover:!text-text-primary hover:scale-105 hover:shadow-[0_0_10px_rgba(74,155,244,0.15)] cursor-pointer active:scale-95"
                    >
                      {tool}
                    </span>
                  ))}
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-text-muted opacity-50">
                    +{set.locked} locked
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <span className="text-xs text-text-muted">
                    Stake to unlock full bundle
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); toggleStake(set.id); }}
                    className="transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                    style={{
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      ...(isStaked
                        ? { borderColor: "rgba(34, 197, 94, 0.4)", color: "var(--color-green)", background: "rgba(34, 197, 94, 0.1)", boxShadow: "0 0 8px rgba(34, 197, 94, 0.15)" }
                        : { borderColor: "rgba(255, 204, 111, 0.4)", color: "var(--color-amber)", background: "rgba(255, 204, 111, 0.08)", boxShadow: "0 0 8px rgba(255, 204, 111, 0.1)" }
                      ),
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = isStaked
                        ? "0 0 20px rgba(34, 197, 94, 0.35)"
                        : "0 0 20px rgba(255, 204, 111, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = isStaked
                        ? "0 0 8px rgba(34, 197, 94, 0.15)"
                        : "0 0 8px rgba(255, 204, 111, 0.1)";
                    }}
                  >
                    {isStaked ? "Staked ✓" : "Stake $TRUST"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <CurationView />
      )}
    </>
  );
}
