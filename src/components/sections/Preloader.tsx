import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check sessionStorage or URL param to skip on repeat visits / testing
    const params = new URLSearchParams(window.location.search);
    if (params.get("nopreloader") || sessionStorage.getItem("a1_preloader_seen")) {
      setIsVisible(false);
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("a1_preloader_seen", "true");
            onComplete();
          }, 350);
          return 100;
        }
        return prev + 2;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-navy-950 text-ivory-100 select-none"
      >
        <div className="flex flex-col items-center text-center max-w-sm px-6">
          {/* Logo container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-28 h-28 mb-4 relative"
          >
            <img
              src="/logo/logo.png"
              alt="A1 Construction"
              className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_20px_rgba(197,164,109,0.35)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-ultra text-gold-500 font-mono mb-2"
          >
            A1 CONSTRUCTION
          </motion.div>

          <div className="font-serif text-3xl font-light text-ivory-100 tabular-nums">
            {count}%
          </div>

          {/* Gold Drawing Line */}
          <div className="w-48 h-[1px] bg-navy-800 mt-6 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold-500"
              style={{ width: `${count}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <p className="text-[11px] uppercase tracking-widest text-ivory-200/50 mt-4">
            Crafting Legacies · Hosadurga
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
