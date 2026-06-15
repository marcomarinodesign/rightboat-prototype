# FSBO Wizard — Cursor Prompt · Phase 1: Foundation & URL Rename

## Context

We are rebuilding the FSBO "Sell Your Boat" wizard at `/sell-b-v3` into a clean 5-step paid flow at `/fsbo`.  
This is **Phase 1 only** — no UI changes, no new components. Just the structural refactor that every subsequent phase depends on.

**Do NOT change any UI or business logic yet.** The goal is a clean rename + schema update + storage migration. The wizard should work identically at the new URL when done.

---

## Task 1 — Rename the app route folder

Move the Next.js app route from `/sell-b-v3` to `/fsbo`.

**Actions:**
1. Create `src/app/fsbo/` directory
2. Move `src/app/sell-b-v3/page.tsx` → `src/app/fsbo/page.tsx`
3. Move `src/app/sell-b-v3/SellBv3LandingClient.tsx` → `src/app/fsbo/FSBOLandingClient.tsx`
4. Move `src/app/sell-b-v3/wizard/page.tsx` → `src/app/fsbo/wizard/page.tsx`
5. Move `src/app/sell-b-v3/wizard/SellBv3WizardClient.tsx` → `src/app/fsbo/wizard/FSBOWizardClient.tsx`
6. Delete `src/app/sell-b-v3/` (the old folder)

**Update internal references after move:**

`src/app/fsbo/page.tsx` — update import:
```tsx
// Before
import { SellBv3LandingClient } from "./SellBv3LandingClient"
// After
import { FSBOLandingClient } from "./FSBOLandingClient"

export default function FSBOPage() {
  return <FSBOLandingClient />
}
```

`src/app/fsbo/wizard/page.tsx` — update import:
```tsx
// Before
import { SellBv3WizardClient } from "./SellBv3WizardClient"
// After
import { FSBOWizardClient } from "./FSBOWizardClient"

export default function FSBOWizardPage() {
  return <FSBOWizardClient />
}
```

`src/app/fsbo/FSBOLandingClient.tsx` — update the `wizardHref` prop passed to `SignupModal` and the `router.push` call if present:
```tsx
// Any hardcoded "/sell-b-v3/wizard" → "/fsbo/wizard"
// Any hardcoded "/sell-b-v3" → "/fsbo"
```

`src/app/fsbo/wizard/FSBOWizardClient.tsx` — rename the component:
```tsx
// Before: export function SellBv3WizardClient
// After:  export function FSBOWizardClient
```

---

## Task 2 — Rename the components folder

Move `src/components/sell-b-v3/` → `src/components/fsbo/`

**Actions:**
1. Move `src/components/sell-b-v3/StepOneLP.tsx` → `src/components/fsbo/StepOneLP.tsx`
2. Move `src/components/sell-b-v3/SignupModal.tsx` → `src/components/fsbo/SignupModal.tsx`
3. Delete `src/components/sell-b-v3/`

**Update imports in:**
- `src/app/fsbo/FSBOLandingClient.tsx` — update all imports from `@/components/sell-b-v3/...` → `@/components/fsbo/...`
- `src/features/sell-boat/components/BoatFormV3.tsx` — update the `STORAGE_KEY` import:
  ```tsx
  // Before
  import { STORAGE_KEY } from "@/components/sell-b-v3/SignupModal"
  // After
  import { STORAGE_KEY } from "@/components/fsbo/SignupModal"
  ```

---

## Task 3 — Update cross-app references

**`src/app/app/sell/page.tsx`** — update import path:
```tsx
// Before
import { SellBv3LandingClient } from "@/app/sell-b-v3/SellBv3LandingClient"
// After
import { FSBOLandingClient } from "@/app/fsbo/FSBOLandingClient"

export default function MobileAppSellPage() {
  return <FSBOLandingClient surface="app" />
}
```

**`src/app/app/sell/wizard/page.tsx`** — update import path:
```tsx
// Before
import { SellBv3WizardClient } from "@/app/sell-b-v3/wizard/SellBv3WizardClient"
// After
import { FSBOWizardClient } from "@/app/fsbo/wizard/FSBOWizardClient"

export default function MobileAppSellWizardPage() {
  return <FSBOWizardClient />
}
```

**`src/data/site-map.ts`** — update the "Sell your boat" section:
```ts
{
  title: "Sell your boat",
  links: [
    { label: "FSBO — Sell flow", href: "/fsbo" },
    { label: "FSBO — Wizard", href: "/fsbo/wizard" },
  ],
},
```

**`src/components/layout/app-shell.tsx`** — search for any reference to `"/sell-b-v3"` and update to `"/fsbo"`.

---

## Task 4 — Add Next.js redirect (preserve old URL)

In `next.config.ts` (or `next.config.js`), add a permanent redirect so the old URL doesn't 404:

```ts
async redirects() {
  return [
    {
      source: '/sell-b-v3',
      destination: '/fsbo',
      permanent: true,
    },
    {
      source: '/sell-b-v3/wizard',
      destination: '/fsbo/wizard',
      permanent: true,
    },
  ]
},
```

