"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Mail, Phone, ArrowRight, Filter, DollarSign, UserPlus } from "lucide-react";
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

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: string;
  value: string;
  assignedTo: string;
  notes: string;
  createdAt: string;
}

export default function LeadsPage() {
  const [items, setItems] = useState<Lead[]>([
    { id: 1, name: "John Doe", email: "john@acme.com", phone: "+62 812 3456 7890", company: "Acme Corp", source: "website", status: "qualified", value: "Rp 50M", assignedTo: "Jane Smith", notes: "Interested in Dashboard SaaS", createdAt: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@creative.com", phone: "+62 813 4567 8901", company: "Creative Studio", source: "referral", status: "proposal", value: "Rp 30M", assignedTo: "Bob Wilson", notes: "Needs Portfolio Anime package", createdAt: "2024-01-20" },
    { id: 3, name: "Bob Wilson", email: "bob@retail.com", phone: "+62 814 5678 9012", company: "RetailCo", source: "cold-call", status: "new", value: "Rp 40M", assignedTo: "Alice Brown", notes: "E-commerce Starter inquiry", createdAt: "2024-02-01" },
    { id: 4, name: "Alice Brown", email: "alice@startup.com", phone: "+62 815 6789 0123", company: "StartupXYZ", source: "social", status: "negotiation", value: "Rp 15M", assignedTo: "Charlie Davis", notes: "Landing Page Modern request", createdAt: "2024-02-15" },
    { id: 5, name: "Charlie Davis", email: "charlie@tech.com", phone: "+62 816 7890 1234", company: "TechCorp", source: "email", status: "closed-won", value: "Rp 100M", assignedTo: "John Doe", notes: "Enterprise contract signed", createdAt: "2024-03-01" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "", company: "", source: "website", status: "new", value: "", assignedTo: "", notes: "" });

  const statuses = ["new", "contacted", "qualified", "proposal", "negotiation", "closed-won", "closed-lost"];
  const sources = ["website", "referral", "cold-call", "email", "social", "event", "partner", "other"];

  const filteredItems = items
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => statusFilter === "all" || p.status === statusFilter)
    .filter(p => sourceFilter === "all" || p.source === sourceFilter);

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: Lead = {
      id: Date.now(),
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      company: String(formData.get("company") || ""),
      source: String(formData.get("source") || "website"),
      status: String(formData.get("status") || "new"),
      value: String(formData.get("value") || ""),
      assignedTo: String(formData.get("assignedTo") || ""),
      notes: String(formData.get("notes") || ""),
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
    if (!confirm("Delete this lead?")) return;
    setItems(items.filter(p => p.id !== id));
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      new: "outline",
      contacted: "secondary",
      qualified: "default",
      proposal: "default",
      negotiation: "default",
      "closed-won": "default",
      "closed-lost": "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status.replace("-", " ")}</Badge>;
  };

  const sourceBadge = (source: string) => (
    <Badge variant="outline" className="text-xs">{source}</Badge>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Lead Management</h1>
          <p className="text-sm text-muted-foreground">Track and manage sales leads</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {showCreate && (
        <Card className="p-4 space-y-4 max-w-3xl">
          <CardHeader>
            <CardTitle>Add Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input name="name" placeholder="Full Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input name="email" type="email" placeholder="email@company.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input name="phone" placeholder="+62 8xx xxxx xxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <Input name="company" placeholder="Company Name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Source</label>
                <Select name="source" defaultValue="website">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {sources.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select name="status" defaultValue="new">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Estimated Value</label>
                <Input name="value" placeholder="Rp 0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Assigned To</label>
                <Input name="assignedTo" placeholder="Team Member" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <Textarea name="notes" placeholder="Additional notes" className="min-h-[80px]" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button type="submit">Create Lead</Button>
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
              placeholder="Search leads..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={v => { setSourceFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by source" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {sources.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">No leads found</TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm"><Mail className="h-3 w-3" />{item.email}</div>
                          {item.phone && <div className="flex items-center gap-1 text-sm"><Phone className="h-3 w-3" />{item.phone}</div>}
                        </div>
                      </TableCell>
                      <TableCell>{item.company || "—"}</TableCell>
                      <TableCell>{sourceBadge(item.source)}</TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell className="font-medium">{item.value}</TableCell>
                      <TableCell>{item.assignedTo || "—"}</TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => {
                            setEditData({ name: item.name, email: item.email, phone: item.phone, company: item.company, source: item.source, status: item.status, value: item.value, assignedTo: item.assignedTo, notes: item.notes });
                            setEditingId(item.id);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Convert to opportunity">
                            <ArrowRight className="h-4 w-4" />
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
              <CardHeader><CardTitle>Edit Lead</CardTitle></CardHeader>
              <form onSubmit={async (e) => { e.preventDefault(); await handleUpdate(editingId!); }} className="space-y-3">
                <div><label className="block text-sm font-medium mb-1">Name</label><Input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Email</label><Input value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} type="email" required /></div>
                <div><label className="block text-sm font-medium mb-1">Phone</label><Input value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})} /></div>
                <div><label className="block text-sm font-medium mb-1">Company</label><Input value={editData.company} onChange={e => setEditData({...editData, company: e.target.value})} /></div>
                <div><label className="block text-sm font-medium mb-1">Source</label><Select value={editData.source} onValueChange={v => setEditData({...editData, source: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{sources.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Status</label><Select value={editData.status} onValueChange={v => setEditData({...editData, status: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Estimated Value</label><Input value={editData.value} onChange={e => setEditData({...editData, value: e.target.value})} /></div>
                <div><label className="block text-sm font-medium mb-1">Assigned To</label><Input value={editData.assignedTo} onChange={e => setEditData({...editData, assignedTo: e.target.value})} /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Notes</label><Textarea value={editData.notes} onChange={e => setEditData({...editData, notes: e.target.value})} className="min-h-[80px]" /></div>
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