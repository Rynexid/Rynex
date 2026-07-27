import { Package, Eye } from "lucide-react";
import Link from "next/link";

import { Button } from "@rynex/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rynex/ui/card";

const orders = [
  {
    id: "ORD-2026-001",
    product: "Rynex Pro Template",
    date: "15 Jul 2026",
    amount: "Rp 499.000",
    status: "Selesai",
  },
  {
    id: "ORD-2026-002",
    product: "Custom Landing Page",
    date: "02 Jul 2026",
    amount: "Rp 2.500.000",
    status: "Dikerjakan",
  },
  {
    id: "ORD-2026-003",
    product: "Rynex Free Template",
    date: "28 Jun 2026",
    amount: "Gratis",
    status: "Selesai",
  },
];

export default function OrdersPage() {
  return (
    <main className="bg-background min-h-screen p-8">
      <div className="max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Pesanan Saya</h1>
        <p className="text-muted-foreground mb-8">
          Lacak pesanan dan status proyek Anda.
        </p>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="glass border-border rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.product}</CardTitle>
                    <CardDescription>
                      {order.id} &middot; {order.date}
                    </CardDescription>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      order.status === "Selesai"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-blue-500/20 text-blue-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{order.amount}</span>
                  <Link href={`/console/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Detail
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
