"use client";

import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@rynex/ui/button";
import { Input } from "@rynex/ui/input";
import { Label } from "@rynex/ui/label";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Semua field wajib diisi");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Password tidak cocok");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal mendaftar");
        return;
      }

      toast.success("Akun berhasil dibuat");
      window.location.href = "/onboarding";
    } catch {
      toast.error("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl border border-white/10 p-8">
          <div className="mb-8 text-center">
            <span className="text-foreground mb-1 block text-center font-mono text-lg font-bold tracking-[0.15em]">
              RYNEX
            </span>
            <h1 className="mt-4 text-2xl font-bold">Daftar Akun Admin</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Buat akun untuk mengakses dashboard admin
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                placeholder="Nama Lengkap"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              Daftar
            </Button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-xs">
            Sudah punya akun?{" "}
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
