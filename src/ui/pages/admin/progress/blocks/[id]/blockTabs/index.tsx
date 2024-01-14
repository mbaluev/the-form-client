import { Tabs } from '@components/tab';
import { observer } from 'mobx-react';
import { BlockTabLabel } from '@ui/components/blockTab/blockTabLabel';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { IBlockAdminViewModel } from '@viewModel/modules/entities/block/admin/interface';
import { IMaterialAdminViewModel } from '@viewModel/modules/entities/material/admin/interface';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { ITaskAdminViewModel } from '@viewModel/modules/entities/task/admin/interface';
import { BlockTabNames } from '@ui/components/blockTab/blockTabNames';
import { TabMaterials } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabMaterials';
import { TabTasks } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabTasks';
import { TabQuestions } from '@ui/pages/admin/progress/blocks/[id]/tabs/tabQuestions';

export const BlockTabs = observer(() => {
  const {
    data: userBlock,
    tab,
    changeTab,
  } = useViewModel<IBlockAdminViewModel>(VIEW_MODEL.BlockAdmin);

  const { clearData: clearDataMaterial } = useViewModel<IMaterialAdminViewModel>(
    VIEW_MODEL.MaterialAdmin
  );
  const { clearData: clearDataQuestion } = useViewModel<IQuestionAdminViewModel>(
    VIEW_MODEL.QuestionAdmin
  );
  const { clearData: clearDataTask } = useViewModel<ITaskAdminViewModel>(VIEW_MODEL.TaskAdmin);

  const onChangeTab = (_: React.ChangeEvent<unknown>, value: string) => {
    changeTab(value as BlockTabNames);
    clearDataMaterial();
    clearDataQuestion();
    clearDataTask();
  };

  const tabs = [
    {
      value: BlockTabNames.materials,
      label: <BlockTabLabel label="Materials" userBlock={userBlock} admin />,
      content: <TabMaterials />,
      padding: false,
    },
    {
      value: BlockTabNames.homeworks,
      label: <BlockTabLabel label="Homework" userBlock={userBlock} admin />,
      content: <TabTasks />,
      padding: false,
    },
    {
      value: BlockTabNames.questions,
      label: <BlockTabLabel label="Test" userBlock={userBlock} admin />,
      content: <TabQuestions />,
      padding: false,
    },
  ];

  return <Tabs tabs={tabs} activeTab={tab} onChangeTab={onChangeTab} orientation="horizontal" />;
});
