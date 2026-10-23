import type { Meta, StoryObj } from '@storybook/react-vite';
import { OtpInput } from './OtpInput';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/OTP Input',
  component: OtpInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: componentDoc('OTP Input'),
      },
    },
  },
} satisfies Meta<typeof OtpInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Rest: Story = {};
export const Focused: Story = { args: { forceFocus: true } };
export const Filled: Story = { args: { defaultValue: '482913' } };
export const Destructive: Story = { args: { error: true, defaultValue: '482913', helperText: 'Código incorrecto. Revisa e inténtalo de nuevo' } };
export const Disabled: Story = { args: { disabled: true } };
