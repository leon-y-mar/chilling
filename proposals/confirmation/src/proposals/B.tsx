import { Button } from '../../../../components/Button/Button';
import { AccordionItem } from '../../../../components/AccordionItem/AccordionItem';
import { Illustration } from '../../../../components/Illustration/Illustration';
import { Container, CouponCode, CouponTerms, Eta, OrderFacts, OrderLines, RateOrder, SavedInAccount, SiteHeader, SuccessMark, Tracker } from '../shared';
import { coupon, order, steps } from '../data';
import './B.css';

/** B · Dashboard de pedido — estado arriba y grande; cupón como compañero fijo (sticky) a la derecha. */
export function ProposalB({ step }: { step: number }) {
  return (
    <>
      <SiteHeader />
      <main className="pb">
        <Container>
          <div className="pb__greet">
            <SuccessMark size={40} />
            <p className="cp-h5">¡Gracias por tu compra, {order.firstName}!</p>
          </div>
          <div className="pb__layout">
            <section className="pb-status cp-card" aria-labelledby="pb-status">
              <div className="pb-status__top">
                <div className="pb-status__head">
                  <p className="cp-eyebrow">Pedido N° {order.number}</p>
                  <h1 id="pb-status" className="cp-h2">
                    Pedido {steps[step].toLowerCase()}
                  </h1>
                </div>
                <Eta size="md" />
              </div>
              <div className="pb-status__track">
                <Tracker step={step} />
              </div>
              <div className="pb-status__foot">
                <OrderFacts only={[1]} />
                <RateOrder />
              </div>
            </section>

            <aside className="pb-coupon" aria-labelledby="pb-coupon">
              <div className="pb-coupon__card">
                <div className="pb-coupon__head">
                  <Illustration name="personalized-rewards" className="pb-coupon__art" />
                  <p className="cp-eyebrow">Regalo para tu próxima visita</p>
                </div>
                <h2 id="pb-coupon" className="pb-coupon__amount">
                  <span><span className="cp-cur">S/</span>{coupon.amount}</span>
                  <small>menos en tu próximo pedido</small>
                </h2>
                <p className="pb-coupon__copy">Ya está en tu cuenta: no necesitas copiar nada.</p>
                <Button fullWidth trailingIcon="arrow-outline-r">
                  Usar mi cupón
                </Button>
                <CouponCode />
                <CouponTerms />
              </div>
            </aside>

            <section className="pb-detail cp-card" aria-label="Detalle de la compra">
              <AccordionItem theme="navy" title="Detalle de la compra" defaultOpen>
                <span className="pb-detail__body">
                  <OrderLines />
                </span>
              </AccordionItem>
              <AccordionItem theme="ranch" title="Datos de pago y contacto">
                <span className="pb-detail__body">
                  <OrderFacts only={[0, 2, 3]} />
                </span>
              </AccordionItem>
            </section>
          </div>
          <p className="pb__help">
            <SavedInAccount />
          </p>
        </Container>
      </main>
    </>
  );
}
