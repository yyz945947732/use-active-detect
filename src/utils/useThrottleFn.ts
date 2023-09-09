import { useMemo, useEffect } from 'react';
import { useLatest } from './useLatest';
import throttle from 'lodash.throttle';

type noop = (...args: any[]) => any;

export function useThrottleFn<T extends noop>(fn: T, wait: number) {
  const fnRef = useLatest(fn);

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        {
          trailing: false,
        }
      ),
    [wait]
  );

  useEffect(
    () => () => {
      throttled.cancel();
    },
    []
  );

  return throttled;
}
