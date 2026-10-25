import dynamic from "next/dynamic";

import { Footer } from "@/components/rynex/footer";
import { Navbar } from "@/components/rynex/navbar";
import { SmoothScroll } from "@/components/rynex/scroll";
import { MobileBottomNavbar } from "@rynex/ui/mobile/bottomNav";

const BackgroundSystem = dynamic(() =>
  import("@/components/backgrounds/backgroundSystem").then((m) => ({
    default: m.BackgroundSystem,
  })),
);

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <BackgroundSystem />
      <Navbar />
      <MobileBottomNavbar />
      <main className="relative z-10 overflow-x-clip pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
