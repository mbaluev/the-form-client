import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { IModuleUserDTO } from '@model/entities/module';
import { IconModules } from '@ui/components/icon/iconModules';
import { IUserDTO } from '@model/entities/user';
import { ROUTES } from '@settings/routes';
import { PageIcon } from '@ui/layout/page/pageIcon';
import Typography from '@mui/material/Typography';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
  user?: IUserDTO | null;
}

export const TitleModules = observer((props: IProps) => {
  const { userModules, user } = props;
  return (
    <Stack direction="row" spacing={2}>
      <PageIcon>
        <IconModules userModules={userModules} />
      </PageIcon>
      {user ? (
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
            {user.firstname}
          </Typography>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
            {user.lastname}
          </Typography>
        </Stack>
      ) : (
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '24px' }}>
          {ROUTES.SCHOOL_MODULES.label}
        </Typography>
      )}
    </Stack>
  );
});
