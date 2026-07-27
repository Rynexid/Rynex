"use client";

import { Calendar, type LucideIcon, Mail, Shield, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@rynex/ui/card";

export default function ProfilePage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-[#e5e1e4]">Detail Profil</h1>
        <p className="text-sm text-[#8c909f]">Informasi akun Anda</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-border/50 bg-[#111113] lg:col-span-1">
          <CardContent className="flex flex-col items-center p-6">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#353437]">
              <User className="h-10 w-10 text-[#8c909f]" />
            </div>
            <h2 className="text-lg font-semibold text-[#e5e1e4]">Admin</h2>
            <p className="text-sm text-[#8c909f]">admin@rynex.com</p>
            <span className="mt-2 rounded-full bg-[rgba(173,198,255,0.1)] px-3 py-1 text-xs font-medium text-[#adc6ff]">
              Administrator
            </span>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-[#111113] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-[#e5e1e4]">
              Informasi Akun
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow icon={User} label="Nama" value="Admin" />
            <InfoRow icon={Mail} label="Email" value="admin@rynex.com" />
            <InfoRow icon={Shield} label="Role" value="Administrator" />
            <InfoRow icon={Calendar} label="Bergabung" value="Januari 2025" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="border-border/30 flex items-center gap-4 rounded-lg border p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(173,198,255,0.1)]">
        <Icon className="h-5 w-5 text-[#adc6ff]" />
      </div>
      <div>
        <p className="text-xs text-[#8c909f]">{label}</p>
        <p className="text-sm font-medium text-[#e5e1e4]">{value}</p>
      </div>
    </div>
  );
}
