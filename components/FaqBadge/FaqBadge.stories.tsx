import type { Meta, StoryObj } from '@storybook/react-vite';
import { FaqBadge, type FaqColor, type FaqShape, type FaqSize, type FaqVariant } from './FaqBadge';
import { componentDoc } from '../../docs/design-md';

const colors: FaqColor[] = ['night', 'sunrise', 'red', 'cilantro'];
const shapes: FaqShape[] = ['badge', 'circle'];
const variants: FaqVariant[] = ['outline', 'filled'];
const sizes: FaqSize[] = [32, 24, 20, 16];

const meta = {
  title: 'Components/FAQ Badge',
  component: FaqBadge,
  tags: ['autodocs'],
  args: { shape: 'badge', variant: 'outline', color: 'night', size: 32 },
  argTypes: {
    shape: { control: 'inline-radio', options: shapes },
    variant: { control: 'inline-radio', options: variants },
    color: { control: 'inline-radio', options: colors },
    size: { control: 'inline-radio', options: sizes },
  },
  parameters: {
    docs: {
      description: {
        component: componentDoc('FAQ Badge'),
      },
    },
  },
} satisfies Meta<typeof FaqBadge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {colors.map((c) => (
        <div key={c} style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <code style={{ width: 72, fontSize: 12 }}>{c}</code>
          {shapes.map((s) =>
            variants.map((v) => (
              <div key={`${s}-${v}`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {sizes.map((z) => (
                  <FaqBadge key={z} shape={s} variant={v} color={c} size={z} />
                ))}
              </div>
            )),
          )}
        </div>
      ))}
    </div>
  ),
};
