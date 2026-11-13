"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Mail, Phone, MessageSquare, CheckCircle, Clock, XCircle, ArrowRight, DollarSign } from "lucide-react";
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

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: string;
  status: string;
  priority: string;
  assignedTo: string;
  response: string;
  createdAt: string;
  updatedAt: string;
}

export default function InquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([
    { id: 1, name: "John Doe", email: "john@acme.com", phone: "+62 812 3456 7890", subject: "Pricing Inquiry", message: "Hi, I'd like to know more about your Dashboard SaaS pricing for enterprise.", type: "sales", status: "open", priority: "high", assignedTo: "Jane Smith", response: "", createdAt: "2024-01-15", updatedAt: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@creative.com", phone: "", subject: "Technical Support", message: "Getting an error when deploying the Portfolio Anime template.", type: "support", status: "in-progress", priority: "medium", assignedTo: "Bob Wilson", response: "We've identified the issue and are working on a fix.", createdAt: "2024-01-20", updatedAt: "2024-01-21" },
    { id: 3, name: "Bob Wilson", email: "bob@retail.com", phone: "+62 814 5678 9012", subject: "Feature Request", message: "Would love to see dark mode support in the E-commerce Starter.", type: "feature", status: "open", priority: "low", assignedTo: "", response: "", createdAt: "2024-02-01", updatedAt: "2024-02-01" },
    { id: 4, name: "Alice Brown", email: "alice@startup.com", phone: "", subject: "Billing Question", message: "My invoice shows a different amount than expected.", type: "billing", status: "resolved", priority: "high", assignedTo: "Charlie Davis", response: "We've corrected the invoice and sent an updated version.", createdAt: "2024-02-15", updatedAt: "2024-02-16" },
    { id: 5, name: "Charlie Davis", email: "charlie@tech.com", phone: "+62 816 7890 1234", subject: "Partnership Inquiry", message: "Interested in becoming a reseller partner for your products.", type: "partnership", status: "closed", priority: "medium", assignedTo: "John Doe", response: "Thank you for your interest. We'll review and get back to you.", createdAt: "2024-03-01", updatedAt: "2024-03-02" },
  ]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "", subject: "", message: "", type: "support", status: "open", priority: "medium", assignedTo: "", response: "" });

  const types = ["sales", "support", "billing", "feature", "partnership", "general"];
  const statuses = ["open", "in-progress", "waiting-customer", "resolved", "closed"];
  const priorities = ["low", "medium", "high", "urgent"];

  const filteredItems = items
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.subject.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => typeFilter === "all" || p.type === typeFilter)
    .filter(p => statusFilter === "all" || p.status === statusFilter)
    .filter(p => priorityFilter === "all" || p.priority === priorityFilter);

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: Inquiry = {
      id: Date.now(),
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      type: String(formData.get("type") || "support"),
      status: String(formData.get("status") || "open"),
      priority: String(formData.get("priority") || "medium"),
      assignedTo: String(formData.get("assignedTo") || ""),
      response: String(formData.get("response") || ""),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setItems(prev => [newItem, ...prev]);
    setShowCreate(false);
    e.currentTarget.reset();
  };

  const handleUpdate = (id: number) => {
    setItems(items.map(p => p.id === editingId ? { ...p, ...editData, updatedAt: new Date().toISOString().split("T")[0] } : p));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this inquiry?")) return;
    setItems(items.filter(p => p.id !== id));
  };

  const handleReply = (id: number) => {
    setItems(items.map(p => p.id === id ? { ...p, status: "in-progress", updatedAt: new Date().toISOString().split("T")[0] } : p));
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      open: "outline",
      "in-progress": "default",
      "waiting-customer": "secondary",
      resolved: "default",
      closed: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status.replace("-", " ")}</Badge>;
  };

  const priorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      low: "secondary",
      medium: "default",
      high: "destructive",
      urgent: "destructive",
    };
    return <Badge variant={variants[priority] || "secondary"}>{priority}</Badge>;
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "sales": return <DollarSign className="h-3 w-3" />;
      case "support": return <MessageSquare className="h-3 w-3" />;
      case "billing": return <DollarSign className="h-3 w-3" />;
      case "feature": return <ArrowRight className="h-3 w-3" />;
      case "partnership": return <CheckCircle className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Inquiry Management</h1>
          <p className="text-sm text-muted-foreground">Manage customer inquiries and support tickets</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Inquiry
        </Button>
      </div>

      {showCreate && (
        <Card className="p-4 space-y-4 max-w-3xl">
          <CardHeader>
            <CardTitle>Add Inquiry</CardTitle>
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
                <label className="block text-sm font-medium mb-1">Type</label>
                <Select name="type" defaultValue="support">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {types.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <Select name="priority" defaultValue="medium">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {priorities.map(p => <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select name="status" defaultValue="open">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Subject</label>
                <Input name="subject" placeholder="Inquiry Subject" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea name="message" placeholder="Inquiry details" className="min-h-[100px]" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Assigned To</label>
                <Input name="assignedTo" placeholder="Team Member" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Response</label>
                <Textarea name="response" placeholder="Your response" className="min-h-[80px]" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button type="submit">Create Inquiry</Button>
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
              placeholder="Search inquiries..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={v => { setTypeFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={v => { setPriorityFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="Priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {priorities.map(p => <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inquiry</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No inquiries found</TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-[300px]">
                        <div>
                          <p className="font-medium">{item.subject}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.message}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm"><Mail className="h-3 w-3" />{item.email}</div>
                          {item.phone && <div className="flex items-center gap-1 text-sm"><Phone className="h-3 w-3" />{item.phone}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {typeIcon(item.type)}
                          <span className="text-sm capitalize">{item.type.replace("-", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell>{priorityBadge(item.priority)}</TableCell>
                      <TableCell>{item.assignedTo || "—"}</TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => {
                            setEditData({ name: item.name, email: item.email, phone: item.phone, subject: item.subject, message: item.message, type: item.type, status: item.status, priority: item.priority, assignedTo: item.assignedTo, response: item.response });
                            setEditingId(item.id);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {item.status !== "resolved" && item.status !== "closed" && (
                            <Button variant="ghost" size="icon" onClick={() => handleReply(item.id)} title="Mark as in progress">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          )}
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
              <CardHeader><CardTitle>Edit Inquiry</CardTitle></CardHeader>
              <form onSubmit={async (e) => { e.preventDefault(); await handleUpdate(editingId!); }} className="space-y-3">
                <div><label className="block text-sm font-medium mb-1">Name</label><Input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Email</label><Input value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} type="email" required /></div>
                <div><label className="block text-sm font-medium mb-1">Phone</label><Input value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})} /></div>
                <div><label className="block text-sm font-medium mb-1">Subject</label><Input value={editData.subject} onChange={e => setEditData({...editData, subject: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Type</label><Select value={editData.type} onValueChange={v => setEditData({...editData, type: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{types.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Priority</label><Select value={editData.priority} onValueChange={v => setEditData({...editData, priority: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{priorities.map(p => <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Status</label><Select value={editData.status} onValueChange={v => setEditData({...editData, status: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</SelectItem>)}</SelectContent></Select></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Message</label><Textarea value={editData.message} onChange={e => setEditData({...editData, message: e.target.value})} className="min-h-[100px]" required /></div>
                <div><label className="block text-sm font-medium mb-1">Assigned To</label><Input value={editData.assignedTo} onChange={e => setEditData({...editData, assignedTo: e.target.value})} /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Response</label><Textarea value={editData.response} onChange={e => setEditData({...editData, response: e.target.value})} className="min-h-[80px]" /></div>
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