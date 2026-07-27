import dynamic from "next/dynamic";

import { ResponsiveHero } from "@/components/layout/responsiveHero";

const ServicesSection = dynamic(() =>
  import("@/components/rynex/services").then((m) => ({
    default: m.ServicesSection,
  })),
);

const PortfolioSection = dynamic(() =>
  import("@/components/rynex/portfolio").then((m) => ({
    default: m.PortfolioSection,
  })),
);

const HowRynexBuilds = dynamic(() =>
  import("@/components/rynex/howRynexBuildsV2").then((m) => ({
    default: m.HowRynexBuildsV2,
  })),
);

const WhySection = dynamic(() =>
  import("@/components/rynex/why").then((m) => ({
    default: m.WhySection,
  })),
);

const PremiumPricingCards = dynamic(() =>
  import("@/components/rynex/premiumPricingCards").then((m) => ({
    default: m.PremiumPricingCards,
  })),
);

const TestimonialsSection = dynamic(() =>
  import("@/components/rynex/testimonials").then((m) => ({
    default: m.TestimonialsSection,
  })),
);

const BlogHomeSection = dynamic(() =>
  import("@/components/rynex/blogHome").then((m) => ({
    default: m.BlogHomeSection,
  })),
);

const FAQSection = dynamic(() =>
  import("@/components/rynex/faq").then((m) => ({
    default: m.FAQSection,
  })),
);

const CTASection = dynamic(() =>
  import("@/components/rynex/cta").then((m) => ({
    default: m.CTASection,
  })),
);

export default function HomePage() {
  return (
    <>
      <ResponsiveHero />
      <ServicesSection />
      <PortfolioSection />
      <HowRynexBuilds />
      <WhySection />
      <PremiumPricingCards />
      <TestimonialsSection />
      <BlogHomeSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
