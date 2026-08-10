# Auditoría de unificación del design system

**Fecha:** 2026-08-09 · **Alcance:** 3 archivos Figma + tokens y primitivos del repo.

Archivos revisados:

| Archivo | fileKey | Rol real hoy |
|---|---|---|
| [Colors](https://www.figma.com/design/ZFVFzTPBZdh9ZmxSOYPB7B/Colors) | `ZFVFzTPBZdh9ZmxSOYPB7B` | Librería de **variables** (colección de color + tipografía). Publicada. |
| [Buttons & Links](https://www.figma.com/design/gPdFmnx9X4CO10RX4fhE8C/Buttons---Links) | `gPdFmnx9X4CO10RX4fhE8C` | Librería de **componentes**. Component set `button_web` (~200 variantes). Consume Colors. |
| [El Captain DS](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS) | `VOCH4pGubqSYza7CbL30c7` | Casi vacío. Consume Buttons & Links + Helpers + iOS 27. **No** está suscrito a Colors. |

Librerías adicionales del equipo: `Helpers`, `EC - Rightboat Font Awesome` (iconos).

---

## 1. El Captain DS sí es el archivo de producto — pero con tokens propios

> **Corrección.** Una versión previa de este informe decía que El Captain estaba "casi vacío
> (Cover + Badge)". Era falso: el listado de páginas que devuelve `get_metadata` sin `nodeId`
> viene truncado. Leído por Plugin API, el archivo tiene **22 páginas**.

Páginas reales: `Cover`, `Desktop Overview`, `Mobile Overview`, `SRP Gallery View — A/B test`,
`Email monetization design`, `iOS App (Hybrid Native + Webview)`, `Complex Components`,
`Foundations`, y ocho páginas de primitivos (`Button`, `Badge`, `Input`, `Select`, `Checkbox`,
`Switch`, `Card`, `Icon Container`).

Colecciones de variables **locales**: `Spacing` (13), `Radius` (8), `Typography` (16) y
**`Colors` (48)**. Es decir, El Captain **no consume la librería Colors**: tiene su propia copia.

### 1.1 Los tokens de El Captain estaban nombrados como producción

La colección local no seguía el naming del DS sino el de rightboat.com: `primary/blue`,
`secondary/malibu-base`, `background/paper`, `wireframe/1…5`, `danger`, `success`, `alert`.
Los **valores** coincidían con la librería Colors; lo que divergía era el **nombre**.

Eso explica el enredo: había tres sistemas de nombres (librería Colors, El Captain local,
producción) sobre prácticamente los mismos hex.

### 1.1 Hay dos componentes Button rivales en Figma

| | Buttons & Links `1:4558` | El Captain DS `24:2` |
|---|---|---|
| Propiedad `Style` | Primary · Secondary · **Tertiary** | Primary · Secondary · **Outline · Ghost · Destructive · Link** |
| Propiedad `Size` | Large · Medium · Small | SM · MD · LG · Icon |
| Estados | Default · Hover · Pressed · Disabled · Loading | ninguno |
| Otras props | `Block`, `Icon`, `Icon Position` | ninguna |
| Origen | Autoría de diseño | Generado **desde el código** (espeja los variants de shadcn) |

`24:2` es un espejo del código, no una decisión de diseño. **Los 85 mappings de Code Connect del repo
apuntan a El Captain DS**, es decir al espejo — no al componente que mantiene diseño.

---

## 1.2 Triangulación con rightboat.com

Producción usa su propia paleta Tailwind con nomenclatura heredada (`primary-blue`,
`secondary-malibu`, `gray-soft-gray`…). Al cruzarla con las variables de Figma:

**Coinciden Figma ↔ producción — aquí el prototipo era el único desalineado:**

| Figma | rightboat.com | Hex |
|---|---|---|
| `Blue/400` | `primary-blue` | `#0257fc` |
| `Blue/200` | `blue-royal` | `#208cff` |
| `Midnight` | `primary-chinese-blue` | `#13022c` |
| `Malibu/200` | `secondary-malibu` | `#b8e7ff` |
| `Malibu/400` | `background-malibu` | `#33c1fd` |
| `Malibu/500` | `secondary-malibu-base` | `#09a9ee` |
| `Malibu/600` | `secondary-malibu-strong` | `#0087cc` |
| `Neutral/100` | `background-paper` | `#fafafa` |
| `Neutral/200` | `gray-soft-border` | `#e4e5e9` |
| `Neutral/300` | `gray-soft-gray` | `#caccd0` |
| `Status/Info/100` | `background-neutral` | `#f4f9ff` |
| `Status/Info/200` | `secondary-status-info` | `#0073e6` |

Esto zanja la escala **Malibu**: la buena es la azul de las variables. Ojo — la página de
especificación del archivo Colors **está obsoleta**: sus rótulos dicen `Malibu 400 #03E5E5`
(familia turquesa), pero la variable vale `#33c1fd`. Producción conserva el turquesa viejo aparte,
como `primary-bright-turquoise`. **Las variables mandan; los swatches pintados no.**

**Producción ha derivado de Figma — conviene corregirlo allí:**

| Concepto | Figma | rightboat.com |
|---|---|---|
| Gris medio | `Neutral/400` `#9699a0` | `gray-blue-gray` `#969fb8` |
| Gris oscuro | `Neutral/500` `#51545c` | `gray-slate-blue` `#7181b4` |
| Hover de primary | `Blue/500` `#0944c4` | `secondary-blue` `#0141c6` |
| Success | `Status/Success/200` `#008a05` | `success` `#30cf22` |
| Error | `Status/Error/200` `#eb1400` | `danger` `#eb5757` |
| Warning | `Status/Warning/200` `#c25400` | `alert` `#f1dc1a` / `secondary-yellow` `#d4a017` |

Los grises azulados de producción (`#7181b4`, `#969fb8`) son justo de donde el prototipo había
copiado sus `--neutral-400/500`. Ninguno de los dos venía de Figma.

Producción además arrastra ~20 grises ad-hoc sin equivalente en el DS (`gray-anti-flash #f1f1f1`,
`gray-philippine-gray #8b8b8b`, `wireframe-1…5`, `hub-*`) — deuda a reducir, fuera del alcance de esta ronda.

**Tipografía:** producción usa **Inter** en toda la web. Confirma la decisión de Inter y deja a Figma
(Helvetica Neue en botones, Public Sans en headings) como el único sitio a corregir.

**Botón en producción:** el CTA secundario es `bg` blanco + borde 1px `#0257fc` + texto `#0257fc`
16px/700 — es **exactamente el `Secondary` de Figma**, no el azul sólido del prototipo. El primario es
`#0257fc` sólido, texto blanco, 16px/600. Es decir, **producción valida el modelo
Primary/Secondary/Tertiary de Figma**, no el modelo shadcn del prototipo.

---

## 2. Deriva de color: 19 de 30 tokens no coinciden

Los hex del Figma **Colors** son la referencia. `src/app/globals.css` diverge en:

| Token | Figma (Colors) | Código actual |
|---|---|---|
| `--malibu-200` | `#b8e7ff` | `#e0f7ff` |
| `--malibu-300` | `#60cdff` | `#b2ebf9` |
| `--malibu-400` | `#33c1fd` | `#4fc3f7` |
| `--malibu-500` | `#09a9ee` | `#29b6f6` |
| `--malibu-600` | `#0087cc` | `#039be5` |
| `--neutral-400` | `#9699a0` | `#9da6c2` |
| `--neutral-500` | `#51545c` | `#7181b4` |
| `--neutral-600` | `#37393f` | `#3d4556` |
| `--status-success-100` | `#e2ffee` | `#dcfce7` |
| `--status-success-200` | `#008a05` | `#22c55e` |
| `--status-success-300` | `#005a25` | `#15803d` |
| `--status-warning-100` | `#fff3dd` | `#fef3c7` |
| `--status-warning-200` | `#c25400` | `#f59e0b` |
| `--status-warning-300` | `#823300` | `#b45309` |
| `--status-error-100` | `#ffece4` | `#fee2e2` |
| `--status-error-200` | `#eb1400` | `#e55a5a` |
| `--status-error-300` | `#a1000b` | `#b91c1c` |
| `--status-info-200` | `#0073e6` | `#3b82f6` |
| `--status-info-300` | `#114394` | `#1d4ed8` |

**Correctos** (11): `--midnight`, `--blue-200…600`, `--neutral-white`, `--neutral-black`,
`--neutral-100`, `--neutral-200`, `--neutral-300`, `--status-info-100`.

Las escalas mal alineadas son justo las que el comentario del CSS marcaba como *"verify hex in Figma
Dev Mode if needed"* (Malibu) y las de status, que se rellenaron con la paleta por defecto de Tailwind.
La paleta de status de Rightboat es notablemente más saturada/oscura que la de Tailwind.

**Nota de naming en Figma:** la página de especificación rotula la escala gris como `Grey 100…600`,
pero las variables se llaman `Neutral/*`. Conviene unificar a `Neutral/*`.

---

## 3. Botón: el código no implementa el diseño

Specs medidos en Buttons & Links (Large / Medium / Small, estilo Primary):

| | Figma | Código (`src/components/ui/button.tsx`) |
|---|---|---|
| Radio | **8px** (todos los tamaños) | `rounded-lg` = **12px** |
| Large | h 48 · px 32 · py 12 | `size="lg"` → h 44 · px 32 |
| Medium | h 40 · px 24 · py 8 | `size="default"` → h 44 · px 20 |
| Small | h 36 · px 18 · py 6 | `size="sm"` → h 40 · px 16 |
| Tipografía | 16px / 22 · **Bold 700** | `text-sm` 14px · **medium 500** |

### 3.1 Matriz de estados (Figma) — hoy inexistente en código

| Estilo | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| **Primary** | bg `Blue/400` · texto White | bg `Blue/500` | bg `Blue/500` + overlay blanco 20% | bg `rgba(8,107,255,.5)` (`Blue/300` al 50%) |
| **Secondary** | bg White · borde `Blue/400` · texto `Blue/400` | igual que default | + overlay blanco 20% | igual que default |
| **Tertiary** | transparente · borde `Midnight` · texto `Midnight` | igual que default | + overlay blanco 8% | borde y texto `Neutral/300` |

El código resuelve todos los estados con opacidad (`hover:bg-primary/90`, `disabled:opacity-50`),
no con los tokens de la matriz. Además faltan los estados **Loading** y la variante **Block**.

> Secondary y Tertiary tienen hover/disabled idénticos al default en Figma. Probablemente sea un hueco
> del diseño, no una decisión: merece confirmación con el equipo de diseño.

### 3.2 El desajuste más caro: `secondary` significa cosas distintas

| Nombre | En Figma | En el código | Usos en el repo |
|---|---|---|---|
| `Secondary` | outline azul sobre blanco | **azul sólido**, texto blanco | 22 |
| `Tertiary` / `outline` | outline Midnight | borde `--input` gris | 31 |

`variant="outline"` (31 usos) es lo que visualmente corresponde al **Tertiary** de Figma, y
`variant="secondary"` (22 usos) pinta un botón completamente distinto al del diseño. Cualquier
renombrado tiene que revisar esos 53 llamados, no solo el `cva`.

---

## 4. Tipografía: tres fuentes en juego

| Fuente | Dónde |
|---|---|
| **Helvetica Neue** Bold 16/22 | variable `Body/Large bold` — todos los botones |
| **Public Sans** | variables `Header/Desktop/H1`, `Body/Editorial regular` |
| **Inter** | el código (`src/app/layout.tsx`) |

Las dos primeras conviven dentro de la misma familia de nombres `Body/*` en Figma, así que la
inconsistencia **empieza en Figma**, no solo en el código. Hay que decidir una fuente y aplicarla a las
variables de tipografía antes de tocar el repo.

**Bug colateral:** `layout.tsx` carga Inter pero la expone como `--font-geist-sans` (nombre heredado de
Geist), y `globals.css:10` mapea `--font-mono: var(--font-geist-mono)`, variable que **ya no define
nadie**. Las clases `font-mono` de `design-system/page.tsx` y del preview de email caen al default del
navegador.

---

## 5. Code Connect apunta al sitio equivocado

`src/components/ui/button.figma.tsx` mapea contra `El-Captain-DS?node-id=24-2` — el espejo generado
desde código — con valores de propiedad (`Style: Outline|Ghost|Destructive|Link`,
`Size: SM|MD|LG|Icon`) que **no existen** en el componente que mantiene diseño. Mientras siga así, Dev
Mode enseña snippets de un componente que diseño no usa.

Distribución actual: **85** referencias a El Captain DS, **16** a FSBO-Page.

---

## 6. Propuesta de unificación

### Fase 0 — decidido
1. **Fuente: Inter.** Confirmado por producción (toda la web usa Inter).
2. **Tokens de color: mandan las variables de Figma.** Producción corrobora 12 de ellos; la página
   de especificación pintada del archivo Colors está obsoleta y se ignora.

### ✅ Fase 1 — aplicado en el prototipo
- Los 19 primitivos de `globals.css` alineados a las variables de Figma.
- `--font-geist-sans` → `--font-inter`; `--font-mono` apuntaba a una variable inexistente y ahora
  tiene un stack real (las clases `font-mono` estaban rotas).
- Verificado: `tsc` y `next build` en verde, contraste AA en las cuatro parejas de status
  (7.3–8.8), sin errores de consola.

> `--neutral-400` (`#9699a0`) da 2.85 sobre blanco: **no usarlo para texto**, solo bordes/iconos
> decorativos. `--muted-foreground` usa `--neutral-500`, que ahora da 7.57 (antes ~4.3 con el
> `#7181b4` heredado de producción) — es una mejora de accesibilidad.

### ✅ Fase 2 — aplicado en el prototipo
- `button.tsx` reescrito contra Figma: `primary` · `secondary` · `tertiary`, radio 8px
  (token nuevo `--radius-control`, independiente del radio de tarjetas), tamaños
  **Large 48 / Medium 40 / Small 36**, texto **16/22 Bold**, matriz de estados por token,
  y props `block` y `loading` que antes no existían.
- Migrados **32 call sites**: 29 `outline` → `tertiary`, 3 `default` → `primary`. Los 4
  `secondary` de Button eran acciones genuinamente secundarias ("Save search", CTA alternativo),
  así que el cambio de azul sólido a outline azul es el correcto.
- `default` y `outline` se conservan como **alias deprecados** para no romper consumidores externos.
- `ghost`, `link` y `destructive` se marcan como extensiones fuera del set de Figma.
- Code Connect del botón reapuntado al component set real (`Buttons & Links` `1:4558`) con los
  valores de propiedad correctos. **Quedan 84 mappings** apuntando a El Captain DS.
- Showcase de `/design-system` actualizado con el set real, estados y `block`.

> El recuento inicial de "53 call sites" mezclaba Button y Badge. Los de Button eran 33;
> Badge no se ha tocado (conserva `secondary` ×16, `outline` ×2).

**Verificado:** `tsc`, `eslint` y `next build` en verde (75 páginas prerenderizadas), estilo
computado de las 3 variantes y los 4 tamaños comprobado en navegador, sin errores de consola.

> Durante la verificación apareció un `React.Children.only` real: con `asChild`, el `null` del
> spinner contaba como segundo hijo de `Slot` y rompía la BDP. Corregido separando las ramas
> `asChild` y `button`.

### ✅ Fase 3a — CTAs unificados (código)
- Nuevo primitivo [`TextLink`](../src/components/ui/text-link.tsx) para CTAs de texto. Sustituye a
  la clase suelta `.primary-text-link` (eliminada de `globals.css`), migrada en sus 4 usos.
- Spec triangulado con producción: **Blue/400, peso 500, sin subrayado**, 14 o 16px. El `13px` del
  prototipo era el único valor sin respaldo en ninguna de las tres fuentes.
- La variante `link` de Button comparte ahora los mismos tokens, y queda reservada a los casos que
  necesitan geometría de botón (área táctil, `block`, `onClick`); `TextLink` para navegación en línea.
- CTA del email en `saved-search-email.tsx` pasa a `buttonVariants({ size: "md" })`: estaba
  hardcodeado con `rounded-[12px]` y `text-[13px]`, ya desalineado del radio 8px.

### ✅ Fase 3b — tokens de El Captain unificados (Figma)
Renombrados **11** variables locales al naming del DS y añadidas **6** que faltaban. Los renombrados
preservan los bindings (Figma referencia por ID, no por nombre), así que ninguna pantalla se rompe.

| Antes (naming de producción) | Ahora (naming del DS) |
|---|---|
| `primary/chinese-blue` | `Midnight` |
| `primary/blue` | `Blue/400` |
| `secondary/malibu` · `background/malibu` | `Malibu/200` · `Malibu/400` |
| `secondary/malibu-base` · `secondary/malibu-strong` | `Malibu/500` · `Malibu/600` |
| `background/paper` | `Neutral/100` |
| `primary/white` · `background/black` | `Neutral/White` · `Neutral/Black` |
| `background/neutral` · `secondary/status-info` | `Status/Info/100` · `Status/Info/200` |

Añadidas: `Blue/500`, `Neutral/200`, `Neutral/300`, `Neutral/400`, `Neutral/500`, `Neutral/600`.

**Resultado:** El Captain expone ahora **31 primitivos con el naming del DS**, idénticos a la
librería Colors y a `globals.css`. Las tres fuentes coinciden en nombre y valor.

### Fase 3 — lo que queda, y por qué

**Bloqueado por API — requiere hacerlo en la app de Figma:**
- **Suscribir El Captain a la librería Colors.** `getAvailableLibraryVariableCollectionsAsync()`
  devuelve vacío porque la librería no está habilitada en el archivo, y habilitarla es una acción
  de UI que el Plugin API no expone. Hasta entonces El Captain seguirá teniendo una *copia* de los
  tokens en vez de consumirlos. Ahora al menos la copia está sincronizada en nombre y valor.
- **Mover `button_web` / `link_web` a El Captain.** El Plugin API no puede trasladar componentes
  publicados entre archivos conservando el vínculo de las instancias; hacerlo por script crearía
  duplicados y desconectaría instancias — justo lo contrario de unificar. Es copiar/pegar entre
  archivos y republicar, en la app.

**Code Connect está fuera de alcance en este plan:** `list_file_components_for_code_connect`
devuelve *"You need a Dev or Full seat on an Organization or Enterprise plan"*. Los 85 archivos
`.figma.tsx` del repo no se pueden publicar hoy, así que reapuntarlos es trabajo sin efecto hasta
que se resuelva el asiento.

**Pendiente y automatizable en otra ronda:**
- Deprecar las 23 variables legacy que quedan en El Captain (`wireframe/1…5`, `gray/*`,
  `primary/navy`, `secondary/tiffany-blue`…).
- Tres de ellas son **duplicados con valor distinto** de tokens del DS y hay que resolverlas a mano:
  `danger #eb5757` vs `Status/Error/200 #eb1400`, `success #30cf22` vs `Status/Success/200 #008a05`,
  y `secondary/blue #0141c6` vs `Blue/500 #0944c4` (el hover de producción). No las he tocado
  porque renombrarlas cambiaría su semántica en silencio.
- Parar los scripts `figma-generate-library` que regeneran el espejo `Button` de El Captain
  (se actualizó el 2026-08-09); si no, cualquier consolidación se deshace sola.

### Fase 4 — ordenar el resto de Figma
- `Colors` se queda como **única librería de variables**. Suscribir El Captain DS a ella.
- Renombrar `Grey/*` → `Neutral/*` en la página de especificación para que rótulo y variable coincidan.
- Borrar el component set espejo `24:2` de El Captain DS; mover/publicar el botón real desde
  Buttons & Links. Un solo Button publicado.
- Unificar las variables de tipografía a Inter (hoy Helvetica Neue en botones, Public Sans en headings).
- Actualizar la página de especificación de Colors, cuyos rótulos de Malibu están obsoletos.
- Corregir en producción las 6 derivas de §1.2 (grises azulados y status).
- Reapuntar los 85 mappings de Code Connect al componente correcto y a los valores de propiedad reales.
- Actualizar [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) y [docs/DESIGN_SOURCE.md](DESIGN_SOURCE.md) con la
  topología real de librerías.

---

## 7. Conflictos que siguen abiertos

Producción valida el **modelo** de botón de Figma (Primary sólido / Secondary outline azul), así que
la dirección está clara. Lo que las tres fuentes no resuelven entre sí:

| Punto | Figma | rightboat.com | Prototipo |
|---|---|---|---|
| Radio | **8px** | **6px** | **12px** |
| Hover de primary | `Blue/500` `#0944c4` | `secondary-blue` `#0141c6` | `bg-primary/90` |
| Peso del texto | 700 en todo | 600 primary / 700 secondary | 500 |
| Altura | 48 / 40 / 36 | 40 / 44 | 44 / 44 / 40 |

Ninguno se puede resolver leyendo las fuentes: hay que elegir. Se ha aplicado **Figma** (es el DS) en
las cuatro filas; queda pendiente decidir si producción se alinea o si alguna de sus decisiones
(radio 6px, hover `#0141c6`, primary a peso 600) debe ganar y volver a Figma.

**Además, hay call sites que se saltan los tamaños del DS con `className`** (`h-11` en la BDP,
`text-[13px]` en la nav). No son regresiones de esta ronda —ya estaban—, pero conviene limpiarlos
para que el tamaño lo defina siempre la prop `size`.

### Riesgos de la Fase 2
- Renombrar variantes toca **53 llamadas** (`secondary` ×22, `outline` ×31): commit propio y revisable.
- Cambiar el radio base afecta a todos los controles y tarjetas, no solo al botón.
- Borrar el espejo `24:2` rompe los 85 mappings hasta reapuntarlos: mismo PR.
