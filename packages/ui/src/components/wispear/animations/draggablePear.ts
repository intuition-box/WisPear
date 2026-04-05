import gsap from "gsap";
import Draggable from "gsap/Draggable";
import type { WispearMarkTargets } from "./types";

export function startDraggablePear(root: Element, targets: WispearMarkTargets) {
  // Ensure visible
  gsap.set(targets.rings, { drawSVG: "0% 100%", opacity: 0.3 });
  gsap.set([...targets.leaves, ...targets.body], { opacity: 1, scale: 1 });
  gsap.set(targets.glowFill, { opacity: 0.5 });
  if (targets.tracer) gsap.set(targets.tracer, { opacity: 0 });

  if (!targets.pear) return;

  // Add a little "grab me" pulse
  const pulse = gsap.to(targets.pear, {
    scale: 1.05,
    duration: 0.8,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  Draggable.create(targets.pear, {
    type: "x,y",
    bounds: root, // Keep it within the SVG viewBox
    onPress: function() {
      pulse.pause();
      gsap.to(this.target, { scale: 1.1, cursor: "grabbing", duration: 0.2 });
      gsap.to(targets.glowFill, { opacity: 0.8, scale: 1.2, duration: 0.2 });
    },
    onRelease: function() {
      gsap.to(this.target, { scale: 1, cursor: "grab", duration: 0.4, ease: "bounce.out" });
      gsap.to(targets.glowFill, { opacity: 0.5, scale: 1, duration: 0.4 });
      pulse.play();
    }
  });
}
