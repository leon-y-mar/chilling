import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderItem } from './OrderItem';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Order Item',
  component: OrderItem,
  tags: ['autodocs'],
  args: { name: 'Original Big Mouth Burgers', price: 'S/ 39.90', modifiers: ['+ Extra queso', '− Sin cebolla'] },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Order Item'),
      },
    },
  },
} satisfies Meta<typeof OrderItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithModifiers: Story = {};
export const WithoutModifiers: Story = { args: { modifiers: undefined } };
