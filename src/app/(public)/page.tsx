import dynamic from "next/dynamic";

import { ResponsiveHero } from "@/components/layout/responsiveHero";

const ServicesOverview = dynamic(() =>
  import("@/components/rynex/home/services-overview").then((m) => ({
    default: m.ServicesOverview,
  })),
);

const ProductsPreview = dynamic(() =>
  import("@/components/rynex/home/products-preview").then((m) => ({
    default: m.ProductsPreview,
  })),
);

const PortfolioSection = dynamic(() =>
  import("@/components/rynex/portfolio").then((m) => ({
    default: m.PortfolioSection,
  })),
);

const ProcessOverview = dynamic(() =>
  import("@/components/rynex/home/process-overview").then((m) => ({
    default: m.ProcessOverview,
  })),
);

const PhilosophyPreview = dynamic(() =>
  import("@/components/rynex/home/philosophy-preview").then((m) => ({
    default: m.PhilosophyPreview,
  })),
);

const HomeCta = dynamic(() =>
  import("@/components/rynex/home/home-cta").then((m) => ({
    default: m.HomeCta,
  })),
);

export default function HomePage() {
  return (
    <>
      <ResponsiveHero />
      <ServicesOverview />
      <ProductsPreview />
      <PortfolioSection />
      <ProcessOverview />
      <PhilosophyPreview />
      <HomeCta />
    </>
  );
}
