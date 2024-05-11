import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { Fragment } from 'react';
import { useMaterialSchoolItemStore } from '@store/modules/school/material/item/hook';
import { SubTitleMaterial } from '@ui/components/subTitle/subTitleMaterial';
import { SubTitleQuestion } from '@ui/components/subTitle/subTitleQuestion';
import { useTaskSchoolItemStore } from '@store/modules/school/task/item/hook';
import { useQuestionSchoolItemStore } from '@store/modules/school/question/item/hook';
import { SubTitleTask } from '@ui/components/subTitle/subTitleTask';

export const SubTitle = observer(() => {
  const { data: userMaterial } = useMaterialSchoolItemStore();
  const { data: userTask } = useTaskSchoolItemStore();
  const { data: userQuestion } = useQuestionSchoolItemStore();

  const router = useRouter();
  const tab = (router.query.slug?.[1] as string) || ROUTES.SCHOOL_BLOCK.tabs.keys.materials;

  return (
    <Fragment>
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.materials && (
        <SubTitleMaterial userMaterial={userMaterial} />
      )}
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.homework && <SubTitleTask userTask={userTask} />}
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.test && (
        <SubTitleQuestion userQuestion={userQuestion} />
      )}
    </Fragment>
  );
});
