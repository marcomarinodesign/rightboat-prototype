# Cursor Prompt — Email Preview: standalone sin nav/footer

---

## OBJETIVO

`/email-preview` debe renderizarse sin el layout global de la web (sin header de navegación,
sin footer). Solo un back link minimalista para volver, y el contenido del preview.

---

## CAMBIOS

### 1. Crea `src/app/email-preview/layout.tsx`

Next.js App Router permite un layout propio por ruta que **reemplaza** el layout global.
Crea este archivo para que `/email-preview` no herede el AppShell/nav/footer:

```tsx
export default function EmailPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

Esto es suficiente para aislar la ruta del layout global.

---

### 2. Actualiza `src/app/email-preview/page.tsx`

Añade un back link minimalista arriba del todo, fuera del EmailPreviewClient:

```tsx
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EmailPreviewClient } from "./email-preview-client"

export default function EmailPreviewPage() {
  return (
    <>
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-11 max-w-[640px] items-center px-4">
          <Link
            href="/sitemap"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Sitemap
          </Link>
        </div>
      </div>
      <EmailPreviewClient />
    </>
  )
}
```

---

### 3. Revierte la integración en design-system (si ya se hizo)

Si se añadió la categoría "Email" al `NAV` array en `src/app/design-system/page.tsx`
y la `<section id="email-preview">`, reviértelos — elimina esos cambios.

---

## DONE WHEN

- [ ] `/email-preview` carga sin nav ni footer de la web
- [ ] Hay un back link a `/sitemap` en la parte superior
- [ ] El resto del email preview funciona igual (toggles, segmentos, preview box)
- [ ] `/design-system` no tiene la categoría "Email" ni la sección email-preview
- [ ] Sin errores de TypeScript
