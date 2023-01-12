import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockViewModel } from '@viewModel/modules/block/interface';
import { ITaskViewModel } from '@viewModel/modules/task/interface';
import { TaskList } from '@ui/pages/admin/block/tabs/tabHomework/taskList';

export const TabHomework = observer(() => {
  const { data: block } = useViewModel<IBlockViewModel>(VIEW_MODEL.Block);
  const { getList } = useViewModel<ITaskViewModel>(VIEW_MODEL.Task);

  useEffect(() => {
    if (block) getList();
  }, [block]);

  return <TaskList />;
});
