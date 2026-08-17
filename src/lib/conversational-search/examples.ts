export const CONVERSATIONAL_SEARCH_HEADING =
  "What kind of boat are you looking for?"

export const CONVERSATIONAL_SEARCH_PLACEHOLDER =
  "Describe the boat you are looking for…"

export const SUGGESTED_SEARCH_PROMPT =
  "Need a starting point? Try describing it like this:"

/** Natural-language prompts shown as inspiration; each is also the query. */
export const SUGGESTED_SEARCHES = [
  "A fishing boat with a cabin for weekends on Puget Sound, under $150,000",
  "A comfortable family cruiser under 40 feet in Florida, under $300,000",
  "A used sailboat we could live aboard and take offshore",
  "A fast day boat near Miami for six people",
  "A new center console with twin outboards, ready for fishing days",
] as const

export const SUGGESTED_SEARCH_CHIPS: {
  query: (typeof SUGGESTED_SEARCHES)[number]
  label: string
}[] = SUGGESTED_SEARCHES.map((query) => ({ query, label: query }))

export const ROTATING_PLACEHOLDERS = SUGGESTED_SEARCHES
