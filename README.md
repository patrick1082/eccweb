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

- Portada con la ruta de cuatro niveles. Los niveles 2–4 aparecen como «Próximamente».
- **Nivel 1 · Conceptos**: qué es ECC, las seis piezas (agentes, skills, comandos, hooks, rules y MCP) con un glosario, un diagrama de cómo se relacionan y una práctica para encontrarlas en tu propia sesión.
- Estética oscura permanente, inspirada en Claude Code: negros, naranjas y blancos.
- Navegación por teclado y menú móvil sin JavaScript.

Cada página indica la versión de ECC que documenta (actualmente 2.2.3).

## Desarrollo

```sh
npm test            # compila el sitio y comprueba su estructura (node:test + linkedom)
npm run test:e2e    # recorridos en Chromium, Firefox, WebKit y móvil (Playwright)
npm run build       # genera dist/
```

Para WebKit, Playwright necesita librerías del sistema: `sudo npx playwright install-deps`.

Eleventy está fijado en la versión `4.0.0-alpha.10`, la misma que usa `cxo_web`. Instala siempre con `npm ci` para respetar el lockfile. Antes de actualizarlo, ejecuta las dos baterías de pruebas.

Requisitos: [PRD](docs/prds/ecc-manual-web.prd.md) · Alcance actual: [plan del milestone 1](docs/plans/milestone-1.plan.md).
