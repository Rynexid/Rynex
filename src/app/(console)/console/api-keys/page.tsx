"use client";

import { Copy, Eye, EyeOff, Key, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@rynex/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rynex/ui/card";

const apiKeys = [
  {
    name: "Production API Key",
    key: "sk_rynex_prod_a1b2c3d4e5f6g7h8i9j0",
    created: "01 Jul 2026",
    lastUsed: "23 Jul 2026",
  },
  {
    name: "Development API Key",
    key: "sk_rynex_dev_k1l2m3n4o5p6q7r8s9t0",
    created: "15 Jun 2026",
    lastUsed: "22 Jul 2026",
  },
];

export default function ApiKeysPage() {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const toggleVisibility = (key: string) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="bg-background min-h-screen p-8">
      <div className="max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">API Keys</h1>
            <p className="text-muted-foreground">
              Kelola API key untuk integrasi eksternal.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Buat API Key
          </Button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <Card key={apiKey.name} className="glass border-border rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Key className="h-4 w-4" />
                      {apiKey.name}
                    </CardTitle>
                    <CardDescription>
                      Dibuat: {apiKey.created} &middot; Terakhir digunakan:{" "}
                      {apiKey.lastUsed}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <code className="bg-muted flex-1 rounded-lg px-3 py-2 font-mono text-sm">
                    {visible[apiKey.key]
                      ? apiKey.key
                      : apiKey.key.slice(0, 12) + "••••••••••••"}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleVisibility(apiKey.key)}
                  >
                    {visible[apiKey.key] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
