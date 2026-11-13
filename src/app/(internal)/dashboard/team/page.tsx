"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Edit, Trash2, Mail, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/server/actions/projects";

interface TeamMember {
  id: number;
  name: string;
  role: string | null;
  email: string | null;
  createdAt: string;
}

export default function TeamClientPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    role: "",
    email: "",
  });
  const [createData, setCreateData] = useState({
    name: "",
    role: "",
    email: "",
  });

  const roles = [
    "Project Manager",
    "Developer",
    "Designer",
    "QA Engineer",
    "DevOps Engineer",
    "Product Owner",
    "Scrum Master",
    "Business Analyst",
    "Technical Lead",
  ];

  const fetchTeamMembers = useCallback(async () => {
    setLoading(true);
    const res = await getTeamMembers();
    if (res.success) {
      setItems(res.data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createTeamMember({
      name: createData.name,
      role: createData.role || undefined,
      email: createData.email || undefined,
    });
    if (res.success) {
      setShowCreate(false);
      setCreateData({ name: "", role: "", email: "" });
      fetchTeamMembers();
    } else {
      alert(res.error || "Failed to create team member");
    }
  };

  const handleUpdate = async (id: number) => {
    const res = await updateTeamMember(id, editData);
    if (res.success) {
      setEditingId(null);
      fetchTeamMembers();
    } else {
      alert(res.error || "Failed to update team member");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this team member?")) return;
    const res = await deleteTeamMember(id);
    if (res.success) {
      fetchTeamMembers();
    } else {
      alert(res.error || "Failed to remove team member");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.role?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Team Management</h1>
          <p className="text-muted-foreground text-sm">
            Manage team members and their roles
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {showCreate && (
        <Card className="max-w-2xl space-y-4 p-4">
          <CardHeader>
            <CardTitle>Add Team Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Name
                </label>
                <Input
                  name="name"
                  placeholder="John Doe"
                  value={createData.name}
                  onChange={(e) =>
                    setCreateData({ ...createData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Role</label>
                <Select
                  value={createData.role}
                  onValueChange={(v) =>
                    setCreateData({ ...createData, role: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={createData.email}
                  onChange={(e) =>
                    setCreateData({ ...createData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreate(false);
                    setCreateData({ name: "", role: "", email: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Member</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search team members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-muted-foreground py-8 text-center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-muted-foreground py-8 text-center"
                    >
                      No team members found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                          <User className="text-primary h-4 w-4" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {item.role || "Unassigned"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.email ? (
                          <a
                            href={`mailto:${item.email}`}
                            className="text-primary flex items-center gap-1 hover:underline"
                          >
                            <Mail className="h-3 w-3" />
                            {item.email}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">
                            No email
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditData({
                                name: item.name,
                                role: item.role || "",
                                email: item.email || "",
                              });
                              setEditingId(item.id);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
                          >
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

        {editingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-md space-y-4 p-6">
              <CardHeader>
                <CardTitle>Edit Team Member</CardTitle>
              </CardHeader>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleUpdate(editingId!);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Role</label>
                  <Select
                    value={editData.role}
                    onValueChange={(v) => setEditData({ ...editData, role: v })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
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
