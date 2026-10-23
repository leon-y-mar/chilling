# Chili's Design System 🇵🇪

Sistema de diseño para las experiencias digitales de Chili's Perú.

Chili's Design System centraliza los fundamentos visuales, componentes
reutilizables, patrones de interfaz y estándares de implementación
necesarios para construir productos digitales consistentes, escalables
y accesibles.

El sistema está desarrollado con React, TypeScript y Storybook,
y cuenta con documentación estructurada mediante DESIGN.md.

---

## 1. Descripción general

Chili's Design System establece un lenguaje visual y funcional
compartido para el diseño y desarrollo de experiencias digitales.

Su arquitectura permite mantener consistencia entre productos,
facilitar la reutilización de componentes y reducir diferencias
entre diseño e implementación.

### Objetivos

- Garantizar consistencia visual y funcional.
- Centralizar los fundamentos de diseño.
- Promover la reutilización de componentes.
- Facilitar la colaboración entre diseño y desarrollo.
- Estandarizar propiedades, variantes y estados.
- Documentar comportamientos y criterios de accesibilidad.
- Facilitar la implementación mediante agentes de IA.
- Mantener trazabilidad de cambios y versiones.

### Experiencias contempladas

El sistema contempla componentes y patrones para:

- Ecommerce y menú digital.
- Experiencias de reserva en tablet.
- Experiencias de toma de pedidos en tablet.
- Interfaces responsive.
- Modos de apariencia Light y Dark.

---

## 2. Arquitectura del Design System

El sistema está organizado en cuatro niveles principales.

### 2.1 Foundations

Definen los fundamentos visuales y estructurales.

Incluyen:

- Colores.
- Tipografía.
- Espaciado.
- Bordes.
- Radios.
- Dimensiones.
- Layout.
- Motion.
- Iconografía.
- Identidad visual.

Los foundations permiten mantener consistencia entre
todos los componentes y patrones del sistema.

### 2.2 Components

Son elementos reutilizables que permiten construir
interfaces mediante propiedades, variantes y estados.

Cada componente incluye:

- Implementación en React.
- Estilos mediante tokens.
- Propiedades configurables.
- Variantes visuales.
- Estados de interacción.
- Documentación de uso.
- Consideraciones de accesibilidad.
- Stories interactivas.

### 2.3 Patterns

Son composiciones de componentes que representan
soluciones reutilizables para experiencias específicas.

Los patrones disponibles contemplan:

- Ecommerce y menú.
- Reservas en tablet.
- Toma de pedidos en tablet.

### 2.4 Documentation

La documentación establece las reglas y contratos
necesarios para utilizar y mantener el sistema.

Se distribuye entre:

- DESIGN.md.
- Storybook Docs.
- README.md.
- CHANGELOG.md.

---

## 3. Herramientas y responsabilidades

| Herramienta | Responsabilidad |
|---|---|
| Figma | Especificaciones visuales y diseño de componentes |
| DESIGN.md | Contratos, tokens y reglas del sistema |
| Storybook | Catálogo oficial de componentes implementados |
| GitLab | Repositorio y control de versiones |
| React | Implementación de componentes |
| TypeScript | Tipado y contratos técnicos |
| CSS Tokens | Variables y estilos reutilizables |
| Claude / Codex | Implementación asistida por inteligencia artificial |

### Relación entre herramientas

Figma documenta las especificaciones visuales.

DESIGN.md establece los contratos que deben respetar
las implementaciones.

Storybook permite consultar, probar y documentar
los componentes implementados.

GitLab centraliza el código y su versionamiento.

Los agentes de inteligencia artificial deben utilizar
DESIGN.md y los componentes existentes como contexto
antes de generar nuevas interfaces.

---

## 4. DESIGN.md: contrato del sistema

El archivo DESIGN.md ubicado en la raíz del repositorio
es la referencia principal para las reglas de diseño
que debe cumplir el código.

Centraliza:

- Tokens de diseño.
- Colores.
- Tipografía.
- Layout.
- Componentes.
- Propiedades.
- Variantes.
- Estados.
- Reglas de implementación.
- Accesibilidad.
- Criterios de uso.

### Integración con Storybook

Storybook utiliza la información documentada en DESIGN.md
para presentar las especificaciones de los componentes.

Cada componente dispone de una sección Docs que permite
consultar sus características y recomendaciones de uso.

El sistema también incluye una página dedicada
a consultar DESIGN.md.

### Validación de consistencia

El repositorio incluye mecanismos para comprobar
la consistencia entre documentación e implementación.

Ejecutar:

npm run design:check

Este comando compara DESIGN.md con los tokens CSS
y los componentes implementados.

También está disponible:

npm run design:lint

