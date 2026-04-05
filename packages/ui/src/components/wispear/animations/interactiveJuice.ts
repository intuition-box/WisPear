import gsap from "gsap";
import type { WispearMarkTargets } from "./types";
import { tweenPearJuiceSqueeze, tweenPearJuicePress, tweenPearJuiceRelease } from "./pearJuiceSqueeze";
import { tweenPearSqueezeLoop } from "./pearSqueezeLoop";

/**
 * Makes the pear clickable to trigger the "juice squeeze" effect.
 * Can either be a simple click, or a "hold to squeeze" interaction.
 * Returns a cleanup function to remove the event listener.
 * 
 * @param targets The resolved SVG targets
 * @param resumeAmbientLoop If true, restarts the gentle breathing loop after the squeeze
 * @param holdMode If true, the squeeze is maintained while the mouse is held down
 */
export function setupInteractiveJuiceClick(
  targets: WispearMarkTargets, 
  resumeAmbientLoop = false,
  holdMode = false
): () => void {
  const el = targets.pear;
  if (!el) return () => {};

  let isPressed = false;

  if (holdMode) {
    const onPress = (e: Event) => {
      e.preventDefault();
      if (isPressed) return;
      isPressed = true;
      
      gsap.killTweensOf(el);
      if (targets.juiceDrops) gsap.killTweensOf(targets.juiceDrops);
      if (targets.splash) gsap.killTweensOf(targets.splash);
      
      tweenPearJuicePress(targets);
    };

    const onRelease = (e: Event) => {
      e.preventDefault();
      if (!isPressed) return;
      isPressed = false;
      
      gsap.killTweensOf(el);
      const tl = tweenPearJuiceRelease(targets);
      
      if (tl && resumeAmbientLoop) {
        tl.eventCallback("onComplete", () => {
          tweenPearSqueezeLoop(targets);
        });
      }
    };

    el.addEventListener("mousedown", onPress);
    el.addEventListener("touchstart", onPress, { passive: false });
    window.addEventListener("mouseup", onRelease);
    window.addEventListener("touchend", onRelease);
    
    (el as HTMLElement | SVGElement).style.cursor = "pointer";

    return () => {
      el.removeEventListener("mousedown", onPress);
      el.removeEventListener("touchstart", onPress);
      window.removeEventListener("mouseup", onRelease);
      window.removeEventListener("touchend", onRelease);
      (el as HTMLElement | SVGElement).style.cursor = "";
    };
  } else {
    const onClick = () => {
      // Kill any existing squeeze loops/tweens on the pear so they don't fight
      gsap.killTweensOf(el);
      if (targets.juiceDrops) gsap.killTweensOf(targets.juiceDrops);
      if (targets.splash) gsap.killTweensOf(targets.splash);
      
      const tl = tweenPearJuiceSqueeze(targets);
      
      if (tl && resumeAmbientLoop) {
        // Resume the ambient loop after the juice squeeze finishes
        tl.eventCallback("onComplete", () => {
          tweenPearSqueezeLoop(targets);
        });
      }
    };

    el.addEventListener("click", onClick);
    // Add a pointer cursor to indicate it's clickable
    (el as HTMLElement | SVGElement).style.cursor = "pointer";

    return () => {
      el.removeEventListener("click", onClick);
      (el as HTMLElement | SVGElement).style.cursor = "";
    };
  }
}
