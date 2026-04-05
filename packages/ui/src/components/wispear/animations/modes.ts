export type WispearAnimationMode = 
  | "full" 
  | "intro-only" 
  | "ambient" 
  | "rings"
  | "squeeze-loop"
  | "juice-interactive"
  | "juice-hold"
  | "radar-pulse"
  | "scroll-reveal"
  | "draggable"
  | "mouse-follow";

export const WISPEAR_ANIMATION_MODES: { value: WispearAnimationMode; label: string }[] = [
  { value: "full", label: "Full (draw + reveal + orbit + glow)" },
  { value: "intro-only", label: "Intro only" },
  { value: "ambient", label: "Ambient (orbit + glow)" },
  { value: "rings", label: "Rings draw only" },
  { value: "squeeze-loop", label: "Gentle Breathing Squeeze" },
  { value: "juice-interactive", label: "Juice Click (Click to squeeze!)" },
  { value: "juice-hold", label: "Juice Hold (Hold to squeeze!)" },
  { value: "radar-pulse", label: "Radar Pulse (Hypnotic)" },
  { value: "scroll-reveal", label: "Scroll Reveal (Scroll down!)" },
  { value: "draggable", label: "Draggable Pear (Grab it!)" },
  { value: "mouse-follow", label: "Mouse Follow (Interactive)" },
];
