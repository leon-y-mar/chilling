/**
 * Datos de ejemplo. Vienen del wireframe actual, con la aritmética corregida
 * (el wireframe sumaba 2 × S/ 44.50 como S/ 44.50 y el total no cuadraba).
 * Valor del cupón y precios de productos sugeridos: PLACEHOLDERS, validar con negocio.
 */
export const order = {
  firstName: 'Pablo',
  fullName: 'Pablo Espinoza',
  phone: '973 543 786',
  number: '923702207077-01',
  placedAt: '8:10 p. m. · 12/02/2025',
  etaWindow: '8:30 – 8:40 p. m.',
  etaMin: 20,
  etaMax: 30,
  payment: 'Visa terminada en 9546',
  address: 'Calle Los Capulíes 713, Miraflores',
  items: [{ qty: 2, name: 'Chicken Crispers', unit: 44.5, note: 'Salsa honey-mustard' }],
  discount: 5,
  delivery: 6.7,
};

export const subtotal = order.items.reduce((s, i) => s + i.qty * i.unit, 0);
export const total = subtotal - order.discount + order.delivery;

export const coupon = {
  amount: 10, // wireframe: S/ 00.00 → placeholder
  minSpend: 60,
  code: 'VUELVE10',
  issuedAt: new Date('2026-11-06T00:00:00-05:00'),
  expiresAt: new Date('2026-11-26T23:59:59-05:00'),
  expiresLabel: '26/11/2026',
};

export const steps = ['Recibido', 'En cocina', 'En camino', 'Entregado'] as const;
export const stepCopy = [
  'Recibimos tu pedido y se lo pasamos a cocina.',
  'Estamos preparando tu pedido.',
  'Tu pedido va en camino.',
  '¡Buen provecho!',
];

export type Suggestion = {
  id: string;
  name: string;
  detail: string;
  price: number;
  art: 'free-chips-and-salsa' | 'birthday-dessert' | '1-tap-reorder' | 'personalized-rewards';
};

/** Precios de ejemplo (placeholder), salvo Chicken Crispers (S/ 44.50 c/u) que viene del wireframe. */
export const suggestions: Suggestion[] = [
  { id: 'repeat', name: 'Repetir tu pedido', detail: '2 × Chicken Crispers', price: 89, art: '1-tap-reorder' },
  { id: 'chips', name: 'Chips & Salsa', detail: 'Para compartir', price: 12.9, art: 'free-chips-and-salsa' },
  { id: 'molten', name: 'Molten Chocolate Cake', detail: 'Postre', price: 24.9, art: 'birthday-dessert' },
];

export const soles = (n: number) => `S/ ${n.toFixed(2)}`;
