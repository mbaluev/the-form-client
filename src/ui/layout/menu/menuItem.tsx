import { MenuItemBase } from '@ui/layout/menu/menuItemBase';
import { MenuItemChild } from '@ui/layout/menu/menuItemChild';
import { useRouter } from 'next/router';
import { IMenuItemDTO } from '@model/common/menu';
import { isActive } from '@ui/layout/menu/isActive';
import { Box, Stack } from '@mui/material';
import { useMenuStore } from '@store/modules/common/menu/useMenuStore';
import { useEffect } from 'react';

type TMenuItem = IMenuItemDTO & {
  isChild?: boolean;
};

export const MenuItem = (props: TMenuItem) => {
  const router = useRouter();
  const { setItemOpen } = useMenuStore();
  const setOpen = (value: boolean) => {
    setItemOpen(props.name, value);
  };

  const active = isActive(props, router.pathname);
  useEffect(() => {
    if (active && 'items' in props) {
      setItemOpen(props.name, active);
    }
  }, [active]);

  if ('items' in props) {
    return (
      <Stack spacing={1}>
        <MenuItemBase {...props} open={props.open} setOpen={setOpen} />
        <MenuItemChild {...props} open={props.open} />
      </Stack>
    );
  }

  return (
    <Box>
      <MenuItemBase {...props} />
    </Box>
  );
};
