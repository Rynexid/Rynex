export interface PortfolioProject {
  slug: string;
  title: string;
  category: string;
  description: string;
  client: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
  demo?: string;
  cover: string;
  images: string[];
}

export const projects: PortfolioProject[] = [
  {
    slug: "adrew-ecommerce",
    title: "Adrew E-Commerce",
    category: "E-Commerce",
    description:
      "Platform e-commerce modern dengan desain minimalis dan pengalaman belanja yang mulus.",
    client: "Adrew",
    challenge:
      "Membangun platform e-commerce yang modern, cepat, dan mudah digunakan untuk produk fashion.",
    solution:
      "Desain UI/UX minimalis dengan fokus pada visual produk, checkout flow yang sederhana, dan performa tinggi.",
    outcome:
      "Peningkatan konversi dan pengalaman belanja yang lebih baik untuk pelanggan.",
    tags: ["E-Commerce", "UI/UX", "Next.js", "Responsive"],
    cover: "",
    images: [],
  },
  {
    slug: "constier-landing",
    title: "Constier Landing Page",
    category: "Landing Page",
    description:
      "Landing page premium untuk Constier dengan animasi imersif dan responsif sempurna.",
    client: "Constier",
    challenge:
      "Membuat landing page yang menarik perhatian dengan video brand dan tampilan responsif di semua device.",
    solution:
      "Hero section dengan video background, grid layout yang bersih, dan optimasi untuk mobile.",
    outcome:
      "Brand presence yang kuat di digital dan peningkatan engagement pengunjung.",
    tags: ["Landing Page", "UI/UX", "Framer Motion", "Responsive"],
    cover: "",
    images: [],
  },
  {
    slug: "constier-mobile-app",
    title: "Constier Mobile App",
    category: "Mobile App",
    description:
      "Desain aplikasi mobile untuk Constier dengan preview produk dan brand marketing yang terintegrasi.",
    client: "Constier",
    challenge:
      "Mendesain aplikasi mobile yang intuitif untuk preview produk dan brand experience.",
    solution:
      "Mobile-first design dengan navigasi sederhana, preview produk interaktif, dan brand consistency.",
    outcome:
      "Aplikasi mobile yang user-friendly dan meningkatkan brand loyalty.",
    tags: ["Mobile App", "UI/UX", "iOS", "Android"],
    cover: "",
    images: [],
  },
  {
    slug: "primenest-landing",
    title: "PrimeNest Landing Page",
    category: "Landing Page",
    description:
      "Landing page elegan untuk PrimeNest dengan hero section yang memukau dan layout yang terstruktur.",
    client: "PrimeNest",
    challenge:
      "Menciptakan landing page yang elegan dan profesional untuk brand properti.",
    solution:
      "Desain bersih dengan hero section besar, grid properti yang terstruktur, dan CTA yang jelas.",
    outcome: "Peningkatan lead generation dan brand awareness yang signifikan.",
    tags: ["Landing Page", "UI/UX", "Real Estate", "Responsive"],
    cover: "",
    images: [],
  },
  {
    slug: "ocupite-dashboard",
    title: "Ocupite Dashboard",
    category: "Dashboard",
    description:
      "Dashboard analitik modern dengan visualisasi data yang interaktif dan interface yang bersih.",
    client: "Ocupite",
    challenge:
      "Membangun dashboard yang powerful namun mudah digunakan untuk analitik bisnis.",
    solution:
      "Interface bersih dengan card-based layout, charts interaktif, dan real-time data updates.",
    outcome:
      "Peningkatan produktivitas tim dalam memantau dan menganalisis data bisnis.",
    tags: ["Dashboard", "UI/UX", "Analytics", "Real-time"],
    cover: "",
    images: [],
  },
  {
    slug: "revup-dashboard",
    title: "Revup Dashboard",
    category: "Dashboard",
    description:
      "Dashboard bisnis multi-layer dengan visualisasi data kompleks dan navigasi yang intuitif.",
    client: "Revup",
    challenge:
      "Mendesain dashboard yang dapat menampilkan data kompleks dalam beberapa layer tanpa membingungkan pengguna.",
    solution:
      "Multi-layer interface dengan breadcrumb navigation, contextual panels, dan progressive disclosure.",
    outcome:
      "Dashboard yang mampu menampilkan data kompleks secara sederhana dan efektif.",
    tags: ["Dashboard", "UI/UX", "Data Viz", "Enterprise"],
    cover: "",
    images: [],
  },
  {
    slug: "travel-mobile-app",
    title: "Travel Mobile App",
    category: "Mobile App",
    description:
      "Aplikasi mobile travel dengan desain yang menginspirasi petualangan dan booking yang mudah.",
    client: "Travel",
    challenge:
      "Menciptakan aplikasi travel yang menginspirasi sekaligus fungsional untuk booking perjalanan.",
    solution:
      "Desain immersive dengan hero parallax, card destinasi yang menarik, dan checkout flow sederhana.",
    outcome:
      "Aplikasi travel yang meningkatkan inspirasi dan kemudahan booking pengguna.",
    tags: ["Mobile App", "UI/UX", "Travel", "Booking"],
    cover: "",
    images: [],
  },
];
