---
layout: guide.njk
title: Revisar y entregar
description: Revisar los cambios antes de guardarlos, hacer commits descritos con tus palabras y abrir pull requests.
number: "04"
time: 9 min
goal: Sabrás revisar tus cambios con ECC, interpretar la gravedad de los problemas y hacer un commit o un PR sin recordar comandos de git.
toc:
  - { id: revisar-antes-de-guardar, title: Revisar antes de guardar }
  - { id: ecc-code-review, title: "/ecc:code-review" }
  - { id: ecc-review-pr-varios-revisores, title: "/ecc:review-pr" }
  - { id: ecc-prp-commit-commits-con-tus-palabras, title: "/ecc:prp-commit" }
  - { id: ecc-pr-abrir-un-pull-request, title: "/ecc:pr" }
  - { id: los-vigilantes-tambien-revisan, title: Los vigilantes también revisan }
---

## Revisar antes de guardar

El flujo de ECC dice: **en cuanto el código está escrito, se revisa**. Una revisión encuentra problemas cuando todavía son baratos de arreglar, antes de que lleguen a un commit o a otra persona.

## /ecc:code-review

`/ecc:code-review` tiene dos modos:

| Escribes | Revisa |
|---|---|
| `/ecc:code-review` | Tus **cambios locales** sin commit |
| `/ecc:code-review 42` o la URL de un PR | Un **pull request** de GitHub. Atención: en este modo **publica la revisión en GitHub** (aprobación, cambios pedidos o comentario) y guarda una copia en `.claude/reviews/` |

El informe clasifica cada problema por gravedad:

| Gravedad | Significa | Qué hacer |
|---|---|---|
| **CRITICAL** | Fallo grave, normalmente de seguridad | Arreglar antes de seguir |
| **HIGH** | Error de calidad o de lógica importante | Arreglar antes de seguir |
| **MEDIUM** | Conviene mejorarlo | Arreglar ahora o anotarlo |
| **LOW** | Detalle menor | A tu criterio |

Si aparece algún **CRITICAL** o **HIGH**, el comando indica que **no se haga commit** hasta arreglarlo: primero se corrige y después se revisa otra vez. Es una regla del procedimiento que Claude sigue, no un bloqueo automático. Por eso conviene que tú también la respetes.

## /ecc:review-pr: varios revisores

`/ecc:review-pr` es la revisión a fondo de un PR. Reparte el trabajo entre **agentes especializados**: `ecc:code-reviewer` (calidad), `ecc:comment-analyzer` (comentarios), `ecc:pr-test-analyzer` (pruebas), `ecc:silent-failure-hunter` (errores silenciados), `ecc:type-design-analyzer` (tipos) y `ecc:code-simplifier` (simplificación). Tarda más, pero es lo más parecido a pedir opinión a todo un equipo.

## /ecc:prp-commit: commits con tus palabras

En lugar de recordar `git add` y `git commit`, **describe qué quieres guardar**:

| Escribes | Qué hace |
|---|---|
| `/ecc:prp-commit` | Prepara todos los cambios y genera el mensaje |
| `/ecc:prp-commit staged` | Solo lo que ya tenías preparado |
| `/ecc:prp-commit except tests` | Todo menos las pruebas |
| `/ecc:prp-commit only new files` | Solo los archivos nuevos |

El mensaje sigue el formato `tipo: descripción` (por ejemplo `feat: añade contador de palabras`). Los tipos más comunes son `feat`, `fix`, `refactor`, `docs`, `test` y `chore`, entre otros.

## /ecc:pr: abrir un pull request

`/ecc:pr` sube tu rama y crea el PR en GitHub con un resumen de los cambios. Antes comprueba que:

- **no estás en la rama principal** (si lo estás, te pide que crees una rama);
- tu rama **tiene commits** que la principal no tiene;
- **no existe ya** un PR para esa rama.

Necesita que el proyecto tenga un **remoto en GitHub** y la herramienta `gh` con la sesión iniciada. Si trabajas solo en local, puedes hacer el **merge** directamente; lo verás en el nivel 3.

## Los vigilantes también revisan

ECC trae un **hook de commit** que revisa los archivos preparados antes de cada `git commit` que lanza Claude. Pero **solo se activa con el perfil de hooks `strict`**. Con el perfil por defecto (`standard`) no se ejecuta. Para activarlo, arranca Claude Code con la variable `ECC_HOOK_PROFILE=strict`:

```sh
ECC_HOOK_PROFILE=strict claude
```

Con el perfil `strict`, un **secreto** o un `debugger` olvidado **bloquean** el commit. Un `console.log` o un mensaje con un formato incorrecto solo generan un **aviso**, y el commit se hace igualmente.
