import { observer } from 'mobx-react';
import { MenuItem } from '@ui/layout/menu/menuItem';
import { Wrapper } from '@ui/layout/menu/wrapper';
import { Stack, StackProps, useMediaQuery, useTheme } from '@mui/material';
import { useMenuStore } from '@store/modules/common/menu/useMenuStore';
import { useEffect } from 'react';
import { toJS } from 'mobx';
import { MEDIA_SM } from '@hooks/useWindowSize';

export const Menu = observer((props: StackProps) => {
  const { isOpen, hasAccess, items } = useMenuStore();
  const isDesktop = useMediaQuery(`(min-width:${MEDIA_SM}px)`);
  const theme = useTheme();

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
  if (!isDesktop && !isOpen) return null;

  return (
    <Stack
      id="__menu"
      spacing={2}
      justifyContent="space-between"
      minWidth={isOpen ? 200 : undefined}
      position="sticky"
      top={theme.spacing(11)}
      height="fit-content"
      {...props}
    >
      <Stack spacing={2}>
        {itemsTop?.map((item, index) => (
          <Wrapper key={index} roles={item.roles}>
            <MenuItem {...toJS(item)} />
          </Wrapper>
        ))}
      </Stack>
      {itemsBottom && (
        <Stack spacing={2}>
          {itemsBottom?.map((item, index) => (
            <Wrapper key={index} roles={item.roles}>
              <MenuItem {...toJS(item)} />
            </Wrapper>
          ))}
        </Stack>
      )}
    </Stack>
  );
});
