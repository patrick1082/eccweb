---
layout: guide.njk
title: Las seis piezas
description: Agentes, skills, comandos, hooks, rules y MCP. Qué es cada uno, para qué sirve y cómo lo reconoces en tu sesión.
number: "02"
time: 12 min
goal: Distinguirás las seis piezas de ECC y sabrás identificar cuál está actuando cuando algo ocurre en tu sesión.
toc:
  - { id: un-equipo-de-trabajo, title: Un equipo de trabajo }
  - { id: agentes-los-especialistas, title: Agentes }
  - { id: skills-los-procedimientos, title: Skills }
  - { id: comandos-los-atajos, title: Comandos }
  - { id: hooks-los-vigilantes, title: Hooks }
  - { id: rules-las-normas-de-la-casa, title: Rules }
  - { id: mcp-las-conexiones-con-el-exterior, title: MCP }
  - { id: las-seis-de-un-vistazo, title: Las seis de un vistazo }
  - { id: glosario, title: Glosario }
---

## Un equipo de trabajo

La forma más fácil de entender ECC es imaginar **un estudio de desarrollo**. Claude es quien coordina el estudio. Las seis piezas son lo que tiene a su alcance:

- **especialistas** a los que delegar trabajo (agentes),
- **procedimientos escritos** que sigue paso a paso (skills),
- **atajos** con los que tú le pides algo concreto (comandos),
- **vigilantes** que revisan cada acción automáticamente (hooks),
- **normas de la casa** que siempre tiene presentes (rules),
- **conexiones** con herramientas externas (MCP).

Cada pieza tiene un trabajo distinto. Mantenerlas separadas es lo que permite que ECC sea tan grande sin saturar cada conversación.

## Agentes: los especialistas

**Un agente es un ayudante especializado que trabaja en su propio contexto**, con sus propias instrucciones y un conjunto limitado de herramientas. Claude le encarga una tarea, el agente la hace por separado y devuelve un informe.

- **Analogía**: el revisor de calidad de una fábrica. No fabrica piezas; solo las inspecciona, y lo hace sin las distracciones de la línea de producción.
- **Ejemplos de ECC 2.2.3**: `ecc:planner` (planifica funcionalidades complejas), `ecc:code-reviewer` (revisa código recién escrito), `ecc:security-reviewer` (busca vulnerabilidades), `ecc:tdd-guide` (guía el desarrollo dirigido por pruebas).
- **Cómo lo reconoces**: en tu sesión aparece una llamada a un agente con su nombre `ecc:…` y una breve descripción de la tarea. Al terminar, Claude te resume lo que encontró.

Un agente **no ve tu conversación completa**: solo recibe el encargo. Por eso sus informes son precisos, y también por eso Claude debe explicarle bien la tarea.

## Skills: los procedimientos

**Una skill es un procedimiento escrito que Claude carga cuando la tarea lo necesita.** Vive en un archivo `SKILL.md` con un nombre, una descripción de cuándo usarla y los pasos que hay que seguir.

- **Analogía**: la receta de cocina. No cocina por ti, pero garantiza que el plato salga igual cada vez.
- **Ejemplos de ECC 2.2.3**: `tdd-workflow` (escribe la prueba, mira cómo falla, implementa lo mínimo y refactoriza), `ecc-guide` (te orienta por las piezas de ECC), `security-review` (lista de comprobación de seguridad).
- **Cómo lo reconoces**: Claude anuncia que carga una skill, o tú la invocas escribiendo su nombre con barra, por ejemplo `/ecc:ecc-guide`.

De cada skill, Claude tiene siempre a mano **su nombre y su descripción**, que le sirven para saber cuándo usarla. **El procedimiento completo solo se carga cuando hace falta.** Desde la versión 2, las skills son la pieza principal de ECC: casi todo el trabajo nuevo se escribe como skill.

## Comandos: los atajos

**Un comando es una orden que tú escribes empezando por `/`** para pedir un flujo concreto. Algunos comandos de ECC llevan el procedimiento escrito dentro; otros son una puerta de entrada que carga una skill. ECC los mantiene sobre todo por compatibilidad: la dirección del proyecto es que el trabajo nuevo viva en skills.

- **Analogía**: el botón de una máquina de café. Pulsas «capuchino» y la máquina hace todos los pasos por ti.
- **Ejemplos de ECC 2.2.3**: `/plan` (plan paso a paso que espera tu confirmación), `/plan-prd` (documento de requisitos), `/code-review` (revisión de los cambios), `/build-fix` (arregla errores de compilación).
- **Cómo lo reconoces**: escribe `/` en Claude Code y aparecerá la lista. Los de ECC llevan el prefijo del plugin, como `/ecc:plan-prd`.

> Atención: Claude Code también tiene sus propios comandos integrados, como `/help`, `/plugin` o `/mcp`. Esos **no** son de ECC.

## Hooks: los vigilantes

