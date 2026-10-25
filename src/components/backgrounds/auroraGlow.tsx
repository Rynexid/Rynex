"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AuroraGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[6] overflow-hidden"
    >
      {/* Top-left blue */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Bottom-right purple */}
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(79, 70, 229, 0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Center soft cyan */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1, ease: "easeOut" }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
      </motion.div>
    </div>
  );
}
