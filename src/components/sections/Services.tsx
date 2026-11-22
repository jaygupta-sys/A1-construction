import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "@/data/services";
import { Service } from "@/types";

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<Service>(SERVICES[0]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative bg-navy-900 text-ivory-100 py-24 md:py-36 overflow-hidden border-t border-b border-gold-500/15"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gold-500/20">
          <div>
            <span className="text-xs uppercase tracking-ultra font-mono text-gold-500 block mb-2">
              03 / CORE DISCIPLINES
            </span>
            <h2 className="headline-section font-serif font-bold text-ivory-100">
              Architectural <span className="italic font-normal text-gold-400">Services.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-ivory-200/70 max-w-md mt-4 md:mt-0 font-light">
            Comprehensive residential and structural construction solutions executed with 25+ years of local mastery in Hosadurga.
          </p>
        </div>

        {/* Desktop Split View: Interactive List + Dynamic Preview Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services List (Left) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-gold-500/15">
            {SERVICES.map((service, idx) => {
              const isSelected = activeService.id === service.id;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => {
                    setActiveService(service);
                    setHoveredIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setActiveService(service)}
                  className={`group py-8 px-4 cursor-pointer transition-all duration-300 rounded-sm ${
                    isSelected ? "bg-navy-800/80 border-l-2 border-gold-500" : "hover:bg-navy-800/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-baseline gap-4 md:gap-6">
                      <span className="text-sm font-mono text-gold-500 font-semibold">
                        {service.number}
                      </span>
                      <div>
                        <h3 className="text-xl md:text-2xl font-serif font-semibold text-ivory-100 group-hover:text-gold-300 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-ivory-200/70 mt-2 font-light">
                          {service.description}
                        </p>

                        {/* Feature bullets shown on active */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-gold-500/10"
                            >
                              {service.features.map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-2 text-xs text-ivory-200/80 font-mono">
                                  <Check className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-5 h-5 text-gold-500 transition-transform duration-300 ${
                        isSelected ? "translate-x-1" : "opacity-40 group-hover:opacity-100 group-hover:translate-x-1"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Image & Details Panel (Right, Sticky on Desktop) */}
          <div className="lg:col-span-5 hidden lg:block sticky top-32">
            <div className="relative rounded-sm overflow-hidden border border-gold-500/25 shadow-luxury bg-navy-950 p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm"
                >
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
                      {activeService.number} / DISCIPLINE
                    </span>
                    <h4 className="text-lg font-serif text-ivory-100 mt-1">
                      {activeService.tagline}
                    </h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
