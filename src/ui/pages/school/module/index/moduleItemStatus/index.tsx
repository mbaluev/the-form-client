import React from 'react';
import { IModuleUserDTO } from 'controller/model/entities/module';
import { ITagProps, Tag } from '@components/tag';

interface IModuleItemStatusProps {
  userModule?: IModuleUserDTO | null;
}

export const ModuleItemStatus = (props: IModuleItemStatusProps) => {
  const { userModule } = props;
  const tag: ITagProps = { tag: 'In progress', color: 'blue' };
  if (userModule?.complete) {
    tag.tag = 'Complete';
    tag.color = 'green';
  }
  if (!userModule?.enable) {
    tag.tag = 'Disabled';
    tag.color = 'grey-dark';
  }
  return <Tag {...tag} />;
};
