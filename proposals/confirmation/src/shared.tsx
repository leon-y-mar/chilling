import { useRef, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons/Icon';
import { Header } from '../../../components/Header/Header';
import { Button } from '../../../components/Button/Button';
import { useCopy, useIsMobile } from './hooks';
import { coupon, order, soles, stepCopy, steps, subtotal, total } from './data';

const NAV = [{ label: 'Menú' }, { label: 'Locales' }, { label: 'Rewards' }, { label: 'Reservas' }];

export function SiteHeader() {
  const mobile = useIsMobile();
  return <Header breakpoint={mobile ? 'mobile' : 'desktop'} items={NAV} cartCount={0} />;
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`cp-container ${className}`}>{children}</div>;
}

/** Sello de confirmación: círculo cilantro + check. El estado también se dice con texto. */
export function SuccessMark({ size = 56 }: { size?: number }) {
  return (
    <span className="cp-success" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="55%" height="55%">
        <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/**
 * Stepper etiquetado (Benchmark L02). `full`: horizontal con descripción del paso actual.
 * `compact`: solo puntos y etiquetas. `vertical`: lista para columnas angostas.
 */
export function Tracker({ step, variant = 'full' }: { step: number; variant?: 'full' | 'compact' | 'vertical' }) {
  return (
    <div className={`cp-tracker cp-tracker--${variant}`}>
      <ol className="cp-tracker__list" aria-label="Estado del pedido">
        {steps.map((label, i) => {
          const state = i < step ? 'done' : i === step ? 'current' : 'todo';
          return (
            <li key={label} className={`cp-tracker__step is-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
              <span className="cp-tracker__dot">{state === 'done' && <Icon name="checkmark" size={16} />}</span>
              <span className="cp-tracker__label">
                {label}
                <span className="chilis-sr-only">{state === 'done' ? ' (completado)' : state === 'current' ? ' (en curso)' : ' (pendiente)'}</span>
              </span>
            </li>
          );
        })}
      </ol>
      {variant === 'full' && (
        <p className="cp-tracker__msg" aria-live="polite">
          {stepCopy[step]}
        </p>
      )}
    </div>
  );
}

export function Eta({ size = 'lg', label = 'Llega en' }: { size?: 'lg' | 'md' | 'sm'; label?: string }) {
  return (
    <div className={`cp-eta cp-eta--${size}`}>
      <span className="cp-eyebrow">{label}</span>
      <span className="cp-eta__value">
        {order.etaMin}–{order.etaMax} <small>min</small>
      </span>
      <span className="cp-eta__window">
        <Icon name="clock" size={16} /> Aprox. {order.etaWindow}
      </span>
    </div>
  );
}

export function OrderLines() {
  return (
    <div className="cp-lines">
      <ul className="cp-lines__items">
        {order.items.map((i) => (
          <li key={i.name} className="cp-lines__item">
            <span className="cp-lines__thumb" aria-hidden="true">
              <Icon name="dine-in" size={24} />
            </span>
            <span className="cp-lines__name">
              <strong>
                {i.qty} × {i.name}
              </strong>
              <span>{i.note}</span>
            </span>
            <span className="cp-price">{soles(i.qty * i.unit)}</span>
          </li>
        ))}
      </ul>
      <dl className="cp-sum">
        <div>
          <dt>Subtotal</dt>
          <dd>{soles(subtotal)}</dd>
        </div>
        <div className="cp-sum__saving">
          <dt>Descuento</dt>
          <dd>− {soles(order.discount)}</dd>
        </div>
        <div>
          <dt>Envío</dt>
          <dd>{soles(order.delivery)}</dd>
        </div>
        <div className="cp-sum__total">
          <dt>Total pagado</dt>
          <dd>{soles(total)}</dd>
        </div>
      </dl>
    </div>
  );
}

const FACTS: { icon: IconName; label: string; value: string; sub?: string }[] = [
  { icon: 'terms', label: 'Pedido', value: `N° ${order.number}`, sub: order.placedAt },
  { icon: 'location', label: 'Entrega en', value: order.address },
  { icon: 'account', label: 'Cliente', value: order.fullName, sub: `Cel. ${order.phone}` },
  { icon: 'gift-card', label: 'Pago', value: order.payment },
];

export function OrderFacts({ only }: { only?: number[] }) {
  const list = only ? FACTS.filter((_, i) => only.includes(i)) : FACTS;
  return (
    <dl className="cp-facts">
      {list.map((f) => (
        <div key={f.label} className="cp-facts__row">
          <Icon name={f.icon} size={24} />
          <div>
            <dt>{f.label}</dt>
            <dd>
              {f.value}
              {f.sub && <span>{f.sub}</span>}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

/**
 * Código del cupón. El cupón ya queda guardado en la cuenta (se aplica solo en el checkout);
 * copiar es una acción secundaria para quien lo quiera compartir o usar en otro canal.
 */
export function CouponCode({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { copied, copy } = useCopy();
  const ref = useRef<HTMLElement>(null);
  return (
    <div className={`cp-code cp-code--${tone}`}>
      <span className="cp-code__label">Código</span>
      <code ref={ref} className="cp-code__value">
        {coupon.code}
      </code>
      <button type="button" className="cp-code__copy chilis-focusable" onClick={() => copy(coupon.code, ref.current)}>
        <Icon name={copied ? 'checkmark' : 'terms'} size={16} />
        {copied ? 'Copiado' : 'Copiar'}
      </button>
      <span className="chilis-sr-only" aria-live="polite">
        {copied ? 'Código copiado' : ''}
      </span>
    </div>
  );
}

export function CouponTerms({ className = '' }: { className?: string }) {
  return (
    <p className={`cp-terms ${className}`}>
      Compras desde {soles(coupon.minSpend)} · Vence el {coupon.expiresLabel} · 1 uso
    </p>
  );
}

export function RateOrder() {
  return (
    <Button variant="link" color="blue" size="small" leadingIcon="star">
      Calificar mi compra
    </Button>
  );
}

export function SavedInAccount() {
  return (
    <p className="cp-saved">
      <Icon name="checkmark" size={16} /> Guardado en tu cuenta: se aplica solo en tu próximo checkout
    </p>
  );
}
