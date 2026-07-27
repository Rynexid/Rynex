import {
  Dribbble,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com", icon: Twitter, label: "X / Twitter" },
  { href: "https://dribbble.com", icon: Dribbble, label: "Dribbble" },
];

const footerLinks = {
  Layanan: ["Landing Page", "Website", "Dashboard", "Sistem Kustom"],
  Perusahaan: ["Tentang", "Portofolio", "Blog", "Kontak"],
};

const contactInfo = [
  { icon: Mail, label: "contact@soraku.id", href: "mailto:contact@soraku.id" },
  {
    icon: Mail,
    label: "echo.adinfauzan@gmail.com",
    href: "mailto:echo.adinfauzan@gmail.com",
  },
  { icon: Phone, label: "+62 895-0888-8317", href: "tel:+6289508888317" },
];

export function Footer() {
  return (
    <footer className="border-border bg-background/80 border-t backdrop-blur-xl">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/Rynex.png"
                alt="RYNEX"
                width={110}
                height={38}
                className="h-5 w-auto object-contain brightness-110 md:h-6"
                priority
              />
            </Link>
            <p className="text-muted-foreground mt-3 max-w-xs text-xs leading-relaxed">
              Premium digital engineering by Soraku Studio. Kami membangun
              pengalaman web skalabel yang mendorong pertumbuhan bisnis Anda.
            </p>

            <div className="mt-4 flex items-center gap-2.5 md:mt-6">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 border-border flex h-8 w-8 items-center justify-center rounded-full border transition-[color,background-color,border-color] duration-300"
                >
                  <Icon className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div className="col-span-1">
            <h4 className="text-foreground mb-2 font-mono text-[11px] font-semibold tracking-wider uppercase">
              Layanan
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.Layanan.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary text-xs transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="col-span-1">
            <h4 className="text-foreground mb-2 font-mono text-[11px] font-semibold tracking-wider uppercase">
              Perusahaan
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.Perusahaan.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary text-xs transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-foreground mb-2 font-mono text-[11px] font-semibold tracking-wider uppercase">
              Kontak
            </h4>
            <ul className="space-y-2">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 text-xs transition-colors"
                  >
                    <item.icon className="h-3 w-3 shrink-0" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-muted border-border focus:border-primary min-w-0 flex-1 rounded-lg border px-3 py-1.5 text-xs transition-colors outline-none"
                />
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-border/50 flex flex-col items-center justify-between gap-2 border-t pt-6 text-center md:flex-row md:pt-8">
          <p className="text-muted-foreground font-mono text-xs">
            &copy; {new Date().getFullYear()} Rynex by Soraku Studio.
          </p>
          <p className="text-muted-foreground font-mono text-xs">
            Diciptakan dengan presisi.
          </p>
        </div>
      </div>
    </footer>
  );
}
