import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { COMPANY } from "@/data/company";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Why A1", href: "#why-a1" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNavHidden = scrollDirection === "down" && !isAtTop && !mobileMenuOpen;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isNavHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isAtTop
            ? "bg-transparent py-5 md:py-7"
            : "bg-navy-950/85 backdrop-blur-md border-b border-gold-500/15 py-3.5 shadow-luxury"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-sm"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 relative overflow-hidden flex items-center justify-center">
              <img
                src="/logo/logo.png"
                alt="A1 Construction"
                className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(197,164,109,0.25)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-ivory-100 group-hover:text-gold-400 transition-colors">
                {COMPANY.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold-500/80 font-mono -mt-0.5">
                Hosadurga
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative py-1 text-xs uppercase tracking-widest text-ivory-100/85 hover:text-gold-400 font-medium transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-orange-construction hover:bg-orange-hover text-ivory-100 font-medium text-xs uppercase tracking-wider shadow-lg shadow-orange-construction/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Discuss Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden p-2 rounded-sm text-ivory-100 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-navy-950 flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-ultra text-gold-500 font-mono">
                Menu Navigation
              </span>
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    className="font-serif text-3xl text-ivory-100 hover:text-gold-400 transition-colors flex items-center justify-between border-b border-gold-500/10 pb-3"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-gold-500/50">0{idx + 1}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Footer with direct Call and WhatsApp */}
            <div className="pt-6 border-t border-gold-500/20 flex flex-col gap-3">
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-sm border border-gold-500/40 text-gold-400 text-sm font-medium hover:bg-gold-500/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 8904830461</span>
              </a>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-orange-construction text-ivory-100 text-sm font-medium hover:bg-orange-hover transition-colors shadow-lg"
              >
                <span>WhatsApp Us Directly</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
