/** Trazado de un ícono: [d, token de relleno ('' = sin relleno), token de trazo?]. */
export type IconPath = readonly [d: string, fill: string, stroke?: string];
/** Ícono: [tamaño del lienzo (32, o 56 en ilustraciones), ...trazados]. */
export type IconDef = readonly [size: number, ...paths: IconPath[]];
