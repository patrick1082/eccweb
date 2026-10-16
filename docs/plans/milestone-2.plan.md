# Plan: Manual web de ECC — Milestone 2 (niveles 2 y 3)

**Source PRD**: `/home/innono/Desktop/proyectos/.claude/prds/ecc-manual-web.prd.md`
**Selected Milestone**: 2 · Niveles 2 y 3 — «El usuario conoce los comandos esenciales y sigue un flujo PRD → PR guiado»
**Complexity**: Medium (no hay arquitectura nueva: 10 guías de contenido, ampliar las pruebas y un comprobador de piezas)

## Context
El milestone 1 ya está fusionado en `ecc_web/main` (commit `8d81a17`). El sitio tiene la portada y las 4 guías del nivel 1, y los niveles 2–4 aparecen como «Próximamente».

El milestone 2 publica el **nivel 2 (comandos esenciales)** y el **nivel 3 (flujos de trabajo)**. Así el usuario podrá recorrer un flujo PRD → plan → TDD → revisión → commit/PR guiado por el manual, que es la métrica principal del PRD. También resuelve dos preguntas abiertas del PRD:
- **Qué comandos son «esenciales»**: se toman de la *Quick Decision Guide* oficial (`COMMANDS-QUICK-REF.md` de ECC 2.2.3), no de una lista inventada.
- **Cómo se mantiene el manual al día**: se añade una prueba que contrasta cada `/ecc:…` y cada `ecc:…` citados en el manual con el plugin instalado.

## Patterns to Mirror
| Category | Source | Pattern |
|---|---|---|
| Datos de navegación | `ecc_web/src/_data/site.json` | Niveles con `status: disponible / proximamente` y `guides[]` (`number`, `title`, `url`, `detail`, `time`) |
| Recorrido | `ecc_web/eleventy.config.js` (`availableGuides`, `pathNeighbors`, `guideLevel`) | Funciones puras exportadas, probadas por separado y expuestas como filtros |
| Guía Markdown | `ecc_web/src/nivel-1/piezas.md` | Front matter con `layout: guide.njk`, `title`, `description`, `number`, `time`, `goal` y `toc` (ids = slug del h2) |
| Guía con HTML/SVG | `ecc_web/src/nivel-1/como-se-relacionan.njk` | `.njk` cuando hace falta HTML (el Markdown tiene `html: false`) |
| Práctica | `ecc_web/src/nivel-1/comprobar.md` | Carpeta `~/practica-ecc`, bloques ```` ```text ```` (sesión) y ```` ```sh ```` (terminal), tabla «Si algo no sale» y «Cuándo has terminado» con una lista |
| Pruebas | `ecc_web/test/site.test.js`, `ecc_web/e2e/manual.spec.js` | Compilar en `.cache/`, parsear con linkedom y escribir las aserciones en español como frases de comportamiento |

## Contenido (fuente de verdad: `~/.claude/plugins/cache/ecc/ecc/2.2.3/`)
Ya he comprobado que existen todas las piezas citadas. Comandos: `plan`, `plan-prd`, `plan-canvas`, `code-review`, `review-pr`, `build-fix`, `test-coverage`, `checkpoint`, `prp-commit`, `pr`, `save-session`, `resume-session`, `aside`, `learn-eval` y `ecc-guide`. Skills: `tdd-workflow`, `verification-loop` y `context-budget`. `/tdd` y `/verify` están retirados en favor de skills, y el manual lo dirá.

### Nivel 2 · Comandos esenciales (`/nivel-2/…`)
1. **`elegir/` Elegir el comando adecuado**: la tabla «situación → comando» de la Quick Decision Guide traducida, cómo leer las descripciones al escribir `/ecc:`, el prefijo `ecc:`, `/ecc:aside` para preguntas al margen y comandos retirados frente a skills.
2. **`planificar/` Planificar antes de tocar código**: `/ecc:plan-prd` (fases y archivo en `.claude/prds/`), `/ecc:plan` (en modo PRD escribe `.claude/plans/{nombre}.plan.md` y marca el milestone `in-progress`), `/ecc:plan-canvas` y la diferencia con el modo plan integrado.
3. **`construir-y-probar/` Construir y probar**: la skill `tdd-workflow` (rojo → verde → refactor), `/ecc:build-fix`, `/ecc:test-coverage` y `/ecc:checkpoint` / `verification-loop`.
4. **`revisar-y-entregar/` Revisar y entregar**: `/ecc:code-review` (cambios locales o un PR), `/ecc:review-pr` (varios agentes), `/ecc:prp-commit` (commit descrito en lenguaje natural) y `/ecc:pr` (necesita `gh` y un remoto de GitHub).
5. **`escenarios/` Práctica: 10 escenarios**: diez situaciones reales («la compilación falla», «quiero retomar mañana», etc.). Cada una es un `<details>` con la respuesta, así que no hace falta JavaScript. Incluye `/ecc:save-session`, `/ecc:resume-session` y `/ecc:learn-eval`. Termina con «Cuándo has terminado» (≥ 8/10, la métrica del PRD).

