import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function useLenis() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is requested or on touch devices, keep snappy native scroll
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || isTouch) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,            // Snappy and responsive
      duration: 0.9,        // Tight, premium feel without sluggishness
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });
    lenisInstance = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reducedMotion]);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number }) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, options);
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return { scrollTo, lenis: lenisInstance };
}
