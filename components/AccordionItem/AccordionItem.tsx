import { useId, type ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import { cx } from '../../utils/cx';
import { useControllable } from '../../utils/useControllable';
import './accordion.css';

export interface AccordionItemProps {
  /** Figma: Theme. Navy (fondo night) o Ranch (fondo cálido). */
  theme?: 'navy' | 'ranch';
  title: string;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  children: ReactNode;
}

/** Figma: Accordion Item (Theme × Open). Apila varios para formar un acordeón. */
export function AccordionItem({ theme = 'navy', title, open, defaultOpen = false, onToggle, children }: AccordionItemProps) {
  const [isOpen, setOpen] = useControllable<boolean>(open, defaultOpen, onToggle);
  const id = useId();
  return (
    <div className={cx('chilis-accordion', `chilis-accordion--${theme}`)}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          className="chilis-accordion__header"
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen(!isOpen)}
        >
          <span>{title}</span>
          <Icon name={isOpen ? 'caret-circle-u' : 'caret-circle-d'} size={24} />
        </button>
      </h3>
      {isOpen && (
        <p id={`${id}-panel`} role="region" aria-label={title} className="chilis-accordion__content">
          {children}
        </p>
      )}
      <div className="chilis-accordion__divider" />
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="chilis-accordion-stack">{children}</div>;
}
