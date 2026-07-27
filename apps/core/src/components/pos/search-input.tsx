"use client";

import { Search } from "lucide-react";

import { cn } from "@rynex/utils";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchInput({
  placeholder = "Search...",
  className,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#c2c6d6]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-full border border-[#27272A] bg-[#1c1b1d] py-2 pr-4 pl-11 text-sm text-[#e5e1e4] transition-all outline-none placeholder:text-[#c2c6d6]/50 focus:border-[#adc6ff] focus:ring-2 focus:ring-[rgba(173,198,255,0.2)]"
      />
    </div>
  );
}
