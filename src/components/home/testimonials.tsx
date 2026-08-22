import { Star } from "lucide-react"

import { testimonials } from "@/data/testimonials"
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
            align === "center"
              ? "text-3xl font-bold leading-[45px] tracking-[-0.9px] text-foreground lg:text-[36px]"
              : "heading-sm"
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
          What Buyers Say About Rightboat
        </p>
      </div>
      <div className="grid gap-[10px] md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col gap-[26px] rounded-[12px] border border-[rgb(202,204,208)] bg-[rgb(244,249,255)] px-6 py-8"
          >
            {/* Stars + quote */}
            <div className="flex flex-col gap-3">
              {testimonial.rating && (
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-[14px] w-[14px] text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}
              <blockquote className="text-base font-normal leading-6">
                <span className="text-2xl leading-none text-muted-foreground">
                  &ldquo;
                </span>
                <span className="relative">{testimonial.quote}</span>
                <span className="text-2xl leading-none text-muted-foreground">
                  &rdquo;
                </span>
              </blockquote>
            </div>
            {/* Author */}
            <div className="flex flex-col gap-[5px]">
              <div className="text-base font-bold leading-6">{testimonial.name}</div>
              {testimonial.role && (
                <div className="text-sm font-normal leading-5 text-muted-foreground">
                  {testimonial.role}
                </div>
              )}
              <div className="text-sm font-normal leading-5 text-muted-foreground">
                {testimonial.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
