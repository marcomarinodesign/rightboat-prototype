import type { Metadata } from "next"
import Link from "next/link"

import { getSiteMapSections } from "@/data/site-map"

export const metadata: Metadata = {
  title: "Sitemap | Rightboat",
  description:
    "All pages and sections in this Rightboat prototype, including grouped BDP inactive variants.",
}

export default function SitemapPage() {
  const sections = getSiteMapSections()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sitemap</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Navigate every route in this prototype. Inactive boat detail variants are grouped under
          one section.
        </p>
      </div>

      <nav aria-label="Sitemap" className="space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="border-b border-border pb-2 text-lg font-semibold text-foreground">
              {section.title}
            </h2>
            {section.description ? (
              <p className="text-sm text-muted-foreground">{section.description}</p>
            ) : null}

            {section.links?.length ? (
              <ul className="list-inside list-disc space-y-2 pl-1 text-sm marker:text-muted-foreground">
                {section.links.map((item) => (
                  <li key={item.href} className="pl-1">
                    <Link
                      href={item.href}
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </Link>
                    {item.description ? (
                      <span className="ml-2 text-muted-foreground">— {item.description}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}

            {section.groups?.map((group) => (
              <div key={group.title} className="space-y-2 pl-0 sm:pl-2">
                <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                <ul className="list-inside list-disc space-y-2 pl-1 text-sm marker:text-muted-foreground">
                  {group.links.map((item) => (
                    <li key={item.href} className="pl-1">
                      <Link
                        href={item.href}
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {item.label}
                      </Link>
                      {item.description ? (
                        <span className="ml-2 text-muted-foreground">— {item.description}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </nav>
    </main>
  )
}
