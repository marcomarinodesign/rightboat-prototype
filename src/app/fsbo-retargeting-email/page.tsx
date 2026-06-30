import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { FsboRetargetingEmailPreviewClient } from "./fsbo-retargeting-email-client"

export default function FsboRetargetingEmailPreviewPage() {
  return (
    <>
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-11 max-w-[640px] items-center px-4">
          <Link
            href="/sitemap"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Sitemap
          </Link>
        </div>
      </div>
      <FsboRetargetingEmailPreviewClient />
    </>
  )
}
