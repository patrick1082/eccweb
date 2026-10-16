import { test, expect } from '@playwright/test';
import site from '../src/_data/site.json' with { type: 'json' };

const routes = ['/', ...site.levels.flatMap(level => level.guides.map(guide => guide.url))];

test('recorrido completo del nivel 1 desde la portada hasta la autoevaluación', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ECC');
  await page.getByRole('link', { name: 'Empezar desde cero' }).click();
  await expect(page).toHaveURL(/\/nivel-1\/que-es-ecc\/$/);
  const turn = page.getByRole('navigation', { name: 'Continuar el recorrido' });
  await turn.getByRole('link', { name: /Las seis piezas/ }).click();
  await expect(page.getByRole('heading', { name: 'Glosario', exact: true })).toBeVisible();
  await turn.getByRole('link', { name: /Cómo se relacionan/ }).click();
  await expect(page.getByRole('img', { name: /comando.*skill.*agente/i })).toBeVisible();
  await turn.getByRole('link', { name: /Comprobar mi ECC/ }).click();
  await expect(page.getByRole('heading', { name: 'Cuándo has terminado' })).toBeVisible();
  await turn.getByRole('link', { name: /Siguiente nivel.*Elegir el comando adecuado/ }).click();
  await expect(page).toHaveURL(/\/nivel-2\/elegir\/$/);
  await expect(page.getByText('Nivel 2 · Comandos esenciales')).toBeVisible();
});

test('los escenarios del nivel 2 se responden con el teclado y sin JavaScript', async ({ page }) => {
  await page.goto('/nivel-2/escenarios/');
  const first = page.locator('details.scenario').first();
  await expect(first.locator('.answer')).toBeHidden();
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(first.locator('.answer')).toBeVisible();
  await expect(first.locator('.answer')).toContainText('/ecc:plan-prd');
});

test('el nivel 3 enlaza el flujo completo con las prácticas y termina en la portada', async ({ page }) => {
  await page.goto('/nivel-3/el-flujo-completo/');
  await expect(page.getByRole('img', { name: /PRD, plan, TDD, revisión, commit y entrega/ })).toBeVisible();
  const turn = page.getByRole('navigation', { name: 'Continuar el recorrido' });
  await turn.getByRole('link', { name: /De la idea al plan/ }).click();
  await expect(page.getByText('/ecc:plan-prd programa que recibe un texto')).toBeVisible();
  await page.goto('/nivel-3/otros-caminos/');
  await turn.getByRole('link', { name: /Fin de lo publicado/ }).click();
  await expect(page).toHaveURL(/\/$/);
});

test('el teclado permite saltar al contenido y usar el menú móvil', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Saltar al contenido' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const menu = page.locator('.mobile-navigation summary');
  await menu.focus();
  await page.keyboard.press('Enter');
  await page.getByRole('navigation', { name: 'Índice móvil' })
    .getByRole('link', { name: /Las seis piezas/ }).click();
  await expect(page).toHaveURL(/\/nivel-1\/piezas\/$/);
});

test('ninguna página provoca desplazamiento horizontal', async ({ page }) => {
  for (const width of [320, 375, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      expect(fits, `${route} se desborda a ${width}px`).toBe(true);
    }
  }
});

test('la estética es oscura con acentos naranjas, al estilo de Claude Code', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/nivel-1/piezas/');
  const colors = await page.evaluate(() => {
    const rgb = value => value.match(/\d+/g).slice(0, 3).map(Number);
    return {
      background: rgb(getComputedStyle(document.body).backgroundColor),
      text: rgb(getComputedStyle(document.body).color),
      link: rgb(getComputedStyle(document.querySelector('main .eyebrow a')).color),
    };
  });
  expect(Math.max(...colors.background)).toBeLessThan(40);
  expect(Math.min(...colors.text)).toBeGreaterThan(220);
  const [red, green, blue] = colors.link;
  expect(red).toBeGreaterThan(green);
  expect(green).toBeGreaterThan(blue);
  expect(red).toBeGreaterThan(200);
});
