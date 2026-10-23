import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionBar } from './ActionBar';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Action Bar',
  component: ActionBar,
  tags: ['autodocs'],
  args: { total: 'S/ 87.80' },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: componentDoc('Action Bar'),
      },
    },
  },
  decorators: [(S) => <div data-sizing="tablet" style={{ width: '100%', background: 'var(--color-bg-canvas)' }}><S /></div>],
} satisfies Meta<typeof ActionBar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
