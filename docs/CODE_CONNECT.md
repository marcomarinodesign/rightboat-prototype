# Figma Code Connect (Rightboat)

Code Connect enlaza componentes del archivo de Figma con la implementación en este repo para que **Dev Mode** muestre snippets reales (rutas e imports del código) en lugar de código autogenerado.

## Requisitos

- Cuenta y plan según [documentación Code Connect](https://developers.figma.com/docs/code-connect/) (p. ej. Organization / Enterprise donde aplique).
- [Token de acceso personal](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) con permisos para Code Connect (p. ej. **Code Connect: Write** y lectura de archivo).
- Los componentes que quieras enlazar deben estar publicados en una **librería** de equipo cuando Figma lo exija para el mapping.

## Configuración en este proyecto

- Config global: [`figma.config.json`](../figma.config.json) (`parser: react`, alias `@/*`, `include` con `src/**/*.figma.tsx` y `src/components/**/*.tsx` para que el CLI resuelva imports relativos del componente).
- Archivos de conexión: `*.figma.tsx` junto a los componentes (por ejemplo [`src/components/ui/button.figma.tsx`](../src/components/ui/button.figma.tsx)).
- Paquete: `@figma/code-connect` (devDependency). Tipos: `@figma/code-connect/figma-types` en `tsconfig.json`.

## Sustituir la URL del componente en Figma

Los archivos `*.figma.tsx` incluyen una URL con **`node-id` de marcador** hasta que enlaces el componente real:

1. En Figma: selecciona el **componente o component set** → clic derecho → **Copy link to selection**.
2. Sustituye la cadena URL en el `figma.connect(..., 'https://...', { ... })` correspondiente.
3. Ajusta los mapeos `figma.enum` / `figma.string` / etc. para que coincidan con los **nombres de propiedades** en Figma (pueden diferir de shadcn).

## Comandos útiles

Publicar mappings al archivo de Figma (requiere token):

```bash
export FIGMA_ACCESS_TOKEN=your_token
npm run figma:connect:publish
```

Validar localmente sin publicar:

```bash
npm run figma:connect:parse
```

Generar plantilla desde un enlace (en el directorio del componente):

```bash
npx @figma/code-connect@latest connect create "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/...?node-id=X-Y"
```

Más detalle: [React — Code Connect](https://developers.figma.com/docs/code-connect/react/), [configuración](https://developers.figma.com/docs/code-connect/api/config-file/).

## Referencia interna

En el repo, la guía orientada a MCP y mappings masivos está en [`skills/figma-generate-library/references/code-connect-setup.md`](../skills/figma-generate-library/references/code-connect-setup.md) (herramientas MCP vs CLI local de este documento).
