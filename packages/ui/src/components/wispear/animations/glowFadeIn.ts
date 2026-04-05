import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export type GlowFadeInVars = { duration?: number; ease?: string };

/** Fade the base glow ellipse to a target opacity. */
export function tweenGlowFadeIn(
  targets: WispearMarkTargets,
  opacity: number,
  vars?: GlowFadeInVars,
) {
  return gsap.to(targets.glowFill, {
    opacity,
    duration: vars?.duration ?? 0.5,
    ease: vars?.ease ?? "power2.out",
  });
}

export function addGlowFadeIn(
  tl: gsap.core.Timeline,
  targets: WispearMarkTargets,
  opacity: number,
  position: gsap.Position,
  vars?: GlowFadeInVars,
): gsap.core.Timeline {
  return tl.to(
    targets.glowFill,
    {
      opacity,
      duration: vars?.duration ?? 0.5,
      ease: vars?.ease ?? "power2.out",
    },
    position,
  );
}
