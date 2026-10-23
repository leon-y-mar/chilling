import { useId, type InputHTMLAttributes } from 'react';
import { Icon } from '../../icons/Icon';
import { cx } from '../../utils/cx';
import './input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  /** Muestra la insignia "Required" (fondo accent). */
  required?: boolean;
  /** Muestra el ícono de ayuda de 16px junto a la etiqueta. */
  showHelpIcon?: boolean;
  helperText?: string;
  /** Figma: Destructive. Borde 2px de error y helper en color de error. */
  error?: boolean;
  /** Fuerza el aspecto Focused (solo documentación). */
  forceFocus?: boolean;
  requiredLabel?: string;
}

export function Input({
  label,
  required,
  showHelpIcon,
  helperText,
  error,
  forceFocus,
  disabled,
  className,
  id,
  requiredLabel = 'Required',
  ...rest
}: InputProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const helperId = `${inputId}-helper`;
  return (
    <div className={cx('chilis-field', error && 'chilis-field--error', disabled && 'chilis-field--disabled', className)}>
      {(label || required) && (
        <div className="chilis-field__label-row">
          {label && (
            <label className="chilis-field__label" htmlFor={inputId}>
              {label}
            </label>
          )}
          {showHelpIcon && <Icon name="tooltip" size={16} label="Ayuda" />}
          {required && <span className="chilis-field__badge">{requiredLabel}</span>}
        </div>
      )}
      <input
        id={inputId}
        className={cx('chilis-input', forceFocus && 'is-focused')}
        disabled={disabled}
        required={required}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? helperId : undefined}
        {...rest}
      />
      {helperText && (
        <p id={helperId} className="chilis-field__helper" role={error ? 'alert' : undefined}>
          {helperText}
        </p>
      )}
    </div>
  );
}
