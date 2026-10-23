import type { ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { cx } from '../../utils/cx';
import './alert.css';

export type AlertType = 'success' | 'warning' | 'error' | 'loading';
export type AlertStyle = 'inline' | 'boxed' | 'banner';

const ICON: Record<AlertType, IconName> = { success: 'checkmark', warning: 'warning', error: 'error', loading: 'loading' };

export interface AlertProps {
  /** Figma: Type. */
  type?: AlertType;
  /** Figma: Style. Inline (sin caja), Boxed (borde 2px) o Banner (640×56). */
  variant?: AlertStyle;
  children: ReactNode;
}

/** Figma: Alert (Type × Style). El ícono y el texto comunican el estado, no solo el color. */
export function Alert({ type = 'success', variant = 'inline', children }: AlertProps) {
  return (
    <div
      className={cx('chilis-alert', `chilis-alert--${type}`, `chilis-alert--${variant}`)}
      role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
    >
      <Icon name={ICON[type]} size={24} />
      <p className="chilis-alert__msg">{children}</p>
    </div>
  );
}
