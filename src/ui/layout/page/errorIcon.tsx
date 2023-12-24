import { Fragment, ReactElement } from 'react';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ProgressBase } from '@ui/layout/card/progress';
import { TitleDividerShort } from '@ui/layout/card/divider';
import { Panel } from '@ui/layout/page/panel';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

interface IProps {
  status?: 'success' | 'error' | 'secondary';
  title?: ReactElement | string;
  message?: ReactElement | string;
  loading?: boolean;
  buttons?: ReactElement;
}

export const ErrorIcon = (props: IProps) => {
  const { status = 'success', title, message, loading, buttons } = props;
  const theme = useTheme();
  const Icon = () => {
    if (status === 'success')
      return <CheckIcon sx={{ fontSize: '5rem', fill: theme.palette[status].main }} />;
    if (status === 'error')
      return <ErrorOutlineIcon sx={{ fontSize: '5rem', fill: theme.palette[status].main }} />;
    if (status === 'secondary')
      return <DoDisturbIcon sx={{ fontSize: '5rem', fill: theme.palette.fGrey[80] }} />;
    return null;
  };
  return (
    <Panel height="100%">
      <Stack spacing={4} alignItems="center" justifyContent="center" paddingTop={20}>
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
              <ProgressBase sx={{ width: 300 }} />
            ) : (
              <TitleDividerShort sx={{ width: 300 }} />
            )}
            {buttons}
          </Fragment>
        )}
      </Stack>
    </Panel>
  );
};
