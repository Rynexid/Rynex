"use client";

export function NoiseTexture() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      {/* SVG noise filter */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="rynex-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="absolute inset-0"
        style={{
          filter: "url(#rynex-noise)",
          opacity: 0.03,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
