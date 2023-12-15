import { cloneElement, ReactElement } from 'react';
import { Button } from '@theme/button';
import { ButtonProps, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export type TNoDataOrientation = 'column' | 'row';

interface IProps {
  direction?: TNoDataOrientation;
  icon?: ReactElement;
  iconColor?: string;
  message?: string | ReactElement;
  button?: ButtonProps;
  marginTop?: number;
}

export const NoData = (props: IProps) => {
  const { direction = 'column', icon, iconColor, message = 'Not found', button, marginTop } = props;
  const theme = useTheme();
  const colorGrey = theme.palette.fGrey['100'];
  const iconSx = { fontSize: '6rem', fill: iconColor || colorGrey };
  return (
    <Stack
      direction={direction}
      spacing={4}
      alignItems="center"
      justifyContent="center"
      sx={{ mt: marginTop }}
    >
      {icon && cloneElement(icon, { sx: iconSx })}
      {message && (
        <Typography fontWeight={600} color={colorGrey}>
          {message}
        </Typography>
      )}
      {button && <Button {...button} />}
    </Stack>
  );
};

export default NoData;
