#!/usr/bin/env node
// Verifica que DESIGN.md (fuente de verdad) y el código no se desvíen.
//   npm run design:check
// Sale con código 1 si encuentra errores. No usa red ni dependencias salvo `yaml`.
import fs from 'node:fs';
import path from 'node:path';
import {
  COMPONENTS_DIR, DIMENSION_PREFIXES, FONT_VAR, ROLE_MAP, TYPE_SIZE_VAR,
  aliasTarget, layers, normalizeName, readDesignMd, readTokensCss, resolve,
} from './design-md-lib.mjs';

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const { front, body } = readDesignMd();
const scopes = readTokensCss();
const { light, dark } = layers(scopes);
const isHex = (v) => /^#[0-9a-f]{3,8}$/i.test(String(v ?? ''));
const hexEq = (a, b) => String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
const norm = (v) => String(v).trim();

/* ------------------------------------------------------------ secciones MD */
const ORDER = ['Overview', 'Brand & Style', 'Colors', 'Typography', 'Layout', 'Layout & Spacing', 'Elevation & Depth', 'Elevation', 'Shapes', 'Components', "Do's and Don'ts"];
const RANK = { Overview: 0, 'Brand & Style': 0, Colors: 1, Typography: 2, Layout: 3, 'Layout & Spacing': 3, 'Elevation & Depth': 4, Elevation: 4, Shapes: 5, Components: 6, "Do's and Don'ts": 7 };
const sections = {};
{
  let current = null;
  const seen = new Set();
  let lastRank = -1;
  for (const line of body.split(/\r?\n/)) {
    const m = line.match(/^## (.+?)\s*$/);
    if (m) {
      current = m[1];
      if (seen.has(current)) err(`Sección duplicada: "${current}" (la spec rechaza el archivo).`);
      seen.add(current);
      sections[current] = [];
      if (current in RANK) {
        if (RANK[current] < lastRank) err(`Sección "${current}" fuera de orden. Orden de la spec: ${ORDER.join(' → ')}.`);
        lastRank = Math.max(lastRank, RANK[current]);
      }
      continue;
    }
    if (current) sections[current].push(line);
  }
}
const sec = (name) => (sections[name] ?? []).join('\n');
for (const required of ['Overview', 'Colors', 'Typography', 'Layout', 'Shapes', 'Components', "Do's and Don'ts"]) {
  if (!(required in sections)) err(`Falta la sección "## ${required}".`);
}

/* ---------------------------------------------------------------- colors */
const colors = front.colors ?? {};
const cssColorNames = (map, only) => Object.keys(only ?? map).filter((k) => isHex(resolve(k, map)));
for (const [key, value] of Object.entries(colors)) {
  if (key in ROLE_MAP) {
    const real = resolve(ROLE_MAP[key], light);
    if (!hexEq(value, real)) err(`colors.${key} = ${value}, pero ${ROLE_MAP[key]} vale ${real} en tokens.css.`);
    continue;
  }
  const isDark = key.startsWith('dark-');
  const name = isDark ? key.slice(5) : key;
  const map = isDark ? dark : light;
  const real = resolve(name, map);
  if (real === undefined) err(`colors.${key}: --${name} no existe en tokens.css${isDark ? ' (Dark)' : ''}.`);
  else if (!hexEq(value, real)) err(`colors.${key} = ${value}, pero tokens.css${isDark ? ' (Dark)' : ''} resuelve ${real}.`);
}
for (const name of cssColorNames(light)) {
  if (!(name in colors)) err(`--${name} (${resolve(name, light)}) está en tokens.css pero falta en colors de DESIGN.md.`);
}
for (const name of cssColorNames(dark, scopes.dark)) {
  if (!(`dark-${name}` in colors)) err(`--${name} está declarado en Dark pero falta colors.dark-${name} en DESIGN.md.`);
}

/* ------------------------------------------------- spacing / rounded / type */
const spacing = front.spacing ?? {};
for (const [key, value] of Object.entries(spacing)) {
  if (!DIMENSION_PREFIXES.some((p) => key.startsWith(p))) { warn(`spacing.${key}: prefijo no reconocido, no se verifica.`); continue; }
  const real = scopes.base[key];
  if (real === undefined) err(`spacing.${key}: --${key} no existe en tokens.css.`);
  else if (norm(value) !== norm(real)) err(`spacing.${key} = ${value}, pero tokens.css (Desktop/Web) tiene ${real}.`);
}
for (const key of Object.keys(scopes.base)) {
  if (DIMENSION_PREFIXES.some((p) => key.startsWith(p)) && !(key in spacing)) err(`--${key} está en tokens.css pero falta en spacing de DESIGN.md.`);
}
const rounded = front.rounded ?? {};
for (const [key, value] of Object.entries(rounded)) {
  const real = scopes.base[key];
  if (real === undefined) err(`rounded.${key}: --${key} no existe en tokens.css.`);
  else if (norm(value) !== norm(real)) err(`rounded.${key} = ${value}, pero tokens.css tiene ${real}.`);
}
for (const key of Object.keys(scopes.base)) {
  if (key.startsWith('br-') && !(key in rounded)) err(`--${key} está en tokens.css pero falta en rounded de DESIGN.md.`);
}
const typography = front.typography ?? {};
for (const [key, t] of Object.entries(typography)) {
  const v = TYPE_SIZE_VAR[key];
  if (!v) { warn(`typography.${key}: sin variable asociada en TYPE_SIZE_VAR, no se verifica el tamaño.`); }
  else if (norm(t.fontSize) !== norm(scopes.base[v] ?? '')) err(`typography.${key}.fontSize = ${t.fontSize}, pero --${v} vale ${scopes.base[v]}.`);
  const fv = FONT_VAR[t.fontFamily];
  if (!fv) err(`typography.${key}.fontFamily = "${t.fontFamily}" no es Dirk ni Montserrat.`);
  else if (!(scopes.base[fv] ?? '').replace(/['"]/g, '').startsWith(t.fontFamily)) err(`typography.${key}: --${fv} no empieza por ${t.fontFamily}.`);
}
for (const [key, v] of Object.entries(TYPE_SIZE_VAR)) {
  if (!(key in typography)) err(`Falta typography.${key} en DESIGN.md (existe --${v}).`);
}

/* ----------------------------------------------------- tablas en el cuerpo */
const rows = (text) => text.split('\n').filter((l) => l.startsWith('|')).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
const tick = (c) => (c.match(/^`([^`]+)`$/) || [])[1];

// 1) Mapeo semántico (Light/Dark): cada fila `token | alias Light | alias Dark`.
{
  const seen = new Set();
  for (const r of rows(sec('Colors'))) {
    const [token, l, d] = r.map(tick);
    if (!token || !l || !d || !(token.startsWith('color-') || token.startsWith('button-'))) continue;
    seen.add(token);
    if (aliasTarget(token, light) !== l) err(`Colors · tabla: ${token} Light = ${l}, pero tokens.css apunta a ${aliasTarget(token, light)}.`);
    if (aliasTarget(token, dark) !== d) err(`Colors · tabla: ${token} Dark = ${d}, pero tokens.css apunta a ${aliasTarget(token, dark)}.`);
  }
  for (const k of Object.keys(light)) {
    if ((k.startsWith('color-') || k.startsWith('button-')) && aliasTarget(k, light) && !seen.has(k)) err(`Colors · tabla: falta la fila de ${k}.`);
  }
}

// 2) Tipografía: la fila de cada estilo debe llevar su tamaño (px) y su interlineado.
for (const r of rows(sec('Typography'))) {
  const key = tick(r[0] ?? '');
  const t = key && typography[key];
  if (!t) continue;
  const text = r.slice(1).join(' | ');
  if (!text.includes(`${parseFloat(t.fontSize)} px`)) err(`Typography · tabla: la fila ${key} no muestra el tamaño ${parseFloat(t.fontSize)} px.`);
  if (!r.some((c) => c === String(t.lineHeight))) err(`Typography · tabla: la fila ${key} no muestra el interlineado ${t.lineHeight}.`);
}

// 3) Layout: breakpoints (Desktop/Tablet/Mobile) y sizing Web/Tablet.
{
  const num = (s) => parseFloat(String(s).replace(/[^\d.]/g, ''));
  const expect = {
    Desktop: scopes.base,
    Tablet: { ...scopes.base, ...scopes.mediaTablet },
    Mobile: { ...scopes.base, ...scopes.mediaTablet, ...scopes.mediaMobile },
  };
  for (const r of rows(sec('Layout'))) {
    if (expect[r[0]]) {
      const m = expect[r[0]];
      const want = [m['layout-viewport'], m['layout-columns'], m['layout-gutter'], m['layout-margin'], m['layout-max-content']].map(num);
      const got = r.slice(1, 6).map(num);
      if (want.some((w, i) => w !== got[i])) err(`Layout · breakpoints: la fila ${r[0]} tiene [${got}] y tokens.css da [${want}] (viewport, columnas, gutter, margen, ancho máx.).`);
    }
    const key = tick(r[0] ?? '');
    if (key && key.startsWith('size-')) {
      const web = scopes.base[key];
      const tablet = (scopes.tablet[key] ?? scopes.base[key]);
      if (web === undefined) { err(`Layout · sizing: --${key} no existe.`); continue; }
      if (num(r[1]) !== num(web)) err(`Layout · sizing: ${key} Web = ${r[1]}, tokens.css tiene ${web}.`);
      if (num(r[2]) !== num(tablet)) err(`Layout · sizing: ${key} Tablet = ${r[2]}, tokens.css tiene ${tablet}.`);
    }
  }
}

// 4) Movimiento: los valores de tokens.css deben aparecer en la prosa de Elevation & Depth.
{
  const prose = sec('Elevation & Depth') + sec('Elevation');
  for (const k of ['duration-fast', 'duration-base', 'ease-standard']) {
    const v = scopes.base[k];
    if (v && !prose.replace(/\s+/g, ' ').includes(v.replace(/\s+/g, ' '))) err(`Elevation & Depth: no aparece el valor de --${k} (${v}).`);
  }
}

/* -------------------------------------------------------------- componentes */
const componentsText = sec('Components');
const compSections = {};
{
  let cur = null;
  for (const line of componentsText.split('\n')) {
    const m = line.match(/^### (.+?)\s*$/);
    if (m) { cur = m[1]; compSections[cur] = []; continue; }
    if (cur) compSections[cur].push(line);
  }
}
const byNorm = Object.fromEntries(Object.keys(compSections).map((k) => [normalizeName(k), k]));
const PROPS_FILE = { Radio: 'Checkbox', Toggle: 'Checkbox' };
const NO_USAGE = new Set(['Logo', 'Icon']);
const EXTRA_HEADINGS = new Set(['Icon', 'Cómo agregar un componente']);
for (const dir of fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const heading = byNorm[normalizeName(dir)];
  if (!heading) { err(`Components: el componente ${dir} no tiene sección "### ${dir}" en DESIGN.md.`); continue; }
  const text = compSections[heading].join('\n');
  if (!NO_USAGE.has(dir)) {
    if (!/^#### Cuándo usarlo\s*$/m.test(text)) err(`Components · ${heading}: falta "#### Cuándo usarlo".`);
    if (!/^#### Cuándo no usarlo\s*$/m.test(text)) err(`Components · ${heading}: falta "#### Cuándo no usarlo".`);
  }
  const props = (text.match(/^\*\*Props:\*\*\s*(.+)$/m) || [])[1];
  if (!props) { if (!NO_USAGE.has(dir) || dir === 'Logo') err(`Components · ${heading}: falta la línea "**Props:** …".`); continue; }
  const owner = PROPS_FILE[dir] ?? dir;
  const file = path.join(COMPONENTS_DIR, owner, `${owner}.tsx`);
  const src = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  for (const p of [...props.matchAll(/`([\w]+)`/g)].map((m) => m[1])) {
    if (!new RegExp(`\\b${p}\\??\\s*:`).test(src)) err(`Components · ${heading}: la prop \`${p}\` no existe en ${path.relative(COMPONENTS_DIR, file)}.`);
  }
}
for (const heading of Object.keys(compSections)) {
  if (!fs.existsSync(path.join(COMPONENTS_DIR, [...fs.readdirSync(COMPONENTS_DIR)].find((d) => normalizeName(d) === normalizeName(heading)) ?? '__none__')) && !EXTRA_HEADINGS.has(heading)) {
    warn(`Components: "### ${heading}" no corresponde a ninguna carpeta en src/components.`);
  }
}

/* ------------------------------------------- referencias en components (YAML) */
{
  const refs = [];
  const walk = (o, where) => {
    if (typeof o === 'string') for (const m of o.matchAll(/\{([\w.-]+)\}/g)) refs.push([where, m[1]]);
    else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) walk(v, `${where}.${k}`);
  };
  walk(front.components ?? {}, 'components');
  for (const [where, ref] of refs) {
    const [group, ...rest] = ref.split('.');
    const target = front[group]?.[rest.join('.')];
    if (target === undefined) err(`${where}: la referencia {${ref}} no existe.`);
  }
}

/* -------------------------------------------------------------------- salida */
for (const w of warnings) console.warn(`  aviso  ${w}`);
if (errors.length) {
  console.error(`\nDESIGN.md no coincide con el código (${errors.length} problema${errors.length > 1 ? 's' : ''}):\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error('\nDESIGN.md es la fuente de verdad: corrige el código o, si el cambio es intencional, actualiza DESIGN.md (y Figma) primero.');
  process.exit(1);
}
console.log(`DESIGN.md OK · ${Object.keys(colors).length} colores, ${Object.keys(spacing).length} dimensiones, ${Object.keys(rounded).length} radios, ${Object.keys(typography).length} estilos, ${Object.keys(compSections).length} componentes.`);
