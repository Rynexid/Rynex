"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
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
import {
  getLifecycleStages,
  createLifecycleStage,
  updateLifecycleStage,
  deleteLifecycleStage,
  getProductsForLifecycle,
} from "@/server/actions/lifecycle";

interface LifecycleStage {
  id: number;
  name: string;
  description: string | null;
  stage: string;
  progress: number;
  product: string;
  status: string;
  productId: number | null;
  createdAt: string;
}

export default function LifecycleClientPage() {
  const [items, setItems] = useState<LifecycleStage[]>([]);
  const [products, setProducts] = useState<Array<{ id: number; name: string }>>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    stage: "planning",
    progress: 0,
    product: "",
    status: "active",
    productId: undefined as number | undefined,
  });
  const [showCreate, setShowCreate] = useState(false);
  const [createData, setCreateData] = useState({
    name: "",
    description: "",
    stage: "planning",
    progress: 0,
    product: "",
    status: "planning",
    productId: undefined as number | undefined,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const stages = [
    "planning",
    "discovery",
    "design",
    "development",
    "testing",
    "deployment",
    "launch",
  ];
  const statuses = [
    "planning",
    "in-progress",
    "completed",
    "on-hold",
    "cancelled",
  ];

  const fetchLifecycleStages = useCallback(async () => {
    setLoading(true);
    const res = await getLifecycleStages(page, pageSize, search, statusFilter);
    if (res.success) {
      setItems(res.data || []);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    }
    setLoading(false);
  }, [page, search, statusFilter]);

  const fetchProducts = useCallback(async () => {
    const res = await getProductsForLifecycle();
    if (res.success) {
      setProducts(res.data || []);
    }
  }, []);

  useEffect(() => {
    fetchLifecycleStages();
    fetchProducts();
  }, [fetchLifecycleStages, fetchProducts]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createLifecycleStage({
      name: createData.name,
      description: createData.description || undefined,
      stage: createData.stage,
      progress: createData.progress,
      product: createData.product,
      status: createData.status,
      productId: createData.productId,
    });
    if (res.success) {
      setShowCreate(false);
      setCreateData({
        name: "",
        description: "",
        stage: "planning",
        progress: 0,
        product: "",
        status: "planning",
        productId: undefined,
      });
      fetchLifecycleStages();
    } else {
      alert(res.error || "Failed to create lifecycle stage");
    }
  };

  const handleUpdate = async (id: number) => {
    const res = await updateLifecycleStage(id, editData);
    if (res.success) {
      setEditingId(null);
      fetchLifecycleStages();
    } else {
      alert(res.error || "Failed to update lifecycle stage");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this lifecycle stage?")) return;
    const res = await deleteLifecycleStage(id);
    if (res.success) {
      fetchLifecycleStages();
    } else {
      alert(res.error || "Failed to delete lifecycle stage");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Lifecycle Management</h1>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <span className="mr-2">+</span> Add Stage
        </Button>
      </div>

      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="max-w-2xl space-y-4 rounded border p-4"
        >
          <h2 className="text-lg font-semibold">Add Lifecycle Stage</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <Input
                name="name"
                placeholder="Stage Name"
                value={createData.name}
                onChange={(e) =>
                  setCreateData({ ...createData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Product</label>
              <Select
                value={String(createData.productId || "")}
                onValueChange={(v) =>
                  setCreateData({
                    ...createData,
                    productId: v ? Number(v) : undefined,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Select a product</SelectItem>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={createData.description}
                onChange={(e) =>
                  setCreateData({ ...createData, description: e.target.value })
                }
                className="min-h-[80px] w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Stage</label>
              <Select
                value={createData.stage}
                onValueChange={(v) =>
                  setCreateData({ ...createData, stage: v })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Progress (%)
              </label>
              <Input
                name="progress"
                type="number"
                min="0"
                max="100"
                value={createData.progress}
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    progress: Number(e.target.value),
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
                      {s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCreate(false);
                setCreateData({
                  name: "",
                  description: "",
                  stage: "planning",
                  progress: 0,
                  product: "",
                  status: "planning",
                  productId: undefined,
                });
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create Stage</Button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md">
            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
              🔍
            </span>
            <Input
              placeholder="Search lifecycle stages..."
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
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Progress</TableHead>
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
                    No lifecycle stages found
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.stage}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-32">
                        <div className="bg-muted h-2 overflow-hidden rounded-full">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground text-xs">
                          {item.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "completed"
                            ? "default"
                            : item.status === "in-progress"
                              ? "default"
                              : item.status === "cancelled"
                                ? "destructive"
                                : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditData({
                              name: item.name,
                              description: item.description || "",
                              stage: item.stage,
                              progress: item.progress,
                              product: item.product,
                              status: item.status,
                              productId: item.productId ?? undefined,
                            });
                            setEditingId(item.id);
                          }}
                        >
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                        >
                          <span>Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

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
            <div className="bg-background w-full max-w-md space-y-4 rounded-lg p-6">
              <h2 className="text-lg font-semibold">Edit Lifecycle Stage</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleUpdate(editingId!);
                }}
              >
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Name
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
                    <label className="mb-1 block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      className="min-h-[80px] w-full rounded border p-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Stage
                    </label>
                    <Select
                      value={editData.stage}
                      onValueChange={(v) =>
                        setEditData({ ...editData, stage: v })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "planning",
                          "discovery",
                          "design",
                          "development",
                          "testing",
                          "deployment",
                          "launch",
                        ].map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Progress (%)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={editData.progress}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          progress: Number(e.target.value),
                        })
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
                        {[
                          "planning",
                          "in-progress",
                          "completed",
                          "on-hold",
                          "cancelled",
                        ].map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.charAt(0).toUpperCase() +
                              s.slice(1).replace("-", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
