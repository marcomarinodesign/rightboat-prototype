# AI Conversational Search — briefing y prueba

Prototipo en este repo: campo de lenguaje natural en homepage y SRP, traducido a **filtros editables del listing live** (`/boats-for-sale`, split view). No hay un entorno de resultados separado.

## Objetivo de producto

Permitir buscar en Rightboat con una frase (“fishing boats with a cabin in Puget Sound”) en lugar de ir marcando filtros uno a uno. El éxito no es “parecer un chatbot”: es **más búsquedas completadas**, más engagement en SRP, más vistas de listing y más leads entre quienes empiezan por búsqueda conversacional.

Eso implica dos capas:

1. **Intent estructurado** — make, model, type, price, length, year, location, condition.
2. **Intent de uso / lifestyle** — cabin, family cruising, liveaboard, bluewater, day boat. Estos no siempre existen como campo de base de datos; hay que mostrarlos como chips y, cuando haga falta, buscar en descripción / specs.

## Analogía Booking.com (y por qué importa)

| Modelo | Usuario | Superficie | Riesgo en Rightboat |
|---|---|---|---|
| **Smart Filter** | Ya sabe qué quiere | Un campo → filtros visibles | Bajo. Encaja con el SRP actual. |
| **Trip Planner** | Aún está decidiendo | Conversación + recomendaciones | Alto si se lanza solo: otro producto, otro empty state, diluye el listing. |

Boat Trader / Zillow se parecen más al Smart Filter: bajo fricción, misma inventory, chips editables. El planner es un segundo paso, no el primero.

## Opciones

### A — Smart Filter híbrido (recomendada para esta prueba)

Un campo prominente en homepage (“What kind of boat are you looking for?”) y el mismo campo en el SRP. Submit → **SRP estándar** con:

- *We understood your search as:* chips editables
- Conteo de resultados
- Nota cuando algo viene de descripción, no de un filtro canónico
- Estado parcial si una parte no se interpreta
- Empty state con formas de ampliar la búsqueda

Debajo, el camino actual: *Or search by make, model, type and location*.

**Por qué:** cumple el brief, no crea un segundo listing, y se puede instrumentar (query, chips aceptados/rechazados, listing views).

### B — Planner conversacional (chat)

Hilo multi-turno (“¿pesca de altura o costa?”, “¿cuántas personas?”) con cards y luego deep-link al SRP.

**Por qué no ahora:** el usuario que ya tiene una frase clara recorre un túnel innecesario. Más diseño, más copy, más estados de error. Encaja *después* si el Smart Filter demuestra que hay intent que los filtros no cubren.

### C — Solo “AI Search” escondido en el SRP

Un toggle junto a la barra actual, sin cambiar la homepage.

**Por qué no sola:** el brief pide el campo **prominente en homepage**. Sin ese entry point no hay volumen para la métrica principal.

### D — LLM en el servidor desde el día uno

Misma UX que A, pero un modelo interpreta cada query.

**Por qué no en esta prueba:** el prototipo no tiene backend de ranking; un parser determinista cubre los ejemplos del brief, es testeable y se puede sustituir después por un endpoint sin cambiar la UI.

**Recomendación:** A ahora. B como fase 2 si los unmatched y los chips de lifestyle se usan de verdad. D cuando haya inventario y taxonomía reales.

## Contrato implementado (opción A)

| Estado | Comportamiento |
|---|---|
| Vacío | Placeholder rotativo + suggested searches cortas (chip) |
| Procesando | “Understanding your search…” al aterrizar en el SRP con `?q=` |
| Resultados | Chips *We understood* editables (lápiz → sidebar) y quitables; filtros del split ya aplicados |
| Parcial | Chips de lo entendido + pedido de refinar lo que no mapeó |
| Sin resultados | Acciones para ampliar (quitar precio, zona, lifestyle) + sugerencias |

URL: `/boats-for-sale?q=…`. El search clásico de homepage se traduce a la misma query. El parser vive en `src/lib/conversational-search/` y pinta `FiltersState` existente (`boatType`, precio, eslora, condition, location, más `intentTags` para lifestyle).

Limitación honesta: el matching lifestyle es por tags/descripción del mock, no por un modelo. Los ejemplos del brief tienen listings de apoyo en el dataset del prototipo.

## Métrica

Eventos mínimos a instrumentar más adelante (no en esta prueba): `conversational_search_submit`, `interpreted_chip_remove`, `interpreted_partial_shown`, `srp_listing_view` con `source=conversational`.
