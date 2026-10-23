import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Acepto los términos y condiciones' },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Checkbox'),
      },
    },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};
export const Selected: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const SelectedDisabled: Story = { args: { disabled: true, defaultChecked: true } };