Este comando valida el formato de DESIGN.md mediante
la herramienta correspondiente.

### Reglas de mantenimiento

- Mantener sincronizados DESIGN.md y el código.
- Utilizar tokens existentes.
- Evitar valores visuales arbitrarios.
- Documentar nuevas propiedades y variantes.
- Actualizar las stories correspondientes.
- Validar los cambios antes de publicarlos.

---

## 5. Storybook

Storybook es el catálogo oficial de componentes
implementados de Chili's Design System.

Permite consultar y probar de forma interactiva:

- Foundations.
- Componentes.
- Variantes.
- Estados.
- Propiedades.
- Comportamientos.
- Patrones de interfaz.
- Documentación técnica.

### Organización

| Sección | Contenido |
|---|---|
| Introduction | Descripción y documentación general |
| Foundations | Colores, tipografía, espaciado, iconos y logo |
| Components | Componentes reutilizables |
| Patterns | Composiciones y experiencias de referencia |
| DESIGN.md | Contratos y reglas del sistema |

### Documentación interactiva

Cada componente dispone de stories que permiten
visualizar sus variantes y estados.

La pestaña Docs contiene información sobre:

- Descripción.
- Uso recomendado.
- Propiedades.
- Variantes.
- Estados.
- Comportamiento.
- Accesibilidad.

---

## 6. Catálogo de componentes

El sistema contempla 30 componentes organizados
por su responsabilidad funcional.

### Acciones y selección

- Button
- Arrow Button
- Checkbox
- Radio
- Toggle
- Segmented
- Chip

### Formularios y entradas

- Input
- Dropdown
- OTP Input
- Password Strength
- Quantity

### Información y comunicación

- Alert
- Modal
- Accordion Item

### Ecommerce

- Product Card
- Header
- Cart Item
- Cart Summary

### Reservas

- Date Cell
- Time Slot
- Party Size
- Reservation Summary

### Toma de pedidos

- Table Card
- Order Item
- Action Bar

### Iconografía e ilustración

- Animated Icon
- FAQ Badge
- Illustration
- Payment Logo

Los componentes cuentan con propiedades y estados
configurables según su responsabilidad.

Antes de crear un componente nuevo, se debe revisar
si existe una solución reutilizable en Storybook.

---

## 7. Foundations

### 7.1 Colores

El sistema utiliza tokens de color para garantizar
consistencia entre componentes y experiencias.

Los colores se organizan mediante variables
que permiten controlar su aplicación.

Los componentes deben consumir tokens y evitar
valores hexadecimales definidos directamente.

### 7.2 Tipografía

La tipografía del sistema se encuentra centralizada
mediante tokens tipográficos.

Los componentes deben utilizar los tamaños,
pesos y estilos definidos en el sistema.

Las fuentes de marca se gestionan desde:

src/tokens/fonts.css

Los archivos tipográficos se encuentran en:

src/assets/fonts/

La distribución y utilización de estos archivos
debe respetar sus respectivas licencias.

### 7.3 Espaciado

El sistema utiliza una escala de espaciado
para mantener consistencia en:

- Separaciones.
- Padding.
- Márgenes.
- Distribución de contenido.
- Composición de componentes.

### 7.4 Bordes y radios

Los componentes utilizan tokens para definir:

- Grosor de bordes.
- Radios.
- Contornos.
- Estados de interacción.

### 7.5 Iconografía

El sistema dispone de una biblioteca de 94 iconos
del Style Guide 2025, generados desde Figma.

Los iconos se implementan mediante componentes
reutilizables y recursos SVG.

### 7.6 Identidad visual

Los recursos de identidad visual se encuentran
centralizados en el repositorio.

Su utilización debe respetar las especificaciones
visuales del sistema.

---

## 8. Modos de apariencia

Chili's Design System incluye implementaciones
para Light y Dark.

Los componentes utilizan tokens que permiten
adaptar su apariencia según el modo seleccionado.

### Light

Modo de apariencia clara.

### Dark

Modo de apariencia oscura.

### Implementación

El modo de apariencia se controla mediante
el atributo data-theme.

Ejemplo:

```tsx
<div data-theme="dark">
  <Button>Ordenar ahora</Button>
</div>
```

El modo predeterminado es Light.

Los modos deben mantener consistencia visual,
legibilidad y contraste.

La implementación de ambos modos no sustituye
la validación de las especificaciones de marca.

---

## 9. Responsive y dispositivos

El sistema contempla experiencias responsive
y configuraciones para tablet.

### Breakpoints

| Dispositivo | Resolución |
|---|---|
| Desktop | ≥ 1024 px |
| Tablet | 600–1023 px |
| Mobile | ≤ 599 px |

