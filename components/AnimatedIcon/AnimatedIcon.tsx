import type { CSSProperties } from 'react';
import { cx } from '../../utils/cx';
import { animations, type AnimationName, type PathData } from './animations';
import './animated-icon.css';

export { animationNames, type AnimationName } from './animations';

/** Colores de cada cuadro → tokens (como las variables color/icon/* y color/bg/* de Figma). */
export const ANIMATION_FILLS: Record<string, string> = {
  p: 'var(--color-icon-primary)',
  s: 'var(--color-icon-surface)',
  a: 'var(--color-bg-accent)',
  b: 'var(--color-bg-brand)',
  g: 'var(--color-icon-accent)',
  c: 'var(--color-bg-canvas)',
  d: 'var(--color-icon-disabled)',
  t: 'var(--color-text-on-accent)',
};

export interface AnimatedIconProps {
  /** Animación del Style Guide 2025 (sección Other). */
  name: AnimationName;
  /** Segundos por ciclo completo, de 1 a 3. Por defecto 2. */
  duration?: number;
  /** Solo `trash`: muestra el cuadro Disabled (no se puede eliminar) y detiene la animación. En las demás se ignora. */
  disabled?: boolean;
  /** Texto accesible. Sin `label` la animación es decorativa (`aria-hidden`). */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

function Frame({ paths, spec, className, style }: { paths: PathData[]; spec: string; className?: string; style?: CSSProperties }) {
  return (
    <g className={className} style={style}>
      {spec.split(' ').map((item) => {
        const p = paths[Number(item.slice(0, -1))];
        const d = typeof p === 'string' ? p : p[0];
        return <path key={item} d={d} fillRule={typeof p === 'string' ? undefined : 'evenodd'} style={{ fill: ANIMATION_FILLS[item.slice(-1)] }} />;
      })}
    </g>
  );
}

/**
 * Figma: Animation/trash, Animation/margarita, Animation/megaphone y Animation/hourglass (32×32).
 * - margarita y hourglass: los cuadros cambian sin transición, en el orden del Style Guide, en bucle;
 *   hourglass además gira 90° en cada paso.
 * - trash y megaphone: quietos en el cuadro 1; al interactuar (hover, foco visible o toque del botón o
 *   enlace que los contiene, o del propio ícono) recorren sus cuadros una vez mientras crecen al 115 % y regresan.
 * Con reduce motion se muestra el cuadro 1, quieto.
 */
export function AnimatedIcon({ name, duration = 2, disabled = false, label, className, style }: AnimatedIconProps) {
  const data = animations[name];
  if (!data) return null;
  const seconds = Math.min(3, Math.max(1, duration));
  const off = disabled && 'disabled' in data;
  const n = data.frames.length;
  const interactive = 'interactive' in data;
  const mode = interactive ? 'chilis-animated-icon--interactive' : `chilis-animated-icon--loop chilis-animated-icon--frames-${n}`;
  return (
    <span
      className={cx('chilis-animated-icon', mode, off && 'chilis-animated-icon--disabled', className)}
      style={{ ['--chilis-anim-duration' as string]: `${seconds}s`, ...style }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg viewBox="0 0 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
        {off ? (
          <Frame paths={data.paths} spec={(data as { disabled: string }).disabled} />
        ) : (
          <g className={interactive ? 'chilis-animated-icon__pulse' : 'spin' in data ? 'chilis-animated-icon__spin' : undefined}>
            {data.frames.map((spec, i) => (
              <Frame
                key={i}
                paths={data.paths}
                spec={spec}
                className="chilis-animated-icon__frame"
                style={
                  interactive
                    ? { animationDuration: `calc(var(--chilis-anim-duration) / ${n})`, animationDelay: `calc(var(--chilis-anim-duration) * ${i / n})` }
                    : { animationDelay: `calc(var(--chilis-anim-duration) * ${-(n - i) / n})` }
                }
              />
            ))}
          </g>
        )}
      </svg>
    </span>
  );
}
