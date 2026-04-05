import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { MousePointerClick, Sparkles, Share2, Globe, FileCode2, Palette, Server, PenTool, ClipboardList, Rocket, Sprout, Wrench, Zap, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: MousePointerClick,
    title: "Swipe",
    description: "Swipe through adaptive questions about how you build and use AI.",
  },
  {
    icon: Sparkles,
    title: "Discover",
    description: "Instantly reveal your builder role and AI maturity level.",
  },
  {
    icon: Share2,
    title: "Publish",
    description: "Mint your profile on-chain and let your reputation speak for you.",
  },
];

const ROLES: { icon: LucideIcon; label: string }[] = [
  { icon: Globe, label: "Full Stack Web3" },
  { icon: FileCode2, label: "Smart Contract" },
  { icon: Palette, label: "Frontend" },
  { icon: Server, label: "Backend" },
  { icon: PenTool, label: "Designer" },
  { icon: ClipboardList, label: "Product Manager" },
  { icon: Rocket, label: "Founder" },
];

const AI_LEVELS: { icon: LucideIcon; label: string }[] = [
  { icon: Sprout, label: "Beginner" },
  { icon: Wrench, label: "Intermediate" },
  { icon: Zap, label: "Advanced" },
  { icon: Brain, label: "Expert" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Hero onStart={() => navigate("/swipe")} />

      {/* How it works */}
      <section className="px-7 pt-8 pb-10 max-w-[480px] mx-auto w-full">
        <h2 className="font-display text-[22px] text-ink mb-7 font-bold">How it works</h2>
        <div className="flex flex-col gap-4 stagger">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="animate-fade-up flex items-start gap-4 bg-card rounded-2xl p-4 shadow-xs border border-line"
            >
              <span className="w-10 h-10 rounded-xl bg-bg-raised flex items-center justify-center shrink-0">
                <step.icon className="w-5 h-5 text-pear" />
              </span>
              <div className="pt-0.5">
                <h3 className="text-[14px] font-bold text-ink mb-0.5">
                  {step.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.5]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="px-7 pb-8 max-w-[480px] mx-auto w-full">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-[22px] text-ink font-bold">7 roles</h2>
          <span className="text-[12px] text-ink-muted">Which one are you?</span>
        </div>
        <div className="flex flex-wrap gap-2 stagger">
          {ROLES.map((role) => (
            <span
              key={role.label}
              className="animate-fade-up flex items-center gap-1.5 bg-card border border-line rounded-full px-3.5 py-2 text-[13px] font-medium text-ink shadow-xs hover:shadow-sm hover:border-pear/20 hover:-translate-y-px transition-all duration-200 cursor-default"
            >
              <role.icon className="w-4 h-4 text-ink-secondary" />
              {role.label}
            </span>
          ))}
        </div>
      </section>

      {/* AI Levels */}
      <section className="px-7 pb-10 max-w-[480px] mx-auto w-full">
        <h2 className="font-display text-[22px] text-ink mb-4 font-bold">4 AI levels</h2>
        <div className="flex gap-2">
          {AI_LEVELS.map((level) => (
            <div
              key={level.label}
              className="flex-1 bg-card border border-line rounded-xl p-3 text-center shadow-xs"
            >
              <div className="flex justify-center mb-1">
                <level.icon className="w-5 h-5 text-accent" />
              </div>
              <span className="text-[11px] font-semibold text-ink-secondary">{level.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 px-7 py-5 max-w-[480px] mx-auto w-full">
        <div className="glass rounded-2xl p-4 border border-line shadow-lg">
          <button
            onClick={() => navigate("/swipe")}
            className="w-full bg-pear hover:bg-pear-hover text-ink-inverse font-semibold text-[15px] py-4 rounded-xl transition-all duration-300 shadow-glow hover:shadow-lg active:scale-[0.98]"
          >
            Start the quiz →
          </button>
          <p className="text-[11px] text-ink-muted text-center mt-2.5 tracking-wide">
            No account needed · Takes 60 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
