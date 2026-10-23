import type { Meta, StoryObj } from '@storybook/react-vite';
import { AnimatedIcon, animationNames } from './AnimatedIcon';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Animated Icon',
  component: AnimatedIcon,
  tags: ['autodocs'],
  args: { name: 'trash', duration: 2, disabled: false },
  argTypes: {
    name: { control: 'inline-radio', options: animationNames },
    duration: { control: { type: 'range', min: 1, max: 3, step: 0.5 } },
  },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Animated Icon'),
      },
    },
  },
} satisfies Meta<typeof AnimatedIcon>;
export default meta;
type Story = StoryObj<typeof meta>;

const cell = { display: 'grid', justifyItems: 'center', gap: 8, fontSize: 12 } as const;

export const Playground: Story = {};

export const AllAnimations: Story = {
  args: { name: 'trash' },
  render: (args) => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      {animationNames.map((n) => (
        <div key={n} style={cell}>
          <AnimatedIcon name={n} duration={args.duration} />
          <code>{n}</code>
        </div>
      ))}
    </div>
  ),
};

export const TrashDisabled: Story = {
  args: { name: 'trash' },
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <div style={cell}>
        <AnimatedIcon name="trash" label="Eliminando" />
        <code>Default</code>
      </div>
      <div style={cell}>
        <AnimatedIcon name="trash" disabled label="No se puede eliminar" />
        <code>Disabled</code>
      </div>
    </div>
  ),
};

const iconButton = {
  display: 'inline-grid',
  placeItems: 'center',
  width: 'var(--size-touch-min)',
  height: 'var(--size-touch-min)',
  border: 'var(--bw-xsmall) solid var(--color-border-divider)',
  borderRadius: 'var(--br-100)',
  background: 'var(--color-bg-canvas)',
  cursor: 'pointer',
} as const;

/** trash y megaphone se reproducen una vez al pasar el cursor, enfocar con teclado o tocar el botón. */
export const Interaction: Story = {
  args: { name: 'trash' },
  render: (args) => (
    <div style={{ display: 'flex', gap: 32 }}>
      <div style={cell}>
        <button type="button" style={iconButton} aria-label="Eliminar producto">
          <AnimatedIcon name="trash" duration={args.duration} />
        </button>
        <code>trash</code>
      </div>
      <div style={cell}>
        <button type="button" style={iconButton} aria-label="Ver promociones">
          <AnimatedIcon name="megaphone" duration={args.duration} />
        </button>
        <code>megaphone</code>
      </div>
      <div style={cell}>
        <button type="button" style={iconButton} aria-label="No se puede eliminar" disabled>
          <AnimatedIcon name="trash" disabled />
        </button>
        <code>trash · disabled</code>
      </div>
    </div>
  ),
};

export const Durations: Story = {
  args: { name: 'hourglass' },
  render: (args) => (
    <div style={{ display: 'flex', gap: 32 }}>
      {[1, 2, 3].map((d) => (
        <div key={d} style={cell}>
          <AnimatedIcon name={args.name} duration={d} />
          <code>{d} s</code>
        </div>
      ))}
    </div>
  ),
};
