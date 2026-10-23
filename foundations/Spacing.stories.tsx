import type { Meta, StoryObj } from '@storybook/react-vite';
import './docs.css';

const spacing = [0, 4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 96, 120];
const radius = [0, 4, 8, 16, 24, 32, 48, 100];
const borders: [string, number][] = [['xsmall', 1], ['small', 2], ['medium', 3], ['large', 5], ['xlarge', 8]];
const sizing = [
  ['touch-min', '44', '48'],
  ['icon', '32', '32'],
  ['icon-sm', '24', '24'],
  ['button-min-height-lg', '48', '56'],
  ['button-min-height-sm', '40', '48'],
  ['input-height', '48', '56'],
  ['row-height', '56', '64'],
  ['dropdown-option-height', '48', '56'],
  ['modal-width-sm', '480', '560'],
  ['modal-width-lg', '720', '720'],
];
const layout = [
  ['viewport', '1440', '820', '390'],
  ['columns', '12', '8', '4'],
  ['gutter', '24', '24', '16'],
  ['margin', '80', '40', '16'],
  ['max-content', '1280', '740', '358'],
];

function Spacing() {
  return (
    <div className="fd">
      <h2>Spacing · <code>--sp-*</code></h2>
      <table>
        <tbody>
          {spacing.map((s) => (
            <tr key={s}>
              <td style={{ width: 120 }}><code>--sp-{s}</code></td>
              <td style={{ width: 60 }}>{s}px</td>
              <td><span className="fd-bar" style={{ width: Math.max(s, 1) }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Radius · <code>--br-*</code></h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {radius.map((r) => (
          <div key={r} style={{ textAlign: 'center', fontSize: 12 }}>
            <div style={{ width: 80, height: 80, border: '2px solid var(--color-border-strong)', borderRadius: Math.min(r, 40) === r ? r : 40, background: 'var(--color-bg-surface)' }} />
            <code>--br-{r}</code>
            <div>{r === 100 ? 'píldora' : `${r}px`}</div>
          </div>
        ))}
      </div>
      <p className="note">Botones y chips: 100 (píldora). Campos, alertas y celdas: 8. Tarjetas y resúmenes: 16. Modales: 8. No mezclar esquinas redondeadas y rectas en la misma vista.</p>
      <h2>Border width · <code>--bw-*</code></h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {borders.map(([n, w]) => (
          <div key={n} style={{ textAlign: 'center', fontSize: 12 }}>
            <div style={{ width: 80, height: 56, border: `${w}px solid var(--color-border-strong)`, borderRadius: 8 }} />
            <code>--bw-{n}</code>
            <div>{w}px</div>
          </div>
        ))}
      </div>
      <h2>Sizing · <code>--size-*</code> (modos Web / Tablet)</h2>
      <p className="note">Aplica <code>data-sizing="tablet"</code> a un contenedor para activar el modo Tablet.</p>
      <table>
        <thead><tr><th>Token</th><th>Web</th><th>Tablet</th></tr></thead>
        <tbody>{sizing.map(([n, w, t]) => <tr key={n}><td><code>--size-{n}</code></td><td>{w}</td><td>{t}</td></tr>)}</tbody>
      </table>
      <h2>Layout · <code>--layout-*</code> (Desktop / Tablet / Mobile)</h2>
      <p className="note">Breakpoints reales (media queries): <b>Desktop</b> ≥ 1024px · <b>Tablet</b> 600–1023px · <b>Mobile</b> ≤ 599px. Los valores de la tabla son el ancho de diseño de cada modo (1440 · 820 · 390), no el breakpoint. La tipografía h1/h2 cambia solo en Mobile.</p>
      <table>
        <thead><tr><th>Token</th><th>Desktop</th><th>Tablet</th><th>Mobile</th></tr></thead>
        <tbody>{layout.map(([n, d, t, m]) => <tr key={n}><td><code>--layout-{n}</code></td><td>{d}</td><td>{t}</td><td>{m}</td></tr>)}</tbody>
      </table>
      <h2>Motion</h2>
      <table>
        <tbody>
          <tr><td><code>--duration-fast</code></td><td>0.15s</td></tr>
          <tr><td><code>--duration-base</code></td><td>0.25s</td></tr>
          <tr><td><code>--ease-standard</code></td><td>cubic-bezier(0.2, 0, 0, 1)</td></tr>
        </tbody>
      </table>
    </div>
  );
}

const meta = { title: 'Foundations/Spacing, Radius & Sizing', component: Spacing, parameters: { layout: 'padded' } } satisfies Meta<typeof Spacing>;
export default meta;
export const Scales: StoryObj<typeof meta> = {};
