import { observer } from 'mobx-react';
import { IMenuItemDTO } from '@model/common/menu';
import { MenuItem } from '@ui/layout/menu/menuItem';
import { Wrapper } from '@ui/layout/menu/wrapper';
import { Stack } from '@mui/material';
import { useMenuStore } from '@store/modules/common/menu/useMenuStore';

export interface IMenuProps {
  items?: IMenuItemDTO[];
}

export const Menu = observer((props: IMenuProps) => {
  const { items } = props;
  const { isOpen } = useMenuStore();

  const itemsTop = items?.filter((item) => item.position !== 'bottom');
  const itemsBottom = items?.filter((item) => item.position === 'bottom');

  return (
    <Stack spacing={2} justifyContent="space-between" minWidth={isOpen ? 200 : undefined}>
      <Stack spacing={2}>
        {itemsTop?.map((item, index) => (
          <Wrapper key={index} roles={item.roles}>
            <MenuItem {...item} />
          </Wrapper>
        ))}
      </Stack>
      {itemsBottom && (
        <Stack spacing={2}>
          {itemsBottom?.map((item, index) => (
            <Wrapper key={index} roles={item.roles}>
              <MenuItem {...item} />
            </Wrapper>
          ))}
        </Stack>
      )}
    </Stack>
  );
});
