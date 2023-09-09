import { useRef, useEffect } from 'react';
import type { ActiveDetectProps } from './types';
import {
  IS_BROWSER,
  DEFAULT_ELEMENT,
  ACTIVE_EVENTS,
  DEFAULT_WAIT,
} from './utils/default';
import { useThrottleFn } from './utils/useThrottleFn';

const noop = () => {};

export function useActiveDetect(props: ActiveDetectProps) {
  const {
    onActive = noop,
    element = DEFAULT_ELEMENT,
    wait = DEFAULT_WAIT,
  } = props;

  const emitOnActive = useRef<EventListener>(onActive);
  const elementRef = useRef<Node>(element);
  const eventsBound = useRef(false);

  const handleUserActivityEvent = useThrottleFn((event) => {
    if (typeof emitOnActive.current === 'function') {
      emitOnActive.current(event);
    } else {
      console.error(
        `onActive expected parameter is a function, got ${typeof emitOnActive.current}`
      );
    }
  }, wait);

  const bindEvents = (): void => {
    if (!IS_BROWSER || !elementRef.current) return;
    if (!eventsBound.current) {
      ACTIVE_EVENTS.forEach((event) => {
        elementRef.current?.addEventListener(event, handleUserActivityEvent, {
          capture: true,
          passive: true,
        });
      });
      eventsBound.current = true;
    }
  };

  const unbindEvents = (): void => {
    if (!IS_BROWSER || !elementRef.current) return;
    if (eventsBound.current) {
      ACTIVE_EVENTS.forEach((e) => {
        elementRef.current?.removeEventListener(e, handleUserActivityEvent, {
          capture: true,
        });
      });
      eventsBound.current = false;
    }
  };

  // Dynamic element、wait
  useEffect(() => {
    if (eventsBound.current) {
      unbindEvents();
    }
    (elementRef.current as any) = element;
    bindEvents();
    return () => {
      unbindEvents();
    };
  }, [element, wait]);

  // Dynamic handler
  useEffect(() => {
    emitOnActive.current = onActive;
  }, [onActive]);
}

export default useActiveDetect;
