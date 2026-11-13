"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  Truck,
  Check,
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

interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  email: string;
  product: string;
  amount: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [items, setItems] = useState<Order[]>([
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customer: "John Doe",
      email: "john@example.com",
      product: "Dashboard SaaS",
      amount: "Rp 2.5M",
      status: "completed",
      paymentStatus: "paid",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      product: "Portfolio Anime",
      amount: "Rp 1.8M",
      status: "processing",
      paymentStatus: "paid",
      createdAt: "2024-01-16",
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      customer: "Bob Wilson",
      email: "bob@example.com",
      product: "E-commerce Starter",
      amount: "Rp 3.2M",
      status: "pending",
      paymentStatus: "pending",
      createdAt: "2024-01-17",
    },
    {
      id: 4,
      orderNumber: "ORD-2024-004",
      customer: "Alice Brown",
      email: "alice@example.com",
      product: "Landing Page Modern",
      amount: "Rp 1.5M",
      status: "shipped",
      paymentStatus: "paid",
      createdAt: "2024-01-18",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    orderNumber: "",
    customer: "",
    email: "",
    product: "",
    amount: "",
    status: "pending",
    paymentStatus: "pending",
  });

  const statuses = [
    "pending",
    "processing",
    "shipped",
    "completed",
    "cancelled",
  ];
  const paymentStatuses = ["pending", "paid", "failed", "refunded"];

  const filteredItems = items
    .filter(
      (p) =>
        p.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        p.customer.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.product.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((p) => statusFilter === "all" || p.status === statusFilter)
    .filter(
      (p) => paymentFilter === "all" || p.paymentStatus === paymentFilter,
    );

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: Order = {
      id: Date.now(),
      orderNumber: String(
        formData.get("orderNumber") ||
          `ORD-${new Date().getFullYear()}-${String(items.length + 1).padStart(3, "0")}`,
      ),
      customer: String(formData.get("customer") || ""),
      email: String(formData.get("email") || ""),
      product: String(formData.get("product") || ""),
      amount: String(formData.get("amount") || ""),
      status: String(formData.get("status") || "pending"),
      paymentStatus: String(formData.get("paymentStatus") || "pending"),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setItems((prev) => [newItem, ...prev]);
    setShowCreate(false);
    e.currentTarget.reset();
  };

  const handleUpdate = (id: number) => {
    setItems(
      items.map((p) => (p.id === editingId ? { ...p, ...editData } : p)),
    );
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this order?")) return;
    setItems(items.filter((p) => p.id !== id));
  };

  const statusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      pending: "secondary",
      processing: "default",
      shipped: "default",
      completed: "default",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const paymentBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      pending: "secondary",
      paid: "default",
      failed: "destructive",
      refunded: "outline",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Order Management</h1>
          <p className="text-muted-foreground text-sm">
            Manage customer orders and fulfillment
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Order
        </Button>
      </div>

      {showCreate && (
        <Card className="max-w-2xl space-y-4 p-4">
          <CardHeader>
            <CardTitle>Add Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Order Number
                </label>
                <Input name="orderNumber" placeholder="ORD-2024-005" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer
                </label>
                <Input name="customer" placeholder="Customer Name" required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="customer@example.com"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Product
                </label>
                <Input name="product" placeholder="Product Name" required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Amount</label>
                <Input name="amount" placeholder="Rp 0" required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Status</label>
                <Select name="status" defaultValue="pending">
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
                  Payment Status
                </label>
                <Select name="paymentStatus" defaultValue="pending">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentStatuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4 md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Order</Button>
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
              placeholder="Search orders..."
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
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={paymentFilter}
              onValueChange={(v) => {
                setPaymentFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                {paymentStatuses.map((s) => (
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
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-muted-foreground py-8 text-center"
                    >
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">
                        {item.orderNumber}
                      </TableCell>
                      <TableCell>{item.customer}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell className="font-medium">
                        {item.amount}
                      </TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell>{paymentBadge(item.paymentStatus)}</TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditData({
                                orderNumber: item.orderNumber,
                                customer: item.customer,
                                email: item.email,
                                product: item.product,
                                amount: item.amount,
                                status: item.status,
                                paymentStatus: item.paymentStatus,
                              });
                              setEditingId(item.id);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Mark shipped"
                          >
                            <Truck className="h-4 w-4" />
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

        {totalPages > 1 && (
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
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {editingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-md space-y-4 p-6">
              <CardHeader>
                <CardTitle>Edit Order</CardTitle>
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
                    Order Number
                  </label>
                  <Input
                    value={editData.orderNumber}
                    onChange={(e) =>
                      setEditData({ ...editData, orderNumber: e.target.value })
                    }
                    readOnly
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Customer
                  </label>
                  <Input
                    value={editData.customer}
                    onChange={(e) =>
                      setEditData({ ...editData, customer: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Product
                  </label>
                  <Input
                    value={editData.product}
                    onChange={(e) =>
                      setEditData({ ...editData, product: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Amount
                  </label>
                  <Input
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({ ...editData, amount: e.target.value })
                    }
                    required
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
                    Payment Status
                  </label>
                  <Select
                    value={editData.paymentStatus}
                    onValueChange={(v) =>
                      setEditData({ ...editData, paymentStatus: v })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentStatuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
