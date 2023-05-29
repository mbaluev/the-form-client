import React from 'react';
import { IModuleUserDTO } from 'controller/model/entities/module';
import { ITagProps, Tag } from '@components/tag';

interface IModuleBlockStatusProps {
  block?: IModuleUserDTO | null;
}

export const ModuleBlockStatus = (props: IModuleBlockStatusProps) => {
  const { block } = props;
  const tag: ITagProps = { tag: 'In progress', color: 'blue' };
  if (block?.complete) {
    tag.tag = 'Complete';
    tag.color = 'green';
  }
  if (!block?.enable) {
    tag.tag = 'Disabled';
    tag.color = 'grey-dark';
  }
  return <Tag {...tag} />;
};
