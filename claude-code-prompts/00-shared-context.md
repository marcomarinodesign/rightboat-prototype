# FSBO Sync — Shared context (read first, every step)

We are **syncing existing FSBO code to the latest Figma**. This is NOT a from-scratch build. The wizard, steps, types and DS components already exist — we update them to match Figma.

## Source of truth
- **Figma is the source of truth.** Read each frame via the Figma MCP. If a value in code conflicts with Figma, match Figma.
- File key: `1JdEElYI3kToAhnJwXedF0` (FSBO-Page), page **Q2 Design Cursor**.
- Desktop frame node-ids:
  | Step | Frame | node-id |
  |---|---|---|
  | 1 | Your Boat | `116:71` |
  | 2 | Photos | `116:418` |
  | 3 | Your Details | `116:738` |
  | 4 | Choose Plan | `116:947` |
  | 5 | Payment | `116:1315` |
  | — | Success | `116:1633` |
- Backup checklist of every field/text/CTA: `claude-code-prompts/00-spec-reference.md`.

## Where the code lives
- Step components: `src/features/sell-boat/components/fsbo/FSBOStep{1..5}*.tsx` + `FSBOSuccessScreen.tsx`
- Wizard shell: `src/features/sell-boat/components/BoatFormFSBO.tsx`
- Types / schema: `src/features/sell-boat/types-fsbo.ts` (+ `types-v3.ts`)
- AI prefill: `src/lib/fsbo/ai-prefill.ts`
- Route: `src/app/fsbo/wizard/`

## Golden rules (apply to every step)
1. **Reuse existing DS components. Do NOT create new ones.** Inputs/selects/etc. come from `@/components/ui/*` (`button`, `input`, `select`, `checkbox`, `label`, `switch`, `pill-group`, `badge`, `card`, `progress`). FSBO-specific from `@/components/fsbo/*` (`BoatTypeSelector`, `LengthInput`, `PriceInput`, `PasswordInput`, `FSBOAIBanner`, etc.).
2. **Keep the data layer intact.** State is React Hook Form + Zod. Each step receives `form: UseFormReturn<FSBOFormData>`. Don't rewire to local state. If Figma adds a field, add it to the Zod schema in `types-fsbo.ts` AND to the relevant entry in `FSBO_STEPS.fields`.
3. **No new dependencies.** Everything needed is already installed (RHF, zod, radix, lucide, framer-motion, recharts).
4. **Match copy exactly** to Figma (titles, subtitles, hints, CTA labels). Watch currency: boat values in `€`, plan/payment in `$` — keep whatever Figma shows now.
5. **Tailwind v4 + design tokens.** Use existing utility/token conventions already in these files (e.g. `text-muted-foreground`, `var(--transition-duration-fast)`), not hardcoded hex.
6. **Scope discipline.** Touch only the files named in each step prompt. One step at a time.

## Definition of done (every step)
- Component renders matching the Figma frame (compare against MCP screenshot of the node).
- New/changed fields are wired through RHF + Zod (validation works).
- `npm run lint` clean for touched files.
- `npx tsc --noEmit` passes.
- Briefly report: files changed, schema fields added, and anything in Figma you couldn't map.

## Suggested order
Step 1 → 2 → 3 → 4 → 5 → Success. Do them in separate Claude Code runs; review the diff before moving on. Step 1 is the largest (3 sub-sections, ~16 fields) — expect the biggest diff there.
