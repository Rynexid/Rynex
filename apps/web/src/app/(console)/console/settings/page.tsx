import { Bell, Lock, User } from "lucide-react";

import { Button } from "@rynex/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rynex/ui/card";
import { Input } from "@rynex/ui/input";
import { Label } from "@rynex/ui/label";

export default function SettingsPage() {
  return (
    <main className="bg-background min-h-screen p-8">
      <div className="max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground mb-8">
          Kelola akun dan preferensi Anda.
        </p>

        <div className="space-y-6">
          <Card className="glass border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profil
              </CardTitle>
              <CardDescription>Informasi profil Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                />
              </div>
              <Button>Simpan Perubahan</Button>
            </CardContent>
          </Card>

          <Card className="glass border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Keamanan
              </CardTitle>
              <CardDescription>Ubah password dan keamanan akun</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Password Saat Ini</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Password Baru</Label>
                <Input id="newPassword" type="password" />
              </div>
              <Button>Ubah Password</Button>
            </CardContent>
          </Card>

          <Card className="glass border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifikasi
              </CardTitle>
              <CardDescription>Pengaturan notifikasi email</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Pengaturan notifikasi akan segera tersedia.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
