import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { cx } from '../../utils/cx';
import './modal.css';

export type ModalLayout = 'image-left' | 'image-right' | 'image-top' | 'none';

export interface ModalProps {
  /** Figma: Layout. */
  layout?: ModalLayout;
  title: string;
  children: ReactNode;
  /** Imagen (reemplaza el placeholder). Debe ser fotografía de marca. */
  image?: ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose?: () => void;
  closeLabel?: string;
}

/** Figma: Modal. Panel de diálogo; el consumidor controla apertura y scrim (ver `ModalScrim`). */
export function Modal({
  layout = 'none',
  title,
  children,
  image,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  onClose,
  closeLabel = 'Cerrar',
}: ModalProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const hasImage = layout !== 'none';
  const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  // Foco inicial dentro del diálogo y devolución al disparador al cerrar.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => trigger?.focus?.();
  }, []);

  // Escape cierra; Tab queda atrapado dentro del diálogo.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose?.();
      return;
    }
    if (e.key !== 'Tab' || !ref.current) return;
    const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={`${id}-t`} onKeyDown={onKeyDown} className={cx('chilis-modal', `chilis-modal--${layout}`)}>
      {hasImage && <div className="chilis-modal__image">{image}</div>}
      <div className="chilis-modal__content">
        <h2 id={`${id}-t`} className="chilis-modal__title">
          {title}
        </h2>
        <p className="chilis-modal__body">{children}</p>
        {(primaryLabel || secondaryLabel) && (
          <div className="chilis-modal__actions">
            {primaryLabel && (
              <Button size="small" onClick={onPrimary}>
                {primaryLabel}
              </Button>
            )}
            {secondaryLabel && (
              <Button size="small" variant="outlined" onClick={onSecondary}>
                {secondaryLabel}
              </Button>
            )}
          </div>
        )}
      </div>
      <button type="button" className="chilis-modal__close" aria-label={closeLabel} onClick={onClose}>
        <Icon name="close" size={24} />
      </button>
    </div>
  );
}

/** Fondo `bg/scrim` para presentar un Modal sobre la página. */
export function ModalScrim({ children, minHeight = 420 }: { children: ReactNode; minHeight?: number }) {
  return (
    <div className="chilis-modal-scrim" style={{ minHeight }}>
      {children}
    </div>
  );
}
