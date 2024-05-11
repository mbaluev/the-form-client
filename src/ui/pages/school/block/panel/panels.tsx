import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@settings/routes';
import { Fragment } from 'react';
import { UserMaterial } from '@ui/pages/school/block/panel/material';
import { UserQuestion } from '@ui/pages/school/block/panel/question';
import { UserTask } from '@ui/pages/school/block/panel/task';

export const Panels = observer(() => {
  const router = useRouter();
  const tab = (router.query.slug?.[1] as string) || ROUTES.SCHOOL_BLOCK.tabs.keys.materials;

  return (
    <Fragment>
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.materials && <UserMaterial />}
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.homework && <UserQuestion />}
      {tab === ROUTES.SCHOOL_BLOCK.tabs.keys.test && <UserTask />}
    </Fragment>
  );
});
