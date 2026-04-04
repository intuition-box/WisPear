"use client";

import Image from "next/image";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-hero-from to-hero-to px-10 pt-12 pb-8 overflow-visible rounded-b-[32px] min-h-[260px]">
      <div className="relative z-10">
        <h1 className="text-4xl font-black leading-[1.1] text-text-primary max-w-[280px] mb-2.5">
          Discover your AI profile
        </h1>
        <p className="text-sm text-text-secondary max-w-[260px] mb-6">
          Swipe through a few questions to find out your role and AI maturity level.
        </p>
        <button
          onClick={onStart}
          className="bg-accent text-text-white font-semibold text-sm px-6 py-3 rounded-xl border-none shadow-card hover:shadow-md transition-shadow"
        >
          Get started
        </button>
      </div>
      <Image
        src="/character.png"
        alt="Wispr character"
        width={320}
        height={320}
        className="absolute right-[-10px] bottom-0 w-[320px] h-auto object-contain mix-blend-screen -translate-y-[20%] z-[2] pointer-events-none"
        priority
      />
    </div>
  );
}
