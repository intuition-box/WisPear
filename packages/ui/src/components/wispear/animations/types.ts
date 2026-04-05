export type WispearAnimationTheme = "dark" | "light";

/** Resolved DOM handles for the Wispear SVG mark (see `selectors.ts`). */
export type WispearMarkTargets = {
  rings: Element[];
  glowFill: Element[];
  leaves: Element[];
  body: Element[];
  tracer: SVGCircleElement | null;
  bodyPath: SVGPathElement | null;
  pear: SVGGElement | null;
  juiceDrops: Element[];
  splash: Element[];
};

export type GlowOpacityPair = { low: number; high: number };
