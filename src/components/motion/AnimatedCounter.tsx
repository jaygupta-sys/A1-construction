import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2.2,
  className = "",
}) => {
  const [count, setCount] = useState(0);
  const elRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setCount(end);
      return;
    }

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: elRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: end,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
              setCount(Math.floor(obj.val));
            },
          });
        },
      });
    }, elRef);

    return () => ctx.revert();
  }, [end, duration, reducedMotion]);

  return (
    <span ref={elRef} className={`font-serif tracking-tight ${className}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
