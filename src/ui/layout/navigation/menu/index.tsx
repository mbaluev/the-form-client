import Toolbar from '@mui/material/Toolbar';
import { Container, IconButton, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import { MENU_CONFIG } from '@settings/menu';
import { Account } from '@ui/layout/navigation/account';
import { ROUTES } from '@settings/routes';
import Link from 'next/link';
import { IMenuItemDTO } from '@model/common/menu';
import { Search } from '@ui/layout/navigation/search';
import { MenuItem } from '@ui/layout/navigation/menu/menuItem';
import { Wrapper } from '@ui/layout/navigation/menu/wrapper';
import IconTotalOne from '@components/svg/icons/components/totalOne';

export const Menu = () => {
  const theme = useTheme();
  return (
    <Container id="__menu" maxWidth="xl">
      <Toolbar sx={{ padding: '0 !important' }}>
        <Stack direction="row" spacing={2} width="100%">
          <Link href={ROUTES.HOME.path} passHref>
            <IconButton sx={{ color: theme.palette.accent.light }}>
              <IconTotalOne />
            </IconButton>
          </Link>
          {MENU_CONFIG.map((item: IMenuItemDTO) => (
            <Wrapper key={item.name} item={item}>
              <MenuItem item={item} />
            </Wrapper>
          ))}
          <Search />
          <Account />
        </Stack>
      </Toolbar>
    </Container>
  );
};
