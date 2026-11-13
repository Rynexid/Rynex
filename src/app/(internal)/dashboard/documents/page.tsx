"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  FileText,
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
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentCategories,
} from "@/server/actions/documents";

interface Document {
  id: number;
  title: string;
  description: string | null;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storagePath: string;
  category: string | null;
  tags: string[];
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function DocumentsClientPage() {
  const [items, setItems] = useState<Document[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    status: "active",
  });
  const [createData, setCreateData] = useState({
    title: "",
    description: "",
    fileName: "",
    fileSize: 0,
    mimeType: "",
    storagePath: "",
    category: "",
    tags: "",
    status: "active",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const statuses = ["draft", "active", "archived", "deleted"];

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    const res = await getDocuments(
      page,
      pageSize,
      search,
      categoryFilter,
      statusFilter,
    );
    if (res.success) {
      setItems(res.data || []);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    }
    setLoading(false);
  }, [page, search, categoryFilter, statusFilter]);

  const fetchCategories = useCallback(async () => {
    const res = await getDocumentCategories();
    if (res.success) {
      setCategories(res.data || []);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, [fetchDocuments, fetchCategories]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createDocument({
      userId: "current-user",
      title: createData.title,
      description: createData.description || undefined,
      fileName: createData.fileName,
      fileSize: createData.fileSize,
      mimeType: createData.mimeType,
      storagePath: createData.storagePath,
      category: createData.category || undefined,
      tags: createData.tags
        ? createData.tags.split(",").map((t) => t.trim())
        : [],
    });
    if (res.success) {
      setShowCreate(false);
      setCreateData({
        title: "",
        description: "",
        fileName: "",
        fileSize: 0,
        mimeType: "",
        storagePath: "",
        category: "",
        tags: "",
        status: "active",
      });
      fetchDocuments();
    } else {
      alert(res.error || "Failed to create document");
    }
  };

  const handleUpdate = async (id: number) => {
    const res = await updateDocument(id, {
      title: editData.title,
      description: editData.description || undefined,
      category: editData.category || undefined,
      tags: editData.tags ? editData.tags.split(",").map((t) => t.trim()) : [],
      status: editData.status,
    });
    if (res.success) {
      setEditingId(null);
      fetchDocuments();
    } else {
      alert(res.error || "Failed to update document");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this document?")) return;
    const res = await deleteDocument(id);
    if (res.success) {
      fetchDocuments();
    } else {
      alert(res.error || "Failed to delete document");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const statusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      draft: "secondary",
      active: "default",
      archived: "outline",
      deleted: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Documents</h1>
          <p className="text-muted-foreground text-sm">
            Manage and organize your documents
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      {showCreate && (
        <Card className="max-w-2xl space-y-4 p-4">
          <CardHeader>
            <CardTitle>Add Document</CardTitle>
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
                <label className="mb-1 block text-sm font-medium">
                  File Name
                </label>
                <Input
                  name="fileName"
                  placeholder="document.pdf"
                  value={createData.fileName}
                  onChange={(e) =>
                    setCreateData({ ...createData, fileName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  File Size (bytes)
                </label>
                <Input
                  name="fileSize"
                  type="number"
                  value={createData.fileSize}
                  onChange={(e) =>
                    setCreateData({
                      ...createData,
                      fileSize: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  MIME Type
                </label>
                <Input
                  name="mimeType"
                  placeholder="application/pdf"
                  value={createData.mimeType}
                  onChange={(e) =>
                    setCreateData({ ...createData, mimeType: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Storage Path
                </label>
                <Input
                  name="storagePath"
                  placeholder="/uploads/document.pdf"
                  value={createData.storagePath}
                  onChange={(e) =>
                    setCreateData({
                      ...createData,
                      storagePath: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Category
                </label>
                <Select
                  value={createData.category}
                  onValueChange={(v) =>
                    setCreateData({ ...createData, category: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Select category</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Tags (comma separated)
                </label>
                <Input
                  name="tags"
                  placeholder="tag1, tag2, tag3"
                  value={createData.tags}
                  onChange={(e) =>
                    setCreateData({ ...createData, tags: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  value={createData.description}
                  onChange={(e) =>
                    setCreateData({
                      ...createData,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[80px] w-full rounded border p-2"
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
                      description: "",
                      fileName: "",
                      fileSize: 0,
                      mimeType: "",
                      storagePath: "",
                      category: "",
                      tags: "",
                      status: "active",
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
              value={categoryFilter}
              onValueChange={(v) => {
                setCategoryFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
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
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
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
                      No documents found
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center gap-3">
                        <FileText className="text-muted-foreground h-5 w-5" />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-muted-foreground text-xs">
                            {item.fileName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.category ? (
                          <Badge variant="secondary">{item.category}</Badge>
                        ) : (
                          <span className="text-muted-foreground">
                            Uncategorized
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatFileSize(item.fileSize)}
                      </TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditData({
                                title: item.title,
                                description: item.description || "",
                                category: item.category || "",
                                tags: item.tags?.join(", ") || "",
                                status: item.status,
                              });
                              setEditingId(item.id);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              window.open(item.storagePath, "_blank")
                            }
                          >
                            <Download className="h-4 w-4" />
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
            <Card className="w-full max-w-md space-y-4 p-6">
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
                  <label className="mb-1 block text-sm font-medium">
                    Category
                  </label>
                  <Select
                    value={editData.category}
                    onValueChange={(v) =>
                      setEditData({ ...editData, category: v })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Select category</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Tags (comma separated)
                  </label>
                  <Input
                    value={editData.tags}
                    onChange={(e) =>
                      setEditData({ ...editData, tags: e.target.value })
                    }
                  />
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
                    Description
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="min-h-[80px] w-full rounded border p-2"
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
