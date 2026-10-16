---
layout: guide.njk
title: Construir y probar
description: La skill tdd-workflow para escribir código guiado por pruebas, y los comandos que te sacan de un apuro cuando algo falla.
number: "03"
time: 10 min
goal: Entenderás el ciclo rojo → verde → refactor de ECC y sabrás cuándo recurrir a /ecc:build-fix, /ecc:test-coverage y la verificación.
toc:
  - { id: la-skill-tdd-workflow, title: La skill tdd-workflow }
  - { id: el-ciclo-paso-a-paso, title: El ciclo paso a paso }
  - { id: ecc-build-fix-cuando-no-compila, title: "/ecc:build-fix" }
  - { id: ecc-test-coverage-cubrir-lo-que-falta, title: "/ecc:test-coverage" }
  - { id: verificar-antes-de-dar-algo-por-terminado, title: Verificar antes de terminar }
---

## La skill tdd-workflow

En ECC el código se escribe **guiado por pruebas** (TDD): primero una prueba que describe lo que quieres y que **falla**, después el código mínimo para que **pase**, y por último se mejora sin romperla.

Esto lo hace la skill `tdd-workflow`. El antiguo comando `/tdd` está retirado. Tienes dos formas de usarla:

```text
/ecc:tdd-workflow .claude/plans/contador.plan.md
```

```text
Implementa la siguiente tarea del plan con TDD.
```

En la primera le pasas el plan aprobado como punto de partida. En la segunda, Claude carga la skill porque la tarea encaja con su descripción.

> La skill trata el plan como **datos, no como órdenes**. Si el plan incluye comandos de terminal, Claude te pedirá permiso antes de ejecutarlos, y rechaza los destructivos.

## El ciclo paso a paso

1. **Detectar el ejecutor de pruebas** del proyecto (por ejemplo `node --test`, `pytest` o `go test`).
2. **Escribir los recorridos de usuario**: qué debe poder hacer alguien con la funcionalidad.
3. **Generar los casos de prueba** a partir de esos recorridos.
4. **ROJO**: ejecutar las pruebas y comprobar que **fallan por el motivo esperado**. Una prueba que pasa antes de escribir el código no prueba nada.
5. **Implementar** el código mínimo.
6. **VERDE**: volver a ejecutar las pruebas y comprobar que pasan.
7. **Refactorizar**: mejorar el código manteniendo las pruebas en verde.
8. **Cobertura**: ECC aspira a un 80 % o más.

Si el proyecto usa git, la skill crea **commits de control** tras el rojo y tras el verde, y puede añadir uno más tras el refactor (ese es opcional). Así cada fase queda registrada y se puede volver atrás. Al final presenta un informe con la evidencia de cada fase.

## /ecc:build-fix: cuando no compila

Si la compilación o la comprobación de tipos fallan, `/ecc:build-fix`:

1. detecta el sistema de compilación (npm, cargo, go, gradle…);
2. agrupa los errores;
3. los arregla **de uno en uno**, con el cambio más pequeño posible.

Se detiene y **te pregunta** si un arreglo crea más errores de los que resuelve, si el mismo error sigue tras tres intentos, si hace falta un cambio de arquitectura o si falta instalar una dependencia. No es una varita mágica: es un mecánico prudente.

## /ecc:test-coverage: cubrir lo que falta

`/ecc:test-coverage` mide la cobertura, localiza el código sin probar y **genera las pruebas que faltan** hasta acercarse al objetivo. Úsalo después de implementar, no en lugar de TDD: las pruebas escritas a posteriori confirman lo que ya hace el código, no lo que debería hacer.

## Verificar antes de dar algo por terminado

- La skill `verification-loop` (antes `/verify`) repasa el trabajo en seis fases: compilación, tipos, lint, pruebas con cobertura, búsqueda de problemas de seguridad y revisión del diff. Termina con un informe **PASS** o **FAIL**. Úsala antes de abrir un PR.
- `/ecc:checkpoint create nombre` comprueba el estado actual, crea un commit o un *stash* de git con ese nombre y lo anota en `.claude/checkpoints.log`. Después puedes comparar con `/ecc:checkpoint verify nombre`. Sirve para marcar «hasta aquí todo funcionaba» en tareas largas.
