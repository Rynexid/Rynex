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
    slug: "ovalen-watches-ecommerce",
    title: "Ovalen Watches E-Commerce",
    category: "UI/UX Design",
    description:
      "Desain product details page untuk e-commerce jam tangan premium Ovalen. Fokus pada visual produk yang elegan, informasi spesifikasi yang terstruktur, dan pengalaman belanja yang mulus.",
    client: "Ovalen",
    challenge:
      "Mendesain halaman product details yang mampu menampilkan keindahan dan detail jam tangan premium secara visual, sekaligus memudahkan pengguna dalam memahami spesifikasi dan melakukan pembelian.",
    solution:
      "Layout clean dengan hero image besar, galeri produk interaktif, spesifikasi terstruktur dalam grid, variant selector yang intuitif, dan CTA pembelian yang Strategis ditempatkan.",
    outcome:
      "Peningkatan engagement pengunjung pada halaman produk dan konversi yang lebih baik melalui pengalaman visual yang immersive.",
    tags: ["UI/UX", "E-Commerce", "Product Design", "Figma"],
    cover: "https://picsum.photos/seed/ovalen-watches/800/450",
    images: [],
    demo: "https://dribbble.com/shots/26388376-Ovalen-Watches-E-Commerce-Product-Details",
  },
];
