import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Avatar, ListItemText, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import { Button } from '@theme/button';
import IconProfile from '@components/svg/icons/components/profile';
import IconSignIn from '@components/svg/icons/components/signIn';
import IconSignOut from '@components/svg/icons/components/signOut';
import { Fragment, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { FirstLetters } from '@utils/ui/firstLetters';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useAuthStore } from '@store/modules/common/auth/useAuthStore';

export const AccPopover = observer(() => {
  const theme = useTheme();
  const { isAuth } = useAuthStore();

  const onClickSignIn = (id?: string) => {
    console.log('sign-in', id);
  };
  const onClickSignOut = (e?: MouseEvent<HTMLDivElement>, id?: string) => {
    console.log('sign-out', id);
    e?.stopPropagation();
  };

  return (
    <Fragment>
      {isAuth && (
        <Fragment>
          <Stack spacing={3} sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}>
            <Stack direction="row" spacing={3} justifyContent="space-between">
              <Typography>name</Typography>
              <Button
                size="small"
                endIcon={<IconSignOut />}
                onClick={() => onClickSignOut()}
              >
                Sign out
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
                src="src"
              >
                <Typography
                  fontSize="1.1rem"
                  fontWeight={600}
                  color={theme.palette.t1Grey['130']}
                >
                  <FirstLetters name="name" />
                </Typography>
              </Avatar>
              <Stack justifyContent="space-between">
                <Typography fontWeight={600}>"name"</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 1.5, mb: 1.5 }} />
          <MenuItem onClick={() => onClickSignIn()}>
            <ListItemIcon>
              <IconSignIn sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={600} color={theme.palette.primary.main}>
                Sign in with another account
              </Typography>
            </ListItemText>
          </MenuItem>
        </Fragment>
      )}
      {!isAuth && (
        <Fragment>
          <Stack
            direction="row"
            spacing={3}
            sx={{ pt: 1, pr: 3, pb: 3, pl: 3 }}
          >
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
              <Typography fontWeight={600}>Guest</Typography>
              <Typography fontSize="0.9rem" color={theme.palette.t1Grey['120']}>
                Hello
              </Typography>
            </Stack>
          </Stack>
          <MenuItem onClick={() => onClickSignIn()}>
            <ListItemIcon>
              <IconSignIn sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={600} color={theme.palette.primary.main}>
                Sign in
              </Typography>
            </ListItemText>
          </MenuItem>
        </Fragment>
      )}
    </Fragment>
  );
});
