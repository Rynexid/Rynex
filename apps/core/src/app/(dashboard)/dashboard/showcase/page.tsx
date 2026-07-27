"use client";

import { Eye, ExternalLink } from "lucide-react";
import Link from "next/link";

import { showcaseProjects } from "@/data/showcase";
import { Card, CardContent, CardHeader, CardTitle } from "@rynex/ui/card";

const categoryColors: Record<string, string> = {
  Dashboard: "bg-[rgba(173,198,255,0.1)] text-[#adc6ff]",
  "eCommerce Storefront": "bg-[rgba(74,225,118,0.1)] text-[#4ae176]",
};

const themeColors: Record<string, string> = {
  "Dark Mode": "bg-[rgba(255,185,95,0.1)] text-[#ffb95f]",
  "Light Mode": "bg-[rgba(255,180,171,0.1)] text-[#ffb4ab]",
};

export default function ShowcasePage() {
  const dashboards = showcaseProjects.filter(
    (p) => p.category === "Dashboard",
  );
  const storefronts = showcaseProjects.filter(
    (p) => p.category === "eCommerce Storefront",
  );

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#e5e1e4]">Showcase</h1>
        <p className="mt-1 text-sm text-[#c2c6d6]">
          Kumpulan referensi desain UI/UX — Dashboard & eCommerce Storefront
        </p>
      </div>

      {/* Dashboard Section */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#e5e1e4]">
          Dashboard
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboards.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      {/* Storefront Section */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#e5e1e4]">
          eCommerce Storefront
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {storefronts.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof showcaseProjects)[number];
}) {
  const Icon = project.icon;

  return (
    <Link href={`/dashboard/showcase/${project.slug}`}>
      <Card className="group border-border/50 bg-[#111113] transition-all hover:border-[#353437] hover:bg-[#151417]">
        <CardHeader className="pb-3">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1c1b1d]">
              <Icon className="h-5 w-5 text-[#adc6ff]" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-[#e5e1e4]">
                {project.name}
              </CardTitle>
              <p className="text-xs text-[#8c909f]">{project.subcategory}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[project.category]}`}
            >
              {project.category}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${themeColors[project.theme]}`}
            >
              {project.theme}
            </span>
            <span className="rounded-full bg-[rgba(255,255,255,0.05)] px-2 py-0.5 text-[10px] text-[#8c909f]">
              {project.accent}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="mb-3 text-sm leading-relaxed text-[#c2c6d6]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.highlights.map((h) => (
              <span
                key={h}
                className="rounded bg-[#1c1b1d] px-1.5 py-0.5 text-[10px] text-[#8c909f]"
              >
                {h}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#adc6ff] opacity-0 transition-opacity group-hover:opacity-100">
            <Eye className="h-3.5 w-3.5" />
            Lihat Detail
            <ExternalLink className="h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
