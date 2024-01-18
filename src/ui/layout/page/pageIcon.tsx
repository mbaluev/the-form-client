import { Avatar, Box, BoxProps, useTheme } from '@mui/material';

export const PageIcon = (props: BoxProps) => {
  const { children, ...other } = props;
  const theme = useTheme();
  const white = theme.palette.common.white;
  return (
    <Box {...other}>
      <Avatar sx={{ width: 34, height: 34, margin: -1, backgroundColor: white }}>{children}</Avatar>
    </Box>
  );
};
