import React from 'react';
import { IModuleUserDTO } from 'controller/model/entities/module';
import { ITagProps, Tag } from '@components/tag';
import { IBlockUserDTO } from '@model/entities/block';

interface IModuleBlockStatusProps {
  userModuleBlock?: IModuleUserDTO | IBlockUserDTO | null;
}

export const ModuleBlockStatus = (props: IModuleBlockStatusProps) => {
  const { userModuleBlock } = props;
  const tag: ITagProps = { tag: 'In progress', color: 'blue' };
  if (userModuleBlock?.complete) {
    tag.tag = 'Complete';
    tag.color = 'green';
  }
  if (!userModuleBlock?.enable) {
    tag.tag = 'Disabled';
    tag.color = 'grey-dark';
  }
  return <Tag {...tag} />;
};
