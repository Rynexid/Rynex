
"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { createProductForm } from "@/server/actions/products";
import { updateProduct, deleteProduct, getProducts } from "@/server/actions/products";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  type: string;
  version: string;
  price: number;
  status: string;
  createdAt: Date;
}

export default function ProductsClientPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", slug: "", description: "", status: "draft" });
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const res = await getProducts();
    if (res.success) {
      setProducts(res.data || []);
    }
    setLoading(false);
  }

  const filteredProducts = products
    .filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => statusFilter === "all" || p.status === statusFilter);

  const totalPages = Math.ceil(filteredProducts.length / 10);
  const paginatedProducts = filteredProducts.slice((page - 1) * 10, page * 10);

  async function handleUpdate(id: number) {
    const res = await updateProduct(id, editData);
    if (res.success) {
      setEditingId(null);
      fetchProducts();
    } else {
      alert(res.error);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;
    const res = await deleteProduct(id);
    if (res.success) {
      fetchProducts();
    } else {
      alert(res.error);
    }
  }

  async function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createProductForm(formData);
    fetchProducts();
    e.currentTarget.reset();
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Products</h1>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <span className="mr-2">+</span> Add Product
        </Button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreateSubmit} className="rounded border p-4 space-y-4 max-w-2xl">
          <h2 className="text-lg font-semibold">Create Product</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input name="name" placeholder="Product Name" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <Input name="slug" placeholder="product-slug" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" className="w-full rounded border p-2 min-h-[80px]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Input name="type" placeholder="template" defaultValue="template" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Version</label>
              <Input name="version" placeholder="1.0.0" defaultValue="1.0.0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input name="price" type="number" defaultValue="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select name="status" defaultValue="draft">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit">Create Product</Button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
            <Input
              placeholder="Search products..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse h-12 bg-muted rounded" />
            ))}
          </div>
        ) : (
          <>
            <div className="rounded-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.slug}</TableCell>
                        <TableCell>{product.type}</TableCell>
                        <TableCell>Rp {product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === "published" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => {
                              setEditData({ name: product.name, slug: product.slug, description: product.description || "", status: product.status });
                              setEditingId(product.id);
                            }}>
                              ✏️
                            </Button>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
                              🗑️
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                  {"←"}
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                  {"→"}
                </Button>
              </div>
            )}

            {editingId && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-background rounded-lg p-6 w-full max-w-md space-y-4">
                  <h2 className="text-lg font-semibold">Edit Product</h2>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    await handleUpdate(editingId!);
                  }}>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <Input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <Input value={editData.slug} onChange={e => setEditData({...editData, slug: e.target.value})} required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} className="w-full rounded border p-2 min-h-[80px]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <Select value={editData.status} onValueChange={v => setEditData({...editData, status: v})}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
