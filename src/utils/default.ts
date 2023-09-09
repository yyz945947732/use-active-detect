/**
 * Determine if we are in a browser or a server environment.
 *
 * @private
 */
export const IS_BROWSER: boolean =
  (typeof window === 'undefined' ? 'undefined' : typeof window) === 'object';

/**
 * Default element to listen for events on.
 *
 * @private
 */
export const DEFAULT_ELEMENT: Document | HTMLElement | null = IS_BROWSER
  ? document
  : null;

/**
 * The events to determine activity.
 *
 * @private
 */
export const ACTIVE_EVENTS = [
  'mousemove',
  'keydown',
  'wheel',
  'DOMMouseScroll',
  'mousewheel',
  'mousedown',
  'touchstart',
  'touchmove',
  'MSPointerDown',
  'MSPointerMove',
  'visibilitychange',
  'focus',
] as const;

/**
 * The default number of milliseconds to delay.
 *
 * @private
 */
export const DEFAULT_WAIT = 30 * 1000;