---

## Task 5 — Update storage: sessionStorage → localStorage + new key

The current wizard uses `sessionStorage` with key `"sell-b-v3-step1"`. We need to switch to `localStorage` so users can resume across sessions.

**`src/components/fsbo/SignupModal.tsx`** — update the storage key constant:
```tsx
// Before
const STORAGE_KEY = "sell-b-v3-step1"
// After
const STORAGE_KEY = "rightboat-fsbo-v1"
```

**`src/features/sell-boat/components/BoatFormV3.tsx`** — replace all `sessionStorage` calls with `localStorage`:
```tsx
// Before
sessionStorage.getItem(STORAGE_KEY)
sessionStorage.setItem(...)
sessionStorage.removeItem(STORAGE_KEY)

// After
localStorage.getItem(STORAGE_KEY)
localStorage.setItem(...)
localStorage.removeItem(STORAGE_KEY)
```

Also update the redirect on missing storage — redirect to `/fsbo` instead of `/sell-b-v3`:
```tsx
// Before
router.replace("/sell-b-v3")
// After
router.replace("/fsbo")
```

---

## Task 6 — Update the LP schema: add email field

**`src/features/sell-boat/types-v3.ts`** — add `email` to the LP schema and the LP fields array:

```ts
// Before
export const step1LPSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().transform((v) => Number(v)),
})
export const step1LPFields = ["brand", "model", "year"] as const

// After
export const step1LPSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().transform((v) => Number(v)),
  email: z.string().email("Please enter a valid email"),
})
export const step1LPFields = ["brand", "model", "year", "email"] as const
export type Step1LPData = z.infer<typeof step1LPSchema>
```

Also update `boatFormV3Schema` to include `email` at the top level (it's already in `wizardStep3Schema` but we need it captured from the LP):
```ts
// In boatFormV3Schema, ensure email is present. If it's already merged via wizardStep3Schema, no change needed — just verify the merge covers it.
```

---

## Task 7 — Add email field to the LP form component

**`src/components/fsbo/StepOneLP.tsx`** — add the email field after the Year field:

```tsx
// Add to the form, after the Year <SearchableSelect>:
<div className="space-y-1.5">
  <Label htmlFor="lp-email">Email</Label>
  <Input
    id="lp-email"
    type="email"
    placeholder="your@email.com"
    autoComplete="email"
    {...register("email")}
  />
  {errors.email && (
    <p className="text-sm text-destructive">{errors.email.message}</p>
  )}
  <p className="text-xs text-muted-foreground">
    We'll save your progress so you can pick up where you left off.
  </p>
</div>
```

Update the form's `useForm` default values to include `email: ""`.

---

## Task 8 — Eliminate SignupModal from the LP flow

The `SignupModal` currently intercepts after the LP form submit and asks for email + password before navigating to the wizard. With email now on the LP form, the modal is no longer needed for Phase 1.

**`src/app/fsbo/FSBOLandingClient.tsx`:**
- Remove the `SignupModal` component render
- Remove `showModal` / `signupOpen` state
- On LP form submit: store `{ brand, model, year, email }` directly in `localStorage` with key `"rightboat-fsbo-v1"`, then `router.push("/fsbo/wizard")`
- Keep the `SignupModal.tsx` file in place (it exports `STORAGE_KEY` which is still imported by `BoatFormV3`) — just don't render it

**`src/features/sell-boat/components/BoatFormV3.tsx`:**
- The `initialData` pre-fill from localStorage now includes `email` — pre-fill `form.setValue("email", initialData.email)` in the hydration effect (alongside `signupEmail` which is now the same field)

---

## Verification checklist

After completing all tasks, verify:

- [ ] `http://localhost:3000/fsbo` loads the landing page correctly
- [ ] `http://localhost:3000/fsbo/wizard` loads the wizard correctly  
- [ ] `http://localhost:3000/sell-b-v3` redirects to `/fsbo` (301)
- [ ] `http://localhost:3000/sell-b-v3/wizard` redirects to `/fsbo/wizard` (301)
- [ ] `/app/sell` and `/app/sell/wizard` still work (they import from `/app/fsbo/`)
- [ ] LP form has 4 fields: Make, Model, Year, Email
- [ ] Submitting the LP form stores data in `localStorage` (not sessionStorage) with key `"rightboat-fsbo-v1"`
- [ ] No SignupModal appears after LP submit — goes directly to wizard
- [ ] Wizard pre-fills brand/model/year/email from localStorage
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No console errors in browser

---

## What is NOT in scope for Phase 1

- New wizard steps (Steps 1–5) — Phase 3–7
- New components (WizardProgress, WizardFooter, BoatTypeSelector, etc.) — Phase 2+
- Package selection UI — Phase 6
- Payment step — Phase 7
- AI pre-fill logic — TBC with Joe
- Landing page SEO content — separate sprint
- Email retargeting — separate deliverable
