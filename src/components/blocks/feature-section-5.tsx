import Image from "next/image"

import { cn } from "@/lib/utils"

export interface FeatureSection5Props {
  title: string
  description: string
  features: Array<{
    title: string
    description: string
    icon?: React.ReactNode
  }>
  image?: { src: string; alt: string }
  headingId?: string
  sectionId?: string
  className?: string
}

export function FeatureSection5({
  title,
  description,
  features,
  image,
  headingId,
  sectionId,
  className,
}: FeatureSection5Props) {
  const imageContent = image ? (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  ) : (
    <Image
      src="https://ui.shadcn.com/placeholder.svg"
      alt="Section visual placeholder"
      fill
      className="object-cover"
      unoptimized
    />
  )

  return (
    <section
      id={sectionId}
      className={cn(
        "grid gap-12 lg:grid-cols-2 lg:items-center",
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <h2
            id={headingId}
            className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="space-y-2">
              {feature.icon}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-border/60 bg-muted">
        {imageContent}
      </div>
    </section>
  )
}
