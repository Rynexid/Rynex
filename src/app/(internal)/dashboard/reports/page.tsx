"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FileText,
  Download,
  Play,
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
  getReports,
  createReport,
  updateReport,
  deleteReport,
  getReportTypes,
} from "@/server/actions/reports";

interface Report {
  id: number;
  title: string;
  description: string | null;
  type: string;
  config: any;
  filters: any;
  dateFrom: string | null;
  dateTo: string | null;
  format: string;
  status: string;
  resultPath: string | null;
  generatedAt: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function ReportsClientPage() {
  const [items, setItems] = useState<Report[]>([]);
  const [reportTypes, setReportTypes] = useState<string[]>([]);
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
    description: "",
    type: "sales",
    format: "json",
    status: "draft",
    config: {},
    filters: {},
    dateFrom: "",
    dateTo: "",
  });
  const [createData, setCreateData] = useState({
    title: "",
    description: "",
    type: "sales",
    format: "json",
    status: "draft",
    config: {},
    filters: {},
    dateFrom: "",
    dateTo: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const statuses = ["draft", "generated", "failed", "scheduled"];
  const formats = ["json", "csv", "pdf", "xlsx"];

  const fetchReports = useCallback(async () => {
    setLoading(true);
    const res = await getReports(
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

  const fetchReportTypes = useCallback(async () => {
    const res = await getReportTypes();
    if (res.success) {
      setReportTypes(res.data || []);
    }
  }, []);

  useEffect(() => {
    fetchReports();
    fetchReportTypes();
  }, [fetchReports, fetchReportTypes]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createReport({
      userId: "current-user",
      title: createData.title,
      description: createData.description || undefined,
      type: createData.type,
      config: createData.config,
      filters: createData.filters,
      dateFrom: createData.dateFrom ? new Date(createData.dateFrom) : undefined,
      dateTo: createData.dateTo ? new Date(createData.dateTo) : undefined,
      format: createData.format,
    });
    if (res.success) {
      setShowCreate(false);
      setCreateData({
        title: "",
        description: "",
        type: "sales",
        format: "json",
        status: "draft",
        config: {},
        filters: {},
        dateFrom: "",
        dateTo: "",
      });
      fetchReports();
    } else {
      alert(res.error || "Failed to create report");
    }
  };

  const handleUpdate = async (id: number) => {
    const res = await updateReport(id, {
      title: editData.title,
      description: editData.description || undefined,
      type: editData.type,
      format: editData.format,
      status: editData.status,
      config: editData.config,
      filters: editData.filters,
      dateFrom: editData.dateFrom ? new Date(editData.dateFrom) : undefined,
      dateTo: editData.dateTo ? new Date(editData.dateTo) : undefined,
    });
    if (res.success) {
      setEditingId(null);
      fetchReports();
    } else {
      alert(res.error || "Failed to update report");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this report?")) return;
    const res = await deleteReport(id);
    if (res.success) {
      fetchReports();
    } else {
      alert(res.error || "Failed to delete report");
    }
  };

  const handleGenerate = async (id: number) => {
    // This would typically trigger a report generation
    alert("Report generation would be triggered here");
  };

  const statusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      draft: "secondary",
      generated: "default",
      failed: "destructive",
      scheduled: "outline",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Reports</h1>
          <p className="text-muted-foreground text-sm">
            Create and manage reports
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Report
        </Button>
      </div>

      {showCreate && (
        <Card className="max-w-3xl space-y-4 p-4">
          <CardHeader>
            <CardTitle>Create Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Title</label>
                <Input
                  name="title"
                  placeholder="Report Title"
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
                    {reportTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Format</label>
                <Select
                  value={createData.format}
                  onValueChange={(v) =>
                    setCreateData({ ...createData, format: v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Date From
                </label>
                <Input
                  name="dateFrom"
                  type="date"
                  value={createData.dateFrom}
                  onChange={(e) =>
                    setCreateData({ ...createData, dateFrom: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Date To
                </label>
                <Input
                  name="dateTo"
                  type="date"
                  value={createData.dateTo}
                  onChange={(e) =>
                    setCreateData({ ...createData, dateTo: e.target.value })
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
                      type: "sales",
                      format: "json",
                      status: "draft",
                      config: {},
                      filters: {},
                      dateFrom: "",
                      dateTo: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Report</Button>
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
              placeholder="Search reports..."
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
                {reportTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
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
                  <TableHead>Report</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Date Range</TableHead>
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
                      No reports found
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.format.toUpperCase()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(item.dateFrom)} - {formatDate(item.dateTo)}
                      </TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.status === "draft" && (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleGenerate(item.id)}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditData({
                                title: item.title,
                                description: item.description || "",
                                type: item.type,
                                format: item.format,
                                status: item.status,
                                config: item.config || {},
                                filters: item.filters || {},
                                dateFrom: item.dateFrom
                                  ? item.dateFrom.split("T")[0]
                                  : "",
                                dateTo: item.dateTo
                                  ? item.dateTo.split("T")[0]
                                  : "",
                              });
                              setEditingId(item.id);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {item.resultPath && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                window.open(item.resultPath!, "_blank")
                              }
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
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
                <CardTitle>Edit Report</CardTitle>
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
                      {reportTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Format
                  </label>
                  <Select
                    value={editData.format}
                    onValueChange={(v) =>
                      setEditData({ ...editData, format: v })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f.toUpperCase()}
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
                    Date From
                  </label>
                  <Input
                    type="date"
                    value={editData.dateFrom}
                    onChange={(e) =>
                      setEditData({ ...editData, dateFrom: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Date To
                  </label>
                  <Input
                    type="date"
                    value={editData.dateTo}
                    onChange={(e) =>
                      setEditData({ ...editData, dateTo: e.target.value })
                    }
                  />
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
