import * as React from "react"
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

import { RIGHTBOAT_LOGO } from "@/lib/brand"
import { SPONSORED_LABEL, sponsoredBadgeEmailStyle } from "@/lib/sponsored-badge"
import type {
  AdCreative,
  SavedSearchContext,
  SearchListing,
} from "@/components/email/saved-search-email"
import { centerConsoleProps } from "@/data/email-monetization-mock"

/** Inline hex values from `src/app/globals.css` — no CSS variables in email. */
export const emailTokens = {
  midnight: "#13022c",
  blue400: "#0257fc",
  blue200: "#208cff",
  neutral100: "#fafafa",
  neutral200: "#e4e5e9",
  neutral400: "#9da6c2",
  neutral500: "#7181b4",
  neutralWhite: "#ffffff",
  statusInfo100: "#f4f9ff",
  borderCard: "#e4e5e9",
} as const

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

/** Listing card image — fixed 3:2 crop so every card aligns in the 2-col grid. */
const LISTING_CARD_IMAGE = {
  width: 260,
  height: 173,
} as const

const LISTING_IMAGE_SPACER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

export type SavedSearchEmailTemplateProps = {
  context: SavedSearchContext
  listings: SearchListing[]
  ads: {
    premiumPartner?: AdCreative | null
    serviceSponsors: [AdCreative | null, AdCreative | null]
    trustedPartner?: AdCreative | null
    footerSponsors: [AdCreative | null, AdCreative | null, AdCreative | null]
  }
  /** Base URL for relative image paths (e.g. https://www.rightboat.com) */
  baseUrl?: string
}

function absoluteImageUrl(url: string, baseUrl?: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  const base = baseUrl ?? "https://www.rightboat.com"
  return `${base}${url.startsWith("/") ? url : `/${url}`}`
}

function listingCardImageUrl(url: string, baseUrl?: string): string {
  const absolute = absoluteImageUrl(url, baseUrl)
  if (absolute.includes("images.unsplash.com")) {
    const base = absolute.split("?")[0]
    return `${base}?w=${LISTING_CARD_IMAGE.width * 2}&h=${LISTING_CARD_IMAGE.height * 2}&fit=crop&q=80`
  }
  return absolute
}

