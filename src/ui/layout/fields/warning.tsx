import { InputAdornment, useTheme } from '@mui/material';
import IconWarning from '@components/svg/icons/components/warning';

export const Warning = () => {
  const theme = useTheme();
  return (
    <InputAdornment position="end">
      <IconWarning sx={{ fill: theme.palette.error.main }} />
    </InputAdornment>
  );
};
