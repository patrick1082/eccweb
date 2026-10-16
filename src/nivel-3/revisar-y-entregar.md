---
layout: guide.njk
title: Revisar, hacer commit y entregar
description: "Práctica guiada, etapas 4 a 6: revisa la rama, corrige lo que aparezca, guarda los cambios e intégralos en la rama principal."
number: "04"
time: 15 min
goal: Habrás completado el flujo de ECC de principio a fin y sabrás repetirlo sin preguntar qué comando toca.
toc:
  - { id: 1-revisa-toda-la-rama, title: 1. Revisa toda la rama }
  - { id: 2-corrige-lo-que-bloquea, title: 2. Corrige lo que bloquea }
  - { id: 3-guarda-los-cambios, title: 3. Guarda los cambios }
  - { id: 4-integra-el-trabajo, title: 4. Integra el trabajo }
  - { id: 5-cierra-la-entrega-en-el-prd, title: 5. Cierra la entrega }
  - { id: si-algo-no-sale-como-esperabas, title: Si algo falla }
  - { id: cuando-has-terminado, title: Cuándo has terminado }
---

## 1. Revisa toda la rama

Aquí hay un detalle importante. `/ecc:code-review` sin argumentos revisa los **cambios sin commit**. Pero la skill de TDD ya hizo commits de control, así que casi todo tu trabajo **ya está en commits** y esa revisión vería muy poco.

Para revisar la rama entera, pide la revisión directamente al agente revisor:

```text
Usa el agente ecc:code-reviewer para revisar todos los cambios de esta rama respecto a main (git diff main...HEAD).
```

El agente trabaja aparte y devuelve una lista de problemas clasificados como CRITICAL, HIGH, MEDIUM o LOW.

> Si tu proyecto estuviera en GitHub con un PR abierto, `/ecc:code-review` seguido del número del PR revisaría todos sus commits. En local, el agente es el camino directo.

## 2. Corrige lo que bloquea

Si hay problemas **CRITICAL** o **HIGH**, no sigas adelante:

```text
Corrige los problemas CRITICAL y HIGH de la revisión, manteniendo las pruebas en verde.
```

Después ejecuta `/ecc:code-review`. Ahora los arreglos sí están sin commit, así que este comando es la herramienta adecuada para comprobarlos. Ojo: solo ve archivos **que git ya conoce**. Si el arreglo creó un archivo nuevo, añádelo antes con `git add` para que entre en la revisión. Repite hasta que no quede nada CRITICAL ni HIGH. Los MEDIUM y LOW son decisión tuya: arréglalos o anótalos.

## 3. Guarda los cambios

Guarda los arreglos y el informe de evidencia con un commit descrito con tus palabras:

```text
/ecc:prp-commit
```

Claude prepara los cambios y escribe un mensaje con el formato `tipo: descripción`. Si arrancaste Claude Code con el perfil de hooks `strict`, además el hook de commit buscará secretos antes de guardar. Si no había nada pendiente, el comando te dirá que no hay nada que guardar, y también es correcto.

## 4. Integra el trabajo

En una terminal, comprueba que todo sigue en verde e integra la rama en la principal:

```sh
npm test
git switch main
git merge --no-ff feat/frecuencias -m "feat: añade frecuencias"
git log --oneline --graph -8
```

La opción `-m` pone el mensaje del merge directamente. Así git no abre un editor de texto.

Verás tu rama unida a `main` con un commit de merge. Ese es el cambio integrado.

**Opcional, si tienes GitHub.** Si el proyecto tuviera un remoto en GitHub y la herramienta `gh` con la sesión iniciada, en lugar del merge local quedarías en la rama y escribirías `/ecc:pr`. Subiría la rama y abriría el pull request por ti.

## 5. Cierra la entrega en el PRD

`/ecc:plan` marcó la entrega como `in-progress`, pero nadie la marca como terminada por ti. Pídeselo a Claude:

```text
Marca como complete la entrega implementada en el PRD de .claude/prds/ y haz commit del cambio.
```

## Si algo no sale como esperabas

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| `/ecc:code-review` responde «Nothing to review» | No hay cambios sin commit | Es lo esperado tras TDD: usa el agente como en el paso 1 |
| El hook bloquea el commit (solo con el perfil `strict`) | Encontró un secreto o un `debugger` | Lee el motivo, corrígelo y repite `/ecc:prp-commit`. Un formato de mensaje incorrecto solo produce un aviso |
| `git merge` informa de conflictos | La rama principal cambió mientras trabajabas | Pide a Claude: `ayúdame a resolver los conflictos del merge` |
| `/ecc:pr` dice que estás en la rama principal | Ya hiciste el merge o no creaste la rama | El PR se abre desde una rama de trabajo, no desde `main` |

## Cuándo has terminado

Has completado el nivel 3 si puedes marcar todo esto:

- Tengo un PRD y un plan en `.claude/`, y un informe de evidencia de TDD en la carpeta que eligió Claude.
- `git log` muestra los commits de control del rojo y del verde, y un merge en `main`.
- La revisión no dejó problemas CRITICAL ni HIGH sin resolver.
- Sé por qué `/ecc:code-review` local no basta después de TDD y qué usar en su lugar.
- He recorrido todo el flujo **sin preguntar a Claude qué comando tocaba** en cada etapa.

El último punto es el objetivo de todo el manual hasta aquí. Si lo has conseguido, ya orquestas un flujo completo con ECC.
