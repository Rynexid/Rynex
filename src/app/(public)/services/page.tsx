import { CTA } from "@/components/services/cta";
import { Deliverables } from "@/components/services/deliverables";
import { FAQ } from "@/components/services/faq";
import { Hero } from "@/components/services/hero";
import { Industry } from "@/components/services/industry";
import { Principles } from "@/components/services/principles";
import { Process } from "@/components/services/process";
import { Security } from "@/components/services/security";
import { ServicesGrid } from "@/components/services/services-grid";
import { Technology } from "@/components/services/technology";
import { Trust } from "@/components/services/trust";
import { WhyRynex } from "@/components/services/whyRynex";

export default function ServicesPage() {
  return (
    <>
      <Hero />
      <WhyRynex />
      <Trust />
      <ServicesGrid />
      <Process />
      <Principles />
      <Security />
      <Technology />
      <Deliverables />
      <Industry />
      <FAQ />
      <CTA />
    </>
  );
}
