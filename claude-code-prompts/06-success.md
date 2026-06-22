# Success screen (sync to Figma)

> Read `claude-code-prompts/00-shared-context.md` first. Figma frame **`116:1633`**.

## Goal
Sync `src/features/sell-boat/components/FSBOSuccessScreen.tsx` to frame `116:1633`.

## Files in scope
- `src/features/sell-boat/components/FSBOSuccessScreen.tsx` (primary)

## What the frame contains (verify via MCP)
- Title `Your listing is live!`
- Description `Buyers on Rightboat can find your boat right now.`
- Listing detail line `{make} · {model} · {year}` — **drive from form data**, not a hardcoded string (prior bug: showed `Bavaria · Vision 46 · 2018` while the flow used a Jeanneau). Pull make/model/year from `FSBOFormData`.
- Premium badge `Premium · {price}/mo` — same price as Steps 4/5.
- `What happens next` — 3 steps (email confirmation, dashboard tracking, share link)
- CTAs: **`View my listing →`** · `Share listing` · `List another boat`

## Tasks
1. Diff frame `116:1633` against the component.
2. Reconcile copy and the 3 next-step items.
3. Bind the listing detail line and plan badge to real form data so they never contradict earlier steps.
4. Wire CTAs: `View my listing` → listing/preview route; `Share listing` → share affordance; `List another boat` → resets wizard to Step 1.

## Constraints
Reuse DS (`button`, `badge`). No new deps. Match Figma copy exactly. No hardcoded boat data.

## Done when
Renders like `116:1633`, listing line + badge reflect actual form data, CTAs route correctly, lint + typecheck clean.
