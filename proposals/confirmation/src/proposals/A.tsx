import { Button } from '../../../../components/Button/Button';
import { AccordionItem } from '../../../../components/AccordionItem/AccordionItem';
import { Illustration } from '../../../../components/Illustration/Illustration';
import { Container, CouponCode, CouponTerms, Eta, OrderFacts, OrderLines, RateOrder, SavedInAccount, SiteHeader, SuccessMark, Tracker } from '../shared';
import { coupon, order } from '../data';
import './A.css';

/** A · Ticket protagonista — el cupón es un objeto físico (ticket troquelado) entre el gracias y el seguimiento. */
export function ProposalA({ step }: { step: number }) {
  return (
    <>
      <SiteHeader />
      <main className="pa">
        <Container className="pa__stack">
          <header className="pa__hero">
            <SuccessMark />
            <p className="cp-eyebrow">Pedido confirmado · N° {order.number}</p>
            <h1 className="cp-h1">¡Gracias, {order.firstName}!</h1>
            <p className="cp-lead">
              Tu pedido llega en {order.etaMin}–{order.etaMax} min a {order.address}. Sigue cada paso aquí abajo.
            </p>
          </header>

          <section className="pa-ticket" aria-labelledby="pa-ticket-title">
            <div className="pa-ticket__main">
              <p className="cp-eyebrow">Tu próximo pedido tiene</p>
              <h2 id="pa-ticket-title" className="pa-ticket__amount">
                <span className="pa-ticket__currency">S/</span>
                {coupon.amount}
                <span className="pa-ticket__off">de descuento</span>
              </h2>
              <SavedInAccount />
              <CouponTerms />
            </div>
            <div className="pa-ticket__stub">
              <Illustration name="personalized-rewards" className="pa-ticket__art" />
              <CouponCode />
              <Button fullWidth trailingIcon="arrow-outline-r">
                Pedir de nuevo
              </Button>
            </div>
          </section>

          <div className="pa__grid">
            <section className="cp-card" aria-labelledby="pa-track">
              <div className="cp-card__pad">
                <div className="pa__row">
                  <h2 id="pa-track" className="cp-h4">
                    Seguimiento
                  </h2>
                  <RateOrder />
                </div>
                <Eta size="md" />
                <Tracker step={step} />
              </div>
            </section>
            <section className="cp-card" aria-labelledby="pa-detail">
              <div className="cp-card__pad">
                <h2 id="pa-detail" className="cp-h4">
                  Tu pedido
                </h2>
                <OrderLines />
              </div>
              <AccordionItem theme="ranch" title="Entrega, pago y datos de contacto">
                <span className="pa__facts">
                  <OrderFacts />
                </span>
              </AccordionItem>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
}
