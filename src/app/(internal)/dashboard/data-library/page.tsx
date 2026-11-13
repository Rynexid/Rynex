"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Database,
  Download,
  Eye,
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
  getDatasets,
  createDataset,
  updateDataset,
  deleteDataset,
} from "@/server/actions/datasets";

interface Dataset {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  source: string | null;
  rowCount: number;
  columnCount: number;
  fileSize: number;
  mimeType: string;
  storagePath: string;
  schema: any;
  previewData: any[];
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function DataLibraryClientPage() {
  const [items, setItems] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    source: "",
    status: "active",
  });
  const [createData, setCreateData] = useState({
    name: "",
    slug: "",
    description: "",
    source: "",
    rowCount: 0,
    columnCount: 0,
    fileSize: 0,
    mimeType: "",
    storagePath: "",
    schema: {},
    previewData: [],
    status: "active",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const statuses = ["draft", "active", "archived"];

  const fetchDatasets = useCallback(async () => {
    setLoading(true);
    const res = await getDatasets(page, pageSize, search, statusFilter);
    if (res.success) {
      setItems(res.data || []);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    }
    setLoading(false);
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createDataset({
      userId: "current-user",
      name: createData.name,
      slug: createData.slug,
      description: createData.description || undefined,
      source: createData.source || undefined,
      rowCount: createData.rowCount,
      columnCount: createData.columnCount,
      fileSize: createData.fileSize,
      mimeType: createData.mimeType,
      storagePath: createData.storagePath,
      schema: createData.schema,
      previewData: createData.previewData,
    });
    if (res.success) {
      setShowCreate(false);
      setCreateData({
        name: "",
        slug: "",
        description: "",
        source: "",
        rowCount: 0,
        columnCount: 0,
        fileSize: 0,
        mimeType: "",
        storagePath: "",
        schema: {},
        previewData: [],
        status: "active",
      });
      fetchDatasets();
    } else {
      alert(res.error || "Failed to create dataset");
    }
  };

  const handleUpdate = async (id: number) => {
    const res = await updateDataset(id, {
      name: editData.name,
      description: editData.description || undefined,
      source: editData.source || undefined,
      status: editData.status,
    });
    if (res.success) {
      setEditingId(null);
      fetchDatasets();
    } else {
      alert(res.error || "Failed to update dataset");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this dataset?")) return;
    const res = await deleteDataset(id);
    if (res.success) {
      fetchDatasets();
    } else {
      alert(res.error || "Failed to delete dataset");
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
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
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Data Library</h1>
          <p className="text-muted-foreground text-sm">
            Manage and explore your datasets
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Dataset
        </Button>
      </div>

      {showCreate && (
        <Card className="max-w-3xl space-y-4 p-4">
          <CardHeader>
            <CardTitle>Add Dataset</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <Input
                  name="name"
                  placeholder="Dataset Name"
                  value={createData.name}
                  onChange={(e) =>
                    setCreateData({ ...createData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Slug</label>
                <Input
                  name="slug"
                  placeholder="dataset-name"
                  value={createData.slug}
                  onChange={(e) =>
                    setCreateData({ ...createData, slug: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Row Count
                </label>
                <Input
                  name="rowCount"
                  type="number"
                  value={createData.rowCount}
                  onChange={(e) =>
                    setCreateData({
                      ...createData,
                      rowCount: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Column Count
                </label>
                <Input
                  name="columnCount"
                  type="number"
                  value={createData.columnCount}
                  onChange={(e) =>
                    setCreateData({
                      ...createData,
                      columnCount: Number(e.target.value),
                    })
                  }
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
                  placeholder="text/csv"
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
                  placeholder="/data/dataset.csv"
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
                <label className="mb-1 block text-sm font-medium">Status</label>
                <Select
                  value={createData.status}
                  onValueChange={(v) =>
                    setCreateData({ ...createData, status: v })
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
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Source</label>
                <Input
                  name="source"
                  placeholder="Source system or origin"
                  value={createData.source}
                  onChange={(e) =>
                    setCreateData({ ...createData, source: e.target.value })
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
                      name: "",
                      slug: "",
                      description: "",
                      source: "",
                      rowCount: 0,
                      columnCount: 0,
                      fileSize: 0,
                      mimeType: "",
                      storagePath: "",
                      schema: {},
                      previewData: [],
                      status: "active",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Dataset</Button>
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
              placeholder="Search datasets..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
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

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dataset</TableHead>
                  <TableHead>Rows / Cols</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
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
                      No datasets found
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                          <Database className="text-primary h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {item.slug}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatNumber(item.rowCount)} rows × {item.columnCount}{" "}
                        cols
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatFileSize(item.fileSize)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.source || "Unknown"}
                      </TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditData({
                                name: item.name,
                                description: item.description || "",
                                source: item.source || "",
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
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
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
                <CardTitle>Edit Dataset</CardTitle>
              </CardHeader>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleUpdate(editingId!);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium">Name</label>
                  <Input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Source
                  </label>
                  <Input
                    value={editData.source}
                    onChange={(e) =>
                      setEditData({ ...editData, source: e.target.value })
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
