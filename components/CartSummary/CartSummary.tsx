import { Button } from '../Button/Button';
import './cart-summary.css';

export interface CartSummaryProps {
  subtotal: string;
  delivery: string;
  total: string;
  checkoutLabel?: string;
  onCheckout?: () => void;
  labels?: { subtotal: string; delivery: string; total: string };
}

/** Figma: Cart Summary (480 de ancho; fondo surface; radio 16; CTA Large Offset rojo a todo el ancho). */
export function CartSummary({
  subtotal,
  delivery,
  total,
  checkoutLabel = 'Checkout',
  onCheckout,
  labels = { subtotal: 'Subtotal', delivery: 'Delivery', total: 'Total' },
}: CartSummaryProps) {
  return (
    <section className="chilis-cart-summary" aria-label="Resumen del pedido">
      <div style={{ display: 'contents' }}>
        <p className="chilis-cart-summary__row">
          <span>{labels.subtotal}</span>
          <span>{subtotal}</span>
        </p>
        <p className="chilis-cart-summary__row">
          <span>{labels.delivery}</span>
          <span>{delivery}</span>
        </p>
        <p className="chilis-cart-summary__row chilis-cart-summary__row--total">
          <span>{labels.total}</span>
          <span>{total}</span>
        </p>
      </div>
      <Button fullWidth onClick={onCheckout}>
        {checkoutLabel}
      </Button>
    </section>
  );
}
