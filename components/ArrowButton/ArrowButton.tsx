import type { ButtonHTMLAttributes } from 'react';
import { Icon } from '../../icons/Icon';
import { cx } from '../../utils/cx';
import './arrow-button.css';

export interface ArrowButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma: Direction. */
  direction?: 'left' | 'right';
  /** Obligatorio: es un botón solo con ícono. */
  'aria-label': string;
  /** Fuerza el aspecto Hover (solo documentación). */
  forceHover?: boolean;
}

/** Figma: Arrow Button (48px; Default = arrow-outline, Hover = arrow-circle). */
export function ArrowButton({ direction = 'right', forceHover, className, ...rest }: ArrowButtonProps) {
  const d = direction === 'left' ? 'l' : 'r';
  return (
    <button type="button" className={cx('chilis-arrow', forceHover && 'is-hover', className)} {...rest}>
      <Icon name={`arrow-outline-${d}` as 'arrow-outline-l'} size={48} className="is-default-icon" />
      <Icon name={`arrow-circle-${d}` as 'arrow-circle-l'} size={48} className="is-hover-icon" />
    </button>
  );
}
