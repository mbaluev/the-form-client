import { Avatar, Box, BoxProps } from '@mui/material';

export const PageIcon = (props: BoxProps) => {
  const { children, ...other } = props;
  return (
    <Box {...other}>
      <Avatar sx={{ width: 34, height: 34, margin: -1, backgroundColor: 'transparent' }}>
        {children}
      </Avatar>
    </Box>
  );
};
