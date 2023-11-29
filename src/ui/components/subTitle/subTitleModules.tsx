import { Fragment } from 'react';
import { observer } from 'mobx-react';
import { IModuleUserDTO } from '@model/entities/module';
import { TagModules } from '@ui/components/tag/tagModules';
import { IUserDTO } from '@model/entities/user';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IModuleUserViewModel } from '@viewModel/modules/entities/module/user/interface';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
  user?: IUserDTO | null;
  admin?: boolean;
}

export const SubTitleModules = observer((props: IProps) => {
  const { userModules, user, admin } = props;

  const { isListLoading } = useViewModel<IModuleUserViewModel>(
    VIEW_MODEL.ModuleUser
  );
  if (isListLoading) return null;

  return (
    <Fragment>
      <TagModules userModules={userModules} />
      {admin && user && <div>{user.username}</div>}
    </Fragment>
  );
});
