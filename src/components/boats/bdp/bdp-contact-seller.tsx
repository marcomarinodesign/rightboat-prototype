import { Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type BdpContactSellerProps = {
  price: string
  boatName: string
  sellerName: string
  sellerLocation: string
}

export function BdpContactSeller({
  price,
  boatName,
  sellerName,
  sellerLocation,
}: BdpContactSellerProps) {
  return (
    <Card className="rounded-[12px]">
      <CardHeader className="pb-2">
        <h2 className="text-2xl font-bold leading-7 text-foreground">
          Contact Manufacturer
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Price
          </p>
          <p className="text-2xl font-bold text-primary">{price}</p>
        </div>

        <form className="space-y-3" aria-label="Contact seller form">
          <label className="block">
            <span className="sr-only">First name</span>
            <Input placeholder="First name" />
          </label>
          <label className="block">
            <span className="sr-only">Last name</span>
            <Input placeholder="Last name" />
          </label>
          <label className="block">
            <span className="sr-only">Your email</span>
            <Input type="email" placeholder="Your email" />
          </label>
          <label className="block">
            <span className="sr-only">Zip/Postal code</span>
            <Input placeholder="Zip/Postal code" />
          </label>
          <label className="block">
            <span className="sr-only">Your phone number (optional)</span>
            <Input placeholder="Your phone number (Opt)" />
          </label>
          <label className="block">
            <span className="sr-only">Message</span>
            <textarea
              className="min-h-24 w-full resize-y rounded-[12px] border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder={`I'm interested in getting more information about your ${boatName}`}
            />
          </label>

          <div className="space-y-2 pt-1">
            <Button className="w-full rounded-[12px]">Contact Manufacturer</Button>
            <Button
              variant="outline"
              className="w-full rounded-[12px] border-primary text-primary"
            >
              <Phone className="h-4 w-4" />
              View Phone
            </Button>
          </div>
        </form>

        <div className="border-t border-border/60 pt-4">
          <div className="flex items-center gap-3 rounded-[12px] bg-[#F4F9FF] p-3">
            <div className="h-[60px] w-[90px] shrink-0 rounded-[12px] bg-muted" />
            <div className="min-w-0">
              <p className="text-[11px] leading-4 text-muted-foreground">
                OFFERED BY
              </p>
              <p className="truncate text-lg font-bold leading-6">
                {sellerName}
              </p>
              <p className="text-sm text-muted-foreground">{sellerLocation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

