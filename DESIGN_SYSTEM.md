# Design System — Rightboat

## 1. Audit Report

### Problems found

| Category | Issue | Location |
|----------|--------|----------|
| **Duplicated styles** | `rounded-[12px]` in 25+ files | Button, Card, Input, Dialog, Select, Sheet, BDP, blocks, filters |
| **Duplicated patterns** | Same card hover: `border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-lg` | ArticleCard, FeaturedArticle, PopularModels |
| **Hardcoded colors** | `#F4F9FF`, `#E4E5E9`, `#CACCD0`, `#0357fc`, `#0257fc` | boat-card, icon-container, propel-expert-dialog, app pages |
| **Inline styles** | `style={{ color: "#0257fc" }}`, `scrollSnapType`, `scrollbarWidth` | propel/page, broker-dealer/page, image-slider, home-categories, bdp-image-grid |
| **Inconsistent naming** | Mix of `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-[12px]` | Global |
| **Mixed responsibilities** | ListingCard (composition) inside ui/card.tsx | card.tsx |
| **Repeated logic** | Card + ImageSlider + same layout in ArticleCard, PopularModels, ListingCard | blog, home, ui |

### Suggested fixes (applied)

- **Tokens**: Centralized in `src/app/globals.css` (:root + @theme) and `src/styles/tokens.ts`. Semantic tokens: `--tag-bg`, `--border-card`, `--overlay`, `--overlay-sheet`.
- **Radius**: Single scale `rounded-lg` (12px) for controls and cards; `rounded-2xl` for large cards where needed.
- **Colors**: Primitives follow Figma **Colors** (`Blue/*`, `Malibu/*`, `Neutral/*`, `Midnight`, `Status/*`). UI uses semantic classes: `bg-primary`, `bg-tag-bg`, `border-border-card`, `bg-overlay`, `bg-overlay-sheet`, plus status utilities (`bg-status-success-100`, …).
- **Patterns**: `InteractiveCard` for shared hover/lift; `ListingCard` in `components/patterns`; Card remains a dumb primitive.
- **Inline styles**: Removed; use `text-primary`, `scrollbar-hide`, Tailwind `snap-*` classes.

### Refactor strategy

1. **Single source of truth**: Tokens in CSS + optional tokens.ts for non-Tailwind use.
2. **UI = primitives only**: Card, Button, Input, Badge, Dialog, Sheet, Select, Checkbox, Carousel, ImageSlider, IconContainer — no business logic.
3. **Patterns = composition**: InteractiveCard, ListingCard; feature components import from ui + patterns.
4. **Consistency**: One radius scale (lg = 12px), one border semantic (border-border, border-border-card), one overlay (overlay, overlay-sheet).

---

## 2. Folder structure

```
src/
  app/                    # App Router pages
  components/
    ui/                    # Pure primitives (dumb, reusable)
      button.tsx
      card.tsx
      input.tsx
      badge.tsx
      dialog.tsx
      sheet.tsx
      select.tsx
      checkbox.tsx
      carousel.tsx
      image-slider.tsx
      icon-container.tsx
    patterns/              # Composed components (composition only)
      interactive-card.tsx
      listing-card.tsx
      index.ts
    layout/                # Shell, header, footer
      app-shell.tsx
    blocks/                # Section building blocks (hero, feature, cta, etc.)
    blog/
    boats/                 # Boat BDP, boat-card, boat-meta
    broker-dealer/
    filters/
    home/
    propel/
    research-advice/
    search/
  styles/
    tokens.ts              # JS-accessible tokens (optional)
  lib/
    utils.ts
  data/
```

**Rules**: `ui` = no business logic. `patterns` = composition of ui. `layout` = page structure. `blocks` / `blog` / `boats` / etc. = features with business logic.

