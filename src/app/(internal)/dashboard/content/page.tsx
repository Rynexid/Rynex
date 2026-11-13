"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, FileText, Image, Video, Globe, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface ContentItem {
  id: number;
  title: string;
  type: string;
  status: string;
  category: string;
  author: string;
  publishedAt: string;
  views: number;
  slug: string;
}

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([
    { id: 1, title: "Getting Started with Dashboard SaaS", type: "article", status: "published", category: "Documentation", author: "John Doe", publishedAt: "2024-01-15", views: 1250, slug: "getting-started-dashboard-saas" },
    { id: 2, title: "Portfolio Anime Showcase", type: "case-study", status: "published", category: "Portfolio", author: "Jane Smith", publishedAt: "2024-02-01", views: 3420, slug: "portfolio-anime-showcase" },
    { id: 3, title: "E-commerce Starter Guide", type: "tutorial", status: "draft", category: "Tutorials", author: "Bob Wilson", publishedAt: "", views: 0, slug: "ecommerce-starter-guide" },
    { id: 4, title: "Landing Page Design Tips", type: "article", status: "published", category: "Design", author: "Alice Brown", publishedAt: "2024-03-10", views: 890, slug: "landing-page-design-tips" },
    { id: 5, title: "API Reference v2", type: "documentation", status: "review", category: "API", author: "Charlie Davis", publishedAt: "", views: 0, slug: "api-reference-v2" },
  ]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ title: "", type: "article", status: "draft", category: "", author: "", slug: "" });

  const types = ["article", "case-study", "tutorial", "documentation", "announcement", "video"];
  const statuses = ["draft", "review", "published", "archived"];
  const categories = ["Documentation", "Portfolio", "Tutorials", "Design", "API", "Marketing", "Blog"];

  const filteredItems = items
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => typeFilter === "all" || p.type === typeFilter)
    .filter(p => statusFilter === "all" || p.status === statusFilter);

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") || "");
    const newItem: ContentItem = {
      id: Date.now(),
      title,
      type: String(formData.get("type") || "article"),
      status: String(formData.get("status") || "draft"),
      category: String(formData.get("category") || ""),
      author: String(formData.get("author") || ""),
      publishedAt: String(formData.get("status") === "published" ? new Date().toISOString().split("T")[0] : ""),
      views: 0,
      slug: String(formData.get("slug") || title.toLowerCase().replace(/\s+/g, "-")),
    };
    setItems(prev => [newItem, ...prev]);
    setShowCreate(false);
    e.currentTarget.reset();
  };

  const handleUpdate = (id: number) => {
    setItems(items.map(p => p.id === editingId ? { ...p, ...editData } : p));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this content item?")) return;
    setItems(items.filter(p => p.id !== id));
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "secondary",
      review: "outline",
      published: "default",
      archived: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "article": return <FileText className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "documentation": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Content Management</h1>
          <p className="text-sm text-muted-foreground">Manage articles, tutorials, and documentation</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Content
        </Button>
      </div>

      {showCreate && (
        <Card className="p-4 space-y-4 max-w-2xl">
          <CardHeader>
            <CardTitle>Add Content</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input name="title" placeholder="Content Title" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <Select name="type" defaultValue="article">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {types.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select name="category" defaultValue="Blog">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select name="status" defaultValue="draft">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <Input name="author" placeholder="Author Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <Input name="slug" placeholder="url-friendly-slug" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button type="submit">Create Content</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search content..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={v => { setTypeFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No content found</TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium max-w-[300px] truncate">{item.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {typeIcon(item.type)}
                          <span className="text-sm capitalize">{item.type.replace("-", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary">{item.category}</Badge></TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>{item.publishedAt || "—"}</TableCell>
                      <TableCell>{item.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => {
                            setEditData({ title: item.title, type: item.type, status: item.status, category: item.category, author: item.author, slug: item.slug });
                            setEditingId(item.id);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Preview">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
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
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
          </div>
        )}

        {editingId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md p-6 space-y-4">
              <CardHeader><CardTitle>Edit Content</CardTitle></CardHeader>
              <form onSubmit={async (e) => { e.preventDefault(); await handleUpdate(editingId!); }} className="space-y-3">
                <div><label className="block text-sm font-medium mb-1">Title</label><Input value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Type</label><Select value={editData.type} onValueChange={v => setEditData({...editData, type: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{types.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Category</label><Select value={editData.category} onValueChange={v => setEditData({...editData, category: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Status</label><Select value={editData.status} onValueChange={v => setEditData({...editData, status: v})}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}</SelectContent></Select></div>
                <div><label className="block text-sm font-medium mb-1">Author</label><Input value={editData.author} onChange={e => setEditData({...editData, author: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium mb-1">Slug</label><Input value={editData.slug} onChange={e => setEditData({...editData, slug: e.target.value})} /></div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
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