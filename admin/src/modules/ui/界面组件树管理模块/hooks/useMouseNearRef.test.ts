import { renderHook, act } from '@testing-library/react-hooks';
import { useMouseNearRef } from './useMouseNearRef';
import { describe, expect, it } from 'vitest';

describe('useMouseNearRef', () => {
  let element: HTMLElement;
  let ref: React.RefObject<HTMLElement>;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
    ref = { current: element };
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('在鼠标接近元素时返回 true', () => {
    const { result } = renderHook(() => useMouseNearRef(ref, 100, true));

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: element.getBoundingClientRect().left + 50,
        clientY: element.getBoundingClientRect().top + 50,
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(true);
  });

  it('在鼠标远离元素时返回 false', () => {
    const { result } = renderHook(() => useMouseNearRef(ref, 100, true));

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: element.getBoundingClientRect().left - 150,
        clientY: element.getBoundingClientRect().top - 150,
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(false);
  });

  it('在 shouldListen 为 false 时不监听鼠标移动事件', () => {
    const { result } = renderHook(() => useMouseNearRef(ref, 100, false));

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: element.getBoundingClientRect().left + 50,
        clientY: element.getBoundingClientRect().top + 50,
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(false);
  });

  it('在 shouldListen 切换为 true 时开始监听鼠标移动事件', () => {
    const { result, rerender } = renderHook(
      ({ shouldListen }) => useMouseNearRef(ref, 100, shouldListen),
      { initialProps: { shouldListen: false } },
    );

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: element.getBoundingClientRect().left + 50,
        clientY: element.getBoundingClientRect().top + 50,
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(false);

    rerender({ shouldListen: true });

    act(() => {
      const event = new MouseEvent('mousemove', {
        clientX: element.getBoundingClientRect().left + 50,
        clientY: element.getBoundingClientRect().top + 50,
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(true);
  });
});
