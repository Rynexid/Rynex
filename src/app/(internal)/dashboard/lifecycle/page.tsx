"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Filter } from "lucide-react";
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

interface LifecycleStage {
  id: number;
  name: string;
  description: string;
  stage: string;
  progress: number;
  product: string;
  status: string;
  createdAt: string;
}

export default function LifecycleClientPage() {
  const [items, setItems] = useState<any[]>([
    { id: 1, name: "Discovery Phase", description: "Initial research and requirements gathering", stage: "discovery", progress: 100, product: "Portfolio Anime", status: "completed", createdAt: "2024-01-15" },
    { id: 2, name: "Design Phase", description: "UI/UX design and prototyping", stage: "design", progress: 80, product: "Portfolio Anime", status: "in-progress", createdAt: "2024-02-01" },
    { id: 3, name: "Development Sprint 1", description: "Core features implementation", stage: "development", progress: 40, product: "Dashboard SaaS", status: "in-progress", createdAt: "2024-03-01" },
    { id: 4, name: "Testing & QA", description: "Quality assurance and bug fixes", stage: "testing", progress: 0, product: "Dashboard SaaS", status: "pending", createdAt: "2024-03-15" },
    { id: 5, name: "Deployment Prep", description: "Production deployment preparation", stage: "deployment", progress: 0, product: "Portfolio Anime", status: "pending", createdAt: "2024-04-01" },
    { id: 6, name: "Launch", description: "Public launch and monitoring", stage: "launch", progress: 0, product: "Portfolio Anime", status: "pending", createdAt: "2024-04-15" },
    { id: 7, name: "Design Phase", description: "UI/UX design and prototyping", stage: "design", progress: 60, product: "Landing Page Modern", status: "in-progress", createdAt: "2024-03-10" },
    { id: 8, name: "Development Sprint 1", description: "Core features implementation", stage: "development", progress: 20, product: "E-commerce Starter", status: "in-progress", createdAt: "2024-04-01" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", description: "", stage: "planning", progress: 0, product: "", status: "active" });
  const [showCreate, setShowCreate] = useState(false);

  const stages = ["planning", "discovery", "design", "development", "testing", "deployment", "launch"];
  const statuses = ["planning", "in-progress", "completed", "on-hold", "cancelled"];

  const filteredItems = items
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => statusFilter === "all" || p.status === statusFilter);

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem = {
      id: Date.now(),
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || ""),
      stage: String(formData.get("stage") || "planning"),
      progress: Number(formData.get("progress") || 0),
      product: String(formData.get("product") || ""),
      status: String(formData.get("status") || "planning"),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setItems(prev => [newItem, ...prev]);
    setShowCreate(false);
    e.currentTarget.reset();
  }

  const handleUpdate = (id: number) => {
    setItems(items.map(p => p.id === editingId ? { ...p, ...editData } : p));
    setEditingId(null);
  }

  const handleDelete = (id: number) => {
    if (!confirm("Delete this lifecycle stage?")) return;
    setItems(items.filter(p => p.id !== id));
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Lifecycle Management</h1>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <span className="mr-2">+</span> Add Stage
        </Button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="rounded border p-4 space-y-4 max-w-2xl">
          <h2 className="text-lg font-semibold">Add Lifecycle Stage</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input name="name" placeholder="Stage Name" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Product</label>
              <Input name="product" placeholder="Product Name" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" className="w-full rounded border p-2 min-h-[80px]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stage</label>
              <Select name="stage" defaultValue="planning">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Progress (%)</label>
              <Input name="progress" type="number" min="0" max="100" defaultValue="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select name="status" defaultValue="planning">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit">Create Stage</Button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
            <Input
              placeholder="Search lifecycle stages..."
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
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
<TableBody>
              {paginatedItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No lifecycle stages found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.stage}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-32">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{item.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === "completed" ? "default" : item.status === "in-progress" ? "default" : item.status === "cancelled" ? "destructive" : "secondary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditData({
                              name: item.name,
                              description: item.description,
                              stage: item.stage,
                              progress: item.progress,
                              product: item.product,
                              status: item.status,
                            });
                            setEditingId(item.id);
                          }}
                        >
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            if (confirm("Delete this lifecycle stage?")) {
                              handleDelete(item.id);
                            }
                          }}
                        >
                          <span>Delete</span>
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
              Prev
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        )}

        {editingId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background rounded-lg p-6 w-full max-w-md space-y-4">
              <h2 className="text-lg font-semibold">Edit Lifecycle Stage</h2>
              <form onSubmit={async (e) => { e.preventDefault(); await handleUpdate(editingId!); }}>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} className="w-full rounded border p-2 min-h-[80px]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stage</label>
                    <Select value={editData.stage} onValueChange={v => setEditData({...editData, stage: v})}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["planning", "discovery", "design", "development", "testing", "deployment", "launch"].map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Progress (%)</label>
                    <Input type="number" min="0" max="100" value={editData.progress} onChange={e => setEditData({...editData, progress: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <Select value={editData.status} onValueChange={v => setEditData({...editData, status: v})}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["planning", "in-progress", "completed", "on-hold", "cancelled"].map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
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
      </div>
    </div>
  );
}