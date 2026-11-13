"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  MessageSquare,
  Filter,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  getSupportTickets,
  createSupportTicket,
  updateSupportTicket,
  deleteSupportTicket,
} from "@/server/actions/get-help";

interface SupportTicket {
  id: number;
  subject: string;
  message: string;
  priority: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function GetHelpClientPage() {
  const [items, setItems] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    subject: "",
    message: "",
    status: "open",
    priority: "medium",
  });
  const [createData, setCreateData] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const statuses = ["open", "in-progress", "resolved", "closed"];
  const priorities = ["low", "medium", "high", "urgent"];

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    const res = await getSupportTickets(
      page,
      pageSize,
      search,
      statusFilter,
      priorityFilter,
    );
    if (res.success) {
      setItems(res.data || []);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    }
    setLoading(false);
  }, [page, search, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createSupportTicket({
      userId: "current-user",
      subject: createData.subject,
      message: createData.message,
      priority: createData.priority,
    });
    if (res.success) {
      setShowCreate(false);
      setCreateData({ subject: "", message: "", priority: "medium" });
      fetchTickets();
    } else {
      alert(res.error || "Failed to create ticket");
    }
  };

  const handleUpdate = async (id: number) => {
    const res = await updateSupportTicket(id, editData);
    if (res.success) {
      setEditingId(null);
      fetchTickets();
    } else {
      alert(res.error || "Failed to update ticket");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this ticket?")) return;
    const res = await deleteSupportTicket(id);
    if (res.success) {
      fetchTickets();
    } else {
      alert(res.error || "Failed to delete ticket");
    }
  };

  const statusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      open: "default",
      "in-progress": "secondary",
      resolved: "outline",
      closed: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const priorityBadge = (priority: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      low: "secondary",
      medium: "default",
      high: "destructive",
      urgent: "destructive",
    };
    return (
      <Badge variant={variants[priority] || "secondary"}>{priority}</Badge>
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Get Help</h1>
          <p className="text-muted-foreground text-sm">
            Submit and track support tickets
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {showCreate && (
        <Card className="max-w-2xl space-y-4 p-4">
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Brief description of the issue"
                  value={createData.subject}
                  onChange={(e) =>
                    setCreateData({ ...createData, subject: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={createData.priority}
                  onValueChange={(v) =>
                    setCreateData({ ...createData, priority: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Describe your issue in detail..."
                  value={createData.message}
                  onChange={(e) =>
                    setCreateData({ ...createData, message: e.target.value })
                  }
                  className="min-h-[150px]"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreate(false);
                    setCreateData({
                      subject: "",
                      message: "",
                      priority: "medium",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Ticket</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={priorityFilter}
              onValueChange={(v) => {
                setPriorityFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {priorities.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-muted-foreground py-8 text-center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-muted-foreground py-8 text-center"
                    >
                      No tickets found
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-xs">
                        <div>
                          <p className="truncate font-medium">{item.subject}</p>
                          <p className="text-muted-foreground truncate text-xs">
                            {item.message}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{priorityBadge(item.priority)}</TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(item.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditData({
                                subject: item.subject,
                                message: item.message,
                                status: item.status,
                                priority: item.priority,
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

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </Button>
            <span className="text-muted-foreground text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPage((p) => Math.min(pagination.totalPages, p + 1))
              }
              disabled={page === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {editingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto p-6">
              <CardHeader>
                <CardTitle>Edit Ticket</CardTitle>
              </CardHeader>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleUpdate(editingId!);
                }}
                className="space-y-3"
              >
                <div className="space-y-2">
                  <Label htmlFor="editSubject">Subject</Label>
                  <Input
                    id="editSubject"
                    value={editData.subject}
                    onChange={(e) =>
                      setEditData({ ...editData, subject: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPriority">Priority</Label>
                  <Select
                    value={editData.priority}
                    onValueChange={(v) =>
                      setEditData({ ...editData, priority: v })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select
                    value={editData.status}
                    onValueChange={(v) =>
                      setEditData({ ...editData, status: v })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() +
                            s.slice(1).replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editMessage">Message</Label>
                  <Textarea
                    id="editMessage"
                    value={editData.message}
                    onChange={(e) =>
                      setEditData({ ...editData, message: e.target.value })
                    }
                    className="min-h-[150px]"
                    required
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
