import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Larger max width for navbar / wide dashboards */
  size?: "default" | "wide" | "narrow";
  as?: "div" | "section" | "main";
}

const SIZE_CLASS = {
  default: "max-w-7xl",
  wide: "max-w-[1440px]",
  narrow: "max-w-6xl",
} as const;

/**
 * Shared page gutters — mobile-first, consistent horizontal padding.
 * Prefer this over ad-hoc `mx-auto max-w-* px-*` duplication.
 */
export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full min-w-0 px-4 sm:px-6",
        SIZE_CLASS[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
