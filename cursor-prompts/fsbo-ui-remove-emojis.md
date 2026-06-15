# FSBO — Remove all emojis, replace with lucide-react icons

## Context

The FSBO flow currently uses emoji characters as visual indicators in several components. The design system uses lucide-react (v0.563) for all iconography. This patch replaces every emoji with the appropriate lucide icon across the full flow.

**Rule:** No emoji characters anywhere in the FSBO flow. All visual indicators must use `lucide-react` icons, sized and coloured with DS tokens.

---

## Files to update

| File | Emojis to replace |
|---|---|
| `src/components/fsbo/BoatTypeSelector.tsx` | `🚤 ⛵ 🛥️ 🎣 🚢 ⚓ 🔵` — boat type tile icons |
| `src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx` | `🚤` in AI banner area |
| `src/features/sell-boat/components/fsbo/FSBOStep2Photos.tsx` | `📸` in tips card heading |
| `src/features/sell-boat/components/FSBOSuccessScreen.tsx` | `🚤 ✉️ 📊 💡` |

---

## Task 1 — `BoatTypeSelector.tsx`

The `BOAT_TYPES` array has an `emoji: string` field. Replace with `icon: LucideIcon`.

**Icon mapping:**

| Boat type | Old emoji | New icon |
|---|---|---|
| Motorboat | 🚤 | `Waves` |
| Sailboat | ⛵ | `Sailboat` |
| RIB | 🛥️ | `Waves` |
| Catamaran | ⛵ | `Sailboat` |
| Fishing Boat | 🎣 | `FishingHook` |
| Canal Boat | 🚢 | `Ship` |
| Yacht | ⚓ | `ShipWheel` |
| Other | 🔵 | `Anchor` |

**Updated type definition and array:**

```tsx
import {
  Waves,
  Sailboat,
  FishingHook,
  Ship,
  ShipWheel,
  Anchor,
  type LucideIcon,
} from "lucide-react"

interface BoatType {
  value: string
  label: string
  icon: LucideIcon  // was: emoji: string
}

const BOAT_TYPES: BoatType[] = [
  { value: "Motorboat",    label: "Motorboat",    icon: Waves       },
  { value: "Sailboat",     label: "Sailboat",     icon: Sailboat    },
  { value: "RIB",          label: "RIB",          icon: Waves       },
  { value: "Catamaran",    label: "Catamaran",    icon: Sailboat    },
  { value: "Fishing Boat", label: "Fishing",      icon: FishingHook },
  { value: "Canal Boat",   label: "Canal Boat",   icon: Ship        },
  { value: "Yacht",        label: "Yacht",        icon: ShipWheel   },
  { value: "Other",        label: "Other",        icon: Anchor      },
]
```

**Update the tile render** — replace the emoji `<span>` with the icon component:

```tsx
// Remove:
{type.emoji}

// Replace with:
<type.icon className="w-6 h-6" aria-hidden="true" />
```

---

## Task 2 — `FSBOStep1YourBoat.tsx`

Find any remaining `🚤` character (likely in the AI banner or boat type confirmation area) and replace with:

```tsx
import { Anchor } from "lucide-react"

// Replace the emoji span with:
<Anchor className="w-4 h-4 shrink-0" aria-hidden="true" />
```

---

## Task 3 — `FSBOStep2Photos.tsx`

The tips card heading uses `📸`. Replace with `Camera` from lucide:

```tsx
import { Camera } from "lucide-react"

// Remove:
<p className="text-sm font-semibold text-foreground">📸 Tips for great photos</p>

// Replace with:
<p className="flex items-center gap-2 text-sm font-semibold text-foreground">
  <Camera className="w-4 h-4 shrink-0 text-muted-foreground" aria-hidden="true" />
  Tips for great photos
</p>
```

---

## Task 4 — `FSBOSuccessScreen.tsx`

Four emojis to replace.

**4a — Boat chip (`🚤`):**

```tsx
import { Anchor } from "lucide-react"

// Remove:
<span aria-hidden>🚤</span>

// Replace with:
<Anchor className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
```

**4b — "What happens next" list items (`✉️ 📊 💡`):**

The current structure uses `{ icon: string, text: string }` objects. Change to `{ icon: LucideIcon, text: string }`:

```tsx
import { Mail, BarChart2, Share2, type LucideIcon } from "lucide-react"

// Replace the array:
const NEXT_STEPS: { icon: LucideIcon; text: string }[] = [
  { icon: Mail,       text: "Check your email — listing confirmation sent" },
  { icon: BarChart2,  text: "Track enquiries and views from your dashboard" },
  { icon: Share2,     text: "Share your listing link for extra reach" },
]
```

Update the list render:

```tsx
// Remove:
{NEXT_STEPS.map(({ icon, text }) => (
  <li key={text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
    <span className="shrink-0 mt-0.5" aria-hidden>{icon}</span>
    <span className="leading-snug">{text}</span>
  </li>
))}

// Replace with:
{NEXT_STEPS.map(({ icon: Icon, text }) => (
  <li key={text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
    <Icon className="w-4 h-4 shrink-0 mt-0.5 text-muted-foreground" aria-hidden="true" />
    <span className="leading-snug">{text}</span>
  </li>
))}
```

---

## Verification checklist

- [ ] `BoatTypeSelector` — all 8 tiles show lucide icons, no emoji characters
- [ ] Tile icons are `w-6 h-6`, centred inside the tile
- [ ] `FSBOStep1YourBoat` — no `🚤` anywhere in the file
- [ ] `FSBOStep2Photos` — tips card heading shows `Camera` icon + "Tips for great photos"
- [ ] `FSBOSuccessScreen` — boat chip shows `Anchor` icon, not `🚤`
- [ ] Success screen "What happens next" shows `Mail`, `BarChart2`, `Share2` icons
- [ ] No emoji characters remain in any file under `src/features/sell-boat/` or `src/components/fsbo/`
- [ ] Run `grep -r "🚤\|⛵\|🛥\|🎣\|🚢\|⚓\|📸\|✉️\|📊\|💡" src/` — should return no matches
- [ ] No TypeScript errors: `npx tsc --noEmit`
