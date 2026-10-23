import logoUrl from '../../assets/logo-chilis.svg';

export interface LogoProps {
  /** Tamaño en px (cuadrado). Figma: 124 por defecto; 96 en Header; 120 en Reservas. */
  size?: number;
  alt?: string;
}

/**
 * Figma: Logo/Chilis. Insignia circular oficial.
 * NO modificar colores: #E1261C y #638C1C son del logo y difieren de los tokens de UI.
 */
export function Logo({ size = 124, alt = "Chili's" }: LogoProps) {
  return <img src={logoUrl} width={size} height={size} alt={alt} className="chilis-logo" style={{ display: 'block', flex: 'none' }} />;
}
