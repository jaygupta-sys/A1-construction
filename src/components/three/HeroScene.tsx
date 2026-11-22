import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { VillaModel } from "./VillaModel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const HeroScene: React.FC = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const scrollProgress = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const heroHeight = window.innerHeight;
      scrollProgress.current = Math.min(1.2, Math.max(0, scrollY / heroHeight));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkScreen);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.5, 7.5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Architectural Studio Lighting */}
        <ambientLight intensity={1.3} />
        <hemisphereLight groundColor="#06121E" color="#FFFDF7" intensity={0.9} />
        
        <directionalLight
          position={[10, 14, 8]}
          intensity={2.8}
          color="#FFF4E0"
        />
        <directionalLight
          position={[-10, 6, -5]}
          intensity={1.0}
          color="#8DB0D4"
        />
        <pointLight
          position={[3, 5, 4]}
          intensity={1.5}
          color="#FFE8C2"
        />

        <VillaModel
          mouse={mouse}
          scrollProgress={scrollProgress}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
};
