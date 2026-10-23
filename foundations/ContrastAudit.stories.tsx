import type { Meta, StoryObj } from '@storybook/react-vite';
import data from './contrast-data.json';
import './docs.css';

type Row = [string, string, string, string, string, string, number, boolean];
const rows = data.all as Row[];
const short = (s: string) => s.replace('--color-', '').replace('--button-', 'button/');

function Table({ mode, kind }: { mode: string; kind: string }) {
  const r = rows.filter((x) => x[0] === mode && x[1] === kind);
  return (
    <table>
      <thead>
        <tr><th>Par (primer plano / fondo)</th><th>Muestra</th><th>Ratio</th><th>Resultado</th></tr>
      </thead>
      <tbody>
        {r.map((x, i) => (
          <tr key={i}>
            <td><code>{short(x[2])}</code> / <code>{short(x[3])}</code></td>
            <td><span style={{ background: x[5], color: x[4], padding: '2px 10px', borderRadius: 4, border: '1px solid rgba(128,128,128,.4)', fontWeight: 700 }}>Aa</span></td>
            <td>{x[6]}:1</td>
            <td style={{ color: x[7] ? 'inherit' : '#ba161d', fontWeight: x[7] ? 400 : 800 }}>{x[7] ? 'Pasa' : 'No pasa'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Audit() {
  const fails = data.fails as [string, string, string, string, string, string, number][];
  return (
    <div className="fd">
      <p className="note">
        Calculado con la fórmula WCAG 2.1 sobre los valores de <code>tokens.css</code>. Objetivo AA: texto 4.5:1, componentes y bordes de campos 3:1.
        Los estados deshabilitados están exentos. Los logotipos están exentos.
      </p>
      <h2>Resumen de pares que no pasan ({fails.length} de {rows.length})</h2>
      <table>
        <thead><tr><th>Modo</th><th>Par</th><th>Ratio</th><th>¿Se usa hoy?</th></tr></thead>
        <tbody>
          {fails.map((f, i) => {
            const used =
              /border-default/.test(f[2]) ? 'Sí: borde de Input, Dropdown, OTP' :
              /border-warning|icon-warning/.test(f[2]) ? 'Sí: Alert Warning (el ícono y el texto acompañan)' :
              /icon-accent/.test(f[2]) ? 'Parcial: íconos con relleno cilantro y contorno azul' :
              /border-brand/.test(f[2]) ? 'No: el borde brand es el mismo color del relleno' :
              /text-success/.test(f[2]) ? 'No: se usa sobre canvas (Table Card Libre)' :
              'No se usa hoy en esa combinación';
            return (
              <tr key={i}>
                <td>{f[0]}</td>
                <td><code>{short(f[2])}</code> / <code>{short(f[3])}</code></td>
                <td>{f[6]}:1</td>
                <td>{used}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>Cambios aplicados en Light (Figma 1.2.0 y código)</h2>
      <table>
        <thead><tr><th>Token</th><th>Antes</th><th>Ahora</th><th>Ratio resultante</th></tr></thead>
        <tbody>
          <tr><td><code>color/border/default</code> (Light)</td><td>gray-4 #A19F9A (2.64:1 sobre blanco)</td><td>ext/gray-6 #6F6D68 (ya existía)</td><td>5.17:1 sobre blanco · 4.83:1 sobre surface</td></tr>
          <tr><td><code>color/text/brand</code> (Light)</td><td>chilis-red-aa #E81B23 (4.25:1 sobre surface)</td><td>alert/error #BA161D (ya existía)</td><td>6.52:1 sobre blanco · 6.09:1 sobre surface</td></tr>
        </tbody>
      </table>
      <p className="note">En Dark no cambia ningún valor. En Light, <code>text/brand</code> y <code>text/error</code> ahora comparten color.</p>
      <h2>Pendientes (decisión de marca / diseño)</h2>
      <table>
        <thead><tr><th>Token</th><th>Hoy</th><th>Propuesta</th><th>Ratio resultante</th></tr></thead>
        <tbody>
          <tr><td><code>color/border/warning</code> e <code>icon/warning</code> (Light)</td><td>#FFA724 (1.94:1)</td><td>Borde ámbar más oscuro, p. ej. #A85F00; el ícono conserva su relleno y contorno azul</td><td>4.88:1 sobre blanco</td></tr>
          <tr><td><code>color/text/success</code> (Dark) sobre surface</td><td>cilantro #749E33 (3.78:1)</td><td>Si se usa sobre surface, ext/cilantro-light #86B240</td><td>4.79:1</td></tr>
        </tbody>
      </table>
      <h2>Estados seleccionados en Dark (aplicado en Figma y en código)</h2>
      <p className="note">
        Antes, en Figma, los estados seleccionados de <b>Chip, Date Cell, Time Slot y Table Card · Bill</b> usaban <code>bg/night</code> con <code>text/on-night</code>. En Dark, <code>bg/night</code> es igual al lienzo, así que
        el estado seleccionado se vuelve indistinguible del no seleccionado. En código se usa <code>bg/inverse</code> con <code>text/inverse</code>: en Light vale exactamente lo mismo (night / blanco), en Dark es blanco con
        texto azul noche. Este mismo enlace de variables ya está aplicado en Figma (1.2.0).
      </p>
      {['Light', 'Dark'].map((m) => (
        <div key={m}>
          <h2>{m} · texto (4.5:1)</h2>
          <Table mode={m} kind="Texto 4.5:1" />
          <h2>{m} · no texto (3:1)</h2>
          <Table mode={m} kind="No texto 3:1" />
        </div>
      ))}
    </div>
  );
}

const meta = { title: 'Foundations/Auditoría de contraste', component: Audit, parameters: { layout: 'padded' } } satisfies Meta<typeof Audit>;
export default meta;
export const AA: StoryObj<typeof meta> = {};
