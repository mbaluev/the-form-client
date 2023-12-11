import { ReactElement } from 'react';
import { Button } from '@theme/button';
import { Box, ButtonProps, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export type TNoDataOrientation = 'column' | 'row';

interface IProps {
  direction?: TNoDataOrientation;
  icon?: ReactElement;
  message?: string | ReactElement;
  button?: ButtonProps;
  marginTop?: number;
}

export const NoData = (props: IProps) => {
  const {
    direction = 'column',
    icon,
    message = 'Not found',
    button,
    marginTop,
  } = props;
  const theme = useTheme();
  return (
    <Stack
      direction={direction}
      flex="1 1 auto"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ mt: marginTop }}
    >
      {icon && (
        <Box
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '6rem',
              fill: theme.palette.fGrey['90'],
            },
          }}
        >
          {icon}
        </Box>
      )}
      <Stack
        direction={direction}
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        {message && (
          <Typography fontWeight={600} color={theme.palette.fGrey['90']}>
            {message}
          </Typography>
        )}
        {button && <Button {...button} />}
      </Stack>
    </Stack>
  );
};

export default NoData;
