# Plan: Milestone 1 del manual web de ECC (esqueleto + nivel 1)

## Context
PRD: `/home/innono/Desktop/proyectos/.claude/prds/ecc-manual-web.prd.md`. ECC 2.2.3 trae 71 agentes, 311 skills, 97 comandos y hooks, y su documentación da por sentado un nivel avanzado. El usuario viene de CXO y quiere un manual local en español que lo lleve desde cero hasta orquestar con ECC.

Milestone 1 cubre: **el usuario abre el sitio en local y entiende los conceptos base de ECC**. Es un proyecto nuevo, separado de `cxo_web`. Decisiones del usuario: el mismo stack que `cxo_web`, y una estética parecida a Claude Code en modo oscuro (negros, naranjas y blancos).

## Ubicación y stack
- Carpeta nueva: `/home/innono/Desktop/proyectos/ecc_web/`.
- Stack igual que `cxo_web/package.json`: `@11ty/eleventy` 4.0.0-alpha.10, `@playwright/test` 1.64.1, `linkedom` 0.18.13, Node ≥ 22.15, ESM.
- Puertos: `npm run dev` en **4331** y e2e en **4332**, para que pueda funcionar a la vez que `cxo_web` (que usa 4321/4322).
- El código se escribe desde cero. De `cxo_web` solo se toman como **patrón**, sin copiar el contenido:
  - `cxo_web/eleventy.config.js`: passthrough de `src/assets`, `IdAttributePlugin`, Markdown con `html: false` y servidor en `127.0.0.1` sin live reload.
  - `cxo_web/test/site.test.js`: compila con `new Eleventy(...)` en un directorio temporal dentro de `.cache/`, parsea con linkedom y usa una plantilla de sonda de seguridad.
  - `cxo_web/playwright.config.js`: chromium, firefox, webkit y mobile, con `webServer` propio.

## Estructura
```
ecc_web/
  package.json, eleventy.config.js, playwright.config.js, README.md, .gitignore
  docs/prds/ecc-manual-web.prd.md     (copia del PRD)
  docs/plans/milestone-1.plan.md      (este plan)
  src/_data/site.json                 (título, eccVersion: "2.2.3", niveles y su estado)
  src/_includes/base.njk              (layout: skip link, cabecera, nav, pie con versión de ECC)
  src/_includes/navigation.njk        (índice lateral + menú móvil con <details>)
  src/_includes/guide.njk             (guía con "Continuar el recorrido" anterior/siguiente)
  src/assets/styles.css, favicon.svg
  src/index.njk                       (portada)
  src/nivel-1/que-es-ecc.md
  src/nivel-1/piezas.md
  src/nivel-1/como-se-relacionan.md
  src/nivel-1/comprobar.md
  test/site.test.js
  e2e/manual.spec.js
```

## Estética (modo oscuro permanente, estilo Claude Code)
- Tokens CSS: fondo negro `#0d0d0d`, superficies `#1a1a1a`/`#262626`, texto blanco `#f5f5f5`, texto secundario `#a3a3a3` y acento naranja de Claude Code (`#d97757` y una variante más clara para hover). Enlaces, foco, numeración de niveles y bordes de los bloques destacados van en naranja.
- Bloques de comando con aspecto de terminal: fondo negro y prompt `>` en naranja. Tipografía monoespaciada del sistema en el código y sans del sistema en el texto. Sin fuentes remotas ni CDN.
- Contraste AA comprobado para texto/fondo y naranja/fondo, foco visible y `prefers-reduced-motion` respetado.

## Contenido
Fuente de verdad: el plugin instalado en `~/.claude/plugins/cache/ecc/ecc/2.2.3/` (`README.md`, `AGENTS.md`, `COMMANDS-QUICK-REF.md`, `docs/COMMAND-AGENT-MAP.md`, `docs/PLAN-PRD-PATTERN.md`, `the-shortform-guide.md`). Cada afirmación sobre ECC debe poder comprobarse ahí. El pie de cada página muestra "Documentado para ECC 2.2.3" (mitiga el riesgo de desactualización del PRD).

1. **Portada (`/`)**: qué es este manual y para quién. Ruta de 4 niveles: el nivel 1 está disponible y los niveles 2–4 aparecen como "próximamente", sin enlace roto. Botón "Empezar desde cero".
2. **Qué es ECC (`/nivel-1/que-es-ecc/`)**: ECC como plugin de Claude Code; diferencia entre Claude Code y ECC; relación con CXO (CXO orquesta Codex y ECC extiende Claude Code); qué vas a poder hacer al terminar la ruta.
3. **Las piezas (`/nivel-1/piezas/`)**: agentes, skills, comandos, hooks, rules y MCP. Para cada pieza: qué es en una frase, una analogía, un ejemplo real de ECC 2.2.3 (p. ej. `ecc:code-reviewer`, `tdd-workflow`, `/plan-prd`, GateGuard) y cómo se reconoce en una sesión. Al final, un glosario.
4. **Cómo se relacionan (`/nivel-1/como-se-relacionan/`)**: diagrama en HTML/SVG inline, legible en el tema oscuro. Muestra comando → skill → agente(s), con los hooks alrededor de cada herramienta. Se recorre el caso real `/plan-prd` → PRD → `/plan`, el que el usuario ya ha vivido.
5. **Comprobar (`/nivel-1/comprobar/`)**: práctica guiada para confirmar que ECC está instalado (`/plugin`, `/ecc-guide`), encontrar un agente, una skill y un hook en tu sesión e interpretar un bloqueo de GateGuard. Acaba con una sección "Cuándo has terminado" con la autoevaluación del nivel 1.

## Pruebas (TDD: escribir las pruebas primero)
- `test/site.test.js` (node:test + linkedom):
  - existen las 5 rutas;
  - cada guía tiene un `h1` y la navegación "Continuar el recorrido" va en el orden correcto;
  - `piezas` define las 6 piezas como encabezados;
  - el pie muestra la versión de `site.json`;
  - los niveles 2–4 no enlazan a rutas inexistentes;
  - no se cargan recursos externos (sin `http` en `src`/`href` de scripts, estilos y fuentes);
  - la sonda de seguridad confirma que el Markdown no inyecta `<script>` ni `javascript:`, y que el título y la descripción se escapan.
- `e2e/manual.spec.js` (Playwright):
  - recorrido desde la portada pasando por "Empezar desde cero" hasta "Cuándo has terminado";
  - el skip link y el foco en `main`;
  - el menú móvil con teclado;
  - sin scroll horizontal en anchos de 320 a 1920 px;
  - el fondo calculado de `body` es oscuro y el color de los enlaces es naranja.

## Verificación de punta a punta
1. `cd ecc_web && npm ci && npm test && npx playwright install && npm run test:e2e`: todo en verde.
2. `npm run build`: `dist/` contiene solo el manual.
3. `npm run dev` y abrir http://localhost:4331, revisando a mano la portada y las 4 guías, en escritorio y en móvil, con Chrome DevTools (MCP) o el navegador.
4. Revisión con `ecc:code-reviewer`/`ecc:a11y-architect` antes de hacer commit. El commit se hace en una rama nueva (no en `main`) y solo con la aprobación del usuario.
5. Actualizar el estado del milestone 1 en el PRD (`pending` → `complete`, con el enlace al plan).
