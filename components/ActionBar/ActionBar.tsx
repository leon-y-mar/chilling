import { Button } from '../Button/Button';
import { Price } from '../ProductCard/ProductCard';
import './action-bar.css';

export interface ActionBarProps {
  total: string;
  totalLabel?: string;
  secondaryLabel?: string;
  primaryLabel?: string;
  onSecondary?: () => void;
  onPrimary?: () => void;
}

/**
 * Figma: Action Bar. Barra inferior fija de acciones del pedido (tablet: botones Large = 56px;
 * aplica data-sizing="tablet" en el contenedor).
 */
export function ActionBar({
  total,
  totalLabel = 'Total',
  secondaryLabel = 'Cuenta',
  primaryLabel = 'Enviar a cocina',
  onSecondary,
  onPrimary,
}: ActionBarProps) {
  return (
    <div className="chilis-action-bar">
      <div className="chilis-action-bar__total">
        <span className="chilis-action-bar__total-label">{totalLabel}</span>
        <Price size="medium">{total}</Price>
      </div>
      <Button variant="outlined" onClick={onSecondary}>
        {secondaryLabel}
      </Button>
      <Button onClick={onPrimary}>{primaryLabel}</Button>
    </div>
  );
}
