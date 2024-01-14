import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { menuIsActive, TMenuItemDTO } from 'controller/model/common/menu';
import { Button } from '@components/button';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { IMenuViewModel } from '@viewModel/modules/common/menu/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { IconButton } from '@components/iconButton';
import { useRouter } from 'next/router';
import { TooltipProps } from '@mui/material';

type TMenuItemContainer = TMenuItemDTO & {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isChild?: boolean;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const MenuItemContainer = observer((props: TMenuItemContainer) => {
  const { isOpen, setOpen } = useViewModel<IMenuViewModel>(VIEW_MODEL.Menu);
  const router = useRouter();
  const active = menuIsActive(props, router.pathname);
  const color = active ? 'blue' : 'grey';
  const icon = props.icon;
  let endIcon = undefined;
  let path = undefined;
  if ('items' in props) {
    endIcon = props.open ? <ExpandLessIcon /> : <ExpandMoreIcon />;
  }
  if ('path' in props) {
    path = props.path;
  }
  if (isOpen) {
    let onClick = undefined;
    if ('items' in props) {
      onClick = () => {
        if (props && props.setOpen) props.setOpen(!props.open);
      };
    }
    return path ? (
      <Link passHref href={path}>
        <Button
          variant="text"
          size="medium"
          color={color}
          startIcon={icon}
          endIcon={endIcon}
          onClick={onClick}
        >
          {props.label}
        </Button>
      </Link>
    ) : (
      <Button
        variant="text"
        size="medium"
        color={color}
        startIcon={icon}
        endIcon={endIcon}
        onClick={onClick}
      >
        {props.label}
      </Button>
    );
  } else {
    let tooltip: TooltipProps['title'] = props.label;
    let onClick = undefined;
    if ('items' in props) {
      tooltip += ' ...';
      onClick = () => {
        if (props && props.setOpen) props.setOpen(true);
        setOpen(true);
      };
    }
    return path ? (
      <Link passHref href={path}>
        <IconButton onClick={onClick} color={color} tooltip={tooltip} tooltipPlacement="right">
          {icon}
        </IconButton>
      </Link>
    ) : (
      <IconButton onClick={onClick} color={color} tooltip={tooltip} tooltipPlacement="right">
        {icon}
      </IconButton>
    );
  }
});
