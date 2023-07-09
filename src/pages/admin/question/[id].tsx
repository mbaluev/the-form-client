import React, { useEffect } from 'react';
import { MasterSchool } from '@ui/masters/masterSchool';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { useService } from '@hooks/useService';
import { SERVICE } from '@service/ids';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { observer } from 'mobx-react';
import { TBreadCrumb } from '@components/breadCrumbs/breadCrumb';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { getCookieToken } from '@utils/cookie/getCookieToken';
import { IQuestionService } from '@service/modules/entities/question/interface';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { QuestionPage } from '@ui/pages/admin/question/questionPage';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const { params, query } = context;
  const token = getCookieToken(context);
  const serviceQuestion = useService<IQuestionService>(SERVICE.Question);

  const questions =
    (await serviceQuestion.getQuestionsAdmin(query, token)) || null;
  const question =
    (await serviceQuestion.getQuestionAdmin(params?.id, query, token)) || null;

  return { props: { questions, question } };
};

const Question = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { questions, question } = props;
  const {
    setList: setQuestions,
    setData: setQuestion,
    clearList: clearQuestions,
    clearData: clearQuestion,
  } = useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

  const breadCrumbs: TBreadCrumb[] = [
    {
      label: ROUTER_CONST_SCHOOL.HOME.label,
      url: { pathname: ROUTER_CONST_SCHOOL.HOME.path },
    },
    {
      label: ROUTER_CONST_SCHOOL.ADMIN_QUESTIONS.label,
      url: { pathname: ROUTER_CONST_SCHOOL.ADMIN_QUESTIONS.path },
    },
    {
      label: question
        ? `${question.user.username} - ${question.question.block.name}`
        : 'Not found',
      url: {
        pathname: ROUTER_CONST_SCHOOL.ADMIN_QUESTION.path,
        query: { id: question?.id },
      },
      disabled: !Boolean(question),
    },
  ];

  useEffect(() => {
    setQuestions(questions);
    setQuestion(question);
    return () => {
      clearQuestions();
      clearQuestion();
    };
  });

  return <QuestionPage breadCrumbs={breadCrumbs} />;
};

Question.Layout = MasterSchool;
export default observer(Question);
