// DESIGN.md es la fuente de verdad: Storybook lo lee en lugar de duplicar el texto.
import raw from '../../DESIGN.md?raw';

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Cuerpo Markdown de DESIGN.md sin el front matter YAML. */
export const designMdBody: string = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');

/**
 * Devuelve el texto de un componente: la sección `### <nombre>` dentro de `## Components`
 * (sin el encabezado). Falla de forma visible si el componente no está documentado.
 */
export function componentDoc(name: string): string {
  let inComponents = false;
  let collecting = false;
  const out: string[] = [];
  for (const line of designMdBody.split(/\r?\n/)) {
    if (/^## /.test(line)) {
      if (collecting) break;
      inComponents = /^## Components\s*$/.test(line);
      continue;
    }
    if (!inComponents) continue;
    if (/^### /.test(line)) {
      if (collecting) break;
      collecting = norm(line.slice(4)) === norm(name);
      continue;
    }
    if (collecting) out.push(line);
  }
  const text = out.join('\n').trim();
  if (!text) throw new Error(`DESIGN.md no documenta el componente "${name}" en "## Components".`);
  return text;
}
