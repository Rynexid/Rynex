import {
  BarChart3,
  Download,
  FolderOpen,
  Globe,
  Key,
  MessageSquare,
  Package,
  Settings,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/console", icon: Shield },
  { label: "Lisensi Saya", href: "/console/licenses", icon: Shield },
  { label: "Riwayat Aktivasi", href: "/console/activations", icon: Key },
  { label: "Domain Binding", href: "/console/domains", icon: Globe },
  { label: "Unduhan", href: "/console/downloads", icon: Download },
  { label: "Pesanan", href: "/console/orders", icon: Package },
  { label: "Tagihan", href: "/console/billing", icon: BarChart3 },
  { label: "API Keys", href: "/console/api-keys", icon: Key },
  { label: "Workspace", href: "/console/workspace", icon: FolderOpen },
  { label: "Dukungan", href: "/console/support", icon: MessageSquare },
  { label: "Profil", href: "/console/profile", icon: User },
  { label: "Pengaturan", href: "/console/settings", icon: Settings },
];

export function ConsoleSidebar() {
  return (
    <aside className="border-border bg-card/30 sticky top-0 hidden h-screen w-64 border-r md:block">
      <div className="p-6">
        <h2 className="gradient-text mb-6 text-lg font-bold">Portal Klien</h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:bg-accent flex items-center gap-2 rounded-lg p-2 text-sm transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
