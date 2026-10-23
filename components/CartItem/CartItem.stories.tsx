import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartItem } from './CartItem';
import { sampleImages } from '../../assets/images';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Cart Item',
  component: CartItem,
  tags: ['autodocs'],
  args: { name: 'Original Big Mouth Burgers', modifiers: 'Sin cebolla · Extra queso', price: 'S/ 39.90', image: <img src={sampleImages.producto} alt="" /> },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Cart Item'),
      },
    },
  },
} satisfies Meta<typeof CartItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithoutModifiers: Story = { args: { modifiers: undefined } };
