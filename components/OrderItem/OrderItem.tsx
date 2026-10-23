import { Price } from '../ProductCard/ProductCard';
import { Quantity } from '../Quantity/Quantity';
import './order-item.css';

export interface OrderItemProps {
  name: string;
  price: string;
  /** Modificadores, p. ej. "+ Extra queso" o "− Sin cebolla". */
  modifiers?: string[];
  quantity?: number;
  onQuantityChange?: (q: number) => void;
}

/** Figma: Order Item (línea de pedido del mozo: nombre Bold 18 · Quantity · precio Dirk · modificadores). */
export function OrderItem({ name, price, modifiers, quantity, onQuantityChange }: OrderItemProps) {
  return (
    <div className="chilis-order-item">
      <div className="chilis-order-item__main">
        <p className="chilis-order-item__name">{name}</p>
        <Quantity itemName={name} min={0} value={quantity} defaultValue={1} onChange={onQuantityChange} />
        <Price size="small">{price}</Price>
      </div>
      {modifiers && modifiers.length > 0 && (
        <ul className="chilis-order-item__mods">
          {modifiers.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
