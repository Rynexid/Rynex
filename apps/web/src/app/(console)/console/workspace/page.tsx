import { FolderOpen, Plus, Settings } from "lucide-react";

import { Button } from "@rynex/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rynex/ui/card";

const workspaces = [
  {
    name: "Default Workspace",
    projects: 3,
    members: 1,
    created: "01 Jul 2026",
  },
];

export default function WorkspacePage() {
  return (
    <main className="bg-background min-h-screen p-8">
      <div className="max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Workspace</h1>
            <p className="text-muted-foreground">
              Kelola workspace dan proyek Anda.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Buat Workspace
          </Button>
        </div>

        <div className="space-y-4">
          {workspaces.map((ws) => (
            <Card key={ws.name} className="glass border-border rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FolderOpen className="h-4 w-4" />
                      {ws.name}
                    </CardTitle>
                    <CardDescription>
                      {ws.projects} proyek &middot; {ws.members} anggota
                      &middot; Dibuat: {ws.created}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Atur
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
