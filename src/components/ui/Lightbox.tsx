import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/types";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  project,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 backdrop-blur-xl p-4 md:p-8"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-navy-900/80 border border-gold-500/30 text-ivory-100 hover:text-gold-500 hover:border-gold-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous Image"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-navy-900/80 border border-gold-500/30 text-ivory-100 hover:text-gold-500 hover:border-gold-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next Image"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-navy-900/80 border border-gold-500/30 text-ivory-100 hover:text-gold-500 hover:border-gold-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content Container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative overflow-hidden rounded-sm border border-gold-500/25 max-h-[70vh] shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain max-h-[70vh]"
            />
            <span className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-md px-3 py-1 text-xs uppercase tracking-widest text-gold-400 border border-gold-500/30 font-mono">
              {project.tag}
            </span>
          </div>

          <div className="mt-4 text-center max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-500">
              {project.category}
            </span>
            <h3 className="text-xl md:text-2xl font-serif text-ivory-100 mt-1">
              {project.title}
            </h3>
            <p className="text-sm text-ivory-200/70 mt-2">
              {project.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
