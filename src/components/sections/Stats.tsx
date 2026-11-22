import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const blueprintPathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Blueprint line draw animation
      if (blueprintPathRef.current) {
        const length = blueprintPathRef.current.getTotalLength();
        gsap.set(blueprintPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(blueprintPathRef.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const marqueeWords = [
    "CRAFTSMANSHIP",
    "RESPONSIBILITY",
    "STRUCTURAL RIGOR",
    "ENDURING TRUST",
    "PRECISION MASONRY",
    "HOSADURGA HERITAGE",
  ];

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative bg-ivory-100 text-navy-950 py-24 md:py-32 overflow-hidden border-t border-b border-ivory-300"
    >
      {/* Background Architectural Blueprint Grid Lines */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#071827" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-navy-950/15">
          <div>
            <span className="text-xs uppercase tracking-ultra font-mono text-gold-600 block mb-2">
              01 / TRUST & HERITAGE
            </span>
            <h2 className="headline-section font-serif font-bold text-navy-950">
              Numbers that Reflect <span className="italic font-normal">Dedication.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-navy-950/70 max-w-md mt-4 md:mt-0 font-light">
            Every foundation laid over the past 25 years represents a family’s dream delivered with uncompromising structural responsibility.
          </p>
        </div>

        {/* Huge Numerals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 relative">
          {/* Stat 1 */}
          <div className="flex flex-col justify-between p-8 rounded-sm bg-white/70 backdrop-blur-sm border border-navy-950/10 shadow-sm relative overflow-hidden group hover:border-gold-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-bl-full pointer-events-none" />
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-600">Metric 01</span>
              <div className="text-6xl lg:text-7xl font-serif font-bold text-navy-950 mt-2">
                <AnimatedCounter end={25} suffix="+" />
              </div>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest font-semibold text-navy-950">
                YEARS OF EXPERIENCE
              </h3>
              <p className="text-xs text-navy-950/60 mt-1">
                Continuous building practice with mastery over regional construction topography.
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col justify-between p-8 rounded-sm bg-white/70 backdrop-blur-sm border border-navy-950/10 shadow-sm relative overflow-hidden group hover:border-gold-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-bl-full pointer-events-none" />
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-600">Metric 02</span>
              <div className="text-6xl lg:text-7xl font-serif font-bold text-navy-950 mt-2">
                <AnimatedCounter end={250} suffix="+" />
              </div>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest font-semibold text-navy-950">
                HOMES CONSTRUCTED
              </h3>
              <p className="text-xs text-navy-950/60 mt-1">
                Completed house projects standing as enduring landmarks of craftsmanship.
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col justify-between p-8 rounded-sm bg-white/70 backdrop-blur-sm border border-navy-950/10 shadow-sm relative overflow-hidden group hover:border-gold-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-bl-full pointer-events-none" />
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-600">Metric 03</span>
              <div className="text-4xl lg:text-5xl font-serif font-bold text-navy-950 mt-5 mb-2 leading-none">
                Hosadurga
              </div>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest font-semibold text-navy-950">
                & SURROUNDING AREAS
              </h3>
              <p className="text-xs text-navy-950/60 mt-1">
                Deep-rooted local foundation serving Hosadurga and surrounding regions.
              </p>
            </div>
          </div>
        </div>

        {/* Blueprint Line Graphic Vector */}
        <div className="mt-16 w-full flex justify-center">
          <svg
            className="w-full max-w-3xl h-24 overflow-visible"
            viewBox="0 0 800 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={blueprintPathRef}
              d="M 50 80 L 150 80 L 220 20 L 380 20 L 450 80 L 600 80 L 650 40 L 750 40"
              stroke="#C5A46D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dimension ticks */}
            <circle cx="220" cy="20" r="3" fill="#071827" />
            <circle cx="380" cy="20" r="3" fill="#071827" />
            <circle cx="450" cy="80" r="3" fill="#071827" />
            <text x="300" y="14" fill="#071827" fontSize="10" fontFamily="monospace" textAnchor="middle">
              SPEC: REINFORCED ELEVATION
            </text>
          </svg>
        </div>
      </div>

      {/* Outlined Serif Marquee */}
      <div className="mt-14 w-full overflow-hidden border-t border-b border-navy-950/10 py-4 bg-ivory-200/50 select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, idx) => (
            <div key={idx} className="flex items-center mx-6">
              <span
                className="font-serif text-3xl md:text-4xl uppercase tracking-widest font-light"
                style={{
                  WebkitTextStroke: "1px rgba(7, 24, 39, 0.6)",
                  color: "transparent",
                }}
              >
                {word}
              </span>
              <span className="w-2 h-2 rounded-full bg-gold-600 mx-6 opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
