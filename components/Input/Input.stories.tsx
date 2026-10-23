import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Nombre', placeholder: 'Escribe tu nombre', helperText: 'Como aparece en tu DNI' },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Input'),
      },
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Rest: Story = {};
export const Focused: Story = { args: { forceFocus: true } };
export const Filled: Story = { args: { defaultValue: 'Miguel Vera' } };
export const Required: Story = { args: { required: true, showHelpIcon: true } };
export const Destructive: Story = { args: { error: true, defaultValue: 'miguel@', helperText: 'Ingresa un correo válido' } };
export const Disabled: Story = { args: { disabled: true, placeholder: 'No editable' } };