function ListingCardImage({
  imageUrl,
  alt,
  baseUrl,
}: {
  imageUrl: string
  alt: string
  baseUrl?: string
}) {
  const src = listingCardImageUrl(imageUrl, baseUrl)
  const heightPx = `${LISTING_CARD_IMAGE.height}px`

  return (
    <Section
      style={{
        width: "100%",
        height: LISTING_CARD_IMAGE.height,
        maxHeight: LISTING_CARD_IMAGE.height,
        minHeight: LISTING_CARD_IMAGE.height,
        backgroundColor: emailTokens.neutral200,
        backgroundImage: `url('${src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        lineHeight: heightPx,
        fontSize: 0,
        overflow: "hidden",
      }}
    >
      <Img
        src={LISTING_IMAGE_SPACER}
        alt={alt}
        width={LISTING_CARD_IMAGE.width}
        height={LISTING_CARD_IMAGE.height}
        style={{
          display: "block",
          width: "100%",
          maxWidth: "100%",
          height: heightPx,
          maxHeight: heightPx,
          minHeight: heightPx,
          border: 0,
          outline: "none",
          textDecoration: "none",
        }}
      />
    </Section>
  )
}

function HouseAdPlaceholder({
  width,
  height,
  label = "Sponsored",
}: {
  width: number
  height: number
  label?: string
}) {
  return (
    <Section
      style={{
        backgroundColor: emailTokens.neutral100,
        width,
        height,
        textAlign: "center" as const,
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          margin: 0,
          paddingTop: height / 2 - 10,
          fontSize: 12,
          color: emailTokens.neutral500,
          fontFamily,
        }}
      >
        {label}
      </Text>
    </Section>
  )
}

function SponsoredBadge() {
  return (
    <Text style={sponsoredBadgeEmailStyle(fontFamily)}>{SPONSORED_LABEL}</Text>
  )
}

function PremiumPartnerSlot({
  creative,
}: {
  creative?: AdCreative | null
  baseUrl?: string
}) {
  if (!creative) {
    return (
      <Section style={{ padding: "0 24px 16px" }}>
        <HouseAdPlaceholder width={552} height={138} />
      </Section>
    )
  }

  return (
    <Section style={{ padding: "0 24px 16px" }}>
      <Link href={creative.clickUrl} style={{ textDecoration: "none" }}>
        <Section
          style={{
            backgroundColor: emailTokens.neutral200,
            borderRadius: 8,
            width: 552,
            height: 138,
            textAlign: "center" as const,
            padding: "24px 16px",
          }}
        >
          <Text
            style={{
              margin: "0 0 4px",
              fontSize: 14,
              fontWeight: 600,
              color: emailTokens.midnight,
              fontFamily,
            }}
          >
            {creative.sponsorName}
          </Text>
          {creative.tagline ? (
            <Text
              style={{
                margin: 0,
                fontSize: 12,
                color: emailTokens.neutral500,
                fontFamily,
                lineHeight: "16px",
              }}
            >
              {creative.tagline}
            </Text>
          ) : null}
        </Section>
      </Link>
      <Section style={{ textAlign: "right" as const, marginTop: 4 }}>
        <SponsoredBadge />
      </Section>
    </Section>
  )
}

function ServiceSponsorSlot({
  creative,
  baseUrl,
}: {
  creative?: AdCreative | null
  baseUrl?: string
}) {
  if (!creative) {
    return (
      <Section style={{ padding: "0 24px 16px" }}>
        <HouseAdPlaceholder width={552} height={96} />
      </Section>
    )
  }

  return (
    <Section style={{ padding: "0 24px 16px" }}>
      <Section
        style={{
          border: `1px solid ${emailTokens.borderCard}`,
          borderRadius: 8,
          padding: 16,
          minHeight: 96,
        }}
      >
        <Row>
        <Column style={{ width: 96, verticalAlign: "middle" as const }}>
          <Link href={creative.clickUrl}>
            <Img
              src={absoluteImageUrl(creative.imageUrl, baseUrl)}
              alt={creative.altText}
              width={96}
              height={64}
              style={{ borderRadius: 8, display: "block" }}
            />
          </Link>
        </Column>
        <Column style={{ paddingLeft: 16, verticalAlign: "middle" as const }}>
          <Row>
            <Column>
              <Text
                style={{
                  margin: "0 0 4px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: emailTokens.midnight,
                  fontFamily,
                }}
              >
                {creative.sponsorName}
              </Text>
              {creative.tagline ? (
                <Text
                  style={{
                    margin: "0 0 8px",
                    fontSize: 12,
                    color: emailTokens.neutral500,
                    fontFamily,
                    lineHeight: "16px",
                  }}
                >
                  {creative.tagline}
                </Text>
              ) : null}
              <Link
                href={creative.clickUrl}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: emailTokens.blue400,
                  textDecoration: "none",
                  fontFamily,
                }}
              >
                Learn more →
              </Link>
            </Column>
            <Column style={{ width: 72, textAlign: "right" as const }}>
              <SponsoredBadge />
            </Column>
          </Row>
        </Column>
      </Row>
      </Section>
    </Section>
  )
}

function TrustedPartnerSlot({
  creative,
}: {
  creative?: AdCreative | null
  baseUrl?: string
}) {
  if (!creative) {
    return (
      <Section style={{ padding: "0 24px 16px" }}>
        <HouseAdPlaceholder width={552} height={184} />
      </Section>
    )
  }

  return (
    <Section style={{ padding: "0 24px 16px" }}>
      <Link href={creative.clickUrl} style={{ textDecoration: "none" }}>
        <Section
          style={{
            backgroundColor: emailTokens.neutral200,
            borderRadius: 8,
            width: 552,
            height: 184,
            textAlign: "center" as const,
            padding: "32px 16px",
          }}
        >
          <Text
            style={{
              margin: "0 0 4px",
              fontSize: 14,
              fontWeight: 600,
              color: emailTokens.midnight,
              fontFamily,
            }}
          >
            {creative.sponsorName}
          </Text>
          {creative.tagline ? (
            <Text
              style={{
                margin: 0,
                fontSize: 12,
                color: emailTokens.neutral500,
                fontFamily,
                lineHeight: "16px",
              }}
            >
              {creative.tagline}
            </Text>
          ) : null}
        </Section>
      </Link>
      <Section style={{ textAlign: "right" as const, marginTop: 4 }}>
        <SponsoredBadge />
      </Section>
    </Section>
  )
}

function FooterSponsorSlot({
  creative,
}: {
  creative?: AdCreative | null
  baseUrl?: string
}) {
  if (!creative) {
    return (
      <Column style={{ width: "33.33%", padding: "0 4px", verticalAlign: "top" as const }}>
        <HouseAdPlaceholder width={168} height={94} />
      </Column>
    )
  }

  return (
    <Column style={{ width: "33.33%", padding: "0 4px", verticalAlign: "top" as const }}>
      <Link
        href={creative.clickUrl}
        style={{
          textDecoration: "none",
          display: "block",
          border: `1px solid ${emailTokens.borderCard}`,
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: emailTokens.neutralWhite,
        }}
      >
        <Section
          style={{
            backgroundColor: emailTokens.neutral200,
            width: "100%",
            height: 94,
            textAlign: "center" as const,
            padding: "12px 8px",
          }}
        >
          <Text
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 600,
              color: emailTokens.midnight,
              fontFamily,
              lineHeight: "14px",
            }}
          >
            {creative.sponsorName}
          </Text>
        </Section>
        <Section style={{ padding: "8px 12px" }}>
          {creative.tagline ? (
            <Text
              style={{
                margin: "0 0 8px",
                fontSize: 10,
                color: emailTokens.neutral500,
                fontFamily,
                lineHeight: "13px",
              }}
            >
              {creative.tagline}
            </Text>
          ) : null}
          <SponsoredBadge />
        </Section>
      </Link>
    </Column>
  )
}

function ListingCardEmail({
  listing,
  baseUrl,
}: {
  listing: SearchListing
  baseUrl?: string
}) {
  const imageUrl = listing.images[0] ?? "/brands/broker-placeholder.svg"

  return (
    <Column style={{ width: "50%", padding: "0 8px 16px", verticalAlign: "top" as const }}>
      <Link href={listing.href} style={{ textDecoration: "none" }}>
        <Section
          style={{
            border: `1px solid ${emailTokens.borderCard}`,
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: emailTokens.neutralWhite,
          }}
        >
          <ListingCardImage
            imageUrl={imageUrl}
            alt={listing.title}
            baseUrl={baseUrl}
          />
          <Section style={{ padding: "12px" }}>
            <Text
              style={{
                margin: "0 0 4px",
                fontSize: 14,
                fontWeight: 600,
                color: emailTokens.midnight,
                fontFamily,
              }}
            >
              {listing.title}
            </Text>
            <Text
              style={{
                margin: "0 0 8px",
                fontSize: 12,
                color: emailTokens.neutral500,
                fontFamily,
              }}
            >
              {listing.year} · {listing.location}
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 700,
                color: emailTokens.blue400,
                fontFamily,
              }}
            >
              {listing.price}
            </Text>
          </Section>
        </Section>
      </Link>
    </Column>
  )
}

function ListingRow({
  listings,
  baseUrl,
}: {
  listings: SearchListing[]
  baseUrl?: string
}) {
  if (listings.length === 0) return null

  const pairs: SearchListing[][] = []
  for (let i = 0; i < listings.length; i += 2) {
    pairs.push(listings.slice(i, i + 2))
  }

  return (
    <>
      {pairs.map((pair, rowIndex) => (
        <Section key={rowIndex} style={{ padding: "0 16px" }}>
          <Row>
            {pair.map((listing) => (
              <ListingCardEmail key={listing.id} listing={listing} baseUrl={baseUrl} />
            ))}
            {pair.length === 1 ? (
              <Column style={{ width: "50%", padding: "0 8px 16px" }} />
            ) : null}
          </Row>
        </Section>
      ))}
    </>
  )
}

export function SavedSearchEmailTemplate({
  context,
  listings,
  ads,
  baseUrl,
}: SavedSearchEmailTemplateProps) {
  const [listingsA, listingsB, listingsC] = [
    listings.slice(0, 2),
    listings.slice(2, 4),
    listings.slice(4),
  ]

  const previewText = context.userFirstName
    ? `Hi ${context.userFirstName}, new boats matching "${context.searchLabel}"`
    : `New boats matching "${context.searchLabel}"`

  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: emailTokens.neutral100,
          fontFamily,
        }}
      >
        <Container
          style={{
            maxWidth: 600,
            margin: "0 auto",
            backgroundColor: emailTokens.neutralWhite,
          }}
        >
          {/* Header */}
          <Section
            style={{
              padding: "16px 24px",
              borderBottom: `1px solid ${emailTokens.neutral200}`,
            }}
          >
            <Row>
              <Column>
                <Img
                  src={RIGHTBOAT_LOGO.src}
                  alt="Rightboat"
                  width={RIGHTBOAT_LOGO.width}
                  height={RIGHTBOAT_LOGO.height}
                  style={{ display: "block", height: 26, width: "auto" }}
                />
              </Column>
              <Column style={{ textAlign: "right" as const }}>
                <Text
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: emailTokens.neutral500,
                    fontFamily,
                  }}
                >
                  Saved Search:{" "}
                  <span style={{ fontWeight: 600, color: emailTokens.midnight }}>
                    {context.searchLabel}
                  </span>
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Intro */}
          <Section style={{ padding: "20px 24px 12px" }}>
            <Heading
              as="h1"
              style={{
                margin: "0 0 8px",
                fontSize: 20,
                fontWeight: 700,
                color: emailTokens.midnight,
                fontFamily,
              }}
            >
              {context.userFirstName
                ? `Hi ${context.userFirstName}, new boats for you`
                : "New boats matching your search"}
            </Heading>
            <Text
              style={{
                margin: 0,
                fontSize: 14,
                color: emailTokens.neutral500,
                fontFamily,
                lineHeight: "20px",
              }}
            >
              We found new listings matching &ldquo;{context.searchLabel}&rdquo;
              {context.location ? ` in ${context.location}` : ""}.
            </Text>
          </Section>

          {/* Slot 1 — Premium Partner */}
          <PremiumPartnerSlot creative={ads.premiumPartner} baseUrl={baseUrl} />

          {/* Listings A */}
          <ListingRow listings={listingsA} baseUrl={baseUrl} />

          {/* Slot 2 — Service Sponsor #1 */}
          <ServiceSponsorSlot creative={ads.serviceSponsors[0]} baseUrl={baseUrl} />

          {/* Listings B */}
          <ListingRow listings={listingsB} baseUrl={baseUrl} />

          {/* Slot 3 — Service Sponsor #2 */}
          <ServiceSponsorSlot creative={ads.serviceSponsors[1]} baseUrl={baseUrl} />

          {/* Listings C */}
          <ListingRow listings={listingsC} baseUrl={baseUrl} />

          {/* CTA */}
          <Section style={{ padding: "0 24px 24px", textAlign: "center" as const }}>
            <Button
              href="#"
              style={{
                backgroundColor: emailTokens.blue400,
                color: emailTokens.neutralWhite,
                fontSize: 16,
                fontWeight: 600,
                padding: "12px 32px",
                borderRadius: 8,
                textDecoration: "none",
                fontFamily,
              }}
            >
              View all results
            </Button>
          </Section>

          {/* Slot 4 — Trusted Partner */}
          <TrustedPartnerSlot creative={ads.trustedPartner} baseUrl={baseUrl} />

          {/* Footer */}
          <Section
            style={{
              backgroundColor: emailTokens.midnight,
              padding: "24px",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <Text
              style={{
                margin: "0 0 12px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: emailTokens.neutral400,
                fontFamily,
              }}
            >
              Buyer Resources
            </Text>

            {/* Slots 5–7 — Footer Sponsors */}
            <Row style={{ marginBottom: 24 }}>{ads.footerSponsors.map((sponsor, i) => (
                <FooterSponsorSlot key={i} creative={sponsor} baseUrl={baseUrl} />
              ))}</Row>

            <Hr
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                borderWidth: 1,
                margin: "0 0 16px",
              }}
            />

            <Text
              style={{
                margin: "0 0 8px",
                fontSize: 11,
                color: emailTokens.neutral400,
                fontFamily,
                lineHeight: "16px",
              }}
            >
              You are receiving this email because you saved a search on Rightboat.com.
            </Text>
            <Text style={{ margin: 0, fontFamily }}>
              <Link
                href="#"
                style={{
                  fontSize: 11,
                  color: emailTokens.neutral400,
                  textDecoration: "underline",
                  marginRight: 16,
                }}
              >
                Unsubscribe
              </Link>
              <Link
                href="#"
                style={{
                  fontSize: 11,
                  color: emailTokens.neutral400,
                  textDecoration: "underline",
                  marginRight: 16,
                }}
              >
                Manage preferences
              </Link>
              <Link
                href="#"
                style={{
                  fontSize: 11,
                  color: emailTokens.neutral400,
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default SavedSearchEmailTemplate

SavedSearchEmailTemplate.PreviewProps = {
  ...centerConsoleProps,
  baseUrl: "https://www.rightboat.com",
} satisfies SavedSearchEmailTemplateProps
