# Design System — Rightboat

## 1. Audit Report

### Problems found

| Category | Issue | Location |
|----------|--------|----------|
| **Duplicated styles** | `rounded-[12px]` in 25+ files | Button, Card, Input, Dialog, Select, Sheet, BDP, blocks, filters |
| **Duplicated patterns** | Same card hover: `border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-lg` | ArticleCard, FeaturedArticle, PopularModels |
| **Hardcoded colors** | `#F4F9FF`, `#E4E5E9`, `#CACCD0`, `#0357fc`, `#0257fc` | boat-card, icon-container, propel-expert-dialog, app pages |
| **Inline styles** | `style={{ color: "#0257fc" }}`, `scrollSnapType`, `scrollbarWidth` | propel/page, broker-dealer/page, image-slider, home-categories, bdp-gallery |
| **Inconsistent naming** | Mix of `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-[12px]` | Global |
| **Mixed responsibilities** | ListingCard (composition) inside ui/card.tsx | card.tsx |
| **Repeated logic** | Card + ImageSlider + same layout in ArticleCard, PopularModels, ListingCard | blog, home, ui |

### Suggested fixes (applied)

- **Tokens**: Centralized in `src/app/globals.css` (:root + @theme) and `src/styles/tokens.ts`. Semantic tokens: `--tag-bg`, `--border-card`, `--overlay`, `--overlay-sheet`.
- **Radius**: Single scale `rounded-lg` (12px) for controls and cards; `rounded-2xl` for large cards where needed.
- **Colors**: All hex replaced by semantic classes: `bg-tag-bg`, `border-border-card`, `text-primary`, `bg-overlay`, `bg-overlay-sheet`.
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

---

## 3. Tokens

**Defined in** `src/app/globals.css` (`:root` + `@theme inline`).

| Token group | Keys | Usage |
|-------------|------|--------|
| **Colors** | `--primary`, `--brand-*`, `--tag-bg`, `--border-card`, `--overlay`, `--overlay-sheet` | Tailwind: `bg-primary`, `bg-tag-bg`, `border-border-card`, `bg-overlay` |
| **Radius** | `--radius`, `--radius-sm` … `--radius-4xl` | `rounded-lg`, `rounded-2xl` |
| **Shadow** | `--shadow-sm`, `--shadow-md`, `--shadow-lg` | In @theme for future use |
| **Transition** | `--transition-duration-fast/normal/slow` | e.g. `duration-[var(--transition-duration-normal)]` |
| **Breakpoints** | `--breakpoint-sm` … `--breakpoint-2xl` | Reference in tokens.ts; Tailwind uses its own breakpoints |

**Optional JS** `src/styles/tokens.ts`: exports `tokens` object for non-Tailwind contexts (e.g. third-party or `style` prop).

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
<Badge variant="default" | "secondary" | "outline" />
```

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

// Semantic tokens (no hex)
<div className="rounded-lg bg-tag-bg border border-border-card text-primary" />
```

---

## 6. Consistency checklist

- **Naming**: Props use `variant`, `size`, `lift`; no `blue`, `small`, `rounded` as booleans.
- **Spacing**: Prefer Tailwind scale (p-4, gap-4, space-y-4).
- **Radius**: Default UI/cards `rounded-lg`; large panels `rounded-2xl` where needed.
- **Shadows**: `shadow-sm` (cards), `shadow-lg` (modals).
- **Hover/focus**: `transition-colors` or `transition-all duration-200`; focus `ring-2 ring-ring ring-offset-2`.
- **Animation**: Prefer CSS vars `--transition-duration-*` or Tailwind `duration-200`.
