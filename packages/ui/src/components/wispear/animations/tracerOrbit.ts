import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export type TracerOrbitVars = {
  /** Delay before fade-in + path motion start. */
  delay?: number;
  fadeDuration?: number;
  pathDuration?: number;
  peakOpacity?: number;
};

/**
 * Fades tracer in then runs MotionPath along `bodyPath` (requires MotionPathPlugin).
 * Returns both tweens so callers can `gsap.killTweensOf` if needed.
 */
export function startTracerOrbit(targets: WispearMarkTargets, vars?: TracerOrbitVars) {
  const { tracer, bodyPath } = targets;
  if (!tracer || !bodyPath) return { fade: null, path: null };

  const delay = vars?.delay ?? 0;
  const fadeDuration = vars?.fadeDuration ?? 0.2;
  const pathDuration = vars?.pathDuration ?? 5.5;
  const peakOpacity = vars?.peakOpacity ?? 0.9;

  const fade = gsap.to(tracer, { opacity: peakOpacity, duration: fadeDuration, delay });
  const path = gsap.to(tracer, {
    motionPath: {
      path: bodyPath,
      align: bodyPath,
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
    },
    duration: pathDuration,
    ease: "none",
    repeat: -1,
    delay,
  });

  return { fade, path };
}
