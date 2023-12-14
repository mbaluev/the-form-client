import { LinearProgress, Stack, useTheme } from '@mui/material';
import LogoTheForm from '@components/svg/logo/components/theForm';
import Typography from '@mui/material/Typography';

interface IProps {
  loading?: boolean;
}

export const Intro = (props: IProps) => {
  const { loading } = props;
  const theme = useTheme();
  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" height="100%">
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
    </Stack>
  );
};
