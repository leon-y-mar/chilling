import type { Meta, StoryObj } from '@storybook/react-vite';
import { PartySize } from './PartySize';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Party Size',
  component: PartySize,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: componentDoc('Party Size'),
      },
    },
  },
} satisfies Meta<typeof PartySize>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const AtMinimum: Story = { args: { defaultValue: 1 } };
