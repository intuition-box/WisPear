import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export function startScrollReveal(root: Element, targets: WispearMarkTargets) {
  // Initial hidden state
  gsap.set(targets.rings, { drawSVG: "0% 0%" });
  gsap.set([...targets.leaves, ...targets.body], { opacity: 0, scale: 0.5, y: 50, transformOrigin: "50% 55%" });
  gsap.set(targets.glowFill, { opacity: 0 });
  if (targets.tracer) gsap.set(targets.tracer, { opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top 85%", // Starts when the top of the logo hits 85% of the viewport height
      end: "top 35%",   // Ends when it reaches 35%
      scrub: 1,         // Smooth scrubbing with 1 second lag
    }
  });

  // Draw rings based on scroll
  tl.to(targets.rings, { drawSVG: "0% 100%", stagger: 0.1, ease: "none" }, 0);
  
  // Fade in glow
  tl.to(targets.glowFill, { opacity: 0.6, ease: "none" }, 0.2);

  // Pop pear up
  tl.to([...targets.leaves, ...targets.body], { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    stagger: 0.05, 
    ease: "back.out(1.5)" 
  }, 0.3);

  return tl;
}
