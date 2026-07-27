"use client";

import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Step-specific background SVGs                                      */
/* ------------------------------------------------------------------ */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function DiscoverBg() {
  const rand = seededRandom(100);
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Scattered dots - research notes */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.circle
          key={i}
          cx={80 + rand() * 640}
          cy={60 + rand() * 480}
          r={1.5 + rand() * 2}
          fill="rgba(37, 99, 235, 0.06)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.03, duration: 0.5 }}
        />
      ))}
      {/* Connecting lines - business flow */}
      {[
        [120, 150, 300, 120],
        [300, 120, 450, 180],
        [450, 180, 600, 140],
        [150, 300, 350, 280],
        [350, 280, 500, 320],
        [500, 320, 650, 290],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(37, 99, 235, 0.05)"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: EASE }}
        />
      ))}
      {/* Small squares - sticky notes */}
      {[
        [100, 120],
        [280, 100],
        [460, 160],
        [620, 120],
        [180, 280],
        [380, 260],
        [520, 300],
      ].map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x}
          y={y}
          width={20 + rand() * 15}
          height={20 + rand() * 15}
          rx={3}
          fill="none"
          stroke="rgba(37, 99, 235, 0.05)"
          strokeWidth={1}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: EASE }}
        />
      ))}
    </svg>
  );
}

function ArchitectureBg() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Layered boxes - system layers */}
      {[
        { x: 150, y: 100, w: 500, h: 70, label: "Frontend" },
        { x: 150, y: 200, w: 500, h: 70, label: "API Gateway" },
        { x: 150, y: 300, w: 500, h: 70, label: "Services" },
        { x: 150, y: 400, w: 500, h: 70, label: "Database" },
      ].map((box, i) => (
        <motion.g key={i}>
          <motion.rect
            x={box.x}
            y={box.y}
            width={box.w}
            height={box.h}
            rx={8}
            fill="none"
            stroke="rgba(37, 99, 235, 0.06)"
            strokeWidth={1}
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: EASE }}
          />
          <motion.text
            x={box.x + 20}
            y={box.y + box.h / 2 + 4}
            fill="rgba(37, 99, 235, 0.08)"
            fontSize={11}
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
          >
            {box.label}
          </motion.text>
        </motion.g>
      ))}
      {/* Vertical connectors */}
      {[250, 400, 550].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1={170}
          x2={x}
          y2={200}
          stroke="rgba(37, 99, 235, 0.05)"
          strokeWidth={1}
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
        />
      ))}
    </svg>
  );
}

function EngineeringDesignBg() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* UML-like shapes */}
      {/* Sequence diagram vertical lifelines */}
      {[200, 350, 500, 650].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1={80}
          x2={x}
          y2={500}
          stroke="rgba(37, 99, 235, 0.04)"
          strokeWidth={1}
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }}
        />
      ))}
      {/* Horizontal messages */}
      {[
        [200, 150, 350, 150],
        [350, 220, 500, 220],
        [500, 290, 200, 290],
        [200, 360, 650, 360],
        [650, 430, 350, 430],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(37, 99, 235, 0.05)"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: EASE }}
        />
      ))}
      {/* ERD-like entity boxes */}
      {[
        { x: 80, y: 80, w: 90, h: 50 },
        { x: 630, y: 80, w: 90, h: 50 },
        { x: 80, y: 470, w: 90, h: 50 },
        { x: 630, y: 470, w: 90, h: 50 },
      ].map((box, i) => (
        <motion.rect
          key={i}
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          rx={4}
          fill="none"
          stroke="rgba(37, 99, 235, 0.06)"
          strokeWidth={1}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: EASE }}
        />
      ))}
    </svg>
  );
}

