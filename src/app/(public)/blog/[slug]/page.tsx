"use client";

import { Calendar, Clock, Eye, User } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Breadcrumbs } from "@/components/editorial/breadcrumbs";
import { posts } from "@/data/blog";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (!post) return;

    fetch(`/api/blog/views/${slug}`, { method: "POST" });

    const source = new EventSource("/api/blog/views/stream");

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (
          data.views &&
          typeof data.views === "object" &&
          data.views[slug] !== undefined
        ) {
          setViews(data.views[slug]);
        }
      } catch {}
    };

    source.onerror = () => source.close();

    return () => source.close();
  }, [slug, post]);

  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-background min-h-screen">
      <section className="pt-24 pb-16 md:pt-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Beranda", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />

            <header className="mb-8">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                {post.title}
              </h1>
              <p className="text-muted-foreground mt-3 text-base md:text-lg">
                {post.excerpt}
              </p>
              <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime} menit baca
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {views} pembaca
                </span>
              </div>
            </header>

            <div className="border-border/60 mb-10 overflow-hidden rounded-xl border">
              <img
                src={post.cover}
                alt={post.title}
                className="aspect-[16/9] h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <article className="flex flex-col gap-6">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {post.content.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) {
                    return (
                      <h2
                        key={i}
                        className="mt-10 mb-4 text-2xl font-semibold tracking-tight"
                      >
                        {line.slice(3)}
                      </h2>
                    );
                  }
                  if (line.startsWith("### ")) {
                    return (
                      <h3
                        key={i}
                        className="mt-8 mb-3 text-xl font-semibold tracking-tight"
                      >
                        {line.slice(4)}
                      </h3>
                    );
                  }
                  if (line.startsWith("- **")) {
                    const boldMatch = line.match(/- \*\*(.+?)\*\*(.+)/);
                    if (boldMatch) {
                      return (
                        <p key={i} className="mb-2">
                          <strong>{boldMatch[1]}</strong>
                          {boldMatch[2]}
                        </p>
                      );
                    }
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <p key={i} className="mb-1 ml-4">
                        • {line.slice(2)}
                      </p>
                    );
                  }
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={i} className="mb-2 font-semibold">
                        {line.slice(2, -2)}
                      </p>
                    );
                  }
                  if (line.trim() === "") return <br key={i} />;
                  return (
                    <p key={i} className="mb-4 leading-relaxed">
                      {line}
                    </p>
                  );
                })}
              </div>
            </article>

            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-4 text-xl font-semibold">Artikel Terkait</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((item) => (
                    <a
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="group border-border/60 hover:border-primary/40 overflow-hidden rounded-xl border transition-colors"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={item.cover}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                        />
                      </div>
                      <div className="p-4">
                        <p className="group-hover:text-primary line-clamp-2 font-medium transition-colors">
                          {item.title}
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {item.category}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
