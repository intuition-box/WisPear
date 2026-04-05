/**
 * Wispear logo — portable GSAP building blocks.
 *
 * ============================================================================
 * 🚀 HOW TO USE IN ANOTHER PROJECT (REACT + TYPESCRIPT)
 * ============================================================================
 * 
 * 1. Copy the entire `src/components/wispear/` folder to your project.
 * 2. Install GSAP: `npm install gsap`
 * 3. Import and use the `WispearLogoAnimated` component anywhere in your app:
 * 
 * ```tsx
 * import { WispearLogoAnimated } from "./components/wispear/WispearLogoAnimated";
 * 
 * export function Header() {
 *   return (
 *     <WispearLogoAnimated 
 *       mode="ambient" // Try: "full", "radar-pulse", "scroll-reveal", "draggable", "mouse-follow"
 *       theme="dark"   // "dark" or "light"
 *       width={120}    // SVG width
 *       height={132}   // SVG height
 *     />
 *   );
 * }
 * ```
 * 
 * 💡 Note: The pear is ALWAYS clickable in every mode to trigger the "Juice" effect!
 * ============================================================================
 */

export { applyWispearMode, type ApplyWispearModeInput } from "./applyWispearMode";
export { collectWispearTargets } from "./collectTargets";
export { addGlowFadeIn, tweenGlowFadeIn } from "./glowFadeIn";
export { tweenGlowPulseLoop } from "./glowPulseLoop";
export { WISPEAR_ANIMATION_MODES, type WispearAnimationMode } from "./modes";
export { addPearPopReveal, tweenPearPopReveal } from "./pearPopReveal";
export { tweenPearJuiceSqueeze, tweenPearJuicePress, tweenPearJuiceRelease } from "./pearJuiceSqueeze";
export { tweenPearSqueezeLoop } from "./pearSqueezeLoop";
export { setupInteractiveJuiceClick } from "./interactiveJuice";
export { registerWispearGsapPlugins } from "./registerPlugins";
export { addRingsStrokeReveal, tweenRingsStrokeReveal } from "./ringsStrokeReveal";
export { WISPEAR_SELECTORS } from "./selectors";
export {
  setPearVisibleInstant,
  setRingsDrawnInstant,
  setWispearAmbientBase,
  setWispearIntroReset,
  setWispearRingsModeBase,
} from "./states";
export { startTracerOrbit } from "./tracerOrbit";
export { startRadarPulse } from "./radarPulse";
export { startScrollReveal } from "./scrollReveal";
export { startDraggablePear } from "./draggablePear";
export { startMouseFollow } from "./mouseFollow";
export { wispearGlowOpacity } from "./theme";
export { useWispearAnimator, type UseWispearAnimatorProps } from "./useWispearAnimator";
export type { GlowOpacityPair, WispearAnimationTheme, WispearMarkTargets } from "./types";
