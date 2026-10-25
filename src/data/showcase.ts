import {
  BarChart3,
  Briefcase,
  Gem,
  Globe,
  LayoutDashboard,
  Palette,
  PawPrint,
  ShoppingBag,
  Sofa,
  Watch,
} from "lucide-react";

export interface ShowcaseProject {
  slug: string;
  name: string;
  category: "Dashboard" | "eCommerce Storefront";
  subcategory: string;
  theme: "Dark Mode" | "Light Mode";
  accent: string;
  style: string;
  description: string;
  techStack: string;
  cover: string;
  images: string[];
  highlights: string[];
  icon: typeof LayoutDashboard;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "ocupite",
    name: "Ocupite",
    category: "Dashboard",
    subcategory: "HR Dashboard",
    theme: "Dark Mode",
    accent: "Ungu/Biru",
    style: "Modern minimalis",
    description:
      "HR Dashboard dengan AI assistant untuk manajemen karyawan, attendance tracking, dan performance analytics.",
    techStack: "React + TypeScript + TailwindCSS + Vite + Recharts",
    cover: "/showcase/ocupite.webp",
    images: ["/showcase/ocupite.webp"],
    highlights: ["AI chat integration", "Performance analytics", "Real-time attendance"],
    icon: Briefcase,
  },
  {
    slug: "dealstack",
    name: "Dealstack",
    category: "Dashboard",
    subcategory: "CRM Dashboard",
    theme: "Dark Mode",
    accent: "Ungu gradient",
    style: "Premium / glassmorphism ringan",
    description:
      "CRM Dashboard untuk pipeline management, deal tracking, dan customer relationship analytics.",
    techStack: "React + TypeScript + TailwindCSS + Recharts",
    cover: "/showcase/dealstack.webp",
    images: ["/showcase/dealstack.webp"],
    highlights: ["Glassmorphism UI", "Neon chart effects", "Deal pipeline"],
    icon: BarChart3,
  },
  {
    slug: "codename",
    name: "Codename",
    category: "Dashboard",
    subcategory: "SRM Dashboard",
    theme: "Light Mode",
    accent: "Merah muda/Pink",
    style: "Clean & profesional",
    description:
      "Sales Relationship Management Dashboard untuk tracking revenue, deals, dan sales performance per platform.",
    techStack: "React + TypeScript + TailwindCSS + Recharts + Framer Motion",
    cover: "/showcase/codename.webp",
    images: ["/showcase/codename.webp"],
    highlights: ["Framer Motion animations", "Platform breakdown", "Sales performance tracking"],
    icon: Globe,
  },
  {
    slug: "confidencyos",
    name: "Confidency OS",
    category: "Dashboard",
    subcategory: "eCommerce Admin",
    theme: "Light Mode",
    accent: "Ungu",
    style: "Command-center / operasional",
    description:
      "eCommerce Admin Dashboard sebagai command center untuk monitoring orders, revenue, inventory, dan customer activity.",
    techStack: "React + TypeScript + TailwindCSS",
    cover: "/showcase/confidencyos.webp",
    images: ["/showcase/confidencyos.webp"],
    highlights: ["Mobile-first responsive", "Live activity feed", "Multi-section sidebar"],
    icon: LayoutDashboard,
  },
  {
    slug: "ecomiq",
    name: "Ecomiq",
    category: "Dashboard",
    subcategory: "eCommerce Analytics",
    theme: "Light Mode",
    accent: "Oranye",
    style: "Clean dashboard analytics",
    description:
      "eCommerce Analytics Dashboard untuk tracking sales performance, revenue trends, dan live visitor monitoring.",
    techStack: "React + TypeScript + TailwindCSS + Recharts + React CountUp",
    cover: "/showcase/ecomiq.webp",
    images: ["/showcase/ecomiq.webp"],
    highlights: ["Real-time visitor counter", "Dual chart comparison", "Minimal sidebar icons"],
    icon: ShoppingBag,
  },
  {
    slug: "sublime",
    name: "Sublime",
    category: "eCommerce Storefront",
    subcategory: "Fashion Minimalis",
    theme: "Light Mode",
    accent: "Netral (tipografi besar)",
    style: "Luxury fashion / editorial",
    description:
      "Storefront fashion premium dengan brand 'ELEVATE', fokus pada tipografi serif, whitespace lega, dan grid produk yang clean.",
    techStack: "Next.js + TypeScript + TailwindCSS",
    cover: "/showcase/sublime.webp",
    images: ["/showcase/sublime.webp"],
    highlights: ["Serif typography", "Luxury whitespace", "Minimalist navigation"],
    icon: Palette,
  },
  {
    slug: "belo-fur",
    name: "Belo.Fur",
    category: "eCommerce Storefront",
    subcategory: "Fashion / Aksesoris",
    theme: "Light Mode",
    accent: "Natural (krem, coklat kayu)",
    style: "Home-living / furniture premium",
    description:
      "Storefront fashion & furniture premium dengan nuansa warna hangat earthy, hero section besar, dan footer lengkap.",
    techStack: "Next.js + TypeScript + TailwindCSS",
    cover: "/showcase/belo-fur.webp",
    images: ["/showcase/belo-fur.webp"],
    highlights: ["Warm earthy palette", "Hero + CTA layout", "Newsletter integration"],
    icon: Sofa,
  },
  {
    slug: "ovalen",
    name: "Ovalen",
    category: "eCommerce Storefront",
    subcategory: "Luxury Watch",
    theme: "Light Mode",
    accent: "Mixed dark/light sections",
    style: "Luxury / editorial",
    description:
      "Storefront jam tangan mewah dengan tipografi serif elegan, mixed dark/light sections, dan sidebar filter produk.",
    techStack: "Next.js + TypeScript + TailwindCSS",
    cover: "/showcase/ovalen.webp",
    images: ["/showcase/ovalen.webp"],
    highlights: ["Mixed dark/light sections", "Serif hero typography", "Product filtering"],
    icon: Watch,
  },
  {
    slug: "piccollo",
    name: "Piccollo",
    category: "eCommerce Storefront",
    subcategory: "Retail Lengkap",
    theme: "Light Mode",
    accent: "Hijau tua",
    style: "Retail modern dengan e-commerce flow lengkap",
    description:
      "Storefront eCommerce paling lengkap: collection, detail produk dengan galeri, reviews, rating, dan rekomendasi produk.",
    techStack: "Next.js + TypeScript + TailwindCSS",
    cover: "/showcase/piccollo.webp",
    images: ["/showcase/piccollo.webp"],
    highlights: ["Full e-commerce flow", "Rating & review system", "Modular components"],
    icon: Gem,
  },
  {
    slug: "cozypaws",
    name: "CozyPaws",
    category: "eCommerce Storefront",
    subcategory: "Pet Products",
    theme: "Light Mode",
    accent: "Hijau & oranye",
    style: "Hangat, ramah, playful",
    description:
      "Storefront produk hewan peliharaan dengan nuansa hangat & playful, hero section dengan gambar hewan besar.",
    techStack: "Next.js + TypeScript + TailwindCSS",
    cover: "/showcase/cozypaws.webp",
    images: ["/showcase/cozypaws.webp"],
    highlights: ["Playful warm palette", "Floating product cards", "Video review section"],
    icon: PawPrint,
  },
];
