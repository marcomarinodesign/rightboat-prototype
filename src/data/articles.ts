export type Article = {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  href: string
}

export const latestArticles: Article[] = [
  {
    id: "a1",
    title: "How to Dock a Boat with Joysticks, Single Engines, and Twins",
    date: "12th Jun 2024",
    excerpt: "These tips will make docking a boat easier than ever.",
    image: "https://www.rightboat.com/article_images/420/thumb_docking.jpg",
    href: "https://www.rightboat.com/blog/how-to-dock-a-boat-with-joysticks",
  },
  {
    id: "a2",
    title: "Rightboat Interview: From Style to Construction, Talking Center Consoles",
    date: "10th Jun 2024",
    excerpt:
      "Alan Lang has watched the center console market evolve and shares key insights.",
    image:
      "https://www.rightboat.com/article_images/419/thumb_Alan_headshot_2000px-at-72ppi.jpg",
    href: "https://www.rightboat.com/blog/rightboat-interview-alan-lang",
  },
  {
    id: "a3",
    title: "Best Boat Brands for Beginners: Power, Sail, Pontoon & Fish",
    date: "7th Jun 2024",
    excerpt:
      "What makes a good beginner boat? Compare the most popular brands and types.",
    image:
      "https://www.rightboat.com/article_images/418/thumb_Power_Boat_Grady_White.jpg",
    href: "https://www.rightboat.com/blog/best-boat-brands-for-beginners",
  },
  {
    id: "a4",
    title: "The Best Boat Binoculars: Which Features Make a Difference?",
    date: "2nd Jun 2024",
    excerpt:
      "You have plenty of options for marine binoculars. Here is what matters most.",
    image: "https://www.rightboat.com/article_images/417/thumb_binoculars.jpg",
    href: "https://www.rightboat.com/blog/the-best-boat-binoculars",
  },
]
