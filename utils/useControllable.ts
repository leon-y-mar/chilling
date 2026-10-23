import { useCallback, useState } from 'react';

/** Estado controlado o no controlado (patrón estándar de inputs). */
export function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [inner, setInner] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? (value as T) : inner;
  const set = useCallback(
    (v: T) => {
      if (!isControlled) setInner(v);
      onChange?.(v);
    },
    [isControlled, onChange],
  );
  return [current, set] as const;
}
