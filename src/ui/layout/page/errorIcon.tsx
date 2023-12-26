import { ReactElement } from 'react';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ProgressBase } from '@ui/layout/card/progress';
import { SeparatorBase } from '@ui/layout/card/separator';
import { Panel } from '@ui/layout/page/panel';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
  status?: 'success' | 'error' | 'secondary' | 'primary';
  title?: ReactElement | string;
  message?: ReactElement | string;
  loading?: boolean;
  buttons?: ReactElement;
}

export const ErrorIcon = (props: IProps) => {
  const { status = 'secondary', title, message, loading, buttons } = props;
  const theme = useTheme();
  const Icon = () => {
    switch (status) {
      case 'success':
        return <CheckIcon sx={{ fontSize: '5rem', fill: theme.palette[status].main }} />;
      case 'error':
        return <ErrorOutlineIcon sx={{ fontSize: '5rem', fill: theme.palette[status].main }} />;
      default:
        return <SearchIcon sx={{ fontSize: '5rem', fill: theme.palette[status].main }} />;
    }
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
        {buttons && loading && <ProgressBase sx={{ width: 300 }} />}
        {buttons && !loading && <SeparatorBase sx={{ width: 300 }} />}
        {buttons}
      </Stack>
    </Panel>
  );
};
