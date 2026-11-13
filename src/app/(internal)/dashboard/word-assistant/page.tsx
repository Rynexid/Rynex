"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FileText,
  Copy,
  Sparkles,
  Filter,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  getWordAssistantDocs,
  createWordAssistantDoc,
  updateWordAssistantDoc,
  deleteWordAssistantDoc,
  getWordAssistantTemplates,
} from "@/server/actions/word-assistant";

interface WordAssistantDoc {
  id: number;
  title: string;
  content: string;
  type: string;
  template: string | null;
  meta: any;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function WordAssistantClientPage() {
  const [items, setItems] = useState<WordAssistantDoc[]>([]);
  const [templates, setTemplates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    type: "document",
    template: "",
    status: "draft",
  });
  const [createData, setCreateData] = useState({
    title: "",
    content: "",
    type: "document",
    template: "",
    meta: {},
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const statuses = ["draft", "published", "archived"];
  const types = [
    "document",
    "proposal",
    "report",
    "email",
    "blog",
    "documentation",
    "meeting-notes",
    "custom",
  ];

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    const res = await getWordAssistantDocs(
      page,
      pageSize,
      search,
      typeFilter,
      statusFilter,
    );
    if (res.success) {
      setItems(res.data || []);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    }
    setLoading(false);
  }, [page, search, typeFilter, statusFilter]);

  const fetchTemplates = useCallback(async () => {
    const res = await getWordAssistantTemplates();
    if (res.success) {
      setTemplates(res.data || []);
    }
  }, []);

  useEffect(() => {
    fetchDocs();
    fetchTemplates();
  }, [fetchDocs, fetchTemplates]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createWordAssistantDoc({
      userId: "current-user",
      title: createData.title,
      content: createData.content,
      type: createData.type,
      template: createData.template || undefined,
      meta: createData.meta,
    });
    if (res.success) {
      setShowCreate(false);
      setCreateData({
        title: "",
        content: "",
        type: "document",
        template: "",
        meta: {},
      });
      fetchDocs();
    } else {
      alert(res.error || "Failed to create document");
    }
  };

  const handleUpdate = async (id: number) => {
    const res = await updateWordAssistantDoc(id, {
      title: editData.title,
      content: editData.content,
      type: editData.type,
      template: editData.template || undefined,
      status: editData.status,
    });
    if (res.success) {
      setEditingId(null);
      fetchDocs();
    } else {
      alert(res.error || "Failed to update document");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this document?")) return;
    const res = await deleteWordAssistantDoc(id);
    if (res.success) {
      fetchDocs();
    } else {
      alert(res.error || "Failed to delete document");
    }
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("Content copied to clipboard!");
  };

  const statusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      draft: "secondary",
      published: "default",
      archived: "outline",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const truncate = (str: string, len: number) => {
    if (str.length <= len) return str;
    return str.substring(0, len) + "...";
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="text-primary h-5 w-5" />
            Word Assistant
          </h1>
          <p className="text-muted-foreground text-sm">
            AI-powered document creation and management
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      {showCreate && (
        <Card className="max-w-3xl space-y-4 p-4">
          <CardHeader>
            <CardTitle>New Document</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Title</label>
                <Input
                  name="title"
                  placeholder="Document Title"
                  value={createData.title}
                  onChange={(e) =>
                    setCreateData({ ...createData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Type</label>
                <Select
                  value={createData.type}
                  onValueChange={(v) =>
                    setCreateData({ ...createData, type: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() +
                          t.slice(1).replace("-", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Template (Optional)
                </label>
                <Select
                  value={createData.template}
                  onValueChange={(v) =>
                    setCreateData({ ...createData, template: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {templates.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() +
                          t.slice(1).replace("-", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Content
                </label>
                <Textarea
                  name="content"
                  placeholder="Write your content here..."
                  value={createData.content}
                  onChange={(e) =>
                    setCreateData({ ...createData, content: e.target.value })
                  }
                  className="min-h-[200px]"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreate(false);
                    setCreateData({
                      title: "",
                      content: "",
                      type: "document",
                      template: "",
                      meta: {},
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Document</Button>
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
              placeholder="Search documents..."
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
              value={typeFilter}
              onValueChange={(v) => {
                setTypeFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                    {s.charAt(0).toUpperCase() + s.slice(1)}
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
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-muted-foreground py-8 text-center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-muted-foreground py-8 text-center"
                    >
                      No documents found
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-xs">
                        <div>
                          <p className="truncate font-medium">{item.title}</p>
                          <p className="text-muted-foreground truncate text-xs">
                            {truncate(item.content, 100)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1).replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.template || "—"}
                      </TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(item.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyContent(item.content)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditData({
                                title: item.title,
                                content: item.content,
                                type: item.type,
                                template: item.template || "",
                                status: item.status,
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
            <Card className="max-h-[90vh] w-full max-w-3xl space-y-4 overflow-y-auto p-6">
              <CardHeader>
                <CardTitle>Edit Document</CardTitle>
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
                    Title
                  </label>
                  <Input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Type</label>
                  <Select
                    value={editData.type}
                    onValueChange={(v) => setEditData({ ...editData, type: v })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t.charAt(0).toUpperCase() +
                            t.slice(1).replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Template
                  </label>
                  <Select
                    value={editData.template}
                    onValueChange={(v) =>
                      setEditData({ ...editData, template: v })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {templates.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t.charAt(0).toUpperCase() +
                            t.slice(1).replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Status
                  </label>
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
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    value={editData.content}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                    className="min-h-[300px]"
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
