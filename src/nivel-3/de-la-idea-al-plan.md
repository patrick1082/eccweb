---
layout: guide.njk
title: De la idea al plan
description: "Práctica guiada, etapas 1 y 2: prepara un proyecto pequeño, escribe su PRD con /ecc:plan-prd y aprueba un plan con /ecc:plan."
number: "02"
time: 20 min
goal: Tendrás un PRD y un plan aprobado para un proyecto real, escritos por ECC a partir de tus respuestas.
toc:
  - { id: el-proyecto-de-practica, title: El proyecto de práctica }
  - { id: 1-prepara-la-carpeta, title: 1. Prepara la carpeta }
  - { id: 2-escribe-el-prd, title: 2. Escribe el PRD }
  - { id: 3-revisa-el-prd, title: 3. Revisa el PRD }
  - { id: 4-pide-el-plan, title: 4. Pide el plan }
  - { id: 5-aprueba-sin-implementar-todavia, title: 5. Aprueba el plan }
  - { id: si-algo-no-sale-como-esperabas, title: Si algo falla }
---

## El proyecto de práctica

Vas a construir **frecuencias**: un programa que recibe un texto y devuelve las palabras que más se repiten. Por ejemplo, para «el gato y el perro y el ratón» devolvería `el` (3 veces) e `y` (2 veces).

Es lo bastante pequeño para terminarlo en una hora y lo bastante real para que aparezcan decisiones de verdad: ¿cuentan igual «Gato» y «gato»? ¿Y «ratón» y «raton»?

Necesitas **Node.js 22 o superior** y **git**. No hace falta saber programar en JavaScript: Claude escribe el código y tú diriges.

## 1. Prepara la carpeta

En una terminal, crea el proyecto dentro de la carpeta de prácticas del nivel 1:

```sh
mkdir -p ~/practica-ecc/frecuencias
cd ~/practica-ecc/frecuencias
git init -b main
npm init -y
npm pkg set scripts.test="node --test"
npm pkg set scripts.test:coverage="node --test --experimental-test-coverage"
git add -A
git commit -m "chore: proyecto inicial"
```

La opción `-b main` hace que la rama principal se llame `main` en cualquier equipo; las guías siguientes la usan con ese nombre. El script `test:coverage` lo usará la skill de TDD para medir la cobertura.

Comprueba que todo está en orden:

```sh
npm test
```

Verás que no hay pruebas todavía (`tests 0`). Es normal. Ahora abre Claude Code **en esta carpeta**:

```sh
claude
```

## 2. Escribe el PRD

En la sesión de Claude Code escribe:

```text
/ecc:plan-prd programa que recibe un texto y devuelve las N palabras más frecuentes
```

Claude reformulará la idea y te hará preguntas por fases. **Responde con tus palabras**. Si te bloqueas, estas respuestas de ejemplo sirven:

| Fase | Pregunta | Respuesta de ejemplo |
|---|---|---|
| Encuadre | ¿Quién tiene el problema? | Yo, cuando reviso textos largos y quiero ver qué palabras repito demasiado. |
| Encuadre | ¿Qué se observa? | Leo el texto varias veces y aun así se me escapan repeticiones. |
| Encuadre | ¿Por qué no basta lo que existe? | Los contadores que conozco cuentan palabras totales, no repeticiones. |
| Encuadre | ¿Por qué ahora? | Es una práctica para aprender el flujo de ECC. |
| Evidencia | ¿Qué pruebas tienes? | Ninguna: es una suposición. |
| Decisión | Hipótesis y MVP | Una función que, dado un texto y un número N, devuelva las N palabras más repetidas con su recuento, sin distinguir mayúsculas. |
| Decisión | Fuera de alcance | Interfaz gráfica, leer archivos, otros idiomas distintos del español. |
| Decisión | Preguntas abiertas | ¿Deben contar igual las palabras con y sin tilde? |

Fíjate en que la evidencia quedará marcada como **suposición**. ECC no la convierte en un dato inventado.

## 3. Revisa el PRD

Al terminar, Claude escribirá un archivo en `.claude/prds/`. El nombre exacto lo elige Claude; míralo con:

```sh
ls .claude/prds/
```

Ábrelo con tu editor y comprueba que tiene:

- **Problem**, **Hypothesis** y **Scope** con lo que respondiste;
- una tabla **Delivery Milestones** con al menos una entrega en estado `pending`;
- **ningún nombre de archivo ni de librería**: eso llegará con el plan.

Si algo no te convence, díselo a Claude en la misma sesión y pídele que lo corrija.

## 4. Pide el plan

Copia la ruta del PRD y pásasela a `/ecc:plan`. Por ejemplo, si el archivo se llama `frecuencias.prd.md`:

```text
/ecc:plan .claude/prds/frecuencias.prd.md
```

Claude elegirá la primera entrega pendiente y escribirá un plan en `.claude/plans/`. Antes buscará en el proyecto ejemplos que imitar; como está casi vacío, lo dirá en lugar de inventar convenciones. En el PRD, esa entrega pasará a `in-progress`.

Lee el plan y comprueba que tiene **tareas** concretas y una sección **Validation** con un comando como `npm test`.

## 5. Aprueba sin implementar todavía

`/ecc:plan` está esperando tu confirmación. Como en la siguiente guía vas a implementar con la skill de TDD, apruébalo así:

```text
Plan aprobado. No escribas código todavía: lo implementaré con tdd-workflow.
```

Si quieres cambiar algo antes de aprobar, usa `modify:` seguido del cambio, por ejemplo `modify: que las palabras con y sin tilde cuenten igual`.

Para terminar, guarda lo hecho en git desde otra terminal:

```sh
git add .claude/prds .claude/plans
git commit -m "docs: PRD y plan de frecuencias"
```

Se añaden solo esas dos carpetas a propósito. Claude Code puede guardar en `.claude/` otros archivos locales, como los permisos que has aprobado, que no conviene guardar en git.

## Si algo no sale como esperabas

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| Claude empieza a escribir código tras aprobar el plan | Interpretó la aprobación como permiso para implementar | Pulsa `Esc` para detenerlo y repite la aprobación con la frase del paso 5 |
| `/ecc:plan` no encuentra el PRD | La ruta no coincide con el nombre real del archivo | Comprueba el nombre con `ls .claude/prds/` |
| El plan no tiene sección de validación | El proyecto aún no tenía pruebas que detectar | Pide: `modify: añade npm test como validación` |
| Aparece `[Fact-Forcing Gate]` al crear el PRD | GateGuard, el hook del nivel 1 | Es normal: Claude responde y lo vuelve a intentar |

Tienes un PRD y un plan aprobado. En la siguiente guía, Claude los convertirá en código con pruebas.
