import type { Meta, StoryObj } from '@storybook/react-vite';
import './docs.css';

type Row = { name: string; family: 'display' | 'body'; weight: number; size: string; lh: number; ls?: string; upper?: boolean; sample: string; spec: string };

const rows: Row[] = [
  { name: 'Headings/h1', family: 'display', weight: 900, size: 'var(--type-h1-size)', lh: 0.9, ls: '0.02em', upper: true, sample: 'Big Mouth', spec: 'Dirk Black · 64 (móvil 50) · 0.9 · +2%' },
  { name: 'Headings/h2', family: 'display', weight: 900, size: 'var(--type-h2-size)', lh: 0.92, ls: '0.02em', upper: true, sample: 'Nuestro menú', spec: 'Dirk Black · 48 (móvil 44) · 0.92 · +2%' },
  { name: 'Headings/h3', family: 'body', weight: 800, size: 'var(--type-h3-size)', lh: 1.25, sample: 'Mesas', spec: 'Montserrat ExtraBold · 28 · 1.25' },
  { name: 'Headings/h4', family: 'display', weight: 900, size: 'var(--type-h4-size)', lh: 0.9, ls: '0.02em', upper: true, sample: 'Tu pedido', spec: 'Dirk Black · 28 · 0.9 · +2%' },
  { name: 'Headings/h5', family: 'body', weight: 800, size: 'var(--type-h5-size)', lh: 1.4, sample: 'Pedido · Mesa 12', spec: 'Montserrat ExtraBold · 20 · 1.4' },
  { name: 'Headings/h6', family: 'display', weight: 900, size: 'var(--type-h6-size)', lh: 1.2, ls: '0.02em', upper: true, sample: 'Promociones', spec: 'Dirk Black · 22 · 1.2 · +2%' },
  { name: 'Pricing/large', family: 'display', weight: 900, size: 'var(--type-pricing-large-size)', lh: 1.2, ls: '0.02em', sample: 'S/ 39.90', spec: 'Dirk Black · 20 · 1.2 · +2%' },
  { name: 'Pricing/medium', family: 'display', weight: 900, size: 'var(--type-pricing-medium-size)', lh: 1.2, ls: '0.02em', sample: 'S/ 39.90', spec: 'Dirk Black · 18 · 1.2 · +2%' },
  { name: 'Pricing/small', family: 'display', weight: 900, size: 'var(--type-pricing-small-size)', lh: 1.25, ls: '0.02em', sample: 'S/ 39.90', spec: 'Dirk Black · 16 · 1.25 · +2%' },
  { name: 'Labels/label-large', family: 'body', weight: 700, size: 'var(--type-label-large-size)', lh: 1.2, sample: 'Fecha', spec: 'Montserrat Bold · 16 · 1.2' },
  { name: 'Labels/label-small', family: 'body', weight: 700, size: 'var(--type-label-small-size)', lh: 1.2, sample: 'Required', spec: 'Montserrat Bold · 12 · 1.2' },
  { name: 'Buttons/button-label', family: 'body', weight: 800, size: 'var(--type-button-size)', lh: 1.2, upper: true, sample: 'Checkout', spec: 'Montserrat ExtraBold · 14 · 1.2 · MAYÚSCULAS' },
  { name: 'Buttons/text-link-inline', family: 'body', weight: 700, size: '16px', lh: 1.4, sample: 'Ver términos y condiciones', spec: 'Montserrat Bold · 16 · 1.4' },
];
const paragraphs: [string, string][] = [
  ['Paragraph XLarge', '28px'],
  ['Paragraph Large', '18px'],
  ['Paragraph Medium', '16px'],
  ['Paragraph Small', '14px'],
  ['Paragraph XSmall', '12px'],
];
const weights: [number, string][] = [
  [500, 'Medium'],
  [600, 'SemiBold'],
  [700, 'Bold'],
  [800, 'ExtraBold'],
];

function Typography() {
  return (
    <div className="fd">
      <p className="note">
        Dos familias: <b>Dirk Black</b> (titulares, precios, números de mesa; interlineado ajustado y +2% de espaciado) y <b>Montserrat</b> 500/600/700/800 (todo lo demás).
        Cuerpo base 16px / 1.4. H1 y H2 reducen tamaño en móvil (modo Mobile de la variable). Precios con el formato peruano <code>S/ 39.90</code>.
      </p>
      <table>
        <thead>
          <tr><th>Estilo</th><th>Muestra</th><th>Especificación</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td><code>{r.name}</code></td>
              <td>
                <span
                  style={{
                    fontFamily: r.family === 'display' ? 'var(--font-display)' : 'var(--font-body)',
                    fontWeight: r.weight,
                    fontSize: r.size,
                    lineHeight: r.lh,
                    letterSpacing: r.ls,
                    textTransform: r.upper ? 'uppercase' : undefined,
                  }}
                >
                  {r.sample}
                </span>
              </td>
              <td>{r.spec}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Párrafos (Montserrat · interlineado 1.4)</h2>
      <table>
        <thead>
          <tr><th>Tamaño</th>{weights.map(([w, n]) => <th key={w}>{w} {n}</th>)}</tr>
        </thead>
        <tbody>
          {paragraphs.map(([name, size]) => (
            <tr key={name}>
              <td><code>{name}</code> · {size}</td>
              {weights.map(([w]) => (
                <td key={w}><span style={{ fontWeight: w, fontSize: size, lineHeight: 1.4 }}>Chili's</span></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="note">XSmall incluye además “700 Bold Uppercase” (etiquetas) y “700 Bold Underline”.</p>
      <h2>Aviso sobre Dirk</h2>
      <p className="note">
        El archivo incluido es <b>DirkTrial-Black.otf</b> (versión de prueba): <b>verifica la licencia antes de publicar el repositorio</b> y no incluye <code>ñ</code>,
        <code> á</code> ni <code>¿</code>. Con la fuente final, comprueba los titulares en español (“NUESTRO MENÚ”).
      </p>
    </div>
  );
}

const meta = { title: 'Foundations/Typography', component: Typography, parameters: { layout: 'padded' } } satisfies Meta<typeof Typography>;
export default meta;
export const Styles: StoryObj<typeof meta> = {};
