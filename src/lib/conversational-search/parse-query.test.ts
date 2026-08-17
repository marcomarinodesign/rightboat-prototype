import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { listingBoats } from "../../data/boats/listing"
import { filterBoats } from "../../components/filters/filter-boats"
import { SUGGESTED_SEARCHES } from "./examples"
import { buildClassicSearchQuery } from "./classic-query"
import { broadenActions, parseConversationalQuery } from "./parse-query"

describe("parseConversationalQuery", () => {
  it("maps fishing boats with a cabin in Puget Sound", () => {
    const result = parseConversationalQuery(
      "Show me fishing boats with a cabin in Puget Sound."
    )
    assert.equal(result.filters.boatType, "Fishing boats")
    assert.equal(result.filters.locationZip, "Washington")
    assert.deepEqual(result.filters.intentTags, ["cabin"])
    assert.deepEqual(
      result.chips.map((chip) => chip.label),
      ["Fishing boats", "Cabin", "Puget Sound"]
    )
    assert.deepEqual(result.unmatched, [])
    assert.equal(result.hasDescriptionBased, true)
  })

  it("maps family cruising boats under 40 ft and under $300,000", () => {
    const result = parseConversationalQuery(
      "Find family cruising boats under 40 feet and under $300,000."
    )
    assert.equal(result.filters.boatType, "Cabin cruisers")
    assert.equal(result.filters.priceMax, "300000")
    assert.equal(result.filters.lengthMax, "12.2")
    assert.ok(result.filters.intentTags.includes("family"))
    assert.deepEqual(result.unmatched, [])
  })

  it("maps used bluewater sailboats suitable for living aboard", () => {
    const result = parseConversationalQuery(
      "Show me used bluewater sailboats suitable for living aboard."
    )
    assert.equal(result.filters.boatType, "Sailboats")
    assert.equal(result.filters.boatClass, "sail")
    assert.equal(result.filters.condition.used, true)
    assert.ok(result.filters.intentTags.includes("bluewater"))
    assert.ok(result.filters.intentTags.includes("liveaboard"))
    assert.deepEqual(result.unmatched, [])
  })

  it("keeps capacity as unmatched for a day boat near Miami", () => {
    const result = parseConversationalQuery(
      "A fast day boat for six people near Miami"
    )
    assert.equal(result.filters.locationCity, "miami")
    assert.ok(result.filters.intentTags.includes("fast"))
    assert.ok(result.filters.intentTags.includes("day-boat"))
    assert.ok(result.unmatched.some((item) => /six people/i.test(item)))
  })

  it("maps new center consoles with twin outboards", () => {
    const result = parseConversationalQuery(
      "New center consoles with twin outboards"
    )
    assert.equal(result.filters.boatType, "Center console")
    assert.equal(result.filters.condition.new, true)
    assert.deepEqual(result.filters.intentTags, ["twin-outboards"])
    assert.deepEqual(result.unmatched, [])
  })

  it("parses $150k shorthand", () => {
    const result = parseConversationalQuery(
      "Fishing boats with a cabin in Puget Sound under $150,000"
    )
    assert.equal(result.filters.priceMax, "150000")
    assert.equal(result.filters.locationZip, "Washington")
  })

  it("builds a classic search query the parser can interpret", () => {
    const query = buildClassicSearchQuery({
      boatType: "sail",
      location: "fl",
      priceRange: "50-150",
    })
    assert.equal(query, "sailboats in Florida from $50,000 under $150,000")
    const parsed = parseConversationalQuery(query)
    assert.equal(parsed.filters.boatType, "Sailboats")
    assert.equal(parsed.filters.locationZip, "Florida")
    assert.equal(parsed.filters.priceMin, "50000")
    assert.equal(parsed.filters.priceMax, "150000")
  })

  it("returns unmatched leftovers when nothing maps", () => {
    const result = parseConversationalQuery("xyzzy jacuzzi only")
    assert.equal(result.filters.boatType, "")
    assert.ok(result.unmatched.length > 0)
  })

  it("offers broaden actions from active filters", () => {
    const parsed = parseConversationalQuery(
      "Fishing boats with a cabin in Puget Sound under $150,000"
    )
    const actions = broadenActions(parsed.filters)
    assert.ok(actions.some((action) => action.filterGroup === "price"))
    assert.ok(actions.some((action) => action.filterGroup === "location"))
    assert.ok(actions.some((action) => action.filterGroup === "intent"))
  })

  it("parses inspirational suggested searches into filters", () => {
    const fishing = parseConversationalQuery(SUGGESTED_SEARCHES[0])
    assert.equal(fishing.filters.boatType, "Fishing boats")
    assert.equal(fishing.filters.locationZip, "Washington")
    assert.ok(fishing.filters.intentTags.includes("cabin"))
    assert.equal(fishing.filters.priceMax, "150000")

    const family = parseConversationalQuery(SUGGESTED_SEARCHES[1])
    assert.equal(family.filters.boatType, "Cabin cruisers")
    assert.ok(family.filters.intentTags.includes("family"))
    assert.equal(family.filters.lengthMax, "12.2")

    const liveaboard = parseConversationalQuery(SUGGESTED_SEARCHES[2])
    assert.equal(liveaboard.filters.boatType, "Sailboats")
    assert.equal(liveaboard.filters.condition.used, true)
    assert.ok(liveaboard.filters.intentTags.includes("liveaboard"))
    assert.ok(liveaboard.filters.intentTags.includes("offshore"))

    const center = parseConversationalQuery(SUGGESTED_SEARCHES[4])
    assert.equal(center.filters.boatType, "Center console")
    assert.equal(center.filters.condition.new, true)
    assert.deepEqual(center.filters.intentTags, ["twin-outboards"])
  })

  it("finds prototype listings for the brief example searches", () => {
    const fishing = parseConversationalQuery(
      "Fishing boats with a cabin in Puget Sound under $150,000"
    )
    const fishingHits = filterBoats(listingBoats, fishing.filters)
    assert.ok(
      fishingHits.some((boat) => boat.id === "rb610001"),
      "expected Puget Sound fishing cabin listing"
    )

    const family = parseConversationalQuery(
      "Find family cruising boats under 40 feet and under $300,000."
    )
    const familyHits = filterBoats(listingBoats, family.filters)
    assert.ok(
      familyHits.some((boat) => boat.id === "rb610002"),
      "expected Florida family cruiser listing"
    )

    const liveaboard = parseConversationalQuery(
      "Show me used bluewater sailboats suitable for living aboard."
    )
    const liveaboardHits = filterBoats(listingBoats, liveaboard.filters)
    assert.ok(
      liveaboardHits.some((boat) => boat.id === "rb610003"),
      "expected liveaboard sailboat listing"
    )
  })
})
