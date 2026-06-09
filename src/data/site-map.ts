import { listingBoats } from "@/data/boats"
import { researchArticles } from "@/data/research-articles"

export type SiteMapLink = {
  label: string
  href: string
  description?: string
}

export type SiteMapGroup = {
  title: string
  links: SiteMapLink[]
}

export type SiteMapSection = {
  title: string
  description?: string
  links?: SiteMapLink[]
  groups?: SiteMapGroup[]
}

function activeListingExample(): SiteMapLink {
  const boat = listingBoats[0]
  const href = `/boats-for-sale/${boat.makeSlug}/${boat.modelSlug}/${boat.id}`
  return {
    label: `Example: ${boat.make} ${boat.model}`,
    href,
    description: "Template route /boats-for-sale/[make]/[model]/[id]",
  }
}

function appBoatExample(): SiteMapLink {
  const boat = listingBoats[0]
  return {
    label: `Example: ${boat.make} ${boat.model}`,
    href: `/app/boat/${boat.id}`,
    description: "Template route /app/boat/[id]",
  }
}

function blogLinks(): SiteMapLink[] {
  return researchArticles
    .filter((a) => a.slug)
    .map((a) => ({
      label: a.title,
      href: `/blog/${a.slug}`,
    }))
}

/** Single source of truth for the HTML sitemap page (`/sitemap`). */
export function getSiteMapSections(): SiteMapSection[] {
  return [
    {
      title: "Home",
      links: [{ label: "Homepage", href: "/" }],
    },
    {
      title: "Boats for sale",
      description:
        "Search results page (SRP). Desktop and tablet can use the split layout with a visible filters column.",
      links: [
        { label: "Search listings (default)", href: "/boats-for-sale" },
        {
          label: "Search listings — split layout",
          href: "/boats-for-sale?layout=split",
          description:
            "Filters sidebar + 3-column card grid on desktop/tablet; mobile keeps the default sheet",
        },
        {
          label: "SRP split — Mobile Overview (Figma)",
          href: "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=333-2055",
          description:
            "402×874 frames + Code Connect for mobile SRP states (drawer, chips, empty, sort, marketing footer)",
        },
        { label: "Power boats", href: "/boats-for-sale?type=power" },
        { label: "Sail boats", href: "/boats-for-sale?type=sail" },
      ],
    },
    {
      title: "Mobile app",
      description:
        "Native-style shell under /app (tab bar, top bar). Search redirects to boats for sale.",
      links: [
        { label: "App home", href: "/app/home" },
        { label: "Boats for sale (search)", href: "/app/boats-for-sale" },
        appBoatExample(),
        { label: "Saved", href: "/app/saved" },
        { label: "Messages", href: "/app/messages" },
        { label: "Profile", href: "/app/profile" },
        { label: "Research", href: "/app/research" },
        { label: "Sell", href: "/app/sell" },
        { label: "Sell wizard", href: "/app/sell/wizard" },
      ],
    },
    {
      title: "Boat detail — active listing",
      description: "Standard boat detail page (BDP) for an available listing.",
      links: [activeListingExample()],
    },
    {
      title: "Boat detail — inactive (sold) demos",
      description:
        "Three UI variants for the same mock listing (Seacamper 24). Variant C is one route: half sheet by default; full sheet via control on the page or ?overlay=full.",
      groups: [
        {
          title: "Seacamper 24 / rb226195",
          links: [
            {
              label: "Variant A — banner + similar boats section",
              href: "/boats-for-sale/seacamper/24/rb226195",
            },
            {
              label: "Variant B — top carousel + callout band",
              href: "/boats-for-sale/seacamper/24/rb226195-b",
            },
            {
              label: "Variant C — bottom sheet (half and full)",
              href: "/boats-for-sale/seacamper/24/rb226195-alt",
              description:
                "Half height by default; expand with “See similar boats” or open directly: ?overlay=full",
            },
          ],
        },
      ],
    },
    {
      title: "Research",
      links: [{ label: "Research & advice", href: "/research-advice" }],
    },
    {
      title: "Blog",
      description: "Articles generated from the research catalogue.",
      links: blogLinks(),
    },
    {
      title: "Programs",
      links: [
        { label: "Propel Program", href: "/propel" },
        { label: "Membership / broker-dealer", href: "/broker-dealer" },
      ],
    },
    {
      title: "Sell your boat",
      links: [
        { label: "FSBO — Sell flow", href: "/fsbo" },
        { label: "FSBO — Wizard", href: "/fsbo/wizard" },
      ],
    },
    {
      title: "Internal",
      description: "Design system, email previews, and UI tokens (prototype).",
      links: [
        { label: "Design system", href: "/design-system" },
        {
          label: "Saved search email preview",
          href: "/email-preview",
          description:
            "Q2 2026 monetization — 7 ad slots, 4 targeting segments, React Email render",
        },
      ],
    },
  ]
}
