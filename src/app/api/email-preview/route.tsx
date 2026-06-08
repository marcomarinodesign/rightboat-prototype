import * as React from "react"
import { render } from "@react-email/render"
import { NextResponse } from "next/server"

import {
  catamaranProps,
  centerConsoleProps,
  sailboatProps,
  yachtProps,
  type EmailSegmentId,
} from "@/data/email-monetization-mock"
import { SavedSearchEmailTemplate } from "@/emails/saved-search-email"
import type { SavedSearchEmailTemplateProps } from "@/emails/saved-search-email"

const segmentProps: Record<EmailSegmentId, SavedSearchEmailTemplateProps> = {
  "center-console": centerConsoleProps,
  sailboat: sailboatProps,
  yacht: yachtProps,
  catamaran: catamaranProps,
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const segment = (searchParams.get("segment") ?? "center-console") as EmailSegmentId
  const mobile = searchParams.get("mobile") === "1"
  const props = segmentProps[segment] ?? centerConsoleProps

  const origin = new URL(request.url).origin
  const html = await render(
    <SavedSearchEmailTemplate {...props} baseUrl={origin} mobile={mobile} />
  )

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}
