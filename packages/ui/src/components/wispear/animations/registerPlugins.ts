import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

let registered = false;

/** Call once before any Wispear animation (safe to call multiple times). */
export function registerWispearGsapPlugins(): void {
  if (registered) return;
  gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, ScrollTrigger, Draggable);
  registered = true;
}
