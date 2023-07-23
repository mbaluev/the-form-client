import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { ITagProps, Tag } from '@components/tag';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';

export const TagTask = observer(() => {
  const { data } = useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

  const tag: ITagProps = { tag: 'Todo', color: 'grey' };
  if (data?.sent === true) {
    tag.tag = 'Income';
    tag.color = 'red';
  }
  if (data?.sent === false) {
    tag.tag = 'Sent';
    tag.color = 'blue';
  }
  if (data?.complete) {
    tag.tag = 'Complete';
    tag.color = 'green';
  }

  return <Tag {...tag} />;
});
