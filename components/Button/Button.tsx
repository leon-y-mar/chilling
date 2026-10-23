import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { cx } from '../../utils/cx';
import './button.css';

export type ButtonStyle = 'offset' | 'flat' | 'outlined' | 'link';
export type ButtonColor = 'red' | 'blue' | 'ranch' | 'yellow';
export type ButtonSize = 'large' | 'small';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /** Figma: Style. Offset (sombra desplazada 4px), Flat, Outlined o Link. */
  variant?: ButtonStyle;
  /** Figma: Color. Outlined y Link solo admiten red y blue. */
  color?: ButtonColor;
  /** Figma: Size. Large (padding 16/24, alto 48) o Small (12/16, alto 40). En tablet 56/48. */
  size?: ButtonSize;
  /** Ícono opcional de 24px antes de la etiqueta. */
  leadingIcon?: IconName;
  /** Ícono opcional de 24px después de la etiqueta. */
  trailingIcon?: IconName;
  /** Fuerza el aspecto Hover/Pressed (solo documentación). Pressed = Hover. */
  forceHover?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'offset',
  color = 'red',
  size = 'large',
  leadingIcon,
  trailingIcon,
  forceHover,
  fullWidth,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const content = (
    <>
      {leadingIcon && <Icon name={leadingIcon} size={24} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={24} />}
    </>
  );
  return (
    <button
      type={type}
      className={cx(
        'chilis-btn',
        `chilis-btn--${variant}`,
        `chilis-btn--${color}`,
        size === 'small' && 'chilis-btn--small',
        fullWidth && 'chilis-btn--full',
        forceHover && 'is-hover',
        className,
      )}
      {...rest}
    >
      {variant === 'link' ? <span className="chilis-btn__content">{content}</span> : content}
    </button>
  );
}
