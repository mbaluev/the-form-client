import { Fragment } from 'react';
import { observer } from 'mobx-react';
import { IModuleUserDTO } from '@model/entities/module';
import { TagModules } from '@ui/components/tag/tagModules';
import { IUserDTO } from '@model/entities/user';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
  user?: IUserDTO | null;
  admin?: boolean;
}

export const SubTitleModules = observer((props: IProps) => {
  const { userModules, user, admin } = props;

  return (
    <Fragment>
      <TagModules userModules={userModules} />
      {admin && user && <div>{user.username}</div>}
    </Fragment>
  );
});
