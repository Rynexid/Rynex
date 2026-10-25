import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Customer Portal",
    template: `%s | RYNEX Customer Portal`,
  },
  description: "Manage your RYNEX products, licenses, and account.",
};

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen font-sans antialiased">
      {children}
    </div>
  );
}
