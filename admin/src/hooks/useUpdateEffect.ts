import { useEffect, useRef, EffectCallback, DependencyList } from "react";

function useUpdateEffect(
  effect: EffectCallback,
  dependencies: DependencyList
): void {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
  }, dependencies);
}

export default useUpdateEffect;
