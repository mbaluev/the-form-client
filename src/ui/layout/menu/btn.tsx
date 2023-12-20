import { observer } from 'mobx-react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMenuStore } from '@store/modules/common/menu/useMenuStore';

export const MenuBtn = observer(() => {
  const { isOpen: isOpenMenu, open: setOpenMenu, hasAccess } = useMenuStore();
  if (!hasAccess) return null;
  const menuClick = () => setOpenMenu(!isOpenMenu);
  return (
    <IconButton color="secondary" onClick={menuClick}>
      <MenuIcon />
    </IconButton>
  );
});
