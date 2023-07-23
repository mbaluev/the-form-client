import React from 'react';
import { ITagProps, Tag } from '@components/tag';
import { IBlockUserDTO } from '@model/entities/block';
import { statusBlock } from '@ui/components/status/statusBlock';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const TagBlock = (props: IProps) => {
  const { userBlock } = props;
  const tag: ITagProps = {
    tag: statusBlock(userBlock),
    color: 'blue',
  };
  if (userBlock?.complete) {
    tag.color = 'green';
  }
  if (!userBlock?.enable) {
    tag.color = 'grey-dark';
  }
  return <Tag {...tag} />;
};
