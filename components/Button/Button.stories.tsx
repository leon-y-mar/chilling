import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, type ButtonColor } from './Button';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Ordenar ahora', variant: 'offset', color: 'red', size: 'large' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['offset', 'flat', 'outlined', 'link'] },
    color: { control: 'inline-radio', options: ['red', 'blue', 'ranch', 'yellow'] },
    size: { control: 'inline-radio', options: ['large', 'small'] },
    leadingIcon: { control: 'select', options: [undefined, 'plus', 'cart', 'search', 'send'] },
    trailingIcon: { control: 'select', options: [undefined, 'caret-outline-r', 'send'] },
  },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Button'),
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const row = { display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' } as const;
const colors: ButtonColor[] = ['red', 'blue', 'ranch', 'yellow'];

export const Offset: Story = {
  render: (args) => (
    <div style={row}>
      {colors.map((c) => (
        <Button key={c} {...args} variant="offset" color={c}>
          {c}
        </Button>
      ))}
    </div>
  ),
};

export const Flat: Story = {
  render: (args) => (
    <div style={row}>
      {colors.map((c) => (
        <Button key={c} {...args} variant="flat" color={c}>
          {c}
        </Button>
      ))}
    </div>
  ),
};

export const Outlined: Story = {
  render: (args) => (
    <div style={row}>
      {(['red', 'blue'] as const).map((c) => (
        <Button key={c} {...args} variant="outlined" color={c}>
          {c}
        </Button>
      ))}
    </div>
  ),
};

export const Link: Story = {
  render: (args) => (
    <div style={row}>
      {(['red', 'blue'] as const).map((c) => (
        <Button key={c} {...args} variant="link" color={c}>
          Ver más
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} size="large">
        Large
      </Button>
      <Button {...args} size="small">
        Small
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(3, auto)', gap: 24, alignItems: 'center' }}>
      {(['offset', 'flat', 'outlined', 'link'] as const).map((v) => (
        <div key={v} style={{ display: 'contents' }}>
          <code>{v}</code>
          <Button {...args} variant={v}>
            Default
          </Button>
          <Button {...args} variant={v} forceHover>
            Hover
          </Button>
          <Button {...args} variant={v} disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} leadingIcon="plus">
        Agregar
      </Button>
      <Button {...args} trailingIcon="caret-outline-r">
        Continuar
      </Button>
      <Button {...args} variant="outlined" leadingIcon="search">
        Buscar
      </Button>
    </div>
  ),
};
