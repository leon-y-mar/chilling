import type { ReactNode } from 'react';
import { Price } from '../ProductCard/ProductCard';
import { Quantity } from '../Quantity/Quantity';
import './cart-item.css';

export interface CartItemProps {
  name: string;
  modifiers?: string;
  price: string;
  image?: ReactNode;
  quantity?: number;
  onQuantityChange?: (q: number) => void;
}

/** Figma: Cart Item (480 de ancho; imagen 88×88; Quantity; precio en Dirk). */
export function CartItem({ name, modifiers, price, image, quantity, onQuantityChange }: CartItemProps) {
  return (
    <div className="chilis-cart-item">
      <div className="chilis-cart-item__image">{image}</div>
      <div className="chilis-cart-item__details">
        <p className="chilis-cart-item__name">{name}</p>
        {modifiers && <p className="chilis-cart-item__mods">{modifiers}</p>}
        <Quantity itemName={name} min={0} value={quantity} defaultValue={1} onChange={onQuantityChange} />
      </div>
      <Price size="small">{price}</Price>
    </div>
  );
}
