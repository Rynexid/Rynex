import { cn } from "@rynex/utils";

type StatusVariant =
  | "paid"
  | "pending"
  | "overdue"
  | "draft"
  | "sent"
  | "active"
  | "completed"
  | "cancelled";

interface StatusBadgeProps {
  variant: StatusVariant;
  label?: string;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  paid: "bg-[rgba(74,225,118,0.1)] text-[#4ae176]",
  pending: "bg-[rgba(255,185,95,0.1)] text-[#ffb95f]",
  overdue: "bg-[rgba(255,180,171,0.1)] text-[#ffb4ab]",
  draft: "bg-[rgba(194,198,214,0.1)] text-[#c2c6d6]",
  sent: "bg-[rgba(173,198,255,0.1)] text-[#adc6ff]",
  active: "bg-[rgba(173,198,255,0.1)] text-[#adc6ff]",
  completed: "bg-[rgba(74,225,118,0.1)] text-[#4ae176]",
  cancelled: "bg-[rgba(255,180,171,0.1)] text-[#ffb4ab]",
};

export function StatusBadge({ variant, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {label ?? variant}
    </span>
  );
}
