# ECC · Manual de orquestación

Manual web local, en español, para aprender ECC (Everything Claude Code) desde cero hasta orquestar flujos completos. Es un proyecto independiente de `cxo_web` y está pensado para principiantes que vienen de CXO.

## Abrir el manual

Necesitas **Node.js 22.15 o superior** y npm. Para ver la versión que tienes, escribe `node --version`.

La primera vez, instala las dependencias dentro de la carpeta `ecc_web`:

```sh
npm ci
```

Cada vez que quieras consultar el manual:

```sh
npm run dev
```

Abre **http://localhost:4331** en el navegador y deja la terminal abierta. La recarga automática está desactivada: si cambias un archivo, recarga la página a mano. Para detener el servidor, pulsa `Ctrl+C`. El puerto no coincide con el de `cxo_web` (4321), así que puedes tener los dos manuales abiertos a la vez.

Las páginas no usan JavaScript, fuentes remotas ni CDN. El manual no ejecuta comandos ni cambia tu configuración. No abras los HTML con `file://`, porque los enlaces parten de la raíz del servidor.

## Contenido disponible

- Portada con la ruta de cuatro niveles. El nivel 4 (orquestación) aparece como «Próximamente».
- **Nivel 1 · Conceptos**: qué es ECC, las seis piezas (agentes, skills, comandos, hooks, rules y MCP) con un glosario, un diagrama de cómo se relacionan y una práctica para encontrarlas en tu propia sesión.
- **Nivel 2 · Comandos esenciales**: un mapa de situaciones y comandos; cómo planificar, construir, probar, revisar y entregar; y una práctica con 10 escenarios con la respuesta plegada.
- **Nivel 3 · Flujos de trabajo**: el flujo PRD → plan → TDD → revisión → commit → entrega con un diagrama, una práctica guiada de principio a fin en un proyecto pequeño y variantes para bugs, compilaciones rotas, retomar sesiones e ideas pequeñas.
- Estética oscura permanente, inspirada en Claude Code: negros, naranjas y blancos.
- Navegación por teclado y menú móvil sin JavaScript.

Cada página indica la versión de ECC que documenta (actualmente 2.2.3).

## Desarrollo

```sh
npm test            # estructura del sitio + contraste de cada /ecc:… citado con el plugin instalado
npm run test:e2e    # recorridos en Chromium, Firefox, WebKit y móvil (Playwright)
npm run build       # genera dist/
```

Para WebKit, Playwright necesita librerías del sistema: `sudo npx playwright install-deps`.

`test/ecc-surface.test.js` busca ECC en `~/.claude/plugins/cache/ecc/ecc/<eccVersion>`. Si no lo encuentra, se omite con un aviso. Para usar otra ruta, defínela en `ECC_PLUGIN_ROOT`. Cuando actualices ECC, cambia `eccVersion` en `src/_data/site.json` y ejecuta `npm test`: la prueba fallará si el manual cita algo que ya no existe.

Eleventy está fijado en la versión `4.0.0-alpha.10`, la misma que usa `cxo_web`. Instala siempre con `npm ci` para respetar el lockfile. Antes de actualizarlo, ejecuta las dos baterías de pruebas.

Requisitos: [PRD](docs/prds/ecc-manual-web.prd.md) · Planes: [milestone 1](docs/plans/milestone-1.plan.md), [milestone 2](docs/plans/milestone-2.plan.md).
