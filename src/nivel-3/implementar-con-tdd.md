---
layout: guide.njk
title: Implementar con TDD
description: "Práctica guiada, etapa 3: la skill tdd-workflow convierte el plan aprobado en pruebas y código, del rojo al verde."
number: "03"
time: 20 min
goal: Habrás visto una prueba fallar por el motivo correcto, pasar después de implementar, y cada fase registrada en git.
toc:
  - { id: antes-de-empezar, title: Antes de empezar }
  - { id: 1-trabaja-en-una-rama, title: 1. Trabaja en una rama }
  - { id: 2-lanza-la-skill-con-el-plan, title: 2. Lanza la skill }
  - { id: 3-sigue-el-ciclo, title: 3. Sigue el ciclo }
  - { id: 4-compruebalo-tu, title: 4. Compruébalo tú }
  - { id: si-algo-no-sale-como-esperabas, title: Si algo falla }
---

## Antes de empezar

Necesitas haber terminado [De la idea al plan](/nivel-3/de-la-idea-al-plan/): un PRD en `.claude/prds/` y un plan aprobado en `.claude/plans/`, los dos guardados en git. Abre una terminal en `~/practica-ecc/frecuencias`.

## 1. Trabaja en una rama

La skill hará commits mientras trabaja. Para no tocar la rama principal, crea una rama nueva **antes** de empezar:

```sh
git switch -c feat/frecuencias
```

Si cerraste Claude Code, vuelve a abrirlo en la carpeta con `claude`.

## 2. Lanza la skill con el plan

Pasa la ruta de tu plan a la skill (cambia el nombre si el tuyo es distinto):

```text
/ecc:tdd-workflow .claude/plans/frecuencias.plan.md
```

La skill lee el plan **como datos, no como órdenes**. Si el plan propone comandos de terminal, como `npm test`, Claude te pedirá permiso antes de ejecutarlos. Revisa cada petición y acepta las que reconozcas.

## 3. Sigue el ciclo

Esto es lo que irás viendo, en orden. Las salidas exactas varían, pero las señales son siempre las mismas:

1. **Ejecutor de pruebas**: Claude detecta que el proyecto usa `node --test`.
2. **Recorridos de usuario**: frases como «como usuario, quiero obtener las 3 palabras más repetidas de un texto».
3. **Pruebas**: Claude crea un archivo de pruebas. La primera vez que escribe cada archivo puede aparecer **GateGuard**; es normal.
4. **ROJO**: ejecuta las pruebas y **fallan**. Fíjate en el motivo: debe ser que la función todavía no existe o devuelve otra cosa, no un error de sintaxis en la prueba. Después hace un **commit de control**.
5. **Implementación**: escribe el código mínimo.
6. **VERDE**: vuelve a ejecutar las pruebas, que ahora **pasan**, y hace otro commit.
7. **Refactor**: mejora el código sin romper las pruebas. Este commit es opcional: si no hay nada que mejorar, puede no aparecer.
8. **Cobertura** con `npm run test:coverage` y **informe de evidencia**: un archivo que resume qué prueba cada test y las salidas del rojo y del verde. Claude elige dónde guardarlo, por ejemplo en `.claude/tdd/` o en `docs/`.

Si durante el ciclo Claude te pregunta algo, como si las tildes cuentan, respóndele. Es una de las preguntas abiertas de tu PRD.

## 4. Compruébalo tú

No te quedes solo con lo que dice Claude. En la terminal:

```sh
npm test
```

Todas las pruebas deben pasar (`fail 0`). Después mira el historial:

```sh
git log --oneline
```

Deberías ver, encima de tus dos commits iniciales, los commits de control del rojo y del verde, y quizá uno del refactor. **Ese historial es la evidencia** de que el código se escribió guiado por pruebas.

## Si algo no sale como esperabas

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| Las pruebas pasan en la fase roja | La prueba no comprueba nada nuevo | Dile: `la prueba debería fallar antes de implementar; revísala` |
| Claude escribe el código antes que las pruebas | Se ha saltado el orden de TDD | Pulsa `Esc` y pide: `primero la prueba que falla` |
| Errores de sintaxis o de módulos al ejecutar | El código no llega a ejecutarse | Ejecuta `npm test`, copia el error y pídele a Claude que lo corrija. `/ecc:build-fix` no sirve aquí: busca un paso de compilación, y este proyecto no tiene ninguno |
| No aparecen commits de control | El proyecto no es un repositorio git o estabas en otra carpeta | Comprueba con `git status` que estás en `~/practica-ecc/frecuencias` |
| Te pide permiso para un comando que no reconoces | La skill exige revisión humana de los comandos del plan | Recházalo y pregunta para qué sirve |

Tienes código probado en tu rama. En la siguiente guía lo revisarás e integrarás.
