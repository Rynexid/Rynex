"use client";

import { motion, useSpring } from "framer-motion";

import { useMousePosition } from "@/hooks/useMousePosition";

export function Lighting() {
  const mouse = useMousePosition();

  const springX = useSpring(mouse.normalX * 100, {
    stiffness: 50,
    damping: 30,
    mass: 1,
  });
  const springY = useSpring(mouse.normalY * 100, {
    stiffness: 50,
    damping: 30,
    mass: 1,
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-[8] overflow-hidden">
      {/* Static center spotlight */}
      <div
        className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(37, 99, 235, 0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Mouse-following subtle glow */}
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.03) 0%, transparent 60%)",
          filter: "blur(60px)",
          left: 0,
          top: 0,
        }}
      />
    </div>
  );
}
