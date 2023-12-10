import { ReactElement } from 'react';
import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation();
  const { direction = 'column', icon, message = t('common:no-data'), button, marginTop } = props;
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
              fill: theme.palette.t1Grey['90'],
            },
          }}
        >
          {icon}
        </Box>
      )}
      <Stack direction={direction} alignItems="center" justifyContent="center" gap={4}>
        {message && (
          <Typography fontWeight={600} color={theme.palette.t1Grey['90']}>
            {message}
          </Typography>
        )}
        {button && <Button {...button} />}
      </Stack>
    </Stack>
  );
};

export default NoData;
