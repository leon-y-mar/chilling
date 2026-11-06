import { Button } from '../../../../components/Button/Button';
import { Illustration } from '../../../../components/Illustration/Illustration';
import { Container, CouponCode, CouponTerms, Eta, OrderFacts, OrderLines, RateOrder, SiteHeader, SuccessMark, Tracker } from '../shared';
import { coupon, order, soles } from '../data';
import { useCountUp } from '../hooks';
import './C.css';

/** C · Momento recompensa — la recompensa es el titular de la página; la confirmación la acompaña. */
export function ProposalC({ step }: { step: number }) {
  const value = useCountUp(coupon.amount);
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pc-hero" data-theme="dark" aria-labelledby="pc-title">
          <Container className="pc-hero__inner">
            <div className="pc-hero__copy">
              <p className="pc-hero__ok">
                <SuccessMark size={32} /> Pedido N° {order.number} confirmado
              </p>
              <h1 id="pc-title" className="pc-hero__title">
                <span className="cp-h2">{order.firstName}, ganaste</span>
                <span className="pc-hero__amount" aria-label={`S/ ${coupon.amount}`}>
                  <span className="cp-cur">S/</span>
                  {value}
                </span>
              </h1>
              <p className="pc-hero__lead">
                para tu próximo pedido desde {soles(coupon.minSpend)}. Ya está en tu cuenta y se aplica solo en el checkout.
              </p>
              <div className="pc-hero__actions">
                <Button trailingIcon="arrow-outline-r">Pedir de nuevo</Button>
                <CouponCode tone="dark" />
              </div>
              <CouponTerms />
            </div>
            <div className="pc-hero__art" aria-hidden="true">
              <span className="pc-hero__burst" />
              <Illustration name="personalized-rewards" className="pc-hero__illus" />
            </div>
          </Container>
        </section>

        <Container className="pc-body">
          <section className="pc-col" aria-labelledby="pc-track">
            <h2 id="pc-track" className="cp-h4">Seguimiento</h2>
            <Eta size="md" />
            <Tracker step={step} variant="vertical" />
          </section>
          <section className="pc-col" aria-labelledby="pc-order">
            <h2 id="pc-order" className="cp-h4">Tu pedido</h2>
            <OrderLines />
          </section>
          <section className="pc-col" aria-labelledby="pc-data">
            <h2 id="pc-data" className="cp-h4">Entrega y pago</h2>
            <OrderFacts />
            <RateOrder />
          </section>
        </Container>
      </main>
    </>
  );
}
