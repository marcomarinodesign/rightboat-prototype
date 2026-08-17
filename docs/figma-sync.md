# Figma ↔ Code Sync

**Figma file**: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
**File key**: `VOCH4pGubqSYza7CbL30c7`

---

## Code → Figma (publicar cambios del prototipo a Figma Dev Mode)

```bash
cd rightboat-prototype
export FIGMA_ACCESS_TOKEN=your_personal_access_token
npm run figma:connect:publish
```

O con el token inline:

```bash
npm run figma:connect:publish -- --token your_personal_access_token
```

### Cuándo ejecutarlo

- Después de crear o modificar un componente que tenga archivo `.figma.tsx`.
- Después de cambiar props, variantes o ejemplos de uso.
- Después de añadir un nuevo componente al design system.
- Después de conectar un nodo pendiente (ver `FIGMA_NODES_NEEDED.md`).

### Resultado esperado

```
Publishing to Figma...
✔ Published 6 connections to El-Captain-DS
```

Si hay errores de nodo no encontrado (`Node not found`), el nodo aún no existe en Figma.
Consulta `FIGMA_NODES_NEEDED.md` para crearlo y luego vuelve a publicar.

---

## Figma → Code (aplicar cambios de diseño al código)

1. El diseñador edita el componente en Figma (colores, espaciado, tipografía, estructura).
2. Si hay cambios en **design tokens** (variables de Figma):
   - Exporta las variables actualizadas desde Figma (Dev Mode → Variables → Export).
   - Actualiza los valores en `src/app/globals.css` (bloque `:root`) para mantener la paridad.
3. Para **cambios estructurales** (props nuevas, variantes añadidas):
   - El diseñador documenta los cambios en el frame de Figma (anotaciones o description del componente).
   - Actualiza el archivo `.figma.tsx` correspondiente con las nuevas props (`figma.enum`, `figma.string`, etc.).
   - Vuelve a publicar: `npm run figma:connect:publish`.
4. Para cambios visuales que requieren código:
   - El desarrollador implementa los cambios en el `.tsx` del componente siguiendo las clases y tokens del sistema.
   - Referencia: `DESIGN_SYSTEM.md` y `.cursor/rules/figma-design-system.mdc`.

---

## Archivos Code Connect en este proyecto

| Archivo `.figma.tsx`                                                          | Componente                  | Estado Figma                        |
|-------------------------------------------------------------------------------|-----------------------------|-------------------------------------|
| `src/components/ui/button.figma.tsx`                                          | `Button`                    | Pendiente de enlazar a nodo real    |
| `src/components/patterns/listing-card.figma.tsx`                              | `ListingCard`               | Pendiente de enlazar a nodo real    |
| `src/components/boats/boat-card.figma.tsx`                                    | `BoatCard`                  | Pendiente — ver `FIGMA_NODES_NEEDED.md` |
| `src/components/boats/bdp/bdp-inactive-banner.figma.tsx`                      | `BdpInactiveBanner`         | Pendiente — ver `FIGMA_NODES_NEEDED.md` |
| `src/components/boats/bdp/bdp-detail-page.figma.tsx`                          | BDP / Active (composición)  | Pendiente — ver `FIGMA_NODES_NEEDED.md` |
| `src/components/boats/bdp/bdp-detail-page-inactive.figma.tsx`                 | BDP / Inactive (composición)| Pendiente — ver `FIGMA_NODES_NEEDED.md` |

**Nodos a crear en Figma**: ver [`FIGMA_NODES_NEEDED.md`](../FIGMA_NODES_NEEDED.md)

---

## Flujo completo para completar una conexión pendiente

```
1. Abrir El-Captain-DS en Figma
2. Crear el componente o frame según las instrucciones de FIGMA_NODES_NEEDED.md
3. Seleccionar el nodo → clic derecho → "Copy link to selection"
   (el link tiene el formato: ?node-id=XX-YY)
4. Abrir el .figma.tsx correspondiente
5. Reemplazar la URL placeholder (?node-id=1-1) con el link copiado
6. Si el componente tiene variantes/props en Figma, añadir los figma.enum / figma.string
7. npm run figma:connect:publish
8. En Figma Dev Mode: seleccionar el componente → verificar que aparece el snippet de código
```

---

## Validar sin publicar (parse local)

```bash
npm run figma:connect:parse
```

Genera un JSON con todos los snippets que se publicarían. Útil para revisar antes de publicar.

---

## Token de acceso personal

1. Figma → menú usuario → Settings → Security → **Personal access tokens**
2. Crear token con scope: **Code Connect: Write** + lectura del archivo
3. Guardar en variable de entorno local (nunca commitear):
   ```bash
   export FIGMA_ACCESS_TOKEN=figd_xxxxxxxxxxxx
   ```

---

## Mobile Overview (402×874)

Frames en la página [Mobile Overview](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=333-2055) enlazan la versión mobile del SRP (`/boats-for-sale`). Split view ganó el experimento de Q2 y es el listing live; en mobile el drawer se mantiene.

### Preview states (`figmaPreview` query param)

| Valor | Uso |
|-------|-----|
| `default` | Listing cerrado |
| `filters-open` | Bottom sheet filtros |
| `active-filters` | Chips + badge en Filters |
| `empty` | Sin resultados |
| `sort-open` | Dropdown sort abierto |
| `filters-scrolled` | Drawer con scroll en Location/Price |
| `save-search-toast` | Toast Sonner al montar |
| `marketing-footer` | Scroll a newsletter / popular links |

Cuando `figmaPreview` está presente, el layout se fuerza a mobile (`previewMode="mobile"`) para capturas y Code Connect.

### Captura html-to-design

```bash
npm run dev   # localhost:3000

# Preset web SRP mobile (402×874, selector body)
node scripts/figma-local-capture.cjs <captureId> srp-mobile active-filters

# Batch (requiere 7 captureIds de generate_figma_design)
node scripts/figma-srp-mobile-batch-capture.cjs <id1> ... <id7>
```

Code Connect mobile: `boats-for-sale-listing-mobile.figma.tsx`, `filters-drawer.figma.tsx`, `boats-for-sale-page-mobile.figma.tsx`.

Ver tabla completa en [`FIGMA_NODES_NEEDED.md`](../FIGMA_NODES_NEEDED.md#mobile-overview--srp-split-402874).

---

## Referencias

- [Code Connect — React](https://developers.figma.com/docs/code-connect/react/)
- [Configuración figma.config.json](https://developers.figma.com/docs/code-connect/api/config-file/)
- [`figma.config.json`](../figma.config.json) — config del proyecto
- [`FIGMA_NODES_NEEDED.md`](../FIGMA_NODES_NEEDED.md) — nodos pendientes de crear en Figma
- [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md) — tokens y APIs de componentes
- [`docs/CODE_CONNECT.md`](CODE_CONNECT.md) — guía técnica detallada
