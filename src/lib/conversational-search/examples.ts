export const CONVERSATIONAL_SEARCH_HEADING =
  "What kind of boat are you looking for?"

export const CONVERSATIONAL_SEARCH_PLACEHOLDER =
  "Describe the boat you are looking for…"

export const SUGGESTED_SEARCHES = [
  "Fishing boats with a cabin in Puget Sound under $150,000",
  "Used family cruisers under 40 feet in Florida",
  "Bluewater sailboats suitable for living aboard",
  "A fast day boat for six people near Miami",
  "New center consoles with twin outboards",
] as const

export const SUGGESTED_SEARCH_CHIPS: {
  query: (typeof SUGGESTED_SEARCHES)[number]
  label: string
}[] = [
  {
    query: "Fishing boats with a cabin in Puget Sound under $150,000",
    label: "Fishing cabin · Puget Sound",
  },
  {
    query: "Used family cruisers under 40 feet in Florida",
    label: "Family cruisers · Florida",
  },
  {
    query: "Bluewater sailboats suitable for living aboard",
    label: "Liveaboard sailboats",
  },
  {
    query: "A fast day boat for six people near Miami",
    label: "Day boat · Miami",
  },
  {
    query: "New center consoles with twin outboards",
    label: "New center consoles",
  },
]

export const ROTATING_PLACEHOLDERS = SUGGESTED_SEARCHES
