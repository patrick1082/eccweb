---
layout: guide.njk
title: Planificar antes de tocar código
description: Cómo convertir una idea en requisitos con /ecc:plan-prd y los requisitos en un plan aprobado con /ecc:plan.
number: "02"
time: 10 min
goal: Sabrás cuándo empezar por un PRD, cómo responder a sus preguntas y cómo aprobar o corregir un plan antes de que se escriba código.
toc:
  - { id: por-que-planificar-primero, title: Por qué planificar primero }
  - { id: ecc-plan-prd-que-y-por-que, title: "/ecc:plan-prd" }
  - { id: ecc-plan-como, title: "/ecc:plan" }
  - { id: aprobar-o-corregir-un-plan, title: Aprobar o corregir un plan }
  - { id: ecc-plan-canvas-revisar-en-el-navegador, title: "/ecc:plan-canvas" }
  - { id: cual-usar, title: ¿Cuál usar? }
---

## Por qué planificar primero

Uno de los cinco principios de ECC es **planificar antes de ejecutar**. Cuesta mucho menos corregir un plan que deshacer código. Por eso ECC separa dos documentos:

- el **PRD** dice **qué** hay que conseguir y **por qué**;
- el **plan** dice **cómo**: qué archivos, en qué orden y cómo se comprueba.

Si ya usas CXO, es la misma idea: requisitos primero, plan aprobado después y ejecución al final.

## /ecc:plan-prd: qué y por qué

Úsalo cuando la idea todavía es difusa o tiene varias entregas. Claude te guía en **cuatro fases** y **espera tu respuesta en cada una**:

1. **Encuadre**: reformula tu idea y pregunta quién tiene el problema, qué se observa, por qué no basta lo que existe y por qué ahora.
2. **Evidencia**: pide pruebas de que el problema es real. Si no las tienes, lo anota como *suposición pendiente de validar* en lugar de inventar.
3. **Decisión**: hipótesis medible, lo mínimo necesario (MVP), lo que queda fuera y las preguntas abiertas.
4. **Generación**: escribe el archivo `.claude/prds/{nombre}.prd.md`.

El PRD incluye una tabla de **entregas** (*Delivery Milestones*), cada una con su estado: `pending`, `in-progress` o `complete`. Esa tabla conecta con el siguiente comando.

```text
/ecc:plan-prd una web para aprender ECC desde cero
```

> El PRD **no contiene código ni nombres de archivos**. Si Claude empieza a hablar de librerías o estructura, eso pertenece al plan.

## /ecc:plan: cómo

`/ecc:plan` reformula los requisitos, identifica riesgos, divide el trabajo en fases y estima la complejidad. Después **se detiene y espera tu confirmación**: no escribe código hasta que lo apruebas. Trabaja en la propia conversación, sin delegar en agentes.

Acepta cuatro tipos de entrada:

| Escribes | Qué hace |
|---|---|
| `/ecc:plan .claude/prds/web.prd.md` | Elige la siguiente entrega `pending` del PRD, escribe `.claude/plans/{nombre}.plan.md` y marca esa entrega como `in-progress` |
| `/ecc:plan notas.md` | Usa el archivo como contexto y presenta el plan en la conversación |
| `/ecc:plan añadir modo oscuro a la web` | Presenta el plan en la conversación a partir de tu descripción |
| `/ecc:plan` | Te pregunta qué quieres planificar |

El plan sigue las convenciones de tu proyecto. Antes de escribirlo, Claude busca en el código ejemplos de nombres, gestión de errores y pruebas para imitarlos en lugar de inventar.

## Aprobar o corregir un plan

Cuando el plan esté listo, responde con una de estas fórmulas:

- **Aprobar**: `sí` o `adelante`.
- **Cambiar algo**: `modify: quita la fase 3 y usa SQLite en lugar de Postgres`.
- **Otro enfoque**: `different approach: hazlo como una página estática`.
- **Reordenar**: `haz primero la fase 2`.

Mientras no apruebes, no se toca el código. Esto es lo que te da el control.

## /ecc:plan-canvas: revisar en el navegador

Si prefieres leer el plan con calma, `/ecc:plan-canvas .claude/plans/{nombre}.plan.md` lo abre en el navegador. Allí puedes **anotar** frases concretas y pulsar **Approve plan** (aprobar) o **Request changes** (pedir cambios). Tu decisión llega a Claude como la confirmación del plan.

## ¿Cuál usar?

| Situación | Empieza por |
|---|---|
| Idea nueva, con varias entregas o dudas sobre el problema | `/ecc:plan-prd` y luego `/ecc:plan` con la ruta del PRD |
| Tarea clara y acotada (un cambio, una funcionalidad pequeña) | `/ecc:plan` con una descripción |
| Plan largo que quieres comentar línea a línea | `/ecc:plan-canvas` sobre el archivo del plan |

Recuerda la diferencia del nivel 1: `/plan` sin prefijo puede activar el modo plan integrado de Claude Code. Para usar el de ECC, escribe `/ecc:plan`.
