# FSBO — Design System Corrections (apply before Phase 3)

## Context

The Rightboat repo has a well-defined design system (`DESIGN_SYSTEM.md`).  
Phases 2 and 3 prompts contained violations. Apply these corrections before (or during) running Phase 3.

**Rules to follow in ALL FSBO components:**
- Radius: `rounded-lg` for controls (inputs, buttons, cards) — `rounded-xl` only for pills/chips/special cases
- Heights: `h-11` (44px) for inputs and default buttons — never `h-[52px]`
- Transitions: `duration-[var(--transition-duration-fast)]` (150ms) or `duration-[var(--transition-duration-normal)]` (200ms) — never hardcoded `duration-150`
- Colors: only semantic tokens (`bg-primary`, `text-primary`, `bg-muted`, `text-muted-foreground`, `border-border`, `border-input`, `text-destructive`, `bg-card`) — no hex, no `bg-primary/5`
- `PillGroup` already exists at `src/components/ui/pill-group.tsx` — do not recreate it

---

## Corrections to Phase 2 components

### `WizardProgress` (`src/components/fsbo/WizardProgress.tsx`)

```tsx
// Back button: use rounded-lg not rounded-full, and use DS transition
<button
  className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors duration-[var(--transition-duration-fast)] shrink-0 -ml-1"
>

// Progress bar: keep h-1.5, it's fine. Animation uses Framer Motion which is OK.
```

### `WizardFooter` (`src/components/fsbo/WizardFooter.tsx`)

```tsx
// Button: remove h-[52px], use Button's built-in size="lg" (h-11 = 44px from DS)
// rounded-xl → rounded-lg (matches Button component's own rounded-lg)
<Button
  type={isSubmit ? "submit" : "button"}
  onClick={isSubmit ? undefined : onClick}
  disabled={disabled || isLoading}
  size="lg"
  className="w-full text-base font-semibold"  // no h-[52px], no rounded-xl
>

// Secondary link: keep as-is, text-sm text-muted-foreground is correct DS usage
```

---

## Corrections to Phase 3 components

### Task 1 — PillGroup: SKIP

`src/components/ui/pill-group.tsx` already exists with the correct implementation.  
Do not recreate it.

---

### Task 2 — `BoatTypeSelector` (`src/components/fsbo/BoatTypeSelector.tsx`)

```tsx
// Corrections:
// - min-h-[72px] → min-h-16 (64px from Tailwind scale)
// - transition-all duration-150 → transition-colors duration-[var(--transition-duration-fast)]
// - bg-primary/5 and bg-primary/10 are not DS tokens → use bg-tag-bg for selected soft fill
//   (tag-bg = Status/Info/100, a light blue — appropriate for a selected state)
// - border-primary/40 → border-primary/50 is acceptable, but prefer: hover:border-primary

const isSelected = value === type.value

className={cn(
  "flex flex-col items-center justify-center gap-1.5",
  "rounded-lg border-2 p-3",   // rounded-lg not rounded-xl
  "min-h-16",                  // h-16 from Tailwind scale
  "transition-colors duration-[var(--transition-duration-fast)]",
  // Unselected
  "border-border bg-card text-foreground hover:border-primary hover:bg-muted",
  // Selected
  isSelected && "border-primary bg-tag-bg text-primary"
)}
```

---

### Task 3 — `LengthInput` (`src/components/fsbo/LengthInput.tsx`)

```tsx
// Corrections:
// - h-[52px] → remove, Input uses h-11 by default (from DS)
// - rounded-xl border border-border → rounded-lg border border-input (matches DS Input)
// - transition-colors → duration-[var(--transition-duration-fast)]
// - bg-card text-muted-foreground → correct DS tokens ✓

// Updated Input (no className height override — use DS default):
<Input
  type="number"
  inputMode="decimal"
  placeholder={unit === "ft" ? "e.g. 32" : "e.g. 9.8"}
  value={displayValue}
  onChange={handleChange}
  // no className height override — h-11 is DS default
  min={unit === "ft" ? 5 : 1.5}
  max={unit === "ft" ? 200 : 61}
/>

// Unit toggle container: rounded-lg (not rounded-xl)
<div className="flex rounded-lg border border-input overflow-hidden shrink-0">
  {(["ft", "m"] as Unit[]).map((u) => (
    <button
      key={u}
      type="button"
      onClick={() => handleUnitToggle(u)}
      className={cn(
        "px-4 h-11 text-sm font-semibold",      // h-11 to match Input height
        "transition-colors duration-[var(--transition-duration-fast)]",
        unit === u
          ? "bg-primary text-primary-foreground"
          : "bg-card text-muted-foreground hover:bg-muted"
      )}
    >
      {u}
    </button>
  ))}
</div>
```

---

### Task 4 — `PriceInput` (`src/components/fsbo/PriceInput.tsx`)

```tsx
// Corrections:
// - h-[52px] → remove (Input is h-11 by default from DS)
// - pl-8 → fine for the £ prefix clearance

<Input
  type="number"
  inputMode="numeric"
  placeholder={placeholder}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  className="pl-8"   // no h override — use DS h-11 default
  min={1000}
/>
```

---

### Task 5 — `FSBOStep1YourBoat`

```tsx
// Corrections:
// - rounded-xl for the "listed elsewhere" container → rounded-lg
// - h-[52px] on any Input → remove (use DS default h-11)
// - Error messages: use text-destructive (correct) + remove emoji ⚠️ 
//   (keep it simple — just text-destructive as per DS pattern)

// Listed elsewhere container:
<div className="flex items-center justify-between rounded-lg bg-muted px-4 py-4">

// Input fields: no height override
<Input
  id="location"
  placeholder="e.g. Brighton Marina, UK"
  {...register("location")}
/>

// Error pattern (consistent DS style):
{errors.location && (
  <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
)}

// Summary chip at top: rounded-full is fine for a pill/chip
<div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground">
```

---

## Summary of DS rules for all FSBO prompts going forward

| Rule | Correct | Wrong |
|---|---|---|
| Input height | `h-11` (DS default, no override needed) | `h-[52px]`, `h-12` |
| Button height | `size="lg"` → `h-11` (DS Button) | `h-[52px]`, custom height |
| Radius (controls) | `rounded-lg` | `rounded-xl`, `rounded-[12px]` |
| Radius (chips/pills) | `rounded-full` or `rounded-xl` | hardcoded pixel values |
| Transitions | `duration-[var(--transition-duration-fast)]` | `duration-150`, `duration-200` |
| Selected soft fill | `bg-tag-bg` (info/100 = light blue) | `bg-primary/5`, `bg-blue-50` |
| Selected border | `border-primary` | `border-[#0257fc]`, `border-blue-500` |
| Error text | `text-destructive` | `text-red-500`, `text-status-error-200` |
| Muted surface | `bg-muted` | `bg-neutral-100`, `bg-gray-50` |
| Muted text | `text-muted-foreground` | `text-neutral-500`, `text-gray-400` |
| Primary CTA bg | `bg-primary` | `bg-blue-400`, `bg-[#0257fc]` |
| No hardcoded hex | — | `#0257fc`, `#13022c`, etc. |
