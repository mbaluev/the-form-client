import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { useTranslation } from 'next-i18next';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Avatar, ListItemText, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';
import { Button } from '@theme/button';
import IconProfile from '@components/svg/icons/components/profile';
import IconSignIn from '@components/svg/icons/components/signIn';
import IconSignOut from '@components/svg/icons/components/signOut';
import IconUser from '@components/svg/icons/components/user';
import { Fragment, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { FirstLetters } from '@utils/ui/firstLetters';
import ListItemIcon from '@mui/material/ListItemIcon';

export const AccPopover = observer(() => {
  const { currentAccount, otherAccounts, signIn, signOut } = useAuthStore();
  const { t } = useTranslation();
  const theme = useTheme();

  const onClickSignIn = (id?: string) => {
    signIn(id);
  };
  const onClickSignOut = (e?: MouseEvent<HTMLDivElement>, id?: string) => {
    e?.stopPropagation();
    signOut(id);
  };

  return (
    <Fragment>
      <AuthenticatedTemplate>
        <Stack spacing={3} sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
          <Stack direction="row" spacing={3} justifyContent="space-between">
            <Typography>{currentAccount?.companyName}</Typography>
            <Button
              size="small"
              endIcon={<IconSignOut />}
              onClick={() => onClickSignOut()}
            >
              {t('menu:acc-sign-out')}
            </Button>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Avatar
              variant="circular"
              sx={{
                width: 40,
                height: 40,
                backgroundColor: theme.palette.t1Grey['20'],
              }}
              src={currentAccount?.photo}
            >
              <Typography
                fontSize="1.1rem"
                fontWeight={600}
                color={theme.palette.t1Grey['130']}
              >
                <FirstLetters name={currentAccount?.name} />
              </Typography>
            </Avatar>
            <Stack justifyContent="space-between">
              <Typography fontWeight={600}>{currentAccount?.name}</Typography>
              {currentAccount?.email && (
                <Typography
                  fontSize="0.9rem"
                  color={theme.palette.t1Grey['220']}
                >
                  {currentAccount.email}
                </Typography>
              )}
              {!currentAccount?.email && (
                <Typography
                  fontSize="0.9rem"
                  color={theme.palette.t1Grey['120']}
                >
                  {t('menu:acc-email-empty')}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
        {otherAccounts && otherAccounts.length > 0 ? (
          <Stack
            spacing={3}
            sx={{
              mt: 2,
              mr: 0,
              mb: 2,
              ml: 0,
              pt: 3,
              pr: 0,
              pb: 3,
              pl: 0,
              backgroundColor: theme.palette.t1Grey['10'],
              fontSize: '0.9rem',
            }}
          >
            <Typography
              fontWeight={600}
              color={theme.palette.t1Grey['220']}
              sx={{ pt: 0, pr: 3, pb: 0, pl: 3 }}
            >
              {t('menu:acc-change-account')}
            </Typography>
            {otherAccounts.map((item, index) => (
              <MenuItem key={index} onClick={() => onClickSignIn(item.id)}>
                <Avatar
                  variant="circular"
                  sx={{
                    width: 35,
                    height: 35,
                    border: `solid 1px ${theme.palette.primary.main}`,
                    backgroundColor: 'transparent',
                  }}
                  src={currentAccount?.photo}
                >
                  <IconUser
                    sx={{
                      fontSize: '1.9rem',
                      color: theme.palette.primary.main,
                    }}
                  />
                </Avatar>
                <Stack justifyContent="space-between" sx={{ ml: 2 }}>
                  <Typography fontWeight={600}>{item.name}</Typography>
                  {item.email && (
                    <Typography
                      fontSize="0.9rem"
                      color={theme.palette.t1Grey['220']}
                    >
                      {item.email}
                    </Typography>
                  )}
                  {!item.email && (
                    <Typography
                      fontSize="0.9rem"
                      color={theme.palette.t1Grey['120']}
                    >
                      {t('menu:acc-email-empty')}
                    </Typography>
                  )}
                </Stack>
              </MenuItem>
            ))}
          </Stack>
        ) : (
          <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        )}
        <MenuItem onClick={() => onClickSignIn()}>
          <ListItemIcon>
            <IconSignIn sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText>
            <Typography fontWeight={600} color={theme.palette.primary.main}>
              {t('menu:acc-sign-in-with-another-account')}
            </Typography>
          </ListItemText>
        </MenuItem>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Stack direction="row" spacing={3} sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
          <Avatar
            variant="circular"
            sx={{
              width: 40,
              height: 40,
              backgroundColor: theme.palette.t1Grey['20'],
            }}
          >
            <IconProfile sx={{ color: theme.palette.t1Grey['130'] }} />
          </Avatar>
          <Stack justifyContent="space-between">
            <Typography fontWeight={600}>{t('menu:acc-guest-user')}</Typography>
            <Typography fontSize="0.9rem" color={theme.palette.t1Grey['120']}>
              {t('menu:acc-guest-hello')}
            </Typography>
          </Stack>
        </Stack>
        <MenuItem onClick={() => onClickSignIn()}>
          <ListItemIcon>
            <IconSignIn sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText>
            <Typography fontWeight={600} color={theme.palette.primary.main}>
              {t('menu:acc-sign-in')}
            </Typography>
          </ListItemText>
        </MenuItem>
      </UnauthenticatedTemplate>
    </Fragment>
  );
});
