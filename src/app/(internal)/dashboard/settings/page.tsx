"use client";

import { useState } from "react";
import { Save, Bell, Shield, Palette, Globe, Database, Key, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [general, setGeneral] = useState({
    siteName: "Rynex",
    siteDescription: "Modern dashboard and business management platform",
    siteUrl: "https://rynex.com",
    timezone: "Asia/Jakarta",
    language: "en",
    maintenanceMode: false,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    newUserAlerts: true,
    orderAlerts: true,
    systemAlerts: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
    loginAttempts: 5,
    ipWhitelist: "",
  });

  const [appearance, setAppearance] = useState({
    theme: "system",
    primaryColor: "blue",
    borderRadius: "md",
    compactMode: false,
    sidebarCollapsed: false,
  });

  const [integrations, setIntegrations] = useState({
    googleAnalytics: "",
    sentryDsn: "",
    stripeKey: "",
    slackWebhook: "",
    discordWebhook: "",
    webhookUrl: "",
  });

  const [activeTab, setActiveTab] = useState("general");

  const handleSave = (tab: string) => {
    // In real app, save to API
    alert(`${tab.charAt(0).toUpperCase() + tab.slice(1)} settings saved!`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your application settings and preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic configuration for your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" value={general.siteName} onChange={e => setGeneral({...general, siteName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input id="siteUrl" type="url" value={general.siteUrl} onChange={e => setGeneral({...general, siteUrl: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={general.timezone} onValueChange={v => setGeneral({...general, timezone: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                      <SelectItem value="Asia/Singapore">Asia/Singapore (SGT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={general.language} onValueChange={v => setGeneral({...general, language: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="id">Indonesian</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <textarea id="siteDescription" className="w-full rounded border p-2 min-h-[80px]" value={general.siteDescription} onChange={e => setGeneral({...general, siteDescription: e.target.value})} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable to show maintenance page to visitors</p>
                </div>
                <Switch checked={general.maintenanceMode} onCheckedChange={checked => setGeneral({...general, maintenanceMode: checked})} />
              </div>
              <Button onClick={() => handleSave("general")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => {
                const labels: Record<string, string> = {
                  emailNotifications: "Email Notifications",
                  pushNotifications: "Push Notifications",
                  weeklyDigest: "Weekly Digest",
                  newUserAlerts: "New User Alerts",
                  orderAlerts: "Order Alerts",
                  systemAlerts: "System Alerts",
                };
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>{labels[key]}</Label>
                      <p className="text-sm text-muted-foreground">Receive {labels[key].toLowerCase()} via email</p>
                    </div>
                    <Switch checked={value} onCheckedChange={checked => setNotifications({...notifications, [key]: checked})} />
                  </div>
                );
              })}
              <Separator />
              <Button onClick={() => handleSave("notifications")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and authentication options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all team members</p>
                </div>
                <Switch checked={security.twoFactorAuth} onCheckedChange={checked => setSecurity({...security, twoFactorAuth: checked})} />
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" value={security.sessionTimeout} onChange={e => setSecurity({...security, sessionTimeout: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input id="passwordMinLength" type="number" value={security.passwordMinLength} onChange={e => setSecurity({...security, passwordMinLength: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input id="loginAttempts" type="number" value={security.loginAttempts} onChange={e => setSecurity({...security, loginAttempts: Number(e.target.value)})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ipWhitelist">IP Whitelist (comma separated)</Label>
                <Input id="ipWhitelist" value={security.ipWhitelist} onChange={e => setSecurity({...security, ipWhitelist: e.target.value})} placeholder="192.168.1.1, 10.0.0.1" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Require Special Characters</Label>
                  <p className="text-sm text-muted-foreground">Enforce special characters in passwords</p>
                </div>
                <Switch checked={security.requireSpecialChars} onCheckedChange={checked => setSecurity({...security, requireSpecialChars: checked})} />
              </div>
              <Button onClick={() => handleSave("security")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={appearance.theme} onValueChange={v => setAppearance({...appearance, theme: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <Select value={appearance.primaryColor} onValueChange={v => setAppearance({...appearance, primaryColor: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="emerald">Emerald</SelectItem>
                      <SelectItem value="violet">Violet</SelectItem>
                      <SelectItem value="amber">Amber</SelectItem>
                      <SelectItem value="rose">Rose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Border Radius</Label>
                  <Select value={appearance.borderRadius} onValueChange={v => setAppearance({...appearance, borderRadius: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="full">Full</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Reduce spacing for denser UI</p>
                </div>
                <Switch checked={appearance.compactMode} onCheckedChange={checked => setAppearance({...appearance, compactMode: checked})} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Collapsed Sidebar</Label>
                  <p className="text-sm text-muted-foreground">Start with sidebar collapsed</p>
                </div>
                <Switch checked={appearance.sidebarCollapsed} onCheckedChange={checked => setAppearance({...appearance, sidebarCollapsed: checked})} />
              </div>
              <Button onClick={() => handleSave("appearance")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect third-party services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                  <Input id="googleAnalytics" value={integrations.googleAnalytics} onChange={e => setIntegrations({...integrations, googleAnalytics: e.target.value})} placeholder="G-XXXXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sentryDsn">Sentry DSN</Label>
                  <Input id="sentryDsn" value={integrations.sentryDsn} onChange={e => setIntegrations({...integrations, sentryDsn: e.target.value})} placeholder="https://xxx@sentry.io/xxx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripeKey">Stripe Publishable Key</Label>
                  <Input id="stripeKey" value={integrations.stripeKey} onChange={e => setIntegrations({...integrations, stripeKey: e.target.value})} placeholder="pk_live_xxx" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input id="webhookUrl" value={integrations.webhookUrl} onChange={e => setIntegrations({...integrations, webhookUrl: e.target.value})} placeholder="https://yourdomain.com/webhook" />
              </div>
              <Button onClick={() => handleSave("integrations")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for external access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Generate New API Key</Label>
                <Button variant="outline" onClick={() => alert("API key generated! Save it securely.")}>
                  <Key className="mr-2 h-4 w-4" />
                  Generate API Key
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">No API keys created yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>Configure team-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Allow Member Invitations</Label>
                  <p className="text-sm text-muted-foreground">Let team members invite new users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Require Approval for New Members</Label>
                  <p className="text-sm text-muted-foreground">Admin must approve new team members</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultRole">Default Role for New Members</Label>
                <Select value="member" onValueChange={v => {}}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleSave("team")}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}