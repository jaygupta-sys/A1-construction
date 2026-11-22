import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export const BrandStatement: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !textRef.current || !bgRef.current) return;

    const words = textRef.current.querySelectorAll(".brand-word");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      // Background slow zoom
      tl.to(
        bgRef.current,
        {
          scale: 1.15,
          ease: "none",
        },
        0
      );

      // Words reveal scrub
      tl.fromTo(
        words,
        {
          opacity: 0.15,
          yPercent: 40,
        },
        {
          opacity: 1,
          yPercent: 0,
          stagger: 0.15,
          ease: "power2.out",
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="statement"
      ref={containerRef}
      className="relative min-h-[80vh] lg:h-screen lg:max-h-[900px] w-full flex items-center justify-center overflow-hidden bg-navy-950 text-ivory-100 py-20"
    >
      {/* Background Image with Dark Vignette - Enhanced Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src="/images/brand-statement-bg.webp"
          alt="Architectural Legacy"
          className="w-full h-full object-cover opacity-50 filter brightness-110 contrast-115 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/60" />
      </div>

      {/* Oversized Serif Headline */}
      <div
        ref={textRef}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center"
      >
        <span className="text-xs uppercase tracking-ultra font-mono text-gold-500 mb-6 block">
          A PLEDGE ACROSS 250+ HOMES
        </span>

        <h2 className="headline-huge font-serif font-bold text-ivory-100 tracking-tight leading-[0.95]">
          <span className="brand-word inline-block mr-4">Your</span>
          <span className="brand-word inline-block mr-4 italic font-normal text-gold-300">Dream.</span>
          <br className="hidden sm:inline" />
          <span className="brand-word inline-block mr-4">Our</span>
          <span className="brand-word inline-block italic font-normal text-gold-500">
            Responsibility.
          </span>
          <span className="brand-word inline-block text-gold-500 ml-3 text-3xl md:text-5xl align-middle">
            ❤️
          </span>
        </h2>

        <p className="text-sm md:text-base text-ivory-200/60 max-w-lg mt-8 font-light tracking-wide">
          25+ years of steadfast construction excellence in Hosadurga, Karnataka.
        </p>
      </div>
    </section>
  );
};
