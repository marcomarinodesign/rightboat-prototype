# Step 1 — Your Boat (sync to Figma)

> Read `claude-code-prompts/00-shared-context.md` first. Figma frame **`116:71`** is the source of truth.

## Goal
Sync `src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx` to Figma frame `116:71`. This is the biggest screen — three sub-sections on one scrollable step: **Your Boat**, **Add your information**, **Details**.

## Files in scope
- `src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx` (primary)
- `src/features/sell-boat/types-fsbo.ts` / `types-v3.ts` — add any new fields to the Zod schema
- If a price-comparison widget is needed: a small presentational component under `src/components/fsbo/` (reuse `recharts` already installed; do not add deps)

## What the frame contains (verify against MCP, don't trust this blindly)
**Header:** step indicator `STEP 1 OF 5`, title `Tell us about your {make} {year}`, subtitle `We'll use this to create your listing and suggest a competitive price.`, AI banner `Rightboat AI pre-filled 8 fields` (use existing `FSBOAIBanner`).

**Sub-section — main fields** (AI badge on prefilled ones):
- Boat Type — toggle `Motorboat`/`Sailboat` (use `BoatTypeSelector`)
- Category (optional) — select (`CATEGORY_OPTIONS` already in file)
- Hull Material (optional) — select (`HULL_MATERIAL_OPTIONS` already in file)
- Length — `LengthInput` with `ft`/`m` switch
- Description — textarea, hint `Min. 100 characters`

**Sub-section — Add your information:**
- Asking Price — `PriceInput` (`expectedPrice`)
- **Price comparison widget** — `Good price` pill + `Your asking price` vs `Market average` bars. Build as a presentational component fed mock comps for now; mark clearly as placeholder data.
- Location * — input (`location`)

**Sub-section — Details** (new fields vs older code — confirm each in Figma):
- Manufacturer / Make · Model · Year · Condition · Engine make · Number of Engines · Engine Hours · Beam · Draft · Cabins/Berths

## Tasks
1. Open frame `116:71` via Figma MCP (screenshot + structure) and diff against the current component.
2. Reconcile copy, field order, and the three sub-section grouping.
3. For every **new** field, add it to the Zod schema and to `FSBO_STEPS[0].fields`, wire via `Controller`/`register`.
4. Implement the price-comparison widget as a reusable presentational component (mock data, labelled as placeholder).
5. Keep AI prefill working: fields filled by AI keep their badge and clear it on user edit (`onUserEditAIField`).

## Constraints
Reuse DS + existing FSBO components. No new deps. Don't rewire RHF. Match Figma copy exactly.

## Done when
Renders like `116:71`, new fields validate through Zod, AI badges behave, `npm run lint` + `npx tsc --noEmit` clean. Report fields added to the schema and any Figma element you couldn't map.
