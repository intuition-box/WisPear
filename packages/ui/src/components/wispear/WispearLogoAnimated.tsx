import { useLayoutEffect } from "react";
import gsap from "gsap";
import { collectWispearTargets } from "./animations";
import { useWispearAnimator } from "./animations/useWispearAnimator";
import type { WispearAnimationMode } from "./animations/modes";
import { WISPEAR_ANIMATION_MODES } from "./animations/modes";
import { WispearLogo, type WispearLogoProps } from "./WispearLogo";

export type { WispearAnimationMode };
export { WISPEAR_ANIMATION_MODES };

export type WispearLogoAnimatedProps = WispearLogoProps & {
  mode?: WispearAnimationMode | "static";
  /** Bump this value to kill and replay the current mode (parent-controlled). */
  replayKey?: number;
  /** Bump this value to trigger a fast "juice" squeeze. */
  juiceKey?: number;
  /** Replay the intro timeline forever (only applies to modes that use the intro). */
  loopIntro?: boolean;
};

/**
 * Wispear icon: thin React shell around portable `animations/*` modules.
 * Uses the `useWispearAnimator` hook which is highly portable.
 */
export function WispearLogoAnimated({
  mode = "full",
  replayKey = 0,
  juiceKey = 0,
  loopIntro = false,
  theme = "dark",
  ...logoProps
}: WispearLogoAnimatedProps) {
  const { rootRef, ctxRef } = useWispearAnimator<SVGSVGElement>({
    mode,
    theme,
    loopIntro,
    replayKey,
  });

  // Handle the imperative "Juice Squeeze" button
  useLayoutEffect(() => {
    if (juiceKey === 0 || !ctxRef.current || !rootRef.current || mode === "static") return;
    
    // Add the juice squeeze tween to the existing context so it cleans up properly
    ctxRef.current.add(() => {
      const targets = collectWispearTargets(rootRef.current!);
      // Kill any existing squeeze loops/tweens on the pear so they don't fight
      if (targets.pear) gsap.killTweensOf(targets.pear);
      
      import("./animations/pearJuiceSqueeze").then(({ tweenPearJuiceSqueeze }) => {
        const tl = tweenPearJuiceSqueeze(targets);
        if (tl) {
          // Resume the ambient loop after the juice squeeze finishes
          tl.eventCallback("onComplete", () => {
            import("./animations/pearSqueezeLoop").then(({ tweenPearSqueezeLoop }) => {
              tweenPearSqueezeLoop(targets);
            });
          });
        }
      });
    });
  }, [juiceKey, mode]);

  return <WispearLogo ref={rootRef} theme={theme} {...logoProps} />;
}
