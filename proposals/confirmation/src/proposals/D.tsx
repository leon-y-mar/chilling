import { Button } from '../../../../components/Button/Button';
import { AccordionItem } from '../../../../components/AccordionItem/AccordionItem';
import { Container, CouponCode, CouponTerms, OrderFacts, OrderLines, RateOrder, SavedInAccount, SiteHeader, SuccessMark, Tracker } from '../shared';
import { coupon, order, soles } from '../data';
import { useCountdown } from '../hooks';
import './D.css';

const pad = (n: number) => String(n).padStart(2, '0');

/** D · Contrarreloj — ahorro de hoy como prueba + cuenta regresiva del cupón como urgencia. */
export function ProposalD({ step }: { step: number }) {
  const left = useCountdown(coupon.expiresAt);
  const total = coupon.expiresAt.getTime() - coupon.issuedAt.getTime();
  const pct = Math.max(0, Math.min(100, (left.ms / total) * 100));
  const units = [
    { v: left.days, l: 'días' },
    { v: left.hours, l: 'horas' },
    { v: left.minutes, l: 'min' },
    { v: left.seconds, l: 'seg' },
  ];
  return (
    <>
      <SiteHeader />
      <main className="pd">
        <Container className="pd__stack">
          <section className="pd-confirm" aria-labelledby="pd-title">
            <div className="pd-confirm__msg">
              <SuccessMark size={48} />
              <div>
                <h1 id="pd-title" className="cp-h4">¡Listo, {order.firstName}! Pedido confirmado</h1>
                <p className="pd-confirm__sub">
                  N° {order.number} · Llega en <strong>{order.etaMin}–{order.etaMax} min</strong> ({order.etaWindow})
                </p>
              </div>
            </div>
            <div className="pd-confirm__track">
              <Tracker step={step} variant="compact" />
            </div>
          </section>

          <section className="pd-deal" data-theme="dark" aria-labelledby="pd-deal-title">
            <div className="pd-deal__saved">
              <p className="cp-eyebrow">Hoy ahorraste</p>
              <p className="pd-deal__today">{soles(order.discount)}</p>
              <p className="pd-deal__note">Tu próximo pedido puede salir aún mejor:</p>
            </div>
            <div className="pd-deal__main">
              <h2 id="pd-deal-title" className="pd-deal__title">
                <span className="pd-deal__amount"><span className="cp-cur">S/</span>{coupon.amount}</span> menos en tu próximo pedido
              </h2>
              <div className="pd-timer" role="timer" aria-label={`Tu cupón vence en ${left.days} días y ${left.hours} horas`}>
                {units.map((u) => (
                  <span key={u.l} className="pd-timer__unit">
                    <span className="pd-timer__num">{pad(u.v)}</span>
                    <span className="pd-timer__lbl">{u.l}</span>
                  </span>
                ))}
              </div>
              <div className="pd-meter" aria-hidden="true">
                <span style={{ width: `${pct}%` }} />
              </div>
              <CouponTerms />
              <div className="pd-deal__actions">
                <Button className="pd-deal__cta" trailingIcon="arrow-outline-r">
                  Usar mi cupón ahora
                </Button>
                <CouponCode tone="dark" />
              </div>
            </div>
          </section>

          <div className="pd__grid">
            <section className="cp-card" aria-label="Detalle de la compra">
              <AccordionItem theme="ranch" title={`Detalle de la compra · ${order.items[0].qty} productos`}>
                <span className="pd__acc">
                  <OrderLines />
                </span>
              </AccordionItem>
              <AccordionItem theme="ranch" title="Entrega, pago y contacto">
                <span className="pd__acc">
                  <OrderFacts />
                </span>
              </AccordionItem>
            </section>
            <div className="pd__aside">
              <SavedInAccount />
              <RateOrder />
            </div>
          </div>
        </Container>

        <div className="pd-bar" data-theme="dark">
          <p>
            <strong>S/ {coupon.amount} menos</strong>
            <span>
              Vence en {left.days} d {left.hours} h
            </span>
          </p>
          <Button size="small">Usar cupón</Button>
        </div>
      </main>
    </>
  );
}
