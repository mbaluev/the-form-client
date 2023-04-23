import React, { useEffect } from 'react';
import { classNames } from '@utils/classNames';
import { Form, FormSection } from '@components/form';
import { useViewModel } from '@hooks/useViewModel';
import { IBlockUserViewModel } from '@viewModel/modules/block/user/interface';
import { VIEW_MODEL } from '@viewModel/ids';
import { Loader } from '@components/loader';
import { ITaskUserViewModel } from '@viewModel/modules/task/user/interface';
import { observer } from 'mobx-react';
import { HomeworkItem } from '@ui/pages/block/tabs/tabHomework/homeworkItem';

export const TabHomework = observer(() => {
  const { data: block } = useViewModel<IBlockUserViewModel>(
    VIEW_MODEL.BlockUser
  );
  const { getList, isListLoading, list } = useViewModel<ITaskUserViewModel>(
    VIEW_MODEL.TaskUser
  );

  useEffect(() => {
    if (block) getList();
  }, [block]);

  if (isListLoading) return <Loader loading={true} />;

  const cls = classNames('tab-homework');
  return (
    <Form className={cls}>
      <FormSection cols={3}>
        {list?.map((task, index) => (
          <HomeworkItem task={task} key={index} />
        ))}
      </FormSection>
    </Form>
  );
});
