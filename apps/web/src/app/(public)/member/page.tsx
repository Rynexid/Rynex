"use client";

import Image from "next/image";

import { ReviewSidebar } from "@/components/review-sidebar";
import { DefaultProfile } from "@/components/shared/defaultProfile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@rynex/ui/breadcrumb";
import { Separator } from "@rynex/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@rynex/ui/sidebar";

const userReviews = [
  {
    id: 1,
    service: "Company Website",
    rating: 5,
    content:
      "Website perusahaan saya jadi lebih profesional. Tim RYNEX sangat membantu dari awal sampai launch.",
    status: "approved",
    date: "2024-01-15",
  },
  {
    id: 2,
    service: "Dashboard System",
    rating: 5,
    content:
      "Dashboard internal untuk tim saya jadi jauh lebih efisien. Laporan real-time sangat membantu.",
    status: "approved",
    date: "2024-02-20",
  },
];

const userProjects = [
  { name: "Website Perusahaan", status: "Selesai", url: "#" },
  { name: "Dashboard Internal", status: "Aktif", url: "#" },
  { name: "Landing Page Kampanye", status: "Draft", url: "#" },
];

export default function ProfilePage() {
  return (
    <SidebarProvider>
      <ReviewSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Profil Saya</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Hero Section */}
          <div className="border-border bg-card/50 from-primary/15 via-background relative overflow-hidden rounded-2xl border bg-gradient-to-br to-indigo-500/5 p-6 backdrop-blur-xl md:p-8">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#4FA3D1]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* Profile Info */}
              <div className="flex items-center gap-4">
                <DefaultProfile
                  name="Budi Santoso"
                  userRole="CEO at TechCorp"
                  size="lg"
                />
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-foreground text-2xl font-bold">2</p>
                    <p className="text-muted-foreground text-xs">Review</p>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground text-2xl font-bold">3</p>
                    <p className="text-muted-foreground text-xs">Proyek</p>
                  </div>
                </div>
              </div>

              {/* Screenshot Mockup */}
              <div className="relative hidden md:block">
                <div className="border-border bg-card relative h-40 w-64 overflow-hidden rounded-xl border shadow-2xl">
                  {/* Browser frame */}
                  <div className="border-border bg-card flex items-center gap-1.5 border-b px-3 py-2">
                    <div className="h-2 w-2 rounded-full bg-red-400/80" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                    <div className="h-2 w-2 rounded-full bg-green-400/80" />
                    <div className="bg-border ml-2 flex-1 rounded-md px-2 py-0.5">
                      <span className="text-muted-foreground font-mono text-[8px]">
                        techcorp.com
                      </span>
                    </div>
                  </div>
                  {/* Mockup content */}
                  <div className="flex h-full items-center justify-center p-4">
                    <Image
                      src="/website-assets/01-mockup-screenshot/website-mockup-2.svg"
                      alt="Website Mockup"
                      width={200}
                      height={120}
                      className="h-auto w-full object-contain opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="grid gap-4">
            <h2 className="gradient-text text-lg font-semibold">Review Saya</h2>
            {userReviews.map((review) => (
              <div
                key={review.id}
                className="glass-card rounded-2xl p-5 backdrop-blur-xl"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-foreground text-sm font-medium">
                    {review.service}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-3.5 w-3.5 rounded-full ${
                          i < review.rating
                            ? "bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.4)]"
                            : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {review.content}
                </p>
                <p className="text-muted-foreground/50 mt-2 font-mono text-xs">
                  {review.date}
                </p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="grid gap-4">
            <h2 className="gradient-text text-lg font-semibold">Proyek Saya</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {userProjects.map((project) => (
                <div
                  key={project.name}
                  className="glass-card group hover:border-primary/20 rounded-xl p-4 backdrop-blur-xl transition-all duration-300"
                >
                  <p className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                    {project.name}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      project.status === "Selesai"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : project.status === "Aktif"
                          ? "bg-primary/15 text-primary"
                          : "bg-muted-foreground/10 text-muted-foreground"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
