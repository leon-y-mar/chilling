import type { Meta, StoryObj } from '@storybook/react-vite';
import { Illustration, illustrationNames } from './Illustration';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Illustration',
  component: Illustration,
  tags: ['autodocs'],
  args: { name: 'free-chips-and-salsa', variant: 'color' },
  argTypes: {
    name: { control: 'inline-radio', options: illustrationNames },
    variant: { control: 'inline-radio', options: ['color', 'outline'] },
  },
  parameters: {
    docs: {
      description: {
        component: componentDoc('Illustration'),
      },
    },
  },
} satisfies Meta<typeof Illustration>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllIllustrations: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['color', 'outline'] as const).map((v) => (
        <div key={v} style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <code style={{ width: 64, fontSize: 12 }}>{v}</code>
          {illustrationNames.map((n) => (
            <Illustration key={n} name={n} variant={v} />
          ))}
        </div>
      ))}
    </div>
  ),
};
