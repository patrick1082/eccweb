---
layout: guide.njk
title: Comprobar mi ECC
description: Práctica guiada. Abre Claude Code en una carpeta de pruebas y encuentra cada una de las seis piezas funcionando en tu sesión.
number: "04"
time: 15 min
goal: Habrás visto en tu propia sesión un comando, una skill, un agente, un hook, las rules y un servidor MCP, y sabrás interpretar lo que muestra cada uno.
toc:
  - { id: antes-de-empezar, title: Antes de empezar }
  - { id: 1-confirma-que-ecc-esta-instalado, title: 1. ECC instalado }
  - { id: 2-encuentra-los-comandos, title: 2. Comandos }
  - { id: 3-usa-una-skill, title: 3. Una skill }
  - { id: 4-observa-a-un-agente, title: 4. Un agente }
  - { id: 5-provoca-un-hook, title: 5. Un hook }
  - { id: 6-revisa-rules-y-mcp, title: 6. Rules y MCP }
  - { id: si-algo-no-sale-como-esperabas, title: Si algo falla }
  - { id: cuando-has-terminado, title: Cuándo has terminado }
---

## Antes de empezar

Necesitas Claude Code con el plugin ECC instalado. Trabajarás en una **carpeta de pruebas vacía**, así nada de lo que hagas afecta a tus proyectos.

Abre una terminal y escribe:

```sh
mkdir -p ~/practica-ecc
cd ~/practica-ecc
claude
```

Se abrirá una sesión de Claude Code dentro de `~/practica-ecc`. Todo lo que sigue se escribe en esa sesión, salvo que se indique otra cosa.

## 1. Confirma que ECC está instalado

Escribe el comando integrado de Claude Code:

```text
/plugin
```

En la lista de plugins instalados debe aparecer **ecc**. Si quieres ver qué versión tienes, en otra terminal escribe:

```sh
ls ~/.claude/plugins/cache/ecc/ecc/
```

El nombre de la carpeta es la versión, por ejemplo `2.2.3`. Este manual está escrito para esa versión.

## 2. Encuentra los comandos

Escribe solo esto, **sin pulsar Intro**:

```text
/ecc:
```

Claude Code mostrará una lista de sugerencias que empiezan por `ecc:`. Desplázate por ella. Busca `ecc:plan`, `ecc:plan-prd` y `ecc:code-review`.

Borra lo escrito antes de seguir. Lo que acabas de ver son **comandos**: atajos que tú escribes.

## 3. Usa una skill

Ahora sí, escribe y pulsa Intro:

```text
/ecc:ecc-guide ¿qué agentes tengo para revisar código?
```

Claude cargará la skill `ecc-guide` y te responderá usando su procedimiento: consulta los archivos reales de ECC en lugar de responder de memoria.

Fíjate en el aviso de que se carga una skill. Esa es la señal de que hay **un procedimiento** detrás de la respuesta.

## 4. Observa a un agente

Pide a Claude que delegue una tarea de solo lectura:

```text
Usa el agente ecc:code-explorer para describir qué hay en esta carpeta.
```

Verás que Claude lanza un **agente** con ese nombre. El agente trabaja aparte y, al terminar, Claude te resume su informe. Como la carpeta está vacía, el informe será corto. Lo importante es reconocer la llamada al agente.

## 5. Provoca un hook

Pide a Claude que cree un archivo:

```text
Crea un archivo notas.txt con el texto "hola ECC".
```

Antes de crear el archivo aparecerá un mensaje parecido a este:

```text
[Fact-Forcing Gate]
Before creating …/notas.txt, present these facts:
```

Es **GateGuard**, un hook de ECC. Bloquea la primera escritura de cada archivo hasta que Claude explica qué va a cambiar, por qué y qué le has pedido. Claude responderá a esas preguntas y lo volverá a intentar; entonces el archivo se creará.

Puede que GateGuard también pare el **primer comando de terminal** de la sesión con una petición parecida. Es el mismo vigilante y funciona igual.

## 6. Revisa rules y MCP

**Rules.** En otra terminal, escribe:

```sh
ls ~/.claude/rules
```

- Si aparece una carpeta como `ecc` o `common`, tienes rules instaladas.
- Si sale un error de que no existe, **no tienes rules**. Es lo normal si instalaste ECC como plugin, porque los plugins no pueden instalarlas. No es un fallo.

**MCP.** Vuelve a la sesión de Claude Code y escribe:

```text
/mcp
```

Busca el servidor **chrome-devtools**, que viene con el plugin ECC. Es la conexión que permite a Claude controlar un navegador Chrome.

## Si algo no sale como esperabas

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| `ecc` no aparece en `/plugin` | El plugin no está instalado o está desactivado | Instálalo o actívalo desde `/plugin` y abre una sesión nueva |
| `/ecc:` no muestra sugerencias | La sesión empezó antes de instalar el plugin | Sal con `/exit` y vuelve a escribir `claude` |
| No aparece `[Fact-Forcing Gate]` | Los hooks están desactivados en tu instalación, o el archivo ya existía | Prueba con otro nombre de archivo; si sigue sin aparecer, anótalo para el nivel 2 |
| `chrome-devtools` sale como desconectado | El servidor necesita descargarse la primera vez | Comprueba tu conexión a internet y vuelve a mirar `/mcp` |

## Cuándo has terminado

Has completado el nivel 1 si puedes marcar todo esto:

- He visto **ecc** en `/plugin` y sé qué versión tengo.
- He encontrado comandos que empiezan por `/ecc:` y sé que son atajos que escribo yo.
- He usado una **skill** y he reconocido el aviso de que se cargaba.
- He visto a Claude lanzar un **agente** `ecc:…` y resumir su informe.
- He provocado **GateGuard** y entiendo por qué bloquea la primera escritura.
- Sé si tengo **rules** instaladas y he visto el servidor **MCP** `chrome-devtools`.
- Ante cualquier mensaje de la sesión, sé decir si viene de un comando, una skill, un agente o un hook.

Cuando termines, puedes borrar la carpeta de pruebas con `rm -r ~/practica-ecc`. El nivel 2, con los comandos esenciales para el día a día, llegará en el próximo hito.
