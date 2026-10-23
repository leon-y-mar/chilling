import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Foundations/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: componentDoc('Logo'),
      },
    },
  },
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <Logo size={96} />
      <Logo size={120} />
      <Logo size={124} />
    </div>
  ),
};
