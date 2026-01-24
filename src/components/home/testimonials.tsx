import { Star } from "lucide-react"

import { testimonials } from "@/data/testimonials"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function Testimonials() {
  return (
    <section className="space-y-6" aria-labelledby="testimonials-heading">
      <div>
        <h2 id="testimonials-heading" className="text-2xl font-bold">
          Our Testimonials
        </h2>
        <p className="mt-2 text-muted-foreground">
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
