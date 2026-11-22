import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroScene } from "@/components/three/HeroScene";
import { MaskText } from "@/components/motion/MaskText";
import { COMPANY } from "@/data/company";

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen lg:h-screen lg:max-h-[1050px] w-full flex items-center justify-center overflow-hidden bg-navy-950 pt-24 pb-12"
    >
      {/* 1. Cinematic Background Image - Clearly Visible Luxury House */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/images/hero-architecture.webp"
          alt="Luxury Architecture in Karnataka"
          initial={{ scale: 1.10 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 12, ease: "easeOut" }}
          className="w-full h-full object-cover opacity-70 filter brightness-110 contrast-110"
          fetchPriority="high"
          loading="eager"
        />
        {/* Directional Gradient Overlay: Solid dark on left for text legibility, clear & visible on right for house backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/75 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
        {/* Warm Gold light-leak from lower right */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Interactive 3D Villa Scene (R3F) with Dynamic Movement */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* 3. Hero Content Foreground (Left-Aligned, Zero Overlap) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-between h-full py-4">
        {/* Top Eyebrow */}
        <div className="pt-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/80 border border-gold-500/25 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-ultra text-gold-400 font-mono font-medium">
              ESTABLISHED IN HOSADURGA · 25+ YEARS OF EXCELLENCE
            </span>
          </motion.div>
        </div>

        {/* Central Headline & Core Statement */}
        <div className="my-auto py-4 max-w-md lg:max-w-[490px]">
          <MaskText
            lines={[
              'Building <span class="italic font-normal text-gold-300">Dreams.</span>',
              'Creating <span class="italic font-normal text-gold-500">Legacies.</span>',
            ]}
            className="headline-hero font-serif text-ivory-100 font-bold tracking-tight mb-5"
            delay={0.1}
            triggerOnScroll={false}
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="text-base sm:text-lg text-ivory-200/90 max-w-md font-light leading-relaxed mb-8"
          >
            {COMPANY.subtextHero}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <button
              onClick={() => handleScrollTo("#contact")}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-sm bg-orange-construction hover:bg-orange-hover text-ivory-100 font-medium text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-orange-construction/25 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <span>DISCUSS YOUR PROJECT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={() => handleScrollTo("#projects")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm border border-gold-500/40 hover:border-gold-500 text-ivory-100 hover:text-gold-400 font-medium text-xs sm:text-sm uppercase tracking-wider backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <span>EXPLORE OUR WORK</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Floating Glass Stat Chips & Scroll Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4 border-t border-gold-500/15">
          {/* Stat Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="px-4 py-2 rounded-sm bg-navy-900/70 border border-gold-500/20 backdrop-blur-md">
              <span className="font-serif text-lg font-bold text-gold-400 mr-2">25+</span>
              <span className="text-[11px] uppercase tracking-wider text-ivory-200/80 font-mono">Years Experience</span>
            </div>
            <div className="px-4 py-2 rounded-sm bg-navy-900/70 border border-gold-500/20 backdrop-blur-md">
              <span className="font-serif text-lg font-bold text-gold-400 mr-2">250+</span>
              <span className="text-[11px] uppercase tracking-wider text-ivory-200/80 font-mono">Homes Built</span>
            </div>
            <div className="px-4 py-2 rounded-sm bg-navy-900/70 border border-gold-500/20 backdrop-blur-md">
              <span className="text-xs uppercase tracking-wider text-ivory-100 font-mono">Hosadurga & Surrounding</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <button
            onClick={() => handleScrollTo("#stats")}
            aria-label="Scroll to content"
            className="hidden md:flex items-center gap-3 text-gold-400/80 hover:text-gold-400 transition-colors focus:outline-none group"
          >
            <span className="text-[10px] font-mono uppercase tracking-ultra">SCROLL</span>
            <div className="w-5 h-8 rounded-full border border-gold-500/40 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 rounded-full bg-gold-500"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
