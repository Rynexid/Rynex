"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Key } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface License {
  id: number;
  key: string;
  product: string;
  customer: string;
  email: string;
  type: string;
  status: string;
  expiresAt: string;
  createdAt: string;
}

export default function LicensesPage() {
  const [items, setItems] = useState<License[]>([
    { id: 1, key: "RYN-XXXX-XXXX-XXXX-A1B2", product: "Dashboard SaaS", customer: "John Doe", email: "john@example.com", type: "pro", status: "active", expiresAt: "2025-12-31", createdAt: "2024-01-15" },
    { id: 2, key: "RYN-XXXX-XXXX-XXXX-C3D4", product: "Portfolio Anime", customer: "Jane Smith", email: "jane@example.com", type: "enterprise", status: "active", expiresAt: "2025-06-15", createdAt: "2024-02-01" },
    { id: 3, key: "RYN-XXXX-XXXX-XXXX-E5F6", product: "E-commerce Starter", customer: "Bob Wilson", email: "bob@example.com", type: "basic", status: "expired", expiresAt: "2024-12-01", createdAt: "2024-03-10" },
    { id: 4, key: "RYN-XXXX-XXXX-XXXX-G7H8", product: "Landing Page Modern", customer: "Alice Brown", email: "alice@example.com", type: "pro", status: "pending", expiresAt: "2026-01-15", createdAt: "2024-04-01" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ key: "", product: "", customer: "", email: "", type: "basic", status: "active", expiresAt: "" });

  const statuses = ["active", "expired", "pending", "revoked"];
  const types = ["basic", "pro", "enterprise"];

  const filteredItems = items
    .filter(p =>
      p.key.toLowerCase().includes(search.toLowerCase()) ||
      p.product.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => statusFilter === "all" || p.status === statusFilter)
    .filter(p => typeFilter === "all" || p.type === typeFilter);

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: License = {
      id: Date.now(),
      key: String(formData.get("key") || `RYN-XXXX-XXXX-XXXX-${Math.random().toString(36).substr(2, 4).toUpperCase()}`),
      product: String(formData.get("product") || ""),
      customer: String(formData.get("customer") || ""),
      email: String(formData.get("email") || ""),
      type: String(formData.get("type") || "basic"),
      status: String(formData.get("status") || "active"),
      expiresAt: String(formData.get("expiresAt") || ""),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setItems(prev => [newItem, ...prev]);
    setShowCreate(false);
    e.currentTarget.reset();
  };

  const handleUpdate = (id: number) => {
    setItems(items.map(p => p.id === editingId ? { ...p, ...editData } : p));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this license?")) return;
    setItems(items.filter(p => p.id !== id));
  };

  const handleRevoke = (id: number) => {
    if (!confirm("Revoke this license?")) return;
    setItems(items.map(p => p.id === id ? { ...p, status: "revoked" } : p));
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      expired: "destructive",
      pending: "secondary",
      revoked: "outline",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">License Management</h1>
          <p className="text-sm text-muted-foreground">Manage product licenses and activations</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add License
        </Button>
      </div>

      {showCreate && (
        <Card className="p-4 space-y-4 max-w-2xl">
          <CardHeader>
            <CardTitle>Add License</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">License Key</label>
                <Input name="key" placeholder="RYN-XXXX-XXXX-XXXX-XXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product</label>
                <Input name="product" placeholder="Product Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Customer</label>
                <Input name="customer" placeholder="Customer Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input name="email" type="email" placeholder="customer@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <Select name="type" defaultValue="basic">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {types.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select name="status" defaultValue="active">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expires At</label>
                <Input name="expiresAt" type="date" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button type="submit">Create License</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search licenses..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={v => { setTypeFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Key</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No licenses found</TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.key}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.customer}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell><Badge variant="secondary">{item.type}</Badge></TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell>{item.expiresAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => {
                            setEditData({ key: item.key, product: item.product, customer: item.customer, email: item.email, type: item.type, status: item.status, expiresAt: item.expiresAt });
                            setEditingId(item.id);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleRevoke(item.id)}>
                            <Key className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
          </div>
        )}

        {editingId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md p-6 space-y-4">
              <CardHeader><CardTitle>Edit License</CardTitle></CardHeader>
              <form onSubmit={async (e) => { e.preventDefault(); await handleUpdate(editingId!); }} className="space-y-3">
                <div><label className="block text-sm font-medium mb-1">License Key</label><Input value={editData.key} onChange={e => setEditData({...editData, key: e.target.value})} readOnly /></div>
                <div><label className="block text-sm font-medium mb-1">Product</label><Input value={editData.product} onChange={e => setEditData({...editData, product: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Customer</label><Input value={editData.customer} onChange={e => setEditData({...editData, customer: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Email</label><Input value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} type="email" required /></div>
                <div><label className="block text-sm font-medium mb-1">Type</label><Select value={editData.type} onValueChange={v => setEditData({...editData, type: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{types.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Status</label><Select value={editData.status} onValueChange={v => setEditData({...editData, status: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Expires At</label><Input type="date" value={editData.expiresAt} onChange={e => setEditData({...editData, expiresAt: e.target.value})} /></div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}