# Manual web de ECC para principiantes

## Problem
ECC (Everything Claude Code) expone cientos de agentes, skills, comandos y hooks, y su documentación asume un nivel de comprensión avanzado. Un principiante que viene de CXO no tiene una ruta que lo lleve desde cero hasta entender y orquestar todas las capacidades de ECC. Sin esa ruta, usa solo una fracción de ECC, depende de preguntarle a Claude qué comando usar y no llega a orquestar flujos completos con autonomía.

## Evidence
- Experiencia directa del usuario principal (n=1): "ECC tiene un nivel de comprensión muy avanzado; quiero llegar al mismo nivel de comprensión pero orquestando desde el principio".
- Que el problema se repita en otros principiantes es una suposición pendiente de validar con 2–3 usuarios nuevos de ECC.
- Insuficiencia de lo existente (documentación del repo, `/ecc-guide`): suposición. Lo existente está en inglés, organizado por componente y no por tarea. TBD: validar comparando la resolución de 5 escenarios con la documentación actual frente al manual.

## Users
- **Primary**: desarrollador principiante hispanohablante que ya usa CXO, instala ECC en Claude Code y quiere entender y orquestar sus capacidades desde el primer día. Hoy es el propio autor.
- **Not for**: usuarios avanzados de ECC que buscan una referencia exhaustiva; lectores angloparlantes; público general en internet (el sitio es local).

## Hypothesis
Creemos que **un manual web progresivo en español, organizado como ruta de aprendizaje (de lo básico a la orquestación completa)**, hará que **las capacidades de ECC se entiendan** para **principiantes que vienen de CXO**.
Sabremos que acertamos cuando **el usuario completa un flujo orquestado de punta a punta (`/plan-prd` → `/plan` → TDD → review → PR) usando solo el manual, sin preguntarle a Claude qué comando usar**.

## Success Metrics
| Metric | Target | How measured |
|---|---|---|
| Flujo orquestado completo usando solo el manual | 1 flujo completo, 0 consultas a Claude sobre qué comando usar | Autoevaluación del usuario al terminar el nivel 4 |
| Elección correcta de comando por escenario | ≥ 8 de 10 escenarios | Batería de 10 escenarios ("quiero arreglar un bug", "quiero revisar un PR"…) resuelta con el índice por tarea |
| Tiempo para encontrar el comando adecuado | TBD — needs validation via prueba cronometrada en los 10 escenarios | Cronometraje manual |

## Scope
**MVP**: sitio web local, nuevo y hecho desde cero, solo en español, con:
- **Ruta de aprendizaje por niveles**:
  1. Conceptos: qué son un agente, una skill, un comando y un hook, y cómo se relacionan.
  2. Comandos esenciales: el conjunto mínimo para trabajar a diario.
  3. Flujos de trabajo: PRD → plan → TDD → review → commit/PR.
  4. Orquestación: comandos `orch-*`, multiagente y loops.
- **Índice por tarea**: "quiero hacer X → usa Y", con un buscador.
- El mismo enfoque de ayuda al principiante que el manual de CXO: explicaciones paso a paso y ejemplos concretos.

**Out of scope**
- Documentar todas las skills/agentes una por una: el MVP cubre la ruta y lo esencial, no un catálogo exhaustivo.
- Versión en inglés: el público objetivo es hispanohablante.
- Publicación en internet / hosting: el sitio es solo local.
- Ejecutar comandos de ECC desde la web: el manual enseña, no ejecuta.
- Cuentas de usuario y seguimiento del progreso en servidor: no hace falta para validar la hipótesis.
- Reutilizar o ampliar `cxo_web`: decisión explícita de empezar desde cero.

## Delivery Milestones
<!-- Status: pending | in-progress | complete -->

| # | Milestone | Outcome | Status | Plan |
|---|---|---|---|---|
| 1 | Esqueleto y nivel 1 | El usuario abre el sitio en local y entiende los conceptos base de ECC | complete | `ecc_web/docs/plans/milestone-1.plan.md` |
| 2 | Niveles 2 y 3 | El usuario conoce los comandos esenciales y sigue un flujo PRD → PR guiado | complete | `ecc_web/docs/plans/milestone-2.plan.md` |
| 3 | Nivel 4: orquestación | El usuario entiende y lanza flujos `orch-*` y multiagente | pending | — |
| 4 | Índice por tarea + buscador | El usuario encuentra el comando adecuado para una tarea sin recorrer la ruta | pending | — |
| 5 | Validación | Se ejecutan las métricas (flujo completo + 10 escenarios) y se registran los resultados | pending | — |

## Open Questions
- [x] ¿Cómo se mantiene el manual al día cuando ECC añade, renombra o depreca comandos y skills? — Resuelto (milestone 2): `test/ecc-surface.test.js` contrasta cada `/ecc:…`, `ecc:…` y «skill …» citados con el plugin de `site.eccVersion`; al actualizar ECC se cambia la versión y `npm test` señala lo que ya no existe. Las afirmaciones de comportamiento siguen requiriendo revisión manual.
- [x] ¿Qué conjunto exacto de comandos forma los "esenciales" del nivel 2? — Resuelto (milestone 2): selección basada en la Quick Decision Guide de ECC 2.2.3, ampliada con plan-prd, prp-commit, pr, aside y ecc-guide. Pendiente validar con el uso real del autor.
- [ ] ¿Hay que cubrir comandos que dependen de runtimes externos (p. ej. `multi-*`, que requiere ccg-workflow) o se dejan fuera del MVP?
- [ ] ¿Cómo se relaciona el manual con CXO: referencias cruzadas o independencia total?

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| ECC cambia rápido y el manual queda desactualizado | High | High | Anotar la versión de ECC documentada en cada página; resolver la pregunta abierta de mantenimiento antes del milestone 3 |
| El contenido reproduce la complejidad de la documentación original en lugar de simplificarla | Medium | High | Validar cada nivel con el criterio "¿lo entiende alguien que solo conoce CXO?" |
| Alcance inflado al intentar cubrir todas las skills | Medium | Medium | Mantener el "fuera de alcance"; el índice por tarea cubre solo los casos frecuentes |
| La hipótesis se valida solo con n=1 | High | Medium | Probar con 2–3 principiantes adicionales tras el milestone 5 |

---
*Status: DRAFT — requirements only. Implementation planning pending via /plan.*
