export interface ActiveDetectProps {
  /**
   * Function to call when user becomes active.
   *
   * @default () => {}
   */
  onActive?: (event?: Event) => void;
  /**
   * The number of milliseconds to delay.
   *
   * @default 1000 * 30
   */
  wait?: number;
  /**
   * Element to bind activity listeners to.
   *
   * @default document
   */
  element?: Document | HTMLElement;
}
