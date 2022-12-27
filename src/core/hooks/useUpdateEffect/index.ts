import { useEffect, useRef } from 'react';

export const useUpdateEffect = (
  effect: () => void | (() => void | undefined),
  dependencies: any[] = []
) => {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
    // eslint-disable-next-line
  }, dependencies);
};
