import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import site from '../src/_data/site.json' with { type: 'json' };

const pluginRoot = process.env.ECC_PLUGIN_ROOT
  ?? path.join(os.homedir(), '.claude/plugins/cache/ecc/ecc', site.eccVersion);

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function sourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter(entry => entry.isFile() && /\.(md|njk)$/.test(entry.name))
    .map(entry => path.join(entry.parentPath, entry.name));
}

/** Every `/ecc:name` (command or skill) and bare `ecc:name` (agent or skill) cited in the manual. */
async function citedPieces() {
  const commands = new Map();
  const agents = new Map();
  for (const file of await sourceFiles('src')) {
    const text = await readFile(file, 'utf8');
    for (const [, slash, name] of text.matchAll(/(\/?)\becc:([a-z0-9][a-z0-9-]*)/g)) {
      const target = slash ? commands : agents;
      if (!target.has(name)) target.set(name, path.relative('.', file));
    }
  }
  return { commands, agents };
}

test('cada comando, skill y agente de ECC citado en el manual existe en la versión documentada', async t => {
  if (!(await exists(pluginRoot))) {
    t.skip(`No se encuentra ECC ${site.eccVersion} en ${pluginRoot}; define ECC_PLUGIN_ROOT para contrastar`);
    return;
  }
  const { commands, agents } = await citedPieces();
  assert.ok(commands.size > 0, 'El manual no cita ningún comando /ecc:');
  const missing = [];
  for (const [name, file] of commands) {
    const found = await exists(path.join(pluginRoot, 'commands', `${name}.md`))
      || await exists(path.join(pluginRoot, 'skills', name, 'SKILL.md'));
    if (!found) missing.push(`/ecc:${name} (${file})`);
  }
  for (const [name, file] of agents) {
    const found = await exists(path.join(pluginRoot, 'agents', `${name}.md`))
      || await exists(path.join(pluginRoot, 'skills', name, 'SKILL.md'));
    if (!found) missing.push(`ecc:${name} (${file})`);
  }
  assert.deepEqual(missing, [], `Piezas citadas que no existen en ECC ${site.eccVersion}`);
});

test('lo que el manual llama «skill» existe como skill y no solo como comando', async t => {
  if (!(await exists(pluginRoot))) {
    t.skip(`No se encuentra ECC ${site.eccVersion} en ${pluginRoot}`);
    return;
  }
  const named = new Map();
  for (const file of await sourceFiles('src')) {
    const text = await readFile(file, 'utf8');
    for (const [, name] of text.matchAll(/skills?\s+(?:<code>|`)([a-z0-9][a-z0-9-]*)/gi)) {
      if (!named.has(name)) named.set(name, path.relative('.', file));
    }
  }
  assert.ok(named.has('tdd-workflow'), 'El manual debería presentar tdd-workflow como skill');
  const notSkills = [];
  for (const [name, file] of named) {
    if (!(await exists(path.join(pluginRoot, 'skills', name, 'SKILL.md')))) notSkills.push(`${name} (${file})`);
  }
  assert.deepEqual(notSkills, [], 'Se presentan como skill piezas que no lo son');
});
