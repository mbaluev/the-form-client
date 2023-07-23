import React from 'react';
import { Page } from '@ui/layout/page';
import { useViewModel } from '@hooks/useViewModel';
import { VIEW_MODEL } from '@viewModel/ids';
import { observer } from 'mobx-react';
import { Page204 } from '@ui/pages/errors/204';
import { Loader } from '@components/loader';
import { IQuestionAdminViewModel } from '@viewModel/modules/entities/question/admin/interface';
import { TestTitle } from '@ui/pages/admin/question/testTitle';
import { TestSubTitle } from '@ui/pages/admin/question/testSubTitle';
import { TestCardContent } from '@ui/pages/admin/question/testCardContent';
import { TestCardActions } from '@ui/pages/admin/question/testCardActions';

export const TestCard = observer(() => {
  const { data, isDataLoading, isListLoading, getData, getList } =
    useViewModel<IQuestionAdminViewModel>(VIEW_MODEL.QuestionAdmin);

  // const { isModalOpen, modalClose, modalSubmit } =
  //   useViewModel<ITaskAdminDocumentViewModel>(VIEW_MODEL.TaskAdminDocument);

  // const handleSubmit = async () => {
  //   await modalSubmit();
  //   if (data?.id) await getData(data.id);
  //   await getList();
  // };

  if (isListLoading || isDataLoading) {
    return (
      <Page>
        <Loader loading />
      </Page>
    );
  }

  if (!data) {
    return <Page204 />;
  }

  return (
    <Page
      title={<TestTitle />}
      subTitle={<TestSubTitle />}
      quickFilter={<TestCardActions />}
    >
      <TestCardContent />
      {/*<DialogTaskAdminDocument*/}
      {/*  isOpen={isModalOpen}*/}
      {/*  onClose={modalClose}*/}
      {/*  onCancel={modalClose}*/}
      {/*  onSubmit={handleSubmit}*/}
      {/*/>*/}
    </Page>
  );
});
