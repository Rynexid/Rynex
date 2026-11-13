"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, DollarSign, Clock, CheckCircle, XCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  duration: string;
  status: string;
  features: string[];
  createdAt: string;
}

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([
    { id: 1, name: "Dashboard Development", description: "Custom dashboard development with React/Next.js", category: "Development", price: "Rp 25M", duration: "4-6 weeks", status: "active", features: ["React/Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"], createdAt: "2024-01-15" },
    { id: 2, name: "UI/UX Design", description: "Complete user interface and experience design", category: "Design", price: "Rp 15M", duration: "2-3 weeks", status: "active", features: ["Figma Design", "Prototyping", "Design System", "User Research"], createdAt: "2024-01-20" },
    { id: 3, name: "API Development", description: "RESTful API and GraphQL development", category: "Development", price: "Rp 20M", duration: "3-4 weeks", status: "active", features: ["Node.js/Express", "PostgreSQL", "Authentication", "Documentation"], createdAt: "2024-02-01" },
    { id: 4, name: "Mobile App Development", description: "Cross-platform mobile app with React Native", category: "Development", price: "Rp 35M", duration: "6-8 weeks", status: "inactive", features: ["React Native", "iOS/Android", "Push Notifications", "App Store Deploy"], createdAt: "2024-02-15" },
  ]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", description: "", category: "development", price: "", duration: "", status: "active", features: "" });

  const categories = ["development", "design", "marketing", "consulting", "support"];
  const statuses = ["active", "inactive", "draft"];

  const filteredItems = items
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => categoryFilter === "all" || p.category === categoryFilter)
    .filter(p => statusFilter === "all" || p.status === statusFilter);

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: Service = {
      id: Date.now(),
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || ""),
      category: String(formData.get("category") || "development"),
      price: String(formData.get("price") || ""),
      duration: String(formData.get("duration") || ""),
      status: String(formData.get("status") || "active"),
      features: String(formData.get("features") || "").split(",").map(f => f.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setItems(prev => [newItem, ...prev]);
    setShowCreate(false);
    e.currentTarget.reset();
  };

  const handleUpdate = (id: number) => {
    setItems(items.map(p => p.id === editingId ? { ...p, ...editData, features: editData.features.split(",").map(f => f.trim()).filter(Boolean) } : p));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this service?")) return;
    setItems(items.filter(p => p.id !== id));
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary",
      draft: "outline",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Service Management</h1>
          <p className="text-sm text-muted-foreground">Manage your service offerings and pricing</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {showCreate && (
        <Card className="p-4 space-y-4 max-w-3xl">
          <CardHeader>
            <CardTitle>Add Service</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Service Name</label>
                <Input name="name" placeholder="Service Name" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea name="description" placeholder="Service description" className="min-h-[100px]" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select name="category" defaultValue="development">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <Input name="price" placeholder="Rp 0" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <Input name="duration" placeholder="e.g., 4-6 weeks" required />
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Features (comma separated)</label>
                <Textarea name="features" placeholder="Feature 1, Feature 2, Feature 3" className="min-h-[80px]" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button type="submit">Create Service</Button>
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
              placeholder="Search services..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={v => { setCategoryFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No services found</TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary">{item.category}</Badge></TableCell>
                      <TableCell className="font-medium">{item.price}</TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.features.slice(0, 3).map((f, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{f}</Badge>
                          ))}
                          {item.features.length > 3 && <Badge variant="outline" className="text-xs">+{item.features.length - 3} more</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => {
                            setEditData({ name: item.name, description: item.description, category: item.category, price: item.price, duration: item.duration, status: item.status, features: item.features.join(", ") });
                            setEditingId(item.id);
                          }}>
                            <Edit className="h-4 w-4" />
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
            <Card className="w-full max-w-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <CardHeader><CardTitle>Edit Service</CardTitle></CardHeader>
              <form onSubmit={async (e) => { e.preventDefault(); await handleUpdate(editingId!); }} className="space-y-3">
                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Service Name</label><Input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} required /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Description</label><Textarea value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} className="min-h-[100px]" required /></div>
                <div><label className="block text-sm font-medium mb-1">Category</label><Select value={editData.category} onValueChange={v => setEditData({...editData, category: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Price</label><Input value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Duration</label><Input value={editData.duration} onChange={e => setEditData({...editData, duration: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Status</label><Select value={editData.status} onValueChange={v => setEditData({...editData, status: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Features (comma separated)</label><Textarea value={editData.features} onChange={e => setEditData({...editData, features: e.target.value})} className="min-h-[80px]" /></div>
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