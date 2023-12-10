import { IMenuItemDTO } from '@model/common/menu';
import Link from 'next/link';
import { useTheme, Button, lighten } from '@mui/material';
import { useRouter } from 'next/router';
import { isActive } from '@ui/layout/navigation/menu/isActive';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Fragment, MouseEvent, useState } from 'react';
import Menu from '@mui/material/Menu';
import { MenuPopover } from '@ui/layout/navigation/menu/menuPopover';

interface IProps {
  item: IMenuItemDTO;
}

export const MenuItem = (props: IProps) => {
  const { item } = props;
  const router = useRouter();
  const theme = useTheme();
  const active = isActive(item, router.pathname);
  const color = active
    ? theme.palette.accent.light
    : theme.palette.t1Grey['100'];
  const colorHover = active
    ? lighten(theme.palette.accent.light, 0.2)
    : theme.palette.common.white;

  if (item.url) {
    return (
      <Link href={item.url} passHref>
        <Button
          sx={{ color, flex: '0 0 auto', '&:hover': { color: colorHover } }}
          startIcon={item.icon}
        >
          {item.label}
        </Button>
      </Link>
    );
  }

  if (item.items && item.items.length > 0) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) =>
      setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    return (
      <Fragment>
        <Button
          sx={{ color, flex: '0 0 auto', '&:hover': { color: colorHover } }}
          endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleClick}
        >
          {item.label}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{ paper: { elevation: 2, sx: { mt: 2 } } }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <MenuPopover item={item} />
        </Menu>
      </Fragment>
    );
  }

  return null;
};
