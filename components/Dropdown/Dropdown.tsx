import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Icon } from '../../icons/Icon';
import { cx } from '../../utils/cx';
import { useControllable } from '../../utils/useControllable';
import '../Input/input.css';
import './dropdown.css';

export interface DropdownOptionData {
  value: string;
  label: string;
}

export interface DropdownOptionProps {
  label: string;
  /** Figma: State = Selected (fondo hover + ícono checkmark de 20px). */
  selected?: boolean;
  /** Fuerza el aspecto Hover (solo documentación). */
  forceHover?: boolean;
  active?: boolean;
  onSelect?: () => void;
  id?: string;
}

/** Figma: Dropdown Option (alto 48; Default, Hover, Selected). */
export function DropdownOption({ label, selected, forceHover, active, onSelect, id }: DropdownOptionProps) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={!!selected}
      className={cx('chilis-option', forceHover && 'is-hover', active && 'is-active')}
      onClick={onSelect}
    >
      <span>{label}</span>
      {selected && <Icon name="checkmark" size={20} />}
    </li>
  );
}

export interface DropdownProps {
  label?: string;
  required?: boolean;
  showHelpIcon?: boolean;
  helperText?: string;
  placeholder?: string;
  options: DropdownOptionData[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Figma: Destructive (solo Rest y Selected). */
  error?: boolean;
  disabled?: boolean;
  /** Figma: State = Expanded (panel abierto de entrada). */
  defaultOpen?: boolean;
  /** Muestra el panel en flujo normal (solo documentación). */
  staticPanel?: boolean;
  requiredLabel?: string;
}

export function Dropdown({
  label,
  required,
  showHelpIcon,
  helperText,
  placeholder = 'Select',
  options,
  value,
  defaultValue,
  onChange,
  error,
  disabled,
  defaultOpen = false,
  staticPanel,
  requiredLabel = 'Required',
}: DropdownProps) {
  const [selected, setSelected] = useControllable<string | undefined>(value, defaultValue, onChange as (v: string | undefined) => void);
  const [open, setOpen] = useState(defaultOpen);
  const [activeIdx, setActiveIdx] = useState(0);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === selected);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const choose = (v: string) => {
    setSelected(v);
    setOpen(false);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIdx((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      choose(options[activeIdx].value);
    }
  };

  return (
    <div className={cx('chilis-field', error && 'chilis-field--error', disabled && 'chilis-field--disabled')} ref={root}>
      {(label || required) && (
        <div className="chilis-field__label-row">
          {label && (
            <span className="chilis-field__label" id={`${id}-label`}>
              {label}
            </span>
          )}
          {showHelpIcon && <Icon name="tooltip" size={16} label="Ayuda" />}
          {required && <span className="chilis-field__badge">{requiredLabel}</span>}
        </div>
      )}
      <div className="chilis-dropdown">
        <button
          type="button"
          className={cx('chilis-dropdown__field', !current && 'is-placeholder')}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-controls={`${id}-list`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKey}
        >
          <span>{current ? current.label : placeholder}</span>
          <Icon name={open ? 'caret-outline-u' : 'caret-outline-d'} size={24} />
        </button>
        {open && (
          <ul id={`${id}-list`} role="listbox" className={cx('chilis-dropdown__panel', staticPanel && 'is-static')}>
            {options.map((o, i) => (
              <DropdownOption
                key={o.value}
                id={`${id}-opt-${i}`}
                label={o.label}
                selected={o.value === selected}
                active={i === activeIdx}
                onSelect={() => choose(o.value)}
              />
            ))}
          </ul>
        )}
      </div>
      {helperText && (
        <p className="chilis-field__helper" role={error ? 'alert' : undefined}>
          {helperText}
        </p>
      )}
    </div>
  );
}
