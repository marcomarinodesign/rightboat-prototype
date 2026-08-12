import { listingBoats } from "@/data/boats"
import { researchArticles } from "@/data/research-articles"
import { ALL_REGIONS } from "@/components/filters/region-data"

/**
 * Index of every prototype route, grouped by quarter and area of interest.
 *
 * One entry per **exploration** (a design question we prototyped), with all of
 * its variants as links. Order inside each quarter is the planning order, so
 * EXPLORATIONS is authored in the order it should render.
 *
 * `figma` fields are kept for the Figma linking pass; they are not rendered yet.
 */

export const SITE_MAP_QUARTERS = ["Q3 2026", "Q2 2026", "Q1 2026"] as const
export type SiteMapQuarter = (typeof SITE_MAP_QUARTERS)[number]

export const SITE_MAP_AREAS = [
  "Search & discovery",
  "Boat detail",
  "Sell / FSBO",
  "Monetization & email",
  "Mobile app",
  "Homepage",
  "Programs",
  "Content & SEO",
  "Design system",
  "Internal",
] as const
export type SiteMapArea = (typeof SITE_MAP_AREAS)[number]

export type SiteMapLink = {
  label: string
  href: string
  description?: string
  /** Figma frame for this variant — reserved for the Figma linking pass. */
  figma?: string
}

export type SiteMapLinkGroup = {
  title: string
  links: SiteMapLink[]
}

export type SiteMapExploration = {
  /** Anchor id — stable, so an external doc can point at one exploration. */
  id: string
  title: string
  quarter: SiteMapQuarter
  area: SiteMapArea
  summary?: string
  /** Figma page or main frame — reserved for the Figma linking pass. */
  figma?: string
  links: SiteMapLink[]
  groups?: SiteMapLinkGroup[]
}

const DS_FILE = "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS"
const FSBO_FILE = "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page"

const ds = (nodeId: string) => `${DS_FILE}?node-id=${nodeId}`
const fsbo = (nodeId: string) => `${FSBO_FILE}?node-id=${nodeId}`

