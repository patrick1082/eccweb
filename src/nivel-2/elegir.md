---
layout: guide.njk
title: Elegir el comando adecuado
description: Un mapa de situaciones habituales y el comando o la skill de ECC que resuelve cada una.
number: "01"
time: 8 min
goal: Sabrás qué comando usar en las situaciones más habituales y cómo averiguarlo tú solo cuando dudes.
toc:
  - { id: no-memorices-reconoce, title: "No memorices: reconoce" }
  - { id: el-mapa-de-situaciones, title: El mapa de situaciones }
  - { id: como-leer-la-lista-de-comandos, title: Cómo leer la lista de comandos }
  - { id: comandos-retirados-y-skills, title: Comandos retirados y skills }
  - { id: cuando-sigues-sin-saberlo, title: Cuando sigues sin saberlo }
---

## No memorices: reconoce

ECC 2.2.3 trae casi cien comandos, pero en el día a día **una docena cubre casi todo**. La selección es nuestra, pero parte de la guía rápida de decisiones del propio ECC (*Quick Decision Guide*), ampliada con los comandos del flujo de requisitos, commit y entrega.

El objetivo de este nivel no es aprenderte nombres. Es que, ante una situación, **reconozcas qué tipo de ayuda necesitas**: planificar, construir, revisar, entregar o gestionar la sesión.

## El mapa de situaciones

| Situación | Usa | Qué hace |
|---|---|---|
| Tengo una idea y quiero definir bien qué construir | `/ecc:plan-prd` | Te hace preguntas y escribe un documento de requisitos (PRD) |
| Voy a empezar una funcionalidad | `/ecc:plan` | Escribe un plan paso a paso y **espera tu confirmación** |
| Toca escribir el código | skill `tdd-workflow` | Primero la prueba que falla, luego el código mínimo, luego mejorar |
| La compilación o los tipos fallan | `/ecc:build-fix` | Arregla los errores uno a uno con cambios mínimos |
| Acabo de escribir código | `/ecc:code-review` | Revisa los cambios y clasifica los problemas por gravedad |
| Quiero hacer commit | `/ecc:prp-commit` | Prepara y hace el commit a partir de lo que describes con tus palabras |
| Quiero abrir un pull request | `/ecc:pr` | Sube la rama y crea el PR en GitHub |
| Me surge una duda que no tiene que ver con la tarea | `/ecc:aside` | Responde y vuelve a la tarea sin perder el hilo |
| La sesión está a punto de terminar | `/ecc:save-session` | Guarda el estado del trabajo para retomarlo después |
| Vuelvo al día siguiente | `/ecc:resume-session` | Carga la última sesión guardada y sigue donde lo dejaste |
| He aprendido algo que quiero conservar | `/ecc:learn-eval` | Extrae lo aprendido, lo evalúa y lo guarda en el sitio adecuado |
| No sé qué pieza de ECC existe para algo | `/ecc:ecc-guide` | Te orienta consultando los archivos reales de ECC |

Las tres guías siguientes explican estos comandos agrupados por momento: **planificar**, **construir y probar**, y **revisar y entregar**.

## Cómo leer la lista de comandos

Cuando escribes `/ecc:` en Claude Code, cada sugerencia muestra una **descripción corta**. Aprende a leerla, porque a menudo te dice también cuándo **no** usar ese comando.

Por ejemplo, la descripción de `/ecc:code-review` dice, en resumen: «para una revisión con varios agentes usa `/review-pr`; para la revisión verificada de forma adversarial usa `/orch-review`». En una sola línea tienes tres opciones y cuándo elegir cada una.

Un truco: si dudas entre dos comandos, escribe `/ecc:` seguido de una palabra clave (`review`, `plan`, `test`) y compara sus descripciones.

## Comandos retirados y skills

Algunos comandos antiguos se retiraron y su trabajo pasó a una skill. Si ves estos nombres en tutoriales viejos, usa la skill:

| Antes | Ahora |
|---|---|
| `/tdd` | skill `tdd-workflow` |
| `/verify` | skill `verification-loop` |
| `/e2e` | skill `e2e-testing` |
| `/docs` | skill `documentation-lookup` |

Las skills también se invocan escribiendo su nombre con barra, por ejemplo `/ecc:tdd-workflow`. Claude también las carga solo cuando la tarea encaja con su descripción.

## Cuando sigues sin saberlo

Tienes dos salidas que no rompen tu trabajo:

- `/ecc:ecc-guide ¿qué uso para…?` responde consultando las piezas reales de ECC.
- `/ecc:aside ¿qué comando uso para…?` responde **sin desviar la tarea en curso**. Es útil a mitad de un flujo.

En la práctica de este nivel comprobarás que ya no las necesitas para los casos habituales.
