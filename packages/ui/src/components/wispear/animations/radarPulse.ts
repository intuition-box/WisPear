import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export function startRadarPulse(targets: WispearMarkTargets) {
  // Reset states for radar
  gsap.set(targets.rings, { 
    drawSVG: "0% 100%", 
    opacity: 1, 
    scale: 0.8, 
    transformOrigin: "150px 220px" 
  });
  gsap.set([...targets.leaves, ...targets.body], { opacity: 1, scale: 1 });
  gsap.set(targets.glowFill, { opacity: 0.8, scale: 0.5, transformOrigin: "150px 220px" });
  if (targets.tracer) gsap.set(targets.tracer, { opacity: 0 });

  const tl = gsap.timeline();

  // Pulse rings outward
  tl.to(targets.rings, {
    scale: 2.5,
    opacity: 0,
    duration: 2.5,
    stagger: 0.4,
    repeat: -1,
    ease: "power2.out",
  }, 0);

  // Pulse core glow
  tl.to(targets.glowFill, {
    scale: 2,
    opacity: 0,
    duration: 2.5,
    repeat: -1,
    ease: "power2.out",
  }, 0);

  // Gentle float on the pear
  if (targets.pear) {
    tl.to(targets.pear, {
      y: -15,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    }, 0);
  }

  return tl;
}
