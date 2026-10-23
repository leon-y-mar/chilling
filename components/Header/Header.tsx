import { Icon } from '../../icons/Icon';
import { Logo } from '../Logo/Logo';
import { cx } from '../../utils/cx';
import './header.css';

export interface HeaderProps {
  /** Figma: Breakpoint. Desktop 1440 / Mobile 390 (aquí ocupa el 100% del contenedor). */
  breakpoint?: 'desktop' | 'mobile';
  items?: { label: string; href?: string }[];
  onMenu?: () => void;
  onAccount?: () => void;
  onCart?: () => void;
  /** Productos en el carrito. Muestra el contador sobre el ícono: «0» si está vacío y «99+» desde 100. Sin valor, no hay contador. */
  cartCount?: number;
}

/** Texto del contador: 0–99 tal cual, desde 100 «99+». */
export function formatCartCount(count: number): string {
  const n = Math.max(0, Math.floor(count));
  return n > 99 ? '99+' : String(n);
}

const DEFAULT_ITEMS = [{ label: 'Menu' }, { label: 'Locations' }, { label: 'Rewards' }, { label: 'Reservations' }];

/** Figma: Header (alto 72, borde 1px divider). Desktop: logo · nav · cuenta · carrito. Mobile: menú · logo · cuenta · carrito. */
export function Header({ breakpoint = 'desktop', items = DEFAULT_ITEMS, onMenu, onAccount, onCart, cartCount }: HeaderProps) {
  const mobile = breakpoint === 'mobile';
  const hasCount = typeof cartCount === 'number';
  const n = hasCount ? Math.max(0, Math.floor(cartCount)) : 0;
  const cartLabel = hasCount ? `Carrito, ${n} ${n === 1 ? 'producto' : 'productos'}` : 'Carrito';
  return (
    <header className={cx('chilis-header', mobile && 'chilis-header--mobile')}>
      {mobile && (
        <button type="button" className="chilis-header__icon-btn" aria-label="Abrir menú" onClick={onMenu}>
          <Icon name="menu" />
        </button>
      )}
      <Logo size={96} />
      {mobile ? (
        <div className="chilis-header__spacer" />
      ) : (
        <nav className="chilis-header__nav" aria-label="Principal">
          {items.map((i) => (
            <a key={i.label} className="chilis-header__link" href={i.href ?? '#'}>
              {i.label}
            </a>
          ))}
        </nav>
      )}
      <button type="button" className="chilis-header__icon-btn" aria-label="Mi cuenta" onClick={onAccount}>
        <Icon name="account" />
      </button>
      <button type="button" className="chilis-header__icon-btn chilis-header__cart" aria-label={cartLabel} onClick={onCart}>
        <Icon name="cart" />
        {hasCount && (
          <span className="chilis-header__badge" aria-hidden="true">
            {formatCartCount(n)}
          </span>
        )}
      </button>
    </header>
  );
}
