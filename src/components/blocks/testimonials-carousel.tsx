import { Star } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface Testimonial {
  quote: string
  name: string
  role?: string
  location?: string
}

export interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
  headingId?: string
  className?: string
}

export function TestimonialsCarousel({
  testimonials,
  headingId,
  className,
}: TestimonialsCarouselProps) {
  // Take only the first 3 testimonials for the 3-column layout
  const displayedTestimonials = testimonials.slice(0, 3)

  return (
    <section
      className={cn("space-y-8", className)}
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
      >
        What professionals say
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {displayedTestimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-white shadow-md border-border/60 rounded-lg"
          >
            <CardHeader className="space-y-4">
              {/* 5 blue stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>
              {/* Quote */}
              <blockquote className="text-lg font-medium leading-relaxed text-foreground">
                <span className="text-2xl leading-none text-muted-foreground">
                  &ldquo;
                </span>
                <span className="relative">{testimonial.quote}</span>
                <span className="text-2xl leading-none text-muted-foreground">
                  &rdquo;
                </span>
              </blockquote>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Name - bold */}
                <div className="font-semibold text-foreground">
                  {testimonial.name}
                </div>
                {/* Role - smaller grey */}
                {testimonial.role && (
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                )}
                {/* Location - smaller grey */}
                {testimonial.location && (
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
