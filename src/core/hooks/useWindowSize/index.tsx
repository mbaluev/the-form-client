import { useEffect, useState } from 'react';

export const MEDIA_HG = 1400;
export const MEDIA_LG = 1280;
export const MEDIA_MD = 1024;
export const MEDIA_SM = 768;
export const MEDIA_XS = 550;
export const MEDIA_XXS = 420;

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: MEDIA_HG,
    height: MEDIA_HG,
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
