import { Fragment, ReactElement } from 'react';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ProgressShort } from '@ui/layout/card/progress';
import { TitleDividerShort } from '@ui/layout/card/divider';

interface IProps {
  status?: 'success' | 'error';
  title?: ReactElement | string;
  message?: ReactElement | string;
  loading?: boolean;
  buttons?: ReactElement;
}

export const StatusPage = (props: IProps) => {
  const { status = 'success', title, message, loading, buttons } = props;
  const theme = useTheme();
  const Icon = () => {
    if (status === 'success')
      return <CheckIcon sx={{ fontSize: '6rem', fill: theme.palette[status].main }} />;
    if (status === 'error')
      return <ErrorOutlineIcon sx={{ fontSize: '6rem', fill: theme.palette[status].main }} />;
    return null;
  };
  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ pt: 20 }}>
      <Icon />
      <Stack spacing={1} alignItems="center">
        <Typography fontWeight={600} color={theme.palette[status].main} fontSize="1.5rem">
          {title}
        </Typography>
        <Typography fontWeight={600} color={theme.palette[status].main}>
          {message}
        </Typography>
      </Stack>
      {buttons && (
        <Fragment>
          {loading ? (
            <ProgressShort sx={{ width: 300 }} />
          ) : (
            <TitleDividerShort sx={{ width: 300 }} />
          )}
          {buttons}
        </Fragment>
      )}
    </Stack>
  );
};
