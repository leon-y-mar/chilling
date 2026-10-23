import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Header } from '../components/Header/Header';
import { Chip } from '../components/Chip/Chip';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { CartItem } from '../components/CartItem/CartItem';
import { CartSummary } from '../components/CartSummary/CartSummary';
import { Logo } from '../components/Logo/Logo';
import { DateCell } from '../components/DateCell/DateCell';
import { TimeSlot } from '../components/TimeSlot/TimeSlot';
import { PartySize } from '../components/PartySize/PartySize';
import { ReservationSummary } from '../components/ReservationSummary/ReservationSummary';
import { TableCard, type TableStatus } from '../components/TableCard/TableCard';
import { OrderItem } from '../components/OrderItem/OrderItem';
import { ActionBar } from '../components/ActionBar/ActionBar';
import { sampleImages } from '../assets/images';
import './patterns.css';

function Scope({ mode, children }: { mode: 'light' | 'dark'; children: ReactNode }) {
  return (
    <div data-theme={mode} style={{ background: 'var(--color-bg-canvas)' }}>
      {children}
    </div>
  );
}

function EcommerceMenu() {
  const cats = ['Hamburguesas', 'Fajitas', 'Entradas', 'Postres', 'Bebidas'];
  const [cat, setCat] = useState(cats[0]);
  return (
    <div className="pt pt-menu">
      <Header />
      <div className="pt-menu__body">
        <div className="pt-menu__main">
          <h1 className="pt-title-h2">NUESTRO MENÚ</h1>
          <div className="pt-row">
            {cats.map((c) => (
              <Chip key={c} label={c} selected={cat === c} onClick={() => setCat(c)} />
            ))}
          </div>
          <div className="pt-menu__grid">
            {Array.from({ length: 6 }, (_, i) => (
              <ProductCard key={i} name="ORIGINAL BIG MOUTH BURGERS" description="Four bite-sized burgers with our signature toppings." price="S/ 39.90" image={<img src={sampleImages.productoCard} alt="" />} />
            ))}
          </div>
        </div>
        <aside className="pt-menu__cart" aria-label="Tu pedido">
          <h2 className="pt-title-h4">TU PEDIDO</h2>
          <CartItem name="Original Big Mouth Burgers" modifiers="Sin cebolla · Extra queso" price="S/ 39.90" image={<img src={sampleImages.producto} alt="" />} />
          <CartItem name="Original Big Mouth Burgers" modifiers="Sin cebolla · Extra queso" price="S/ 39.90" image={<img src={sampleImages.producto} alt="" />} />
          <CartSummary subtotal="S/ 79.80" delivery="S/ 8.00" total="S/ 87.80" />
        </aside>
      </div>
    </div>
  );
}

function Reservations() {
  const days = [['LUN', '12'], ['MAR', '13'], ['MIÉ', '14'], ['VIE', '15'], ['SÁB', '16'], ['DOM', '17']];
  const times = ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];
  const [day, setDay] = useState('15');
  const [time, setTime] = useState('7:30 PM');
  const [party, setParty] = useState(4);
  return (
    <div className="pt pt-resv" data-sizing="tablet">
      <Logo size={120} />
      <h1 className="pt-title-h2">NUEVA RESERVA</h1>
      <p className="pt-label">Fecha</p>
      <div className="pt-resv__row">
        {days.map(([d, n]) => (
          <DateCell key={n} day={d} date={n} selected={day === n} disabled={n === '17'} onClick={() => setDay(n)} />
        ))}
      </div>
      <p className="pt-label">Hora</p>
      <div className="pt-row">
        {times.map((t) => (
          <TimeSlot key={t} time={t} selected={time === t} disabled={t === '9:00 PM'} onClick={() => setTime(t)} />
        ))}
      </div>
      <p className="pt-label">Personas</p>
      <PartySize value={party} onChange={setParty} />
      <ReservationSummary date={`Vie ${day} · Nov`} time={time} people={String(party)} place="Chili's Larcomar" />
    </div>
  );
}

const STATUSES: TableStatus[] = ['free', 'occupied', 'reserved', 'bill', 'free', 'occupied', 'free', 'reserved'];

function OrderTaking() {
  const filters = ['Todas', 'Salón', 'Terraza', 'Barra'];
  const [f, setF] = useState('Todas');
  return (
    <div className="pt pt-order" data-sizing="tablet">
      <div className="pt-order__body">
        <section className="pt-order__tables" aria-label="Mesas">
          <h1 className="pt-order__h3">MESAS</h1>
          <div className="pt-row">
            {filters.map((x) => (
              <Chip key={x} label={x} selected={f === x} onClick={() => setF(x)} />
            ))}
          </div>
          <div className="pt-order__grid">
            {STATUSES.map((s, i) => (
              <TableCard key={i} number={String(i + 1)} guests="4" status={s} />
            ))}
          </div>
        </section>
        <aside className="pt-order__panel" aria-label="Pedido">
          <h3>PEDIDO · MESA 12</h3>
          {[1, 2, 3].map((i) => (
            <OrderItem key={i} name="Original Big Mouth Burgers" price="S/ 39.90" modifiers={['+ Extra queso', '− Sin cebolla']} />
          ))}
        </aside>
      </div>
      <ActionBar total="S/ 87.80" />
    </div>
  );
}

const meta = {
  title: 'Patterns/Pantallas',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Pantallas de referencia compuestas **solo con componentes y tokens** del sistema (Light y Dark), tal como en Figma:

- **Ecommerce / Menú** (1440): Header · categorías con Chips · grilla de 6 Product Cards · panel "Tu pedido" con Cart Items y Cart Summary.
- **Reservas / Tablet vertical** (820×1180): Fecha → Hora → Personas → Reservation Summary. Usa el modo de Sizing **Tablet**.
- **Toma de pedido / Tablet horizontal** (1180×820): plano de mesas (Table Cards) + panel Pedido (Order Items) + Action Bar. Modo **Tablet**.

Úsalas como guía de composición: una sola acción primaria por pantalla, precios en Dirk con formato "S/ 39.90", estados nunca solo con color.
        `,
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const EcommerceMenuLight: Story = { name: 'Ecommerce / Menú / Light', render: () => <Scope mode="light"><EcommerceMenu /></Scope> };
export const EcommerceMenuDark: Story = { name: 'Ecommerce / Menú / Dark', render: () => <Scope mode="dark"><EcommerceMenu /></Scope> };
export const ReservationsLight: Story = { name: 'Reservas / Tablet vertical / Light', render: () => <Scope mode="light"><Reservations /></Scope> };
export const ReservationsDark: Story = { name: 'Reservas / Tablet vertical / Dark', render: () => <Scope mode="dark"><Reservations /></Scope> };
export const OrderTakingLight: Story = { name: 'Toma de pedido / Tablet horizontal / Light', render: () => <Scope mode="light"><OrderTaking /></Scope> };
export const OrderTakingDark: Story = { name: 'Toma de pedido / Tablet horizontal / Dark', render: () => <Scope mode="dark"><OrderTaking /></Scope> };
