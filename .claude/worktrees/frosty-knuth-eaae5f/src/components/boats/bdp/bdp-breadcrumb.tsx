import Link from "next/link"
import { ChevronLeft, Heart, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type BdpBreadcrumbProps = {
  make: string
  model: string
}

export function BdpBreadcrumb({ make, model }: BdpBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          asChild
        >
          <Link href="/boats-for-sale" aria-label="Back to boats for sale">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>

        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1">
          <Link href="/" className="text-foreground hover:text-primary">
            Homepage
          </Link>
          <span className="px-1 text-muted-foreground" aria-hidden>
            /
          </span>
          <Link
            href="/boats-for-sale"
            className="text-foreground hover:text-primary"
          >
            Listing
          </Link>
          <span className="px-1 text-muted-foreground" aria-hidden>
            /
          </span>
          <span className="text-foreground">{make}</span>
          <span className="px-1 text-muted-foreground" aria-hidden>
            /
          </span>
          <span className="text-foreground">{model}</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" className="h-9 gap-2 px-2 text-primary">
          <Heart className="h-4 w-4" />
          Save
        </Button>
        <Button variant="ghost" className="h-9 gap-2 px-2 text-primary">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}
