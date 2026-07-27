"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, Github, Loader2, Mail, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@rynex/ui/button";
import { Input } from "@rynex/ui/input";
import { Label } from "@rynex/ui/label";
import { authClient } from "@rynex/auth/client";

export default function RegisterPage() {
  const router = useRouter();
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
      const { error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast.error(error.message || "Gagal mendaftar");
        return;
      }

      toast.success("Akun berhasil dibuat");
      window.location.href = window.location.origin;
    } catch {
      toast.error("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-2xl border border-white/10 p-8">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <span className="text-foreground mb-1 block text-center font-mono text-lg font-bold tracking-[0.15em]">
                RYNEX
              </span>
            </Link>
            <h1 className="mt-4 text-2xl font-bold">Daftar Akun</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Buat akun untuk mengakses customer portal
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
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
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
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

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card text-muted-foreground px-2">
                Atau daftar dengan
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                authClient.signIn.social({
                  provider: "github",
                  callbackURL: "/auth/callback",
                })
              }
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/auth/callback",
                })
              }
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-center text-xs">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
