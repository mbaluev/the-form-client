import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { ITagProps, Tag } from '@components/tag';

export const TaskSubTitle = observer(() => {
  const { data } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

  const tag: ITagProps = { tag: 'Todo', color: 'grey' };
  if (data?.sent === false) {
    tag.tag = 'Income';
    tag.color = 'red';
  }
  if (data?.sent === true) {
    tag.tag = 'Sent';
    tag.color = 'blue';
  }
  if (data?.complete) {
    tag.tag = 'Complete';
    tag.color = 'green';
  }

  return <Tag {...tag} />;
});