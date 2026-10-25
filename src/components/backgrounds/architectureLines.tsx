"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Node {
  x: number;
  y: number;
}

interface Line {
  from: number;
  to: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateArchitecture(): { nodes: Node[]; lines: Line[] } {
  const rand = seededRandom(42);
  const nodes: Node[] = [];
  const lines: Line[] = [];
  const count = 18;

  for (let i = 0; i < count; i++) {
    nodes.push({
      x: 50 + rand() * 900,
      y: 50 + rand() * 600,
    });
  }

  // Connect nearby nodes
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 280 && rand() > 0.4) {
        lines.push({ from: i, to: j });
      }
    }
  }

  return { nodes, lines };
}

export function ArchitectureLines() {
  const { nodes, lines } = useMemo(() => generateArchitecture(), []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      <svg
        viewBox="0 0 1000 700"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Connection lines */}
        {lines.map((line, i) => {
          const from = nodes[line.from];
          const to = nodes[line.to];

          return (
            <motion.line
              key={`l-${i}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(37, 99, 235, 0.05)"
              strokeWidth={1}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2 + (i % 5) * 0.4,
                delay: 0.5 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={`n-${i}`}>
            {/* Outer ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={8}
              fill="none"
              stroke="rgba(37, 99, 235, 0.06)"
              strokeWidth={1}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* Inner dot */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={2.5}
              fill="rgba(37, 99, 235, 0.08)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 1.2 + i * 0.08,
                ease: "easeOut",
              }}
            />
          </motion.g>
        ))}

        {/* Some small square nodes for variety */}
        {nodes
          .filter((_, i) => i % 3 === 0)
          .map((node, i) => (
            <motion.rect
              key={`sq-${i}`}
              x={node.x - 4}
              y={node.y - 4}
              width={8}
              height={8}
              rx={2}
              fill="none"
              stroke="rgba(37, 99, 235, 0.05)"
              strokeWidth={1}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.5 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
      </svg>
    </div>
  );
}
