import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { Fragment } from 'react';
import { useMaterialSchoolItemStore } from '@store/modules/school/material/item/hook';
import { useTaskSchoolItemStore } from '@store/modules/school/task/item/hook';
import { useQuestionSchoolItemStore } from '@store/modules/school/question/item/hook';
import { TitleMaterial } from '@ui/components/title/titleMaterial';
import { TitleTask } from '@ui/components/title/titleTask';
import { TitleQuestion } from '@ui/components/title/titleQuestion';

export const Title = observer(() => {
  const { data: userMaterial } = useMaterialSchoolItemStore();
  const { data: userTask } = useTaskSchoolItemStore();
  const { data: userQuestion } = useQuestionSchoolItemStore();

  const router = useRouter();
  const tab = (router.query.slug?.[1] as string) || ROUTES.SCHOOL_BLOCK.tabs.keys.materials;

  return (
    <Fragment>
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.materials && (
        <TitleMaterial userMaterial={userMaterial} />
      )}
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.homework && <TitleTask userTask={userTask} />}
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.test && <TitleQuestion userQuestion={userQuestion} />}
    </Fragment>
  );
});
