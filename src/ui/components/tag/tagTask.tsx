import React from 'react';
import { observer } from 'mobx-react';
import { ITagProps, Tag } from '@components/tag';
import { statusTask } from '@ui/components/status/statusTask';
import { ITaskUserDTO } from '@model/entities/task';

interface IProps {
  userTask?: ITaskUserDTO | null;
  admin?: boolean;
}

export const TagTask = observer((props: IProps) => {
  const { userTask, admin } = props;
  const tag: ITagProps = {
    tag: statusTask(userTask, admin),
    color: 'grey',
  };
  if (!admin && userTask?.sent === false) {
    tag.color = 'red';
  }
  if (!admin && userTask?.sent === true) {
    tag.color = 'blue';
  }
  if (admin && userTask?.sent === true) {
    tag.color = 'red';
  }
  if (admin && userTask?.sent === false) {
    tag.color = 'blue';
  }
  if (userTask?.complete) {
    tag.color = 'green';
  }
  return <Tag {...tag} />;
});