function activeListingExample(): SiteMapLink {
  const boat = listingBoats[0]
  return {
    label: `Example: ${boat.make} ${boat.model}`,
    href: `/boats-for-sale/${boat.makeSlug}/${boat.modelSlug}/${boat.id}`,
    description: "Template route /boats-for-sale/[make]/[model]/[id]",
    figma: ds("1-1"),
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
    .map((a) => ({ label: a.title, href: `/blog/${a.slug}` }))
}

function regionLandingLinks(): SiteMapLink[] {
  return ALL_REGIONS.map((region) => ({
    label: region.label,
    href: `/boats-for-sale/regions/${region.value}`,
    description: region.summary,
  }))
}

/** SRP UI states used to capture the Figma Mobile Overview frames. */
const SRP_FIGMA_PREVIEW_STATES: { state: string; label: string }[] = [
  { state: "default", label: "Default" },
  { state: "filters-open", label: "Filters drawer open" },
  { state: "filters-scrolled", label: "Filters drawer scrolled" },
  { state: "active-filters", label: "Active filter chips" },
  { state: "sort-open", label: "Sort select open" },
  { state: "empty", label: "Empty results" },
  { state: "save-search-toast", label: "Save search toast" },
  { state: "marketing-footer", label: "Marketing footer" },
]

const EMAIL_SEGMENTS: { id: string; label: string }[] = [
  { id: "center-console", label: "Center Console" },
  { id: "sailboat", label: "Sailboat" },
  { id: "yacht", label: "Yacht" },
  { id: "catamaran", label: "Catamaran" },
]

const EXPLORATIONS: SiteMapExploration[] = [
  // ── Q3 2026 ────────────────────────────────────────────────────────────
  {
    id: "regional-search-filter",
    title: "Regional search filter",
    quarter: "Q3 2026",
    area: "Search & discovery",
    summary:
      "Search by a recognizable boating region instead of picking states and countries one by one. Selecting a region includes every location under it; the SRP chip shows the region name only, and the included locations can be expanded to exclude or add individual ones.",
    links: [
      {
        label: "SRP with Region filter",
        href: "/boats-for-sale/regions",
        description: "Filters → Location → Region tab (test page)",
      },
    ],
    groups: [
      {
        title: "Region landings — /boats-for-sale/regions/[region]",
        links: regionLandingLinks(),
      },
    ],
  },
  {
    id: "srp-cards-gallery",
    title: "SRP cards & gallery",
    quarter: "Q3 2026",
    area: "Search & discovery",
    summary:
      "Boat card in the SRP grid: image gallery carousel plus the three monetization variants — Manufacture, Sponsored and Simple — with a base ratio of 8 / 4 / 3 per 15 slots and manufacture cards in the first positions.",
    figma: ds("80-65"),
    links: [
      {
        label: "SRP grid — card variants",
        href: "/boats-for-sale",
        description: "Manufacture · Sponsored · Simple in priority order",
        figma: ds("80-65"),
      },
      {
        label: "SRP grid — default layout",
        href: "/boats-for-sale?layout=default",
        description: "Same cards in the single-column layout",
      },
      {
        label: "SRP grid — empty state",
        href: "/boats-for-sale?figmaPreview=empty",
      },
    ],
  },

  // ── Q2 2026 ────────────────────────────────────────────────────────────
  {
    id: "fsbo-flow",
    title: "FSBO — sell your boat flow",
    quarter: "Q2 2026",
    area: "Sell / FSBO",
    summary:
      "SEO landing plus a 5-step listing wizard with AI pre-fill, synced to the Q2 Figma design. Replaces the earlier sell-b-v3 exploration (/sell-b-v3 now redirects here).",
    figma: fsbo("71-1508"),
    links: [
      {
        label: "FSBO landing",
        href: "/fsbo",
        description: "Desktop 74-14 · Mobile 74-17",
        figma: fsbo("74-14"),
      },
      {
        label: "Wizard — Step 1",
        href: "/fsbo/wizard",
        description: "Desktop 74-20 · Mobile 74-23",
        figma: fsbo("74-20"),
      },
      {
        label: "Wizard — Step 2",
        href: "/fsbo/wizard",
        description: "Desktop 74-26 · Mobile 74-29",
        figma: fsbo("74-26"),
      },
      {
        label: "Wizard — Step 3",
        href: "/fsbo/wizard",
        description: "Desktop 74-32 · Mobile 74-35",
        figma: fsbo("74-32"),
      },
      {
        label: "Wizard — Step 4",
        href: "/fsbo/wizard",
        description: "Desktop 74-38 · Mobile 74-41",
        figma: fsbo("74-38"),
      },
      {
        label: "Wizard — Step 5",
        href: "/fsbo/wizard",
        description: "Desktop 74-44 · Mobile 74-47",
        figma: fsbo("74-44"),
      },
      {
        label: "Success screen",
        href: "/fsbo/success-preview",
        description: "Desktop 74-50 · Mobile 74-53",
        figma: fsbo("74-50"),
      },
    ],
  },
  {
    id: "fsbo-retargeting-email",
    title: "FSBO retargeting email",
    quarter: "Q2 2026",
    area: "Monetization & email",
    summary:
      "Abandoned-wizard retargeting email — Handlebars variables, pure HTML, Klaviyo-compatible.",
    links: [{ label: "Email preview", href: "/fsbo-retargeting-email" }],
  },
  {
    id: "saved-search-email",
    title: "Saved search email — monetization",
    quarter: "Q2 2026",
    area: "Monetization & email",
    summary:
      "7 ad slots across 4 targeting segments, rendered with React Email and previewed responsively.",
    links: [
      {
        label: "Email preview",
        href: "/email-preview",
        description: "Segment switcher + desktop / mobile preview",
      },
      ...EMAIL_SEGMENTS.map(({ id, label }) => ({
        label: `Rendered HTML — ${label}`,
        href: `/api/email-preview?segment=${id}`,
        description: `?segment=${id}`,
      })),
    ],
  },
  {
    id: "mobile-app-shell",
    title: "Native mobile app shell",
    quarter: "Q2 2026",
    area: "Mobile app",
    summary:
      "App-style shell under /app (tab bar, top bar) reusing the web BDP. Search redirects to boats for sale.",
    links: [
      { label: "App home", href: "/app/home" },
      { label: "Boats for sale (search)", href: "/app/boats-for-sale" },
      appBoatExample(),
      {
        label: "Saved",
        href: "/app/saved",
        description: "In-app tab — route redirects to /app/home",
      },
      {
        label: "Messages",
        href: "/app/messages",
        description: "In-app tab — route redirects to /app/home",
      },
      {
        label: "Profile",
        href: "/app/profile",
        description: "In-app tab — route redirects to /app/home",
      },
      { label: "Research", href: "/app/research" },
      { label: "Sell", href: "/app/sell" },
      { label: "Sell wizard", href: "/app/sell/wizard" },
    ],
  },
  {
    id: "srp-split-layout",
    title: "SRP split layout",
    quarter: "Q2 2026",
    area: "Search & discovery",
    summary:
      "Filters sidebar + 3-column card grid as the default desktop/tablet SRP, against the original single-column layout.",
    figma: ds("279-1422"),
    links: [
      {
        label: "Split layout (default)",
        href: "/boats-for-sale",
        description: "Filters sidebar + 3-column grid; mobile keeps the sheet",
        figma: ds("279-1422"),
      },
      {
        label: "Default layout (A/B variant)",
        href: "/boats-for-sale?layout=default",
        description: "Original single-column layout",
      },
      {
        label: "Page header",
        href: "/boats-for-sale",
        description: "Boats for sale title + intro block",
        figma: ds("301-77"),
      },
      { label: "Power boats", href: "/boats-for-sale?type=power" },
      { label: "Sail boats", href: "/boats-for-sale?type=sail" },
    ],
  },
  {
    id: "srp-mobile-overview",
    title: "SRP mobile overview — capture states",
    quarter: "Q2 2026",
    area: "Search & discovery",
    summary:
      "402×874 frames driven from the prototype via ?figmaPreview=…, one per mobile SRP state, plus Code Connect mappings.",
    figma: ds("333-2055"),
    links: SRP_FIGMA_PREVIEW_STATES.map(({ state, label }) => ({
      label,
      href: `/boats-for-sale?figmaPreview=${state}`,
      description: `?figmaPreview=${state}`,
    })),
  },

  // ── Q1 2026 ────────────────────────────────────────────────────────────
  {
    id: "homepage",
    title: "Homepage",
    quarter: "Q1 2026",
    area: "Homepage",
    summary:
      "Hero with search, popular models carousel and marketplace sections.",
    links: [{ label: "Homepage", href: "/" }],
  },
  {
    id: "srp-filters",
    title: "SRP filters overhaul",
    quarter: "Q1 2026",
    area: "Search & discovery",
    summary:
      "Filter sidebar redesign, drawer restructure and the price histogram, later aligned to the production filter structure.",
    figma: ds("289-310"),
    links: [
      {
        label: "SRP — filters sidebar",
        href: "/boats-for-sale",
        description: "Form Body 289-310",
        figma: ds("289-310"),
      },
      {
        label: "Location filter",
        href: "/boats-for-sale",
        description: "Location Filter 289-102",
        figma: ds("289-102"),
      },
      {
        label: "Price histogram",
        href: "/boats-for-sale",
        description: "Price Histogram 289-161",
        figma: ds("289-161"),
      },
      {
        label: "Filters drawer (mobile)",
        href: "/boats-for-sale?figmaPreview=filters-open",
        description: "Drawer 337-5",
        figma: ds("337-5"),
      },
    ],
  },
  {
    id: "bdp-active",
    title: "Boat detail — active listing",
    quarter: "Q1 2026",
    area: "Boat detail",
    summary: "Standard BDP with image grid gallery and tightened header.",
    figma: ds("1-1"),
    links: [activeListingExample()],
  },
  {
    id: "bdp-inactive",
    title: "Boat detail — inactive (sold) variants",
    quarter: "Q1 2026",
    area: "Boat detail",
    summary:
      "Three UI answers to the same problem (listing no longer available) on one mock listing, Seacamper 24. Variant C is a single route: half sheet by default, full sheet via control or ?overlay=full.",
    figma: ds("212-2007"),
    links: [
      {
        label: "Variant A — banner + similar boats section",
        href: "/boats-for-sale/seacamper/24/rb226195",
        figma: ds("212-2007"),
      },
      {
        label: "Variant B — top carousel + callout band",
        href: "/boats-for-sale/seacamper/24/rb226195-b",
        figma: ds("212-1627"),
      },
      {
        label: "Variant C — bottom sheet (half)",
        href: "/boats-for-sale/seacamper/24/rb226195-alt",
        figma: ds("212-2243"),
      },
      {
        label: "Variant C — bottom sheet (full)",
        href: "/boats-for-sale/seacamper/24/rb226195-alt?overlay=full",
        figma: ds("212-2414"),
      },
    ],
  },
  {
    id: "design-system",
    title: "Design system page",
    quarter: "Q1 2026",
    area: "Design system",
    summary:
      "Tokens, primitives, charts and the image system spec, mirrored from the El Captain DS Figma library.",
    figma: DS_FILE,
    links: [{ label: "Design system", href: "/design-system", figma: DS_FILE }],
  },
  {
    id: "propel",
    title: "Propel Program",
    quarter: "Q1 2026",
    area: "Programs",
    links: [{ label: "Propel Program", href: "/propel" }],
  },
  {
    id: "broker-dealer",
    title: "Membership / broker-dealer",
    quarter: "Q1 2026",
    area: "Programs",
    links: [{ label: "Membership / broker-dealer", href: "/broker-dealer" }],
  },
  {
    id: "research-blog",
    title: "Research & advice + blog",
    quarter: "Q1 2026",
    area: "Content & SEO",
    summary: "Research hub and the article pages generated from its catalogue.",
    links: [{ label: "Research & advice", href: "/research-advice" }],
    groups: [{ title: "Articles — /blog/[slug]", links: blogLinks() }],
  },
  {
    id: "sitemap",
    title: "Prototype index",
    quarter: "Q1 2026",
    area: "Internal",
    summary: "This page — every exploration by quarter and area.",
    links: [{ label: "Sitemap", href: "/sitemap" }],
  },
]

export function getSiteMapExplorations(): SiteMapExploration[] {
  return EXPLORATIONS
}

/** Quarters newest first; explorations keep their authored order. */
export function getSiteMapByQuarter(): {
  quarter: SiteMapQuarter
  explorations: SiteMapExploration[]
}[] {
  return SITE_MAP_QUARTERS.map((quarter) => ({
    quarter,
    explorations: EXPLORATIONS.filter((e) => e.quarter === quarter),
  })).filter((group) => group.explorations.length > 0)
}

export function countExplorationLinks(exploration: SiteMapExploration): number {
  const grouped = (exploration.groups ?? []).reduce(
    (total, group) => total + group.links.length,
    0
  )
  return exploration.links.length + grouped
}
