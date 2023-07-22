import React from 'react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { ITagProps, Tag } from '@components/tag';
import { titleTask } from '@ui/components/statuses/titleTask';

export const TaskSubTitle = observer(() => {
  const { data: userTask } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );
  const tag: ITagProps = {
    tag: titleTask(userTask),
    color: 'grey',
  };
  if (userTask?.sent === false) {
    tag.color = 'red';
  }
  if (userTask?.sent === true) {
    tag.color = 'blue';
  }
  if (userTask?.complete) {
    tag.color = 'green';
  }
  return <Tag {...tag} />;
});
