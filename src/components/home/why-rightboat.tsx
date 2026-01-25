import {
  Globe,
  ShieldCheck,
  GitCompare,
  Award,
  BookOpen,
  type LucideIcon,
} from "lucide-react"

import { benefits } from "@/data/benefits"
import { IconContainer } from "@/components/ui/icon-container"

const iconMap: Record<string, LucideIcon> = {
  Globe,
  ShieldCheck,
  Compare: GitCompare,
  Award,
  BookOpen,
}

export function WhyRightboat() {
  return (
    <section className="space-y-6" aria-labelledby="why-heading">
      <div>
        <h2 id="why-heading" className="text-2xl font-bold">
          Why Use Rightboat?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need to find and compare boats from trusted sources
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {benefits.map((benefit) => {
          const Icon = iconMap[benefit.icon] || Globe
          return (
            <div
              key={benefit.id}
              className="space-y-4 rounded-lg border border-border/60 bg-card p-6"
            >
              <IconContainer className="size-12 mb-0">
                <Icon aria-hidden="true" />
              </IconContainer>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
