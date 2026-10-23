# Descripciones propuestas para Figma (campo Description de cada componente)

> Derivado de `DESIGN.md` (`#### Cuándo usarlo` y `#### Cuándo no usarlo` de cada componente). Si cambia el texto en `DESIGN.md`, actualiza aquí el campo Description de Figma.

Formato: intro + USAR + NO USAR. Máx. ~500 caracteres.

## Button
```
Botón Chili's. USAR: Acción principal de cada pantalla: Offset rojo (Agregar, Checkout, Confirmar reserva, Enviar a cocina). Una sola por vista. Acción secundaria junto a una primaria: Outlined (p. ej. Cuenta junto a Enviar a cocina). NO USAR: Dos botones Offset rojos en la misma vista. Outlined o Link en Ranch/Yellow: solo existen en Red y Blue.
```
Caracteres: 348

## Input
```
Campo de texto de una línea. USAR: Capturar texto corto: nombre, correo, teléfono, dirección, notas del pedido. Cuando la persona escribe un valor libre que no está en una lista cerrada. NO USAR: Códigos de 6 dígitos: usa OTP Input. Elegir de una lista cerrada: usa Dropdown, Radio o Segmented.
```
Caracteres: 294

## Dropdown
```
Selector de una opción de una lista cerrada. USAR: Listas de 4 a ~12 opciones sin búsqueda: local, método de pago, tipo de documento. Cuando el espacio no permite mostrar todas las opciones a la vez. NO USAR: 2–3 opciones que caben visibles: usa Radio o Segmented. Listas muy largas que necesitan búsqueda: usa Input con sugerencias.
```
Caracteres: 333

## Checkbox
```
Casilla de verificación. USAR: Elegir cero, una o varias opciones: extras de un plato, aceptar términos, recordarme. Cuando el cambio se confirma después con un botón (Guardar, Enviar). NO USAR: Elegir exactamente una opción: usa Radio. Ajustes que se aplican al instante: usa Toggle.
```
Caracteres: 284

## Radio
```
Botón de opción. USAR: Elegir exactamente una opción de un grupo corto (2–5) con todas visibles: tipo de pedido, método de pago. Siempre en grupo, con una opción preseleccionada cuando hay un valor razonable por defecto. NO USAR: Varias opciones a la vez: usa Checkbox. Listas largas: usa Dropdown.
```
Caracteres: 298

## Toggle
```
Interruptor de encendido/apagado. USAR: Ajustes que se aplican de inmediato: notificaciones, recordar tarjeta. Etiqueta que describe el estado encendido (Recibir promociones). NO USAR: Cambios que requieren pulsar Guardar o Enviar: usa Checkbox. Elegir entre más de dos opciones: usa Radio o Segmented.
```
Caracteres: 302

## Segmented Item
```
Control segmentado (ítem + grupo). USAR: Alternar entre 2–4 vistas o modos excluyentes del mismo contenido: Delivery / Recojo / En local. Cuando el cambio actualiza el contenido de inmediato. NO USAR: Filtros o categorías con muchas opciones: usa Chip. Selección dentro de un formulario con envío: usa Radio.
```
Caracteres: 308

## Arrow Button
```
Botón circular de flecha. USAR: Navegar entre elementos secuenciales: carrusel de promociones, pasos, semana anterior/siguiente. Siempre en par (izquierda y derecha). NO USAR: Acción principal: usa Button. Abrir o cerrar contenido: usa los caret del Accordion.
```
Caracteres: 260

## OTP Input
```
Entrada de código de un solo uso de 6 celdas. USAR: Verificar teléfono o correo con un código numérico de 6 dígitos: registro, recuperar contraseña, confirmar reserva. Con mensaje de error claro cuando el código es incorrecto. NO USAR: Texto libre: usa Input. Códigos de longitud distinta a 6 sin ajustar el componente.
```
Caracteres: 319

## Password Strength
```
Indicador de seguridad de contraseña. USAR: Debajo del Input de contraseña al crear o cambiar una contraseña. Con la sugerencia de requisitos visible. NO USAR: Al iniciar sesión. Como único mecanismo de validación: las reglas de la contraseña deben estar escritas.
```
Caracteres: 264

## Alert
```
Mensaje de estado (Success, Warning, Error, Loading). USAR: Confirmar, avisar, informar un error o un proceso en curso. Inline junto a un campo, Boxed dentro del contenido, Banner para avisos globales. Mensajes que dicen qué pasó y qué hacer. NO USAR: Decisiones que interrumpen el flujo: usa Modal. Mensajes decorativos o promocionales sin estado.
```
Caracteres: 348

## Modal
```
Diálogo modal. USAR: Una decisión o mensaje que interrumpe y requiere respuesta: invitación a Rewards, confirmación, aviso importante. Una acción primaria y una secundaria opcional. NO USAR: Mensajes que no requieren respuesta: usa Alert. Formularios largos: usa una página.
```
Caracteres: 274