### Nivel 3 · Flujos de trabajo (`/nivel-3/…`)
1. **`el-flujo-completo/` El flujo completo**: diagrama SVG PRD → plan → TDD → revisión → commit → PR, qué controla cada puerta, quién decide (tú o Claude) y su equivalente en CXO.
2. **`de-la-idea-al-plan/` De la idea al plan** (práctica guiada): en `~/practica-ecc` se crea un proyecto Node mínimo, «contador de palabras» con `node:test`. Escribes `/ecc:plan-prd` con respuestas de ejemplo, luego `/ecc:plan .claude/prds/…prd.md` y apruebas el plan.
3. **`implementar-con-tdd/` Implementar con TDD**: `tdd-workflow` sobre el plan, leer el rojo y el verde, qué hacer si GateGuard bloquea y `/ecc:build-fix` si algo no compila.
4. **`revisar-y-entregar/` Revisar, hacer commit y entregar**: `/ecc:code-review`, corregir los hallazgos, rama nueva, `/ecc:prp-commit`, merge local y, como opción, `/ecc:pr` si hay GitHub. Termina con «Cuándo has terminado»: el flujo completo sin preguntar a Claude qué comando usar (métrica principal del PRD).
5. **`otros-caminos/` Otros caminos**: arreglar un bug (primero una prueba que lo reproduzca), compilación rota, retomar al día siguiente y una idea pequeña sin PRD (solo `/ecc:plan`).

## Files to Change
| File | Action | Why |
|---|---|---|
| `ecc_web/src/_data/site.json` | UPDATE | Niveles 2 y 3 pasan a `disponible`, con sus guías |
| `ecc_web/eleventy.config.js` | UPDATE | `pathNeighbors` etiqueta como «Siguiente nivel» el salto entre niveles y como «Fin de lo publicado» el final |
| `ecc_web/src/nivel-2/*.md` (5) | CREATE | Guías del nivel 2 |
| `ecc_web/src/nivel-3/*.md` y `el-flujo-completo.njk` | CREATE | Guías del nivel 3 (`.njk` para el diagrama) |
| `ecc_web/src/assets/styles.css` | UPDATE | Estilo de `<details>` para los escenarios (resumen naranja, foco visible) y reutilizar `.diagram` |
| `ecc_web/src/nivel-1/comprobar.md` | UPDATE | El cierre ya no dice «llegará en el próximo hito»: enlaza al nivel 2 |
| `ecc_web/test/site.test.js` | UPDATE | Rutas de los 3 niveles; recorrido entre niveles; solo el nivel 4 «Próximamente»; ≥ 10 escenarios con respuesta; última guía de cada nivel con «Cuándo has terminado» |
| `ecc_web/test/ecc-surface.test.js` | CREATE | Contrasta cada `/ecc:x` (debe existir `commands/x.md` o `skills/x/`) y cada `ecc:x` (`agents/x.md` o `skills/x/`) citados en `src/` con el plugin de `site.eccVersion`. Se omite con un aviso si el plugin no está instalado |
| `ecc_web/e2e/manual.spec.js` | UPDATE | Recorrido nivel 1 → 2 → 3, abrir un escenario con el teclado y comprobar el desbordamiento en todas las rutas (sacadas de `site.json`) |
| `ecc_web/README.md`, `docs/plans/milestone-2.plan.md` | UPDATE / CREATE | Contenido disponible y copia de este plan |
| `.claude/prds/ecc-manual-web.prd.md` (+ copia en `ecc_web/docs/prds/`) | UPDATE | Milestone 2: `in-progress` al empezar, `complete` al acabar. Se marcan resueltas las preguntas abiertas sobre los «esenciales» y el mantenimiento |

## Tasks
### Task 0: Preparación
- Rama `feat/niveles-2-3` en `ecc_web`. Guardar este plan en `.claude/plans/ecc-manual-web.plan.md` y en `ecc_web/docs/plans/milestone-2.plan.md`. Fila 2 del PRD → `in-progress`.

### Task 1: Pruebas primero (RED)
- **Action**: ampliar `site.test.js`, crear `ecc-surface.test.js` y ampliar el e2e.
- **Mirror**: el estilo de `test/site.test.js`.
- **Validate**: `npm test` falla en las rutas nuevas y en el recorrido.

### Task 2: Datos y recorrido
- **Action**: actualizar `site.json` y las etiquetas de `pathNeighbors`.
- **Validate**: las pruebas unitarias del recorrido pasan.

### Task 3: Nivel 2 (5 guías) y Task 4: Nivel 3 (5 guías)
- **Action**: escribir el contenido, citando solo piezas que existen en 2.2.3.
- **Validate**: `npm test` en verde, incluido `ecc-surface`.

### Task 5: Estilos, README y enlace desde el nivel 1
- **Validate**: e2e en chromium, firefox y mobile, más revisión visual con capturas.

### Task 6: Revisión y cierre
- **Action**: `ecc:code-reviewer` contrastando el contenido con el plugin; corregir lo que encuentre; PRD → `complete`. Commit y merge en `main` solo cuando lo pidas.

## Validation
```bash
cd ecc_web
npm test                                                        # estructura + contraste con el plugin
npx playwright test --project=chromium --project=firefox --project=mobile
npm run build && ls dist/nivel-2 dist/nivel-3
```

## Risks
| Risk | Likelihood | Mitigation |
|---|---|---|
| Describir mal qué hace un comando (como pasó con `plan-prd` en el milestone 1) | Medium | Leer el `.md` de cada comando o skill antes de redactarlo, la prueba `ecc-surface` y una revisión enfocada en los hechos |
| La práctica del nivel 3 no se comporta igual en tu sesión (las salidas de Claude varían) | Medium | Describir señales y archivos esperados, no salidas literales, y añadir la tabla «Si algo no sale» |
| `/ecc:pr` necesita GitHub y `gh` | High | Marcarlo como opcional; el flujo se completa con merge local |
| La barra lateral se alarga con 14 guías | Low | Comprobarlo en la revisión visual; plegar por nivel si molesta |

## Acceptance
- [ ] Niveles 2 y 3 publicados (10 guías) y solo el nivel 4 como «Próximamente»
- [ ] `npm test` y e2e (chromium, firefox y mobile) en verde
- [ ] Cada `/ecc:…` y `ecc:…` citados existen en ECC 2.2.3
- [ ] PRD actualizado (milestone 2 y preguntas abiertas resueltas)
