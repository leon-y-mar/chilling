import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DateCell } from './DateCell';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Date Cell',
  component: DateCell,
  tags: ['autodocs'],
  args: { day: 'VIE', date: '15' },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Date Cell'),
      },
    },
  },
} satisfies Meta<typeof DateCell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Row: Story = {
  render: () => {
    const days = [['LUN', '12'], ['MAR', '13'], ['MIÉ', '14'], ['VIE', '15'], ['SÁB', '16'], ['DOM', '17']];
    const [sel, setSel] = useState('15');
    return (
      <div style={{ display: 'flex', gap: 12 }}>
        {days.map(([d, n]) => (
          <DateCell key={n} day={d} date={n} selected={sel === n} disabled={n === '17'} onClick={() => setSel(n)} />
        ))}
      </div>
    );
  },
};
