import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown, DropdownOption } from './Dropdown';
import { componentDoc } from '../../docs/design-md';

const options = [
  { value: 'larcomar', label: "Chili's Larcomar" },
  { value: 'jockey', label: "Chili's Jockey Plaza" },
  { value: 'asia', label: "Chili's Asia" },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: { label: 'Local', options, helperText: 'Elige dónde quieres comer' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: componentDoc('Dropdown'),
      },
    },
  },
} satisfies Meta<typeof Dropdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Rest: Story = {};
export const Selected: Story = { args: { defaultValue: 'larcomar' } };
export const Expanded: Story = { args: { defaultOpen: true, staticPanel: true, defaultValue: 'jockey' } };
export const Destructive: Story = { args: { error: true, helperText: 'Selecciona un local' } };
export const Disabled: Story = { args: { disabled: true } };

export const OptionStates: StoryObj = {
  render: () => (
    <ul role="listbox" style={{ listStyle: 'none', padding: 0, margin: 0, width: 320, border: '2px solid var(--color-border-strong)', borderRadius: 8, overflow: 'hidden' }}>
      <DropdownOption label="Default" />
      <DropdownOption label="Hover" forceHover />
      <DropdownOption label="Selected" selected />
    </ul>
  ),
};