**Un hook es un script que se ejecuta automáticamente cuando ocurre algo en la sesión**: antes de usar una herramienta, después de usarla, al empezar o al terminar. Puede avisar o incluso **bloquear** una acción.

- **Analogía**: el detector de metales de un aeropuerto. No decide adónde viajas, pero te para si llevas algo que no debería pasar.
- **Ejemplos de ECC 2.2.3**:
  - **GateGuard**: bloquea la primera edición de cada archivo y obliga a Claude a explicar qué va a cambiar, por qué y qué pidió el usuario.
  - **Comprobación previa al commit**: revisa los archivos preparados antes de un `git commit` y detecta, por ejemplo, secretos olvidados. Solo se activa con el perfil de hooks `strict`, no con el perfil por defecto.
  - **Aviso de documentos**: avisa cuando se crea un `.md` fuera de las ubicaciones habituales.
- **Cómo lo reconoces**: aparece un mensaje que no ha escrito Claude, como `[Fact-Forcing Gate]`, seguido de lo que el hook exige antes de continuar.

Los hooks **se ejecutan fuera del modelo**: no es Claude quien decide si se ejecutan. Tú sí puedes configurarlos o desactivarlos; GateGuard, por ejemplo, se apaga con la variable `ECC_GATEGUARD=off`. Son una red de seguridad, no una garantía absoluta.

## Rules: las normas de la casa

**Las rules son normas permanentes que Claude tiene en cuenta en todas las conversaciones**: estilo de código, cómo hacer commits, requisitos de pruebas o reglas de seguridad.

- **Analogía**: el reglamento interno de una empresa. Nadie lo consulta a cada momento, pero todo el mundo trabaja según él.
- **Ejemplos de ECC 2.2.3**: el paquete `common` (estilo, git, pruebas, seguridad) y paquetes por lenguaje como `typescript`, `python` o `golang`.
- **Cómo lo reconoces**: las rules instaladas están en `~/.claude/rules/`. Si esa carpeta no existe, no tienes rules de ECC.

> Importante: los plugins de Claude Code **no pueden instalar rules**. Si instalaste ECC como plugin, las rules no vienen incluidas; hay que copiarlas a mano. Como siempre están cargadas, ECC recomienda instalar solo `common` y el paquete de tu lenguaje.

## MCP: las conexiones con el exterior

**MCP (Model Context Protocol) es la forma estándar de conectar Claude con herramientas externas**, como un navegador, una base de datos o un servicio de documentación. Cada conexión es un *servidor MCP* que ofrece nuevas herramientas.

- **Analogía**: los enchufes de una cocina. La cocina funciona sin ellos, pero gracias a ellos puedes conectar la batidora o el horno.
- **Ejemplos de ECC 2.2.3**: el plugin incluye el servidor `chrome-devtools`, que permite a Claude abrir páginas, hacer capturas o medir el rendimiento en Chrome. Además, ECC trae un catálogo de configuraciones de servidores MCP opcionales que puedes activar si los necesitas.
- **Cómo lo reconoces**: el comando integrado `/mcp` de Claude Code muestra los servidores conectados. Las herramientas de los servidores del plugin suelen aparecer con nombres que empiezan por `mcp__plugin_ecc_`.

## Las seis de un vistazo

| Pieza | Quién la activa | Qué hace | Ejemplo |
|---|---|---|---|
| Agente | Claude, o un comando | Hace una tarea especializada en su propio contexto | `ecc:code-reviewer` |
| Skill | Claude cuando la necesita, o tú con `/` | Aporta un procedimiento paso a paso | `tdd-workflow` |
| Comando | Tú, escribiendo `/` | Lanza un flujo concreto | `/plan` |
| Hook | Un evento de la sesión, automáticamente | Avisa o bloquea una acción | GateGuard |
| Rule | Siempre activa | Fija normas permanentes | `rules/common` |
| MCP | Claude, cuando usa la herramienta | Conecta con herramientas externas | `chrome-devtools` |

## Glosario

- **Claude Code**: la herramienta de Anthropic para trabajar con Claude desde la terminal.
- **Plugin**: paquete que añade piezas a Claude Code. ECC es uno.
- **Prefijo `ecc:`**: marca que una pieza viene del plugin ECC.
- **Contexto**: todo lo que Claude tiene presente en una conversación. Es limitado, y por eso importa no llenarlo.
- **Subagente**: otra forma de llamar a un agente que trabaja en su propio contexto.
- **`SKILL.md`**: el archivo donde se escribe una skill.
- **PreToolUse / PostToolUse**: momentos en los que se ejecuta un hook: antes o después de que Claude use una herramienta.
- **Servidor MCP**: programa que ofrece herramientas externas a Claude mediante el protocolo MCP.
- **TDD**: desarrollo dirigido por pruebas: primero la prueba que falla, después el código que la hace pasar.
- **PRD**: documento de requisitos de producto. Explica qué hay que construir y por qué, sin decir cómo.
