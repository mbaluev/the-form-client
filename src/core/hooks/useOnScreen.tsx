import { MutableRefObject, useEffect, useState } from 'react';

export const useOnScreen = <T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin = '0px',
  initialState = false
) => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(initialState);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
};
