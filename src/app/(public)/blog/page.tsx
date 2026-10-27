"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BlogCard } from "@/components/blog/card";
import { Breadcrumbs } from "@/components/editorial/breadcrumbs";
import { posts } from "@/data/blog";

export default function BlogPage() {
  const [liveViews, setLiveViews] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/blog/views")
      .then((res) => res.json())
      .then((data) => setLiveViews(data.views ?? {}))
      .catch(() => {});

    const source = new EventSource("/api/blog/views/stream");

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.views && typeof data.views === "object") {
          setLiveViews(data.views);
        }
      } catch {}
    };

    source.onerror = () => source.close();
    return () => source.close();
  }, []);

  return (
    <main className="bg-background min-h-screen">
      <section className="pt-24 pb-16 md:pt-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs
              items={[{ label: "Beranda", href: "/" }, { label: "Blog" }]}
            />

            <header className="mb-10">
              <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                Blog
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Artikel & Wawasan
              </h1>
              <p className="text-muted-foreground mt-3 max-w-2xl text-base">
                Panduan praktis seputar pengembangan web, desain digital, dan
                strategi bisnis.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  index={0}
                  realtimeViews={liveViews[post.slug]}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
