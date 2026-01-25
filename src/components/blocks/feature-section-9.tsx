import { cn } from "@/lib/utils"

export interface FeatureSection9Props {
  title: string
  description: string
  features: Array<{
    title: string
    description: string
    icon?: React.ReactNode
  }>
  headingId?: string
  sectionId?: string
  className?: string
}

export function FeatureSection9({
  title,
  description,
  features,
  headingId,
  sectionId,
  className,
}: FeatureSection9Props) {
  return (
    <section
      id={sectionId}
      className={cn("space-y-12", className)}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h2
          id={headingId}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-3 text-center">
            {feature.icon && (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
            )}
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
