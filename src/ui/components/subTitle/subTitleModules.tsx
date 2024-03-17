import { observer } from 'mobx-react';
import { IModuleUserDTO } from '@model/entities/module';
import { TagModules } from '@ui/components/tag/tagModules';
import { IUserDTO } from '@model/entities/user';
import Stack from '@mui/material/Stack';
import { Chip } from '@mui/material';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
  user?: IUserDTO | null;
  admin?: boolean;
}

export const SubTitleModules = observer((props: IProps) => {
  const { userModules, user, admin } = props;

  return (
    <Stack direction="row" spacing={2}>
      <TagModules userModules={userModules} />
      {admin && user && <Chip label={user.username} color="default" size="small" />}
    </Stack>
  );
});
