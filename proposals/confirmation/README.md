# Confirmación de pedido · 5 propuestas

Prototipos web responsive (1440 / 820 / 390) de la página de confirmación del ecommerce, construidos con el design system de este repo (tokens + componentes React). Reemplazan el wireframe actual con un objetivo: **dar más visibilidad al cupón e incentivar la recompra** sin perder confirmación, seguimiento y detalle.

- Benchmark (Mobbin, 8 web + 9 iOS) y aprendizajes: Figma → *CH | Checkout* → 🏀 Playground → frame `bENCHMARK` (node 917:15264).
- Cada propuesta cita el aprendizaje del benchmark que la sustenta (L01–L08).

## Cómo verlas

```bash
npm install
npm run proposals:confirmation
```

Abre `http://localhost:5173/#a` … `#e`. La barra azul superior es solo del prototipo: cambia de propuesta y **simula el avance del pedido** (Recibido → En cocina → En camino → Entregado).

## Las 5 propuestas

| | Propuesta | Idea | Benchmark |
|---|---|---|---|
| A | **Ticket protagonista** | El cupón es un ticket troquelado a todo el ancho, entre el "gracias" y el seguimiento. | L03 · L04 (Under Armour, Gymshark) |
| B | **Dashboard de pedido** | Estado + ETA grande con stepper etiquetado; el cupón acompaña fijo (sticky) a la derecha y sube al 2.º lugar en mobile. | L01 · L02 · L06 (Chipotle, sweetgreen, Blue Apron) |
| C | **Momento recompensa** | El titular es la recompensa: "Pablo, ganaste S/ 10" con conteo animado. La confirmación es el antetítulo. | L03 · L07 (Under Armour, Everyday Rewards) |
| D | **Contrarreloj** | Ahorro de hoy (S/ 5.00) como prueba + cuenta regresiva del cupón. En mobile, la acción vive en una barra fija. | L05 · L07 (Wolt, Walmart) |
| E | **Recompra guiada** | Armas el próximo pedido aquí mismo: una barra de avance desbloquea el cupón al llegar a S/ 60.00. | L08 · L04 (Yami, Etsy) |

Decisiones comunes a todas:

1. **El cupón se guarda en la cuenta** y se aplica solo en el checkout. "Copiar código" pasa a ser secundario.
2. **Stepper con 4 pasos nombrados** en lugar de 5 barras sin etiqueta.
3. **ETA en Dirk grande** ("20–30 MIN") + ventana horaria.
4. **Una sola acción primaria** (Button Offset rojo) por vista, como pide DESIGN.md.
5. **Sin sombras suaves ni esquinas mixtas**: profundidad con bordes 2 px y superficies `surface-warm` / `night`.

## Datos

Son de ejemplo y vienen del wireframe, **con la aritmética corregida**: el wireframe mostraba 2 × Chicken Crispers a S/ 44.50 con subtotal S/ 44.50, y un total (S/ 46.50) que no cuadraba con sus propias líneas (daba S/ 46.20). Aquí: subtotal S/ 89.00 − S/ 5.00 + S/ 6.70 = **S/ 90.70**.

**Placeholders a validar con negocio**: valor del cupón (S/ 10; el wireframe dice S/ 00.00), código `VUELVE10`, precios de Chips & Salsa y Molten Chocolate Cake, y la ventana horaria de entrega.

## Hallazgos sobre el design system

Al construir esto aparecieron brechas del DS que conviene resolver:

- `index.ts` exporta componentes que no están en el repo (`ProductCard`, `Quantity`, `PaymentLogo`, `Radio`, `Toggle`, `Segmented`, `PasswordStrength`, `TimeSlot`, `ReservationSummary`, `TableCard`). Por eso `CartItem`, `OrderItem` y `ActionBar` no compilan y aquí se importan los componentes uno a uno.
- `Logo` importa `../../assets/logo-chilis.svg`, pero el archivo está en `public/`. El `vite.config.ts` de esta carpeta lo resuelve con un alias.
- La fuente **Dirk** (trial) no está versionada. Se declara con `local()`: si la tienes instalada se usa; si no, los titulares caen a Montserrat.
- `AccordionItem` envuelve el contenido en un `<p>`, así que no admite listas ni bloques. Propuesta: cambiarlo a `<div>`.
- `AccordionItem` tiene ancho fijo de 640 px. Aquí se fuerza al 100 % del contenedor.
- Faltan componentes que esta página necesita y que deberían entrar al DS: **Stepper de pedido**, **Coupon / Ticket** y **Código copiable**.
