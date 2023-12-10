import { useEffect, useState } from 'react';

export const MEDIA_XS = 0;
export const MEDIA_SM = 600;
export const MEDIA_MD = 900;
export const MEDIA_LG = 1200;
export const MEDIA_XL = 1400;

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
