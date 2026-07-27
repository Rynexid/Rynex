"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateParticles(count: number, rng: () => number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: rng() * 100,
    y: rng() * 100,
    size: 1.5 + rng() * 2,
    duration: 20 + rng() * 20,
    delay: rng() * -30,
    driftX: (rng() - 0.5) * 60,
    driftY: -20 - rng() * 40,
  }));
}

export function Particles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => generateParticles(35, seededRandom(42)), []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[7] overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: "rgba(37, 99, 235, 0.2)",
          }}
          animate={{
            x: [0, p.driftX * 0.3, p.driftX, p.driftX * 0.5, 0],
            y: [0, p.driftY * 0.3, p.driftY, p.driftY * 0.6, 0],
            opacity: [0, 0.15, 0.2, 0.15, 0],
            scale: [0.8, 1, 1.1, 1, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
