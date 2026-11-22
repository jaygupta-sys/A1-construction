import React from "react";
import { ArrowUp, Phone, MapPin } from "lucide-react";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-navy-950 text-ivory-100 pt-20 pb-12 overflow-hidden border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-gold-500/15">
          {/* Brand & Tagline (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 relative overflow-hidden flex items-center justify-center">
                <img
                  src="/logo/logo.png"
                  alt="A1 Construction"
                  className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_10px_rgba(197,164,109,0.3)]"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-ivory-100 block">
                  {COMPANY.name}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
                  Hosadurga, Karnataka
                </span>
              </div>
            </div>

            <p className="text-sm text-ivory-200/70 font-light leading-relaxed max-w-sm mb-6">
              A quarter-century legacy of delivering residential architecture and structural strength with honesty and accountability.
            </p>

            <div className="p-4 rounded-sm bg-navy-900/60 border border-gold-500/20 max-w-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block mb-1">
                OUR COMMITMENT
              </span>
              <p className="text-sm font-serif italic text-ivory-100">
                "{COMPANY.tagline}"
              </p>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-ultra font-mono text-gold-500 block mb-4">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => handleLinkClick(e, "#hero")}
                  className="text-ivory-200/70 hover:text-gold-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, "#about")}
                  className="text-ivory-200/70 hover:text-gold-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, "#services")}
                  className="text-ivory-200/70 hover:text-gold-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => handleLinkClick(e, "#projects")}
                  className="text-ivory-200/70 hover:text-gold-400 transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#why-a1"
                  onClick={(e) => handleLinkClick(e, "#why-a1")}
                  className="text-ivory-200/70 hover:text-gold-400 transition-colors"
                >
                  Why A1
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="text-ivory-200/70 hover:text-gold-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services (3 cols) */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-ultra font-mono text-gold-500 block mb-4">
              SERVICES
            </span>
            <ul className="space-y-2 text-xs text-ivory-200/70 font-light">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleLinkClick(e, "#services")}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Reach (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-ultra font-mono text-gold-500 block mb-4">
              LOCATION
            </span>
            <div className="flex items-start gap-2.5 text-xs text-ivory-200/70 mb-3">
              <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
              <span>Hosadurga, Karnataka & surrounding regions</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-ivory-200/70">
              <Phone className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
              <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-gold-400 font-mono">
                +91 8904830461
              </a>
            </div>
          </div>
        </div>

        {/* Huge Outlined Wordmark */}
        <div className="py-12 select-none overflow-hidden text-center">
          <span
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight block leading-none"
            style={{
              WebkitTextStroke: "1px rgba(197, 164, 109, 0.25)",
              color: "transparent",
            }}
          >
            A1 CONSTRUCTION
          </span>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gold-500/10 text-xs font-mono text-ivory-200/50">
          <p>© {currentYear} A1 Construction. All rights reserved.</p>

          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors group"
          >
            <span>Back to top</span>
            <div className="p-1.5 rounded-full border border-gold-500/30 group-hover:border-gold-500 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
