import Image from "next/image"
import Link from "next/link"

import { Boat } from "@/data/boats"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { BoatMeta } from "@/components/boats/boat-meta"

type BoatCardProps = {
  boat: Boat
  variant?: "grid" | "list"
}

export function BoatCard({ boat, variant = "grid" }: BoatCardProps) {
  const href = `/boats-for-sale/${boat.makeSlug}/${boat.modelSlug}/${boat.id}`

  return (
    <Card
      className={cn(
        "group overflow-hidden border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-lg",
        variant === "list" && "md:flex"
      )}
    >
      <Link
        href={href}
        className={cn("relative block overflow-hidden", variant === "list" && "md:w-1/3")}
      >
        <Image
          src={boat.image}
          alt={`${boat.make} ${boat.model}`}
          width={640}
          height={420}
          className={cn(
            "h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105",
            variant === "list" && "md:h-full"
          )}
        />
        {boat.featured ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Featured
          </span>
        ) : null}
      </Link>
      <div className={cn("flex flex-1 flex-col", variant === "list" && "md:w-2/3")}>
        <CardHeader className="space-y-2">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            {boat.broker}
          </div>
          <Link
            href={href}
            className="text-lg font-semibold leading-tight transition-colors group-hover:text-primary"
          >
            {boat.year} {boat.make} {boat.model}
          </Link>
          <div className="text-sm text-muted-foreground">{boat.location}</div>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <BoatMeta label="Price" value={boat.price} />
          <BoatMeta label="Length" value={boat.length} />
          <BoatMeta label="Condition" value={boat.condition} />
        </CardContent>
        <CardFooter className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium text-primary">View details</span>
          <span className="text-xs text-muted-foreground">ID {boat.id}</span>
        </CardFooter>
      </div>
    </Card>
  )
}
