import { ActiveDetectProps } from './types';
import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useActiveDetect, { useActiveDetect as namedHook } from './index';

jest.useFakeTimers();

describe('useActiveDetect', () => {
  let props: ActiveDetectProps = {};

  const activeDetect = () => {
    return renderHook(() => useActiveDetect(props));
  };

  beforeEach(() => {
    props = {
      onActive: undefined,
      wait: undefined,
      element: undefined,
    };
  });

  it('exports a function (default)', () => {
    expect(useActiveDetect).toBeInstanceOf(Function);
  });
  it('exports a function (named)', () => {
    expect(namedHook).toBeInstanceOf(Function);
  });
  it('hooks identity are the same', () => {
    expect(useActiveDetect).toBe(namedHook);
  });
  it('is a named function', () => {
    expect(useActiveDetect.name).toBe('useActiveDetect');
  });

  it('onActive emit when user active', () => {
    props.onActive = jest.fn();
    activeDetect();
    fireEvent.mouseDown(document);
    expect(props.onActive).toHaveBeenCalledTimes(1);
  });
  it('throttled', () => {
    props.onActive = jest.fn();
    activeDetect();
    fireEvent.mouseDown(document);
    fireEvent.click(document);
    fireEvent.mouseDown(document);
    fireEvent.click(document);
    expect(props.onActive).toHaveBeenCalledTimes(1);
  });
  it('wait', () => {
    props.onActive = jest.fn();
    props.wait = 1;
    activeDetect();
    fireEvent.mouseMove(document);
    expect(props.onActive).toHaveBeenCalledTimes(1);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.mouseMove(document);
    expect(props.onActive).toHaveBeenCalledTimes(2);
  });
});
