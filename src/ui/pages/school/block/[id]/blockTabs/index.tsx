import React from 'react';
import { Tabs } from '@components/tab';
import { observer } from 'mobx-react';
import { TabMaterials } from '@ui/pages/school/block/[id]/tabs/tabMaterials';
import { TabQuestions } from '@ui/pages/school/block/[id]/tabs/tabQuestions';
import { BlockTabLabel } from '@ui/components/blockTab/blockTabLabel';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockUserViewModel } from '@viewModel/modules/entities/block/user/interface';
import { TabTasks } from '@ui/pages/school/block/[id]/tabs/tabTasks';
import { IMaterialUserViewModel } from '@viewModel/modules/entities/material/user/interface';
import { IQuestionUserViewModel } from '@viewModel/modules/entities/question/user/interface';
import { ITaskUserViewModel } from '@viewModel/modules/entities/task/user/interface';
import { BlockTabNames } from '@ui/components/blockTab/blockTabNames';

export const BlockTabs = observer(() => {
  const {
    data: userBlock,
    tab,
    changeTab,
  } = useViewModel<IBlockUserViewModel>(VIEW_MODEL.BlockUser);

  const { clearData: clearDataMaterial } = useViewModel<IMaterialUserViewModel>(
    VIEW_MODEL.MaterialUser
  );
  const { clearData: clearDataQuestion } = useViewModel<IQuestionUserViewModel>(
    VIEW_MODEL.QuestionUser
  );
  const { clearData: clearDataTask } = useViewModel<ITaskUserViewModel>(VIEW_MODEL.TaskUser);

  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    changeTab(value as BlockTabNames);
    clearDataMaterial();
    clearDataQuestion();
    clearDataTask();
  };

  const tabs = [
    {
      value: BlockTabNames.materials,
      label: <BlockTabLabel label="Materials" userBlock={userBlock} />,
      content: <TabMaterials />,
      padding: false,
    },
    {
      value: BlockTabNames.homeworks,
      label: <BlockTabLabel label="Homework" userBlock={userBlock} />,
      content: <TabTasks />,
      padding: false,
    },
    {
      value: BlockTabNames.questions,
      label: <BlockTabLabel label="Test" userBlock={userBlock} />,
      content: <TabQuestions />,
      padding: false,
    },
  ];

  return <Tabs tabs={tabs} activeTab={tab} onChangeTab={onChangeTab} orientation="horizontal" />;
});
