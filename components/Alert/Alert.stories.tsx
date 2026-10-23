import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, type AlertType } from './Alert';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: { children: 'Tu pedido fue enviado a cocina', type: 'success', variant: 'inline' },
  argTypes: {
    type: { control: 'inline-radio', options: ['success', 'warning', 'error', 'loading'] },
    variant: { control: 'inline-radio', options: ['inline', 'boxed', 'banner'] },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: componentDoc('Alert'),
      },
    },
  },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

const types: AlertType[] = ['success', 'warning', 'error', 'loading'];
const msgs: Record<AlertType, string> = {
  success: 'Tu pedido fue enviado a cocina',
  warning: 'Quedan pocas mesas para esta hora',
  error: 'No pudimos procesar tu pago',
  loading: 'Confirmando tu reserva…',
};
const grid = (variant: 'inline' | 'boxed' | 'banner'): Story['render'] => () => (
  <div style={{ display: 'grid', gap: 16 }}>
    {types.map((t) => (
      <Alert key={t} type={t} variant={variant}>
        {msgs[t]}
      </Alert>
    ))}
  </div>
);

export const Playground: Story = {};
export const Inline: Story = { render: grid('inline') };
export const Boxed: Story = { render: grid('boxed') };
export const Banner: Story = { render: grid('banner') };
