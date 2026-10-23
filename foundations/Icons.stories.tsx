import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, iconNames } from '../icons/Icon';
import { Logo } from '../components/Logo/Logo';
import './docs.css';

function Icons() {
  return (
    <div className="fd">
      <p className="note">
        {iconNames.length} íconos del Style Guide 2025 (Figma: Assets · Icon/*), lienzo de 32×32. Los colores se enlazan a <code>--color-icon-*</code>,
        <code> --color-bg-*</code> y <code>--color-text-on-accent</code>, por lo que se adaptan a Dark. Uso: <code>{'<Icon name="cart" />'}</code>; tamaños 16, 24,
        32 y 48 con <code>size</code>. Sin <code>label</code> el ícono es decorativo. Las 4 ilustraciones en contorno se usan con <code>{'<Illustration variant="outline" />'}</code>.
      </p>
      <div className="fd-icons">
        {iconNames.map((n) => (
          <div className="fd-icon" key={n}>
            <Icon name={n} />
            <code>{n}</code>
          </div>
        ))}
        <div className="fd-icon">
          <Logo size={48} />
          <code>Logo/Chilis</code>
        </div>
      </div>
    </div>
  );
}

const meta = { title: 'Foundations/Icons', component: Icons, parameters: { layout: 'padded' } } satisfies Meta<typeof Icons>;
export default meta;
export const Gallery: StoryObj<typeof meta> = {};

/** Escala del Style Guide 2025: 16, 24, 32 y 48 px. */
export const Sizes: StoryObj<typeof meta> = {
  render: () => (
    <div className="fd">
      <div className="fd-icons">
        {[16, 24, 32, 48].map((s) => (
          <div className="fd-icon" key={s}>
            <Icon name="arrow-outline-r" size={s} />
            <code>{s} px</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
