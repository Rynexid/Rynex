"use client";

import * as React from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  value: { from: Date | undefined; to: Date | undefined };
  onChange: (value: { from: Date | undefined; to: Date | undefined }) => void;
  className?: string;
  disabled?: boolean;
}

export function DateRangePicker({
  value,
  onChange,
  className,
  disabled,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const from = value.from;
  const to = value.to;

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const displayValue = from && to ? `${formatDate(from)} – ${formatDate(to)}` : "Select date range";

  const handleSelect = (selected: DateRange | undefined) => {
    if (selected && selected.from && selected.to) {
      onChange({ from: selected.from, to: selected.to });
    } else if (selected && selected.from) {
      onChange({ from: selected.from, to: undefined });
    } else {
      onChange({ from: undefined, to: undefined });
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[300px] justify-start text-left font-normal", className)}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayValue}
          <ChevronLeft className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <DayPicker
          mode="range"
          selected={from && to ? { from, to } : undefined}
          onSelect={handleSelect}
          numberOfMonths={2}
          className="rounded-md border p-2"
        />
      </PopoverContent>
    </Popover>
  );
}