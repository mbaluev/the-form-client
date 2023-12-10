import { useEffect, MutableRefObject, useState } from 'react';
import { throttle } from 'lodash';

const useScroll = <T extends Element | null>(ref: MutableRefObject<T>) => {
  const [rect, setRect] = useState<DOMRect | null>();

  const handle = throttle(() => {
    const node = ref.current;
    if (!node || !(node instanceof Element)) return;
    setRect(node.getBoundingClientRect());
  }, 100);

  useEffect(() => {
    handle();
    window.addEventListener('scroll', handle);
    return () => {
      window.removeEventListener('scroll', handle);
    };
  }, [ref]);

  return rect;
};

export default useScroll;
