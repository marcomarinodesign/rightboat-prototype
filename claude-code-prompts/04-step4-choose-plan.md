# Step 4 — Choose Plan (sync to Figma)

> Read `claude-code-prompts/00-shared-context.md` first. Figma frame **`116:947`**.

## Goal
Sync `src/features/sell-boat/components/fsbo/FSBOStep4ChoosePlan.tsx` to frame `116:947`.

## Files in scope
- `src/features/sell-boat/components/fsbo/FSBOStep4ChoosePlan.tsx` (primary)
- `types-fsbo.ts` — `fsboPlanSchema` (`selectedPlan: "basic" | "premium"`, default `premium`)

## What the frame contains (verify via MCP)
- Header: `STEP 4 OF 5`, title `Choose your plan`, subtitle `Both plans include a live listing on Rightboat. Upgrade for more visibility.`
- **Premium** card — `Recommended` badge, price + `/month`, feature list (Everything in Basic, Featured placement, Priority buyer matching, Video walkthrough upload, Listing health score & tips, Premium analytics dashboard, Dedicated seller support)
- **Basic** card — price + `/month`, feature list (Listed on Rightboat.com, Up to 20 photos, Email enquiries, 30-day listing, Basic analytics, Renew/remove any time)
- Social proof: `78% of sellers choose Premium — featured listings sell 2.4× faster on average.`
- Footnote: `Cancel or change plan any time from your dashboard. No long-term commitment.`
- CTAs: `Back` · `Next`

## IMPORTANT — price consistency
**Read the Premium price straight from Figma `116:947`** and make sure Step 5 (`116:1315`) and Success (`116:1633`) use the *same* number. There was a prior mismatch ($79 vs $99) now resolved in Figma — code must not reintroduce it. If you hardcode plan prices, centralise them (e.g. a `PLANS` const) so Step 4/5/Success can't drift.

## Tasks
1. Diff frame `116:947` against the component.
2. Reconcile both plan cards, feature lists, prices, social proof, footnote.
3. Selecting a card sets `selectedPlan` via RHF; default selection = Premium.

## Constraints
Reuse DS (`card`, `badge`, `button`). No new deps. Match Figma copy + price exactly.

## Done when
Renders like `116:947`, selection updates `selectedPlan`, price matches Steps 5/Success, lint + typecheck clean.
