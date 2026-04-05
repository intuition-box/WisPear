import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

const pearOrigin = "150px 155px";

/** Initial frame for intro: hidden pear, undrawn rings, tracer off. */
export function setWispearIntroReset(targets: WispearMarkTargets): void {
  gsap.set(targets.rings, { drawSVG: "0% 0%" });
  gsap.set([...targets.leaves, ...targets.body], {
    opacity: 0,
    transformOrigin: "50% 55%",
    scale: 0.9,
  });
  gsap.set(targets.glowFill, { opacity: 0 });
  if (targets.tracer) gsap.set(targets.tracer, { opacity: 0 });
  if (targets.pear) gsap.set(targets.pear, { scaleX: 1, scaleY: 1, transformOrigin: pearOrigin });
}

/** Rings fully drawn, pear visible, glow at resting opacity. */
export function setWispearAmbientBase(targets: WispearMarkTargets, glowLow: number): void {
  gsap.set(targets.rings, { drawSVG: "0% 100%" });
  gsap.set([...targets.leaves, ...targets.body], { opacity: 1, scale: 1 });
  gsap.set(targets.glowFill, { opacity: glowLow });
  if (targets.tracer) gsap.set(targets.tracer, { opacity: 0 });
  if (targets.pear) gsap.set(targets.pear, { scaleX: 1, scaleY: 1, transformOrigin: pearOrigin });
}

/** Intro reset then pear visible (for rings-only mode). */
export function setWispearRingsModeBase(targets: WispearMarkTargets, glowLow: number): void {
  setWispearIntroReset(targets);
  gsap.set([...targets.leaves, ...targets.body], { opacity: 1, scale: 1 });
  gsap.set(targets.glowFill, { opacity: glowLow });
}

export function setPearVisibleInstant(targets: WispearMarkTargets): void {
  gsap.set([...targets.leaves, ...targets.body], { opacity: 1, scale: 1 });
}

export function setRingsDrawnInstant(targets: WispearMarkTargets): void {
  gsap.set(targets.rings, { drawSVG: "0% 100%" });
}
