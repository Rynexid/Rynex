"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Users, Clock, Flag } from "lucide-react";
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

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  budget: string;
}

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([
    { id: 1, name: "Dashboard SaaS", client: "Acme Corp", status: "active", progress: 65, startDate: "2024-01-15", endDate: "2024-06-30", team: ["John", "Jane", "Bob"], budget: "Rp 50M" },
    { id: 2, name: "Portfolio Anime", client: "Creative Studio", status: "active", progress: 80, startDate: "2024-02-01", endDate: "2024-05-15", team: ["Alice", "Charlie"], budget: "Rp 30M" },
    { id: 3, name: "E-commerce Starter", client: "RetailCo", status: "planning", progress: 10, startDate: "2024-03-01", endDate: "2024-08-31", team: ["David", "Eve"], budget: "Rp 40M" },
    { id: 4, name: "Landing Page Modern", client: "StartupXYZ", status: "completed", progress: 100, startDate: "2023-11-01", endDate: "2024-01-15", team: ["Frank", "Grace"], budget: "Rp 15M" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", client: "", status: "planning", progress: 0, startDate: "", endDate: "", budget: "" });

  const statuses = ["planning", "active", "on-hold", "completed", "cancelled"];

  const filteredItems = items
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => statusFilter === "all" || p.status === statusFilter);

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: Project = {
      id: Date.now(),
      name: String(formData.get("name") || ""),
      client: String(formData.get("client") || ""),
      status: String(formData.get("status") || "planning"),
      progress: Number(formData.get("progress") || 0),
      startDate: String(formData.get("startDate") || ""),
      endDate: String(formData.get("endDate") || ""),
      team: [],
      budget: String(formData.get("budget") || ""),
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
    if (!confirm("Delete this project?")) return;
    setItems(items.filter(p => p.id !== id));
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      planning: "secondary",
      active: "default",
      "on-hold": "outline",
      completed: "default",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const progressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Project Management</h1>
          <p className="text-sm text-muted-foreground">Track project progress and deadlines</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {showCreate && (
        <Card className="p-4 space-y-4 max-w-2xl">
          <CardHeader>
            <CardTitle>Add Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <Input name="name" placeholder="Project Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client</label>
                <Input name="client" placeholder="Client Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select name="status" defaultValue="planning">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Progress (%)</label>
                <Input name="progress" type="number" min="0" max="100" defaultValue="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <Input name="startDate" type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <Input name="endDate" type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Budget</label>
                <Input name="budget" placeholder="Rp 0" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button type="submit">Create Project</Button>
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
              placeholder="Search projects..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No projects found</TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.client}</TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="w-32">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className={`${progressColor(item.progress)} h-full rounded-full`} style={{ width: `${item.progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{item.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {item.team.map((member, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-primary" title={member}>
                              {member.charAt(0)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{item.startDate} – {item.endDate}</TableCell>
                      <TableCell>{item.budget}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => {
                            setEditData({ name: item.name, client: item.client, status: item.status, progress: item.progress, startDate: item.startDate, endDate: item.endDate, budget: item.budget });
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
            <Card className="w-full max-w-md p-6 space-y-4">
              <CardHeader><CardTitle>Edit Project</CardTitle></CardHeader>
              <form onSubmit={async (e) => { e.preventDefault(); await handleUpdate(editingId!); }} className="space-y-3">
                <div><label className="block text-sm font-medium mb-1">Project Name</label><Input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Client</label><Input value={editData.client} onChange={e => setEditData({...editData, client: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Status</label><Select value={editData.status} onValueChange={v => setEditData({...editData, status: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Progress (%)</label><Input type="number" min="0" max="100" value={editData.progress} onChange={e => setEditData({...editData, progress: Number(e.target.value)})} /></div>
                <div><label className="block text-sm font-medium mb-1">Start Date</label><Input type="date" value={editData.startDate} onChange={e => setEditData({...editData, startDate: e.target.value})} /></div>
                <div><label className="block text-sm font-medium mb-1">End Date</label><Input type="date" value={editData.endDate} onChange={e => setEditData({...editData, endDate: e.target.value})} /></div>
                <div><label className="block text-sm font-medium mb-1">Budget</label><Input value={editData.budget} onChange={e => setEditData({...editData, budget: e.target.value})} /></div>
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