import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import { useControllable } from '../../utils/useControllable';
import '../Input/input.css';
import './otp-input.css';

export interface OtpInputProps {
  label?: string;
  helperText?: string;
  required?: boolean;
  requiredLabel?: string;
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Figma: Destructive Sí (no tiene Disabled). */
  error?: boolean;
  disabled?: boolean;
  /** Fuerza el foco visual en la primera celda vacía (solo documentación). */
  forceFocus?: boolean;
}

/** Figma: OTP Input (6 celdas; Rest, Focused, Filled, Disabled; Destructive). */
export function OtpInput({
  label = 'Código de verificación',
  helperText = 'Ingresa el código de 6 dígitos',
  required,
  requiredLabel = 'Required',
  length = 6,
  value,
  defaultValue = '',
  onChange,
  error,
  disabled,
  forceFocus,
}: OtpInputProps) {
  const [code, setCode] = useControllable<string>(value, defaultValue, onChange);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => code[i] ?? '');
  const focusIdx = forceFocus ? Math.min(code.length, length - 1) : -1;

  const put = (i: number, ch: string) => {
    const next = digits.slice();
    next[i] = ch;
    setCode(next.join('').slice(0, length));
  };
  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
  };
  const onPaste = (e: ClipboardEvent) => {
    const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (t) {
      e.preventDefault();
      setCode(t);
      refs.current[Math.min(t.length, length - 1)]?.focus();
    }
  };

  return (
    <div className={cx('chilis-field', error && 'chilis-field--error', disabled && 'chilis-field--disabled')}>
      <div className="chilis-field__label-row">
        <span className="chilis-field__label" id="otp-label">
          {label}
        </span>
        {required && <span className="chilis-field__badge">{requiredLabel}</span>}
      </div>
      <div className="chilis-otp" role="group" aria-labelledby="otp-label" onPaste={onPaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cx('chilis-otp__cell', i === focusIdx && 'is-focused')}
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={d}
            disabled={disabled}
            aria-label={`Dígito ${i + 1} de ${length}`}
            aria-invalid={error || undefined}
            onChange={(e) => {
              const ch = e.target.value.replace(/\D/g, '').slice(-1);
              put(i, ch);
              if (ch && i < length - 1) refs.current[i + 1]?.focus();
            }}
            onKeyDown={(e) => onKey(i, e)}
          />
        ))}
      </div>
      {helperText && (
        <p className="chilis-field__helper" role={error ? 'alert' : undefined}>
          {helperText}
        </p>
      )}
    </div>
  );
}