### Anchos de referencia

- Desktop: 1440 px.
- Tablet: 820 px.
- Mobile: 390 px.

### Configuración tablet

Los componentes pueden utilizar el atributo:

data-sizing="tablet"

Esta configuración adapta determinadas
dimensiones y objetivos táctiles.

Las dimensiones específicas se encuentran
definidas en los tokens del sistema.

---

## 10. Patrones de interfaz

Los patrones permiten visualizar cómo se
combinan los componentes del sistema.

### Ecommerce y menú

Incluye composiciones relacionadas con:

- Exploración de productos.
- Selección de productos.
- Carrito de compras.
- Resumen de compra.

### Reservas

Incluye composiciones relacionadas con:

- Selección de fecha.
- Selección de horario.
- Cantidad de personas.
- Resumen de reserva.

### Toma de pedidos

Incluye composiciones relacionadas con:

- Selección de mesas.
- Gestión de pedidos.
- Productos agregados.
- Acciones operativas.

Los patrones utilizan los componentes
y tokens definidos en el sistema.

---

## 11. Accesibilidad

Los componentes deben considerar criterios
de accesibilidad desde su implementación.

### Principios

- Mantener contraste adecuado.
- Proporcionar estados de foco visibles.
- Permitir interacción mediante teclado.
- Utilizar etiquetas accesibles.
- Evitar comunicar estados únicamente mediante color.
- Mantener objetivos táctiles adecuados.
- Considerar estados deshabilitados y de error.

### Comportamientos implementados

Modal:

- Gestiona el foco.
- Permite cerrar mediante Escape.
- Devuelve el foco al elemento correspondiente.

Segmented:

- Permite navegación mediante teclado.
- Utiliza un único punto de entrada en la secuencia Tab.

Dropdown:

- Implementa un comportamiento básico de listbox.
- Requiere completar la validación de accesibilidad
  antes de considerarse preparado para producción.

### Auditoría

Los resultados de contraste y accesibilidad
se documentan en Storybook.

Las incidencias identificadas deben mantenerse
visibles hasta su resolución.

---

## 12. Decisiones de diseño e implementación

Las siguientes configuraciones forman parte
de las especificaciones implementadas.

### Segmented

El estado seleccionado utiliza amarillo accent
con texto azul noche en Light y Dark.

### Modal Image Right

El botón de cierre se posiciona sobre la imagen,
siguiendo la composición visual definida.

Debe mantenerse accesible y permitir
una interacción adecuada.

### Logo

El sistema contempla diferentes presentaciones
del logo según el modo de apariencia.

### Estados seleccionados

Chip, Date Cell, Time Slot y Table Card utilizan
tokens inversos para representar la selección.

### Table Card · Bill

El icono users utiliza el token text/inverse.

### Cart Item y Order Item

Quantity permite un valor mínimo de cero.

La experiencia que consume el componente
define el comportamiento correspondiente
cuando la cantidad llega a cero.

### Tipografía

Los componentes utilizan tokens --type-*
para controlar sus estilos tipográficos.

---

## 13. Consideraciones técnicas

Las decisiones visuales implementadas deben
distinguirse de las validaciones técnicas pendientes.

### Contraste

El sistema incluye una auditoría de contraste
en la sección Foundations de Storybook.

Los ajustes documentados incluyen:

- border/default → ext/gray-6.
- text/brand → alert/error.

Se deben revisar los casos pendientes de contraste,
incluyendo el borde de advertencia y el texto
de éxito sobre superficies.

### Dropdown

El comportamiento actual corresponde a un
listbox básico.

Antes de utilizarlo en producción, se deben
verificar las interacciones de teclado,
la gestión del foco y los atributos accesibles.

### Recursos de marca

Las fuentes, fotografías y demás recursos
deben utilizarse de acuerdo con sus licencias
y especificaciones correspondientes.

---

## 14. Estructura del repositorio

