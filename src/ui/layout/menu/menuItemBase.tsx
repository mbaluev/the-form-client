import Link from 'next/link';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { IconButton, TooltipProps } from '@mui/material';
import { IMenuItemDTO } from '@model/common/menu';
import { useMenuStore } from '@store/modules/common/menu/useMenuStore';
import { isActive } from '@ui/layout/menu/isActive';
import { Tooltip } from '@theme/tooltip';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MenuItemButton } from '@ui/layout/menu/menuItemButton';

type TMenuItemContainer = IMenuItemDTO & {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  isChild?: boolean;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const MenuItemBase = observer((props: TMenuItemContainer) => {
  const { isOpen, setOpen } = useMenuStore();
  const router = useRouter();
  const active = isActive(props, router.pathname);
  const color = active ? 'primary' : 'secondary';
  const icon = props.icon;
  let endIcon;
  if ('items' in props) endIcon = props.open ? <ExpandLessIcon /> : <ExpandMoreIcon />;
  let url = undefined;
  if ('url' in props) url = props.url;
  if (isOpen) {
    let onClick = undefined;
    if ('items' in props) {
      onClick = () => {
        if (setOpen) setOpen(!props.open);
      };
    }
    return url ? (
      <Link passHref href={url}>
        <MenuItemButton
          variant="text"
          color={color}
          startIcon={icon}
          endIcon={endIcon}
          onClick={onClick}
          fullWidth
        >
          {props.label}
        </MenuItemButton>
      </Link>
    ) : (
      <MenuItemButton
        variant="text"
        color={color}
        startIcon={icon}
        endIcon={endIcon}
        onClick={onClick}
        fullWidth
      >
        {props.label}
      </MenuItemButton>
    );
  } else {
    let tooltip: TooltipProps['title'] = props.label;
    let onClick = undefined;
    if ('items' in props) {
      tooltip += ' ...';
      onClick = () => {
        if (setOpen) setOpen(true);
      };
    }
    return url ? (
      <Link passHref href={url}>
        <Tooltip title={tooltip} placement="right">
          <IconButton onClick={onClick} color={color}>
            {icon}
          </IconButton>
        </Tooltip>
      </Link>
    ) : (
      <Tooltip title={tooltip} placement="right">
        <IconButton onClick={onClick} color={color}>
          {icon}
        </IconButton>
      </Tooltip>
    );
  }
});
