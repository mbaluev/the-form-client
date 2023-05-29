import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { ITagProps, Tag } from '@components/tag';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';

export const MaterialSubTitle = observer(() => {
  const { data } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );

  const tag: ITagProps = { tag: 'New', color: 'grey' };
  if (data?.complete) {
    tag.tag = 'Downloaded';
    tag.color = 'blue';
  }

  return <Tag {...tag} />;
});
