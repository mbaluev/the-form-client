import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { ITagProps, Tag } from '@components/tag';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { titleMaterial } from '@ui/components/statuses/titleMaterial';

export const MaterialSubTitle = observer(() => {
  const { data: userMaterial } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );
  const tag: ITagProps = {
    tag: titleMaterial(userMaterial),
    color: 'grey',
  };
  if (userMaterial?.complete) {
    tag.color = 'green';
  }
  return <Tag {...tag} />;
});
