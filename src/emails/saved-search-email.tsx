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
  malibu200: "#b8e7ff",
  neutral100: "#fafafa",
  neutral200: "#e4e5e9",
  neutral400: "#9da6c2",
  neutral500: "#51545c",
  neutralWhite: "#ffffff",
  statusInfo100: "#f4f9ff",
  borderCard: "#e4e5e9",
} as const

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

/** Horizontal listing row image — matches Figma spec 280×160. */
const LISTING_CARD_IMAGE = {
  width: 280,
  height: 160,
} as const

const LISTING_IMAGE_SPACER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

export type SavedSearchEmailTemplateProps = {
  context: SavedSearchContext
  listings: SearchListing[]
  ads: {
    premiumPartner?: AdCreative | null
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
  className,
}: {
  width: number
  height: number
  label?: string
  className?: string
}) {
  return (
    <Section
      className={className}
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
        <HouseAdPlaceholder className="mob-ad-slot" width={552} height={138} />
      </Section>
    )
  }

  return (
    <Section style={{ padding: "0 24px 16px" }}>
      <Link href={creative.clickUrl} style={{ textDecoration: "none" }}>
        <Section
          className="mob-ad-slot"
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
        <HouseAdPlaceholder className="mob-ad-slot" width={552} height={184} />
      </Section>
    )
  }

  return (
    <Section style={{ padding: "0 24px 16px" }}>
      <Link href={creative.clickUrl} style={{ textDecoration: "none" }}>
        <Section
          className="mob-ad-slot"
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
      <Column className="mob-footer-col" style={{ width: "33.33%", padding: "0 4px", verticalAlign: "top" as const }}>
        <HouseAdPlaceholder className="mob-footer-placeholder" width={168} height={94} />
      </Column>
    )
  }

  return (
    <Column className="mob-footer-col" style={{ width: "33.33%", padding: "0 4px", verticalAlign: "top" as const }}>
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

const BOAT_TYPE_LABEL_EMAIL: Record<string, string> = {
  "center-console": "Center Console",
  sailboat: "Sailboat",
  yacht: "Yacht",
  catamaran: "Catamaran",
  other: "Other",
}

function HorizontalListingRowEmail({
  listing,
  boatType,
  baseUrl,
  isLast = false,
}: {
  listing: SearchListing
  boatType: string
  baseUrl?: string
  isLast?: boolean
}) {
  const imageUrl = absoluteImageUrl(listing.images[0] ?? "", baseUrl)
  const specsLine = [
    listing.year,
    listing.length ? `${listing.length}ft` : null,
    BOAT_TYPE_LABEL_EMAIL[boatType] ?? boatType,
    listing.condition ?? null,
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <Section
      style={{
        padding: "0 24px",
        borderBottom: isLast ? "none" : `1px solid ${emailTokens.neutral200}`,
      }}
    >
      <Row style={{ paddingTop: 16, paddingBottom: 16 }}>
        {/* Image column — div with position:relative so pill can sit absolute bottom-right */}
        <Column className="mob-listing-img" style={{ width: 280, verticalAlign: "top" as const }}>
          <div
            className="mob-listing-img-inner"
            style={{
              position: "relative" as const,
              width: 280,
              height: 160,
              backgroundColor: emailTokens.neutral200,
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              borderRadius: 4,
              overflow: "hidden",
              display: "block",
            }}
          >
            {listing.photoCount != null && listing.photoCount > 0 && (
              <div
                style={{
                  position: "absolute" as const,
                  bottom: 8,
                  right: 8,
                  backgroundColor: emailTokens.malibu200,
                  padding: "4px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  color: emailTokens.midnight,
                  fontFamily,
                  whiteSpace: "nowrap" as const,
                  lineHeight: "16px",
                }}
              >
                See {listing.photoCount} photos
              </div>
            )}
          </div>
        </Column>

        {/* Content column */}
        <Column className="mob-listing-content" style={{ paddingLeft: 16, verticalAlign: "top" as const }}>
          <Text
            style={{
              margin: "0 0 4px",
              fontSize: 16,
              fontWeight: 700,
              color: emailTokens.midnight,
              fontFamily,
              lineHeight: "24px",
            }}
          >
            {listing.title}
          </Text>
          <Text
            style={{
              margin: "0 0 2px",
              fontSize: 14,
              color: emailTokens.neutral500,
              fontFamily,
            }}
          >
            {listing.location}
          </Text>
          <Text
            style={{
              margin: "0 0 4px",
              fontSize: 14,
              color: emailTokens.neutral500,
              fontFamily,
            }}
          >
            {specsLine}
          </Text>
          <Text
            style={{
              margin: "0 0 8px",
              fontSize: 16,
              fontWeight: 700,
              color: emailTokens.blue400,
              fontFamily,
              lineHeight: "24px",
            }}
          >
            {listing.price}
          </Text>
          <Button
            href={listing.href}
            style={{
              backgroundColor: emailTokens.blue400,
              color: emailTokens.neutralWhite,
              fontSize: 13,
              fontWeight: 500,
              padding: "10px 16px",
              borderRadius: 12,
              textDecoration: "none",
              fontFamily,
              display: "inline-block",
            }}
          >
            View listing →
          </Button>
        </Column>
      </Row>
    </Section>
  )
}

export function SavedSearchEmailTemplate({
  context,
  listings,
  ads,
  baseUrl,
}: SavedSearchEmailTemplateProps) {
  // Cap at 5 listings per Figma spec + Joe's feedback (2026-06-05)
  const visibleListings = listings.slice(0, 5)

  const previewText = context.userFirstName
    ? `Hi ${context.userFirstName}, new boats matching "${context.searchLabel}"`
    : `New boats matching "${context.searchLabel}"`

  return (
    <Html lang="en">
      <Head>
        <style>{`
          @media only screen and (max-width: 600px) {
            /* Generic full-width override for fixed-px elements */
            .mob-w-full {
              width: 100% !important;
              max-width: 100% !important;
            }
            /* Ad slots — remove fixed 552px width */
            .mob-ad-slot {
              width: 100% !important;
              max-width: 100% !important;
              height: auto !important;
              min-height: 100px !important;
            }
            /* Listing row — stack image above content */
            .mob-listing-img {
              display: block !important;
              width: 100% !important;
              padding-bottom: 12px !important;
            }
            .mob-listing-img-inner {
              width: 100% !important;
              height: 200px !important;
            }
            .mob-listing-content {
              display: block !important;
              width: 100% !important;
              padding-left: 0 !important;
            }
            /* Footer sponsors — stack single column */
            .mob-footer-col {
              display: block !important;
              width: 100% !important;
              padding: 0 0 8px 0 !important;
            }
            .mob-footer-placeholder {
              width: 100% !important;
            }
          }
        `}</style>
      </Head>
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
          className="mob-w-full"
          style={{
            maxWidth: 600,
            width: "100%",
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
                    color: emailTokens.midnight,
                    fontFamily,
                  }}
                >
                  Saved Search Alert
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Intro */}
          <Section style={{ padding: "20px 24px 12px", textAlign: "center" as const }}>
            <Heading
              as="h1"
              style={{
                margin: "0 0 8px",
                fontSize: 30,
                fontWeight: 700,
                lineHeight: "36px",
                letterSpacing: "-0.3px",
                color: emailTokens.midnight,
                fontFamily,
                textAlign: "center" as const,
              }}
            >
              {context.userFirstName ? (
                <>
                  <span style={{ color: emailTokens.blue400 }}>
                    Hi {context.userFirstName},
                  </span>
                  {" "}new boats for you
                </>
              ) : (
                "New boats matching your search"
              )}
            </Heading>
            <Text
              style={{
                margin: 0,
                fontSize: 14,
                color: emailTokens.neutral500,
                fontFamily,
                lineHeight: "20px",
                textAlign: "center" as const,
              }}
            >
              We found new listings matching &ldquo;
              <span style={{ fontWeight: 600, color: emailTokens.midnight }}>
                {context.searchLabel}
              </span>
              &rdquo;{context.location ? ` in ${context.location}` : ""}.
            </Text>
          </Section>

          {/* Slot 1 — Premium Partner */}
          <PremiumPartnerSlot creative={ads.premiumPartner} baseUrl={baseUrl} />

          {/* Listings — max 5, horizontal layout */}
          {visibleListings.map((listing, i) => (
            <HorizontalListingRowEmail
              key={listing.id}
              listing={listing}
              boatType={context.boatType}
              baseUrl={baseUrl}
              isLast={i === visibleListings.length - 1}
            />
          ))}

          {/* CTA */}
          <Section style={{ padding: "24px 24px", textAlign: "center" as const }}>
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

          {/* Slot 2 — Trusted Partner */}
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
                margin: "0 0 16px",
                fontSize: 12,
                fontWeight: 700,
                color: emailTokens.neutralWhite,
                fontFamily,
                lineHeight: "16px",
              }}
            >
              BUYER RESOURCES
            </Text>

            {/* Slots 3–5 — Footer Sponsors */}
            <Row style={{ marginBottom: 16 }}>{ads.footerSponsors.map((sponsor, i) => (
                <FooterSponsorSlot key={i} creative={sponsor} baseUrl={baseUrl} />
              ))}</Row>

            {/* Divider — rgba(255,255,255,0.08) per Figma, not a border */}
            <Section
              style={{
                height: 1,
                backgroundColor: "rgba(255,255,255,0.08)",
                margin: "0 0 16px",
                fontSize: 0,
                lineHeight: "1px",
              }}
            >
              &nbsp;
            </Section>

            <Text style={{ margin: "0 0 16px", fontFamily }}>
              <Link
                href="#"
                style={{
                  fontSize: 12,
                  color: emailTokens.neutralWhite,
                  textDecoration: "underline",
                  marginRight: 20,
                }}
              >
                Unsubscribe
              </Link>
              <Link
                href="#"
                style={{
                  fontSize: 12,
                  color: emailTokens.neutralWhite,
                  textDecoration: "underline",
                  marginRight: 20,
                }}
              >
                Manage preferences
              </Link>
              <Link
                href="#"
                style={{
                  fontSize: 12,
                  color: emailTokens.neutralWhite,
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </Link>
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: 12,
                color: emailTokens.neutralWhite,
                fontFamily,
                lineHeight: "16px",
              }}
            >
              You are receiving this email because you saved a search on Rightboat.com.
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
