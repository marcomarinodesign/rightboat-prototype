import { cn } from "@/lib/utils"

export interface Stat4 {
  value: string
  label: string
}

export interface StatsSection4Props {
  title: string
  description: string
  stats: Stat4[]
  headingId?: string
  className?: string
}

/**
 * Stats section 4 - centered heading + stat cards.
 * (Local implementation inspired by shadcn "stats-section-4" layout.)
 */
export function StatsSection4({
  title,
  description,
  stats,
  headingId,
  className,
}: StatsSection4Props) {
  return (
    <section className={cn("space-y-10", className)} aria-labelledby={headingId}>
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <h2
          id={headingId}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg bg-primary p-6 text-center text-primary-foreground shadow-sm flex flex-col items-center justify-center"
          >
            <div className="relative text-4xl font-bold">{stat.value}</div>
            <div className="relative mt-2 text-sm text-primary-foreground/80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

