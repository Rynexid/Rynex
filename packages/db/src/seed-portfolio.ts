/* eslint-disable @typescript-eslint/no-require-imports */

const portfolioItems = [
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
    featured: true,
    order: 1,
  },
];

async function seed() {
  const dotenv = require("dotenv");
  const path = require("path");
  dotenv.config({ path: path.resolve(process.cwd(), "../../.env.local") });

  const { eq } = require("drizzle-orm");
  const { db } = require("./index");
  const { portfolio } = require("./schema");

  console.log("Seeding portfolio...");

  for (const item of portfolioItems) {
    const existing = await db
      .select()
      .from(portfolio)
      .where(eq(portfolio.slug, item.slug))
      .limit(1);

    if (!existing[0]) {
      await db.insert(portfolio).values(item);
      console.log(`  Created: ${item.title}`);
    } else {
      console.log(`  Skipped: ${item.title} (exists)`);
    }
  }

  console.log("Portfolio seed complete!");
}

seed()
  .catch(console.error)
  .finally(() => process.exit(0));
