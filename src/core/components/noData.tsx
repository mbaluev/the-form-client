import { cloneElement, Fragment, ReactElement } from 'react';
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TitleDividerShort } from '@ui/layout/card/divider';
import { ProgressShort } from '@ui/layout/card/progress';

interface IProps {
  icon?: ReactElement;
  iconColor?: string;
  message?: string | ReactElement;
  button?: ReactElement;
  marginTop?: number;
  loading?: boolean;
}

export const NoData = (props: IProps) => {
  const { icon, iconColor, message = 'Not found', button, marginTop, loading } = props;
  const theme = useTheme();
  const colorGrey = theme.palette.fGrey['100'];
  const iconSx = { fontSize: '6rem', fill: iconColor || colorGrey };
  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ mt: marginTop }}>
      {icon && cloneElement(icon, { sx: iconSx })}
      {message && (
        <Typography fontWeight={600} color={colorGrey}>
          {message}
        </Typography>
      )}
      {button && (
        <Fragment>
          {loading ? (
            <ProgressShort sx={{ width: 300 }} />
          ) : (
            <TitleDividerShort sx={{ width: 300 }} />
          )}
          {button}
        </Fragment>
      )}
    </Stack>
  );
};

export default NoData;
