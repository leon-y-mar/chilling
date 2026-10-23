import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: componentDoc('Header'),
      },
    },
  },
} satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const Mobile: Story = { args: { breakpoint: 'mobile' }, decorators: [(S) => <div style={{ maxWidth: 390 }}><S /></div>] };
/** Contador del carrito: «0» vacío, el número hasta 99 y «99+» desde 100. */
export const CartCount: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Header cartCount={0} />
      <Header cartCount={3} />
      <Header cartCount={120} />
    </div>
  ),
};
