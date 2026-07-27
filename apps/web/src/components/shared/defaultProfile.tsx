import { User } from "lucide-react";

import { cn } from "@rynex/utils";

interface DefaultProfileProps {
  name: string;
  userRole?: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { avatar: "h-8 w-8", icon: "h-4 w-4", text: "text-xs" },
  md: { avatar: "h-10 w-10", icon: "h-5 w-5", text: "text-sm" },
  lg: { avatar: "h-16 w-16", icon: "h-8 w-8", text: "text-lg" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const gradientMap = [
  "from-[#2563EB] to-[#4F46E5]",
  "from-[#4F46E5] to-[#7C3AED]",
  "from-[#0EA5E9] to-[#2563EB]",
  "from-[#10B981] to-[#0EA5E9]",
  "from-[#F59E0B] to-[#EF4444]",
];

function getGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradientMap[Math.abs(hash) % gradientMap.length];
}

export function DefaultProfile({
  name,
  userRole,
  image,
  size = "md",
  className,
}: DefaultProfileProps) {
  const s = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {image ? (
        <img
          src={image}
          alt={name}
          className={cn(
            "overflow-hidden rounded-full object-cover ring-1 ring-white/10",
            s.avatar,
          )}
        />
      ) : (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ring-1 ring-white/10",
            s.avatar,
            getGradient(name),
          )}
        >
          <span className={cn("font-semibold text-white", s.text)}>
            {getInitials(name)}
          </span>
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{name}</p>
        {userRole && (
          <p className="text-muted-foreground truncate font-mono text-xs">
            {userRole}
          </p>
        )}
      </div>
    </div>
  );
}

export function DefaultProfileAvatar({
  name,
  image,
  size = "md",
  className,
}: Omit<DefaultProfileProps, "role">) {
  const s = sizeMap[size];

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={cn(
          "overflow-hidden rounded-full object-cover ring-1 ring-white/10",
          s.avatar,
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ring-1 ring-white/10",
        s.avatar,
        getGradient(name),
        className,
      )}
    >
      {size === "sm" ? (
        <User className={cn("text-white/80", s.icon)} />
      ) : (
        <span className={cn("font-semibold text-white", s.text)}>
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}
