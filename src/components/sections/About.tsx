import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealImage } from "@/components/motion/RevealImage";
import { MaskText } from "@/components/motion/MaskText";
import { COMPANY } from "@/data/company";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !paragraphRef.current) return;

    // Word-by-word opacity scrub on paragraph as it scrolls
    const words = paragraphRef.current.querySelectorAll(".scrub-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.25 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: 1,
          },
        }
      );
    }, paragraphRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Wrap words for scrub
  const aboutWords = COMPANY.aboutCopy.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-navy-950 text-ivory-100 py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with overlapping images & vertical label */}
          <div className="lg:col-span-6 relative">
            {/* Vertical Est. Label */}
            <div className="hidden sm:block absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-xs font-mono uppercase tracking-ultra text-gold-500/70 select-none">
              EST. 25+ YEARS · HOSADURGA
            </div>

            {/* Main Tall Image */}
            <div className="relative pl-0 sm:pl-4">
              <RevealImage
                src="/images/about-craftsmanship.webp"
                alt="Architectural Craftsmanship"
                aspectRatio="aspect-[4/5]"
                className="rounded-sm shadow-luxury"
              />

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-2/3 max-w-xs shadow-2xl z-20 border-2 border-navy-950">
                <RevealImage
                  src="/images/about-secondary.webp"
                  alt="Courtyard and detail"
                  aspectRatio="aspect-[4/3]"
                  className="rounded-sm"
                  parallax={false}
                />
              </div>

              {/* Decorative Gold Accent Box */}
              <div className="absolute -top-4 -left-2 w-24 h-24 border-t-2 border-l-2 border-gold-500/40 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center pt-8 lg:pt-0">
            <span className="text-xs uppercase tracking-ultra font-mono text-gold-500 block mb-3">
              02 / ABOUT A1 CONSTRUCTION
            </span>

            <MaskText
              lines={[
                'More Than Construction.',
                'A <span class="italic font-normal text-gold-400">Commitment of Trust.</span>',
              ]}
              className="headline-section font-serif font-bold text-ivory-100 tracking-tight mb-8"
            />

            {/* Word-by-word Scrub Paragraph */}
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl text-ivory-100/90 leading-relaxed font-light mb-8"
            >
              {aboutWords.map((word, i) => (
                <span key={i} className="scrub-word inline-block mr-1.5 transition-opacity">
                  {word}
                </span>
              ))}
            </p>

            {/* Core Values Minimalist Badges */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gold-500/20">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-1">
                  Craftsmanship
                </h4>
                <p className="text-xs text-ivory-200/70 font-light">
                  Exacting structural masonry and durable material standards.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-1">
                  Customer Responsibility
                </h4>
                <p className="text-xs text-ivory-200/70 font-light">
                  Honoring budgets, schedules, and owner trust with full accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
