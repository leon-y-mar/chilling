import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { cx } from '../../utils/cx';
import { useControllable } from '../../utils/useControllable';
import './checkbox.css';

export interface ChoiceBaseProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'checked' | 'defaultChecked'> {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

interface InternalProps extends ChoiceBaseProps {
  kind: 'checkbox' | 'radio' | 'toggle';
  icons: { off: IconName; on: IconName; offDisabled: IconName; onDisabled: IconName };
}

/** Base compartida de Checkbox, Radio y Toggle: fila gap 12, ícono de 32px + etiqueta Medium 16. */
export function ChoiceControl({ kind, icons, label, checked, defaultChecked = false, onChange, disabled, className, id, ...rest }: InternalProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const [on, setOn] = useControllable<boolean>(checked, defaultChecked, onChange);
  const name: IconName = disabled ? (on ? icons.onDisabled : icons.offDisabled) : on ? icons.on : icons.off;
  return (
    <label htmlFor={inputId} className={cx('chilis-choice', disabled && 'chilis-choice--disabled', className)}>
      <input
        id={inputId}
        className="chilis-choice__input"
        type={kind === 'radio' ? 'radio' : 'checkbox'}
        role={kind === 'toggle' ? 'switch' : undefined}
        checked={on}
        disabled={disabled}
        onChange={(e) => setOn(e.target.checked)}
        {...rest}
      />
      <span className={cx('chilis-choice__icon', kind === 'toggle' && 'chilis-choice__icon--toggle')}>
        <Icon name={name} size={32} />
      </span>
      {label !== undefined && <span>{label}</span>}
    </label>
  );
}

export type CheckboxProps = ChoiceBaseProps;

/** Figma: Checkbox (Selected Sí/No × Disabled Sí/No). */
export function Checkbox(props: CheckboxProps) {
  return (
    <ChoiceControl
      kind="checkbox"
      icons={{ off: 'checkbox-unselected', on: 'checkbox-selected', offDisabled: 'checkbox-unselected-disabled', onDisabled: 'checkbox-selected-disabled' }}
      {...props}
    />
  );
}
