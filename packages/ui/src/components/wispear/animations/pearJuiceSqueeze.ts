import gsap from "gsap";
import type { WispearMarkTargets } from "./types";

export type PearJuiceSqueezeVars = {
  duration?: number;
  ease?: string;
  transformOrigin?: string;
};

const defaultOrigin = "50% 80%"; // Centre de gravité plus bas (le "ventre" de la poire)

/**
 * A fast, single squash-and-stretch "juice" squeeze, like a hand pressing it.
 */
export function tweenPearJuiceSqueeze(targets: WispearMarkTargets, vars?: PearJuiceSqueezeVars) {
  const el = targets.pear;
  if (!el) return null;

  const origin = vars?.transformOrigin ?? defaultOrigin;
  gsap.set(el, { transformOrigin: origin });

  const totalDuration = vars?.duration ?? 1.2;
  const tl = gsap.timeline();

  // Squeeze horizontal : on enlève la rotation qui désaxait la poire vers la droite
  // et on centre la pression sur le ventre de la poire (Y=175)
  tl.to(el, {
    scaleX: 0.6,
    scaleY: 1.15,
    duration: totalDuration * 0.25,
    ease: "power4.out", // Pression plus franche et rapide
  });

  // Animate juice drops shooting out
  if (targets.juiceDrops && targets.juiceDrops.length > 0) {
    // Reset drops : on les fait démarrer plus haut, bien au centre du corps de la poire
    gsap.set(targets.juiceDrops, {
      opacity: 0,
      y: -50, // Démarre plus haut dans le corps
      x: 0,
      scale: 0.1,
      transformOrigin: "center center",
    });

    // Shoot out : elles jaillissent vers le haut et les côtés
    tl.to(
      targets.juiceDrops,
      {
        opacity: 1,
        scale: () => 0.7 + Math.random() * 0.6, // Random sizes
        y: () => -80 + Math.random() * 40, // Jaillit vers le haut
        x: () => -70 + Math.random() * 140, // S'écarte sur les côtés
        duration: totalDuration * 0.3,
        stagger: 0.01,
        ease: "power3.out",
      },
      "<"
    ).to(
      targets.juiceDrops,
      {
        opacity: 0,
        y: 120, // Retombe vers le sol
        scale: 0.3,
        duration: totalDuration * 0.5,
        ease: "power2.in",
      },
      ">"
    );
  }

  // Animate splash on the floor
  if (targets.splash && targets.splash.length > 0) {
    gsap.set(targets.splash, {
      opacity: 0,
      scale: 0,
      transformOrigin: "center center",
    });

    tl.to(
      targets.splash,
      {
        opacity: 0.8,
        scale: () => 1 + Math.random() * 1.5,
        duration: totalDuration * 0.2,
        stagger: 0.02,
        ease: "power2.out",
      },
      "-=0.4" // Start right before drops disappear
    ).to(
      targets.splash,
      {
        opacity: 0,
        scale: () => 2 + Math.random() * 1,
        duration: totalDuration * 0.4,
        ease: "power2.out",
      },
      ">"
    );
  }

  // Relâchement juteux et très élastique
  tl.to(el, {
    scaleX: 1,
    scaleY: 1,
    duration: totalDuration * 0.75,
    ease: "elastic.out(1.5, 0.25)", // Rebond plus prononcé
  }, totalDuration * 0.25); // Start after the squeeze

  return tl;
}

/**
 * Just the "press" part of the squeeze (for hold-to-squeeze interactions).
 */
export function tweenPearJuicePress(targets: WispearMarkTargets, vars?: PearJuiceSqueezeVars) {
  const el = targets.pear;
  if (!el) return null;

  const origin = vars?.transformOrigin ?? defaultOrigin;
  gsap.set(el, { transformOrigin: origin });

  const totalDuration = vars?.duration ?? 1.2;
  const tl = gsap.timeline();

  tl.to(el, {
    scaleX: 0.6,
    scaleY: 1.15,
    duration: totalDuration * 0.25,
    ease: "power4.out",
  });

  if (targets.juiceDrops && targets.juiceDrops.length > 0) {
    gsap.set(targets.juiceDrops, { opacity: 0, y: -50, x: 0, scale: 0.1, transformOrigin: "center center" });
  }

  return tl;
}

/**
 * Just the "release" part of the squeeze (for hold-to-squeeze interactions).
 */
export function tweenPearJuiceRelease(targets: WispearMarkTargets, vars?: PearJuiceSqueezeVars) {
  const el = targets.pear;
  if (!el) return null;

  const totalDuration = vars?.duration ?? 1.2;
  const tl = gsap.timeline();

  if (targets.juiceDrops && targets.juiceDrops.length > 0) {
    tl.to(targets.juiceDrops, {
      opacity: 1,
      scale: () => 0.7 + Math.random() * 0.6,
      y: () => -80 + Math.random() * 40,
      x: () => -70 + Math.random() * 140,
      duration: totalDuration * 0.3,
      stagger: 0.01,
      ease: "power3.out",
    }, 0).to(targets.juiceDrops, {
      opacity: 0,
      y: 120,
      scale: 0.3,
      duration: totalDuration * 0.5,
      ease: "power2.in",
    }, ">");
  }

  if (targets.splash && targets.splash.length > 0) {
    gsap.set(targets.splash, { opacity: 0, scale: 0, transformOrigin: "center center" });
    tl.to(targets.splash, {
      opacity: 0.8,
      scale: () => 1 + Math.random() * 1.5,
      duration: totalDuration * 0.2,
      stagger: 0.02,
      ease: "power2.out",
    }, 0.2).to(targets.splash, {
      opacity: 0,
      scale: () => 2 + Math.random() * 1,
      duration: totalDuration * 0.4,
      ease: "power2.out",
    }, ">");
  }

  tl.to(el, {
    scaleX: 1,
    scaleY: 1,
    duration: totalDuration * 0.75,
    ease: "elastic.out(1.5, 0.25)",
  }, 0);

  return tl;
}
