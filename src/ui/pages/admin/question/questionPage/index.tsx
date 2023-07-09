import React from 'react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { Page } from '@ui/layout/page';
import { observer } from 'mobx-react';
import { QuestionList } from '@ui/pages/admin/question/questionList';

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
      pageRight={<>...</>}
    >
      <QuestionList {...other} />
    </Page>
  );
});
