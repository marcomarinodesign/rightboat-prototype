import {
  Bolt,
  Coins,
  Hammer,
  Gauge,
  Sailboat,
  Users,
  CircleDot,
  Clock,
} from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

type DetailRow = {
  icon: React.ReactNode
  label: string
  value: string
}

type DetailSection = {
  title: string
  rows: DetailRow[]
}

type BdpDetailsProps = {
  sections: DetailSection[]
}

export function BdpDetails({ sections }: BdpDetailsProps) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-bold leading-6">Highlights</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section, idx) => (
          <div key={section.title}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {section.title}
            </p>
            <div className="space-y-3">
              {section.rows.map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center text-foreground">
                    {row.icon}
                  </div>
                  <p className="flex-1 text-sm font-semibold text-foreground">
                    {row.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{row.value}</p>
                </div>
              ))}
            </div>

            {idx !== sections.length - 1 ? (
              <div className="mt-5 border-t border-border/60" />
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function getDefaultBdpDetails() {
  const details: DetailSection[] = [
    {
      title: "Details",
      rows: [
        { icon: <Sailboat className="h-5 w-5" />, label: "Boat type", value: "Value" },
        { icon: <CircleDot className="h-5 w-5" />, label: "Boat class", value: "Value" },
        { icon: <Coins className="h-5 w-5" />, label: "Tax Status", value: "Value" },
      ],
    },
    {
      title: "Propulsion",
      rows: [
        { icon: <Hammer className="h-5 w-5" />, label: "Manufacturer", value: "Value" },
        { icon: <Bolt className="h-5 w-5" />, label: "Model", value: "Value" },
        { icon: <Gauge className="h-5 w-5" />, label: "Horse Power", value: "Value" },
        { icon: <Clock className="h-5 w-5" />, label: "Hours", value: "Value" },
      ],
    },
    {
      title: "Specifications",
      rows: [
        { icon: <Users className="h-5 w-5" />, label: "Passengers", value: "Value" },
      ],
    },
  ]

  return details
}

export function getBdpDetailsForBoat(input: {
  boatType?: string
  make: string
  model: string
  loa?: string
  beam?: string
}) {
  const details: DetailSection[] = [
    {
      title: "Details",
      rows: [
        {
          icon: <Sailboat className="h-5 w-5" />,
          label: "Boat type",
          value: input.boatType ?? "Value",
        },
        {
          icon: <CircleDot className="h-5 w-5" />,
          label: "Make & Model",
          value: `${input.make} ${input.model}`,
        },
        {
          icon: <Coins className="h-5 w-5" />,
          label: "LOA",
          value: input.loa ?? "Value",
        },
      ],
    },
    {
      title: "Measurements",
      rows: [
        {
          icon: <Gauge className="h-5 w-5" />,
          label: "Beam",
          value: input.beam ?? "Value",
        },
      ],
    },
  ]

  return details
}

