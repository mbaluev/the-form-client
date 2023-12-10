import React, { useEffect, useRef } from 'react';

export const useUpdateEffect = (
  effect: () => void | (() => void | undefined),
  dependencies?: React.DependencyList
) => {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
};
