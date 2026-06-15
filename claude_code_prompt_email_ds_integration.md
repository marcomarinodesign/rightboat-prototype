# Cursor Prompt — Integrar Email Preview en /design-system
# Tarea única, sin instalar nada nuevo

---

## CONTEXTO

El email preview vive en `src/app/email-preview/` como ruta standalone (`/email-preview`).
El objetivo es moverlo dentro de `src/app/design-system/page.tsx` como una sección más
de la navegación lateral, bajo una nueva categoría **"Email"**.

No hay que tocar `src/components/email/` ni `src/emails/`. Solo reorganizar la UI.

---

## CAMBIOS EXACTOS

### 1. `src/app/design-system/page.tsx`

**a) Añade la categoría "Email" al array `NAV`** — al final, después de "Custom":

```typescript
{
  category: "Email",
  items: [
    { id: "email-preview", label: "Email Preview" },
  ],
},
```

**b) Importa `EmailPreviewClient`** en la sección de imports:

```typescript
import { EmailPreviewClient } from "@/app/email-preview/email-preview-client"
```

**c) Añade la sección "Email Preview"** en el área de contenido, al final de las demás secciones, siguiendo exactamente el mismo patrón de sección que ya usan las otras (busca el patrón `id="colors"` o `id="button"` y replica la estructura wrapping):

```tsx
{/* ── Email Preview ───────────────────────────────────────── */}
<section id="email-preview" className="scroll-mt-20">
  <h2 className="mb-6 text-xl font-bold text-foreground">Email Preview</h2>
  <p className="mb-6 text-sm text-muted-foreground">
    Saved Search Email Monetization — Q2 2026. 7 ad slots, 4 targeting segments.
    Vista de prototipo y render real via <code className="font-mono text-xs">@react-email</code>.
  </p>
  <EmailPreviewClient embedded />
</section>
```

---

### 2. `src/app/email-preview/email-preview-client.tsx`

Añade la prop `embedded?: boolean` al componente. Cuando `embedded={true}`:
- Elimina el `min-h-screen bg-muted py-8` del wrapper exterior (ya tiene el padding del design-system).
- Elimina el `<header>` con el título y subtítulo (ya lo muestra la sección del design-system).
- Mantiene todo lo demás igual: toggles de viewMode, selector de segmentos, label de targeting, el email preview box.

```typescript
export function EmailPreviewClient({ embedded = false }: { embedded?: boolean }) {
  // ...existing state...

  return (
    <div className={cn(!embedded && "min-h-screen bg-muted py-8")}>
      <div className={cn("space-y-6", !embedded && "mx-auto max-w-[640px] px-4")}>
        {!embedded && (
          <header className="space-y-2">
            <h1 className="text-lg font-bold text-foreground">
              Saved Search Email — Monetization Preview
            </h1>
            <p className="text-sm text-muted-foreground">
              Q2 2026 · 7 ad slots · prototype vs React Email render
            </p>
          </header>
        )}
        {/* resto sin cambios */}
      </div>
    </div>
  )
}
```

---

### 3. `src/app/email-preview/page.tsx` (opcional)

Redirige a `/design-system#email-preview` para evitar URLs duplicadas:

```typescript
import { redirect } from "next/navigation"

export default function EmailPreviewPage() {
  redirect("/design-system#email-preview")
}
```

---

## DONE WHEN

- [ ] `/design-system` muestra "Email" en la nav lateral con el item "Email Preview"
- [ ] Al hacer click en "Email Preview" en la nav, el scroll lleva a la sección correcta
- [ ] El email preview funciona igual que en `/email-preview`: toggles viewMode + selector de segmentos
- [ ] `/email-preview` redirige a `/design-system#email-preview`
- [ ] Sin errores de TypeScript (`npx tsc --noEmit`)
- [ ] Sin cambios en `src/components/email/`, `src/emails/`, ni datos mock
