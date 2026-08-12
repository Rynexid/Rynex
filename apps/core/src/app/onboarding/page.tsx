"use client";

import { Key, Loader2, MessageCircle, Send, ShieldAlert, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

type VerifyState = "idle" | "loading" | "success" | "error" | "locked";

export default function OnboardingPage() {
  const [key, setKey] = useState("");
  const [state, setState] = useState<VerifyState>("idle");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/admin/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (!data?.user) {
          window.location.href = "/register";
          return;
        }
        if (data.user.licenseVerified) {
          window.location.href = "/dashboard";
          return;
        }
        setUserName(data.user.name || "");
      })
      .catch(() => {
        window.location.href = "/register";
      });
  }, []);

  const handleVerify = async () => {
    if (!key.trim()) {
      toast.error("Masukkan kunci lisensi");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/onboarding/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey: key.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "MAX_ATTEMPTS_REACHED") {
          setState("locked");
          setMessage("Terlalu banyak percobaan. Kamu akan diarahkan ke halaman login.");
          setTimeout(() => {
            fetch("/api/admin/auth/logout", { method: "POST" }).finally(() => {
              window.location.href = "/register";
            });
          }, 2000);
          return;
        }
        setState("error");
        setMessage(data.error || "Lisensi tidak valid");
        setAttemptsLeft(data.attemptsLeft || attemptsLeft - 1);
        toast.error(data.error || "Lisensi tidak valid");
        return;
      }

      setState("success");
      setMessage("Lisensi berhasil diverifikasi!");

      const waText = encodeURIComponent(
        `Halo, lisensi admin RYNEX telah diverifikasi. License: ${key.trim()} | Plan: ${data.plan || "admin"} | Email: ${data.email || ""}`,
      );
      window.open(`https://wa.me/6289508888317?text=${waText}`, "_blank");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch {
      setState("error");
      setMessage("Gagal memverifikasi lisensi");
      toast.error("Gagal memverifikasi lisensi");
    }
  };

  const handleRequestLicense = () => {
    const name = userName || "Admin";
    const text = encodeURIComponent(
      `Halo Rynex, saya ${name} baru login, bisa bantu saya berikan licensinya untuk login ini?`,
    );
    window.open(`https://wa.me/6289508888317?text=${text}`, "_blank");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl border border-white/10 p-8">
          <div className="mb-8 text-center">
            <span className="text-foreground mb-1 block text-center font-mono text-lg font-bold tracking-[0.15em]">
              RYNEX
            </span>
            <h1 className="mt-4 text-2xl font-bold">Verifikasi Lisensi Admin</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Masukkan kunci lisensi untuk mengakses dashboard
            </p>
          </div>

          {state === "locked" ? (
            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <ShieldAlert className="h-5 w-5" />
                  Akses Diblokir
                </CardTitle>
                <CardDescription>{message}</CardDescription>
              </CardHeader>
            </Card>
          ) : state === "success" ? (
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <ShieldCheck className="h-5 w-5" />
                  Berhasil
                </CardTitle>
                <CardDescription>{message}</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="licenseKey">Kunci Lisensi</Label>
                <Input
                  id="licenseKey"
                  placeholder="RYNEX-XXXX-XXXX-XXXX"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  className="font-mono"
                  disabled={state === "loading"}
                />
                <p className="text-muted-foreground text-xs">
                  Sisa percobaan: <span className="font-semibold">{attemptsLeft}</span>
                </p>
              </div>

              <Button
                className="w-full"
                onClick={handleVerify}
                disabled={state === "loading" || !key.trim()}
              >
                {state === "loading" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Verifikasi Lisensi
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleRequestLicense}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Minta Lisensi via WhatsApp
              </Button>

              {state === "error" && (
                <Card className="border-red-500/30 bg-red-500/5">
                  <CardHeader className="py-3">
                    <CardTitle className="flex items-center gap-2 text-sm text-red-400">
                      <ShieldAlert className="h-4 w-4" />
                      Gagal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <CardDescription>{message}</CardDescription>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
