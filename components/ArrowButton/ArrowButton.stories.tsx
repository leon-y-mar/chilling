import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowButton } from './ArrowButton';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Arrow Button',
  component: ArrowButton,
  tags: ['autodocs'],
  args: { 'aria-label': 'Siguiente' },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Arrow Button'),
      },
    },
  },
} satisfies Meta<typeof ArrowButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {};
export const Left: Story = { args: { direction: 'left', 'aria-label': 'Anterior' } };
export const Hover: Story = { args: { forceHover: true } };
export const Pair: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <ArrowButton direction="left" aria-label="Anterior" />
      <ArrowButton direction="right" aria-label="Siguiente" />
    </div>
  ),
};
