import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMPANY } from "@/data/company";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseUs: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".why-card");
    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="why-a1"
      ref={containerRef}
      className="relative bg-navy-950 text-ivory-100 py-24 md:py-36 overflow-hidden border-t border-gold-500/15"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky Left Heading Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <span className="text-xs uppercase tracking-ultra font-mono text-gold-500 block mb-2">
              05 / WHY A1 CONSTRUCTION
            </span>
            <h2 className="headline-section font-serif font-bold text-ivory-100 mb-6">
              Built on Decades of <br />
              <span className="italic font-normal text-gold-400">Unshakable Trust.</span>
            </h2>
            <p className="text-sm md:text-base text-ivory-200/75 leading-relaxed font-light mb-8">
              Constructing a home is one of life’s most significant undertakings. In Hosadurga, families choose A1 Construction for our unwavering accountability and structural reliability.
            </p>

            <div className="p-6 rounded-sm bg-navy-900/80 border border-gold-500/20 backdrop-blur-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-500 block mb-1">
                OUR PROMISE
              </span>
              <p className="text-lg font-serif italic text-ivory-100">
                "{COMPANY.tagline}"
              </p>
            </div>
          </div>

          {/* Right Column: 5 Key Points with Hairline Dividers */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-gold-500/15">
            {COMPANY.reasons.map((reason) => (
              <div
                key={reason.num}
                className="why-card py-8 md:py-10 first:pt-0 last:pb-0 transition-all duration-300 group"
              >
                <div className="flex items-start gap-6 md:gap-8">
                  <span className="font-serif text-3xl md:text-4xl text-gold-500 font-bold tabular-nums">
                    {reason.num}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-semibold text-ivory-100 group-hover:text-gold-300 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-sm md:text-base text-ivory-200/70 mt-2 font-light leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
