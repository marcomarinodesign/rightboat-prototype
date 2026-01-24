export type Testimonial = {
  id: string
  quote: string
  name: string
  role?: string
  location: string
  rating?: number
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Rightboat made finding our dream yacht effortless. The platform is intuitive, and we found exactly what we were looking for within days.",
    name: "Sarah Mitchell",
    role: "Boat Owner",
    location: "Miami, FL",
    rating: 5,
  },
  {
    id: "testimonial-2",
    quote:
      "As a first-time buyer, I appreciated the detailed listings and easy comparison tools. The verification process gave me confidence in my purchase.",
    name: "James Thompson",
    role: "New Boat Owner",
    location: "San Diego, CA",
    rating: 5,
  },
  {
    id: "testimonial-3",
    quote:
      "The global reach of Rightboat helped us find a rare model we couldn't locate locally. Excellent service from start to finish.",
    name: "Emma Rodriguez",
    role: "Yacht Enthusiast",
    location: "Monaco",
    rating: 5,
  },
  {
    id: "testimonial-4",
    quote:
      "Selling our boat through Rightboat was straightforward and efficient. We received multiple serious inquiries within the first week.",
    name: "Michael Chen",
    role: "Boat Seller",
    location: "Seattle, WA",
    rating: 5,
  },
]
