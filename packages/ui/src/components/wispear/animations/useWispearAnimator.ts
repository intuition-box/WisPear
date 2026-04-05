import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  applyWispearMode,
  collectWispearTargets,
  registerWispearGsapPlugins,
  type WispearAnimationMode,
} from ".";
import type { WispearAnimationTheme } from "./types";

export type UseWispearAnimatorProps = {
  mode?: WispearAnimationMode | "static";
  theme?: WispearAnimationTheme;
  loopIntro?: boolean;
  replayKey?: number;
};

/**
 * A highly portable React hook that wires up all GSAP animations to the Wispear SVG.
 * Returns a `ref` that you must attach to the root `<svg>` element.
 */
export function useWispearAnimator<T extends SVGSVGElement>({
  mode = "full",
  theme = "dark",
  loopIntro = false,
  replayKey = 0,
}: UseWispearAnimatorProps) {
  const rootRef = useRef<T>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || mode === "static") return;

    registerWispearGsapPlugins();

    let cleanupFn: void | (() => void);

    const ctx = gsap.context(() => {
      const targets = collectWispearTargets(root);
      // applyWispearMode returns an optional cleanup function (e.g. for window event listeners)
      cleanupFn = applyWispearMode({ root, targets, mode, theme, loopIntro });
    }, root);

    ctxRef.current = ctx;

    return () => {
      if (typeof cleanupFn === "function") cleanupFn();
      ctx.revert();
      ctxRef.current = null;
    };
  }, [mode, theme, loopIntro, replayKey]);

  return { rootRef, ctxRef };
}
