import { CTA } from "@/components/services/cta";
import { FAQ } from "@/components/services/faq";
import { Hero } from "@/components/services/hero";
import { Industry } from "@/components/services/industry";
import { Process } from "@/components/services/process";
import { ServicesGrid } from "@/components/services/services-grid";
import { Technology } from "@/components/services/technology";
import { WhyRynex } from "@/components/services/whyRynex";

export default function ServicesPage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyRynex />
      <Process />
      <Technology />
      <Industry />
      <FAQ />
      <CTA />
    </>
  );
}
