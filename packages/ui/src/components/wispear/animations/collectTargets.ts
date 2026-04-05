import gsap from "gsap";
import { WISPEAR_SELECTORS } from "./selectors";
import type { WispearMarkTargets } from "./types";

/** Resolve animation targets under a Wispear logo root `<svg>`. */
export function collectWispearTargets(root: SVGSVGElement | HTMLElement): WispearMarkTargets {
  const q = gsap.utils.selector(root);
  const tracer = root.querySelector(WISPEAR_SELECTORS.tracer);
  const bodyPath = root.querySelector(WISPEAR_SELECTORS.body);
  const pear = root.querySelector(WISPEAR_SELECTORS.pear);

  return {
    rings: q(WISPEAR_SELECTORS.rings),
    glowFill: q(WISPEAR_SELECTORS.glowFill),
    leaves: q(WISPEAR_SELECTORS.leaves),
    body: q(WISPEAR_SELECTORS.body),
    tracer: tracer instanceof SVGCircleElement ? tracer : null,
    bodyPath: bodyPath instanceof SVGPathElement ? bodyPath : null,
    pear: pear instanceof SVGGElement ? pear : null,
    juiceDrops: q(WISPEAR_SELECTORS.juiceDrops),
    splash: q(WISPEAR_SELECTORS.splash),
  };
}
