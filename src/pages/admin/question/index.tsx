import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { observer } from 'mobx-react';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IQuestionService } from '@service/modules/entities/question/interface';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { QuestionPage } from '@ui/pages/admin/question/questionPage';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { query } = context;
  const token = getCookieToken(context);
  const serviceQuestion = useService<IQuestionService>(SERVICE.Question);

  const questions =
    (await serviceQuestion.getQuestionsAdmin(query, token)) || null;

  return { props: { questions } };
};

const Questions = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { questions } = props;
  const { setList: setQuestions, clearList: clearQuestions } =
    useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_QUESTIONS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_QUESTIONS.path },
    },
  ];

  useEffect(() => {
    setQuestions(questions);
    return () => {
      clearQuestions();
    };
  });

  return <QuestionPage breadCrumbs={breadCrumbs} />;
};

Questions.Layout = MasterSchool;
export default observer(Questions);
