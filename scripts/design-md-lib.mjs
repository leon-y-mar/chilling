// Utilidades compartidas para leer DESIGN.md y src/tokens/tokens.css.
// Sin dependencias salvo `yaml` (devDependency).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const DESIGN_MD = path.join(ROOT, 'DESIGN.md');
export const TOKENS_CSS = path.join(ROOT, 'src/tokens/tokens.css');
export const COMPONENTS_DIR = path.join(ROOT, 'src/components');

/* ---------------------------------------------------------------- tokens.css */

function splitBlocks(css) {
  const src = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks = [];
  const walk = (str, ctx) => {
    let pos = 0;
    while (pos < str.length) {
      const open = str.indexOf('{', pos);
      if (open < 0) break;
      const selector = str.slice(pos, open).trim();
      let depth = 1;
      let j = open + 1;
      while (depth && j < str.length) {
        if (str[j] === '{') depth++;
        else if (str[j] === '}') depth--;
        j++;
      }
      const body = str.slice(open + 1, j - 1);
      if (selector.startsWith('@media')) walk(body, selector);
      else blocks.push({ selector, ctx, body });
      pos = j;
    }
  };
  walk(src, null);
  return blocks;
}

function declarations(body) {
  const out = {};
  for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

/** Devuelve las declaraciones de tokens.css agrupadas por ámbito. */
export function readTokensCss(file = TOKENS_CSS) {
  const blocks = splitBlocks(fs.readFileSync(file, 'utf8'));
  const scopes = { base: {}, light: {}, dark: {}, tablet: {}, mediaTablet: {}, mediaMobile: {} };
  for (const { selector, ctx, body } of blocks) {
    const decl = declarations(body);
    if (ctx && ctx.includes('1023')) Object.assign(scopes.mediaTablet, decl);
    else if (ctx && ctx.includes('599')) Object.assign(scopes.mediaMobile, decl);
    else if (selector.includes("data-theme='dark'") || selector.includes('data-theme="dark"')) Object.assign(scopes.dark, decl);
    else if (selector.includes('data-theme')) Object.assign(scopes.light, decl);
    else if (selector.includes('data-sizing')) Object.assign(scopes.tablet, decl);
    else if (selector === ':root') Object.assign(scopes.base, decl);
  }
  return scopes;
}

/** Resuelve `var(--x)` de forma recursiva dentro de un mapa de declaraciones. */
export function resolve(name, map, seen = new Set()) {
  const raw = map[name];
  if (raw === undefined) return undefined;
  const m = raw.match(/^var\(--([\w-]+)\)$/);
  if (!m) return raw;
  if (seen.has(name)) throw new Error(`Alias circular en --${name}`);
  seen.add(name);
  return resolve(m[1], map, seen);
}

/** Nombre del token al que apunta un alias directo (`var(--x)` → `x`), o null si es un valor literal. */
export function aliasTarget(name, map) {
  const m = (map[name] ?? '').match(/^var\(--([\w-]+)\)$/);
  return m ? m[1] : null;
}

export function layers(scopes) {
  const light = { ...scopes.base, ...scopes.light };
  const dark = { ...light, ...scopes.dark };
  return { light, dark };
}

/* ------------------------------------------------------------------ DESIGN.md */

export function readDesignMd(file = DESIGN_MD) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) throw new Error('DESIGN.md no tiene front matter YAML al inicio.');
  return { text, front: parseYaml(m[1]), body: text.slice(m[0].length) };
}

/** Quita el front matter y devuelve solo el cuerpo Markdown. */
export function stripFrontMatter(text) {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

export const normalizeName = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/* --------------------------------------------------- correspondencias fijas */

/** Roles de color recomendados por la spec de DESIGN.md → token real (valor Light). */
export const ROLE_MAP = {
  primary: 'brand-chilis-red-aa',
  secondary: 'brand-thursday-night',
  tertiary: 'brand-sunrise',
  neutral: 'ext-gray-6',
  surface: 'color-bg-surface',
  'on-surface': 'color-text-primary',
  error: 'alert-error',
};

/** Estilo tipográfico (DESIGN.md `typography`) → variable de tamaño en tokens.css (valor Desktop). */
export const TYPE_SIZE_VAR = {
  h1: 'type-h1-size',
  h2: 'type-h2-size',
  h3: 'type-h3-size',
  h4: 'type-h4-size',
  h5: 'type-h5-size',
  h6: 'type-h6-size',
  'pricing-large': 'type-pricing-large-size',
  'pricing-medium': 'type-pricing-medium-size',
  'pricing-small': 'type-pricing-small-size',
  'label-large': 'type-label-large-size',
  'label-small': 'type-label-small-size',
  'button-label': 'type-button-size',
  'paragraph-xlarge': 'type-paragraph-xlarge-size',
  'paragraph-large': 'type-paragraph-large-size',
  'paragraph-medium': 'type-paragraph-medium-size',
  'paragraph-small': 'type-paragraph-small-size',
  'paragraph-xsmall': 'type-paragraph-xsmall-size',
};

/** Familias tipográficas: nombre en DESIGN.md → variable en tokens.css. */
export const FONT_VAR = { Dirk: 'font-display', Montserrat: 'font-body' };

/** Prefijos de tokens dimensionales que viven en `spacing` (todos los demás tipos tienen su propio mapa). */
export const DIMENSION_PREFIXES = ['sp-', 'bw-', 'size-', 'layout-'];
