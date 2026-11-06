import { useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { Alert } from '../../../../components/Alert/Alert';
import { AccordionItem } from '../../../../components/AccordionItem/AccordionItem';
import { Illustration } from '../../../../components/Illustration/Illustration';
import { Container, CouponCode, CouponTerms, OrderFacts, OrderLines, SiteHeader, SuccessMark, Tracker } from '../shared';
import { coupon, order, soles, suggestions } from '../data';
import './E.css';

/** E · Recompra guiada — el cupón se desbloquea armando el próximo pedido, aquí mismo. */
export function ProposalE({ step }: { step: number }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const amount = suggestions.reduce((s, p) => s + (cart[p.id] ?? 0) * p.price, 0);
  const unlocked = amount >= coupon.minSpend;
  const pct = Math.min(100, (amount / coupon.minSpend) * 100);
  const missing = Math.max(0, coupon.minSpend - amount);
  const toggle = (id: string) => setCart((c) => ({ ...c, [id]: c[id] ? 0 : 1 }));

  return (
    <>
      <SiteHeader />
      <main className="pe">
        <Container className="pe__stack">
          <section className="pe-status cp-card" aria-labelledby="pe-title">
            <div className="pe-status__row">
              <SuccessMark size={48} />
              <div className="pe-status__text">
                <h1 id="pe-title" className="cp-h4">¡Gracias, {order.firstName}! Llega en {order.etaMin}–{order.etaMax} min</h1>
                <p>N° {order.number} · {order.address}</p>
              </div>
              <div className="pe-status__track">
                <Tracker step={step} variant="compact" />
              </div>
            </div>
            <AccordionItem theme="ranch" title="Ver detalle de la compra">
              <span className="pe-status__detail">
                <OrderLines />
                <OrderFacts />
              </span>
            </AccordionItem>
          </section>

          <section className="pe-next" aria-labelledby="pe-next">
            <header className="pe-next__head">
              <div>
                <p className="cp-eyebrow">Tienes S/ {coupon.amount} de regalo</p>
                <h2 id="pe-next" className="cp-h2">Arma tu próximo pedido</h2>
              </div>
              <CouponCode />
            </header>

            <div className={`pe-meter ${unlocked ? 'is-unlocked' : ''}`}>
              <div className="pe-meter__labels">
                <span className="pe-meter__now">{soles(amount)}</span>
                <span>Cupón desde {soles(coupon.minSpend)}</span>
              </div>
              <div
                className="pe-meter__track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={coupon.minSpend}
                aria-valuenow={Math.min(amount, coupon.minSpend)}
                aria-label="Avance para usar el cupón"
              >
                <span style={{ width: `${pct}%` }} />
              </div>
              <div aria-live="polite">
                {unlocked ? (
                  <Alert type="success">Cupón desbloqueado: pagas {soles(amount - coupon.amount)} en lugar de {soles(amount)}.</Alert>
                ) : (
                  <p className="pe-meter__hint">
                    {amount === 0 ? 'Agrega productos para usar tu cupón.' : `Te faltan ${soles(missing)} para usar tu cupón.`}
                  </p>
                )}
              </div>
            </div>

            <ul className="pe-grid">
              {suggestions.map((p) => {
                const added = !!cart[p.id];
                return (
                  <li key={p.id} className={`pe-prod ${added ? 'is-added' : ''} ${p.id === 'repeat' ? 'is-feature' : ''}`}>
                    <span className="pe-prod__art" aria-hidden="true">
                      <Illustration name={p.art} />
                    </span>
                    <div className="pe-prod__info">
                      <p className="pe-prod__name">{p.name}</p>
                      <p className="pe-prod__detail">{p.detail}</p>
                      <p className="cp-price">{soles(p.price)}</p>
                    </div>
                    <Button
                      variant={added ? 'flat' : 'outlined'}
                      color="blue"
                      size="small"
                      leadingIcon={added ? 'checkmark' : 'plus'}
                      aria-pressed={added}
                      onClick={() => toggle(p.id)}
                    >
                      {added ? 'Agregado' : 'Agregar'}
                    </Button>
                  </li>
                );
              })}
            </ul>

            <div className="pe-checkout">
              <CouponTerms />
              <Button disabled={!unlocked} trailingIcon="arrow-outline-r">
                {unlocked ? `Pedir por ${soles(amount - coupon.amount)}` : 'Pedir con mi cupón'}
              </Button>
            </div>
            <p className="pe-note">Imágenes y precios de los productos sugeridos son referenciales.</p>
          </section>
        </Container>
      </main>
    </>
  );
}
