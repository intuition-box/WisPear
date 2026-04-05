import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export type PearPopRevealVars = {
  leafDuration?: number;
  bodyDuration?: number;
  leafStagger?: number;
  leafEase?: string;
  bodyEase?: string;
};

/** Staggered leaf pop + body scale-in (independent of rings). */
export function addPearPopReveal(
  tl: gsap.core.Timeline,
  targets: WispearMarkTargets,
  atLeaves: gsap.Position,
  atBody: gsap.Position,
  vars?: PearPopRevealVars,
): gsap.core.Timeline {
  const leafDuration = vars?.leafDuration ?? 0.5;
  const bodyDuration = vars?.bodyDuration ?? 0.6;
  const leafStagger = vars?.leafStagger ?? 0.1;
  const leafEase = vars?.leafEase ?? "back.out(1.35)";
  const bodyEase = vars?.bodyEase ?? "back.out(1.15)";

  tl.to(
    targets.leaves,
    { opacity: 1, scale: 1, duration: leafDuration, stagger: leafStagger, ease: leafEase },
    atLeaves,
  ).to(targets.body, { opacity: 1, scale: 1, duration: bodyDuration, ease: bodyEase }, atBody);

  return tl;
}

/** Run outside a shared timeline (sequential-ish via timeline). */
export function tweenPearPopReveal(targets: WispearMarkTargets, vars?: PearPopRevealVars) {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  return addPearPopReveal(tl, targets, 0, 0.13, vars);
}
