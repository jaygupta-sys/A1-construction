import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface MaskTextProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}

export const MaskText: React.FC<MaskTextProps> = ({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  triggerOnScroll = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const lineElements = containerRef.current.querySelectorAll(".mask-line-inner");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: triggerOnScroll
          ? {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          : undefined,
        delay: delay,
      });

      tl.fromTo(
        lineElements,
        {
          yPercent: 115,
          opacity: 0,
          rotateZ: 0.5,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.09,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, delay, triggerOnScroll]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-1">
          <span
            className={`mask-line-inner inline-block will-change-transform ${lineClassName}`}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </span>
      ))}
    </div>
  );
};
