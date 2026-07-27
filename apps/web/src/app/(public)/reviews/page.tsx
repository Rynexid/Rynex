"use client";

import { Check, MessageSquare, Send, Star, User } from "lucide-react";
import { useState } from "react";

import { DefaultProfileAvatar } from "@/components/shared/defaultProfile";
import { submitReview } from "@/server/actions/reviews";

const services = [
  "Landing Page",
  "Company Website",
  "Dashboard System",
  "Custom Build",
  "Template",
  "Konsultasi",
  "Lainnya",
];

export default function ReviewsPage() {
  const [form, setForm] = useState({
    authorName: "",
    authorRole: "",
    content: "",
    service: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await submitReview({
      authorName: form.authorName,
      authorRole: form.authorRole || undefined,
      rating: form.rating,
      content: form.content,
      service: form.service || undefined,
    });

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error ?? "Terjadi kesalahan.");
    }
  };

  return (
    <section className="spacious-section relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <span className="text-primary font-mono text-xs font-semibold tracking-widest uppercase">
            Diskusi & Review
          </span>
          <h1 className="mt-4 mb-4 text-3xl font-bold md:text-5xl">
            Bagikan <span className="gradient-text">Pengalaman Anda</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Ceritakan pengalaman bekerja sama dengan Rynex. Review Anda membantu
            kami terus berkembang.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          {submitted ? (
            <div className="glass-card rounded-2xl p-8 text-center backdrop-blur-xl">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <Check className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="mb-4 flex justify-center">
                <DefaultProfileAvatar
                  name={form.authorName || "Anonymous"}
                  size="lg"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold">Terima Kasih!</h3>
              <p className="text-muted-foreground text-sm">
                Review Anda telah dikirim dan akan ditampilkan setelah moderasi.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    authorName: "",
                    authorRole: "",
                    content: "",
                    service: "",
                    rating: 5,
                  });
                }}
                className="text-primary mt-4 text-sm font-medium hover:underline"
              >
                Kirim Review Lain
              </button>
              <div className="mt-4">
                <a
                  href="/member"
                  className="text-muted-foreground hover:text-foreground text-sm hover:underline"
                >
                  Lihat Profil Saya →
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 backdrop-blur-xl md:p-8"
            >
              {/* Rating */}
              <div className="mb-6">
                <label
                  htmlFor="rating"
                  className="mb-2 block text-sm font-medium"
                >
                  Rating
                </label>
                <div id="rating" className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, rating: s })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          s <= form.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.authorName}
                    onChange={(e) =>
                      setForm({ ...form, authorName: e.target.value })
                    }
                    placeholder="Masukkan nama Anda"
                    className="border-border bg-background/50 focus:border-primary w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm transition-colors outline-none"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Pekerjaan / Perusahaan
                </label>
                <input
                  id="role"
                  type="text"
                  value={form.authorRole}
                  onChange={(e) =>
                    setForm({ ...form, authorRole: e.target.value })
                  }
                  placeholder="Contoh: CEO at TechCorp"
                  className="border-border bg-background/50 focus:border-primary w-full rounded-xl border px-4 py-2.5 text-sm transition-colors outline-none"
                />
              </div>

              {/* Service */}
              <div className="mb-4">
                <label
                  htmlFor="service"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Layanan yang Digunakan
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className="border-border bg-background/50 focus:border-primary w-full rounded-xl border px-4 py-2.5 text-sm transition-colors outline-none"
                >
                  <option value="">Pilih layanan</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div className="mb-6">
                <label
                  htmlFor="content"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Pesan / Review *
                </label>
                <div className="relative">
                  <MessageSquare className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                  <textarea
                    id="content"
                    required
                    rows={4}
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    placeholder="Ceritakan pengalaman Anda..."
                    className="border-border bg-background/50 focus:border-primary w-full resize-none rounded-xl border py-2.5 pr-4 pl-10 text-sm transition-colors outline-none"
                  />
                </div>
              </div>

              {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {loading ? "Mengirim..." : "Kirim Review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