## Accordion Item
```
Ítem de acordeón (Navy / Ranch). USAR: Preguntas frecuentes y contenido de apoyo que no todos necesitan leer: políticas, alérgenos, términos. Apilado en Accordion; cada ítem abre y cierra de forma independiente. NO USAR: Contenido esencial para completar una tarea. Un solo ítem aislado sin relación con otros.
```
Caracteres: 310

## Chip
```
Chip/tab de categoría. USAR: Filtrar o cambiar de categoría en una lista: categorías del menú, filtros de zona (Todas, Salón, Terraza, Barra). Una fila de 3–8 chips con selección única. NO USAR: Alternar 2–4 modos de un mismo control: usa Segmented. Elegir dentro de un formulario: usa Radio o Dropdown.
```
Caracteres: 303

## Quantity
```
Control de cantidad. USAR: Cambiar la cantidad de un producto dentro de Cart Item y Order Item. Con min definido según el contexto (0 elimina la línea). NO USAR: Número de comensales: usa Party Size. Cantidades grandes que requieren teclear: usa Input.
```
Caracteres: 252

## Product Card
```
Tarjeta de producto del menú. USAR: Grilla del menú del ecommerce: una tarjeta = un producto con acción rápida de agregar. Precio en soles con formato S/ 39.90 en Dirk. NO USAR: Más de un botón primario por tarjeta. Productos que requieren personalizar sin pasar al detalle.
```
Caracteres: 274

## Header
```
Encabezado del sitio. USAR: Una vez en la parte superior de cada página del ecommerce. Desktop con navegación visible; Mobile con menú. NO USAR: Pantallas de tablet del mozo: Reservas solo muestra el logo y Toma de pedido no lleva encabezado. Más de un Header por página.
```
Caracteres: 271

## Cart Item
```
Línea del carrito con cantidad y modificadores. USAR: Panel Tu pedido del ecommerce, apiladas antes del Cart Summary. Con imagen, nombre, modificadores, cantidad y precio. NO USAR: Pedido del mozo en tablet: usa Order Item. Listados del menú: usa Product Card.
```
Caracteres: 260

## Cart Summary
```
Resumen del carrito con total en soles y CTA. USAR: Al final del panel Tu pedido, debajo de los Cart Items. Contiene la única acción primaria (Checkout). NO USAR: Más de una acción primaria. Resúmenes de reserva: usa Reservation Summary.
```
Caracteres: 237

## Date Cell
```
Celda de fecha. USAR: Paso Fecha de una reserva: fila de 5–7 días con selección única. Días sin disponibilidad deshabilitados, no ocultos. NO USAR: Calendarios completos de mes: requieren otro componente. Selección múltiple.
```
Caracteres: 224

## Time Slot
```
Franja horaria. USAR: Paso Hora de una reserva, bajo las Date Cells; selección única. Horas completas deshabilitadas. NO USAR: Elegir fechas: usa Date Cell. Rangos de horas libres: usa Input o Dropdown.
```
Caracteres: 202

## Party Size
```
Selector de número de comensales para tablet. USAR: Paso Personas de una reserva, después de Fecha y Hora. Con min y max según el aforo. NO USAR: Cantidad de producto: usa Quantity. Grupos grandes sin canal de contacto alterno.
```
Caracteres: 227

## Reservation Summary
```
Resumen de reserva con CTA de confirmación. USAR: Al final del flujo de Reservas (tablet) con Fecha, Hora, Personas y Local. Contiene la única acción primaria: Confirmar reserva. NO USAR: Resumen de pedido o carrito: usa Cart Summary. Más de una acción primaria.
```
Caracteres: 262

## Table Card
```
Tarjeta de mesa para el mozo. USAR: Plano de mesas de la Toma de pedido (tablet horizontal), con filtros en Chips. Estado siempre con color y etiqueta: Libre, Ocupada, Reservada, Cuenta. NO USAR: Comunicar el estado solo con color. Uso en el ecommerce.
```
Caracteres: 252

## Order Item
```
Línea de pedido con cantidad y modificadores. USAR: Panel Pedido · Mesa N en la Toma de pedido (tablet). Modificadores con prefijo + (añadido) o − (quitado). NO USAR: Carrito del cliente con imagen: usa Cart Item. Comunicar añadidos o quitados solo con color.
```
Caracteres: 259

## Action Bar
```
Barra inferior fija de acciones del pedido. USAR: Pie de la Toma de pedido (tablet horizontal), siempre visible. Total + acción secundaria (Cuenta) + acción primaria (Enviar a cocina). NO USAR: Más de una acción primaria. Ecommerce: usa Cart Summary.
```
Caracteres: 250
