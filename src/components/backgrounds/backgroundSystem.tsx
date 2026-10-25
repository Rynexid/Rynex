"use client";

import { ArchitectureLines } from "./architectureLines";
import { AuroraGlow } from "./auroraGlow";
import { BlueprintGrid } from "./blueprintGrid";
import { FloatingGeometry } from "./floatingGeometry";
import { Lighting } from "./lighting";
import { NoiseTexture } from "./noiseTexture";
import { Particles } from "./particles";

export function BackgroundSystem() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: "#09090B" }}
      aria-hidden="true"
    >
      <NoiseTexture />
      <BlueprintGrid />
      <ArchitectureLines />
      <FloatingGeometry />
      <AuroraGlow />
      <Particles />
      <Lighting />
    </div>
  );
}
