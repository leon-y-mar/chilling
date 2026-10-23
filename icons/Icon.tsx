import type { CSSProperties } from 'react';
import type { IconDef } from './icon-types';
import { svgsA } from './svgs-a';
import { svgsB } from './svgs-b';
import { svgsC } from './svgs-c';

const defs = { ...svgsA, ...svgsB, ...svgsC };

/** Nombres de Figma (Assets · Icon/*, Style Guide 2025). */
export type CanonicalIconName = keyof typeof defs;

/**
 * Nombres anteriores, se mantienen como alias temporales (deprecados).
 * Usa el nombre nuevo: el alias se quitará en una próxima versión.
 */
export const ICON_ALIASES = {
  help: 'tooltip',
  eye: 'view-password',
  'eye-off': 'hide-password',
  phone: 'mobile-phone',
  'checkbox-disabled': 'checkbox-unselected-disabled',
  'radio-disabled': 'radio-unselected-disabled',
} as const satisfies Record<string, CanonicalIconName>;

export type IconName = CanonicalIconName | keyof typeof ICON_ALIASES;

/** Los nombres oficiales, ordenados (sin alias). */
export const iconNames = (Object.keys(defs) as CanonicalIconName[]).sort();

/** Token de Figma → variable CSS: icon-primary → var(--color-icon-primary); alert-error → var(--alert-error). */
const cssVar = (token: string) => `var(--${/^(icon|bg|text|border)-/.test(token) ? 'color-' : ''}${token})`;

function toSvg([size, ...paths]: IconDef, width: string | number = size, height: string | number = size): string {
  const body = paths
    .map(([d, fill, stroke]) => {
      const f = fill ? ` fill="${cssVar(fill)}"` : '';
      const s = stroke ? ` stroke="${cssVar(stroke)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"` : '';
      return `<path d="${d}"${f}${s}/>`;
    })
    .join('');
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

const resolve = (name: IconName): CanonicalIconName => (ICON_ALIASES as Record<string, CanonicalIconName>)[name] ?? (name as CanonicalIconName);

/** SVG de cada ícono con sus colores ya enlazados a tokens (`var(--color-icon-*)`, `var(--color-bg-*)`…). */
export const rawIcons = Object.fromEntries(iconNames.map((n) => [n, toSvg(defs[n])])) as Record<CanonicalIconName, string>;

export interface IconProps {
  name: IconName;
  /** Tamaño en px. Style Guide 2025: 16, 24, 32 (por defecto) y 48 (`size-icon-xs`, `-sm`, `size-icon`, `-lg`). */
  size?: number;
  /** Texto accesible. Si se omite, el ícono es decorativo (aria-hidden). */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 32, label, className, style }: IconProps) {
  const def = defs[resolve(name)] as IconDef | undefined;
  if (!def) return null;
  return (
    <span
      className={['chilis-icon', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: toSvg(def, '100%', '100%') }}
    />
  );
}
