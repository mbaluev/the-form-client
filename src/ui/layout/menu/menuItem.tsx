import { MenuItemBase } from '@ui/layout/menu/menuItemBase';
import { MenuItemChild } from '@ui/layout/menu/menuItemChild';
import { IMenuItemDTO } from '@model/common/menu';
import { Box, Stack } from '@mui/material';

type TMenuItem = IMenuItemDTO & {
  isChild?: boolean;
};

export const MenuItem = (props: TMenuItem) => {
  if ('items' in props) {
    return (
      <Stack spacing={1}>
        <MenuItemBase {...props} />
        <MenuItemChild {...props} />
      </Stack>
    );
  }

  return (
    <Box>
      <MenuItemBase {...props} />
    </Box>
  );
};
