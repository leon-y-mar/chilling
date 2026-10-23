import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, ModalScrim } from './Modal';
import { sampleImages } from '../../assets/images';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    title: 'Únete a Chili\'s Rewards',
    children: 'Acumula puntos en cada pedido y canjéalos por tus favoritos.',
    primaryLabel: 'Join now',
    secondaryLabel: 'Log in',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: componentDoc('Modal'),
      },
    },
  },
} satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NoImage: Story = { args: { layout: 'none' } };
export const ImageTop: Story = { args: { layout: 'image-top', image: <img src={sampleImages.modalSuperior} alt="" /> } };
export const ImageLeft: Story = { args: { layout: 'image-left', image: <img src={sampleImages.producto} alt="" /> } };
export const ImageRight: Story = { args: { layout: 'image-right', image: <img src={sampleImages.producto} alt="" /> } };
export const OverScrim: Story = {
  args: { layout: 'image-left', image: <img src={sampleImages.producto} alt="" /> },
  render: (args) => (
    <ModalScrim>
      <Modal {...args} />
    </ModalScrim>
  ),
};
