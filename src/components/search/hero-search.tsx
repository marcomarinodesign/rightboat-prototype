"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function HeroSearch() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-[25px] shadow-sm">
      <div className="grid gap-3 md:grid-cols-4">
        <Input
          placeholder="Search by make or model"
          aria-label="Search by make or model"
          className="h-11 rounded-lg border-border bg-background text-sm"
        />
        <Select>
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
        <Select>
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
        <Select>
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
      <div className="flex flex-wrap items-center justify-between gap-3">
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
        <Button>Search boats</Button>
      </div>
    </div>
  )
}
