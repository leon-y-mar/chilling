import type { CSSProperties } from 'react';
import { cx } from '../../utils/cx';
import type { PathData } from '../AnimatedIcon/animations';
import { illustrations, type IllustrationName } from './illustrations';
import './illustration.css';

export { illustrationNames, type IllustrationName } from './illustrations';

const OUTLINE_FILLS: Record<string, string> = {
  p: 'var(--color-icon-primary)',
  s: 'var(--color-icon-surface)',
  c: 'var(--color-bg-canvas)',
  u: 'var(--color-bg-surface)',
};

export interface IllustrationProps {
  /** Ilustración del Style Guide 2025. */
  name: IllustrationName;
  /** `color`: fija en Light y Dark (`color-illustration-*`) · `outline`: colores de ícono, cambia con el modo. */
  variant?: 'color' | 'outline';
  /** Texto accesible. Sin `label` es decorativa (`aria-hidden`). */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const pathProps = (p: PathData) => (typeof p === 'string' ? { d: p } : { d: p[0], fillRule: 'evenodd' as const });

/**
 * Figma: Illustration/free-chips-and-salsa, 1-tap-reorder, personalized-rewards y birthday-dessert (Style × 56).
 * La versión a color recolorea el dibujo del ícono con los tokens color-illustration-*.
 */
export function Illustration({ name, variant = 'color', label, className, style }: IllustrationProps) {
  const data = illustrations[name];
  if (!data) return null;
  const outline = data.outline.split(' ');
  return (
    <span
      className={cx('chilis-illustration', className)}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg viewBox="0 0 56 56" width="100%" height="100%" focusable="false" aria-hidden="true">
        {variant === 'outline'
          ? data.paths.map((p, i) => <path key={i} {...pathProps(p)} style={{ fill: OUTLINE_FILLS[outline[i]] }} />)
          : data.color.map(([i, token]) => (
              <path key={i} {...pathProps(data.paths[i])} style={{ fill: `var(--color-illustration-${token})` }} />
            ))}
      </svg>
    </span>
  );
}
