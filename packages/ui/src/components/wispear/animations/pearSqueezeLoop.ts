import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export type PearSqueezeLoopVars = {
  /** Horizontal stretch at peak squeeze (default slightly > 1). */
  scaleX?: number;
  /** Vertical squash at peak (default < 1). */
  scaleY?: number;
  duration?: number;
  ease?: string;
  delay?: number;
  /** Pivot in SVG user units (pear body center in `.wispear-pear` space). */
  transformOrigin?: string;
};

const defaultOrigin = "50% 60%";

/**
 * Soft squash-and-stretch loop on the whole pear group (independent of leaf/body pop tweens).
 */
export function tweenPearSqueezeLoop(targets: WispearMarkTargets, vars?: PearSqueezeLoopVars) {
  const el = targets.pear;
  if (!el) return null;

  const origin = vars?.transformOrigin ?? defaultOrigin;
  gsap.set(el, { transformOrigin: origin });

  return gsap.to(el, {
    scaleX: vars?.scaleX ?? 1.08,
    scaleY: vars?.scaleY ?? 0.86,
    duration: vars?.duration ?? 2.1,
    yoyo: true,
    repeat: -1,
    ease: vars?.ease ?? "sine.inOut",
    delay: vars?.delay ?? 0,
  });
}
