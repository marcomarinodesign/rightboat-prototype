# Rightboat Prototype

## Project context

Nautical marketplace prototype. Next.js + Tailwind + Framer Motion.

**SRP:** split view won the Q2 experiment. `/boats-for-sale` is the live listing (filters sidebar + 3-col grid on desktop). The 4-col grid is archived at `/archive/srp-grid` — do not treat it as the product default.

## Figma skills (repo)

- `skills/figma-use/SKILL.md` — Plugin API / `use_figma` (obligatorio antes de escrituras en canvas).
- `skills/figma-implement-design/SKILL.md` — diseño → código.
- `skills/figma-generate-design/SKILL.md` — código / spec → Figma.
- `skills/figma-code-connect/SKILL.md` — mappings parserless / MCP.
- `skills/figma-generate-library/SKILL.md` — librería y tokens en Figma.

## Human-facing design docs

- `docs/DESIGN_SOURCE.md` — fuente de verdad Figma + flujo + trazabilidad.
- `DESIGN_SYSTEM.md` — tokens y estructura de componentes.
- `docs/CODE_CONNECT.md` — CLI Code Connect (`npm run figma:connect:*`).

## MCP

- Figma MCP activo
- Notion MCP activo

## Cursor — reglas Figma / design system

Las reglas detalladas para implementar diseños con Figma MCP están en `.cursor/rules/figma-design-system.mdc` (tokens, carpetas `ui` / `patterns`, flujo MCP).

## Cursor Cloud specific instructions

- Package manager is npm (`package-lock.json`). The startup update script runs `npm install` for you.
- Standard commands live in `package.json` scripts: `npm run dev` (Next.js dev server on port 3000, Turbopack), `npm run build`, `npm run lint`. No `.env`/`.env.local` is required to run the app locally.
- No automated test suite exists (there is no `test` script). Playwright is a devDependency used only by the `scripts/figma-*` capture utilities, not by an app test runner — don't expect `npm test` to work.
- `npm run lint` currently reports pre-existing errors/warnings, mostly in `scripts/*.cjs` (`require()` imports) and `*.figma.tsx` Code Connect files. These are not caused by app code and are not startup blockers; treat lint failures as pre-existing unless they touch files you changed.
- The live SRP is `/boats-for-sale` (filters sidebar + boat grid); the archived 4-col grid at `/archive/srp-grid` is not the product default. Boat detail pages and some listing fields use placeholder/dummy prototype data (e.g. `"Value"` fields, and a card may route to a sample detail page), which is expected prototype behavior — not an environment bug.
