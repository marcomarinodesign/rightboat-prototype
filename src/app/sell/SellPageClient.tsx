"use client"

import dynamic from "next/dynamic"

// BoatForm initialises the Supabase client at module load time.
// Using ssr:false here (inside a Client Component) prevents that from
// running on the server where NEXT_PUBLIC_* env vars may be absent.
const BoatForm = dynamic(
  () => import("@/features/sell-boat/components/BoatForm"),
  { ssr: false }
)

export function SellPageClient() {
  return <BoatForm />
}
