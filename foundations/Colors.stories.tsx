import type { Meta, StoryObj } from '@storybook/react-vite';
import './docs.css';

const groups: Record<string, string[]> = {
  Background: ['canvas', 'surface', 'surface-warm', 'hover', 'disabled', 'inverse', 'brand', 'accent', 'night', 'error-subtle', 'scrim'],
  Text: ['primary', 'secondary', 'placeholder', 'disabled', 'inverse', 'on-brand', 'on-accent', 'on-night', 'brand', 'error', 'success', 'link'],
  Border: ['default', 'strong', 'divider', 'brand', 'error', 'success', 'warning', 'disabled'],
  Icon: ['primary', 'success', 'error', 'warning', 'disabled', 'accent', 'surface', 'surface-brand', 'surface-accent', 'surface-white'],
  Illustration: ['skin', 'skin-highlight', 'wood', 'chocolate-outline', 'chocolate', 'chocolate-drizzle', 'chocolate-glaze', 'outline', 'red', 'yellow', 'green', 'white', 'ranch', 'cream'],
  Payment: ['bg', 'border'],
};

const primitives: [string, string][] = [
  ['brand/chilis-red (solo logo)', '#ed1c24'],
  ['brand/chilis-red-AA', '#e81b23'],
  ['brand/cilantro', '#749e33'],
  ['brand/ranch', '#eeece7'],
  ['brand/thursday-night', '#22235b'],
  ['brand/sunrise', '#ffc60b'],
  ['gray/white', '#ffffff'],
  ['gray/1', '#f8f7f5'],
  ['gray/2', '#f3f2ee'],
  ['gray/3', '#d4d2cd'],
  ['gray/4', '#a19f9a'],
  ['gray/5', '#3c3a35'],
  ['gray/black', '#090702'],
  ['alert/success', '#5e8029'],
  ['alert/warning', '#ffa724'],
  ['alert/error', '#ba161d'],
  ['illustration/skin', '#f9ad73'],
  ['illustration/skin-highlight', '#fed2a4'],
  ['illustration/wood', '#ad6b3b'],
  ['illustration/chocolate-outline', '#2a0909'],
  ['illustration/chocolate', '#551818'],
  ['illustration/chocolate-drizzle', '#68332f'],
  ['illustration/chocolate-glaze', '#875d5a'],
  ['ext/gray-6', '#6f6d68'],
  ['ext/night-raised', '#2e2f72'],
  ['ext/night-deep', '#17184a'],
  ['ext/error-tint', '#f7e7e8'],
  ['ext/error-light', '#ff8a8e'],
  ['ext/scrim', '#09070299'],
];

function Theme({ mode }: { mode: 'light' | 'dark' }) {
  return (
    <div className="fd-theme" data-theme={mode}>
      <h3>Color · {mode === 'light' ? 'Light' : 'Dark (extensión propuesta)'}</h3>
      {Object.entries(groups).map(([g, names]) => (
        <div key={g}>
          <h4 style={{ margin: '16px 0 4px', fontSize: 12 }}>{g}</h4>
          {names.map((n) => {
            const v = `--color-${g === 'Background' ? 'bg' : g.toLowerCase()}-${n}`;
            return (
              <div className="fd-swatch" key={v}>
                <i style={{ background: `var(${v})` }} />
                <span>{g === 'Background' ? 'bg' : g.toLowerCase()}/{n}</span>
                <code>{v}</code>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Colors() {
  return (
    <div className="fd">
      <p className="note">
        Arquitectura: <b>Primitivas → Color semántico (Light/Dark por alias) → tokens de componente (<code>--button-*</code>)</b>. En código usa siempre el
        token semántico (<code>--color-*</code>), nunca la primitiva ni un hex. El modo oscuro es una <b>extensión propuesta</b>: la guía de marca 2025 solo define
        Light, así que Dark requiere revisión de marca. Cambia el tema con la barra de herramientas.
      </p>
      <div className="fd-themes">
        <Theme mode="light" />
        <Theme mode="dark" />
      </div>
      <h2>Primitivas</h2>
      <p className="note">No usar directamente en componentes. <code>ext/*</code> son extensiones fuera de la guía de marca. <code>illustration/*</code> son los colores propios de las ilustraciones a color (Style Guide 2025) y se usan con <code>--color-illustration-*</code>. El rojo #ED1C24 es solo del logo; la UI usa #E81B23 (AA).</p>
      <div className="fd-prim">
        {primitives.map(([n, hex]) => (
          <div key={n}>
            <i style={{ background: hex }} />
            <b>{n}</b>
            <br />
            <code>{hex}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = { title: 'Foundations/Colors', component: Colors, parameters: { layout: 'padded' } } satisfies Meta<typeof Colors>;
export default meta;
export const Tokens: StoryObj<typeof meta> = {};
