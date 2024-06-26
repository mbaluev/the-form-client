import { cloneElement, Fragment, ReactElement } from 'react';
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SeparatorBase } from '@ui/layout/card/separator';
import { ProgressBase } from '@ui/layout/card/progress';
import { SxProps } from '@mui/system';

interface IProps {
  icon?: ReactElement;
  message?: string | ReactElement;
  button?: ReactElement;
  loading?: boolean;
  sx?: SxProps;
}

export const NoData = (props: IProps) => {
  const { icon, message = 'Not found', button, sx, loading } = props;
  const theme = useTheme();
  const iconSx = {
    fontSize: '5rem',
    color: icon?.props.color ?? theme.palette.fGrey['80'],
  };
  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ ...sx, pl: 10, pr: 10 }}>
      {icon && cloneElement(icon, { sx: iconSx })}
      {message && (
        <Typography fontWeight={600} color={theme.palette.fGrey['80']}>
          {message}
        </Typography>
      )}
      {button && (
        <Fragment>
          {loading ? <ProgressBase sx={{ width: 300 }} /> : <SeparatorBase sx={{ width: 300 }} />}
          {button}
        </Fragment>
      )}
    </Stack>
  );
};

export default NoData;
