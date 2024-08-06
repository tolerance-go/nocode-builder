import { useState, useEffect, RefObject } from 'react';

export const useMouseNearRef = (
  ref: RefObject<HTMLElement>,
  proximity: number = 100,
  shouldListen: boolean = true,
): boolean => {
  const [isMouseNear, setIsMouseNear] = useState(false);

  useEffect(() => {
    const handleDrag = (event: DragEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const { clientX, clientY } = event;

      const isNear =
        clientX >= rect.left - proximity &&
        clientX <= rect.right + proximity &&
        clientY >= rect.top - proximity &&
        clientY <= rect.bottom + proximity;

      setIsMouseNear(isNear);
    };

    if (shouldListen) {
      document.addEventListener('drag', handleDrag);
      return () => {
        document.removeEventListener('drag', handleDrag);
      };
    }
  }, [proximity, ref, shouldListen]);

  return isMouseNear;
};
