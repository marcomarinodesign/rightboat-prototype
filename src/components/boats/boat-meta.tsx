import { cn } from "@/lib/utils"

type BoatMetaProps = {
  label: string
  value: string
  className?: string
  /** Figma BDP key specs: 10px caps labels, 13px medium values */
  variant?: "default" | "bdp-spec"
  valueClassName?: string
}

export function BoatMeta({
  label,
  value,
  className,
  variant = "default",
  valueClassName,
}: BoatMetaProps) {
  const isSpec = variant === "bdp-spec"
  return (
    <div className={cn(isSpec ? "text-muted-foreground" : "text-xs text-muted-foreground", className)}>
      <span
        className={cn(
          isSpec
            ? "text-[10px] font-normal uppercase tracking-[0.5px]"
            : "uppercase tracking-wide"
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          isSpec ? "mt-1 text-[13px] font-medium text-foreground" : "mt-1 text-sm font-medium text-foreground",
          valueClassName
        )}
      >
        {value}
      </div>
    </div>
  )
}
