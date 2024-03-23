import { ITabDTO, Tabs as MuiTabs } from '@theme/tabs';
import { ROUTES } from '@settings/routes';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { MaterialsList } from '@ui/pages/school/block/item/materials/list';
import { TasksList } from '@ui/pages/school/block/item/tasks/list';
import { QuestionsList } from '@ui/pages/school/block/item/questions/list';
import { TabLabel } from '@ui/pages/school/block/item/tabLabel';
import { useBlockSchoolItemStore } from '@store/modules/school/block/item/hook';

export const Tabs = observer(() => {
  const { isSaveLoading, data: userBlock } = useBlockSchoolItemStore();

  const router = useRouter();
  const id = router.query.slug?.[0] as string;
  const active = router.query.slug?.[1] as string;

  const tabs: ITabDTO[] = [
    {
      key: ROUTES.SCHOOL_BLOCK.tabs.keys.materials,
      label: <TabLabel label={ROUTES.SCHOOL_BLOCK.tabs.labels.materials} userBlock={userBlock} />,
      component: <MaterialsList />,
      sxPanel: { overflow: 'hidden', pb: 0 },
    },
    {
      key: ROUTES.SCHOOL_BLOCK.tabs.keys.homework,
      label: <TabLabel label={ROUTES.SCHOOL_BLOCK.tabs.labels.homework} userBlock={userBlock} />,
      component: <TasksList />,
      sxPanel: { overflow: 'hidden', pb: 0 },
    },
    {
      key: ROUTES.SCHOOL_BLOCK.tabs.keys.test,
      label: <TabLabel label={ROUTES.SCHOOL_BLOCK.tabs.labels.test} userBlock={userBlock} />,
      component: <QuestionsList />,
      sxPanel: { overflow: 'hidden', pb: 0 },
    },
  ];
  const handleChange = async (value: string) => {
    const slug = [id];
    if (value !== ROUTES.SCHOOL_BLOCK.tabs.keys.materials) slug.push(value);
    await router.push({
      pathname: ROUTES.SCHOOL_BLOCK.path,
      query: { ...router.query, slug },
    });
  };

  return (
    <MuiTabs active={active} tabs={tabs} onChange={handleChange} loading={isSaveLoading} padding />
  );
});
