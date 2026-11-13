"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, UserPlus, Mail, Phone, Shield } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  avatar: string;
  joinedAt: string;
}

export default function TeamPage() {
  const [items, setItems] = useState<TeamMember[]>([
    { id: 1, name: "John Doe", email: "john@rynex.com", role: "Admin", department: "Engineering", status: "active", avatar: "JD", joinedAt: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@rynex.com", role: "Manager", department: "Design", status: "active", avatar: "JS", joinedAt: "2023-03-20" },
    { id: 3, name: "Bob Wilson", email: "bob@rynex.com", role: "Developer", department: "Engineering", status: "active", avatar: "BW", joinedAt: "2023-06-10" },
    { id: 4, name: "Alice Brown", email: "alice@rynex.com", role: "Designer", department: "Design", status: "inactive", avatar: "AB", joinedAt: "2023-09-01" },
    { id: 5, name: "Charlie Davis", email: "charlie@rynex.com", role: "Developer", department: "Engineering", status: "active", avatar: "CD", joinedAt: "2024-01-15" },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", email: "", role: "member", department: "engineering", status: "active", avatar: "" });

  const roles = ["admin", "manager", "developer", "designer", "member"];
  const departments = ["engineering", "design", "marketing", "sales", "support"];
  const statuses = ["active", "inactive", "pending"];

  const filteredItems = items
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => roleFilter === "all" || p.role === roleFilter)
    .filter(p => deptFilter === "all" || p.department === deptFilter);

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const newItem: TeamMember = {
      id: Date.now(),
      name,
      email: String(formData.get("email") || ""),
      role: String(formData.get("role") || "member"),
      department: String(formData.get("department") || "engineering"),
      status: String(formData.get("status") || "active"),
      avatar: name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      joinedAt: new Date().toISOString().split("T")[0],
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
    if (!confirm("Remove this team member?")) return;
    setItems(items.filter(p => p.id !== id));
  };

  const roleBadge = (role: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      admin: "default",
      manager: "default",
      developer: "secondary",
      designer: "secondary",
      member: "outline",
    };
    return <Badge variant={variants[role] || "secondary"}>{role}</Badge>;
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary",
      pending: "outline",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Team Management</h1>
          <p className="text-sm text-muted-foreground">Manage team members and permissions</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {showCreate && (
        <Card className="p-4 space-y-4 max-w-2xl">
          <CardHeader>
            <CardTitle>Add Team Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input name="name" placeholder="Full Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input name="email" type="email" placeholder="name@company.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Select name="role" defaultValue="member">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {roles.map(r => <SelectItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <Select name="department" defaultValue="engineering">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {departments.map(d => <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>)}
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
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button type="submit">Add Member</Button>
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
              placeholder="Search team members..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={v => { setRoleFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(r => <SelectItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={deptFilter} onValueChange={v => { setDeptFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by dept" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(d => <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No team members found</TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} alt={item.name} />
                            <AvatarFallback>{item.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{roleBadge(item.role)}</TableCell>
                      <TableCell><Badge variant="secondary">{item.department}</Badge></TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell>{item.joinedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => {
                            setEditData({ name: item.name, email: item.email, role: item.role, department: item.department, status: item.status, avatar: item.avatar });
                            setEditingId(item.id);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Send invite">
                            <Mail className="h-4 w-4" />
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
              <CardHeader><CardTitle>Edit Member</CardTitle></CardHeader>
              <form onSubmit={async (e) => { e.preventDefault(); await handleUpdate(editingId!); }} className="space-y-3">
                <div><label className="block text-sm font-medium mb-1">Name</label><Input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Email</label><Input value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} type="email" required /></div>
                <div><label className="block text-sm font-medium mb-1">Role</label><Select value={editData.role} onValueChange={v => setEditData({...editData, role: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{roles.map(r => <SelectItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Department</label><Select value={editData.department} onValueChange={v => setEditData({...editData, department: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Status</label><Select value={editData.status} onValueChange={v => setEditData({...editData, status: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}</SelectContent></Select></div>
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