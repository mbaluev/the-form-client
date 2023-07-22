import { IBlockUserDTO } from '@model/entities/block';

export const titleQuestions = (userBlock?: IBlockUserDTO | null) => {
  let title = 'Test: disabled';
  if (userBlock?.enable && !userBlock?.completeQuestions)
    title = 'Test: in progress';
  if (userBlock?.completeQuestions) title = 'Test: complete';
  if (userBlock?.completeQuestions && userBlock?.errorQuestions)
    title = 'Test: complete with errors';
  if (userBlock?.completeQuestions && userBlock?.commentQuestions)
    title = 'Test: complete with comments';
  return title;
};
