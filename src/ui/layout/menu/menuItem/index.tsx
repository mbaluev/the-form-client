import React, { useState } from 'react';
import { menuIsActive, TMenuItemDTO } from '@model/menu';
import { MenuItemContainer } from '@ui/layout/menu/menuItemContainer';
import { MenuItemChild } from '@ui/layout/menu/menuItemChild';
import { classNames } from '@utils/classNames';
import { useRouter } from 'next/router';
import './index.scss';

type TMenuItem = TMenuItemDTO & {
  isChild?: boolean;
};

export const MenuItem = (props: TMenuItem) => {
  const router = useRouter();
  const active = menuIsActive(props, router.pathname);
  const cls = classNames('menu-item', { 'menu-item_active': active });
  if ('items' in props) {
    const [open, setOpen] = useState<boolean>(active);
    return (
      <div className={cls}>
        <MenuItemContainer {...props} open={open} setOpen={setOpen} />
        <MenuItemChild {...props} open={open} />
      </div>
    );
  } else {
    return (
      <div className={cls}>
        <MenuItemContainer {...props} />
      </div>
    );
  }
};
