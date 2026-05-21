/** Prototype geo options for SRP location filter (City / State tab). */

export const US_COUNTRY_VALUE = "united-states-of-america"

export type GeoOption = { label: string; value: string }

function slugify(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

const COUNTRY_NAMES = [
  "United States of America",
  "United Kingdom",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Greece",
  "Croatia",
  "Germany",
  "Turkey",
  "Portugal",
  "Ireland",
  "Canada",
  "British Virgin Islands",
  "Hong Kong",
  "Malta",
  "United Arab Emirates",
  "Poland",
  "Thailand",
  "Sweden",
  "Belgium",
  "Mexico",
  "Saint Martin",
  "Martinique",
  "Finland",
  "Montenegro",
  "Bahamas",
  "Saint Lucia",
  "Slovenia",
  "Grenada",
  "Singapore",
  "Puerto Rico",
  "Denmark",
  "Cyprus",
  "Monaco",
  "China",
  "Antigua and Barbuda",
  "Malaysia",
  "Norway",
  "Australia",
  "Trinidad and Tobago",
  "Seychelles",
  "Panama",
  "French Polynesia",
  "Switzerland",
  "Gibraltar",
  "Saint Vincent and the Grenadines",
  "Curaçao",
  "Indonesia",
  "Virgin Islands of the United States",
  "South Africa",
  "Russia",
  "New Zealand",
  "Dominican Republic",
  "Guadeloupe",
  "Belize",
  "Taiwan",
  "Guatemala",
  "Vietnam",
  "Philippines",
  "Tunisia",
  "Estonia",
  "Venezuela",
  "Costa Rica",
  "Egypt",
  "Lebanon",
  "Sint Maarten",
  "Austria",
  "Barbade",
  "Lithuania",
  "Ukraine",
  "Bulgaria",
  "Latvia",
  "Brazil",
  "Colombia",
  "Japan",
  "Israel",
  "São Tomé and Príncipe",
  "Mediterranean",
  "Bonaire",
  "Sierra Leone",
  "Gabon",
  "Moldova",
  "Fiji",
  "Mauritius",
  "Slovakia",
  "Cuba",
  "Jamaica",
  "Macao",
  "Argentina",
  "Czech Republic",
  "Peru",
  "Albania",
  "Hungary",
  "South Korea",
  "Maldives",
  "Bahrain",
  "Romania",
  "Georgia",
  "India",
  "New Caledonia",
  "Aruba",
  "Cayman Islands",
  "Saint Barthélemy",
  "Bermuda",
  "French Guiana",
  "Netherlands Antilles",
  "Åland Islands",
  "Kuwait",
  "Morocco",
  "Madagascar",
  "Oman",
  "Saudi Arabia",
  "Tanzania",
  "Chile",
  "Cambodia",
  "Serbia",
  "Uruguay",
  "Cape Verde",
  "Ecuador",
  "Kenya",
  "Qatar",
  "Congo (Dem. Rep.)",
  "Turks and Caicos Islands",
  "Jordan",
  "Afghanistan",
  "Saint Kitts and Nevis",
  "Belarus",
  "Honduras",
  "Luxembourg",
  "Marshall Islands",
  "Sudan",
  "Suriname",
  "Azerbaijan",
  "Cameroon",
  "Dominica",
  "Algeria",
  "Greenland",
  "Mozambique",
  "Vanuatu",
  "Anguilla",
  "Angola",
  "American Samoa",
  "Botswana",
  "Cook Islands",
  "Falkland Islands",
  "Myanmar",
  "French Southern Territories",
  "United States Minor Outlying Islands",
  "Wallis and Futuna",
  "Armenia",
  "Bosnia and Herzegovina",
  "Benin",
  "Brunei",
  "Bouvet Island",
  "Cocos (Keeling) Islands",
  "Western Sahara",
  "British Indian Ocean Territory",
  "Iceland",
  "Sri Lanka",
  "Liberia",
  "Macedonia",
  "Mali",
  "Mauritania",
  "Nigeria",
  "Papua New Guinea",
  "Pakistan",
  "Saint Pierre and Miquelon",
  "Réunion",
  "El Salvador",
  "Vatican City",
] as const

export const LOCATION_COUNTRY_OPTIONS: GeoOption[] = [
  { label: "All Countries", value: "" },
  ...COUNTRY_NAMES.map((name) => ({
    label: name,
    value: name === "United States of America" ? US_COUNTRY_VALUE : slugify(name),
  })),
]

export function isUnitedStatesCountry(country: string): boolean {
  return country === US_COUNTRY_VALUE
}

export const US_STATE_OPTIONS: GeoOption[] = [
  { label: "Alabama", value: "alabama" },
  { label: "Alaska", value: "alaska" },
  { label: "Arizona", value: "arizona" },
  { label: "Arkansas", value: "arkansas" },
  { label: "California", value: "california" },
  { label: "Colorado", value: "colorado" },
  { label: "Connecticut", value: "connecticut" },
  { label: "Delaware", value: "delaware" },
  { label: "Florida", value: "florida" },
  { label: "Georgia", value: "georgia" },
  { label: "Hawaii", value: "hawaii" },
  { label: "Idaho", value: "idaho" },
  { label: "Illinois", value: "illinois" },
  { label: "Indiana", value: "indiana" },
  { label: "Iowa", value: "iowa" },
  { label: "Kansas", value: "kansas" },
  { label: "Kentucky", value: "kentucky" },
  { label: "Louisiana", value: "louisiana" },
  { label: "Maine", value: "maine" },
  { label: "Maryland", value: "maryland" },
  { label: "Massachusetts", value: "massachusetts" },
  { label: "Michigan", value: "michigan" },
  { label: "Minnesota", value: "minnesota" },
  { label: "Mississippi", value: "mississippi" },
  { label: "Missouri", value: "missouri" },
  { label: "Montana", value: "montana" },
  { label: "Nebraska", value: "nebraska" },
  { label: "Nevada", value: "nevada" },
  { label: "New Hampshire", value: "new-hampshire" },
  { label: "New Jersey", value: "new-jersey" },
  { label: "New Mexico", value: "new-mexico" },
  { label: "New York", value: "new-york" },
  { label: "North Carolina", value: "north-carolina" },
  { label: "North Dakota", value: "north-dakota" },
  { label: "Ohio", value: "ohio" },
  { label: "Oklahoma", value: "oklahoma" },
  { label: "Oregon", value: "oregon" },
  { label: "Pennsylvania", value: "pennsylvania" },
  { label: "Rhode Island", value: "rhode-island" },
  { label: "South Carolina", value: "south-carolina" },
  { label: "South Dakota", value: "south-dakota" },
  { label: "Tennessee", value: "tennessee" },
  { label: "Texas", value: "texas" },
  { label: "Utah", value: "utah" },
  { label: "Vermont", value: "vermont" },
  { label: "Virginia", value: "virginia" },
  { label: "Washington", value: "washington" },
  { label: "West Virginia", value: "west-virginia" },
  { label: "Wisconsin", value: "wisconsin" },
  { label: "Wyoming", value: "wyoming" },
  { label: "District of Columbia", value: "district-of-columbia" },
]

/** Listing-aligned US cities by state (prototype). */
export const US_CITIES_BY_STATE: Record<string, GeoOption[]> = {
  california: [
    { label: "San Diego", value: "san-diego" },
    { label: "Stockton", value: "stockton" },
  ],
  connecticut: [{ label: "Noank", value: "noank" }],
  florida: [
    { label: "Fort Lauderdale", value: "fort-lauderdale" },
    { label: "Miami", value: "miami" },
    { label: "Moore Haven", value: "moore-haven" },
    { label: "Orlando", value: "orlando" },
    { label: "Sarasota", value: "sarasota" },
  ],
  maryland: [{ label: "Annapolis", value: "annapolis" }],
  massachusetts: [{ label: "Osterville", value: "osterville" }],
  michigan: [{ label: "Grand Rapids", value: "grand-rapids" }],
  missouri: [{ label: "Lake of the Ozarks", value: "lake-of-the-ozarks" }],
  "north-carolina": [{ label: "Morehead City", value: "morehead-city" }],
  "south-carolina": [{ label: "Charleston", value: "charleston" }],
  texas: [{ label: "Austin", value: "austin" }],
  washington: [{ label: "Seattle", value: "seattle" }],
}

/** International cities by country slug (prototype). */
export const INTERNATIONAL_CITIES_BY_COUNTRY: Record<string, GeoOption[]> = {
  "united-kingdom": [
    { label: "Portsmouth", value: "portsmouth" },
    { label: "Southampton", value: "southampton" },
  ],
  france: [{ label: "Cannes", value: "cannes" }],
  monaco: [{ label: "Monaco", value: "monaco" }],
  "saint-martin": [{ label: "St. Martin", value: "st-martin" }],
  italy: [{ label: "Rome", value: "rome" }, { label: "Venice", value: "venice" }],
  spain: [{ label: "Barcelona", value: "barcelona" }, { label: "Palma", value: "palma" }],
  greece: [{ label: "Athens", value: "athens" }, { label: "Corfu", value: "corfu" }],
  croatia: [{ label: "Split", value: "split" }, { label: "Dubrovnik", value: "dubrovnik" }],
  netherlands: [{ label: "Amsterdam", value: "amsterdam" }],
  germany: [{ label: "Hamburg", value: "hamburg" }],
  canada: [{ label: "Vancouver", value: "vancouver" }, { label: "Toronto", value: "toronto" }],
  australia: [{ label: "Sydney", value: "sydney" }],
  "united-arab-emirates": [{ label: "Dubai", value: "dubai" }],
}

/** Match filter query against boat.location strings. */
export const CITY_SEARCH_LABELS: Record<string, string> = {
  "fort-lauderdale": "Fort Lauderdale",
  miami: "Miami",
  "moore-haven": "Moore Haven",
  orlando: "Orlando",
  sarasota: "Sarasota",
  "san-diego": "San Diego",
  stockton: "Stockton",
  seattle: "Seattle",
  osterville: "Osterville",
  noank: "Noank",
  charleston: "Charleston",
  "lake-of-the-ozarks": "Lake of the Ozarks",
  annapolis: "Annapolis",
  austin: "Austin",
  "morehead-city": "Morehead City",
  "grand-rapids": "Grand Rapids",
  portsmouth: "Portsmouth",
  southampton: "Southampton",
  cannes: "Cannes",
  monaco: "Monaco",
  "st-martin": "St. Martin",
}

const STATE_SEARCH_LABELS: Record<string, string> = Object.fromEntries(
  US_STATE_OPTIONS.map((s) => [s.value, s.label])
)

export function getCityOptions(
  country: string,
  state: string
): GeoOption[] {
  if (!country) return []
  if (isUnitedStatesCountry(country)) {
    if (!state) return []
    return US_CITIES_BY_STATE[state] ?? []
  }
  return INTERNATIONAL_CITIES_BY_COUNTRY[country] ?? []
}

export function getCountryLabel(value: string): string {
  return LOCATION_COUNTRY_OPTIONS.find((o) => o.value === value)?.label ?? value
}

export function getStateLabel(value: string): string {
  return US_STATE_OPTIONS.find((o) => o.value === value)?.label ?? value
}

export function getCityLabel(value: string): string {
  return CITY_SEARCH_LABELS[value] ?? value.replace(/-/g, " ")
}

export function getCityStateSearchQuery(
  country: string,
  state: string,
  city: string
): string {
  if (!country) return ""
  if (city) return getCityLabel(city)
  if (isUnitedStatesCountry(country) && state) return getStateLabel(state)
  return ""
}
