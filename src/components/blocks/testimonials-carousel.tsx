"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
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
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      className={cn("space-y-8", className)}
      aria-labelledby={headingId}
    >
      <div className="flex items-center justify-between">
        <h2
          id={headingId}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          What professionals say
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Card className="border-border/60 bg-muted/20">
        <CardHeader className="space-y-4">
          <blockquote className="text-lg leading-relaxed">
            <span className="text-2xl leading-none text-muted-foreground">
              &ldquo;
            </span>
            <span className="relative">{currentTestimonial.quote}</span>
            <span className="text-2xl leading-none text-muted-foreground">
              &rdquo;
            </span>
          </blockquote>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="font-semibold">{currentTestimonial.name}</div>
            {currentTestimonial.role && (
              <div className="text-sm text-muted-foreground">
                {currentTestimonial.role}
              </div>
            )}
            {currentTestimonial.location && (
              <div className="text-sm text-muted-foreground">
                {currentTestimonial.location}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
