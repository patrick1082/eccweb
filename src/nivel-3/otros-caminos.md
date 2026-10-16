---
layout: guide.njk
title: Otros caminos
description: Variantes del flujo para el día a día. Arreglar un bug, una compilación rota, retomar el trabajo al día siguiente o abordar una idea pequeña.
number: "05"
time: 10 min
goal: Sabrás adaptar el flujo completo a las situaciones habituales sin recorrer siempre las seis etapas.
toc:
  - { id: no-todo-necesita-seis-etapas, title: No todo necesita seis etapas }
  - { id: arreglar-un-bug, title: Arreglar un bug }
  - { id: la-compilacion-esta-rota, title: La compilación está rota }
  - { id: retomar-al-dia-siguiente, title: Retomar al día siguiente }
  - { id: una-idea-pequena, title: Una idea pequeña }
  - { id: lo-que-viene-en-el-nivel-4, title: Lo que viene en el nivel 4 }
---

## No todo necesita seis etapas

El flujo completo es para funcionalidades nuevas. En el trabajo diario usarás **trozos** del flujo. Lo que nunca cambia son dos puertas: **la prueba antes del código** y **la revisión antes del commit**.

## Arreglar un bug

Un bug es una prueba que falta. El camino:

1. Describe el fallo y pide una **prueba que lo reproduzca**. La skill `tdd-workflow` también sirve para bugs:

    ```text
    /ecc:tdd-workflow frecuencias devuelve "Gato" y "gato" como palabras distintas; primero una prueba que lo reproduzca
    ```

2. Comprueba que la prueba **falla por ese motivo** (rojo).
3. Deja que la skill aplique el arreglo mínimo (verde). Como en el nivel 3, la skill ya habrá hecho los commits de control.
4. Revisa la rama con el agente `ecc:code-reviewer`, como en el [paso 1 de la entrega](/nivel-3/revisar-y-entregar/#1-revisa-toda-la-rama). Después usa `/ecc:code-review` y `/ecc:prp-commit` solo para los arreglos que surjan de la revisión.

No necesitas PRD ni plan: el bug ya define qué está mal.

## La compilación está rota

Cuando el proyecto no compila, ni las pruebas pueden ejecutarse. Primero:

```text
/ecc:build-fix
```

Cuando vuelva a compilar, continúa con lo que estabas haciendo. Si `/ecc:build-fix` se detiene y te pregunta, lee el motivo: suele significar que falta instalar una dependencia o que el problema es de diseño, no de compilación.

## Retomar al día siguiente

Antes de cerrar la sesión:

```text
/ecc:save-session
```

Guarda en `~/.claude/session-data/` qué estabas construyendo, qué funcionó, qué no y en qué estado están los archivos. Al día siguiente, en la misma carpeta:

```text
/ecc:resume-session
```

Si además aprendiste algo que merece la pena conservar, como la causa de un error raro, usa `/ecc:learn-eval` antes de cerrar.

## Una idea pequeña

Para un cambio claro y acotado, salta el PRD:

1. `/ecc:plan añadir una opción para ignorar palabras de menos de 3 letras`.
2. Aprueba el plan.
3. Una rama, `tdd-workflow`, revisión de la rama con `ecc:code-reviewer` y commit de los arreglos, como en el flujo completo.

Regla práctica: si puedes explicar el cambio en una frase y no tienes dudas sobre el problema, empieza por el plan. Si dudas de **qué** construir o para **quién**, empieza por el PRD.

## Lo que viene en el nivel 4

Habrás notado que en el flujo completo **tú lanzas cada etapa**. ECC también tiene comandos que encadenan las etapas solos, con puertas de aprobación en los puntos clave. Por ejemplo, `/ecc:orch-fix-defect` automatiza el camino del bug: reproducir, arreglar, revisar y commit con tu visto bueno. Ese es el tema del nivel 4: **orquestación**.