```text
chilis-design-system/
│
├── DESIGN.md
├── README.md
├── CHANGELOG.md
│
├── docs/
│
├── scripts/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   │
│   ├── tokens/
│   │   ├── tokens.css
│   │   └── fonts.css
│   │
│   ├── icons/
│   │
│   ├── components/
│   │
│   ├── foundations/
│   │
│   ├── patterns/
│   │
│   ├── docs/
│   │
│   └── index.ts
│
├── .storybook/
│
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## 15. Instalación y ejecución

### Requisitos

- Node.js 22.
- npm.

### Instalar dependencias

```bash
npm install
```

### Ejecutar Storybook

```bash
npm run storybook
```

Storybook estará disponible localmente en:

http://localhost:6006

### Generar versión de publicación

```bash
npm run build-storybook
```

La compilación genera:

storybook-static/

### Validar TypeScript

```bash
npm run typecheck
```

### Validar contratos de diseño

```bash
npm run design:check
```

### Validar formato de DESIGN.md

```bash
npm run design:lint
```

---

## 16. Convenciones para crear componentes

Antes de implementar un componente nuevo,
se debe revisar el catálogo existente.

### 16.1 Reutilización

Priorizar la reutilización de componentes
antes de crear nuevas implementaciones.

### 16.2 Estructura

Cada componente debe organizarse en:

src/components/<Nombre>/

Incluyendo:

- <Nombre>.tsx
- <Nombre>.css
- <Nombre>.stories.tsx

### 16.3 Propiedades

Mantener una nomenclatura consistente.

Ejemplos:

- variant
- color
- size
- selected
- status

Las propiedades deben reflejar los contratos
definidos para cada componente.

### 16.4 Tokens

Utilizar exclusivamente los tokens
disponibles en el sistema.

Ejemplo:

```css
.component {
  color: var(--color-text-primary);
  padding: var(--sp-16);
  border-radius: var(--br-8);
}
```

Evitar valores arbitrarios cuando exista
un token correspondiente.

### 16.5 Documentación

Actualizar DESIGN.md con:

- Descripción.
- Propiedades.
- Variantes.
- Estados.
- Cuándo utilizarlo.
- Cuándo no utilizarlo.
- Accesibilidad.

### 16.6 Storybook

Crear las stories necesarias para documentar
las variantes y estados del componente.

Cuando corresponda, utilizar:

```tsx
component: componentDoc('<Nombre>')
```

### 16.7 Sincronización

Si el componente incorpora nuevos tokens,
actualizar:

- DESIGN.md.
- tokens.css.

### 16.8 Exportación

Exportar el componente desde:

src/index.ts

### 16.9 Validación

Ejecutar:

```bash
npm run design:check
npm run typecheck
```

Verificar el comportamiento del componente
en Storybook antes de publicarlo.

---

## 17. Flujo de trabajo

El mantenimiento del sistema sigue
el siguiente proceso:

1. Revisar componentes existentes.
2. Consultar especificaciones de diseño.
3. Revisar DESIGN.md.
4. Definir o actualizar contratos.
5. Implementar utilizando tokens.
6. Crear o actualizar stories.
7. Validar accesibilidad.
8. Ejecutar verificaciones técnicas.
9. Revisar cambios.
10. Publicar la versión correspondiente.

Este flujo permite mantener consistencia
entre diseño, documentación y código.

---

## 18. Integración con inteligencia artificial

El repositorio está estructurado para facilitar
el trabajo con agentes de desarrollo asistido
por inteligencia artificial.

Los agentes deben consultar DESIGN.md
y los componentes existentes antes de
generar nuevas interfaces.

### Reglas para agentes

1. Leer DESIGN.md.
2. Revisar los componentes existentes.
3. Priorizar reutilización.
4. Respetar tokens y propiedades.
5. Evitar introducir estilos arbitrarios.
6. Mantener consistencia con Storybook.
7. Documentar nuevas implementaciones.
8. Ejecutar validaciones disponibles.
9. No modificar contratos existentes sin justificación.
10. Mantener la arquitectura del sistema.

### Objetivo

Permitir que herramientas como Claude y Codex
construyan experiencias digitales reutilizando
los fundamentos y componentes del sistema.

Storybook funciona como referencia
de implementación y DESIGN.md como
contrato de diseño.

---

## 19. Versionamiento

El sistema mantiene un registro de cambios
mediante CHANGELOG.md.

Versiones documentadas:

- 1.0.0 — Primera versión.
- 1.1.0 — Flujo de registro.
- 1.2.0 — Ajustes de contraste y alineación
  entre diseño e implementación.

Los cambios deben documentarse para
mantener trazabilidad.

---

## 20. Recursos

### Diseño

Figma:

https://www.figma.com/design/l78fB89GmYoqsmvvYTjLkn/Prueba---Chilis-DS

### Documentación

- DESIGN.md
- CHANGELOG.md
- Storybook Docs

### Repositorio

GitLab — Chili's Design System.

---

## 21. Mantenimiento

El Design System debe evolucionar mediante
un proceso controlado de actualización.

Toda modificación debe considerar:

- Consistencia visual.
- Reutilización.
- Compatibilidad.
- Accesibilidad.
- Documentación.
- Impacto sobre componentes existentes.

Los cambios deben mantenerse sincronizados
entre los contratos documentados y
la implementación.

---

Chili's Design System — Perú

Sistema de diseño para la construcción
de experiencias digitales consistentes,
reutilizables y escalables.