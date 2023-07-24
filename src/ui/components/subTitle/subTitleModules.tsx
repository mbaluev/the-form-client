import React from 'react';
import { observer } from 'mobx-react';
import { IModuleUserDTO } from '@model/entities/module';
import { TagModules } from '@ui/components/tag/tagModules';

interface IProps {
  userModules?: IModuleUserDTO[] | null;
}

export const SubTitleModules = observer((props: IProps) => {
  const { userModules } = props;
  return <TagModules userModules={userModules} />;
});
