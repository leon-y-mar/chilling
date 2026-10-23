import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem } from './AccordionItem';
import { componentDoc } from '../../docs/design-md';

const meta = {
  title: 'Components/Accordion Item',
  component: AccordionItem,
  tags: ['autodocs'],
  args: {
    title: '¿Puedo cambiar mi reserva?',
    children: 'Sí. Puedes modificarla hasta 2 horas antes desde "Mis reservas".',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: componentDoc('Accordion Item'),
      },
    },
  },
} satisfies Meta<typeof AccordionItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NavyClosed: Story = {};
export const NavyOpen: Story = { args: { defaultOpen: true } };
export const RanchClosed: Story = { args: { theme: 'ranch' } };
export const RanchOpen: Story = { args: { theme: 'ranch', defaultOpen: true } };
export const Stack: Story = {
  render: () => (
    <Accordion>
      <AccordionItem theme="ranch" title="¿Cómo funcionan los puntos Rewards?" defaultOpen>
        Ganas puntos en cada pedido y los canjeas por platos y bebidas.
      </AccordionItem>
      <AccordionItem theme="ranch" title="¿Hay opciones sin gluten?">
        Consulta nuestra guía de alérgenos en cada local.
      </AccordionItem>
      <AccordionItem theme="ranch" title="¿Aceptan reservas para grupos?">
        Sí, desde 8 personas escríbenos con 48 horas de anticipación.
      </AccordionItem>
    </Accordion>
  ),
};
