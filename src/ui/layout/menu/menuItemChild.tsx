import { observer } from 'mobx-react';
import Collapse from '@mui/material/Collapse';
import { IMenuItemDTO } from '@model/common/menu';
import { useMenuStore } from '@store/modules/common/menu/useMenuStore';
import { MenuItem } from '@ui/layout/menu/menuItem';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { isActive } from '@ui/layout/menu/isActive';
import { useEffect } from 'react';

type TMenuItemChild = IMenuItemDTO & {
  open?: boolean;
};

export const MenuItemChild = observer((props: TMenuItemChild) => {
  const { isOpen, setItemOpen } = useMenuStore();
  const router = useRouter();
  const active = isActive(props, router.pathname);
  useEffect(() => {
    if (active) setItemOpen(props.name, active);
  }, [active]);

  const open = Boolean(props.open && isOpen);
  if ('items' in props && open) {
    return (
      <Collapse className="SubMenu" in={open}>
        <Stack sx={{ pl: 6 }} spacing={1}>
          {props.items?.map((item, index) => <MenuItem key={index} {...item} isChild={true} />)}
        </Stack>
      </Collapse>
    );
  } else {
    return null;
  }
});
