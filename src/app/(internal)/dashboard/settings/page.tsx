"use client";

import { useState, useEffect, useCallback } from "react";
import {
  User,
  Key,
  Building2,
  Save,
  Plus,
  Trash2,
  Copy,
  Bell,
  Shield,
  Palette,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getUserProfile,
  updateUserProfile,
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getApiKeys,
  createApiKey,
  revokeApiKey,
} from "@/server/actions/settings";

interface UserProfile {
  id: number;
  userId: string;
  company: string | null;
  phone: string | null;
  timezone: string | null;
  preferredLanguage: string | null;
}

interface Workspace {
  id: number;
  name: string;
  userId: string;
  createdAt: string;
}

interface ApiKey {
  id: number;
  name: string;
  keyPrefix: string;
  keyHash: string;
  createdAt: string;
}

export default function SettingsClientPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
  const [showCreateApiKey, setShowCreateApiKey] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newApiKeyName, setNewApiKeyName] = useState("");
  const [newApiKeyValue, setNewApiKeyValue] = useState("");

  const [profileData, setProfileData] = useState({
    company: "",
    phone: "",
    timezone: "UTC",
    preferredLanguage: "en",
  });

  const timezones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
    "Pacific/Auckland",
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese" },
  ];

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const res = await getUserProfile();
    if (res.success && res.data) {
      setProfile(res.data.profile);
      setWorkspaces(res.data.workspaces || []);
      setApiKeys(res.data.apiKeys || []);
      if (res.data.profile) {
        setProfileData({
          company: res.data.profile.company || "",
          phone: res.data.profile.phone || "",
          timezone: res.data.profile.timezone || "UTC",
          preferredLanguage: res.data.profile.preferredLanguage || "en",
        });
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleProfileSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateUserProfile(profileData);
    if (res.success) {
      fetchProfile();
    } else {
      alert(res.error || "Failed to save profile");
    }
    setSaving(false);
  };

  const handleCreateWorkspace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createWorkspace({ name: newWorkspaceName });
    if (res.success) {
      setShowCreateWorkspace(false);
      setNewWorkspaceName("");
      fetchProfile();
    } else {
      alert(res.error || "Failed to create workspace");
    }
  };

  const handleUpdateWorkspace = async (id: number, name: string) => {
    const res = await updateWorkspace(id, { name });
    if (res.success) {
      fetchProfile();
    } else {
      alert(res.error || "Failed to update workspace");
    }
  };

  const handleDeleteWorkspace = async (id: number) => {
    if (!confirm("Delete this workspace?")) return;
    const res = await deleteWorkspace(id);
    if (res.success) {
      fetchProfile();
    } else {
      alert(res.error || "Failed to delete workspace");
    }
  };

  const handleCreateApiKey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createApiKey({ name: newApiKeyName });
    if (res.success && res.data?.[0]) {
      const key = res.data[0];
      setNewApiKeyValue(`${key.keyPrefix}...${key.keyHash.slice(-8)}`);
      setShowCreateApiKey(true);
      setNewApiKeyName("");
      fetchProfile();
    } else {
      alert(res.error || "Failed to create API key");
    }
  };

  const handleRevokeApiKey = async (id: number) => {
    if (!confirm("Revoke this API key?")) return;
    const res = await revokeApiKey(id);
    if (res.success) {
      fetchProfile();
    } else {
      alert(res.error || "Failed to revoke API key");
    }
  };

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    alert("API key copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account, workspaces, and API keys
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="workspaces">
            <Building2 className="mr-2 h-4 w-4" />
            Workspaces
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal and company information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          company: e.target.value,
                        })
                      }
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={profileData.timezone}
                      onValueChange={(v) =>
                        setProfileData({ ...profileData, timezone: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz} value={tz}>
                            {tz}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select
                      value={profileData.preferredLanguage}
                      onValueChange={(v) =>
                        setProfileData({ ...profileData, preferredLanguage: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-muted-foreground text-sm">
                      Receive email updates about your account
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-muted-foreground text-sm">
                      Get notified about suspicious activity
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the dashboard looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-muted-foreground text-sm">
                      Use dark theme for the dashboard
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="font-medium">System Theme</p>
                    <p className="text-muted-foreground text-sm">
                      Follow system preference for theme
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspaces">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Workspaces</h2>
              <p className="text-muted-foreground text-sm">
                Manage your workspaces and switch between them
              </p>
            </div>
            <Button onClick={() => setShowCreateWorkspace(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Workspace
            </Button>
          </div>

          {showCreateWorkspace && (
            <Card className="space-y-4 p-4">
              <CardHeader>
                <CardTitle>Create Workspace</CardTitle>
              </CardHeader>
              <form
                onSubmit={handleCreateWorkspace}
                className="grid gap-4 md:grid-cols-3"
              >
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="workspaceName">Workspace Name</Label>
                  <Input
                    id="workspaceName"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    placeholder="My Workspace"
                    required
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button type="submit">Create</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateWorkspace(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((ws) => (
              <Card key={ws.id} className="space-y-4">
                <CardHeader>
                  <CardTitle>{ws.name}</CardTitle>
                  <CardDescription>
                    Created {new Date(ws.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newName = prompt("New workspace name:", ws.name);
                      if (newName && newName !== ws.name) {
                        handleUpdateWorkspace(ws.id, newName);
                      }
                    }}
                  >
                    Rename
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteWorkspace(ws.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
            {workspaces.length === 0 && (
              <Card className="py-12 text-center md:col-span-2 lg:col-span-3">
                <Building2 className="text-muted-foreground mx-auto h-12 w-12" />
                <h3 className="mt-4 text-lg font-medium">No workspaces yet</h3>
                <p className="text-muted-foreground">
                  Create your first workspace to get started
                </p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="api">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">API Keys</h2>
              <p className="text-muted-foreground text-sm">
                Manage your API keys for programmatic access
              </p>
            </div>
            <Button onClick={() => setShowCreateApiKey(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Generate API Key
            </Button>
          </div>

          {showCreateApiKey && newApiKeyValue && (
            <Card className="space-y-4 border-green-500 p-4">
              <CardHeader>
                <CardTitle className="text-green-600">
                  New API Key Generated!
                </CardTitle>
                <CardDescription>
                  Copy this key now. You won't be able to see it again.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    value={newApiKeyValue}
                    readOnly
                    className="flex-1 font-mono"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleCopyApiKey(newApiKeyValue)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateApiKey(false);
                      setNewApiKeyValue("");
                    }}
                  >
                    Done
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Prefix</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-muted-foreground py-8 text-center"
                      >
                        No API keys yet. Generate one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    apiKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium">
                          {key.name}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {key.keyPrefix}...{key.keyHash.slice(-8)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(key.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRevokeApiKey(key.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
