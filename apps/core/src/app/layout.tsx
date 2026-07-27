import "@/styles/globals.css";

import type { Metadata } from "next";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/shared/themeProvider";

export const metadata: Metadata = {
  title: {
    default: "RYNEX Dashboard",
    template: `%s | RYNEX Dashboard`,
  },
  description: "RYNEX internal dashboard and management system.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "color-mix(in srgb, var(--card) 95%, transparent)",
                border: "1px solid var(--border)",
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
