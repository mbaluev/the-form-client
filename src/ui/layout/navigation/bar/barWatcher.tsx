import { useEffect, useRef } from 'react';
import useScroll from '@hooks/useScroll';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import { Box, BoxProps } from '@mui/material';

export const BarWatcher = (props: BoxProps) => {
  const { children, ...otherProps } = props;
  const ref = useRef<HTMLDivElement>(null);
  const rect = useScroll(ref);
  const { navHeight, barHeight, barVisible, setBarVisible } = useAppStore();
  useEffect(() => {
    if (rect) {
      if (!barVisible && rect.top < navHeight) setBarVisible(true);
      if (barVisible && rect.top > navHeight - barHeight) setBarVisible(false);
    }
  }, [rect]);

  if (!children) return null;

  return (
    <Box ref={ref} {...otherProps}>
      {children}
    </Box>
  );
};
