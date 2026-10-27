import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function PhilosophyPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
              Philosophy
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
              Good technology starts with good decisions
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
              Purpose over complexity, practical engineering, built to evolve.
            </p>
          </div>
          <Link
            href="/about"
            className="text-primary inline-flex items-center gap-2 text-sm font-medium"
          >
            More about Rynex
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="border-border/60 relative overflow-hidden rounded-xl border p-6 md:p-8">
            <div className="bg-primary/5 absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl" />
            <div className="relative">
              <div className="bg-primary/10 mb-5 flex h-10 w-10 items-center justify-center rounded-lg">
                <Sparkles className="text-primary h-5 w-5" />
              </div>
              <p className="text-primary font-mono text-sm tracking-widest uppercase">
                CREATE. CONQUER. CONTINUE!
              </p>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Create to start building, conquer to meet challenges with
                discipline, and continue to learn and refine.
              </p>
            </div>
          </article>
          <article className="border-border/60 relative overflow-hidden rounded-xl border p-6 md:p-8">
            <div className="bg-primary/5 absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl" />
            <div className="relative">
              <div className="bg-primary/10 mb-5 flex h-10 w-10 items-center justify-center rounded-lg">
                <ArrowRight className="text-primary h-5 w-5" />
              </div>
              <p className="text-primary font-mono text-sm tracking-widest uppercase">
                NO LIMITS. JUST BUILD!
              </p>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Turn ideas into something real by understanding constraints and
                building practical solutions.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
