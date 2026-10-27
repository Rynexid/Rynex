"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Layers, Server, ShieldCheck } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Code2,
    title: "Website Development",
    description:
      "Websites designed to communicate clearly, support your goals, and provide a reliable experience across devices.",
    href: "/contact",
  },
  {
    icon: Layers,
    title: "Web Application Development",
    description:
      "Web applications tailored to your workflows, users, and operational requirements.",
    href: "/contact",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Software solutions shaped around specific problems, processes, and business requirements.",
    href: "/contact",
  },
  {
    icon: Layers,
    title: "System Architecture",
    description:
      "Technical planning that helps applications and systems remain understandable, maintainable, and ready to evolve.",
    href: "/contact",
  },
  {
    icon: Server,
    title: "Deployment & Infrastructure",
    description:
      "Support for deploying applications and configuring infrastructure based on the requirements of your project.",
    href: "/contact",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & Technical Support",
    description:
      "Technical assistance to help maintain, troubleshoot, and improve existing digital solutions.",
    href: "/contact",
  },
];

export function ServicesGrid() {
  return (
    <section id="service-directory" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl">
          <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
            Service Directory
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Services we can help with
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Focused on practical solutions. Pick what fits your needs and we can
            discuss the right approach.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border-border/60 group hover:border-primary/40 relative rounded-xl border p-5 transition-colors"
            >
              <div className="bg-primary/10 mb-4 flex h-9 w-9 items-center justify-center rounded-lg">
                <service.icon className="text-primary h-4 w-4" />
              </div>
              <h3 className="font-medium">{service.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4">
                <Link
                  href={service.href}
                  className="text-primary inline-flex items-center gap-1.5 text-sm font-medium"
                >
                  Discuss this service
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
