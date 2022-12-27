import React from 'react';
import { TMenuItemDTO } from '@model/menu';
import { MenuItem as LayoutMenuItem } from '@ui/layout/menu/menuItem';
import { classNames } from '@utils/classNames';
import Collapse from '@mui/material/Collapse';
import { useViewModel } from '@hooks/useViewModel';
import { IMenuViewModel } from '@viewModel/modules/menu/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import './index.scss';

type TMenuItemChild = TMenuItemDTO & {
  open?: boolean;
};

export const MenuItemChild = observer((props: TMenuItemChild) => {
  const { isOpen } = useViewModel<IMenuViewModel>(VIEW_MODEL.Menu);
  if ('items' in props) {
    const cls = classNames('menu-item-child', {
      'menu-item-child_open': Boolean(props.open) && isOpen,
    });
    return (
      <Collapse className="SubMenu" in={props.open && isOpen}>
        <div className={cls}>
          {props.items?.map((item, index) => (
            <LayoutMenuItem key={index} {...item} isChild={true} />
          ))}
        </div>
      </Collapse>
    );
  } else {
    return null;
  }
});
