"use client";

import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Breadcrumbs } from "@/components/editorial/breadcrumbs";
import {
  TableOfContents,
  type TocItem,
} from "@/components/editorial/table-of-contents";
import { Button } from "@/components/ui/button";
import { showcaseProjects } from "@/data/showcase";

export default function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = showcaseProjects.find((p) => p.slug === slug);
  const [toc, setToc] = useState<TocItem[]>([]);

  const related = useMemo(
    () =>
      project
        ? showcaseProjects
            .filter(
              (p) => p.slug !== project.slug && p.category === project.category,
            )
            .slice(0, 3)
        : [],
    [project],
  );

  useEffect(() => {
    if (!project) return;
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".editorial-content h2, .editorial-content h3",
      ),
    );
    const items: TocItem[] = headings
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H3" ? 3 : 2,
      }));
    setToc(items);
  }, [project]);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Proyek tidak ditemukan
          </p>
          <Button asChild variant="link" className="mt-2">
            <Link href="/portfolio">Kembali ke portofolio</Link>
          </Button>
        </div>
      </main>
    );
  }

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <main className="bg-background min-h-screen">
      <section className="pt-24 pb-16 md:pt-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs
              items={[
                { label: "Beranda", href: "/" },
                { label: "Portofolio", href: "/portfolio" },
                { label: project.name },
              ]}
            />

            <header className="mb-8">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs">
                  {project.subcategory}
                </span>
                <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs">
                  {project.category}
                </span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                {project.name}
              </h1>
              <p className="text-muted-foreground mt-3 max-w-3xl text-base md:text-lg">
                {project.description}
              </p>
            </header>

            <div className="border-border/60 mb-10 overflow-hidden rounded-xl border">
              <img
                src={project.cover}
                alt={project.name}
                className="aspect-[16/9] h-full w-full object-cover"
              />
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
              <article className="editorial-content flex max-w-[760px] flex-col gap-10">
                <section>
                  <h2
                    id={slugify("Ringkasan Proyek")}
                    className="mb-3 scroll-mt-24 text-2xl font-semibold tracking-tight"
                  >
                    Ringkasan Proyek
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </section>

                <section>
                  <h2
                    id={slugify("Teknologi")}
                    className="mb-3 scroll-mt-24 text-2xl font-semibold tracking-tight"
                  >
                    Teknologi
                  </h2>
                  <div className="border-border/60 flex items-center gap-3 rounded-lg border p-4">
                    <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                      <Code2 className="text-primary h-4 w-4" />
                    </div>
                    <p className="text-sm">{project.techStack}</p>
                  </div>
                </section>

                <section>
                  <h2
                    id={slugify("Fitur Utama")}
                    className="mb-3 scroll-mt-24 text-2xl font-semibold tracking-tight"
                  >
                    Fitur Utama
                  </h2>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="border-border/60 rounded-lg border px-3 py-2 text-sm"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </section>

                {project.images.length > 1 && (
                  <section>
                    <h2
                      id={slugify("Tampilan Proyek")}
                      className="mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight"
                    >
                      Tampilan Proyek
                    </h2>
                    <div className="flex flex-col gap-4">
                      {project.images.slice(1).map((img, i) => (
                        <figure
                          key={i}
                          className="border-border/60 overflow-hidden rounded-xl border"
                        >
                          <img
                            src={img}
                            alt={`${project.name} - tampilan ${i + 2}`}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </figure>
                      ))}
                    </div>
                  </section>
                )}

                <section className="border-border/60 rounded-xl border p-6 text-center">
                  <h2 className="text-xl font-semibold">
                    Butuh solusi serupa?
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Diskusikan kebutuhan proyek Anda dengan tim Rynex.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <Button asChild>
                      <Link href="/contact">
                        Mulai proyek
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/portfolio">Lihat portofolio lainnya</Link>
                    </Button>
                  </div>
                </section>

                {related.length > 0 && (
                  <section>
                    <h2
                      id={slugify("Proyek Terkait")}
                      className="mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight"
                    >
                      Proyek Terkait
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {related.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/portfolio/${item.slug}`}
                          className="group border-border/60 hover:border-primary/40 overflow-hidden rounded-xl border transition-colors"
                        >
                          <div className="aspect-[16/10] overflow-hidden">
                            <img
                              src={item.cover}
                              alt={item.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                            />
                          </div>
                          <div className="p-4">
                            <p className="group-hover:text-primary font-medium transition-colors">
                              {item.name}
                            </p>
                            <p className="text-muted-foreground mt-1 text-sm">
                              {item.subcategory}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </article>

              <aside className="hidden lg:block">
                <div className="sticky top-24 flex flex-col gap-6">
                  <div className="border-border/60 rounded-xl border p-5">
                    <p className="font-medium">Detail Proyek</p>
                    <dl className="mt-4 flex flex-col gap-2 text-sm">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Kategori</dt>
                        <dd>{project.category}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Subkategori</dt>
                        <dd>{project.subcategory}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Tema</dt>
                        <dd>{project.theme}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Aksen</dt>
                        <dd>{project.accent}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Gaya</dt>
                        <dd className="text-right">{project.style}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="border-border/60 rounded-xl border p-5">
                    <p className="font-medium">Mulai Proyek Serupa</p>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Diskusikan kebutuhan Anda untuk solusi yang sesuai.
                    </p>
                    <Button asChild className="mt-4 w-full">
                      <Link href="/contact">
                        Hubungi Kami
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
