"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Filter, X, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { globalSearch, getSearchSuggestions } from "@/server/actions/search";

interface SearchResult {
  id: number;
  title: string;
  description: string | null;
  type: string;
  createdAt: string;
  url: string;
}

const typeLabels: Record<string, string> = {
  product: "Product",
  license: "License",
  order: "Order",
  customer: "Customer",
  ticket: "Support Ticket",
  lifecycle: "Lifecycle Stage",
  lead: "Lead",
  inquiry: "Inquiry",
  service: "Service",
  content: "Content",
};

const typeColors: Record<string, string> = {
  product: "bg-blue-100 text-blue-800",
  license: "bg-purple-100 text-purple-800",
  order: "bg-green-100 text-green-800",
  customer: "bg-orange-100 text-orange-800",
  ticket: "bg-red-100 text-red-800",
  lifecycle: "bg-indigo-100 text-indigo-800",
  lead: "bg-pink-100 text-pink-800",
  inquiry: "bg-yellow-100 text-yellow-800",
  service: "bg-teal-100 text-teal-800",
  content: "bg-gray-100 text-gray-800",
};

export default function SearchClientPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["all"]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const availableTypes = [
    { value: "all", label: "All" },
    { value: "products", label: "Products" },
    { value: "licenses", label: "Licenses" },
    { value: "orders", label: "Orders" },
    { value: "customers", label: "Customers" },
    { value: "tickets", label: "Support Tickets" },
    { value: "lifecycle", label: "Lifecycle Stages" },
    { value: "leads", label: "Leads" },
    { value: "inquiries", label: "Inquiries" },
    { value: "services", label: "Services" },
    { value: "content", label: "Content" },
  ];

  const debouncedSearch = useRef<NodeJS.Timeout | null>(null);
  const debouncedSuggestions = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(
    async (searchQuery: string, searchPage = 1) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setPagination({ page: 1, pageSize: 10, total: 0, totalPages: 0 });
        return;
      }

      setLoading(true);
      const res = await globalSearch(
        searchQuery,
        searchPage,
        pageSize,
        selectedTypes,
      );
      if (res.success) {
        setResults(res.data || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } else {
        setResults([]);
        setPagination({ page: 1, pageSize: 10, total: 0, totalPages: 0 });
      }
      setLoading(false);
    },
    [selectedTypes],
  );

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setSuggestionsLoading(true);
    const res = await getSearchSuggestions(searchQuery);
    if (res.success) {
      setSuggestions(res.data || []);
    }
    setSuggestionsLoading(false);
  }, []);

  useEffect(() => {
    if (debouncedSearch.current) clearTimeout(debouncedSearch.current);
    debouncedSearch.current = setTimeout(() => {
      performSearch(query, 1);
      setPage(1);
    }, 300);

    return () => {
      if (debouncedSearch.current) clearTimeout(debouncedSearch.current);
    };
  }, [query, performSearch]);

  useEffect(() => {
    if (debouncedSuggestions.current)
      clearTimeout(debouncedSuggestions.current);
    debouncedSuggestions.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 150);

    return () => {
      if (debouncedSuggestions.current)
        clearTimeout(debouncedSuggestions.current);
    };
  }, [query, fetchSuggestions]);

  const handleTypeChange = (type: string) => {
    if (type === "all") {
      setSelectedTypes(["all"]);
    } else {
      const newTypes = selectedTypes.includes("all")
        ? [type]
        : selectedTypes.includes(type)
          ? selectedTypes.filter((t) => t !== type)
          : [...selectedTypes, type];
      if (newTypes.length === 0) {
        setSelectedTypes(["all"]);
      } else {
        setSelectedTypes(newTypes);
      }
    }
    performSearch(query, 1);
    setPage(1);
  };

  const handleResultClick = (result: SearchResult) => {
    window.location.href = result.url;
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSuggestions([]);
    setPagination({ page: 1, pageSize: 10, total: 0, totalPages: 0 });
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-xl font-bold">Global Search</h1>
        <p className="text-muted-foreground text-sm">
          Search across all your data
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-3xl">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
              <Input
                ref={inputRef}
                placeholder="Search products, orders, customers, tickets..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pr-12 pl-12 text-lg"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={clearSearch}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>

            {(showSuggestions || query) && (
              <div
                ref={suggestionsRef}
                className="bg-popover absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border shadow-lg"
              >
                {suggestionsLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="text-primary h-5 w-5 animate-spin" />
                  </div>
                )}
                {suggestions.length > 0 && (
                  <div className="border-b p-2">
                    <p className="text-muted-foreground px-3 py-2 text-xs font-medium">
                      Suggestions
                    </p>
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        className="hover:bg-accent w-full rounded-sm px-3 py-2 text-left text-sm"
                        onClick={() => {
                          setQuery(s);
                          setShowSuggestions(false);
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {selectedTypes.length > 0 && (
                  <div className="p-2">
                    <p className="text-muted-foreground px-3 py-2 text-xs font-medium">
                      Search in
                    </p>
                    {availableTypes.map((t) => (
                      <label
                        key={t.value}
                        className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(t.value)}
                          onChange={() => handleTypeChange(t.value)}
                          className="border-input h-4 w-4 rounded"
                        />
                        <span className="text-sm">{t.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {query && (
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <span>
              {pagination.total} result{pagination.total !== 1 ? "s" : ""} for "
              {query}"
            </span>
            {loading && (
              <Loader2 className="text-primary h-4 w-4 animate-spin" />
            )}
          </div>
        )}

        {results.length === 0 && query && !loading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="text-muted-foreground mx-auto h-12 w-12" />
              <h3 className="mt-4 text-lg font-medium">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          results.map((result) => (
            <Card
              key={`${result.type}-${result.id}`}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => handleResultClick(result)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="truncate font-medium">{result.title}</h3>
                      <Badge
                        className={
                          typeColors[result.type] || "bg-gray-100 text-gray-800"
                        }
                      >
                        {typeLabels[result.type] || result.type}
                      </Badge>
                    </div>
                    {result.description && (
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {result.description}
                      </p>
                    )}
                    <p className="text-muted-foreground mt-1 text-xs">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <ChevronRight className="text-muted-foreground h-5 w-5 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                performSearch(query, page - 1);
                setPage(page - 1);
              }}
              disabled={page === 1 || loading}
            >
              Prev
            </Button>
            <span className="text-muted-foreground text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                performSearch(query, page + 1);
                setPage(page + 1);
              }}
              disabled={page === pagination.totalPages || loading}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
