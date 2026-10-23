import type { CSSProperties } from 'react';
import { cx } from '../../utils/cx';
import { faqFills, faqPaths, type FaqColor, type FaqShape, type FaqSize, type FaqVariant } from './faq-paths';
import './faq-badge.css';

export type { FaqColor, FaqShape, FaqSize, FaqVariant } from './faq-paths';

const FILLS: Record<string, string> = {
  p: 'var(--color-icon-primary)',
  s: 'var(--color-icon-surface)',
  a: 'var(--color-bg-accent)',
  b: 'var(--color-bg-brand)',
  g: 'var(--color-icon-accent)',
  t: 'var(--color-text-on-accent)',
};

export interface FaqBadgeProps {
  /** Forma: insignia festoneada (`badge`) o círculo. */
  shape?: FaqShape;
  /** `outline`: relleno claro y trazo de color · `filled`: relleno de color. */
  variant?: FaqVariant;
  /** Color de la forma: night (azul noche), sunrise (amarillo), red (rojo), cilantro (verde). */
  color?: FaqColor;
  /** Tamaño en px. Cada tamaño tiene su propio dibujo en el Style Guide (no es un escalado). */
  size?: FaqSize;
  className?: string;
  style?: CSSProperties;
}

/**
 * Figma: FAQ/night, FAQ/sunrise, FAQ/red y FAQ/cilantro (Shape × Style × Size).
 * Marca de preguntas frecuentes. Es decorativa: el texto que la acompaña lleva el mensaje.
 */
export function FaqBadge({ shape = 'badge', variant = 'outline', color = 'night', size = 32, className, style }: FaqBadgeProps) {
  const paths = faqPaths[shape]?.[size];
  const fills = faqFills[color]?.[`${shape}-${variant}`];
  if (!paths || !fills) return null;
  const f = fills.split(' ');
  return (
    <span className={cx('chilis-faq-badge', className)} style={{ width: size, height: size, ...style }} aria-hidden="true">
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" focusable="false">
        {paths.map((d, i) => (
          <path key={i} d={d} style={{ fill: FILLS[f[i]] }} />
        ))}
      </svg>
    </span>
  );
}
