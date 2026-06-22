# Rightboat prototype

Next.js marketplace prototype for Rightboat (App Router, Tailwind v4, Framer Motion, Radix primitives).

## Design source (Figma + código)

- **[docs/DESIGN_SOURCE.md](docs/DESIGN_SOURCE.md)** — archivo Figma canónico (`fileKey`), flujo bidireccional prototipo ↔ Figma, scripts MCP y trazabilidad en PRs.
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** — tokens, carpetas `ui` / `patterns` y APIs de componentes.
- **[docs/CODE_CONNECT.md](docs/CODE_CONNECT.md)** — Figma Code Connect (Dev Mode): configuración, publicación y archivos `*.figma.tsx`.
- **[DESIGN_SYNC.md](DESIGN_SYNC.md)** — registro opcional de hitos grandes diseño ↔ código.

Reglas para implementación con **Cursor + Figma MCP**: [`.cursor/rules/figma-design-system.mdc`](.cursor/rules/figma-design-system.mdc).

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup

```bash
npm install
```

If you need environment variables, copy `.env.example` to `.env.local` and fill in values.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
