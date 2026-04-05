import type { GlowOpacityPair, WispearAnimationTheme } from "./types";

export function wispearGlowOpacity(theme: WispearAnimationTheme): GlowOpacityPair {
  return theme === "dark" ? { low: 0.4, high: 0.58 } : { low: 0.25, high: 0.4 };
}
