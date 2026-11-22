import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  parallax?: boolean;
  priority?: boolean;
  aspectRatio?: string;
}

export const RevealImage: React.FC<RevealImageProps> = ({
  src,
  alt,
  className = "",
  imageClassName = "",
  parallax = true,
  priority = false,
  aspectRatio = "aspect-[16/10]",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Clip-path reveal: inset(100% 0 0 0) -> inset(0% 0 0 0)
      gsap.fromTo(
        containerRef.current,
        {
          clipPath: "inset(100% 0 0 0)",
        },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.3,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Parallax scale and translation
      if (parallax) {
        gsap.fromTo(
          imgRef.current,
          {
            scale: 1.2,
            yPercent: -6,
          },
          {
            scale: 1.0,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, parallax]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-navy-900 ${aspectRatio} ${className}`}
      style={{ clipPath: reducedMotion ? "none" : "inset(100% 0 0 0)" }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={`w-full h-full object-cover will-change-transform ${imageClassName}`}
      />
      {/* Subtle gold hairline frame edge */}
      <div className="absolute inset-0 border border-gold-500/15 pointer-events-none" />
    </div>
  );
};
