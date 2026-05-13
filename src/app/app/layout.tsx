import type { ReactNode } from "react"

import { MobilePrototypeShell } from "@/components/mobile-app/mobile-prototype-shell"

export default function MobileAppLayout({
  children,
}: {
  children: ReactNode
}) {
  return <MobilePrototypeShell>{children}</MobilePrototypeShell>
}
