import { Star } from "lucide-react"

import { testimonials } from "@/data/testimonials"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TestimonialsProps {
  align?: "left" | "center"
}

export function Testimonials({ align = "left" }: TestimonialsProps) {
  return (
    <section className="space-y-6" aria-labelledby="testimonials-heading">
      <div
        className={cn(
          align === "center" && "mx-auto max-w-[672px] space-y-3 text-center"
        )}
      >
        <h2
          id="testimonials-heading"
          className={cn(
            "font-bold",
            align === "center"
              ? "text-3xl leading-[45px] tracking-[-0.9px] text-foreground lg:text-[36px]"
              : "text-2xl"
          )}
        >
          Our Testimonials
        </h2>
        <p
          className={cn(
            "mt-2 text-muted-foreground",
            align === "center" && "text-[17.3px] leading-7"
          )}
        >
          See what our customers say about their Rightboat experience
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="border-border/60 bg-muted/20"
          >
            <CardHeader className="space-y-4">
              {testimonial.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}
              <blockquote className="text-lg leading-relaxed">
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
                <div className="font-semibold">{testimonial.name}</div>
                {testimonial.role && (
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  {testimonial.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
