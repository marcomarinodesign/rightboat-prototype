# FSBO — Spec de pantallas (Figma → Cursor)

Fuente: Figma `FSBO-Page`, página **Q2 Design Cursor**. Desktop 1440px (las variantes mobile 402px replican el mismo contenido).
Tipografía: **Geist**. Ink `#13042C` · Azul Rightboat `#0257FC` · Gris texto `#969AA0`.

Leyenda de CTAs: **[CTA primario]** = botón azul · **[CTA secundario]** = link/botón texto.

---

## Step 1 — Your Boat
Pantalla larga con 3 sub-secciones: *Your Boat*, *Add your information*, *Details*.

**Cabecera**
- Step indicator: `STEP 1 OF 5`
- Título: `Tell us about your Jeanneau Sun Odyssey 2010`
- Subtítulo: `We'll use this to create your listing and suggest a competitive price.`
- Banner AI: `Rightboat AI pre-filled 8 fields`

**Sección: (campos principales)** — badge `Rightboat AI` en los pre-rellenados
| Campo | Tipo | Valor / placeholder |
|---|---|---|
| Boat Type | Toggle | `Motorboat` / `Sailboat` |
| Category (optional) | Input | `Filled cateogry` |
| Hull Material (optional) | Input | `Fiberglass` |
| Length | Input + unidad | `10.94` · toggle `ft` / `m` |
| Description | Textarea | texto largo · hint `Min. 100 characters` |

**Sección: Add your information**
| Campo | Tipo | Valor / placeholder |
|---|---|---|
| Asking Price | Input | `€49,000` |
| (widget) Price comparison | Bloque | pill `Good price` · `Your asking price €49,000` · `Market average €54,500` |
| Location * | Input | `e.g. Brighton Marina, UK` |

**Sección: Details** — badge `Rightboat AI` donde aplica
| Campo | Tipo | Valor / placeholder |
|---|---|---|
| Manufacturer / Make | Input | `Filled cateogry` |
| Model | Input | `Filled cateogry` |
| Year | Input | `Filled cateogry` |
| Condition | Select | `Select` |
| Engine make | Select | `Select` |
| Number of Engines | Select | `Select` |
| Engine Hours | Select | `Select` |
| Beam | Select | `Select` |
| Draft | Select | `Select` |
| Cabins/Berths | Select | `Select` |

**CTAs:** [CTA secundario] `Back` · **[CTA primario] `Next`**

---

## Step 2 — Photos

**Cabecera**
- Step indicator: `STEP 2 OF 5`
- Título: `Add photos`
- Subtítulo: `We'll use this to create your listing and suggest a competitive price.`

**Zona de subida**
- Icono `↑`
- Instrucción: `Drag and drop photos here`
- Subtexto: `or click to browse · JPEG, PNG up to 10MB each`
- Botones: `Upload` · `Take a photo`

**Tips for great photos**
- `Shoot in daylight — natural light makes boats look their best`
- `Start with the exterior from the bow (front)`
- `Include the helm, cabin, and cockpit`
- `Show the engine bay, even if it's not pretty`
- `Capture any damage honestly — it builds trust with buyers`

**CTAs:** [CTA secundario] `Back` · **[CTA primario] `Next`** · [CTA secundario] `Skip for now`

---

## Step 3 — Your Details

**Cabecera**
- Step indicator: `STEP 3 OF 5`
- Título: `Your details`
- Subtítulo: `So buyers can reach you — and to create your Rightboat account.`

**Campos**
| Campo | Tipo | Valor / placeholder | Hint |
|---|---|---|---|
| Email | Input | `seller@example.com` | `Entered at the start. Change` |
| Full name | Input | `e.g. James Taylor` | — |
| Phone number | Input | `e.g. 07700 900123` | `Only shared with interested buyers — never displayed publicly.` |
| Create a password * | Input | `8+ characters` | `This creates your Rightboat account so you can manage your listing.` |
| Consent (checkbox) | Checkbox | `I agree to Rightboat's Terms of Service and Privacy Policy. My contact details will only be shared with genuine buyers.` | — |

**CTAs:** [CTA secundario] `Back` · **[CTA primario] `Next`**

---

## Step 4 — Choose Plan

**Cabecera**
- Step indicator: `STEP 4 OF 5`
- Título: `Choose your plan`
- Subtítulo: `Both plans include a live listing on Rightboat. Upgrade for more visibility.`

**Plan Premium** — badge `Recommended` · precio `$79` `/month`
- Everything in Basic
- Featured placement in search results
- Priority buyer matching
- Video walkthrough upload
- Listing health score & tips
- Premium analytics dashboard
- Dedicated seller support

**Plan Basic** — precio `$49` `/month`
- Listed on Rightboat.com
- Up to 20 photos
- Email enquiries from buyers
- 30-day listing period
- Basic listing analytics
- Renew or remove any time

**Nota social:** `78% of sellers choose Premium — featured listings sell 2.4× faster on average.`
**Footnote:** `Cancel or change plan any time from your dashboard. No long-term commitment.`

**CTAs:** [CTA secundario] `Back` · **[CTA primario] `Next`**

---

## Step 5 — Payment

**Cabecera**
- Step indicator: `STEP 5 OF 5`
- Título: `Payment`
- Subtítulo: `Your listing goes live the moment payment is confirmed.`

**Order summary**
- Título: `Order summary`
- Plan: `Rightboat Premium` — `$99` `per month`
- Detalle: `Featured placement · Priority matching · Premium analytics`
- Billing: `Billed monthly · Cancel any time` — `$99/mo`

**Formulario de pago**
| Campo | Tipo | Placeholder |
|---|---|---|
| Card number | Input | `1234 5678 9012 3456` |
| Expiry | Input | `MM/YY` |
| CVC | Input | `123` |
| Name on card | Input | `James Taylor` |

**Trust:** `SSL encrypted` · `Secure checkout` · `Powered by Stripe` (`stripe`)
**Legal:** `By publishing you confirm your listing complies with Rightboat's listing guidelines. Your card will be charged $99 today, then monthly until cancelled.`

**CTAs:** [CTA secundario] `Back` · **[CTA primario] `Publish my listing →`**

---

## Success

- Título: `Your listing is live!`
- Descripción: `Buyers on Rightboat can find your boat right now.`
- Detalle listing: `Bavaria · Vision 46 · 2018`
- Badge: `Premium · $99/mo`

**What happens next**
1. `Check your email — listing confirmation sent`
2. `Track enquiries and views from your dashboard`
3. `Share your listing link for extra reach`

**CTAs:** **[CTA primario] `View my listing →`** · [CTA secundario] `Share listing` · [CTA secundario] `List another boat`

---

## ⚠️ Inconsistencias a corregir antes de dev
1. **Precio Premium no cuadra:** Step 4 dice `$79/month`, pero Step 5 y Success dicen `$99/mo`. Unificar.
2. **Datos dummy de la barca incoherentes:** todo el flujo usa *Jeanneau Sun Odyssey*, pero Success muestra *Bavaria · Vision 46 · 2018*. Unificar.
3. **Typo:** `Filled cateogry` → `Filled category` (aparece varias veces en Step 1 como valor de relleno).
4. **Moneda mezclada:** precios de la barca en `€` (Step 1) y planes/pago en `$` (Steps 4–5). Decidir moneda única o documentar que son contextos distintos.
5. **Placeholders genéricos en Details:** Manufacturer / Model / Year usan `Filled cateogry` como valor — sustituir por ejemplos reales (p.ej. `Jeanneau`, `Sun Odyssey 36i`, `2010`).
