import React from 'react';
import { Form, FormSection } from '@components/form';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { observer } from 'mobx-react';
import { HomeworkItem } from '@ui/pages/school/block/tabs/_tabHomework/homeworkItem';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { Alert } from '@components/alert';

const AlertDone = () => {
  return (
    <Alert
      type="success"
      title="Homework has been done successfully"
      variant="outlined"
      shadow={false}
      border={false}
    />
  );
};

export const HomeworkList = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const { list } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);
  return (
    <Form>
      {block?.completeMaterials && <AlertDone />}
      <FormSection cols={2}>
        {list?.map((task, index) => (
          <HomeworkItem task={task} key={index} />
        ))}
      </FormSection>
    </Form>
  );
});
