"use client";

import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalX: number;
  normalY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalX: 0,
    normalY: 0,
  });
  const rafRef = useRef<number>(0);
  const latestEvent = useRef<MouseEvent | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      latestEvent.current = e;
    };

    const tick = () => {
      if (latestEvent.current) {
        const e = latestEvent.current;
        const x = e.clientX;
        const y = e.clientY;
        setPosition({
          x,
          y,
          normalX: x / window.innerWidth,
          normalY: y / window.innerHeight,
        });
        latestEvent.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return position;
}
