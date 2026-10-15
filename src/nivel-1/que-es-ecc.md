---
layout: guide.njk
title: Qué es ECC
description: Qué añade ECC a Claude Code, por qué parece tan grande y cómo encaja con lo que ya sabes de CXO.
number: "01"
time: 6 min
goal: Sabrás explicar con tus palabras qué es ECC, qué no es y qué vas a aprender en cada nivel de este manual.
toc:
  - { id: la-idea-en-una-frase, title: La idea en una frase }
  - { id: claude-code-y-ecc-no-son-lo-mismo, title: Claude Code y ECC no son lo mismo }
  - { id: por-que-parece-tan-grande, title: Por qué parece tan grande }
  - { id: los-cinco-principios-de-ecc, title: Los cinco principios de ECC }
  - { id: si-vienes-de-cxo, title: Si vienes de CXO }
  - { id: lo-que-vas-a-poder-hacer, title: Lo que vas a poder hacer }
---

## La idea en una frase

**ECC (Everything Claude Code) es un plugin que convierte Claude Code en un equipo de trabajo organizado.** En lugar de un solo asistente que lo hace todo, tienes especialistas (agentes), procedimientos escritos (skills), atajos (comandos) y vigilantes automáticos (hooks) que trabajan juntos.

Piensa en Claude Code como un taller con un mecánico muy capaz. ECC le añade al taller un manual de procedimientos, especialistas para cada tipo de avería y un supervisor que revisa cada paso antes de darlo por bueno.

## Claude Code y ECC no son lo mismo

| | Claude Code | ECC |
|---|---|---|
| Qué es | La herramienta de Anthropic para trabajar con Claude en tu terminal | Un plugin de código abierto que se instala dentro de Claude Code |
| Qué aporta | Leer y editar archivos, ejecutar comandos, conversar | Flujos de trabajo, especialistas y controles de calidad ya preparados |
| Quién lo mantiene | Anthropic | La comunidad del proyecto ECC (licencia MIT) |
| Cómo lo reconoces | Los comandos integrados, como `/help` o `/plugin` | Todo lo que lleva el prefijo `ecc:`, como `ecc:code-reviewer` |

Sin ECC, Claude Code funciona igual. ECC no sustituye nada: **añade capas encima**. Por eso, cuando en tu sesión veas `ecc:` delante de un nombre, sabrás que esa pieza viene del plugin.

## Por qué parece tan grande

La versión 2.2.3 declara **71 agentes, 311 skills y 97 comandos** (atajos heredados que se mantienen por compatibilidad), además de hooks, rules y configuraciones de servidores MCP. Es normal sentirse perdido al verlo por primera vez.

La buena noticia es que **no necesitas conocerlo todo**. Muchas piezas son especialistas para lenguajes concretos (Go, Rust, Kotlin, Python…) o para dominios muy específicos (redes, sanidad, marketing). En tu día a día usarás un núcleo pequeño, y este manual empieza justo por ahí.

## Los cinco principios de ECC

Todo ECC gira alrededor de cinco ideas. Si las entiendes, entenderás por qué los comandos se comportan como lo hacen:

1. **Primero los agentes.** Las tareas especializadas se delegan en un agente experto, por ejemplo uno que solo revisa código.
2. **Primero las pruebas.** Antes de escribir código se escribe la prueba que debe superar (TDD).
3. **Primero la seguridad.** Nada de secretos en el código y toda entrada externa se valida.
4. **Inmutabilidad.** Se crean objetos nuevos en lugar de modificar los existentes.
5. **Planificar antes de ejecutar.** Las tareas complejas empiezan con un plan que tú apruebas.

El último principio explica algo que verás a menudo: **muchos comandos de ECC se detienen y esperan tu confirmación** antes de tocar el código. No es un error; es el diseño.

## Si vienes de CXO

Ya conoces la idea de orquestar: dividir un trabajo en pasos, asignar cada paso a un rol y revisar el resultado antes de integrarlo. ECC aplica esa misma idea, pero **dentro de Claude Code** en lugar de coordinar Codex desde la terminal.

| Lo que conoces de CXO | Lo que encontrarás en ECC |
|---|---|
| Roles como planificador, implementador o revisor | Agentes como `ecc:planner`, `ecc:tdd-guide` o `ecc:code-reviewer` |
| Un PRD y un plan antes de ejecutar | Los comandos `/plan-prd` y `/plan` |
| Revisión antes de integrar | Comandos de revisión y hooks que bloquean acciones arriesgadas |

No necesitas CXO para seguir este manual, pero si lo usas, muchas cosas te resultarán familiares.

## Lo que vas a poder hacer

Al terminar la ruta completa sabrás llevar una idea hasta un PR revisado usando solo ECC:

- **Nivel 1 · Conceptos** (este nivel): reconocer cada pieza y entender cómo colaboran.
- **Nivel 2 · Comandos esenciales**: el puñado de comandos que usarás a diario.
- **Nivel 3 · Flujos de trabajo**: de la idea al PR pasando por PRD, plan, TDD y revisión.
- **Nivel 4 · Orquestación**: flujos `orch-*`, varios agentes en paralelo y loops autónomos.

En la siguiente guía conocerás las seis piezas una por una.
