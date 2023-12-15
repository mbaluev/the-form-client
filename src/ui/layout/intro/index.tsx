import { ButtonProps, LinearProgress, Stack, useTheme } from '@mui/material';
import LogoTheForm from '@components/svg/logo/components/theForm';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Button } from '@theme/button';

const StyledStack = styled(Stack)(({ theme }) => ({
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
}));

interface IProps {
  loading?: boolean;
  button?: ButtonProps;
}

export const Intro = (props: IProps) => {
  const { loading, button } = props;
  const theme = useTheme();
  const [opacity, setOpacity] = useState<number>(loading ? 0 : 1);
  useEffect(() => setOpacity(1), []);
  return (
    <StyledStack spacing={4} alignItems="center" justifyContent="center" sx={{ opacity, mt: 30 }}>
      <LogoTheForm sx={{ fontSize: '6rem', fill: theme.palette.primary.main }} />
      <Stack spacing={1} alignItems="center">
        <Typography fontWeight={600} color={theme.palette.primary.main} fontSize="1.5rem">
          The Form
        </Typography>
        <Typography fontWeight={600} color={theme.palette.primary.main}>
          School of analytics
        </Typography>
      </Stack>
      {loading && <LinearProgress sx={{ width: 200 }} />}
      {button && <Button {...button} />}
    </StyledStack>
  );
};
