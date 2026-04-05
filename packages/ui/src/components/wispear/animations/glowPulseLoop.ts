import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export type GlowPulseLoopVars = {
  duration?: number;
  ease?: string;
};

/** Infinite yoyo between current opacity and `peakOpacity` (independent loop). */
export function tweenGlowPulseLoop(
  targets: WispearMarkTargets,
  peakOpacity: number,
  vars?: GlowPulseLoopVars,
) {
  return gsap.to(targets.glowFill, {
    opacity: peakOpacity,
    duration: vars?.duration ?? 1.5,
    yoyo: true,
    repeat: -1,
    ease: vars?.ease ?? "sine.inOut",
  });
}
