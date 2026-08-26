import { useCallback, useState } from "react";

interface Options<T> {
  parse?: (raw: string) => T;
  serialize?: (value: T) => string;
}

/**
 * Persists a piece of state to `localStorage`, reading the given key back in
 * as the initial value. `parse`/`serialize` default to raw strings.
 */
export function useLocalStorage<T = string>(
  key: string,
  defaultValue: T,
  {
    parse = (v: string) => v as unknown as T,
    serialize = (v: T) => String(v),
  }: Options<T> = {},
) {
  const [value, setValue] = useState<T>(() => {
    const stored = window.localStorage.getItem(key);
    return stored === null ? defaultValue : parse(stored);
  });

  const set = useCallback(
    (next: T) => {
      setValue(next);
      window.localStorage.setItem(key, serialize(next));
    },
    [key, serialize],
  );

  return [value, set] as const;
}
