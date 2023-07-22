import { IQuestionUserDTO } from '@model/entities/question';

export const titleQuestion = (userQuestion?: IQuestionUserDTO | null) => {
  let title = 'Todo';
  if (
    userQuestion?.userQuestionAnswers &&
    userQuestion?.userQuestionAnswers.length > 0
  ) {
    title = 'Done';
  }
  if (userQuestion?.complete) title = 'Complete';
  if (userQuestion?.error) title = 'Complete with errors';
  if (userQuestion?.comment) title = 'Complete with comments';
  return title;
};
