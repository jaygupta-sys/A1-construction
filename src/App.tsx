import React, { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Preloader } from "@/components/sections/Preloader";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const App: React.FC = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Initialize Lenis smooth scrolling synced with GSAP
  useLenis();

  // Support initial hash deep-linking
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "auto" });
        }
      }, 200);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-navy-950 text-ivory-100 selection:bg-gold-500 selection:text-navy-950">
      {/* Cinematic Film Grain Overlay */}
      <GrainOverlay />

      {/* Cinematic Preloader (<=2s, skips on repeat visits) */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Fixed Sticky Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main>
        {/* Section 1: Hero with 3D Centerpiece */}
        <Hero />

        {/* Section 2: Trust & Experience (Editorial Stats + Line Draw) */}
        <Stats />

        {/* Section 3: About (Craftsmanship & Responsibility) */}
        <About />

        {/* Section 4: Architectural Services (01 - 05) */}
        <Services />

        {/* Section 5: Project Showcase (Asymmetrical Editorial Grid + Lightbox) */}
        <Projects />

        {/* Section 6: Why Choose A1 (Sticky Split Points) */}
        <WhyChooseUs />

        {/* Section 7: Brand Statement (Pinned Cinematic Viewport) */}
        <BrandStatement />

        {/* Section 8: Contact & WhatsApp Conversion Form */}
        <Contact />
      </main>

      {/* Section 9: Luxury Footer */}
      <Footer />
    </div>
  );
};

export default App;
