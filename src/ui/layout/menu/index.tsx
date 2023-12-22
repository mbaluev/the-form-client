import { observer } from 'mobx-react';
import { MenuItem } from '@ui/layout/menu/menuItem';
import { Wrapper } from '@ui/layout/menu/wrapper';
import { Stack } from '@mui/material';
import { useMenuStore } from '@store/modules/common/menu/useMenuStore';
import { useEffect } from 'react';

export const Menu = observer(() => {
  const { isOpen, hasAccess, items } = useMenuStore();

  const itemsTop = items.filter((item) => item.position !== 'bottom');
  const itemsBottom = items.filter((item) => item.position === 'bottom');

  useEffect(() => {
    const resize = () => window.dispatchEvent(new Event('resize'));
    const interval = setInterval(resize, 10);
    setTimeout(() => {
      clearInterval(interval);
    }, 310);
  }, [isOpen]);

  if (!hasAccess) return null;

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
