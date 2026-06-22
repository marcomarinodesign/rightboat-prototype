# Step 2 — Photos (sync to Figma)

> Read `claude-code-prompts/00-shared-context.md` first. Figma frame **`116:418`**.

## Goal
Sync `src/features/sell-boat/components/fsbo/FSBOStep2Photos.tsx` to frame `116:418`.

## Files in scope
- `src/features/sell-boat/components/fsbo/FSBOStep2Photos.tsx` (primary)
- Existing upload pieces: `src/components/fsbo/FSBOPhotoUploader.tsx`, `FSBOPhotoGrid.tsx` (reuse, don't duplicate)

## What the frame contains (verify via MCP)
- Header: `STEP 2 OF 5`, title `Add photos`, subtitle `We'll use this to create your listing and suggest a competitive price.`
- Upload zone: `↑` icon, `Drag and drop photos here`, subtext `or click to browse · JPEG, PNG up to 10MB each`, buttons `Upload` · `Take a photo`
- Tips block `Tips for great photos` with 5 bullet tips (see `00-spec-reference.md` for exact copy)
- CTAs: `Back` · `Next` · `Skip for now`

## Tasks
1. Diff frame `116:418` against the component.
2. Reconcile copy (instruction, subtext, the 5 tips) and the upload affordances.
3. Ensure `Skip for now` is wired in the wizard navigation (it advances without requiring photos). `photoCount` stays the tracked field.

## Constraints
Reuse `FSBOPhotoUploader` / `FSBOPhotoGrid`. No new deps. Match Figma copy exactly.

## Done when
Renders like `116:418`, upload + skip behave, lint + typecheck clean. Report anything unmapped.