**BDP gallery (listing detail)**: [`src/components/boats/bdp/bdp-image-grid.tsx`](src/components/boats/bdp/bdp-image-grid.tsx) renders the Figma **1 primary + 3 thumbnails** grid on `md+`, with **Photos (N)** / **Videos (M)** outline CTAs over the bottom-right cell; on smaller breakpoints it uses a single hero + stacked CTAs. Tapping any tile or CTA opens [`bdp-gallery-modal.tsx`](src/components/boats/bdp/bdp-gallery-modal.tsx): a fullscreen `Dialog` with a sticky header, **Photos | Videos** tabs (when videos exist), vertical photo list, and YouTube embeds on the Videos tab. Inactive listings pass `state="inactive"` for the **Sold** pill on the hero.

---

## 3. Tokens

**Defined in** `src/app/globals.css` (`:root` + `@theme inline`). Naming aligns with the Figma file **Colors** collection (library linked from [docs/DESIGN_SOURCE.md](docs/DESIGN_SOURCE.md)); variable paths map to CSS with slashes → kebab (e.g. Figma `Blue/400` → `--blue-400` → Tailwind `bg-blue-400`).

### 3.1 Color primitives (Figma)

| Figma group | CSS variables | Tailwind examples |
|-------------|---------------|-------------------|
| **Midnight** | `--midnight` | `bg-midnight`, `text-midnight` |
| **Blue** /200 … /600 | `--blue-200` … `--blue-600` | `bg-blue-400`, `text-blue-600` |
| **Malibu** /200 … /600 | `--malibu-200` … `--malibu-600` | `bg-malibu-500` |
| **Neutral** /100–/600, White, Black | `--neutral-100` … `--neutral-600`, `--neutral-white`, `--neutral-black` | `bg-neutral-100`, `border-neutral-200` |
| **Status/Success** /100, /200, /300 | `--status-success-100` … | `bg-status-success-100`, `text-status-success-300` |
| **Status/Warning** /100–/300 | `--status-warning-*` | idem |
| **Status/Error** /100–/300 | `--status-error-*` | idem; `--destructive` → `--status-error-200` |
| **Status/Info** /100–/300 | `--status-info-*` | idem; `--tag-bg` → `--status-info-100` |

**Legacy aliases**: `--brand-*` removed (2026-08-30, zero call sites). `--midnight` remains as alias of `--midnight-900` for utility classes (`bg-midnight`); semantic tokens reference `--midnight-900` directly.

**Hex source of truth**: Dev Mode / variables in Figma. If a Malibu or Status hex drifts, update the primitive block in `globals.css` first, then semantic mappings if needed.

### 3.2 Semantic colors (app / shadcn)

| Role | Typical source primitive | Tailwind |
|------|---------------------------|----------|
| Primary CTA | `Blue/400` | `bg-primary`, `text-primary` |
| Secondary | `Blue/200` | `bg-secondary` |
| Accent (hover / emphasis) | `Malibu/500` (light), `Malibu/400` (dark) | `bg-accent`, `text-accent-foreground` |
| Muted surfaces | `Neutral/100` | `bg-muted` |
| Muted text | `Neutral/500` | `text-muted-foreground` |
| Borders / inputs | `Neutral/200` | `border-border`, `border-input` |
| Destructive | `Status/Error/200` | `bg-destructive` |
| Tag / soft info surface | `Status/Info/100` | `bg-tag-bg` |
| Card border | `Neutral/200` | `border-border-card` |

### 3.3 Other tokens

| Token group | Keys | Usage |
|-------------|------|--------|
| **Radius** | `--radius`, `--radius-sm` … `--radius-4xl` | `rounded-lg`, `rounded-2xl` |
| **Shadow** | `--shadow-sm`, `--shadow-md`, `--shadow-lg` | In @theme for future use |
| **Transition** | `--transition-duration-fast/normal/slow` | e.g. `duration-[var(--transition-duration-normal)]` |
| **Breakpoints** | `--breakpoint-sm` … `--breakpoint-2xl` | Reference in tokens.ts; Tailwind uses its own breakpoints |

**Optional JS** `src/styles/tokens.ts`: `tokens.colors.blue`, `malibu`, `neutral`, `status`, `midnight`, `semantic` for charts and `style` props.

Live swatches: **`/design-system`** → Foundation → Colors.

---

## 4. Base components (API)

### Button

