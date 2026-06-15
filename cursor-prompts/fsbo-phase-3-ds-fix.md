# FSBO Phase 3 — Design System Fix (run after Phase 3)

Phase 3 was implemented before checking the existing design system.  
This patch corrects DS violations in the files Phase 3 created.  
Do NOT rebuild from scratch — only fix the specific class names listed below.

---

## Files to patch

### `src/components/fsbo/BoatTypeSelector.tsx`

1. `rounded-xl` → `rounded-lg` (DS standard radius for controls)
2. `min-h-[72px]` → `min-h-16`
3. `transition-all duration-150` → `transition-colors duration-[var(--transition-duration-fast)]`
4. `bg-primary/5` → `bg-tag-bg` (DS token for soft primary fill)
5. `bg-primary/10` → `bg-tag-bg`
6. `hover:border-primary/40` → `hover:border-primary`
7. Error paragraph: remove `⚠️` emoji — keep only `text-sm text-destructive mt-1`

---

### `src/components/fsbo/LengthInput.tsx`

1. `h-[52px]` on `<Input>` → remove the `h-[52px]` className entirely (Input is `h-11` by DS default)
2. `rounded-xl` on the unit toggle container → `rounded-lg`
3. `border-border` on the unit toggle container → `border-input`
4. `h-[52px]` on toggle buttons → `h-11`
5. `transition-colors` (missing duration) → `transition-colors duration-[var(--transition-duration-fast)]`
6. Error paragraph: remove `⚠️` emoji — keep only `text-sm text-destructive mt-1`

---

### `src/components/fsbo/PriceInput.tsx`

1. `h-[52px]` on `<Input>` → remove entirely (DS default `h-11`)
2. Error paragraph: remove `⚠️` emoji — keep only `text-sm text-destructive mt-1`

---

### `src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx`

1. `h-[52px]` on Location `<Input>` → remove entirely
2. `h-[52px]` on Engine Hours `<Input>` → remove entirely
3. `rounded-xl` on the "Listed elsewhere" container → `rounded-lg`
4. Any error paragraphs with `⚠️` emoji → remove emoji, keep `text-sm text-destructive mt-1`

---

### `src/components/ui/pill-group.tsx` (if Phase 3 recreated it)

If Phase 3 overwrote the existing file, restore the correct DS version:

```tsx
"use client"

import { cn } from "@/lib/utils"

export interface PillOption {
  label: string
  value: string
}

interface PillGroupProps {
  options: PillOption[]
  value: string | string[]
  onChange: (value: string) => void
  multiSelect?: boolean
  className?: string
}

export function PillGroup({
  options,
  value,
  onChange,
  multiSelect = false,
  className,
}: PillGroupProps) {
  const isSelected = (optValue: string) =>
    Array.isArray(value) ? value.includes(optValue) : value === optValue

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex-1 min-w-[80px] px-4 py-3 rounded-lg border-2 text-sm font-semibold",
            "h-11",
            "transition-colors duration-[var(--transition-duration-fast)]",
            // Unselected
            "border-border bg-card text-foreground hover:border-primary hover:bg-muted",
            // Selected
            isSelected(opt.value) &&
              "border-primary bg-primary text-primary-foreground"
          )}
          aria-pressed={isSelected(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
```

---

## Verification after patching

Run `npx tsc --noEmit` — should be zero errors.

Check visually at `http://localhost:3000/fsbo/wizard`:
- [ ] All inputs are the same height as other inputs in the app (`h-11`)
- [ ] Boat type tiles have `rounded-lg` corners (not rounder)
- [ ] Selected tile has a soft blue fill (`bg-tag-bg`) not a heavy blue
- [ ] Unit toggle (ft/m) matches the height of the adjacent input
- [ ] No `h-[52px]` remains in any FSBO component (`grep -r "52px" src/`)
- [ ] No `rounded-xl` on controls (`grep -r "rounded-xl" src/components/fsbo/`)
