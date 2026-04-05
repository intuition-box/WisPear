import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export function startMouseFollow(root: Element, targets: WispearMarkTargets) {
  // Ensure visible
  gsap.set(targets.rings, { drawSVG: "0% 100%" });
  gsap.set([...targets.leaves, ...targets.body], { opacity: 1, scale: 1 });
  gsap.set(targets.glowFill, { opacity: 0.4 });
  if (targets.tracer) gsap.set(targets.tracer, { opacity: 0 });

  if (!targets.pear) return () => {};

  // Quick setup for the pear
  gsap.set(targets.pear, { transformOrigin: "150px 155px" });

  const onMouseMove = (e: MouseEvent) => {
    const rect = root.getBoundingClientRect();
    // Calculate mouse position relative to the center of the SVG
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    // Move the pear slightly towards the mouse (parallax effect)
    gsap.to(targets.pear, {
      x: distX * 0.1,
      y: distY * 0.1,
      rotation: distX * 0.05,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto"
    });

    // Move the glow in the opposite direction slightly to enhance depth
    gsap.to(targets.glowFill, {
      x: distX * -0.05,
      y: distY * -0.05,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const onMouseLeave = () => {
    gsap.to([targets.pear, targets.glowFill], {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  window.addEventListener("mousemove", onMouseMove);
  root.addEventListener("mouseleave", onMouseLeave);

  // Return cleanup function
  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    root.removeEventListener("mouseleave", onMouseLeave);
  };
}
