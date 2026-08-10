import Link from "next/link"
import { ChevronLeft, Heart, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"

const DEFAULT_BACK = "/boats-for-sale"
const DEFAULT_LISTING = "/boats-for-sale"
const DEFAULT_HOME = "/"

type BdpBreadcrumbProps = {
  make: string
  model: string
  /** Back control destination (Apple HIG: minimum 44×44pt target). */
  backHref?: string
  listingHref?: string
  homeHref?: string
}

export function BdpBreadcrumb({
  make,
  model,
  backHref = DEFAULT_BACK,
  listingHref = DEFAULT_LISTING,
  homeHref = DEFAULT_HOME,
}: BdpBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Button
          variant="tertiary"
          size="icon"
          className="size-11 min-h-[44px] min-w-[44px] shrink-0 rounded-full active:opacity-80 [-webkit-tap-highlight-color:transparent]"
          asChild
        >
          <Link href={backHref} aria-label="Back to listings">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </Link>
        </Button>

        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1">
          <Link href={homeHref} className="text-foreground hover:text-primary">
            Homepage
          </Link>
          <span className="px-1 text-muted-foreground" aria-hidden>
            /
          </span>
          <Link
            href={listingHref}
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

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          className="min-h-[44px] gap-2 px-3 text-primary active:opacity-80 [-webkit-tap-highlight-color:transparent]"
        >
          <Heart className="h-4 w-4" aria-hidden />
          Save
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="min-h-[44px] gap-2 px-3 text-primary active:opacity-80 [-webkit-tap-highlight-color:transparent]"
        >
          <Share2 className="h-4 w-4" aria-hidden />
          Share
        </Button>
      </div>
    </div>
  )
}
