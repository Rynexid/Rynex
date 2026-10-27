import { ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Understand",
    description: "Understand the actual problem, goals, and constraints.",
  },
  {
    number: "02",
    title: "Define",
    description: "Clarify the scope and identify a suitable direction.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop the solution with attention to usability and maintainability.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Refine the result and identify opportunities for further improvement.",
  },
];

export function ProcessOverview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
              How We Work
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
              From a real problem to a practical solution
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
              A practical approach focused on what matters.
            </p>
          </div>
          <Link
            href="/about"
            className="text-primary inline-flex items-center gap-2 text-sm font-medium"
          >
            Learn more about Rynex
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="border-border/60 relative rounded-xl border p-5"
            >
              <span className="text-primary/60 absolute top-4 right-4 font-mono text-sm">
                {step.number}
              </span>
              <div className="bg-primary/10 mb-4 flex h-9 w-9 items-center justify-center rounded-lg">
                <span className="text-primary font-mono text-xs">
                  {step.number}
                </span>
              </div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
