import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import Eleventy from '@11ty/eleventy';
import { parseHTML } from 'linkedom';
import { availableGuides, guideLevel, pathNeighbors } from '../eleventy.config.js';
import site from '../src/_data/site.json' with { type: 'json' };

const levelGuides = {
  'nivel-1': ['/nivel-1/que-es-ecc/', '/nivel-1/piezas/', '/nivel-1/como-se-relacionan/', '/nivel-1/comprobar/'],
  'nivel-2': ['/nivel-2/elegir/', '/nivel-2/planificar/', '/nivel-2/construir-y-probar/',
    '/nivel-2/revisar-y-entregar/', '/nivel-2/escenarios/'],
  'nivel-3': ['/nivel-3/el-flujo-completo/', '/nivel-3/de-la-idea-al-plan/', '/nivel-3/implementar-con-tdd/',
    '/nivel-3/revisar-y-entregar/', '/nivel-3/otros-caminos/'],
};
const guides = Object.values(levelGuides).flat();
const pages = ['/', ...guides];
const practices = ['/nivel-1/comprobar/', '/nivel-2/escenarios/', '/nivel-3/revisar-y-entregar/'];
const documents = new Map();
let output;
let probe;

async function load(route) {
  try {
    return parseHTML(await readFile(path.join(output, route, 'index.html'), 'utf8')).document;
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

before(async () => {
  await mkdir('.cache', { recursive: true });
  output = await mkdtemp(path.resolve('.cache/test-site-'));
  const eleventy = new Eleventy('src', output, {
    configPath: 'eleventy.config.js',
    source: 'cli',
    quietMode: true,
    config: config => config.addTemplate('sonda-seguridad.md',
      '# Prueba\n\n<script>alert(1)</script>\n\n[Enlace](javascript:alert(1))', {
        layout: 'guide.njk',
        title: 'Título </title><script>alert(1)</script>',
        description: 'Descripción" onload="alert(1)',
      }),
  });
  await eleventy.write();
  for (const route of pages) {
    const document = await load(route);
    if (document) documents.set(route, document);
  }
  probe = await load('/sonda-seguridad/');
});

after(async () => {
  if (output) await rm(output, { recursive: true, force: true });
});

test('el principiante puede abrir la portada y las guías de los niveles 1, 2 y 3', () => {
  for (const route of pages) assert.ok(documents.has(route), `Falta la página ${route}`);
});

test('el recorrido cruza de un nivel al siguiente y vuelve a la portada al final de lo publicado', () => {
  assert.deepEqual(availableGuides().map(guide => guide.url), guides);
  assert.equal(pathNeighbors(guides[0]).previous.url, '/');
  assert.equal(pathNeighbors(guides[1]).previous.url, guides[0]);
  assert.equal(pathNeighbors(guides[1]).next.url, guides[2]);
  assert.equal(pathNeighbors(guides[1]).next.label, undefined);
  const lastOfLevel1 = levelGuides['nivel-1'].at(-1);
  assert.equal(pathNeighbors(lastOfLevel1).next.url, levelGuides['nivel-2'][0]);
  assert.equal(pathNeighbors(lastOfLevel1).next.label, 'Siguiente nivel');
  assert.equal(pathNeighbors(levelGuides['nivel-2'][0]).previous.url, lastOfLevel1);
  assert.equal(pathNeighbors(guides.at(-1)).next.url, '/');
  assert.equal(pathNeighbors(guides.at(-1)).next.label, 'Fin de lo publicado');
  assert.equal(pathNeighbors('/no-existe/').next.url, '/');
  assert.deepEqual(guideLevel(guides[2]), { id: 'nivel-1', number: '1', title: 'Conceptos', total: '04' });
  assert.deepEqual(guideLevel(levelGuides['nivel-3'][0]), { id: 'nivel-3', number: '3', title: 'Flujos de trabajo', total: '05' });
  assert.equal(guideLevel('/no-existe/'), undefined);
});

test('cada guía tiene un único h1 y enlaza a la guía anterior y la siguiente', () => {
  guides.forEach((route, index) => {
    const document = documents.get(route);
    assert.equal(document.querySelectorAll('h1').length, 1, `${route} debe tener un h1`);
    const turn = document.querySelector('nav[aria-label="Continuar el recorrido"]');
    assert.ok(turn, `${route} no tiene navegación de recorrido`);
    const links = [...turn.querySelectorAll('a')].map(link => link.getAttribute('href'));
    assert.deepEqual(links, [guides[index - 1] ?? '/', guides[index + 1] ?? '/']);
  });
});

test('la guía de piezas explica las seis piezas de ECC y termina con un glosario', () => {
  const headings = [...documents.get('/nivel-1/piezas/').querySelectorAll('h2')].map(h => h.textContent.trim());
  for (const piece of ['Agentes', 'Skills', 'Comandos', 'Hooks', 'Rules', 'MCP']) {
    assert.ok(headings.some(heading => heading.startsWith(piece)), `Falta la pieza ${piece}`);
  }
  assert.ok(documents.get('/nivel-1/piezas/').getElementById('glosario'), 'Falta el glosario');
});

test('la práctica de cada nivel termina con una autoevaluación', () => {
  for (const route of practices) {
    const document = documents.get(route);
    assert.ok(document.getElementById('cuando-has-terminado'), `${route} no tiene autoevaluación`);
    assert.ok(document.querySelectorAll('#cuando-has-terminado ~ ul li').length >= 3, `${route} tiene una autoevaluación vacía`);
  }
});

test('el nivel 2 propone al menos diez escenarios, cada uno con su respuesta plegada', () => {
  const scenarios = [...documents.get('/nivel-2/escenarios/').querySelectorAll('details.scenario')];
  assert.ok(scenarios.length >= 10, `Solo hay ${scenarios.length} escenarios`);
  for (const scenario of scenarios) {
    assert.ok(scenario.querySelector('summary')?.textContent.trim(), 'Un escenario no tiene pregunta');
    assert.match(scenario.querySelector('.answer')?.textContent ?? '', /ecc:|tdd-workflow|verification-loop/,
      'Un escenario no nombra la pieza de ECC que responde');
  }
});

test('el flujo completo del nivel 3 se explica con un diagrama accesible', () => {
  const diagram = documents.get('/nivel-3/el-flujo-completo/').querySelector('figure.diagram svg[role="img"]');
  assert.ok(diagram, 'Falta el diagrama del flujo');
  assert.ok(diagram.querySelector('title')?.textContent.trim());
});

test('cada página declara la versión de ECC que documenta', () => {
  for (const [route, document] of documents) {
    assert.match(document.querySelector('footer').textContent, new RegExp(`ECC ${site.eccVersion.replaceAll('.', '\\.')}`), route);
  }
});

test('los niveles en preparación se anuncian sin enlaces rotos', () => {
  const generated = new Set(pages);
  for (const [route, document] of documents) {
    for (const link of document.querySelectorAll('a[href^="/"]')) {
      const target = link.getAttribute('href').split('#')[0];
      if (target.startsWith('/assets/')) continue;
      assert.ok(generated.has(target), `${route} enlaza a ${target}, que no existe`);
    }
  }
  const upcoming = site.levels.filter(level => level.status !== 'disponible');
  assert.deepEqual(upcoming.map(level => level.id), ['nivel-4']);
  const home = documents.get('/');
  for (const level of upcoming) {
    const card = home.getElementById(level.id);
    assert.ok(card, `La portada no muestra el ${level.id}`);
    assert.match(card.textContent, /Próximamente/);
    assert.equal(card.querySelector('a'), null);
  }
});

test('cada enlace con ancla apunta a un id que existe en la página de destino', () => {
  for (const [route, document] of documents) {
    for (const link of document.querySelectorAll('a[href*="#"]')) {
      const [target, fragment] = link.getAttribute('href').split('#');
      const destination = target === '' ? document : documents.get(target);
      assert.ok(destination, `${route} enlaza a ${target}, que no existe`);
      assert.ok(destination.getElementById(fragment), `${route} enlaza a #${fragment}, que no existe en ${target || route}`);
    }
  }
});

test('el manual funciona sin recursos remotos ni JavaScript', async () => {
  const remote = /^(https?:)?\/\//;
  for (const [route, document] of documents) {
    assert.equal(document.querySelectorAll('script').length, 0, `${route} carga scripts`);
    for (const element of document.querySelectorAll('[href], [src]')) {
      const url = element.getAttribute('href') ?? element.getAttribute('src');
      assert.doesNotMatch(url, remote, `${route} apunta a un recurso remoto: ${url}`);
    }
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    assert.match(csp.getAttribute('content'), /script-src 'none'/);
  }
  const css = await readFile(path.join(output, 'assets/styles.css'), 'utf8');
  assert.doesNotMatch(css, /url\(|@import/, 'La hoja de estilos carga recursos externos');
});

test('la miga de pan de cada guía sale de site.json', () => {
  for (const level of site.levels.filter(candidate => candidate.status === 'disponible')) {
    assert.deepEqual(level.guides.map(guide => guide.url), levelGuides[level.id]);
    level.guides.forEach(guide => {
      const eyebrow = documents.get(guide.url).querySelector('.guide-header .eyebrow').textContent;
      assert.match(eyebrow, new RegExp(`Nivel ${level.number} · ${level.title}`));
      assert.match(eyebrow, new RegExp(`Guía ${guide.number} de ${String(level.guides.length).padStart(2, '0')}`));
    });
  }
});

test('el Markdown no puede inyectar HTML ni enlaces javascript y los metadatos se escapan', () => {
  assert.ok(probe, 'No se generó la sonda de seguridad');
  assert.equal(probe.querySelectorAll('script').length, 0);
  assert.equal(probe.querySelectorAll('a[href^="javascript:"]').length, 0);
  assert.equal(probe.querySelector('meta[name="description"]').getAttribute('onload'), null);
  assert.match(probe.querySelector('title').textContent, /<\/title><script>/);
});
