import type { ButtonHTMLAttributes } from 'react';
import './date-cell.css';

export interface DateCellProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Abreviatura del día en MAYÚSCULAS ("VIE"). */
  day: string;
  /** Número del día ("15"). */
  date: string;
  /** Figma: State = Selected. */
  selected?: boolean;
  /** Figma: State = Disabled (día sin disponibilidad). */
  disabled?: boolean;
}

/** Figma: Date Cell (88×96; Default, Selected, Disabled). */
export function DateCell({ day, date, selected, disabled, ...rest }: DateCellProps) {
  return (
    <button type="button" className="chilis-date" aria-pressed={!!selected} disabled={disabled} {...rest}>
      <span className="chilis-date__day">{day}</span>
      <span className="chilis-date__num">{date}</span>
    </button>
  );
}
