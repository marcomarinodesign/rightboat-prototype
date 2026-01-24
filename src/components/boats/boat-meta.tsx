import { cn } from "@/lib/utils"

type BoatMetaProps = {
  label: string
  value: string
  className?: string
}

export function BoatMeta({ label, value, className }: BoatMetaProps) {
  return (
    <div className={cn("text-xs text-muted-foreground", className)}>
      <span className="uppercase tracking-wide">{label}</span>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  )
}
