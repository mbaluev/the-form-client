import { Box, Container, useTheme, Divider } from '@mui/material';
import { useAppStore } from '@store/modules/common/app/useAppStore';
import { observer } from 'mobx-react';
import { useBar } from '@ui/layout/navigation/bar/context';
import { useEffect } from 'react';
import { useElementSize } from 'usehooks-ts';

export const Bar = observer(() => {
  const theme = useTheme();
  const bar = useBar();
  const { barVisible, setBarHeight } = useAppStore();
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [barVisible]);

  const [ref, { height }] = useElementSize();
  useEffect(() => {
    setBarHeight(height);
  }, [height]);

  if (!barVisible || !bar) return null;

  return (
    <Box
      id="__bar"
      sx={{
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        boxShadow: 3,
      }}
      ref={ref}
    >
      <Container maxWidth="xl">
        <Box sx={{ pt: 3, pb: 3 }}>{bar}</Box>
      </Container>
      <Divider />
    </Box>
  );
});
