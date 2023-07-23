import React from 'react';
import { observer } from 'mobx-react';
import { ITagProps, Tag } from '@components/tag';
import { statusMaterial } from '@ui/components/status/statusMaterial';
import { IMaterialUserDTO } from '@model/entities/material';

interface IProps {
  userMaterial?: IMaterialUserDTO | null;
}

export const TagMaterial = observer((props: IProps) => {
  const { userMaterial } = props;
  const tag: ITagProps = {
    tag: statusMaterial(userMaterial),
    color: 'grey',
  };
  if (userMaterial?.complete) {
    tag.color = 'green';
  }
  return <Tag {...tag} />;
});
