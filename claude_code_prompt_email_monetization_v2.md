# Cursor Prompt — Email Monetization v2: Email-Safe Templates
# Q2 2026 · Saved Search Email Monetization

---

## CONTEXTO DEL PROBLEMA

El archivo `src/components/email/saved-search-email.tsx` es un componente React válido para
el prototipo visual (`/email-preview`), pero **NO puede usarse como template de email real**.

Los emails HTML tienen restricciones fundamentales que rompen los patrones habituales de React:

| Lo que usamos en Next.js | Por qué rompe en email |
|---|---|
| `next/image` con `fill` | Requiere JS. Gmail/Outlook lo ignoran o rompen el layout |
| `ListingCard` → `ImageSlider` → Framer Motion | JS completamente bloqueado en email clients |
| Tailwind con CSS variables (`var(--blue-400)`) | Gmail, Yahoo y Outlook no soportan CSS custom properties |
| `flexbox` / `grid` | Soporte inconsistente; Outlook usa Word engine (requiere tablas) |
| `hover:`, `transition-`, `duration-` | CSS pseudo-classes e interactividad ignoradas |
| `onClick`, `useState` | JavaScript bloqueado por seguridad |
| `rounded-lg`, `shadow-sm` | Se pierden en la mayoría de clients si no son inline |

**La solución**: usar **React Email** (`@react-email/components`) para los templates reales.
React Email compila componentes React a HTML con **inline styles** y **table-based layout**,
compatible con Gmail, Outlook, Apple Mail, Yahoo (>95% de clientes).

---

## PHASE 0 — LEE EL CONTEXTO

1. `CLAUDE.md` + `DESIGN_SYSTEM.md` — contexto del proyecto y tokens.
2. `src/components/email/saved-search-email.tsx` — los tipos y componentes de prototipo ya existentes. **No borres este archivo**, es el preview visual.
3. `package.json` — verifica si `@react-email/components`, `react-email` o `@react-email/tailwind` ya están instalados.
4. `figma.config.json` — fileKey `VOCH4pGubqSYza7CbL30c7`.

---

## PHASE 1 — INSTALA REACT EMAIL

Si no está instalado:

```bash
npm install @react-email/components react-email
```

Verifica que funciona:
```bash
npx react-email --version
```

Los componentes clave de `@react-email/components` que usaremos:
- `Html`, `Head`, `Body`, `Preview` — estructura base
- `Container` — centra el contenido a max 600px
- `Section`, `Row`, `Column` — layout en tablas (internamente)
- `Img` — imagen compatible con email (no `next/image`)
- `Link` — anchor tag email-safe
- `Text`, `Heading` — tipografía
- `Button` — CTA email-safe
- `Hr` — divisor horizontal

---

## PHASE 2 — CREA EL EMAIL TEMPLATE REAL

Crea `src/emails/saved-search-email.tsx` (carpeta `src/emails/`, separada de `src/components/`).

### Reglas absolutas para este archivo:

1. **Solo `@react-email/components`** — no `next/image`, no `@/components/ui/*`, no Framer Motion.
2. **Inline styles para todo lo crítico** — nunca CSS variables (`var(--...)`). Usa valores hex literales extraídos de los tokens del design system (ver tabla abajo).
3. **No Tailwind en el template de email** — a menos que uses el wrapper `<Tailwind>` de `@react-email/tailwind`, que convierte clases a inline styles en el render.
4. **Imágenes con `<Img>`** — no `next/image`. Usa `width` y `height` explícitos.
5. **No JavaScript** — cero `onClick`, `useState`, sliders, animaciones.
6. **Un solo listado por card** — reemplaza el `ImageSlider` con una sola imagen estática.
7. **Máx. 600px de ancho** — estándar email.

### Tokens del design system como valores inline (para este archivo):

```typescript
// Extraídos de globals.css — usar inline en el email template
const tokens = {
  midnight: "#0a0f1e",         // --midnight
  blue400: "#0357fc",           // --blue-400 (primary)
  blue200: "#e8efff",           // --blue-200
  neutral100: "#f5f5f7",        // --neutral-100
  neutral200: "#e4e5e9",        // --neutral-200
  neutral500: "#6b7280",        // --neutral-500
  neutralWhite: "#ffffff",      // --neutral-white
  statusInfo100: "#f0f5ff",     // --status-info-100 (tag-bg)
  borderCard: "#e4e5e9",        // --border-card
}
```

> ⚠️ Verifica estos valores en `src/app/globals.css` antes de usarlos — actualiza si no coinciden.

### Estructura del template:

```
src/emails/saved-search-email.tsx   ← template real (React Email)
src/emails/index.ts                  ← re-export
```

### Contenido del template:

El template debe implementar los **7 ad slots** del PRD usando únicamente `<Img>` + `<Link>`:

