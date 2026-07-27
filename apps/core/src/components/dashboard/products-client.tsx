"use client";

import { Loader2, PackagePlus, Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@rynex/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rynex/ui/card";
import { Input } from "@rynex/ui/input";
import { Label } from "@rynex/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@rynex/ui/sheet";
import { Textarea } from "@rynex/ui/textarea";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  type: string;
  version: string;
  price: number;
  createdAt: Date | null;
}

export function ProductsClient({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    type: "template",
    version: "1.0.0",
    price: "",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug:
        prev.slug === generateSlug(prev.name) ? generateSlug(name) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      toast.error("Nama dan slug wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.price ? Number(form.price) : 0,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal membuat produk");
        return;
      }

      toast.success(`Produk ${data.product.name} berhasil dibuat`);
      setOpen(false);
      setForm({
        name: "",
        slug: "",
        description: "",
        image: "",
        type: "template",
        version: "1.0.0",
        price: "",
      });
      window.location.reload();
    } catch {
      toast.error("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      name: "",
      slug: "",
      description: "",
      image: "",
      type: "template",
      version: "1.0.0",
      price: "",
    });
  };

  return (
    <>
      <div className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="gradient-text mb-2 text-3xl font-bold">Produk</h1>
              <p className="text-muted-foreground">
                Daftar template dan produk yang dijual
              </p>
            </div>
            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk
            </Button>
          </div>

          {products.length === 0 ? (
            <Card className="glass border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <PackagePlus className="text-muted-foreground/50 h-10 w-10" />
                </div>
                <p className="text-muted-foreground mb-2 text-lg font-medium">
                  Belum ada produk
                </p>
                <p className="text-muted-foreground/70 mb-6 text-sm">
                  Tambah produk pertama Anda untuk mulai menjual
                </p>
                <Button onClick={() => setOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Produk Pertama
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group glass border-border hover:border-primary/30 overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-[0_8px_32px_rgba(79,163,209,0.1)]"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="group-hover:text-primary text-lg transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="font-mono text-xs">
                      {product.slug}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4">
                    {product.description ? (
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    ) : (
                      <p className="text-muted-foreground/50 mb-4 text-sm italic">
                        Tidak ada deskripsi
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="gradient-text text-2xl font-bold">
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-white/5 pt-4">
                    <p className="text-muted-foreground/60 font-mono text-xs">
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString(
                            "id-ID",
                          )
                        : "-"}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Sheet open={open} onOpenChange={handleClose}>
        <SheetContent className="w-full sm:max-w-lg" showCloseButton={false}>
          <SheetHeader>
            <SheetTitle className="text-xl">Tambah Produk Baru</SheetTitle>
            <SheetDescription>
              Buat template atau produk digital baru
            </SheetDescription>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground absolute top-4 right-4 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetHeader>

          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col overflow-y-auto px-4 pb-4"
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  placeholder="Portfolio Template"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="portfolio-template"
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: generateSlug(e.target.value) })
                  }
                />
                <p className="text-muted-foreground text-xs">
                  URL unik untuk produk ini
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Deskripsikan produk Anda..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">URL Gambar (Opsional)</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.png"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe</Label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="border-input bg-background text-foreground focus-visible:border-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none"
                  >
                    <option value="template">Template</option>
                    <option value="plugin">Plugin</option>
                    <option value="theme">Theme</option>
                    <option value="service">Service</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Versi</Label>
                  <Input
                    id="version"
                    placeholder="1.0.0"
                    value={form.version}
                    onChange={(e) =>
                      setForm({ ...form, version: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Harga (IDR)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="450000"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <p className="text-muted-foreground text-xs">
                  Harga dalam Rupiah tanpa titik atau koma
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Simpan Produk
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
