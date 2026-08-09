# Production alignment — rightboat.com ↔ Figma ↔ prototype

Goal: make Figma the source of design truth, have it flow into this prototype, and have
the prototype be cheap to port into production. That only works if the three speak one
language. Today they don't.

> [!warning] How this was produced
> Everything below is **inferred from production's compiled artifacts** — the public HTML
> of `/` and `/boats-for-sale`, the CSS bundle (`application-*.css`, 295 KB) and the Vite
> JS bundle (`application-*.js`, 229 KB). No access to the Rails repo.
>
> That means: token values are real, but only the ones **actually used** on the pages
> fetched. Names not emitted into the bundle are invisible here. To close the gaps marked
> ⚠️ below, see [What's still missing](#whats-still-missing).
>
> Captured 9 Aug 2026.

---

## 1. The three systems

| | Production (rightboat.com) | Prototype (this repo) | Figma (El-Captain-DS) |
|---|---|---|---|
| Stack | Rails + Turbo + Stimulus, Vite | Next.js 16 | — |
| CSS | **Tailwind v3** | **Tailwind v4** (`@theme inline`) | — |
| Font | Inter ✅ | Inter ✅ | Inter ✅ |
| Colour vocabulary | `primary-*`, `secondary-*`, `wireframe-*`, `background-*`, `gray-*` | `midnight`, `blue-*`, `malibu-*`, `neutral-*` | same as prototype |
| Type scale | `body-1…5`, `subtitle-0…4` | `body/base·sm·xs`, `heading/xl…sm` | same as prototype |
| React components | **194** (see §5) | 112 | — |

The font is the one thing already aligned across all three.

---

## 2. Colour — the mapping

### 2.1 Exact matches (6)

These need no decision. The brand core is already shared.

| Production | Hex | Prototype / Figma |
|---|---|---|
| `primary-blue` | `#0257fc` | `blue-400` / `Blue/400` |
| `primary-chinese-blue` | `#13022c` | `midnight` / `Midnight` |
| `primary-white` | `#ffffff` | `neutral-white` / `Neutral/White` |
| `background-paper` | `#fafafa` | `neutral-100` / `Neutral/100` |
| `background-neutral` | `#f4f9ff` | `status-info-100` |
| `primary-lime` | `#dcfce7` | `status-success-100` |

### 2.2 Close but different (14) — the dangerous ones

Same intent, different value. These look identical in review and drift silently in code.
**Each row needs a decision: production wins, Figma wins, or converge on a third value.**

| Production | Hex | Nearest in Figma | Hex | Δ |
|---|---|---|---|---|
| `secondary-ghost-white` | `#f5f8ff` | `status-info-100` | `#f4f9ff` | 2 |
| `wireframe-5` | `#f2f2f2` | `ios-bg` | `#f2f2f7` | 5 |
| `wireframe-4` | `#cccccc` | `neutral-300` | `#caccd0` | 6 |
| `background-table-header` | `#f5f5f5` | `ios-bg` | `#f2f2f7` | 8 |
| `background-alice-blue` | `#f0f4ff` | `status-info-100` | `#f4f9ff` | 9 |
| `danger` | `#eb5757` | `status-error-200` | `#e55a5a` | 12 |
| `secondary-blue` | `#0141c6` | `blue-500` | `#0944c4` | 13 |
| `secondary-malibu` | `#b8e7ff` | `malibu-300` | `#b2ebf9` | 16 |
| `secondary-lavender` | `#dee8ff` | `malibu-200` | `#e0f7ff` | 17 |
| `primary-cherry-red` | `#fef2f2` | — | — | — |
| `background-malibu` | `#33c1fd` | `malibu-500` | `#29b6f6` | 28 |
| `secondary-malibu-base` | `#09a9ee` | `malibu-600` | `#039be5` | 29 |
| `secondary-dark-purple` | `#281e36` | `muted` | `#1f123f` | 30 |
| `secondary-status-info` | `#0073e6` | `ios-blue` | `#007aff` | 32 |

### 2.3 No equivalent (12)

Production has these; Figma and the prototype have nothing for them.

**The neutral ramp is the big one.** Production's `wireframe-1…5` are pure greys
(`#333333`, `#595959`, `#8c8c8c`, `#cccccc`, `#f2f2f2`). The prototype's `neutral-*` are
blue-tinted (`#3d4556`, `#7181b4`, `#9da6c2`, `#caccd0`, `#e4e5e9`). Different hue,
different steps. This is a brand decision, not a technical one, and it affects almost
every surface.

The rest: `primary-navy` `#193154`, `primary-bright-turquoise` `#03e5e5`,
`secondary-tiffany-blue` `#03bfbf`, `secondary-malibu-strong` `#0087cc`,
`secondary-yellow` `#d4a017`, `gray-philippine-gray` `#8b8b8b`,
`gray-raisin-black` `#262626`, `success` `#30cf22`, `alert` `#f1dc1a`.

Full production inventory: **48 colour tokens across 11 families**.

---

## 3. Typography — almost nothing matches

| Production | px / line-height | Weight | Figma equivalent |
|---|---|---|---|
| `subtitle-0` | 90 / 90 | 700 | — |
| `subtitle-1` | 28 / 34 | 700 | — |
| `subtitle-2` | 24 / 30 | 700 | `heading/sm` 24/**32** ⚠️ |
| `subtitle-4` | 20 / 26 | 700 | — |
| `subtitle-3` | 18 / 24 | 700 | — |
| `body-5` | 20 / 28 | — | — |
| `body-1` | **17** / 24.3 | — | `body/base` **16**/24 ⚠️ |
| `body-2` | 14 / 18 | — | `body/sm` 14/**20** ⚠️ |
| `body-3` | 12 / 16 | — | `body/xs` 12/16 ✅ |
| `body-4` | 10 / 12 | — | — |

**One exact match out of ten.** `body-1` is 17px, not 16. Production has no heading scale
above 28px; Figma's `heading/xl` (48), `heading/lg` (36) and `heading/md` (30) have no
production counterpart at all.

Note also that production's emphasis is baked into `subtitle-*` (always weight 700), which
is structurally the same idea as the `body/*-bold` styles added to Figma on 9 Aug.

---

## 4. The SRP card — different components

The production listing card is **not** the card in Figma or in this prototype:

```html
<a class="flex flex-col p-2 border shadow-sm rounded-2xl border-wireframe-4/95
          w-full min-h-[29rem]">
  <picture>…hero image…</picture>
  <div class="grid grid-cols-2 gap-1 pt-1">  <!-- TWO more thumbnails -->
```

- **Three images visible at once** — a hero plus a 2-up thumbnail grid. Not a carousel.
- `rounded-2xl`, `min-h-[29rem]`, border `wireframe-4` at 95% opacity
- `Favourite` React island, absolutely positioned top-right
- A status badge top-left on `bg-secondary-malibu-strong`

Ours: single 3:2 image, broker row, "Contact Seller" button, `rounded-xl`.

> [!important] Consequence for Q3 SRP Gallery View
> The A/B test assumes a control of "one static hero image, no affordance". **That control
> does not exist in production** — production already surfaces three photos per card.
> The variation would *replace* that layout, not add to it, which changes both the
> hypothesis and the metric. Worth confirming before the W7 build.

---

## 5. Production already has a React component library

194 components in 36 folders, mounted into Rails as islands. Highlights that overlap with
work we are doing or planning:

| Production | Prototype counterpart | Note |
|---|---|---|
| `images/Slider`, `Carousel`, `Gallery`, `GalleryContainer` | `ui/image-slider`, `ui/carousel` | **Gallery View may not need new code** |
| `search/PriceHistogramFilter` | `filters/price-histogram` | same feature, built twice |
| `contact/SaveSearch`, `SaveSearchV2` | `email/saved-search-email` | Q2 monetization project |
| `contact/ContactSeller` | `boats/bdp/bdp-contact-seller` | |
| `buttons/*` (9 variants) | `ui/button` | |
| `form/*` (23), `inputs/*` (10) | `ui/input`, `ui/select`, `ui/checkbox`, `filters/searchable-select` | |
| `icons/*` (37) | lucide-react | different icon source |
| `utils/Favourite` | — | prototype has no favourite |

What the prototype has that production doesn't: the FSBO wizard (14), the iOS app screens
(15), the marketing blocks (14) and the Inactive BDP variants. That maps exactly onto the
unshipped Q2/Q3 projects — which is the expected and healthy case.

### The delivery seam

Production mounts React by name with JSON props:

```html
<div data-controller="react"
     data-react-component-value="Favourite"
     data-react-props-value='{"user":false,"favouritedByUser":false,"boatId":576649}'>
```

This is the mechanism for moving a prototype component into production without a rewrite.
`Favourite`, `ContactSeller`, `Sorter` and `LabeledTypeahead` already ship this way. It
turns "port the repo to Rightboat" from a migration into a series of independent pieces.

---

## 6. What has already been done (9 Aug 2026)

Steps 1–3 below were executed. Remaining work is §7.

**Figma — renamed to production vocabulary.** 17 variables renamed (`Midnight` →
`primary/chinese-blue`, `Blue/400` → `primary/blue`, `Neutral/200…600` → `wireframe/5…1`,
etc.). 6 of those were also revalued to production's exact value — the neutral ramp and
`secondary/blue`. 17 production tokens that Figma lacked were added. 14 tokens with no
production counterpart carry a description saying so. Collection now holds 48 variables,
matching production's 48.

> Figma turned out to be **closer to production than this repo was**: 11 exact matches
> against production before any change, versus 6 for the repo. The repo's entire `status-*`
> palette was still Tailwind's defaults (`#3b82f6`, `#22c55e`, `#f59e0b`), and the whole
> Malibu ramp and half the Neutral ramp had drifted. Figma was already the truth; nobody
> had brought it down into the code.

**Repo — synced.** `globals.css` now carries the production names as the canonical set,
with the old names kept as aliases so all 112 components keep compiling. 19 token values
were corrected in the process (e.g. `--malibu-500` `#29b6f6` → `#09a9ee`, `--neutral-500`
`#7181b4` → `#595959`).

**SRP card — aligned.** `BoatCard` gained `mediaLayout="triptych"`, reproducing
production's anatomy: hero over a 2-up thumbnail row in a 256px box, `rounded-2xl`,
`min-h-[29rem]`, `p-2`, `border-wireframe-4/95`. The SRP grid uses it. A listing with one
photo lets the hero take the full box instead of leaving a gap.

> [!note] The prototype dataset undersells it
> Production shows three photos per card because production has real galleries. Here,
> 22 of 23 boats have a single photo, so the aligned card degrades to a lone hero on
> almost every tile. The component is right; the fixture data is thin.

---

## 7. Recommended sequence

1. **Agree the token table** (§2.2 and §2.3) — one decision per row. Without this, every
   handoff re-litigates the same greys.
2. **Rename Figma variables to production's vocabulary.** A dev reading Figma should see
   `primary-chinese-blue`, not `Midnight` — the name they will actually type. Figma decides
   *which* value; production owns *what it is called*. Renaming Figma is cheap; renaming
   classes across 28,963 indexed listings is not. Mechanical, doable via the Figma API.
3. **Align the prototype's SRP card with production's anatomy** before designing on top of
   it. Everything built on the current card carries a translation cost at handoff.
4. **Use the React island seam** as the porting path, one component at a time.

---

## What's still missing

Five files would close every ⚠️ above and turn this from inference into fact:

1. **`tailwind.config.js`** — the canonical token table, including tokens not emitted into
   the compiled CSS. Highest value of the five.
2. **The SRP card partial** (ERB/HAML) — real card anatomy.
3. **The React island registry** — likely `app/javascript/controllers/react_controller.js`.
4. **`Favourite.jsx` and `ContactSeller.jsx`** — the props contract for islands.
5. **`package.json`** — exact Tailwind and React versions.

---

## Links

- [`DESIGN_SOURCE.md`](./DESIGN_SOURCE.md) — Figma as the source of UI
- [`../DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md) — prototype tokens and component structure
- [`CODE_CONNECT.md`](./CODE_CONNECT.md) — Figma ↔ code mapping
