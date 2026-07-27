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
  pages: { route: string; description: string }[];
  components: string[];
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
    pages: [
      { route: "/dashboard", description: "Ringkasan: total jobs, attendance rate, total employees, income statistics, employee performance, tabel list employee" },
      { route: "/ai-assistant", description: "Panel chat AI dengan quick action cards, input box, riwayat prompt terbaru" },
    ],
    components: [
      "Sidebar navigasi dengan 10 menu item",
      "Topbar dengan search, notifikasi, avatar tim, tombol invite & export",
      "Card statistik reusable dengan progress indicator",
      "Chart income statistics (Recharts)",
      "Chat UI dengan bubble, quick action grid, input voice record",
      "Tabel data employee dengan checkbox & action menu",
    ],
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
    pages: [
      { route: "/overview", description: "Ringkasan performa CRM" },
      { route: "/customers", description: "Detail customer dengan chart trend revenue" },
      { route: "/deals", description: "List deal dengan badge jumlah aktif" },
      { route: "/activity, /tasks, /calendar", description: "Placeholder halaman" },
      { route: "/analytics, /reports", description: "Placeholder halaman" },
    ],
    components: [
      "Sidebar dengan grouping menu (Sales & Operations, Insights)",
      "Card ringkasan deal value dengan progress bar hazard stripe",
      "Chart garis tren revenue dengan efek glow/neon",
      "Badge notifikasi jumlah item di sidebar",
    ],
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
    pages: [
      { route: "/dashboard", description: "Revenue overview, top sales, best deal, statistik deals, breakdown revenue per platform" },
      { route: "/reports", description: "Sub-menu report (shared with me, my reports)" },
    ],
    components: [
      "Sidebar dengan search bar",
      "Header dengan avatar tim & filter timeframe toggle",
      "Card statistik ringkas (deals, value, win rate)",
      "Bar chart & line chart kombinasi untuk analitik per platform",
      "Tabel performa sales dengan badge & progress indicator",
      "Micro-interaction animasi transisi halus (Framer Motion)",
    ],
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
    pages: [
      { route: "/overview", description: "Commerce Command Center: statistics, grafik harian, monthly goals, live activity feed, tabel recent orders" },
      { route: "/live-monitor, /alerts", description: "Placeholder" },
      { route: "/order-queue, /catalog, /pricing-engine", description: "Placeholder" },
      { route: "/customers, /reviews", description: "Placeholder" },
      { route: "/revenue-desk, /payouts, /tax-engine", description: "Placeholder" },
    ],
    components: [
      "Sidebar dengan grouping (Command, Commerce, Finance, Platform)",
      "Card statistik dengan indicator naik/turun",
      "Live activity feed dengan status dot berkedip",
      "Tabel order dengan badge status (Fulfilled, Processing, Pending)",
      "Fully responsive layout (desktop, tablet, mobile)",
    ],
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
    pages: [
      { route: "/home", description: "Sales performance, grafik total revenue dual data, list produk terpopuler, average order value" },
      { route: "/live-visitor", description: "Simulasi visitor real-time dengan counter animasi" },
      { route: "/report", description: "Laporan performa toko" },
    ],
    components: [
      "Sidebar minimalis dengan tooltip saat hover",
      "Topbar dengan breadcrumb & search command",
      "Card statistik dengan komparasi vs bulan lalu",
      "Chart ganda (this month vs last month)",
      "Live counter component dengan animasi angka naik",
    ],
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
    pages: [
      { route: "/", description: "Halaman kategori produk, grid dengan gambar besar, filter kategori horizontal" },
      { route: "/product/[slug]", description: "Halaman detail produk" },
    ],
    components: [
      "Navbar minimalis (menu kiri, logo tengah, menu kanan)",
      "Grid produk responsive (4 kolom desktop, 2 kolom mobile)",
      "Product card dengan hover effect zoom/fade",
      "Filter kategori horizontal scrollable di mobile",
    ],
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
    pages: [
      { route: "/", description: "Hero section, Exclusive Collections, Design Series, banner promosi, footer dengan newsletter" },
    ],
    components: [
      "Navbar dengan search, cart, menu compact",
      "Hero section dengan layout gambar + teks + CTA",
      "Product card grid dengan gambar & harga",
      "Banner promosi full-width dengan overlay teks",
      "Footer dengan newsletter form & social icons",
    ],
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
    pages: [
      { route: "/", description: "Hero section besar, New Article cards, filter produk + grid, brand banner dark" },
    ],
    components: [
      "Navbar dengan dropdown menu",
      "Hero section dengan tipografi custom besar (font serif)",
      "Sidebar filter (checkbox brand, range slider price)",
      "Product card grid dengan gambar produk",
      "Dark banner section dengan CTA & social icons",
    ],
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
    pages: [
      { route: "/", description: "Landing page dengan collection section" },
      { route: "/collection", description: "Halaman koleksi produk dengan filter" },
      { route: "/product/[slug]", description: "Detail produk: galeri, harga, rating, reviews, rekomendasi, banner, footer" },
    ],
    components: [
      "Navbar dengan top banner promo & multi-menu",
      "Galeri produk dengan thumbnail selector",
      "Rating breakdown (progress bar per bintang)",
      "Review card dengan avatar & rating",
      "Product recommendation grid",
      "Newsletter subscribe + FAQ",
    ],
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
    pages: [
      { route: "/", description: "Hero section dengan headline besar, gambar hewan, card produk floating, statistik, video review" },
    ],
    components: [
      "Navbar dengan menu, search, wishlist, cart, avatar",
      "Hero section dengan gambar hewan + card produk mengapung",
      "Stat card (angka besar + deskripsi kecil)",
      "Video card component (thumbnail + play button overlay)",
    ],
    highlights: ["Playful warm palette", "Floating product cards", "Video review section"],
    icon: PawPrint,
  },
];
