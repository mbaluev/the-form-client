import React from 'react';
import { IModuleDTO } from '@model/module';
import { ITagProps, Tag } from '@components/tag';

interface IModuleItemStatusProps {
  module?: IModuleDTO | null;
}

export const ModuleItemStatus = (props: IModuleItemStatusProps) => {
  const { module } = props;
  const tag: ITagProps = { tag: 'In progress', color: 'blue' };
  if (module?.complete) {
    tag.tag = 'Complete';
    tag.color = 'green';
  }
  if (!module?.enable) {
    tag.tag = 'Disabled';
    tag.color = 'grey-dark';
  }
  return <Tag {...tag} />;
};
