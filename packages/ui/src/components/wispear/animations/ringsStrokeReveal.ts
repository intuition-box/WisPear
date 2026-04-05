import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export type RingsStrokeRevealVars = {
  duration?: number;
  stagger?: number;
  ease?: string;
};

const defaults = { duration: 1.05, stagger: 0.16, ease: "power2.out" };

/** Standalone tween: stroke draw on ring ellipses (requires DrawSVGPlugin). */
export function tweenRingsStrokeReveal(targets: WispearMarkTargets, vars?: RingsStrokeRevealVars) {
  const v = { ...defaults, ...vars };
  return gsap.to(targets.rings, {
    drawSVG: "0% 100%",
    duration: v.duration,
    stagger: v.stagger,
    ease: v.ease,
  });
}

/** Compose into a parent timeline. */
export function addRingsStrokeReveal(
  tl: gsap.core.Timeline,
  targets: WispearMarkTargets,
  position: gsap.Position = 0,
  vars?: RingsStrokeRevealVars,
): gsap.core.Timeline {
  const v = { ...defaults, ...vars };
  return tl.to(
    targets.rings,
    { drawSVG: "0% 100%", duration: v.duration, stagger: v.stagger, ease: v.ease },
    position,
  );
}
