# Step 3 — Your Details (sync to Figma)

> Read `claude-code-prompts/00-shared-context.md` first. Figma frame **`116:738`**.

## Goal
Sync `src/features/sell-boat/components/fsbo/FSBOStep3YourDetails.tsx` to frame `116:738`.

## Files in scope
- `src/features/sell-boat/components/fsbo/FSBOStep3YourDetails.tsx` (primary)
- `src/components/fsbo/PasswordInput.tsx` (reuse)
- `types-fsbo.ts` if any field is added/removed

## What the frame contains (verify via MCP)
- Header: `STEP 3 OF 5`, title `Your details`, subtitle `So buyers can reach you — and to create your Rightboat account.`
- Fields:
  - **Email** — read-only, prefilled from LP. Hint: `Entered at the start. Change` (link to `/fsbo`)
  - **Full name** — input, placeholder `e.g. James Taylor`
  - **Phone number** — input, placeholder `e.g. 07700 900123`, hint `Only shared with interested buyers — never displayed publicly.`
  - **Create a password *** — `PasswordInput`, placeholder `8+ characters`, hint `This creates your Rightboat account so you can manage your listing.`
  - **Consent checkbox** — `I agree to Rightboat's Terms of Service and Privacy Policy. My contact details will only be shared with genuine buyers.`
- CTAs: `Back` · `Next`

## Note on current code vs Figma
The current component still references `CONTACT_OPTIONS` / `preferredContact` (Phone/Email/WhatsApp pill group). **Check frame `116:738`** — if "Preferred contact method" is no longer in the design, remove the pill group from the component AND drop `preferredContact` from the schema + `FSBO_STEPS[2].fields`. Don't leave dead fields.

## Tasks
1. Diff frame `116:738` against the component.
2. Reconcile fields, copy, hints, and consent label exactly.
3. Add/remove schema fields to match the final field set; keep validation (email read-only, password min 8, consent required).

## Constraints
Reuse DS + `PasswordInput`. No new deps. Match Figma copy exactly.

## Done when
Renders like `116:738`, validation works, no orphaned fields in schema, lint + typecheck clean. Report fields added/removed.
