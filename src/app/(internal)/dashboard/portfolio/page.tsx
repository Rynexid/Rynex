"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Image,
  ExternalLink,
  Eye,
  Tag,
  Globe,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  status: string;
  createdAt: string;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "Dashboard SaaS",
      description:
        "Comprehensive admin dashboard with analytics, user management, and reporting",
      category: "Web App",
      technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
      imageUrl: "/portfolio/dashboard-saas.jpg",
      projectUrl: "https://dashboard.example.com",
      githubUrl: "https://github.com/rynex/dashboard",
      featured: true,
      status: "published",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Portfolio Anime",
      description:
        "Anime-themed portfolio website with animations and interactive elements",
      category: "Website",
      technologies: ["React", "Framer Motion", "CSS Modules"],
      imageUrl: "/portfolio/anime-portfolio.jpg",
      projectUrl: "https://anime-portfolio.example.com",
      githubUrl: "",
      featured: true,
      status: "published",
      createdAt: "2024-02-01",
    },
    {
      id: 3,
      title: "E-commerce Starter",
      description:
        "Complete e-commerce starter kit with cart, checkout, and payment integration",
      category: "Web App",
      technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      imageUrl: "/portfolio/ecommerce.jpg",
      projectUrl: "https://shop.example.com",
      githubUrl: "https://github.com/rynex/ecommerce",
      featured: false,
      status: "published",
      createdAt: "2024-03-10",
    },
    {
      id: 4,
      title: "Landing Page Modern",
      description:
        "Modern landing page template with dark mode and smooth animations",
      category: "Landing Page",
      technologies: ["React", "Tailwind", "Framer Motion"],
      imageUrl: "/portfolio/landing.jpg",
      projectUrl: "https://landing.example.com",
      githubUrl: "",
      featured: false,
      status: "draft",
      createdAt: "2024-04-01",
    },
  ]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    category: "web-app",
    technologies: "",
    imageUrl: "",
    projectUrl: "",
    githubUrl: "",
    featured: false,
    status: "draft",
  });

  const categories = [
    "web-app",
    "website",
    "landing-page",
    "mobile-app",
    "api",
    "library",
  ];
  const statuses = ["draft", "published", "archived"];

  const filteredItems = items
    .filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((p) => categoryFilter === "all" || p.category === categoryFilter)
    .filter((p) => statusFilter === "all" || p.status === statusFilter);

  const totalPages = Math.ceil(filteredItems.length / 10);
  const paginatedItems = filteredItems.slice((page - 1) * 10, page * 10);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: PortfolioItem = {
      id: Date.now(),
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      category: String(formData.get("category") || "web-app"),
      technologies: String(formData.get("technologies") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageUrl: String(formData.get("imageUrl") || ""),
      projectUrl: String(formData.get("projectUrl") || ""),
      githubUrl: String(formData.get("githubUrl") || ""),
      featured: formData.get("featured") === "on",
      status: String(formData.get("status") || "draft"),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setItems((prev) => [newItem, ...prev]);
    setShowCreate(false);
    e.currentTarget.reset();
  };

  const handleUpdate = (id: number) => {
    setItems(
      items.map((p) =>
        p.id === editingId
          ? {
              ...p,
              ...editData,
              technologies: editData.technologies
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            }
          : p,
      ),
    );
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this portfolio item?")) return;
    setItems(items.filter((p) => p.id !== id));
  };

  const statusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      draft: "secondary",
      published: "default",
      archived: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Portfolio Management</h1>
          <p className="text-muted-foreground text-sm">
            Showcase your projects and case studies
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {showCreate && (
        <Card className="max-w-3xl space-y-4 p-4">
          <CardHeader>
            <CardTitle>Add Portfolio Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Project Title
                </label>
                <Input name="title" placeholder="Project Title" required />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>
                <Textarea
                  name="description"
                  placeholder="Project description"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Category
                </label>
                <Select name="category" defaultValue="web-app">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c.charAt(0).toUpperCase() +
                          c.slice(1).replace("-", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Status</label>
                <Select name="status" defaultValue="draft">
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
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Technologies (comma separated)
                </label>
                <Input
                  name="technologies"
                  placeholder="Next.js, TypeScript, Tailwind, PostgreSQL"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Image URL
                </label>
                <Input
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Project URL
                </label>
                <Input
                  name="projectUrl"
                  placeholder="https://project.example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  GitHub URL
                </label>
                <Input
                  name="githubUrl"
                  placeholder="https://github.com/user/repo"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  className="border-input rounded"
                />
                <Label htmlFor="featured" className="mb-0">
                  Featured Project
                </Label>
              </div>
              <div className="flex justify-end gap-2 pt-4 md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Project</Button>
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
              placeholder="Search portfolio..."
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
              value={categoryFilter}
              onValueChange={(v) => {
                setCategoryFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1).replace("-", " ")}
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
                  <TableHead>Project</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-muted-foreground py-8 text-center"
                    >
                      No portfolio items found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-muted-foreground line-clamp-1 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.slice(0, 3).map((t, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {t}
                            </Badge>
                          ))}
                          {item.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{statusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.featured ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="text-muted-foreground h-4 w-4" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.projectUrl && (
                            <Button variant="ghost" size="icon" asChild>
                              <a
                                href={item.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {item.githubUrl && (
                            <Button variant="ghost" size="icon" asChild>
                              <a
                                href={item.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Globe className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditData({
                                title: item.title,
                                description: item.description,
                                category: item.category,
                                technologies: item.technologies.join(", "),
                                imageUrl: item.imageUrl,
                                projectUrl: item.projectUrl,
                                githubUrl: item.githubUrl,
                                featured: item.featured,
                                status: item.status,
                              });
                              setEditingId(item.id);
                            }}
                          >
                            <Edit className="h-4 w-4" />
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
            <Card className="max-h-[90vh] w-full max-w-3xl space-y-4 overflow-y-auto p-6">
              <CardHeader>
                <CardTitle>Edit Portfolio Project</CardTitle>
              </CardHeader>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleUpdate(editingId!);
                }}
                className="space-y-3"
              >
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">
                    Project Title
                  </label>
                  <Input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="min-h-[100px]"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Category
                  </label>
                  <Select
                    value={editData.category}
                    onValueChange={(v) =>
                      setEditData({ ...editData, category: v })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c.charAt(0).toUpperCase() +
                            c.slice(1).replace("-", " ")}
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
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">
                    Technologies (comma separated)
                  </label>
                  <Input
                    value={editData.technologies}
                    onChange={(e) =>
                      setEditData({ ...editData, technologies: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    value={editData.imageUrl}
                    onChange={(e) =>
                      setEditData({ ...editData, imageUrl: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Project URL
                  </label>
                  <Input
                    value={editData.projectUrl}
                    onChange={(e) =>
                      setEditData({ ...editData, projectUrl: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    GitHub URL
                  </label>
                  <Input
                    value={editData.githubUrl}
                    onChange={(e) =>
                      setEditData({ ...editData, githubUrl: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editFeatured"
                    checked={editData.featured}
                    onChange={(e) =>
                      setEditData({ ...editData, featured: e.target.checked })
                    }
                    className="border-input rounded"
                  />
                  <Label htmlFor="editFeatured" className="mb-0">
                    Featured Project
                  </Label>
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
