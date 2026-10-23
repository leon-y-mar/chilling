import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Chip } from './Chip';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { label: 'Hamburguesas' },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Chip'),
      },
    },
  },
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const CategoryRow: Story = {
  render: () => {
    const items = ['Hamburguesas', 'Fajitas', 'Entradas', 'Postres', 'Bebidas'];
    const [sel, setSel] = useState(items[0]);
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {items.map((i) => (
          <Chip key={i} label={i} selected={sel === i} onClick={() => setSel(i)} />
        ))}
      </div>
    );
  },
};
