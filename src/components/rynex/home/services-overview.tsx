import { ArrowRight, Code2, Layers, Server } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Code2,
    title: "Website & Web Application",
    description:
      "Clear, responsive websites and web apps built for performance and usability.",
    href: "/services",
  },
  {
    icon: Layers,
    title: "Custom Software Development",
    description:
      "Solutions shaped around your workflows, data, and specific business needs.",
    href: "/services",
  },
  {
    icon: Server,
    title: "System Architecture, Deployment & Support",
    description:
      "Pragmatic architecture, deployment, and maintenance to keep things reliable.",
    href: "/services",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
              Services
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
              Built around the problems that matter
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
              From websites and custom applications to infrastructure and
              technical support.
            </p>
          </div>
          <Link
            href="/services"
            className="text-primary inline-flex items-center gap-2 text-sm font-medium"
          >
            Explore All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`border-border/60 hover:border-primary/40 group relative rounded-xl border p-5 transition-colors ${
                index === 0 ? "md:col-span-2" : ""
              }`}
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
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
