import { MouseEvent } from 'react';
import { Box, darken, lighten, Stack, useTheme } from '@mui/material';

export type TTagColor =
  | 'default'
  | 'primary'
  | 'grey'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red';

const getColor = (color?: TTagColor) => {
  const theme = useTheme();
  switch (color) {
    case 'primary':
      return theme.palette.primary.main;
    case 'grey':
      return theme.palette.fGrey['150'];
    case 'blue':
      return theme.palette.info.main;
    case 'green':
      return theme.palette.success.main;
    case 'orange':
      return theme.palette.warning.main;
    case 'red':
      return theme.palette.error.main;
    default:
      return theme.palette.primary.main;
  }
};

const getColorBackground = (color?: TTagColor) => {
  const theme = useTheme();
  switch (color) {
    case 'primary':
      return lighten(theme.palette.primary.main, 0.9);
    case 'grey':
      return theme.palette.fGrey['20'];
    case 'blue':
      return lighten(theme.palette.primary.main, 0.9);
    case 'green':
      return lighten(theme.palette.success.main, 0.9);
    case 'orange':
      return lighten(theme.palette.warning.main, 0.9);
    case 'red':
      return lighten(theme.palette.error.main, 0.9);
    default:
      return theme.palette.fGrey['20'];
  }
};

export type ITagProps = {
  tag: any;
  color?: TTagColor;
  icon?: JSX.Element | null;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

export const Tag = (props: ITagProps) => {
  const { tag, color, icon, onClick } = props;

  return (
    <Stack
      direction="row"
      spacing="5px"
      sx={{
        p: '5px 10px',
        color: getColor(color),
        fill: getColor(color),
        backgroundColor: getColorBackground(color),
        borderRadius: 1,
        fontSize: '0.85rem',
        fontWeight: 600,
        alignItems: 'center',
        lineHeight: 'normal',
        zIndex: 1,
        width: 'fit-content',
        '&:hover': onClick
          ? {
              cursor: 'pointer',
              backgroundColor: darken(getColorBackground(color), 0.03),
            }
          : undefined,
        '& .MuiSvgIcon-root': {
          fontSize: '1rem',
        },
      }}
      onClick={onClick}
    >
      {icon}
      <Box sx={{ whiteSpace: 'nowrap' }}>{tag}</Box>
    </Stack>
  );
};
