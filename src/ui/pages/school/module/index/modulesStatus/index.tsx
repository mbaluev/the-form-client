import React from 'react';
import { ITagProps, Tag } from '@components/tag';

interface IModuleItemStatusProps {
  progress?: number;
}

export const ModulesStatus = (props: IModuleItemStatusProps) => {
  const { progress } = props;
  const tag: ITagProps = { tag: 'In progress', color: 'blue' };
  if (progress === 100) {
    tag.tag = 'Complete';
    tag.color = 'green';
  }
  return <Tag {...tag} />;
};
