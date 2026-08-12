"use client"

import * as React from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  countExplorationLinks,
  type SiteMapExploration,
  type SiteMapLink,
  type SiteMapQuarter,
} from "@/data/site-map"

type QuarterGroup = {
  quarter: SiteMapQuarter
  explorations: SiteMapExploration[]
}

type SitemapExplorerProps = {
  groups: QuarterGroup[]
}

function isExternal(href: string) {
  return href.startsWith("http")
}

/** Async Clipboard API, falling back to execCommand when it is unavailable. */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Clipboard API needs focus and a secure context; fall back for the rest.
  }
  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

/** Copies one link's absolute URL — rendered as a text link, not a button. */
function CopyLink({ href }: { href: string }) {
  const [state, setState] = React.useState<"idle" | "copied" | "error">("idle")

  const handleCopy = async () => {
    const origin = typeof window === "undefined" ? "" : window.location.origin
    const absolute = isExternal(href) ? href : `${origin}${href}`
    const ok = await writeToClipboard(absolute)
    setState(ok ? "copied" : "error")
    window.setTimeout(() => setState("idle"), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      aria-label={`Copy link ${href}`}
    >
      {state === "copied" ? "Copied" : state === "error" ? "Failed" : "Copy"}
    </button>
  )
}

function LinkRow({ link }: { link: SiteMapLink }) {
  const external = isExternal(link.href)
  return (
    <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1 py-1">
      {external ? (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {link.label}
        </a>
      ) : (
        <Link
          href={link.href}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {link.label}
        </Link>
      )}
      <code className="rounded bg-muted/60 px-1.5 py-0.5 text-xs text-muted-foreground">
        {link.href}
      </code>
      <CopyLink href={link.href} />
      {link.description ? (
        <span className="text-sm text-muted-foreground">
          — {link.description}
        </span>
      ) : null}
    </li>
  )
}

function ExplorationCard({ exploration }: { exploration: SiteMapExploration }) {
  const linkCount = countExplorationLinks(exploration)

  return (
    <article
      id={exploration.id}
      className="scroll-mt-32 rounded-2xl border border-border/60 bg-card p-5"
    >
      <header>
        <h3 className="text-base font-semibold text-foreground">
          {exploration.title}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className="text-xs font-medium">
            {exploration.area}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {linkCount} {linkCount === 1 ? "link" : "links"}
          </span>
        </div>
      </header>

      {exploration.summary ? (
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          {exploration.summary}
        </p>
      ) : null}

      <ul className="mt-3 space-y-0.5 text-sm">
        {exploration.links.map((link) => (
          <LinkRow key={`${link.label}-${link.href}`} link={link} />
        ))}
      </ul>

      {exploration.groups?.map((group) => (
        <details
          key={group.title}
          className="mt-3 rounded-lg border border-border/60 bg-muted/20 px-3 py-2"
        >
          <summary className="cursor-pointer text-sm font-medium text-foreground">
            {group.title}{" "}
            <span className="text-muted-foreground">
              ({group.links.length})
            </span>
          </summary>
          <ul className="mt-2 space-y-0.5 text-sm">
            {group.links.map((link) => (
              <LinkRow key={`${link.label}-${link.href}`} link={link} />
            ))}
          </ul>
        </details>
      ))}
    </article>
  )
}

export function SitemapExplorer({ groups }: SitemapExplorerProps) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.quarter} className="space-y-4">
          <h2 className="border-b border-border pb-2 text-xl font-bold text-foreground">
            {group.quarter}
          </h2>
          <div className="space-y-3">
            {group.explorations.map((exploration) => (
              <ExplorationCard key={exploration.id} exploration={exploration} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
