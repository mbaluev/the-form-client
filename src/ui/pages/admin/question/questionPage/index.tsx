import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { TestList } from 'ui/pages/admin/question/testList';
import { TestCard } from 'ui/pages/admin/question/testCard';

interface IProps {
  breadCrumbs: TBreadCrumb[];
}

export const QuestionPage = observer((props: IProps) => {
  const { breadCrumbs, ...other } = props;

  return (
    <Page
      title="Tests"
      breadCrumbs={breadCrumbs}
      padding={false}
      pageRight={<TestCard />}
    >
      <TestList {...other} />
    </Page>
  );
});
