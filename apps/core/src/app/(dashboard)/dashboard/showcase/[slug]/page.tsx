"use client";

import {
  ArrowLeft,
  Check,
  Code,
  Layers,
  Palette,
  Puzzle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { showcaseProjects } from "@/data/showcase";
import { Card, CardContent, CardHeader, CardTitle } from "@rynex/ui/card";

export default function ShowcaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = showcaseProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-[#e5e1e4]">Project tidak ditemukan</p>
          <Link
            href="/dashboard/showcase"
            className="text-sm text-[#adc6ff] hover:underline"
          >
            Kembali ke Showcase
          </Link>
        </div>
      </div>
    );
  }

  const Icon = project.icon;

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Back */}
      <Link
        href="/dashboard/showcase"
        className="inline-flex items-center gap-2 text-sm text-[#8c909f] transition-colors hover:text-[#e5e1e4]"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Showcase
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1c1b1d]">
          <Icon className="h-7 w-7 text-[#adc6ff]" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[#e5e1e4]">
            {project.name}
          </h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            {project.subcategory} &middot; {project.theme} &middot;{" "}
            {project.accent}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="max-w-3xl text-sm leading-relaxed text-[#c2c6d6]">
        {project.description}
      </p>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-[rgba(173,198,255,0.1)] px-3 py-1 text-xs font-medium text-[#adc6ff]">
          {project.category}
        </span>
        <span className="rounded-full bg-[rgba(255,185,95,0.1)] px-3 py-1 text-xs font-medium text-[#ffb95f]">
          {project.theme}
        </span>
        <span className="rounded-full bg-[rgba(74,225,118,0.1)] px-3 py-1 text-xs font-medium text-[#4ae176]">
          {project.style}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tech Stack */}
        <Card className="border-border/50 bg-[#111113]">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#e5e1e4]">
              <Code className="h-4 w-4 text-[#adc6ff]" />
              Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#c2c6d6]">{project.techStack}</p>
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card className="border-border/50 bg-[#111113]">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#e5e1e4]">
              <Sparkles className="h-4 w-4 text-[#ffb95f]" />
              Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-lg bg-[#1c1b1d] px-3 py-1.5 text-xs text-[#c2c6d6]"
                >
                  {h}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pages */}
      <Card className="border-border/50 bg-[#111113]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#e5e1e4]">
            <Layers className="h-4 w-4 text-[#4ae176]" />
            Struktur Halaman
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {project.pages.map((page, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-lg border border-[#27272A] bg-[#1c1b1d] p-3"
              >
                <code className="shrink-0 rounded bg-[#111113] px-2 py-1 text-xs font-medium text-[#adc6ff]">
                  {page.route}
                </code>
                <p className="text-xs leading-relaxed text-[#c2c6d6]">
                  {page.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Components */}
      <Card className="border-border/50 bg-[#111113]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#e5e1e4]">
            <Puzzle className="h-4 w-4 text-[#ffb4ab]" />
            Komponen UI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {project.components.map((comp, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4ae176]" />
                <span className="text-sm text-[#c2c6d6]">{comp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prompt Reference */}
      <Card className="border-border/50 bg-[#111113]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[#e5e1e4]">
            <Palette className="h-4 w-4 text-[#8c909f]" />
            Referensi Prompt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-[#0a0a0c] p-4">
            <p className="text-xs leading-relaxed text-[#8c909f]">
              Prompt untuk regenerate project ini tersimpan di{" "}
              <code className="text-[#adc6ff]">
                core/public/images/showcase/
              </code>
              . Lihat README.md di folder project untuk detail lengkap.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
