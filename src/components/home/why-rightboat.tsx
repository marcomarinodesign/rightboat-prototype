import {
  Globe,
  ShieldCheck,
  GitCompare,
  Award,
  type LucideIcon,
} from "lucide-react"

import { benefits } from "@/data/benefits"

const iconMap: Record<string, LucideIcon> = {
  Globe,
  ShieldCheck,
  Compare: GitCompare,
  Award,
}

const cardColors = [
  "bg-malibu-300",
  "bg-malibu-500",
  "bg-blue-300",
  "bg-primary",
]

export function WhyRightboat() {
  return (
    <section className="space-y-6" aria-labelledby="why-heading">
      <div>
        <h2 id="why-heading" className="heading-sm">
          Why Use Rightboat?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Rightboat is one of the world&apos;s leading online boat marketplaces,
          helping buyers and sellers connect since 2005. With over 35,000 boats
          for sale worldwide, we make it easy to compare listings, research
          brands and find boats near you or internationally.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, i) => {
          const Icon = iconMap[benefit.icon] || Globe
          const colorClass = cardColors[i % cardColors.length]
          return (
            <div
              key={benefit.id}
              className={`${colorClass} flex flex-col gap-4 rounded-[12px] px-6 py-[42px]`}
            >
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              <p className="text-2xl font-bold leading-8 text-white">
                {benefit.title}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
