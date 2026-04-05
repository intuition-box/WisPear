import gsap from "gsap";
import { addGlowFadeIn } from "./glowFadeIn";
import { tweenGlowPulseLoop } from "./glowPulseLoop";
import type { WispearAnimationMode } from "./modes";
import { addPearPopReveal } from "./pearPopReveal";
import { tweenPearSqueezeLoop } from "./pearSqueezeLoop";
import { addRingsStrokeReveal } from "./ringsStrokeReveal";
import { setWispearAmbientBase, setWispearIntroReset, setWispearRingsModeBase } from "./states";
import { startTracerOrbit } from "./tracerOrbit";
import { wispearGlowOpacity } from "./theme";
import type { WispearAnimationTheme, WispearMarkTargets } from "./types";
import { startRadarPulse } from "./radarPulse";
import { startScrollReveal } from "./scrollReveal";
import { startDraggablePear } from "./draggablePear";
import { startMouseFollow } from "./mouseFollow";
import { setupInteractiveJuiceClick } from "./interactiveJuice";

export type ApplyWispearModeInput = {
  root: Element;
  targets: WispearMarkTargets;
  mode: WispearAnimationMode;
  theme: WispearAnimationTheme;
  loopIntro?: boolean;
};

/**
 * Composes independent Wispear tweens for a given preset. Intended to run inside `gsap.context(() => { ... }, root)`.
 * Returns a cleanup function (or void) for event listeners.
 */
export function applyWispearMode(input: ApplyWispearModeInput): void | (() => void) {
  const { root, targets, mode, theme, loopIntro = false } = input;
  const { low: glowLow, high: glowHigh } = wispearGlowOpacity(theme);

  const cleanups: (() => void)[] = [];

  // ALWAYS make the pear clickable for the "juice squeeze" effect in every mode!
  // If the mode is "juice-hold", we use the hold-to-squeeze interaction instead of click
  // EXCEPTION: Do not add click/hold juice effect if in draggable mode, as it conflicts with Draggable
  if (mode !== "draggable") {
    const isHoldMode = mode === "juice-hold";
    cleanups.push(setupInteractiveJuiceClick(
      targets, 
      mode === "full" || mode === "ambient" || mode === "squeeze-loop",
      isHoldMode
    ));
  }

  const showTracer = mode === "full" || mode === "ambient";
  const runIntro = mode === "full" || mode === "intro-only" || mode === "rings";

  // Handle new advanced modes
  if (mode === "radar-pulse") {
    startRadarPulse(targets);
    return () => cleanups.forEach(c => c());
  }
  if (mode === "scroll-reveal") {
    startScrollReveal(root, targets);
    return () => cleanups.forEach(c => c());
  }
  if (mode === "draggable") {
    startDraggablePear(root, targets);
    return () => cleanups.forEach(c => c());
  }
  if (mode === "mouse-follow") {
    const mouseCleanup = startMouseFollow(root, targets);
    if (mouseCleanup) cleanups.push(mouseCleanup);
    return () => cleanups.forEach(c => c());
  }
  if (mode === "juice-interactive" || mode === "juice-hold") {
    setWispearAmbientBase(targets, glowLow);
    return () => cleanups.forEach(c => c());
  }
  if (mode === "squeeze-loop") {
    setWispearAmbientBase(targets, glowLow);
    tweenPearSqueezeLoop(targets);
    return () => cleanups.forEach(c => c());
  }

  // Handle original modes
  if (mode === "ambient") {
    setWispearAmbientBase(targets, glowLow);
  } else if (mode === "rings") {
    setWispearRingsModeBase(targets, glowLow);
  } else {
    setWispearIntroReset(targets);
  }

  if (runIntro) {
    const intro = gsap.timeline({
      defaults: { ease: "power2.out" },
      repeat: loopIntro ? -1 : 0,
      repeatDelay: loopIntro ? 1.8 : 0,
    });

    addRingsStrokeReveal(intro, targets, 0);

    if (mode !== "rings") {
      addGlowFadeIn(intro, targets, glowLow, 0.32, { duration: 0.5 });
      addPearPopReveal(intro, targets, 0.45, 0.58);
    } else {
      addGlowFadeIn(intro, targets, glowLow, 0.35, { duration: 0.45 });
    }

    if (!loopIntro) {
      intro.eventCallback("onComplete", () => {
        if (mode === "full") tweenGlowPulseLoop(targets, glowHigh);
        if (mode === "intro-only" || mode === "full") tweenPearSqueezeLoop(targets);
      });
    }
  }

  if (mode === "ambient") {
    tweenGlowPulseLoop(targets, glowHigh);
  }

  if (showTracer) {
    const pathDelay = mode === "ambient" ? 0.2 : 1.15;
    startTracerOrbit(targets, { delay: pathDelay });
  }

  return () => cleanups.forEach(c => c());
}
