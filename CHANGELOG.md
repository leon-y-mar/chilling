# Changelog

Espeja la página **QA & Changelog** del archivo de Figma. Figma es la fuente de verdad.

## En curso — Iconografía Style Guide 2025 (rama `feat/iconografia-styleguide-2025`)
- Colores de ilustración aprobados (16/10/2026): primitivas `illustration-*` (skin, skin-highlight, wood, chocolate-outline, chocolate, chocolate-drizzle, chocolate-glaze) y semánticos técnicos `color-illustration-*`, con el mismo valor en Light y Dark. Toda la piel usa `color-illustration-skin`; la mano de 1-Tap Reorder deja `#B25B20`.
- Semánticos técnicos de marca para ilustraciones: `color-illustration-outline`, `-red`, `-yellow`, `-green`, `-white`, `-ranch` y `-cream`, que apuntan a primitivas existentes (el rojo usa `brand-chilis-red-aa`). Las ilustraciones a color ya no usan primitivas directamente.
- Figma: `Animation/trash` queda con 3 cuadros animados (`State=Default`) y el estado `State=Disabled` (no se puede eliminar), homologado con los íconos deshabilitados: contorno `color-icon-disabled`, igual en Light y Dark.
- Mismas variables en Figma (Primitives → Color) y documentadas en Foundations (Light y Dark), en la página Assets y en Storybook (Foundations / Colors).
- Figma: medios de pago con marco en `gray/white` y borde `gray/gray-3`; los logotipos de terceros y el de la tarjeta Chili's no se recolorean. Se quitó `visa-alt` (era el mismo dibujo que `visa`).
- Figma: `Animation/hourglass` pasa a 4 cuadros con giro a pasos de 90°; los cuadros 5–8 de la guía eran la versión Dark y ahora salen de los tokens.
- Tokens de ícono aprobados (I1–I3): `color-icon-primary` en Dark pasa a `brand-ranch`; nuevo `color-icon-surface` (ranch / azul noche) y las excepciones `color-icon-surface-brand`, `-accent` y `-white`. Auditoría de contraste actualizada (12.19:1 sobre canvas Dark).
- Tamaños de ícono `size-icon-xs` (16) y `size-icon-lg` (48), además de `size-icon-sm` (24) y `size-icon` (32).
- Semánticos técnicos del marco de pago: `color-payment-bg` (gray-white) y `color-payment-border` (gray-3), iguales en Light y Dark. En Figma: `color/payment/bg` y `color/payment/border`, enlazados en `Payment/*` y documentados en Foundations.
- Componentes nuevos para *Other*: `AnimatedIcon` (margarita y hourglass en bucle; trash y megaphone como interacción que crece al 115 % y regresa; 1–3 s, 2 s por defecto; reduce motion = cuadro 1), `FaqBadge` (shape × variant × color × size), `Illustration` (color · outline) y `PaymentLogo`. Documentados en `DESIGN.md` y con historias en Storybook.
- Repo: se suben `.storybook/`, `.gitignore` y `.nvmrc`, que existían solo en la copia local; ahora Storybook se puede compilar desde GitLab.
- **Íconos del Style Guide 2025** (F3): 94 íconos generados desde Figma (Assets · `Icon/*`) reemplazan a los 58 anteriores, con colores enlazados a tokens. `IconName` ahora valida los nombres en TypeScript. Alias temporales para los nombres anteriores (`help`, `eye`, `eye-off`, `phone`, `checkbox-disabled`, `radio-disabled`); Checkbox, Radio, Input y Dropdown ya usan los nombres nuevos.
- Marcas sobre amarillo con `color-text-on-accent` (azul noche en Light y Dark): plus, pause, warning, arrow-circle-u/d, el «?» de FAQ sunrise y los listones de la papelera en su cuadro 1. Igual en Figma.
- Header: prop `cartCount` con el contador del carrito (`Badge/Cart count`): «0» vacío y «99+» desde 100.
- Storybook: Foundations / Icons con la escala 16–48; Foundations / Colors corrige las muestras de Background, que salían vacías.

## Solo repo — DESIGN.md como fuente de verdad
- Nuevo `DESIGN.md` en la raíz (formato Google Labs, alpha): tokens en YAML, tipografía, layout, componentes y reglas en un solo archivo.
- Reemplaza `docs/DESIGN-MD-COMPONENTS.md`, `docs/USAGE-GUIDELINES.md` y la página *Agent Guidelines* de Storybook. Las pestañas Docs de los componentes y la página **DESIGN.md** leen de él.
- `npm run design:check` compara `DESIGN.md` con `tokens.css` y `src/components`.
- Texto de uso corregido al migrar: Chip, Date Cell y Table Card · Bill decían `bg/night`; el código y Figma 1.2.0 usan `bg/inverse` + `text/inverse`.
- Sin cambios de valores de diseño ni de versión de Figma.

## 1.2.0 — Contraste y alineación Figma ↔ repo
- Light: `color/border/default` pasa de `gray-4` a `ext/gray-6` (5.17:1 sobre blanco, 4.83:1 sobre surface). `color/text/brand` pasa de `brand/chilis-red-aa` a `alert/error` (6.52:1 sobre blanco, 6.09:1 sobre surface). Dark sin cambios. Se aplicó en Figma y en `tokens.css`.
- Descripciones de uso (USAR / NO USAR) en los 26 componentes de Figma, iguales a `docs/FIGMA-DESCRIPTIONS.md` y a la pestaña Docs de Storybook (hoy derivadas de `DESIGN.md`).
- Estados seleccionados de Chip, Date Cell, Time Slot y Table Card · Bill enlazados a `bg/inverse` y `text/inverse` en Figma (el código ya los usaba): idénticos en Light, distinguibles en Dark.
- Figma · Documentation: Segmented seleccionado = azul noche sobre amarillo accent.
- Repo: foco y teclado en Modal y Segmented, `prefers-reduced-motion`, tamaños de texto con tokens `--type-*`, a11y de Storybook en modo `error`.
- Regla de uso: el estado de una alerta nunca se comunica solo con el borde (el ámbar de Warning es decorativo).
- Pendientes de marca: borde de advertencia (ámbar, 1.94:1 sobre blanco) y texto de éxito sobre surface.

## 1.1.0 — Flujo de Registro
OTP Input, Password Strength e íconos de Google, Facebook y Apple (glifos simplificados, pendientes de reemplazo por assets oficiales).

## 1.0.0 — Primera versión
Tokens, íconos, logo y componentes iniciales.
