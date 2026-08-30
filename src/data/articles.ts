export type Article = {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  href: string
  category?: string
  author?: string
  readingTime?: string
  /** Used for blog routes: /blog/[slug] */
  slug?: string
  /** When article is summary-only, link to full article externally */
  externalUrl?: string
  authorUrl?: string
  authorBio?: string
}

export const latestArticles: Article[] = [
  {
    id: "a1",
    title: "The Ultimate Guide to Choosing Your First Offshore Fishing Boat",
    date: "Aug 12, 2026",
    excerpt: "Learn the key factors to consider when buying your first offshore fishing vessel, from hull design to engine power and onboard amenities.",
    image: "/figma/articles/article1.png",
    href: "https://www.rightboat.com/blog/how-to-dock-a-boat-with-joysticks",
  },
  {
    id: "a2",
    title: "Top 5 Coastal Destinations for Summer Boating Adventures This Year",
    date: "Jul 30, 2026",
    excerpt: "Explore the most breathtaking coastal routes and hidden coves perfect for your next summer boating trip with family and friends.",
    image:
      "https://www.rightboat.com/article_images/419/thumb_Alan_headshot_2000px-at-72ppi.jpg",
    href: "https://www.rightboat.com/blog/rightboat-interview-alan-lang",
  },
  {
    id: "a3",
    title: "Essential Boat Maintenance Tips to Keep Your Vessel in Perfect Shape",
    date: "Jul 15, 2026",
    excerpt: "Discover the most important maintenance routines every boat owner should follow to ensure peak performance and longevity on the water.",
    image:
      "https://www.rightboat.com/article_images/418/thumb_Power_Boat_Grady_White.jpg",
    href: "https://www.rightboat.com/blog/best-boat-brands-for-beginners",
  },
  {
    id: "a4",
    title: "Family-Friendly Boats: Finding the Perfect Vessel for Weekend Getaways",
    date: "Jun 28, 2026",
    excerpt: "From spacious decks to safety features, here is everything you need to know about selecting a boat that the whole family will enjoy.",
    image: "/figma/articles/article4.png",
    href: "https://www.rightboat.com/blog/the-best-boat-binoculars",
  },
]