```
[Header — Rightboat logo + search label]

[Slot 1: PremiumPartner — <Img> full-width 600×150, wrapped in <Link>]

[Section: 2 listing cards side by side (300px cada una, 1 imagen estática + título + precio)]

[Slot 2: ServiceSponsor — <Row> con <Img> 96×64 + texto del sponsor]

[Section: 2 listing cards más]

[Slot 3: ServiceSponsor — igual que slot 2]

[Section: listings restantes (si los hay)]

[CTA button: "View all results"]

[Slot 4: TrustedPartner — <Img> full-width 600×200, wrapped in <Link>]

[Footer midnight:
  "Buyer Resources" heading
  <Row> con 3 columnas = Slots 5, 6, 7 (FooterSponsor)
  Unsubscribe / Privacy links
]
```

### Props del template (reutiliza los tipos de `saved-search-email.tsx`):

```typescript
import type {
  SavedSearchContext,
  AdCreative,
  SearchListing,
} from "@/components/email/saved-search-email"

type SavedSearchEmailTemplateProps = {
  context: SavedSearchContext
  listings: SearchListing[]   // máx 6 recomendado para email
  ads: {
    premiumPartner?: AdCreative | null
    serviceSponsors: [AdCreative | null, AdCreative | null]
    trustedPartner?: AdCreative | null
    footerSponsors: [AdCreative | null, AdCreative | null, AdCreative | null]
  }
}
```

### Fallback para slots vacíos:

Si `creative` es null/undefined, renderiza un `<Section>` con `background: tokens.neutral100`
del mismo tamaño que el slot (house ad placeholder). Esto evita espacios en blanco rotos
(recomendación oficial de GAM para newsletter ads).

---

## PHASE 3 — ACTUALIZA /email-preview

Actualiza `src/app/email-preview/page.tsx` para mostrar **dos vistas**:

1. **"Prototype view"** — el `<SavedSearchEmail showDevLabels />` existente (Next.js components, para design review).
2. **"Email render"** — el HTML compilado del template real, renderizado en un `<iframe>` via `render()` de `@react-email/render`.

```typescript
// En el server component o API route:
import { render } from "@react-email/render"
import { SavedSearchEmailTemplate } from "@/emails/saved-search-email"

const html = await render(<SavedSearchEmailTemplate {...mockProps} />)
// pasar html como prop al client component que lo mete en un iframe
```

Añade un toggle "Prototype / Email render" para cambiar entre las dos vistas.

---

## PHASE 4 — DEV SERVER DE REACT EMAIL (opcional pero recomendado)

React Email incluye un dev server con hot reload y preview en múltiples clientes:

```bash
npx react-email dev --dir src/emails --port 3001
```

Añade el script a `package.json`:
```json
"email:dev": "react-email dev --dir src/emails --port 3001"
```

---

## PHASE 5 — CODE CONNECT (sin cambios respecto a v1)

Los `.figma.tsx` se crean sobre los componentes de **prototipo** (`src/components/email/`),
no sobre el template de email. El template es render-only.

Sigue las instrucciones de Phase 3 del prompt `claude_code_prompt_email_monetization.md`.

---

## DONE WHEN

- [ ] `@react-email/components` instalado y funcionando
- [ ] `src/emails/saved-search-email.tsx` creado con React Email, sin CSS vars, sin JS
- [ ] Los 7 ad slots presentes con fallback para creative null
- [ ] Imágenes con `<Img width height>` explícitos, no `next/image`
- [ ] Listados como cards estáticas (1 imagen fija, no slider)
- [ ] `/email-preview` muestra las dos vistas: prototipo + email render en iframe
- [ ] `npm run email:dev` funciona en puerto 3001
- [ ] Sin errores de TypeScript (`npx tsc --noEmit`)
- [ ] Verificado visualmente en Gmail y Apple Mail via React Email preview

---

## REFERENCIA RÁPIDA: Qué sí/no soportan los email clients

| Feature | Gmail | Outlook | Apple Mail | Yahoo |
|---|---|---|---|---|
| Tables | ✅ | ✅ | ✅ | ✅ |
| Inline styles | ✅ | ✅ | ✅ | ✅ |
| CSS variables | ❌ | ❌ | ✅ | ❌ |
| Flexbox | ⚠️ parcial | ❌ | ✅ | ⚠️ |
| CSS Grid | ❌ | ❌ | ✅ | ❌ |
| JavaScript | ❌ | ❌ | ❌ | ❌ |
| `<video>` | ❌ | ❌ | ✅ | ❌ |
| Web fonts | ❌ | ❌ | ✅ | ❌ |
| `border-radius` | ✅ | ⚠️ | ✅ | ✅ |
| Animations | ❌ | ❌ | ✅ | ❌ |
| `position` | ❌ | ❌ | ✅ | ❌ |

**Regla de oro**: si quieres que funcione en Outlook, usa tablas. React Email lo hace por ti.

---

## ARCHIVOS RELEVANTES

- `src/components/email/saved-search-email.tsx` — prototipo visual (no tocar)
- `src/emails/saved-search-email.tsx` — template real a crear
- `src/app/email-preview/page.tsx` — actualizar con toggle
- `src/data/email-monetization-mock.ts` — mock data (ya debe existir de v1)
- `claude_code_prompt_email_monetization.md` — prompt v1 (Phase 3 Code Connect sigue vigente)
