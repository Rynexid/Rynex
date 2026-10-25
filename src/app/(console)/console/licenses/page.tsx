import { Shield, Key, Globe, Calendar } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rynex/ui/card";

const licenses = [
  {
    key: "SRK-PRO-ABCD-2026",
    type: "Pro",
    domain: "example.com",
    expires: "29 Apr 2027",
    status: "Aktif",
  },
  {
    key: "SRK-FREE-1234-2026",
    type: "Free",
    domain: "test.com",
    expires: "Tidak terbatas",
    status: "Aktif",
  },
];

export default function LicensesPage() {
  return (
    <main className="bg-background min-h-screen p-8">
      <div className="max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Lisensi Saya</h1>
        <p className="text-muted-foreground mb-8">
          Kelola lisensi dan aktivasi domain Anda.
        </p>

        <div className="space-y-4">
          {licenses.map((license) => (
            <Card key={license.key} className="glass border-border rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      {license.key}
                    </CardTitle>
                    <CardDescription>{license.type} License</CardDescription>
                  </div>
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-500">
                    {license.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Key className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground">Tipe</p>
                      <p className="font-medium">{license.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground">Domain</p>
                      <p className="font-medium">{license.domain}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground">Berlaku hingga</p>
                      <p className="font-medium">{license.expires}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
