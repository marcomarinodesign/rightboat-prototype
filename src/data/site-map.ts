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
      links: [
        { label: "Search listings", href: "/boats-for-sale" },
        { label: "Power boats", href: "/boats-for-sale?type=power" },
        { label: "Sail boats", href: "/boats-for-sale?type=sail" },
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
        { label: "Sell flow (v3)", href: "/sell-b-v3" },
        { label: "Sell wizard", href: "/sell-b-v3/wizard" },
      ],
    },
    {
      title: "Internal",
      description: "Design system and UI tokens (prototype).",
      links: [{ label: "Design system", href: "/design-system" }],
    },
  ]
}
