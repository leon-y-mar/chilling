import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartSummary } from './CartSummary';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Cart Summary',
  component: CartSummary,
  tags: ['autodocs'],
  args: { subtotal: 'S/ 79.80', delivery: 'S/ 8.00', total: 'S/ 87.80' },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Cart Summary'),
      },
    },
  },
} satisfies Meta<typeof CartSummary>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