function ExperienceBg() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Figma-like frame outlines */}
      {[
        { x: 100, y: 80, w: 250, h: 180, r: 8 },
        { x: 400, y: 80, w: 300, h: 180, r: 8 },
        { x: 100, y: 300, w: 180, h: 220, r: 8 },
        { x: 320, y: 300, w: 380, h: 220, r: 8 },
      ].map((frame, i) => (
        <motion.rect
          key={i}
          x={frame.x}
          y={frame.y}
          width={frame.w}
          height={frame.h}
          rx={frame.r}
          fill="none"
          stroke="rgba(37, 99, 235, 0.05)"
          strokeWidth={1}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
        />
      ))}
      {/* Component blocks inside frames */}
      {[
        [120, 110, 80, 30],
        [120, 155, 120, 20],
        [120, 190, 60, 20],
        [420, 110, 100, 80],
        [540, 110, 140, 80],
        [420, 210, 260, 30],
      ].map(([x, y, w, h], i) => (
        <motion.rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          rx={4}
          fill="rgba(37, 99, 235, 0.03)"
          stroke="rgba(37, 99, 235, 0.04)"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
        />
      ))}
      {/* Layout grid lines */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.line
          key={`h-${i}`}
          x1={320}
          y1={320 + i * 50}
          x2={680}
          y2={320 + i * 50}
          stroke="rgba(37, 99, 235, 0.03)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

function DevelopmentBg() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Code-like lines - syntax pattern */}
      {Array.from({ length: 20 }, (_, i) => {
        const y = 80 + i * 25;
        const indent = [
          0, 1, 2, 1, 2, 3, 2, 1, 0, 1, 2, 1, 0, 1, 2, 3, 2, 1, 0, 1,
        ][i];
        const w = [
          200, 160, 180, 120, 140, 100, 160, 180, 220, 150, 130, 170, 200, 160,
          120, 90, 150, 180, 210, 170,
        ][i];
        return (
          <motion.rect
            key={i}
            x={120 + indent * 25}
            y={y}
            width={w}
            height={4}
            rx={2}
            fill={
              i % 5 === 0
                ? "rgba(37, 99, 235, 0.06)"
                : i % 3 === 0
                  ? "rgba(16, 185, 129, 0.04)"
                  : "rgba(37, 99, 235, 0.03)"
            }
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
          />
        );
      })}
      {/* Terminal prompt symbols */}
      {[80, 160, 240, 320, 400].map((y, i) => (
        <motion.text
          key={i}
          x={100}
          y={y}
          fill="rgba(37, 99, 235, 0.06)"
          fontSize={10}
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.08 }}
        >
          $
        </motion.text>
      ))}
    </svg>
  );
}

function SecurityBg() {
  const hexPoints = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Shield outline */}
      <motion.path
        d="M400 80 L520 140 L520 300 C520 400 460 460 400 500 C340 460 280 400 280 300 L280 140 Z"
        fill="none"
        stroke="rgba(37, 99, 235, 0.06)"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: EASE }}
      />
      {/* Hexagon grid */}
      {[
        [150, 150],
        [650, 150],
        [150, 450],
        [650, 450],
        [100, 300],
        [700, 300],
      ].map(([cx, cy], i) => (
        <motion.polygon
          key={i}
          points={hexPoints(cx, cy, 40)}
          fill="none"
          stroke="rgba(37, 99, 235, 0.04)"
          strokeWidth={1}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: EASE }}
        />
      ))}
      {/* Circuit board traces */}
      {[
        [200, 200, 350, 200],
        [350, 200, 350, 350],
        [350, 350, 450, 350],
        [600, 200, 450, 200],
        [450, 200, 450, 350],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(37, 99, 235, 0.04)"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: EASE }}
        />
      ))}
      {/* Lock symbol hint */}
      <motion.rect
        x={385}
        y={260}
        width={30}
        height={25}
        rx={4}
        fill="none"
        stroke="rgba(37, 99, 235, 0.05)"
        strokeWidth={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      <motion.path
        d="M393 260 L393 250 C393 243 407 243 407 250 L407 260"
        fill="none"
        stroke="rgba(37, 99, 235, 0.05)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.4, duration: 0.5, ease: EASE }}
      />
    </svg>
  );
}

