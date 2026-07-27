import { cn } from "@rynex/utils";

interface AvatarGroupProps {
  items: { initials: string; color?: string }[];
  max?: number;
  size?: "sm" | "md";
}

const sizeMap = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
};

export function AvatarGroup({ items, max = 3, size = "sm" }: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const remaining = items.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((item, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center justify-center rounded-full border-2 border-[#201f22] bg-[#353437] font-bold text-[#e5e1e4]",
            sizeMap[size],
          )}
        >
          {item.initials}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full border-2 border-[#201f22] bg-[#353437] text-xs font-medium text-[#c2c6d6]",
            sizeMap[size],
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