```tsx
<Button variant="default" | "destructive" | "outline" | "secondary" | "ghost" | "link" 
        size="default" | "sm" | "lg" | "icon" 
        asChild? />
```

- CVA variants. No inline styles. Uses `rounded-lg`, semantic colors.

### Card

```tsx
<Card />
<CardHeader />
<CardTitle />
<CardDescription />
<CardContent />
<CardFooter />
```

- Primitive only. Uses `rounded-lg`, `border-border`, `shadow-sm`.

### Input

```tsx
<Input type? className? ...inputProps />
```

- `rounded-lg`, `h-10`, semantic border/ring.

### Badge

```tsx
<Badge variant="default" | "secondary" | "outline" | "success" | "warning" | "info" | "destructive" />
```

Status variants use **Status/**\* primitives (`success`, `warning`, `info`); `destructive` maps to **Status/Error**.

### Dialog / Sheet

- Overlay: `bg-overlay` (Dialog), `bg-overlay-sheet` (Sheet). Content: `rounded-lg`.

### Patterns

```tsx
<InteractiveCard lift? className? ...divProps />
<ListingCard title description images price onClick? showDots? imageAlt? className? />
```

- **InteractiveCard**: Card + border-border/60 + transition + optional lift + hover shadow.
- **ListingCard**: Card + ImageSlider + CardHeader/Title/Description/Footer; for listing tiles.

---

## 5. Example usage

```tsx
// Primitive
<Button variant="default" size="sm">Save</Button>
<Card className="p-4">...</Card>
<Input placeholder="Search" />

// Pattern — interactive card (e.g. article or model tile)
<InteractiveCard className="group overflow-hidden" lift>
  <Link href={...} className="block overflow-hidden rounded-t-lg">
    <ImageSlider images={[...]} alt="..." showDots />
  </Link>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</InteractiveCard>

// Pattern — listing with image + title + price
<ListingCard
  title="Boat name"
  description="Optional"
  images={["/img1.jpg"]}
  price="$175,000"
  onClick={() => router.push("/detail")}
  showDots
/>

// Primitives + semantic (no raw hex)
<div className="rounded-lg bg-tag-bg border border-border-card text-primary" />
<div className="rounded-lg bg-status-success-100 text-status-success-300 ring-1 ring-status-success-200/50" />
```

---

## 6. Consistency checklist

- **Naming**: Props use `variant`, `size`, `lift`; no `blue`, `small`, `rounded` as booleans.
- **Spacing**: Prefer Tailwind scale (p-4, gap-4, space-y-4).
- **Radius**: Default UI/cards `rounded-lg`; large panels `rounded-2xl` where needed.
- **Shadows**: `shadow-sm` (cards), `shadow-lg` (modals).
- **Hover/focus**: `transition-colors` or `transition-all duration-200`; focus `ring-2 ring-ring ring-offset-2`.
- **Animation**: Prefer CSS vars `--transition-duration-*` or Tailwind `duration-200`.

---

## 7. Figma y sincronización con el prototipo

El diseño en **Figma** y este repo se tratan como fuentes coordinadas de UI. Resumen:

- **Enlace al archivo**, `fileKey`, flujo Figma ↔ código (MCP, scripts, Code Connect) y convención de PRs: **[docs/DESIGN_SOURCE.md](docs/DESIGN_SOURCE.md)**.
- **Dev Mode / snippets reales desde el repo:** **[docs/CODE_CONNECT.md](docs/CODE_CONNECT.md)** y `figma.config.json` en la raíz.
- **Implementación asistida con Cursor:** [`.cursor/rules/figma-design-system.mdc`](.cursor/rules/figma-design-system.mdc) (obligatorio al tocar `src/**/*.tsx` bajo esas reglas).

Los tokens de este documento (secciones 3–4) son la referencia al traducir diseño a clases Tailwind. Los nombres de variables Figma **Colors** (`Blue/400`, `Status/Success/100`, …) deben alinearse con `--blue-400`, `--status-success-100`, etc. en `globals.css` y con *code syntax* WEB en Figma cuando exista.
