import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './chip.css';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  /** Figma: Selected. */
  selected?: boolean;
}

/** Figma: Chip. Pestaña/filtro en forma de píldora (categorías del menú, filtros de mesas). */
export function Chip({ label, selected = false, className, ...rest }: ChipProps) {
  return (
    <button type="button" aria-pressed={selected} className={cx('chilis-chip', className)} {...rest}>
      {label}
    </button>
  );
}
