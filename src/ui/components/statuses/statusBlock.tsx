import React from 'react';
import { ITagProps, Tag } from '@components/tag';
import { IBlockUserDTO } from '@model/entities/block';
import { titleBlock } from '@ui/components/statuses/titleBlock';

interface IProps {
  userBlock?: IBlockUserDTO | null;
}

export const StatusBlock = (props: IProps) => {
  const { userBlock } = props;
  const tag: ITagProps = {
    tag: titleBlock(userBlock),
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
