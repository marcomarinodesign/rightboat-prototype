import { cn } from "@/lib/utils"

export interface Stat {
  value: string
  label: string
}

export interface StatsSectionProps {
  title: string
  description: string
  stats: Stat[]
  headingId?: string
  className?: string
}

export function StatsSection({
  title,
  description,
  stats,
  headingId,
  className,
}: StatsSectionProps) {
  return (
    <section
      className={cn("space-y-12", className)}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <h2
          id={headingId}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2 text-center">
            <div className="text-4xl font-bold text-primary">{stat.value}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
