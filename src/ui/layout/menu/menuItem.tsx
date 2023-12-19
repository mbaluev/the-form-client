import { useState } from 'react';
import { MenuItemBase } from '@ui/layout/menu/menuItemBase';
import { MenuItemChild } from '@ui/layout/menu/menuItemChild';
import { useRouter } from 'next/router';
import { IMenuItemDTO } from '@model/common/menu';
import { isActive } from '@ui/layout/menu/isActive';
import { Box, Stack } from '@mui/material';

type TMenuItem = IMenuItemDTO & {
  isChild?: boolean;
};

export const MenuItem = (props: TMenuItem) => {
  const router = useRouter();
  const active = isActive(props, router.pathname);
  if ('items' in props) {
    const [open, setOpen] = useState<boolean>(active);
    return (
      <Stack spacing={1}>
        <MenuItemBase {...props} open={open} setOpen={setOpen} />
        <MenuItemChild {...props} open={open} />
      </Stack>
    );
  } else {
    return (
      <Box>
        <MenuItemBase {...props} />
      </Box>
    );
  }
};
