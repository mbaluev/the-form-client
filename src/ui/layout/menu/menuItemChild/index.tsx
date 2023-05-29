import React from 'react';
import { TMenuItemDTO } from 'controller/model/common/menu';
import { MenuItem as LayoutMenuItem } from '@ui/layout/menu/menuItem';
import { classNames } from '@utils/classNames';
import Collapse from '@mui/material/Collapse';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { IMenuViewModel } from '@viewModel/modules/common/menu/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import './index.scss';

type TMenuItemChild = TMenuItemDTO & {
  open?: boolean;
};

export const MenuItemChild = observer((props: TMenuItemChild) => {
  const { isOpen } = useViewModel<IMenuViewModel>(VIEW_MODEL.Menu);
  const open = Boolean(props.open && isOpen);
  if ('items' in props) {
    const cls = classNames('menu-item-child', {
      'menu-item-child_open': Boolean(open),
    });
    return (
      <Collapse className="SubMenu" in={open}>
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
