"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConversationalSearchField, conversationalSearchHref } from "@/components/search/conversational-search-field"
import { buildClassicSearchQuery } from "@/lib/conversational-search/classic-query"
import { easeOutExpo } from "@/lib/motion-variants"
import { cn } from "@/lib/utils"

export function HeroSearch() {
  const surface = useHomeSurface()
  const router = useRouter()
  const searchHref = listingsHref("/boats-for-sale", surface)
  const isApp = surface === "app"
  const [classicOpen, setClassicOpen] = React.useState(false)
  const [makeModel, setMakeModel] = React.useState("")
  const [boatType, setBoatType] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [priceRange, setPriceRange] = React.useState("")

  const submitClassic = (event: React.FormEvent) => {
    event.preventDefault()
    const query = buildClassicSearchQuery({
      makeModel,
      boatType,
      location,
      priceRange,
    })
    router.push(
      query ? conversationalSearchHref(query, searchHref) : searchHref
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-[25px] shadow-sm">
      <ConversationalSearchField variant="hero" />

      <button
        type="button"
        className="flex items-center gap-1 text-left text-sm font-medium text-primary hover:underline"
        aria-expanded={classicOpen}
        onClick={() => setClassicOpen((open) => !open)}
      >
        Or search by make, model, type and location
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-[var(--transition-duration-normal)]",
            classicOpen && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {classicOpen ? (
          <motion.form
            key="classic"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: easeOutExpo }}
            className="overflow-hidden"
            onSubmit={submitClassic}
          >
            <div className="grid gap-3 pb-1 md:grid-cols-4">
              <Input
                placeholder="Search by make or model"
                aria-label="Search by make or model"
                value={makeModel}
                onChange={(event) => setMakeModel(event.target.value)}
                className="h-11 rounded-lg border-border bg-background text-sm"
              />
              <Select value={boatType || undefined} onValueChange={setBoatType}>
                <SelectTrigger
                  aria-label="Boat type"
                  className="h-11 rounded-lg border-border bg-background px-[15px] text-sm data-[placeholder]:text-muted-foreground"
                >
                  <SelectValue placeholder="Boat type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sail">Sailboats</SelectItem>
                  <SelectItem value="power">Powerboats</SelectItem>
                  <SelectItem value="yacht">Yachts</SelectItem>
                  <SelectItem value="cat">Catamaran</SelectItem>
                </SelectContent>
              </Select>
              <Select value={location || undefined} onValueChange={setLocation}>
                <SelectTrigger
                  aria-label="Location"
                  className="h-11 rounded-lg border-border bg-background px-[15px] text-sm data-[placeholder]:text-muted-foreground"
                >
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fl">Florida</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={priceRange || undefined}
                onValueChange={setPriceRange}
              >
                <SelectTrigger
                  aria-label="Price range"
                  className="h-11 rounded-lg border-border bg-background px-[15px] text-sm data-[placeholder]:text-muted-foreground"
                >
                  <SelectValue placeholder="Price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50">$0 - $50k</SelectItem>
                  <SelectItem value="50-150">$50k - $150k</SelectItem>
                  <SelectItem value="150-500">$150k - $500k</SelectItem>
                  <SelectItem value="500+">$500k+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-3 flex justify-end">
              <Button type="submit">Search boats</Button>
            </div>
          </motion.form>
        ) : null}
      </AnimatePresence>

      {isApp ? null : (
        <div className="flex flex-col text-left">
          <p className="text-sm leading-5 text-muted-foreground">
            Rightboat is a global boat marketplace connecting buyers with
            trusted brokers and private sellers across the US, UK and
            international markets.
          </p>
          <p className="text-sm leading-5 text-muted-foreground">
            Find boats for sale by type, manufacturer, condition, price or
            location using our advanced global boat search.
          </p>
        </div>
      )}
    </div>
  )
}
