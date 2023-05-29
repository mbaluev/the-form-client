import React from 'react';
import { TMenuItemDTO } from 'controller/model/common/menu';
import { classNames } from '@utils/classNames';
import { MenuItem } from '@ui/layout/menu/menuItem';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { IMenuViewModel } from '@viewModel/modules/common/menu/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { PermissionWrapper } from '@ui/permission/permissionWrapper';
import './index.scss';

export interface IMenuProps {
  items?: TMenuItemDTO[];
}

export const Menu = observer((props: IMenuProps) => {
  const { items } = props;
  const { isOpen, initiated } = useViewModel<IMenuViewModel>(VIEW_MODEL.Menu);

  const itemsTop = items?.filter((item) => item.position !== 'bottom');
  const itemsBottom = items?.filter((item) => item.position === 'bottom');

  const cls = classNames('menu', {
    menu_open: isOpen,
    'menu_prevent-animation': !initiated,
  });
  const clsTop = classNames('menu__top');
  const clsBottom = classNames('menu__bottom');

  return (
    <div className={cls}>
      <div className={clsTop}>
        {itemsTop?.map((item, index) => (
          <PermissionWrapper key={index} roles={item.roles}>
            <MenuItem {...item} />
          </PermissionWrapper>
        ))}
      </div>
      {itemsBottom && (
        <div className={clsBottom}>
          {itemsBottom?.map((item, index) => (
            <PermissionWrapper key={index} roles={item.roles}>
              <MenuItem {...item} />
            </PermissionWrapper>
          ))}
        </div>
      )}
    </div>
  );
});