function DeploymentBg() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Cloud shapes */}
      {[
        { cx: 200, cy: 150, rx: 80, ry: 40 },
        { cx: 600, cy: 120, rx: 70, ry: 35 },
        { cx: 400, cy: 100, rx: 60, ry: 30 },
      ].map((cloud, i) => (
        <motion.ellipse
          key={i}
          cx={cloud.cx}
          cy={cloud.cy}
          rx={cloud.rx}
          ry={cloud.ry}
          fill="none"
          stroke="rgba(37, 99, 235, 0.05)"
          strokeWidth={1}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15, duration: 0.6, ease: EASE }}
        />
      ))}
      {/* Server nodes */}
      {[
        { x: 150, y: 250 },
        { x: 350, y: 250 },
        { x: 550, y: 250 },
      ].map((node, i) => (
        <motion.rect
          key={i}
          x={node.x}
          y={node.y}
          width={80}
          height={50}
          rx={6}
          fill="none"
          stroke="rgba(37, 99, 235, 0.06)"
          strokeWidth={1}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: EASE }}
        />
      ))}
      {/* Connection lines - pipeline */}
      {[
        [190, 300, 350, 300],
        [390, 300, 550, 300],
        [190, 300, 190, 150],
        [390, 300, 400, 100],
        [590, 300, 600, 120],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(37, 99, 235, 0.04)"
          strokeWidth={1}
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: EASE }}
        />
      ))}
      {/* Monitoring graph hint */}
      <motion.polyline
        points="100,450 180,420 260,440 340,400 420,410 500,380 580,390 660,360 740,370"
        fill="none"
        stroke="rgba(16, 185, 129, 0.05)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 1.5, ease: EASE }}
      />
    </svg>
  );
}

function GrowthBg() {
  const rand = seededRandom(777);
  const bars = [30, 45, 38, 55, 50, 70, 65, 85, 80, 95];

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Bar chart */}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={100 + i * 55}
          y={500 - h * 3}
          width={35}
          height={h * 3}
          rx={4}
          fill="rgba(37, 99, 235, 0.04)"
          stroke="rgba(37, 99, 235, 0.05)"
          strokeWidth={1}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: EASE }}
          style={{ transformOrigin: "bottom" }}
        />
      ))}
      {/* Growth line */}
      <motion.polyline
        points="117,410 172,365 227,386 282,335 337,350 392,290 447,305 502,245 557,260 612,200"
        fill="none"
        stroke="rgba(37, 99, 235, 0.07)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 2, ease: EASE }}
      />
      {/* Data points */}
      {[
        [117, 410],
        [227, 386],
        [337, 350],
        [447, 305],
        [557, 260],
        [612, 200],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={3}
          fill="rgba(37, 99, 235, 0.1)"
          stroke="rgba(37, 99, 235, 0.08)"
          strokeWidth={1}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.3, ease: EASE }}
        />
      ))}
      {/* Network expansion dots */}
      {Array.from({ length: 15 }, (_, i) => {
        const x = 100 + rand() * 600;
        const y = 80 + rand() * 120;
        return (
          <motion.circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r={1 + rand() * 1.5}
            fill="rgba(37, 99, 235, 0.05)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.04, duration: 0.4 }}
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Background registry                                                */
/* ------------------------------------------------------------------ */

const sectionBackgrounds: Record<string, FC> = {
  Discover: DiscoverBg,
  Architecture: ArchitectureBg,
  "Engineering Design": EngineeringDesignBg,
  Experience: ExperienceBg,
  Development: DevelopmentBg,
  Security: SecurityBg,
  Deployment: DeploymentBg,
  Growth: GrowthBg,
};

const stepOrder = [
  "Discover",
  "Architecture",
  "Engineering Design",
  "Experience",
  "Development",
  "Security",
  "Deployment",
  "Growth",
];

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

import type { FC } from "react";

interface SectionBackgroundsProps {
  activeStep: number;
}

export function SectionBackgrounds({ activeStep }: SectionBackgroundsProps) {
  const activeTitle = stepOrder[activeStep] ?? stepOrder[0];
  const BgComponent = sectionBackgrounds[activeTitle];

  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      <AnimatePresence mode="wait">
        {BgComponent && (
          <motion.div
            key={activeTitle}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <BgComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
