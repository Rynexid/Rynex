"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Shape {
  type: "cube" | "hexagon" | "ring" | "diamond";
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateShapes(): Shape[] {
  const rand = seededRandom(123);
  const shapes: Shape[] = [];
  const types: Shape["type"][] = ["cube", "hexagon", "ring", "diamond"];
  const count = 12;

  for (let i = 0; i < count; i++) {
    shapes.push({
      type: types[i % types.length],
      x: 5 + rand() * 90,
      y: 5 + rand() * 90,
      size: 40 + rand() * 80,
      rotation: rand() * 360,
      duration: 25 + rand() * 20,
      delay: rand() * 5,
    });
  }
  return shapes;
}

function CubeWireframe({ size }: { size: number }) {
  const s = size;
  const offset = s * 0.3;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {/* Front face */}
      <rect
        x={offset * 0.5}
        y={offset * 0.5}
        width={s - offset}
        height={s - offset}
        rx={4}
        fill="none"
        stroke="rgba(37, 99, 235, 0.08)"
        strokeWidth={1}
      />
      {/* Back face (offset) */}
      <rect
        x={offset * 0.5 + offset * 0.4}
        y={offset * 0.5 - offset * 0.3}
        width={s - offset}
        height={s - offset}
        rx={4}
        fill="none"
        stroke="rgba(37, 99, 235, 0.05)"
        strokeWidth={1}
      />
      {/* Connecting edges */}
      <line
        x1={offset * 0.5}
        y1={offset * 0.5}
        x2={offset * 0.5 + offset * 0.4}
        y2={offset * 0.5 - offset * 0.3}
        stroke="rgba(37, 99, 235, 0.04)"
        strokeWidth={1}
      />
      <line
        x1={s - offset * 0.5}
        y1={offset * 0.5}
        x2={s - offset * 0.5 + offset * 0.4}
        y2={offset * 0.5 - offset * 0.3}
        stroke="rgba(37, 99, 235, 0.04)"
        strokeWidth={1}
      />
      <line
        x1={s - offset * 0.5}
        y1={s - offset * 0.5}
        x2={s - offset * 0.5 + offset * 0.4}
        y2={s - offset * 0.5 - offset * 0.3}
        stroke="rgba(37, 99, 235, 0.04)"
        strokeWidth={1}
      />
      <line
        x1={offset * 0.5}
        y1={s - offset * 0.5}
        x2={offset * 0.5 + offset * 0.4}
        y2={s - offset * 0.5 - offset * 0.3}
        stroke="rgba(37, 99, 235, 0.04)"
        strokeWidth={1}
      />
    </svg>
  );
}

function HexagonWireframe({ size }: { size: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.4;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={points}
        fill="none"
        stroke="rgba(37, 99, 235, 0.07)"
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RingWireframe({ size }: { size: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.35;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(37, 99, 235, 0.06)"
        strokeWidth={1}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.6}
        fill="none"
        stroke="rgba(37, 99, 235, 0.04)"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
    </svg>
  );
}

function DiamondWireframe({ size }: { size: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.35;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon
        points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
        fill="none"
        stroke="rgba(37, 99, 235, 0.06)"
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  );
}

const shapeComponents: Record<Shape["type"], FC<{ size: number }>> = {
  cube: CubeWireframe,
  hexagon: HexagonWireframe,
  ring: RingWireframe,
  diamond: DiamondWireframe,
};

import type { FC } from "react";

export function FloatingGeometry() {
  const shapes = useMemo(() => generateShapes(), []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {shapes.map((shape, i) => {
        const ShapeComponent = shapeComponents[shape.type];
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              filter: "blur(1px)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.04, 0.04, 0],
              scale: [0.8, 1, 1, 0.9],
              rotate: [
                shape.rotation,
                shape.rotation + 15,
                shape.rotation + 15,
                shape.rotation,
              ],
              y: [0, -20, -20, 0],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ShapeComponent size={shape.size} />
          </motion.div>
        );
      })}
    </div>
  );
}
