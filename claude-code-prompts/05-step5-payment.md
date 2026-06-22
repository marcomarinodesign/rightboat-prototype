# Step 5 — Payment (sync to Figma)

> Read `claude-code-prompts/00-shared-context.md` first. Figma frame **`116:1315`**.

## Goal
Sync `src/features/sell-boat/components/fsbo/FSBOStep5Payment.tsx` to frame `116:1315`.

## Files in scope
- `src/features/sell-boat/components/fsbo/FSBOStep5Payment.tsx` (primary)
- `src/components/fsbo/MockCardForm.figma.tsx` if the mock card form is reused

## What the frame contains (verify via MCP)
- Header: `STEP 5 OF 5`, title `Payment`, subtitle `Your listing goes live the moment payment is confirmed.`
- **Order summary:** title `Order summary`, plan `Rightboat Premium` + price + `per month`, detail `Featured placement · Priority matching · Premium analytics`, billing `Billed monthly · Cancel any time` / `{price}/mo`
- **Card form (mock):** Card number `1234 5678 9012 3456` · Expiry `MM/YY` · CVC `123` · Name on card `James Taylor`
- Trust row: `SSL encrypted` · `Secure checkout` · `Powered by Stripe` (`stripe`)
- Legal: `By publishing you confirm your listing complies with Rightboat's listing guidelines. Your card will be charged {price} today, then monthly until cancelled.`
- CTAs: `Back` · **`Publish my listing →`**

## IMPORTANT
- Price in Order summary + legal line **must equal the Premium price from Step 4** (`116:947`). Pull from the shared `PLANS` const if you created one.
- Stripe is **mock/visual only** here — do not wire a live charge. `Publish my listing →` triggers the existing submit/advance-to-success flow in `BoatFormFSBO.tsx`.

## Tasks
1. Diff frame `116:1315` against the component.
2. Reconcile order summary, card fields, trust row, legal copy, CTA label.
3. Confirm the publish CTA routes to the Success screen via the existing wizard handler.

## Constraints
Reuse DS + existing mock card form. No new deps. No real payment integration. Match Figma copy + price exactly.

## Done when
Renders like `116:1315`, price consistent with Step 4, publish → Success works, lint + typecheck clean.
