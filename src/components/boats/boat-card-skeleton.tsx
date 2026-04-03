export function BoatCardSkeleton() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border-card bg-card p-3 animate-pulse">
      {/* Image placeholder */}
      <div className="relative w-full overflow-hidden rounded-lg aspect-[4/3] bg-muted" />

      {/* Details */}
      <div className="flex flex-col gap-2 pt-3">
        {/* Price */}
        <div className="h-8 w-28 rounded-md bg-muted" />
        {/* Name */}
        <div className="h-5 w-full rounded-md bg-muted" />
        {/* Specs */}
        <div className="h-4 w-3/4 rounded-md bg-muted" />
        {/* Location */}
        <div className="h-4 w-1/2 rounded-md bg-muted" />
        {/* Divider */}
        <div className="h-px w-full bg-border-card" />
        {/* Broker */}
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-muted shrink-0" />
          <div className="h-3 w-32 rounded-md bg-muted" />
        </div>
        {/* CTA button */}
        <div className="h-11 w-full rounded-lg bg-muted" />
      </div>
    </div>
  )
}
