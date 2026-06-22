/**
 * Broker / dealer logos for listing cards.
 * Uses Clearbit’s public logo endpoint (https://logo.clearbit.com/{domain}) — real brand marks
 * served by each organization’s domain. If a logo fails to load, the UI falls back to
 * {@link BROKER_LOGO_PLACEHOLDER}.
 *
 * To add or fix a broker: set the domain to the company’s primary marketing site (same domain
 * Clearbit indexes). Adjust the map if a logo is wrong or missing.
 */
export const BROKER_LOGO_PLACEHOLDER = "/brands/broker-placeholder.svg"

const CLEARBIT = "https://logo.clearbit.com"

/** Exact `boat.broker` string → company domain (no protocol). */
export const brokerLogoDomainByName: Record<string, string> = {
  "Denison Yacht Sales": "denisonyachtsales.com",
  "Delta Marine": "deltamarine.com",
  "Formula Boats": "formulaboats.com",
  "Featured Broker": "", // intentional: use placeholder
  "The Catamaran Company": "thecatamarancompany.com",
  "Oyster Harbors Marine": "oysterharborsmarine.com",
  "Suzuki Marine": "suzukimarine.com",
  "United Yacht Sales": "unitedyacht.com",
  "Yacht Sales International": "yachtsalesinternational.com",
  "Cobalt Boats": "cobaltboats.com",
  "Annapolis Yacht Sales": "ayss.com",
  "Austin Marine": "austinmarine.com",
  "Sunseeker Monaco": "sunseeker.com",
  "Multihull Company": "multihullcompany.com",
  "Carolina Yacht Sales": "carolinayachtsales.com",
  "Azimut Yachts": "azimut.com",
  "Chris-Craft Dealers": "chriscraft.com",
  "Tiara Yachts": "tiarayachts.com",
  "Fairline Yachts": "fairline.com",
  "Mastercraft Dealers": "mastercraft.com",
  "Sea Ray West": "searay.com",
  "Bayliner Northwest": "bayliner.com",
  "Princess Yachts": "princessyachts.com",
  "Worth Avenue Yachts": "worthaveyachts.com",
  "Rick Obey Yacht Sales": "rickobeyyachtsales.com",
}

export function getBrokerLogoUrl(broker: string): string | null {
  const domain = brokerLogoDomainByName[broker]
  if (domain === "") return null
  if (domain) return `${CLEARBIT}/${domain}`
  return null
}
