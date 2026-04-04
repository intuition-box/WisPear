"use client";

import { useRouter } from "next/navigation";
import { Hero } from "@/components/Hero";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-bg-app">
      <Hero onStart={() => router.push("/swipe")} />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-[300px]">
          <p className="text-sm text-text-secondary leading-relaxed">
            Answer up to 8 quick questions — no account needed.
            We&apos;ll determine your role and AI maturity level, then you can publish your profile on-chain.
          </p>
        </div>
      </div>
    </div>
  );
}
