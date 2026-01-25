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
    <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur">
      <div className="grid gap-4 md:grid-cols-4">
        <Input placeholder="Search by make or model" />
        <Select>
          <SelectTrigger>
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
          <SelectTrigger>
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
          <SelectTrigger>
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
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          30,000+ listings across new and used boats.
        </p>
        <Button>Search boats</Button>
      </div>
    </div>
  )
}
